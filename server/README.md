## Library Management API

### Setup
1) In this `server` folder create a `.env` file:
```
MONGODB_URI=mongodb+srv://Adit_Rawat:Adit54321@cluster0.rqqkqs8.mongodb.net/library
PORT=5000
```
2) Install deps (already done): `npm install`
3) Run in dev: `npm run dev` (uses nodemon) or prod: `npm start`

### Endpoints
- `GET /api/health` – quick status
- `POST /api/users/register` – body: `{ name, email, password, role?, cnic?, phone?, gender? }`
- `GET /api/users` – list users (passwords never returned)
- `POST /api/auth/login` – body: `{ email, password }`
- `GET /api/authors` / `POST /api/authors` – `{ name, bio? }`
- `GET /api/categories` / `POST /api/categories` – `{ name, description? }`
- `GET /api/books` – lists with author/category populated
- `POST /api/books` – `{ title, author, category, isbn?, totalCopies?, coverUrl? }`
- `PATCH /api/books/:id` / `DELETE /api/books/:id`
- `GET /api/issues` – issued/returned records
- `POST /api/issues` – issue a book `{ user, book, dueAt? }` (decrements availableCopies)
- `PATCH /api/issues/:id/return` – mark returned (increments availableCopies)

### Notes
- Passwords are hashed with bcrypt.
- No JWT/auth guard yet (kept simple for your static frontend). Add middleware later if needed.
- `availableCopies` is auto-managed when issuing/returning.

