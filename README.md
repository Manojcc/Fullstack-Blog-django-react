# Full-Stack Blog App (React + Django)

This is a minimal template that satisfies the assessment:

- Email/password auth (JWT)
- Only logged-in users can create/edit/delete blogs
- Public blog list (paginated) and detail pages
- SQL database (SQLite by default; easy Postgres switch for cloud)
- Responsive, simple UI
- Frontend: React (Vite). Backend: Django REST. Deployable to Render/Railway/Heroku-like platforms.

## 1) Quickstart (Local)

### Prereqs
- Python 3.12+
- Node 18+
- Git Bash or a terminal

### Backend (Django)
```bash
cd server
python -m venv venv
source venv/Scripts/activate  # Windows (Git Bash)
# OR: source venv/bin/activate  # macOS/Linux

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # optional
python manage.py runserver 0.0.0.0:8000
```

The API is now at `http://localhost:8000/api/`:
- `POST /api/auth/register/` -> {username, email, password}
- `POST /api/auth/token/` -> JWT {access, refresh}
- `GET/POST /api/blogs/` and `GET/PUT/DELETE /api/blogs/:id/`

### Frontend (React + Vite)
Open a new terminal:
```bash
cd client
cp .env.example .env  # ensure VITE_API_BASE points to http://localhost:8000
npm install
npm run dev
```
Visit `http://localhost:5173`.

## 2) Project Structure

```
blog-app/
  server/  # Django API
    config/
    blog/      # Blog CRUD
    users/     # Auth register + JWT endpoints
  client/  # React SPA
```

## 3) Deploy (Render/Railway - Postgres)

### Backend
- Add environment variables:
  - `DJANGO_SECRET_KEY` — generate one
  - `DEBUG=0`
  - `ALLOWED_HOSTS=your-domain.com`
  - For Postgres:
    - `DB_ENGINE=django.db.backends.postgresql`
    - `DB_NAME=...`
    - `DB_USER=...`
    - `DB_PASSWORD=...`
    - `DB_HOST=...`
    - `DB_PORT=5432`
- Start command: `gunicorn config.wsgi` (Procfile already included)
- Run DB migration on deploy: `python manage.py migrate`

### Frontend
- Set `VITE_API_BASE` to the backend URL (e.g., `https://your-backend.onrender.com`)
- Build + deploy static files with any static host (Vercel/Netlify) or serve via the platform.

## 4) API Auth Flow (JWT)
1. User registers: `POST /api/auth/register/`.
2. User logs in: `POST /api/auth/token/` -> returns `{access, refresh}`.
3. The React app stores `access` in localStorage and sends it as `Authorization: Bearer <token>`.

## 5) Pagination
DRF `PageNumberPagination` is enabled globally with `PAGE_SIZE=5`. List endpoint returns:
```json
{ "count": 12, "next": "...?page=3", "previous": "...?page=1", "results": [ ... ] }
```
The frontend reads `count` to render prev/next.

## 6) Notes
- For production, lock down CORS origins and set `DEBUG=0`.
- Consider rotating JWT secrets and HTTPS only.
- Optional enhancements: rich text editor, image uploads, search, tags, optimistic UI.

## 7) Scripts
- `server/manage.py` typical Django commands
- `client` uses Vite scripts: `dev`, `build`, `preview`

Happy shipping!
