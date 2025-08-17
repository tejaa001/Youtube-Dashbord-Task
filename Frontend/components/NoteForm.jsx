"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function NoteForm() {
  const [note, setNote] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    await api.post("/notes", {
      note,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      videoId: "YOUR_VIDEO_ID",
    });

    setNote("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-6 space-y-4"
    >
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note..."
        className="w-full border rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Add Note
      </button>
    </form>
  );
}
