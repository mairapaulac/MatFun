"use client";

import { ArrowLeft, LogOut, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-[120px] bg-gradient-to-r from-[#2B3A67] via-[#314991] to-[#2B3A67] px-4 py-2 sm:py-6 drop-shadow-xl border-b border-white/10">
      <div className="w-full max-w-[800px] mx-auto h-full flex justify-between items-center">
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link
            href={"/home"}
            className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 "
          >
            <ArrowLeft className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-white hover:text-gray-300 transition-all hover:-translate-x-1" />
          </Link>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <Trophy className="size-8 md:size-12 text-yellow-400" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-light text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ranking
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-300 mt-1">
            <TrendingUp className="size-5" />
            <span className="text-lg sm:text-2xl md:text-2xl font-medium text-nowrap">
              Classificação de Jogadores
            </span>
          </div>
        </div>

        {/* logout */}
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link
            href={"/auth/signin"}
            className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 "
          >
            <LogOut className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-red-400 hover:text-red-300 transition-all  hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
