export default function DeviceBreakdownCard({ deviceBreakdown = {} }) {
  const devices = Object.entries(deviceBreakdown).map(([name, count]) => {
    return { name, count };
  });

  const total = devices.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5 h-full">
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Device Breakdown
      </h3>

      <div className="space-y-4">
        {devices.map((device) => {
          const percentage =
            total > 0 ? Math.round((device.count / total) * 100) : 0;

          return (
            <div key={device.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700 capitalize">
                  {device.name}
                </span>
                <span className="font-bold text-slate-900">{percentage}%</span>
              </div>

              <div className="h-2.5 w-full bg-slate-100/90 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7C3AED] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
