import SessionProvider from "@/providers/SessionProvider";
import { ReactNode } from "react";

export default function ModuleLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <section className="min-h-screen w-screen">{children}</section>
    </SessionProvider>
  );
}
