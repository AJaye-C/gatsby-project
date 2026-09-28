import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutStudio from "../components/about/AboutStudio";
import OurWorks from "../components/about/OurWorks";
import AboutCompanyTypes from "../components/about/AboutCompanyTypes";
import WhyUs from "../components/about/WhyUs";
import PocketPerson from "../components/about/PocketPerson";
import WorkWith from "../components/about/WorkWith";
import AboutStory from "../components/about/AboutStory";

const AboutPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <AboutHero />
      <AboutStudio />
      <OurWorks />
      <AboutCompanyTypes />
      <WhyUs />
      <PocketPerson />
      <WorkWith />
      <AboutStory />
      <Footer />
    </main>
  </Layout>
);

export default AboutPage;

export const Head = () => <title>About | Pocket Creatives</title>;
