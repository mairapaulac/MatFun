import SessionProvider from "@/providers/SessionProvider";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <section className=" min-h-screen w-screen overflow-x-hidden">
        {children}
      </section>
    </SessionProvider>
  );
}
