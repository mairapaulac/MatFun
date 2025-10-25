import SessionProvider from "@/providers/SessionProvider";
import TanstackProvider from "@/providers/TanstackProvider";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <TanstackProvider>
      <SessionProvider>
        <section className=" min-h-screen w-screen overflow-x-hidden">
          {children}
        </section>
      </SessionProvider>
    </TanstackProvider>
  );
}
