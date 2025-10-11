import type { LucideIcon } from "lucide-react"
import Card from "./Card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  title: string
  subtitle: string
  iconColor?: string
  className?: string
}

export default function StatCard({ icon: Icon, title, subtitle, iconColor = "#2B3A67", className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "flex items-center gap-3 sm:gap-4 p-4 sm:p-5",
        "bg-gradient-to-br from-white via-gray-50 to-white",
        "shadow-xl active:scale-95 transition-all duration-200",
        className,
      )}
    >
      <div
        className="flex-shrink-0 p-3 sm:p-4 rounded-2xl shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${iconColor}20, ${iconColor}10)`,
          border: `2px solid ${iconColor}30`,
        }}
      >
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: iconColor }} />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl sm:text-3xl font-normal text-[#1D2D58]">{title}</h3>
        <p className="text-sm sm:text-base text-[#2B3A67] font-normal mt-1">{subtitle}</p>
      </div>
    </Card>
  )
}
