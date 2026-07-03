export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
        <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonFixture() {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
        <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded mx-4" />
        <div className="flex items-center gap-3 flex-1 text-right">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}
