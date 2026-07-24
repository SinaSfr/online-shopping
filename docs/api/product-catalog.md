# Product Catalog API

Covers the endpoints introduced on `feature/product-catalog`: categories
and products. Reads are public; writes require an admin account
(`is_superuser`).

Base paths: `/api/v1/categories`, `/api/v1/products`

---

## Authorization model

Two dependencies gate these endpoints (see `docs/api/authentication.md`
for the token mechanics):

- **`get_current_user`** - valid access token required. Missing/invalid/expired
  token -> `401`.
- **`require_admin`** - valid token *and* `is_superuser = true`. A valid
  token for a non-admin user -> `403`, not `401` - the caller is
  authenticated (we know who they are), just not authorized for this
  action. That distinction is worth keeping in the response.

There is no endpoint to promote a user to admin - it's done directly in
the database (`UPDATE users SET is_superuser = true WHERE email = ...`).
Deliberate: self-service admin promotion isn't a feature this catalog
needs yet.

---

## Categories

### GET /api/v1/categories

Public. Returns every category, unpaginated - there's no need for
pagination at catalog-launch scale.

```json
[
  { "id": 1, "name": "Electronics", "slug": "electronics" }
]
```

### POST /api/v1/categories

Admin only.

**Request:**

```json
{ "name": "Electronics", "slug": "electronics" }
```

**Responses:**

- `201` - created, same shape as the list item above.
- `403` - not an admin.
- `409` - slug already in use:
  ```json
  { "detail": "Category slug already exists." }
  ```

---

## Products

### GET /api/v1/products

Public. Query params:

| Param         | Default | Notes                              |
|---------------|---------|--------------------------------------|
| `skip`        | 0       | offset                                |
| `limit`       | 20      | capped at 100                         |
| `category_id` | none    | filter to one category if provided    |

Each product embeds its category inline, rather than just a
`category_id`, so a product list doesn't force the client into a second
lookup per item to show the category name:

```json
[
  {
    "id": 1,
    "name": "Wireless Mouse",
    "slug": "wireless-mouse",
    "description": "A great mouse",
    "price": "29.99",
    "stock_quantity": 10,
    "image_url": null,
    "is_active": true,
    "category": { "id": 1, "name": "Electronics", "slug": "electronics" }
  }
]
```

### GET /api/v1/products/{id}

Public. Same shape as one list item. `404` if the id doesn't exist.

### POST /api/v1/products

Admin only.

**Request:**

```json
{
  "name": "Wireless Mouse",
  "slug": "wireless-mouse",
  "description": "A great mouse",
  "price": "29.99",
  "stock_quantity": 10,
  "image_url": null,
  "category_id": 1
}
```

`price` must be `> 0` (`422` otherwise). `image_url` is a plain string for
now - actual file upload waits for MinIO, a later phase in the stack.

**Responses:** `201` (full product, category resolved), `403` (not
admin), `404` (`category_id` doesn't exist), `409` (slug already in use),
`422` (validation, e.g. non-positive price).

### PATCH /api/v1/products/{id}

Admin only. **Partial update** - only the fields present in the body are
changed, everything else is untouched. This is deliberately `PATCH`, not
`PUT`: `PUT` implies replacing the whole resource, which isn't what an
admin edit form actually does.

```json
{ "stock_quantity": 5 }
```

Toggling `is_active` (hide a product without deleting it) goes through
this same endpoint - it's just another field, not a separate action.

**Responses:** `200`, `403`, `404` (product or `category_id` not found),
`409` (new slug already in use).

### DELETE /api/v1/products/{id}

Admin only. **Hard delete** - actually removes the row. This is
intentionally not the same thing as setting `is_active = false`; that's a
normal field update via `PATCH`, not a side effect of `DELETE`.

**Responses:** `204` (no body), `403`, `404`.

---

## Data integrity: category deletion

There is no `DELETE /categories/{id}` endpoint yet, but the constraint is
already in place at the database level: `products.category_id` is a
foreign key with `ON DELETE RESTRICT`. If a delete-category endpoint is
added later, attempting to delete a category that still has products
will fail at the database layer with no application code required to
enforce it - verified directly:

```sql
DELETE FROM categories WHERE id = 1;
-- ERROR: update or delete on table "categories" violates foreign key
-- constraint "products_category_id_fkey" on table "products"
```
