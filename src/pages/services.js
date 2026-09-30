import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import ServicesVideoIntro from "../components/services/ServicesVideoIntro";
import ServicesVideoProcess from "../components/services/ServicesVideoProcess";
import ServicesPhotoIntro from "../components/services/ServicesPhotoIntro";
import ServicesPhotoProcess from "../components/services/ServicesPhotoProcess";
import ServicesWholePackage from "../components/services/ServicesWholePackage";
import ServicesProcessSlider from "../components/services/ServicesProcessSlider";

const ServicesPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <ServicesVideoIntro />
      <ServicesVideoProcess />
      <ServicesPhotoIntro />
      <ServicesPhotoProcess />
      <ServicesWholePackage />
      <ServicesProcessSlider />
      <Footer />
    </main>
  </Layout>
);

export default ServicesPage;

export const Head = () => <title>Services | Pocket Creatives</title>;
