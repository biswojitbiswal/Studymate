import CTASection from "@/components/landing/CTASection";
import ExploreClassesResources from "@/components/landing/ExploreClassResource";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import KeyBenefits from "@/components/landing/KeyBenefits";
import Navbar from "@/components/landing/Navbar";
import WhoIsStudyMateFor from "@/components/landing/WhoIsStudymateFor";
import WorkflowDiagram from "@/components/landing/WorkFlowCard";

export default function HomePage() {
  
  return (
    <>
      <Hero />
      <KeyBenefits />
      <WorkflowDiagram />
      <WhoIsStudyMateFor />
      <ExploreClassesResources />
      <HowItWorks />
      <CTASection />
    </>
  );
}
