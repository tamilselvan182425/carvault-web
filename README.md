# CarVault – MERN Vehicle Management System

A comprehensive vehicle management system featuring role-based access, document storage, and admin approvals.

## Features
- **Authentication**: JWT-based login/register with Role-Based Access Control (RBAC).
- **Vehicle Management**: Add, view, and manage vehicles.
- **Admin Dashboard**: Approve vehicle requests and view user stats.
- **Document Vault**: Upload RC, Insurance, and PUC documents securely to Cloudinary.
- **Tech Stack**: React, Tailwind CSS, Node.js, Express, MongoDB, Cloudinary.

## Setup Instructions

### Backend
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Configure `.env` with your MongoDB URI, Cloudinary credentials, and JWT Secret.
4. Run server: `npm start` (or `node server.js`)
5. (Optional) Seed data: `node seed/seedVehicles.js`

### Frontend
1. Navigate to `frontend/`
2. Install dependencies (if not already installed):
   ```bash
   npm install
   npm install axios react-router-dom tailwindcss postcss autoprefixer
   ```
3. Run dev server: `npm run dev`

## Troubleshooting
- If `npm install` fails with **Heap out of memory**, try increasing node memory or closing other apps.
- Ensure MongoDB is running locally or provide a valid Atlas URI.
