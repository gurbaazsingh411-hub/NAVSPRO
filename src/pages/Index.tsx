import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import WhySection from "@/components/landing/WhySection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <motion.div {...fadeInUp}>
        <HeroSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <AboutSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <WhySection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <HowItWorksSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <BenefitsSection />
      </motion.div>
      <motion.div {...fadeInUp}>
        <TestimonialsSection />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Index;
