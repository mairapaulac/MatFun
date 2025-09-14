"use client";

import { Settings, LogOut, Smile } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#314991] px-4 py-6 drop-shadow-xl">
      <div className="w-full max-w-[800px] mx-auto flex justify-between items-center">
        <div className="p-2">
          <Link href={"/"}>
            <Settings className=" h-12 w-12 text-white" />
          </Link>
        </div>
        <div className="flex-grow flex justify-center items-center gap-4 pr-7">
          <div className="flex-shrink-0 pr-4">
            <Smile size={70} color={"white"} />
          </div>
          <div className="text-white">
            <h2 className="text-6xl font-semibold">Nome</h2>
            <p className="text-2xl text-gray-300">Ano, Turma</p>
          </div>
        </div>
        <Link href={"/"}>
          <LogOut className=" h-12 w-12" color="red" />
        </Link>
      </div>
    </nav>
  );
}
