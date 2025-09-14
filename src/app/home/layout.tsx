import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <section className=" min-h-screen w-screen">{children}</section>;
}
