# Backend API

This backend serves the existing web app data through API routes.

## Run with MongoDB data

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Default API:

```txt
GET http://localhost:3000/api/health
GET http://localhost:3000/api/universities
GET http://localhost:3000/api/universities?search=mit&region=usa&sort=ranking
GET http://localhost:3000/api/universities/mit
GET http://localhost:3000/api/scholarships
GET http://localhost:3000/api/scholarships?search=mext&funding=full&region=japan
GET http://localhost:3000/api/scholarships/mext
GET http://localhost:3000/api/exams
GET http://localhost:3000/api/exams/IELTS
GET http://localhost:3000/api/favorites?userEmail=test@example.com
POST http://localhost:3000/api/favorites
DELETE http://localhost:3000/api/favorites/university/mit?userEmail=test@example.com
GET http://localhost:3000/api/applications?userEmail=test@example.com
POST http://localhost:3000/api/applications
PATCH http://localhost:3000/api/applications/:id
DELETE http://localhost:3000/api/applications/:id
POST http://localhost:3000/api/universities
PATCH http://localhost:3000/api/universities/:id
DELETE http://localhost:3000/api/universities/:id
POST http://localhost:3000/api/scholarships
PATCH http://localhost:3000/api/scholarships/:id
DELETE http://localhost:3000/api/scholarships/:id
```

The backend also serves the frontend files, so the app can be opened from:

```txt
http://localhost:3000
http://localhost:3000/html/uni.html
http://localhost:3000/html/scholar.html
http://localhost:3000/html/exam-info.html
http://localhost:3000/html/dashboard.html
```

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

MongoDB collections:

```txt
universities
scholarships
exam_contents
favorites
applications
```
