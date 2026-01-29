import { motion } from "framer-motion";
import { Target, Lightbulb, Heart, Shield } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Early Identification",
      description: "Recognize potential and interests at the right age to guide career choices effectively.",
    },
    {
      icon: Lightbulb,
      title: "Scientific Approach",
      description: "Research-backed assessments covering interests, aptitude, personality, and more.",
    },
    {
      icon: Heart,
      title: "Holistic Development",
      description: "Focus on overall growth including study habits, motivation, and stress management.",
    },
    {
      icon: Shield,
      title: "Personalized Guidance",
      description: "One-on-one mentorship tailored to each student's unique profile and aspirations.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              About NAVSPRO
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Guiding Students Toward{" "}
              <span className="text-primary">Career Clarity</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              NAVSPRO LLP is dedicated to helping students from Classes 6–12 discover 
              their true potential through scientific assessments and personalized mentorship. 
              We believe every student deserves guidance that aligns with their unique 
              strengths and aspirations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform combines cutting-edge assessment methodologies with human 
              expertise to provide actionable insights that transform confusion into clarity. 
              We're not just another test — we're a complete student growth system.
            </p>
          </motion.div>

          {/* Right - Values Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
