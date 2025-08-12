import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const TimelineItemSkeleton = ({ isLast }: { isLast: boolean }) => (
  <div className="relative flex items-start space-x-6 pb-8">
    {/* Timeline line */}
    {!isLast && (
      <div className="absolute left-6 top-16 w-0.5 h-full bg-muted/50" />
    )}
    
    {/* Icon skeleton */}
    <div className="flex-shrink-0 relative z-10">
      <Skeleton className="w-12 h-12 rounded-full" />
    </div>
    
    {/* Content skeleton */}
    <div className="flex-1 min-w-0">
      <Card className="shadow-coastal">
        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Title */}
            <Skeleton className="h-6 w-3/4" />
            
            {/* Subtitle */}
            <Skeleton className="h-4 w-1/2" />
            
            {/* Institution and location */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            
            {/* Highlights */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-1/4" />
              <div className="space-y-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

interface TimelineSkeletonProps {
  items?: number;
}

const TimelineSkeleton = ({ items = 3 }: TimelineSkeletonProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="animate-fade-up">
          <TimelineItemSkeleton isLast={index === items - 1} />
        </div>
      ))}
    </div>
  );
};

export default TimelineSkeleton;