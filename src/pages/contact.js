import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactMap from "../components/contact/ContactMap";
import ContactVacanciesPartners from "../components/contact/ContactVacanciesPartners";

const ContactPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg text-brand-slate">
      <Header />
      <ContactHero />
      <ContactMap />
      <ContactVacanciesPartners />
      <Footer />
    </main>
  </Layout>
);

export default ContactPage;

export const Head = () => (
  <>
    <title>Contact | Pocket Creatives</title>
    <meta name="description" content="TODO: Add Contact page meta description." />
  </>
);
