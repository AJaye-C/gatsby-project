import * as React from "react";
import Layout from "../components/Layout";
import {
  Header,
  Hero,
  QualitySection,
  VideoScroller,
  PhotographySection,
  ServicesChecklist,
  BehindTheScenes,
  TeamSection,
  PricingCTA,
  Footer,
} from "../components/home";

const IndexPage = () => {
  const [activeCategory, setActiveCategory] = React.useState("beauty");
  const [btsMuted, setBtsMuted] = React.useState(true);

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate">
        <Header />
        <Hero />
        <QualitySection />
        <VideoScroller />
        <PhotographySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <ServicesChecklist />
        <TeamSection />
        <BehindTheScenes btsMuted={btsMuted} setBtsMuted={setBtsMuted} />
        <PricingCTA />
        <Footer />
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Pocket Creatives</title>;