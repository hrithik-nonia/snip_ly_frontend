// built in imports

// custom imports
import Footer from "../components/Footer";
import StatsBanner from "../components/StatsBanner";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";

function LandingPage() {
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
          <StatsBanner />
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
