import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HowWeWorkIntro from "../components/how-we-work/HowWeWorkIntro";
import HowWeWorkAccordion from "../components/how-we-work/HowWeWorkAccordion";
import HowWeWorkShoot from "../components/how-we-work/HowWeWorkShoot";
import HowWeWorkContact from "../components/how-we-work/HowWeWorkContact";

const HowWeWorkPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <HowWeWorkIntro />
      <HowWeWorkAccordion />
      <HowWeWorkShoot />
      <HowWeWorkContact />
      <Footer />
    </main>
  </Layout>
);

export default HowWeWorkPage;

export const Head = () => (
  <>
    <title>How We Work | Pocket Creatives</title>
    {/* TODO: Add approved SEO description and social metadata. */}
  </>
);
