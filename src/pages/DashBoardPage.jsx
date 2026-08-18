// built in imports

// custom imports
import ShortenUrlCard from "../components/ShortenUrlCard";
import DashboardStatsRow from "../components/DashboardStatsRow";
import MyLinksList from "../components/MyLinksList";

function DashBoardPage() {
  return (
    <>
      <section className="bg-slate-50 px-20 space-y-5 py-5">
        {/* ShortenUrlCard */}
        <section>
          <ShortenUrlCard />
        </section>

        {/* DashboardStatsRow */}
        <section>
          <DashboardStatsRow />
        </section>

        {/* MyLinksList */}
        <section>
          <MyLinksList />
        </section>
      </section>
    </>
  );
}
export default DashBoardPage;
