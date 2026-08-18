const defaultDevices = [
  { name: "Mobile", percentage: 68 },
  { name: "Desktop", percentage: 28 },
  { name: "Tablet", percentage: 4 },
];

export default function DeviceBreakdownCard({ devices = defaultDevices }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm space-y-5 h-full">
      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-slate-900">
        Device Breakdown
      </h3>

      {/* Progress Bars List */}
      <div className="space-y-4">
        {devices.map((device, idx) => (
          <div key={idx} className="space-y-1.5">
            {/* Label & Percentage */}
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">{device.name}</span>
              <span className="font-bold text-slate-900">
                {device.percentage}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="h-2.5 w-full bg-slate-100/90 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7C3AED] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${device.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
