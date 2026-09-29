import * as React from "react";
import Layout from "../components/Layout";
import WorksCategoryReel from "../components/works/WorksCategoryReel";
import WorksGoTo from "../components/works/WorksGoTo";
import {
  Header,
  Hero,
  VideoCTABanner,
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
  const [worksCategory, setWorksCategory] = React.useState("Beauty");

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate">
        <Header />
        <Hero />
        <VideoCTABanner />
        <div id="videography">
          <VideoScroller />
        </div>
        <QualitySection />
        <div id="photography">
          <PhotographySection activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        </div>
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