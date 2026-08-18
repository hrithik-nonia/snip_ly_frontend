import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const mockDataMap = {
  "7 Days": [
    { day: "Mon", clicks: 25 },
    { day: "Tue", clicks: 42 },
    { day: "Wed", clicks: 35 },
    { day: "Thu", clicks: 58 },
    { day: "Fri", clicks: 50 },
    { day: "Sat", clicks: 75 },
    { day: "Sun", clicks: 85 },
  ],
  "30 Days": [
    { day: "Week 1", clicks: 120 },
    { day: "Week 2", clicks: 240 },
    { day: "Week 3", clicks: 190 },
    { day: "Week 4", clicks: 380 },
  ],
  "All Time": [
    { day: "Jan", clicks: 300 },
    { day: "Feb", clicks: 500 },
    { day: "Mar", clicks: 450 },
    { day: "Apr", clicks: 800 },
    { day: "May", clicks: 1200 },
  ],
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-purple-100 bg-slate-900 px-3 py-1.5 text-xs text-white shadow-lg font-semibold">
        <p className="text-purple-300">{`${label}`}</p>
        <p>{`${payload[0].value} clicks`}</p>
      </div>
    );
  }
  return null;
};

export default function ClicksOverTimeRecharts() {
  const [activeRange, setActiveRange] = useState("7 Days");

  const data = mockDataMap[activeRange] || mockDataMap["7 Days"];

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
      {/* Card Header & Time Range Filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl font-bold tracking-tight text-slate-900">
          Clicks Over Time
        </h3>

        {/* Time Range Selector */}
        <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100/80 p-1 text-xs font-semibold">
          {["7 Days", "30 Days", "All Time"].map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setActiveRange(range)}
              className={`rounded-lg px-3 py-1.5 transition-all duration-150 ${
                activeRange === range
                  ? "bg-[#7C3AED] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart Container */}
      <div className="h-60 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              {/* Soft Purple Fill Gradient */}
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            {/* X-Axis */}
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={{ stroke: "#E2E8F0", strokeWidth: 1 }}
              tick={{ fill: "#94A3B8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            {/* Hidden Y-Axis for vertical alignment */}
            <YAxis hide domain={["dataMin - 5", "dataMax + 10"]} />

            {/* Tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Area Line */}
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#7C3AED"
              strokeWidth={3.5}
              fillOpacity={1}
              fill="url(#colorClicks)"
              activeDot={{
                r: 6,
                fill: "#7C3AED",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
