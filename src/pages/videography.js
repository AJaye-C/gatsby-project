import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import VideographyHero from "../components/videography/VideographyHero";
import VideographyIntro from "../components/videography/VideographyIntro";
import VideographyPortfolio from "../components/videography/VideographyPortfolio";
import VideographyProcess from "../components/videography/VideographyProcess";

const VideographyPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <VideographyHero />
      <VideographyIntro />
      <VideographyPortfolio />
      <VideographyProcess />
      <Footer />
    </main>
  </Layout>
  );
};

export default VideographyPage;

// TODO: Add approved Videography page metadata when supplied.
export const Head = () => <title>Videography | Pocket Creatives</title>;