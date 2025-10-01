import AboutSection from "@/components/AboutUs/AboutSection";
import AboutBanner from "@/components/AboutUs/AboutUsBanner";
import StatsSection from "@/components/AboutUs/StatsSection";
import TeamSection from "@/components/AboutUs/TeamSection";
import ValuesSection from "@/components/AboutUs/ValuesSection";
import { generateDynamicMetadata } from "@/metadata/generateMetadata";

export async function generateMetadata() {
  return generateDynamicMetadata({
    title: "About Us | Premium E-Commerce Experience",
    description: "Learn about our journey, values, and commitment to delivering exceptional quality products with outstanding customer service. Discover what makes us different.",
    keywords: [
      "about us", "our story", "company values", "ecommerce mission",
      "quality products", "customer service", "premium shopping",
      "trusted brand", "shopping experience", "company team"
    ],
  });
}

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <AboutBanner />
      <AboutSection />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
    </div>
  )
}

export default About;