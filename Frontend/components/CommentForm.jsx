"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function CommentForm({ videoId, parentCommentId = null }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (parentCommentId) {
        await api.post("/comments/reply", {
          parentCommentId,
          text,
        });
      } else {
        await api.post("/comments", {
          videoId,
          text,
        });
      }
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  );
}
