import { Skeleton } from "@/components/ui/skeleton";

export function PlayerCardSkeleton() {
  return (
    <div className="relative flex items-center justify-between gap-4 p-4 rounded-2xl border bg-white/50 shadow-sm ">
      <div className="flex items-center gap-4 min-w-0">
        <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-32 sm:h-6 sm:w-40" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <div className="flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-1 md:p-3">
          <Skeleton className="h-5 w-12 sm:h-6" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}
