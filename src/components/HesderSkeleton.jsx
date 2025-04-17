import Skeleton from 'react-loading-skeleton';

export default function HesderSkeleton() {
    return (
      <header className="flex justify-between items-center h-16 bg-white px-6 py-4 border-b border-gray-200">
  
  
        <div className="flex items-center space-x-2 p-2">
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
          <Skeleton width={180} height={34} />
          </div>
  
        <div className="flex items-center space-x-2 p-2">
        <Skeleton width={150} height={34} />
  
        <Skeleton width={150} height={34} className="ml-8" />
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        </header>
      );
}
