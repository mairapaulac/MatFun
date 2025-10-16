"use client";

import { deleteSession } from "@/actions/session";

import { ArrowLeft, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function ModuleNavbar() {
  return (
    <nav className="w-full h-[120px] sm:h-[120px] bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] px-4 py-4 sm:py-6 drop-shadow-xl border-b border-white/10">
      <div className="w-full max-w-[800px] mx-auto h-full flex justify-between items-center">
        {/* back button */}
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link href={"/home"}className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 ">
            <ArrowLeft className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-white hover:text-gray-300 transition-all hover:-translate-x-1" />
          </Link>
        </div>

        {/* user info*/}
        <div className="flex-grow flex justify-center items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 sm:w-10 sm:h-10 text-[#2B3A67]" />
            </div>
            <div className="text-white text-center">
              <h2 className="text-2xl sm:text-4xl font-normal drop-shadow-md">João Silva</h2>
              <p className="text-lg sm:text-lg text-white/80">8º Ano, Turma A</p>
            </div>
          </div>
        </div>

        {/* logout */}
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <button onClick={() => deleteSession()} className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 cursor-pointer">
            <LogOut className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-red-400 hover:text-red-300 transition-all  hover:translate-x-1" />
          </button>
        </div>
      </div>
    </nav>
  );
}
