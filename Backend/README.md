# YouTube Backend API

## API Endpoints

### Video Endpoints

- **GET `/api/video/:id`**  
  Fetch video details by ID.

- **PATCH `/api/video/:id`**  
  Update video title and description.

---

### Comments Endpoints

- **POST `/api/comments`**  
  Add a top-level comment.

- **POST `/api/comments/reply`**  
  Reply to a comment.

- **DELETE `/api/comments/:id`**  
  Delete a comment by ID.

---

### Notes Endpoints

- **POST `/api/notes`**  
  Create a new note.

- **GET `/api/notes?tag=foo`**  
  Get notes, optionally filtered by tag.

- **DELETE `/api/notes/:id`**  
  Delete a note by ID.

---

## Database Schemas

### Video

```js
{
  _id: ObjectId,
  title: String,
  description: String,
  // Add other fields as needed
}
```

### Comment

```js
{
  _id: ObjectId,
  videoId: ObjectId,
  userId: ObjectId,
  text: String,
  parentId: ObjectId, // null for top-level, comment _id for replies
  createdAt: Date,
  updatedAt: Date
}
```

### Note

```js
{
  _id: ObjectId,
  userId: ObjectId,
  videoId: ObjectId,
  content: String,
  tag: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

> Update the schemas above to match your actual Mongoose models
