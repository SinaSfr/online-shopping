# Connecting the Frontend to the Auth API

How the React app (`http://localhost:5173`) talks to the FastAPI backend
(`http://localhost:8000`) for register/login, and why CORS has to be
configured for it to work at all.

---

## Working requests

| Action   | Method | URL                                          |
|----------|--------|-----------------------------------------------|
| Register | POST   | `http://localhost:8000/api/v1/auth/register` |
| Login    | POST   | `http://localhost:8000/api/v1/auth/login`    |

Both take a JSON body with `Content-Type: application/json`.

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"amir@example.com","password":"supersecret123"}'
```

You can also exercise both endpoints interactively at
`http://localhost:8000/docs` (Swagger UI) via "Try it out" - see
[authentication.md](authentication.md) for the full request/response
reference.

---

## Why a plain curl call isn't the full picture

curl doesn't enforce browser security policies, so it will happily call the
API regardless of origin. A browser won't: `http://localhost:5173` and
`http://localhost:8000` differ by port, which makes them different
*origins* under the browser's same-origin policy. A `fetch`/`axios` call
made from a page served on `:5173` to `:8000` is blocked client-side unless
the server explicitly opts in via CORS response headers - this is a browser
restriction, not something curl or Postman will ever reproduce.

### The fix: CORS middleware

`backend/app/main.py` registers `CORSMiddleware`, allowing the origins
listed in the `CORS_ORIGINS` environment variable (comma-separated; local
dev is just `http://localhost:5173`). This is configuration, not a hardcoded
value in code, so a staging/production frontend URL can be added later
without touching `main.py`.

Confirming it's working - the response carries an
`access-control-allow-origin` header matching the calling origin:

```bash
curl -i -X POST http://localhost:8000/api/v1/auth/login \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -d '{"email":"amir@example.com","password":"supersecret123"}'

# access-control-allow-origin: http://localhost:5173
```

If this header is missing, the browser will reject the response even
though the request reached the server and returned data.

---

## Calling it from React

No extra dependency needed - the browser's built-in `fetch` is enough:

```js
const API_BASE_URL = "http://localhost:8000/api/v1";

async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail ?? "Login failed");
  }

  return response.json(); // { access_token, refresh_token, token_type }
}
```

`API_BASE_URL` is hardcoded here for local development. It should not stay
that way: the backend URL will differ once Docker networking, staging, or
production enter the picture. The correct fix is a Vite env var
(`import.meta.env.VITE_API_BASE_URL`, defined in `frontend/.env`) rather
than a literal string baked into the source - tracked as a follow-up, not
yet done.

---

## Not yet wired

- `LoginPage.jsx` has no submit handler or fetch call yet - it's still
  presentation-only.
- There is no `RegisterPage.jsx`.
- No shared API client/helper exists in the frontend (e.g. a small module
  wrapping `fetch` with the base URL and error handling) - each page would
  currently have to duplicate the pattern above.
