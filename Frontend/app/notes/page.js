// frontend/app/notes/page.js
import NoteForm from "@/components/NoteForm";
import NoteCard from "@/components/NoteCard";

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Notes</h1>

      <NoteForm />

      <div className="space-y-4">
        {/* Render the list of notes here */}
        <NoteCard />
      </div>
    </div>
  );
}
