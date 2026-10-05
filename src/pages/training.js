import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import TrainingIntro from "../components/training/TrainingIntro";
import TrainingHowItWorks from "../components/training/TrainingHowItWorks";
import TrainingCourses from "../components/training/TrainingCourses";
import TrainingBehindTheScenes from "../components/training/TrainingBehindTheScenes";
import TrainingTestimonials from "../components/training/TrainingTestimonials";

const TrainingPage = () => (
  <Layout>
    <main className="min-h-screen bg-brand-bg">
      <Header />
      <TrainingIntro />
      <TrainingHowItWorks />
      <TrainingCourses />
      <TrainingBehindTheScenes />
      <TrainingTestimonials />
      <Footer />
    </main>
  </Layout>
);

export default TrainingPage;

export const Head = () => (
  <>
    <title>Creative Training Courses | Pocket Creatives</title>
    {/* TODO: add approved SEO description and social metadata. */}
  </>
);
