import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import TestimonialsIntro from "../components/testimonials/TestimonialsIntro";
import TestimonialsCarousel from "../components/testimonials/TestimonialsCarousel";
import TestimonialsContact from "../components/testimonials/TestimonialsContact";
import TestimonialsDetails from "../components/testimonials/TestimonialsDetails";
import { getTestimonialPage } from "../data/testimonialPages";

const page = getTestimonialPage("photography");
const PhotographyTestimonialsPage = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return <Layout><main className="min-h-screen bg-brand-bg text-brand-slate"><Header /><TestimonialsIntro heading={page.heading} paragraphs={page.intro} layout={page.introLayout} /><TestimonialsCarousel slides={page.slides} /><TestimonialsContact heading={page.contact.heading} paragraph={page.contact.paragraph} logLabel="Photography testimonials contact form" /><TestimonialsDetails details={page.details} /><Footer /></main></Layout>;
};
export default PhotographyTestimonialsPage;
// TODO: Add approved testimonial page metadata when supplied.
export const Head = () => <title>Photography Testimonials | Pocket Creatives</title>;