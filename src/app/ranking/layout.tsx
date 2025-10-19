import SessionProvider from "@/providers/SessionProvider";
import { ReactNode } from "react";
import TanstackProvider from "@/providers/TanstackProvider";
export default function RankingLayout({ children }: { children: ReactNode }) {
  return (
    <TanstackProvider>
      <SessionProvider>
        <section className="min-h-screen w-screen">{children}</section>
      </SessionProvider>
    </TanstackProvider>
  );
}
