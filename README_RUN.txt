Updated: 2025-08-20T05:52:32

How to run (Windows-friendly):

1) Backend (Django)
   cd server
   # (optional) create venv: python -m venv venv && venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   # If migrate fails because of missing migration history, run:
   # python manage.py makemigrations blog && python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver

2) Frontend (Vite React)
   cd ../client
   copy .env.example .env   # if needed
   npm install
   npm run dev

3) Login & Publish
   - Open http://localhost:5173
   - Sign up (top nav -> Signup), then Login.
   - Create a new post: the Publish checkbox controls visibility.
   - Anonymous users only see posts with Published = true.

Notes:
 - API base is controlled by client/.env -> VITE_API_BASE (default http://localhost:8000)
 - If you deploy backend separately, update VITE_API_BASE accordingly and rebuild.
 - If you see 401 on create/update/delete, you are not logged in or token expired.