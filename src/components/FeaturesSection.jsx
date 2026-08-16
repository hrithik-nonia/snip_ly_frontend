import { BarChart2, Link2, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: BarChart2,
    title: "Analytics",
    description: "Track clicks, country and device data in real-time.",
  },
  {
    icon: Link2,
    title: "Custom Links",
    description: "Create your own branded alias like /my-portfolio.",
  },
  {
    icon: Zap,
    title: "Fast Redirect",
    description:
      "Lightning-fast infrastructure for under 100ms redirect speed.",
  },
  {
    icon: Lock,
    title: "Secure",
    description: "HTTPS always enabled, ensuring your data is safe.",
  },
];

export default function FeaturesSection({
  title = "Everything you need",
  subtitle = "Powerful features to manage and track your links with ease.",
  items = features,
}) {
  return (
    <section className="w-full py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-purple-200 transition-all duration-200"
              >
                {/* Icon Badge */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7C3AED] mb-5">
                  <Icon className="h-5 w-5 stroke-[2.2]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
