import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import PricingIntro from "../components/pricing/PricingIntro";
import PricingModel from "../components/pricing/PricingModel";
import PricingExplainer from "../components/pricing/PricingExplainer";
import PricingContact from "../components/pricing/PricingContact";
import PricingServiceDetail from "../components/pricing/PricingServiceDetail";

const PricingPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <PricingIntro />
      <PricingModel />
      <PricingExplainer />
      <PricingContact />
      <PricingServiceDetail />
      <Footer />
    </main>
  </Layout>
);

export default PricingPage;

export const Head = () => <title>Pricing | Pocket Creatives</title>;