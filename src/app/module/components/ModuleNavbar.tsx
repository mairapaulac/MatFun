"use client";

import { ArrowLeft, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function ModuleNavbar() {
  return (
    <nav className="w-full h-[120px] sm:h-[120px] bg-[#314991] px-4 py-4 sm:py-6 drop-shadow-xl">
      <div className="w-full max-w-[800px] mx-auto h-full flex justify-between items-center">
        {/* back button */}
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link href={"/home"}>
            <ArrowLeft className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] text-white hover:text-gray-300 transition-colors" />
          </Link>
        </div>

        {/* user info*/}
        <div className="flex-grow flex justify-center items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#2B3A67]" />
            </div>
            <div className="text-white text-center">
              <h2 className="text-lg sm:text-4xl font-normal">João Silva</h2>
              <p className="text-sm sm:text-lg text-gray-300">
                8º Ano, Turma A
              </p>
            </div>
          </div>
        </div>

        {/* logout */}
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link href={"/auth/signin"}>
            <LogOut className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] text-red-400 hover:text-red-300 transition-colors" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
