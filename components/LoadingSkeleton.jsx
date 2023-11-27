import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-900">
      <div className="container mx-auto grid h-full gap-8 grid-cols-3 max-md:grid-cols-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <Skeleton className="h-40 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
