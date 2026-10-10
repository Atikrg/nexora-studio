"use client";

import { useEffect } from "react";

/** Replaces the root layout when it throws. Must render its own <html>/<body>; global styles are not loaded. */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          background: "#0B0B0C",
          color: "#F3F0EA",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ color: "#FF5A1F", letterSpacing: "0.08em", fontSize: "0.75rem", textTransform: "uppercase" }}>
          Critical error
        </p>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>Something went wrong.</h1>
        <p style={{ maxWidth: "36rem", color: "#9A968F" }}>
          The application failed to load. Please try again.
        </p>
        <button
          onClick={() => retry()}
          style={{
            marginTop: "0.5rem",
            minHeight: "2.75rem",
            padding: "0 1.5rem",
            border: "none",
            borderRadius: "9999px",
            background: "#FF5A1F",
            color: "#0B0B0C",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
