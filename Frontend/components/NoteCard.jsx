"use client";

export default function NoteCard({ note, onDelete }) {
  return (
    <div className="bg-gray-50 border rounded-xl p-4 flex justify-between items-start shadow-sm">
      <div>
        <p className="font-semibold text-gray-900 mb-1">{note.note}</p>
        {note.tags?.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap text-xs">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={() => onDelete(note._id)}
        className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
}
