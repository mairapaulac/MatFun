"use client";

import { ArrowLeft, LogOut, Trophy, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-[120px]  bg-gradient-to-r from-[#293864] via-[#334a91] to-[#293864] px-4 py-2 sm:py-6 drop-shadow-xl border-b border-gray-700">
      <div className="w-full max-w-[800px] mx-auto h-full flex justify-between items-center">
        <div className="flex items-center justify-center w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]">
          <Link
            href={"/home"}
            className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 hover:scale-110 "
          >
            <ArrowLeft className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-blue-950 hover:text-gray-300 transition-all hover:-translate-x-1" />
          </Link>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="flex items-center gap-3">
            <Trophy className="size-8 md:size-12 text-yellow-400" fill="currentColor" />
            <h1 className="text-4xl md:text-5xl font-light text-center bg-white  bg-clip-text ">
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
          <Link href={"/auth/signin"}className="group flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white backdrop-blur-sm hover:bg-blue-600 transition-all duration-300 hover:scale-110 ">
            <LogOut className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] text-red-500 hover:text-red-800 transition-all " />
          </Link>
        </div>
      </div>
    </nav>
  );
}
