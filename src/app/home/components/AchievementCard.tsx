import { LucideIcon, Sword, Amphora, WandSparkles,Sparkle,GraduationCap } from "lucide-react";
import Card from "./Card";
import { IUserAchievements } from "@/types/types";


const iconMap: { [key: string]: LucideIcon } = {
  Sword: Sword,
  Amphora: Amphora,
  WandSparkles: WandSparkles,
  Sparkle:Sparkle,
  GraduationCap:GraduationCap
};
interface AchievementCardProps {
  achievement: IUserAchievements;
}
export default function AchievementCard({ achievement }: AchievementCardProps) {
  const {
    achievementName,
    currentValue,
    requiredValue,
    isUnlocked,
    achievementIcon,
    iconColor
  } = achievement;
  const Icon = iconMap[achievementIcon];

  return (
    <Card className="w-full h-auto min-h-[110px] flex items-center gap-2 p-2 sm:p-2 md:p-4 lg:p-3 animate-slide-in-up active:scale-95 transition-all duration-200 border-3 border-[#1E3A8A]/70">
      <div
        className="flex-shrink-0 p-3 rounded-xl "
         style={{ backgroundColor: iconColor }}
      >
        {Icon && <Icon className="w-8 h-8 text-white" />}
      </div>
      <div className="flex-1">
        <h3 className="text-2xl md:text-3xl font-normal mb-2 text-[#2B3A67]">
          {achievementName}
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isUnlocked
                  ? "bg-gradient-to-r from-[#22C55E] to-[#16A34A]"
                  : "bg-gradient-to-r from-[#3B82F6] to-[#2563EB]"
              }`}
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
          <span className="text-base font-normal text-[#2B3A67] whitespace-nowrap">
            {currentValue}/{requiredValue}
          </span>
        </div>
        <p className="text-md font-medium text-[#F43F5E]">
          {isUnlocked
            ? "Desbloqueado!"
            : `Acerte ${requiredValue} questões para desbloquear`}
        </p>
      </div>
    </Card>
  );
}