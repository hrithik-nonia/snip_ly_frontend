const statsData = [
  {
    value: "1M+",
    label: "LINKS CREATED",
  },
  {
    value: "50M+",
    label: "TOTAL CLICKS",
  },
  {
    value: "195",
    label: "COUNTRIES REACHED",
  },
];

export default function StatsBanner({ stats = statsData }) {
  return (
    <section className="w-full bg-[#ECE3FE] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-purple-300/50">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center py-6 md:py-2 px-4 text-center"
            >
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-[#7C3AED]">
                {stat.value}
              </span>
              <span className="mt-2 text-xs font-bold tracking-wider text-slate-600 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
