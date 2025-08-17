// frontend/app/notes/page.js
"use client";
import { useEffect, useState } from "react";
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";
import api from "@/lib/api";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Notes</h1>

      <NoteForm />

      <div className="space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : notes.length === 0 ? (
          <div>No notes found.</div>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
