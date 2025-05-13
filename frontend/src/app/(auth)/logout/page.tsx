"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        const token = localStorage.getItem("token");

        // call your external API logout endpoint
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/logout`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),
            },
          }
        );

        if (!res.ok) {
          console.error("Logout failed on the API side");
          console.error(await res.text());
        }
      } catch (err) {
        console.error("Network error during logout:", err);
      } finally {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    };

    doLogout();
  }, [router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">Logging Out</h1>
        <p className="text-gray-600">Please wait while we securely log you out...</p>
      </div>
      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
        <div className="animate-pulse h-full w-full bg-primary"></div>
      </div>
    </div>
  );
}