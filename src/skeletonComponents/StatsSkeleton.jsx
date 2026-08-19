function StatsSkeleton() {
  return (
    <section className="w-full bg-[#ECE3FE] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-300/50">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-6 md:py-2 px-4 text-center gap-2"
            >
              {/* number skeleton */}
              <div className="h-12 w-28 bg-purple-300/50 rounded-lg animate-pulse" />
              {/* label skeleton */}
              <div className="h-4 w-36 bg-purple-300/40 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default StatsSkeleton;
