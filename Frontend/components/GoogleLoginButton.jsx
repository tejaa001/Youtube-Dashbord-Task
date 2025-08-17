"use client";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold shadow"
    >
      Sign in with Google
    </button>
  );
}
