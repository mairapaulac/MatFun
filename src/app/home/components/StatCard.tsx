import React from "react";
import { LucideIcon } from "lucide-react";
import Card from "../../../components/ui/Card";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  iconColor?: string;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  title,
  subtitle,
  iconColor = "#2B3A67",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("flex items-center gap-4", className)}>
      <div className="flex-shrink-0">
        <Icon className="w-8 h-8" style={{ color: iconColor }} />
      </div>
      <div className="flex-1">
        <h3
          className="text-xl font-normal"
          style={{ color: "rgba(29, 45, 88, 0.75)" }}
        >
          {title}
        </h3>
        <p className="text-sm text-black font-medium">{subtitle}</p>
      </div>
    </Card>
  );
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
