"use client";

import { LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Card from "@/components/ui/Card";

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onToggle: () => void;
  iconColor?: string;
}

export default function ModuleCard({
  icon: Icon,
  title,
  subtitle,
  isSelected,
  isDisabled = false,
  onToggle,
  iconColor = "#2B3A67",
}: ModuleCardProps) {
  return (
    <Card
      className="w-[90%] h-[90px] sm:h-[110px] flex items-center gap-3 sm:gap-4 p-4 sm:p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <div className="flex-shrink-0">
          <Icon
            className="w-8 h-8 sm:w-10 sm:h-10"
            style={{ color: iconColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-xl sm:text-2xl font-normal mb-1 truncate"
            style={{ color: "rgba(29, 45, 88, 0.75)" }}
          >
            {title}
          </h3>
          <p className=" sm:text-xl text-gray-600 truncate font-normal">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={isSelected}
          disabled={isDisabled}
          onCheckedChange={onToggle}
          className="w-7 h-7 sm:w-8 sm:h-8 [&>span>svg]:w-5 [&>span>svg]:h-5 sm:[&>span>svg]:w-6 sm:[&>span>svg]:h-6 border-2 border-black"
        />
      </div>
    </Card>
  );
}
