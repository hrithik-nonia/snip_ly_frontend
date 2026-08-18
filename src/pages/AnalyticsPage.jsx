// built in imports
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";

// custom imports
import LinkCard from "../components/LinkCard";
import AnalyticsStatsRow from "../components/AnalyticsStatsRow";
import ClicksOverTimeRecharts from "../components/ClicksOverTimeRecharts";
import TopCountriesChart from "../components/TopCountriesChart";
import DeviceBreakdownCard from "../components/DeviceBreakdownCard";
import RecentClicksTable from "../components/RecentClicksTable";

function AnalyticsPage() {
  return (
    <>
      <section className="bg-slate-50 px-40 py-10 space-y-5">
        <NavLink
          to="/dashBoardPage"
          className="text-[14px] flex gap-1 items-center"
        >
          <span>
            <ArrowLeft size={"17px"} strokeWidth={1.5} />
          </span>
          <span>Back To DashBoard</span>
        </NavLink>

        {/* link card */}
        <div>
          <LinkCard />
        </div>

        {/* Analytics Stats.Row */}
        <div>
          <AnalyticsStatsRow />
        </div>

        {/* Clicks Over Time Recharts */}
        <div>
          <ClicksOverTimeRecharts />
        </div>

        {/* Top Countries Chart and Device Break down Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <TopCountriesChart />
          </div>

          <div>
            <DeviceBreakdownCard />
          </div>
        </div>

        {/* Recent Clicks Table */}
        <div>
          <RecentClicksTable />
        </div>
      </section>
    </>
  );
}
export default AnalyticsPage;
