# Debugging "Failed to resolve import" in the Frontend

How to diagnose `[plugin:vite:import-analysis] Failed to resolve import "X"`
errors on `localhost:5173`, and why this project is particularly prone to
one specific cause of it.

---

## Step 1: is it actually backend's fault?

It isn't, almost by definition. This error comes from Vite's
import-analysis plugin trying to bundle a **frontend source file** - it
happens before any network request to port 8000 is even made. If the error
names a `.js`/`.jsx` file and a package name (not a URL), the backend is not
involved. Confirm quickly if you want certainty: check `docker compose logs
backend` for anything at the same timestamp - there won't be, because this
request never got past your own browser/Vite dev server.

---

## Step 2: is the package actually a dependency?

```bash
grep axios frontend/package.json
```

If it's not listed at all, that's the whole bug - someone imported a
package that was never added via `npm install <package>`. Add it and
reinstall (see Step 4).

If it **is** listed (as it is here - `"axios": "^1.18.1"`), the bug is more
interesting: the dependency is declared, but not actually present where the
dev server runs.

---

## Step 3: where does the dev server actually run?

This project's frontend runs inside a container, not on your host machine.
`frontend/package.json` being correct on your host tells you nothing about
what's inside the container. Check the container directly:

```bash
docker compose exec frontend sh -c "ls node_modules | grep axios"
```

Nothing printed means the module genuinely isn't there, in the environment
that matters.

## Why this happens in this project specifically

Look at the `frontend` service in `docker-compose.yml`:

```yaml
volumes:
  - ./frontend:/app
  - /app/node_modules
```

The first line bind-mounts your source code into the container, so edits on
your host show up live - that's what makes hot-reload work without
rebuilding the image on every save. But that same bind mount would also
overwrite the container's `/app/node_modules` with whatever (or nothing) is
in `./frontend/node_modules` on your host. The second line is a deliberate
counter-trick: an **anonymous volume** mounted specifically at
`/app/node_modules`, which shadows the bind mount at that one path and
preserves whatever `npm install` produced *inside the image* at build time.

The catch: that anonymous volume is created once and then persists across
`docker compose up` / `restart` / even `--build`. If you add a new
dependency to `package.json` and rebuild, the freshly built **image** does
contain the new package - but the **running container's** `/app/node_modules`
mount point still points at the old anonymous volume from before, which
shadows the image's node_modules and hides the new package. The rebuild
looks like it did nothing.

---

## Step 4: the fix

**Quick fix** - install directly into the running container, updating the
existing anonymous volume in place:

```bash
docker compose exec frontend npm install
```

**Clean fix** - when you suspect deeper drift and want to start the
volume fresh:

```bash
docker compose down
docker compose up -d --build --force-recreate -V frontend
```

(`-V` recreates anonymous volumes instead of reusing them.)

Use the quick fix for day-to-day dependency additions; reach for the clean
fix if the quick fix doesn't resolve it.

---

## General checklist for this error going forward

1. Is the package in `frontend/package.json`? If not, `npm install` it.
2. Is it actually in the **container's** `node_modules` (Step 3 command)?
   If not, it's the stale-volume issue above, not a code bug.
3. Check the import path for typos - `"./services/authService"` vs
   `"./services/authservice"` fails silently different from a missing
   package (Vite's error message will name the file it couldn't find,
   not the package).
4. As a last resort, restart the dev server - Vite's dependency
   pre-bundling cache can occasionally go stale: `docker compose restart
   frontend`.
