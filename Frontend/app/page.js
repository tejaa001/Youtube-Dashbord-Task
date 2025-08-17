// frontend/app/page.js
import VideoDetails from "@/components/VideoDetails";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Video Dashboard</h1>
      <VideoDetails />
    </div>
  );
}
