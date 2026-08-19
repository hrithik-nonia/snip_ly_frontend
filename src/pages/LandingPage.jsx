// built in imports
import { useQuery } from "@tanstack/react-query";

// custom imports
import Footer from "../components/Footer";
import StatsBanner from "../components/StatsBanner";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import urlApi from "../api/urlApi";
import { formatCount } from "../utils/helperFunctions";

function LandingPage() {
  const { data, isError } = useQuery({
    queryKey: ["homeStats"],
    queryFn: urlApi.stats,
  });

  const statsData = data
    ? [
        { value: formatCount(data.total_links), label: "LINKS CREATED" },
        {
          value: formatCount(data.clicks?.total_clicks),
          label: "TOTAL CLICKS",
        },
        {
          value: formatCount(data.clicks?.countries_reached),
          label: "COUNTRIES REACHED",
        },
      ]
    : null;

  return (
    <>
      <section>
        {/* HeroSection */}
        <section>
          <HeroSection />
        </section>

        {/* FeaturesSection */}
        <section>
          <FeaturesSection />
        </section>

        {/* StatsBanner */}
        <section>
          {isError ? (
            <StatsBanner stats={null} />
          ) : (
            <StatsBanner stats={statsData} />
          )}
        </section>

        {/* footer */}
        <section>
          <Footer />
        </section>
      </section>
    </>
  );
}
export default LandingPage;
