"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useState, useEffect } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "";

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [client, setClient] = useState<ConvexReactClient | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (convexUrl) {
      try {
        const c = new ConvexReactClient(convexUrl);
        setClient(c);
      } catch (e) {
        console.error("Convex init error:", e);
        setError(true);
      }
    }
  }, []);

  if (!client || error) {
    return <>{children}</>;
  }

  return <ConvexProvider client={client}>{children}</ConvexProvider>;
}
