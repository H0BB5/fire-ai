import { Skeleton } from "@/components/ui/skeleton";
const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent dark:before:via-white/10 before:to-transparent`;

export const TagFormSkeleton = () => {
  return (
    <div className="w-full space-y-8 top-0 left-0 z-10">
      <div className="space-y-2 w-full">
        <Skeleton className={`mt-1 h-4 w-1/2 md:w-1/4 ${shimmer}`} />
        <Skeleton className={`mt-3 h-4 w-3/4 md:w-5/12 ${shimmer}`} />
        <Skeleton className={`mt-2 h-1 w-full ${shimmer}`} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-1/3 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-5/12 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-1/3 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-5/12 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-1/3 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-2 h-4 w-1/2 md:w-1/3 ${shimmer}`} />
          <Skeleton className={`mb-1 mt-2 h-10 w-full ${shimmer}`} />
        </div>
        <Skeleton className={`mt-[0.5rem] md:mt-0 h-10 w-[280px] ${shimmer}`} />
      </div>
      {/* TECHNICIAN NOTES */}
      <div className="space-y-2 w-full">
        <div className="col-span-2 md:col-span-1">
          <Skeleton className={`mt-1 h-4 w-1/2 md:w-1/4 ${shimmer}`} />
          <Skeleton className={`mt-2 h-4 w-3/4 md:w-4/6 ${shimmer}`} />
        </div>
        <div className="md:mt-2">
          <Skeleton className={`h-40 w-full ${shimmer}`} />
        </div>
      </div>
      <div className="w-full">
        <Skeleton className={`w-64 h-12 ${shimmer}`} />
      </div>
    </div>
  );
};
