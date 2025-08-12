import { Card, CardContent } from '@/components/ui/card';

const PublicationSkeleton = () => {
  return (
    <Card className="shadow-coastal border-0 animate-pulse">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
          </div>
          
          {/* Venue and Year */}
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          
          {/* Authors */}
          <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
          
          {/* Abstract teaser */}
          <div className="p-3 bg-gray-50 rounded-md border-l-4 border-gray-200">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/5"></div>
            </div>
          </div>
          
          {/* Badges and DOI */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 bg-gray-200 rounded-md w-16"></div>
              <div className="h-6 bg-gray-200 rounded-md w-8"></div>
              <div className="h-6 bg-gray-200 rounded-md w-12"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-md w-24"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationSkeleton;