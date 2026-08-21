// built in imports
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

// custom imports
import ShortenUrlCard from "../components/ShortenUrlCard";
import DashboardStatsRow from "../components/DashboardStatsRow";
import MyLinksList from "../components/MyLinksList";
import urlApi from "../api/urlApi";
import DashboardStatsRowSkeleton from "../skeletonComponents/DashboardStatsRowSkeleton";
import MyLinksListSkeleton from "../skeletonComponents/MyLinksListSkeleton";

function DashBoardPage() {
  const navigate = useNavigate();
  const [limit, setLimit] = useState(5); // sirf limit chahiye
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setLimit(5); // search change hone pe limit reset
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable
  }, [search]);

  useEffect(() => {
    // eslint-disable-next-line
    setLimit(5);
  }, [debouncedSearch]);

  const { data, isPending } = useQuery({
    queryKey: ["userDashBoardData", limit, debouncedSearch],
    queryFn: () => urlApi.getUserDashBoardData(1, limit, debouncedSearch), // page hamesha 1
  });

  const stats = data?.stats ?? null;
  const BASEURL = data?.BASE_URL ?? null;
  const links = data?.links?.links ?? [];
  const totalLinks = stats?.total_links ?? 0;

  return (
    <>
      <section className="bg-slate-50 px-20 space-y-5 py-5">
        {/* ShortenUrlCard */}
        <section>
          <ShortenUrlCard />
        </section>

        {/* DashboardStatsRow */}
        <section>
          {isPending ? (
            <DashboardStatsRowSkeleton />
          ) : (
            <DashboardStatsRow stats={stats} />
          )}
        </section>

        {/* MyLinksList */}
        <section>
          {isPending ? (
            <MyLinksListSkeleton />
          ) : (
            <MyLinksList
              onAnalyticsClick={() => navigate("/analyticsPage")}
              links={links}
              setLimit={setLimit}
              BASEURL={BASEURL}
              totalLinks={totalLinks}
              search={search}
              setSearch={setSearch}
            />
          )}
        </section>
      </section>
    </>
  );
}
export default DashBoardPage;
