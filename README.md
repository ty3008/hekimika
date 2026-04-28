# Hekimika (Wise Nation) Web Application

A professional full-stack platform for Hekimika Ministry, featuring program management, book library, blog, and a dynamic admin dashboard.

## Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion
- **Backend**: Node.js (Express) + TypeScript
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify (Frontend) + Railway (Backend)

---

## Deployment Guide – Netlify + Railway + Supabase

### 1. Supabase (Database Setup)
1.  Go to [Supabase](https://supabase.com/) and create a new project.
2.  Once the project is ready, go to **Project Settings** > **Database**.
3.  Copy the **Connection string** (choose the "Direct connection" or "Transaction pooler" depending on your needs; standard Port 5432 is fine for the `pg` pool).
4.  The application will automatically initialize the required tables on the first successful connection from the backend.

### 2. Railway (Backend Hosting)
1.  Connect your GitHub repository to [Railway](https://railway.app/).
2.  Add a New Service from your repo.
3.  In **Settings**, set the **Root Directory** to `/server`.
4.  Update the **Start Command** to `npm start` ( Railway usually detects this if `main` is in `package.json`).
5.  In **Variables**, add the following (copy from your `.env`):
    - `DATABASE_URL`: Your Supabase connection string.
    - `JWT_SECRET`: A secure random string for tokens.
    - `ADMIN_EMAIL`: Your initial admin login email.
    - `ADMIN_PASSWORD`: Your initial admin login password.
    - `PORT`: 5000 (Railway will map this automatically).
    - `CLIENT_URL`: Your Netlify frontend URL.

### 3. Netlify (Frontend Hosting)
1.  Connect your GitHub repository to [Netlify](https://www.netlify.com/).
2.  Set the **Base directory** to `client`.
3.  Set the **Build command** to `npm run build`.
4.  Set the **Publish directory** to `client/dist`.
5.  In **Environment Variables**, add:
    - `VITE_API_URL`: `https://your-backend-url.railway.app/api`

---

## Manual Steps & Maintenance

### Database Migrations
The backend is configured to use an "auto-init" strategy. It will attempt to create all necessary tables (`admins`, `programs`, `books`, `blog_posts`, etc.) if they do not exist upon startup.

### Setting Up Selar Products
1.  Create your products/programs on [Selar](https://selar.co/).
2.  Copy the checkout URLs.
3.  Log in to the Hekimika Admin Dashboard.
4.  Update the `selarUrl` field for each Program or Book to point to your live Selar links.

### Media Assets
Ensure all logos and brand assets are placed in the `client/public` folder as currently implemented.

---

## Development
- `npm run install:all` to install all dependencies.
- `npm run dev` to start both client and server in development mode.
