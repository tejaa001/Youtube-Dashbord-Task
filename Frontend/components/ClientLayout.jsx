"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("auth") === "success") {
        setShowWelcome(true);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <GoogleLoginButton />
      </div>
      {showWelcome && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded text-green-800 text-center">
          Successfully authenticated with Google!
        </div>
      )}
      {children}
    </>
  );
}
