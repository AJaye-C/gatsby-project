import * as React from "react";
import Layout from "../components/Layout";
import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import WorksCategoryReel from "../components/works/WorksCategoryReel";
import WorksGoTo from "../components/works/WorksGoTo";
import WorksVideography from "../components/works/WorksVideography";
import WorksPhotography from "../components/works/WorksPhotography";

const WorksPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Beauty");

  return (
    <Layout>
      <main className="min-h-screen bg-brand-bg text-brand-slate">
        <Header />
        <WorksCategoryReel selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        <WorksGoTo selectedCategory={selectedCategory} />
        <WorksVideography selectedCategory={selectedCategory} />
        <WorksPhotography selectedCategory={selectedCategory} />
        <Footer />
      </main>
    </Layout>
  );
};

export default WorksPage;

export const Head = () => <title>Works | Pocket Creatives</title>;
