# Authentication API

Covers the endpoints introduced on `feature/auth-register-login`:
account registration and login. Both are public - no `Authorization` header
required to call them.

Base path: `/api/v1/auth`

---

## POST /api/v1/auth/register

Creates a new user account. Does **not** log the user in - no tokens are
returned. The client is expected to redirect to the login page (or call
`/auth/login`) after a successful register.

> Deliberate design choice: keeping register and login as separate flows
> means we can insert an email-verification step later without changing
> what register returns.

### Request

```json
{
  "first_name": "Amir",
  "last_name": "Erfan",
  "email": "amir@example.com",
  "password": "supersecret123"
}
```

| Field        | Type   | Rules                          |
|--------------|--------|---------------------------------|
| `first_name` | string | 1-100 characters                |
| `last_name`  | string | 1-100 characters                |
| `email`      | string | valid email format, unique      |
| `password`   | string | 8-128 characters                |

### Responses

**`201 Created`** - account created:

```json
{
  "id": 1,
  "first_name": "Amir",
  "last_name": "Erfan",
  "email": "amir@example.com"
}
```

`hashed_password` is never returned - it isn't part of the response schema.

**`409 Conflict`** - email already registered:

```json
{ "detail": "Email already registered." }
```

**`422 Unprocessable Entity`** - validation failure (bad email format,
password too short, missing field, etc.):

```json
{
  "detail": [
    {
      "type": "string_too_short",
      "loc": ["body", "password"],
      "msg": "String should have at least 8 characters",
      "input": "short",
      "ctx": { "min_length": 8 }
    }
  ]
}
```

---

## POST /api/v1/auth/login

Verifies email + password and issues a token pair.

> Uses a plain JSON body (`{email, password}`) rather than FastAPI's
> `OAuth2PasswordRequestForm` convention, since the client is a JSON-based
> React SPA and the identifier is an email, not a username.

### Request

```json
{
  "email": "amir@example.com",
  "password": "supersecret123"
}
```

### Responses

**`200 OK`**:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

**`401 Unauthorized`** - wrong password, unknown email, or an inactive
account. All three return the identical response so the endpoint can't be
used to enumerate which emails are registered:

```json
{ "detail": "Invalid email or password." }
```

**`422 Unprocessable Entity`** - malformed request body (same shape as
register's validation errors).

---

## Token format

Both `access_token` and `refresh_token` are JWTs (HS256), decoded from
`JWT_SECRET_KEY` / `JWT_ALGORITHM` in the environment. Claims:

| Claim  | Meaning                                              |
|--------|-------------------------------------------------------|
| `sub`  | user id, as a string                                   |
| `type` | `"access"` or `"refresh"`                              |
| `iat`  | issued-at timestamp                                    |
| `exp`  | expiry timestamp                                       |

| Token   | Lifetime                              |
|---------|-----------------------------------------|
| access  | `ACCESS_TOKEN_EXPIRE_MINUTES` (default 15 min) |
| refresh | `REFRESH_TOKEN_EXPIRE_DAYS` (default 7 days)   |

The `type` claim exists so a refresh token can never be accepted where an
access token is expected, once a protected-route dependency is added.

Tokens are currently **stateless** - there is no server-side record of
issued tokens, so none can be revoked before they expire. Logout is
client-side only (delete the tokens). A DB-backed refresh-token table
(supporting real "logout everywhere" and reuse detection) is a deliberate
future upgrade, not an oversight.

---

## Not yet implemented

- `POST /api/v1/auth/refresh` - exchange a refresh token for a new access token.
- Any protected endpoint / `get_current_user` dependency to actually consume
  the access token.
- Rate limiting on `/login` (brute-force protection).
- Refresh token revocation / logout-everywhere.
