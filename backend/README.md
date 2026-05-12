# Backend API

This backend serves the existing web app data through API routes.

## Run with static JSON data

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default API:

```txt
GET http://localhost:3000/api/health
GET http://localhost:3000/api/universities
GET http://localhost:3000/api/universities/mit
GET http://localhost:3000/api/scholarships
GET http://localhost:3000/api/scholarships/mext
GET http://localhost:3000/api/exams
GET http://localhost:3000/api/exams/IELTS
```

The backend also serves the frontend files, so the app can be opened from:

```txt
http://localhost:3000
http://localhost:3000/html/uni.html
http://localhost:3000/html/scholar.html
http://localhost:3000/html/exam-info.html
```

## Run with MongoDB data

Set `.env` to:

```env
PORT=3000
DATA_SOURCE=mongo
MONGODB_URI=mongodb://127.0.0.1:27017/havar2026_web
```

Then seed the database from the current JSON files:

```bash
npm run seed
npm run dev
```
