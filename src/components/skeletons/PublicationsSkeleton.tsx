import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const PublicationCardSkeleton = () => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-4/5" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="w-6 h-6 rounded" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
          <Skeleton className="h-9 w-32 rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResearchMetricsSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="text-center">
        <Skeleton className="h-12 w-16 mx-auto mb-2" />
        <Skeleton className="h-4 w-20 mx-auto mb-1" />
        <Skeleton className="h-3 w-16 mx-auto" />
      </div>
    ))}
  </div>
);

const FilterTabsSkeleton = () => (
  <div className="flex flex-wrap justify-center gap-4 mb-12">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-10 w-20 rounded-full" />
    ))}
  </div>
);

interface PublicationsSkeletonProps {
  items?: number;
  showMetrics?: boolean;
  showFilters?: boolean;
}

const PublicationsSkeleton = ({ 
  items = 6, 
  showMetrics = true, 
  showFilters = true 
}: PublicationsSkeletonProps) => {
  return (
    <div>
      {showMetrics && <ResearchMetricsSkeleton />}
      {showFilters && <FilterTabsSkeleton />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: items }).map((_, index) => (
          <div 
            key={index}
            className="animate-fade-up"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <PublicationCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicationsSkeleton;