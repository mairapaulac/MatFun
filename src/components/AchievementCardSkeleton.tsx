import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function AchievementCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-auto min-h-[120px] flex items-center gap-2 sm:p-2 md:p-4 lg:p-3 rounded-2xl p-4 bg-white/50 shadow-md border border-white/20 ", className)}>
      <Skeleton className="h-10 w-10 rounded-lg bg-gray-300/50" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-4 w-[60%] bg-gray-300/50" />
        <Skeleton className="h-3 w-full rounded-full bg-gray-300/50" />
      </div>
    </div>
  );
}
