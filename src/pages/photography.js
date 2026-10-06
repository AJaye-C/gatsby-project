import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import PhotographyHero from "../components/photography/PhotographyHero";
import PhotographyServices from "../components/photography/PhotographyServices";
import PhotographyContact from "../components/photography/PhotographyContact";
import PhotographyProcess from "../components/photography/PhotographyProcess";

const PhotographyPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <PhotographyHero />
      <PhotographyServices />
      <PhotographyContact />
      <PhotographyProcess />
      <Footer />
    </main>
  </Layout>
  );
};

export default PhotographyPage;

// TODO: Add approved Photography page metadata when supplied.
export const Head = () => <title>Photography | Pocket Creatives</title>;