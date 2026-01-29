import { motion } from "framer-motion";
import { ClipboardList, FileBarChart, LayoutDashboard, Users } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: ClipboardList,
      step: "01",
      title: "Take Assessment",
      description: "Complete our 90-question scientific assessment covering 6 key dimensions of your potential.",
    },
    {
      icon: FileBarChart,
      step: "02",
      title: "Get Your Report",
      description: "Receive a detailed, visual report with insights into your interests, aptitude, and personality.",
    },
    {
      icon: LayoutDashboard,
      step: "03",
      title: "Access Dashboard",
      description: "Track your progress, complete personalized tasks, and monitor your growth over time.",
    },
    {
      icon: Users,
      step: "04",
      title: "Connect with Mentor",
      description: "Get one-on-one guidance from experienced mentors who understand your unique profile.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Your Journey to Career Clarity
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple 4-step process that transforms confusion into actionable guidance.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow h-full">
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  {/* Step Badge */}
                  <span className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full mb-4">
                    Step {step.step}
                  </span>

                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
