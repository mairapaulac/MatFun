import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-lg p-4 transition-all duration-300",
        onClick && "cursor-pointer hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
