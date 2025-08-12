import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkillCategorySkeleton = () => (
  <Card className="shadow-coastal hover:shadow-ocean transition-all duration-300">
    <CardHeader className="pb-4">
      <div className="flex items-center space-x-3">
        <Skeleton className="w-8 h-8 rounded" />
        <Skeleton className="h-6 w-32" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton 
            key={index} 
            className="h-8 rounded-full"
            style={{ width: `${Math.random() * 40 + 60}px` }}
          />
        ))}
      </div>
    </CardContent>
  </Card>
);

const SkillsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div 
          key={index}
          className="animate-fade-up"
          style={{animationDelay: `${index * 0.2}s`}}
        >
          <SkillCategorySkeleton />
        </div>
      ))}
    </div>
  );
};

export default SkillsSkeleton;