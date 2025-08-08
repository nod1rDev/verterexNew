import React from "react";
import AboutUs from "./Components/AboutUs";
import Certifications from "./Components/Certifications";
import Hero from "./Components/Hero";
import MissionSection from "./Components/Core-missions";
import ResourcesForImpact from "./Components/ResourcesForImpact";
import InnovativeSolutions from "./Components/InnovativeSolutions";
import FAQ from "./Components/FAQ";
import CallToAction from "./Components/CallToAction";
import ScientificJournals from "../journals/components/Journals";
import Component from "../for-authours/components/ForAuthours";
import NewsSection from "../news/components/News-section";
import Contact from "../contact/components/Contact";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <>
      <main id="main-content" className="overflow-hidden" role="main">
        <Hero />
        <AboutUs />

        <section id="journals" className=" bg-[#EDF1F9]">
          <div className="max-w-[100%] mx-auto">
            <ScientificJournals />
          </div>
        </section>
       
        <section id="for-authours" className="bg-[#EDF1F9]">
          <div className="max-w-[85%] mx-auto">
            <Component />
          </div>
        </section>
       
        <section id="news" className="bg-[#EDF1F9]">
          <div className="max-w-[90%] mx-auto">
            <NewsSection />
          </div>
        </section>

        <Certifications />

        <section id="contact" className="py-6 bg-[#EDF1F9]">
          <div className="max-w-[85%] mx-auto">
            <Contact />
          </div>
        </section>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
