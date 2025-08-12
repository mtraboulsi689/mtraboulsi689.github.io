import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProjectCardSkeleton = () => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
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
          <Skeleton className="h-4 w-4/5" />
        </div>
        
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-2">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
          </div>
          <Skeleton className="h-9 w-24 rounded" />
        </div>
      </div>
    </CardContent>
  </Card>
);

interface ProjectsSkeletonProps {
  items?: number;
}

const ProjectsSkeleton = ({ items = 6 }: ProjectsSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: items }).map((_, index) => (
        <div 
          key={index}
          className="animate-fade-up"
          style={{animationDelay: `${index * 0.1}s`}}
        >
          <ProjectCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export default ProjectsSkeleton;