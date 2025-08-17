"use client";

import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import api from "@/lib/api";

export default function VideoDetails() {
  const [video, setVideo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoId, setVideoId] = useState("");
  const [inputId, setInputId] = useState("");

  useEffect(() => {
    if (!videoId) return;
    api
      .get(`/video/${videoId}`)
      .then((res) => setVideo(res.data))
      .catch((err) => setVideo(null));
  }, [videoId]);

  useEffect(() => {
    if (video && video.items && video.items.length > 0) {
      setTitle(video.items[0].snippet.title);
      setDescription(video.items[0].snippet.description);
    }
  }, [video]);

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    await api.put(`/video/${id}`, { title, description });
    setEditing(false);
    // Optionally refetch video details here
  };

  if (!videoId) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6 mt-8 mt-8">
        <h2 className="text-xl font-bold mb-4">Enter a YouTube Video ID</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setVideoId(inputId.trim());
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. dQw4w9WgXcQ"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Load Video
          </button>
        </form>
      </div>
    );
  }

  if (!video || !video.items || video.items.length === 0)
    return <p className="text-center mt-8">Loading or video not found...</p>;

  const { snippet, statistics, id } = video.items[0];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6 mt-8">
      {editing ? (
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Video Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Video Description"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {snippet.title}
            </h2>
            <button
              onClick={handleEdit}
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-700 text-base mb-2 whitespace-pre-line">
            {snippet.description}
          </p>
        </>
      )}

      <div className="flex gap-6 text-sm text-gray-500 border-t pt-4">
        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>{" "}
          {statistics.viewCount} Views
        </span>
        <span className="flex items-center gap-1">
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10-4V4a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>{" "}
          {statistics.commentCount} Comments
        </span>
      </div>

      <div className="pt-4 space-y-4">
        <CommentForm videoId={id} />
        <CommentList videoId={id} />
      </div>
    </div>
  );
}
