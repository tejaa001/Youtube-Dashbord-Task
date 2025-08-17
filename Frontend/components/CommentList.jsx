"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CommentList({ videoId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api
      .get(`/comments?videoId=${videoId}`)
      .then((res) => {
        const items = Array.isArray(res?.data?.items) ? res.data.items : [];
        setComments(items);
      })
      .catch((err) => {
        setComments([]);
        console.error(err);
      });
  }, [videoId]);

  const handleDelete = async (commentId) => {
    await api.delete(`/comment/${commentId}`);
    // Optionally refetch comments here
  };

  if (!Array.isArray(comments) || comments.length === 0) {
    return <p className="text-sm text-gray-500">No comments yet.</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 border rounded-lg p-4 shadow-sm flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-800">
              {item.snippet.topLevelComment.snippet.authorDisplayName}
            </p>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-xs px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
          <p className="text-gray-700 text-sm">
            {item.snippet.topLevelComment.snippet.textOriginal}
          </p>
          {/* ...reply logic... */}
        </div>
      ))}
    </div>
  );
}
