// built in imports
import { ArrowLeft } from "lucide-react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// custom imports
import LinkCard from "../components/LinkCard";
import AnalyticsStatsRow from "../components/AnalyticsStatsRow";
import ClicksOverTimeRecharts from "../components/ClicksOverTimeRecharts";
import TopCountriesChart from "../components/TopCountriesChart";
import DeviceBreakdownCard from "../components/DeviceBreakdownCard";
import RecentClicksTable from "../components/RecentClicksTable";
import urlApi from "../api/urlApi";
import LinkCardSkeleton from "../skeletonComponents/LinkCardSkeleton";

function AnalyticsPage() {
  const navigate = useNavigate();
  // short code liya
  const { short_code } = useParams();

  // create query client
  const queryClient = useQueryClient();

  const { data, isPending } = useQuery({
    queryKey: ["analytics_data", short_code],
    queryFn: () => urlApi.get_analytics_data(short_code),
  });

  const isExpired = data?.expires_at
    ? new Date(data.expires_at) < new Date()
    : false;

  const linkData = data
    ? {
        id: data?._id,
        shortCode: data?.short_code,
        originalUrl: data?.original_url,
        createdAt: data?.created_at,
        expireAt: data?.expires_at,
        isExpired: isExpired,
      }
    : null;

  const stats = data
    ? {
        totalClicks: data?.total_clicks,
        todaysClicks: data?.todays_clicks,
        uniqueVisitor: data?.unique_visitors,
      }
    : null;

  console.log(data);

  const { mutate: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: (short_code) => urlApi.deleteLink(short_code),
    onSuccess: () => {
      // cache invalidate karo — list refresh ho jayegi
      queryClient.invalidateQueries({ queryKey: ["userAnalyticsData"] });
      navigate("/dashBoardPage");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

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
          {isPending ? (
            <LinkCardSkeleton />
          ) : linkData ? (
            <LinkCard
              linkData={linkData}
              onDeleteClick={deleteLink}
              isDeleting={isDeleting}
            />
          ) : null}
        </div>

        {/* Analytics Stats.Row */}
        <div>
          <AnalyticsStatsRow stats={stats} />
        </div>

        {/* Clicks Over Time Recharts */}
        <div>
          <ClicksOverTimeRecharts clicksOverTime={data?.clicks_over_time} />
        </div>

        {/* Top Countries Chart and Device Break down Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <TopCountriesChart topCountries={data?.top_countries} />
          </div>

          <div>
            <DeviceBreakdownCard deviceBreakdown={data?.device_breakdown} />
          </div>
        </div>

        {/* Recent Clicks Table */}
        <div>
          <RecentClicksTable recentClicks={data?.recent_clicks} />
        </div>
      </section>
    </>
  );
}
export default AnalyticsPage;
