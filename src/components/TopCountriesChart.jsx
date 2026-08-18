import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const countryData = [
  { name: "India", value: 45, color: "#7C3AED" },
  { name: "USA", value: 30, color: "#8B5CF6" },
  { name: "UK", value: 15, color: "#A78BFA" },
  { name: "Others", value: 10, color: "#DDD6FE" },
];

export default function TopCountriesChart({ data = countryData }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm h-full">
      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-4">
        Top Countries
      </h3>

      {/* Main Content Layout (Pie Chart + Legend) */}
      <div className="flex items-center justify-between gap-6">
        {/* Left: Recharts Pie Chart */}
        <div className="h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="#FFFFFF"
                strokeWidth={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val) => [`${val}%`, "Share"]}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "#0F172A",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: "600",
                }}
                itemStyle={{ color: "#E2E8F0" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Legend List */}
        <div className="flex-1 space-y-3">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-sm font-semibold"
            >
              {/* Dot & Label */}
              <div className="flex items-center gap-2.5">
                <span
                  className="h-3 w-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-700 font-medium">{item.name}</span>
              </div>

              {/* Percentage */}
              <span className="text-slate-900 font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
