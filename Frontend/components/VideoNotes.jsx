import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function VideoNotes({ videoId }) {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    api.get(`/notes?videoId=${videoId}`).then((res) => setNotes(res.data));
  }, [videoId]);

  const handleAdd = async () => {
    await api.post("/notes", { videoId, text: newNote });
    setNewNote("");
    // Refetch notes
    const res = await api.get(`/notes?videoId=${videoId}`);
    setNotes(res.data);
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">Notes</h3>
      <input
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="space-y-3">
        {filteredNotes.length === 0 ? (
          <li className="text-gray-500">No notes found.</li>
        ) : (
          filteredNotes.map((note) => (
            <li
              key={note.id}
              className="bg-gray-50 border rounded p-3 shadow-sm"
            >
              {note.text}
            </li>
          ))
        )}
      </ul>
      <div className="space-y-2 pt-4">
        <textarea
          placeholder="Add a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full border rounded px-3 py-2 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition w-full"
        >
          Add Note
        </button>
      </div>
    </div>
  );
}
