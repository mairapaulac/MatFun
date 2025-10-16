import SessionProvider from "@/providers/SessionProvider";
import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <section className="min-h-screen w-screen overscroll-y-contain">
        {children}
      </section>
    </SessionProvider>
  );
}
