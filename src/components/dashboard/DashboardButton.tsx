import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardButtonProps {
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
}

export default function DashboardButton({ 
  icon: Icon, 
  text, 
  onClick, 
  className,
  variant = "primary",
  size = "md"
}: DashboardButtonProps) {
  const sizeClasses = {
    sm: "h-12 px-4 text-sm",
    md: "h-16 px-6 text-base",
    lg: "h-20 px-8 text-lg"
  };

  const variantClasses = {
    primary: "bg-[#314991] text-white hover:bg-[#314991]/90",
    secondary: "bg-white text-[#314991] border-2 border-[#314991] hover:bg-gray-50"
  };

  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3 font-semibold",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon className="w-6 h-6" />
      {text}
    </Button>
  );
}
