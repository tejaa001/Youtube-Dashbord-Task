# Youtube Notes & Comments App

This project is a full-stack web application for managing YouTube video notes and comments. It consists of a **Backend** (Node.js/Express, MongoDB) and a **Frontend** (Next.js, Tailwind CSS).

---

## Table of Contents

- [Project Structure](#project-structure)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Database Schema](#database-schema)
- [Frontend](#frontend)
- [Setup Instructions](#setup-instructions)

---

## Project Structure

```
Backend/      # Node.js/Express API server
Frontend/     # Next.js frontend app
```

---

## Backend

### Main Technologies

- Node.js
- Express.js
- MongoDB (Mongoose)

### API Endpoints

#### Auth

- `POST   /api/auth/login` — User login
- `POST   /api/auth/register` — User registration
- `POST   /api/auth/google` — Google OAuth login

#### Videos

- `GET    /api/video/:id` — Get YouTube video details by ID
- `PUT    /api/video/:id` — Update video title/description

#### Notes

- `GET    /api/notes/:videoId` — Get all notes for a video
- `POST   /api/notes/:videoId` — Add a note to a video
- `PUT    /api/notes/:noteId` — Edit a note
- `DELETE /api/notes/:noteId` — Delete a note

#### Comments

- `GET    /api/comments/:videoId` — Get all comments for a video
- `POST   /api/comments/:videoId` — Add a comment to a video
- `PUT    /api/comments/:commentId`— Edit a comment
- `DELETE /api/comments/:commentId`— Delete a comment

#### Event Logs

- `GET    /api/eventlogs` — Get all event logs (admin)

---

### Database Schema (MongoDB)

#### User

```
{
	_id: ObjectId,
	username: String,
	email: String,
	password: String (hashed),
	googleId: String (optional),
	createdAt: Date,
}
```

#### Note

```
{
	_id: ObjectId,
	videoId: String, // YouTube video ID
	userId: ObjectId,
	content: String,
	createdAt: Date,
	updatedAt: Date,
}
```

#### Comment

```
{
	_id: ObjectId,
	videoId: String, // YouTube video ID
	userId: ObjectId,
	content: String,
	createdAt: Date,
	updatedAt: Date,
}
```

#### EventLog

```
{
	_id: ObjectId,
	eventType: String,
	userId: ObjectId,
	details: String,
	createdAt: Date,
}
```

---

## Frontend

### Main Technologies

- Next.js (React)
- Tailwind CSS

### Key Features

- Enter a YouTube video ID to load video details
- View and edit video title/description (if authorized)
- Add, edit, and delete notes for a video
- Add, edit, and delete comments for a video
- Google login support

### Main Components

- `VideoDetails` — Shows video info, allows editing, and displays comments/notes
- `CommentList`, `CommentForm` — Manage comments
- `NoteCard`, `NoteForm` — Manage notes
- `GoogleLoginButton` — Google OAuth

---

## Setup Instructions

### Backend

1. `cd Backend`
2. Copy `.env.example` to `.env` and fill in your MongoDB URI and secrets
3. `npm install`
4. `npm start` (or `npm run dev`)

### Frontend

1. `cd Frontend`
2. Copy `.env.local.example` to `.env.local` and fill in your API URL and Google client ID
3. `npm install`
4. `npm run dev`

---

## License

MIT
