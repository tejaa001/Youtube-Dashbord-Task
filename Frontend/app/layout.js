import "../styles/globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "YouTube Companion Dashboard",
  description: "Manage YouTube videos, comments and notes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <main className="container mx-auto p-4">
          <ClientLayout>{children}</ClientLayout>
        </main>
      </body>
    </html>
  );
}
