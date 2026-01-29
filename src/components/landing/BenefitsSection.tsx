import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Users, Building2 } from "lucide-react";

const BenefitsSection = () => {
  const benefitGroups = [
    {
      icon: GraduationCap,
      title: "For Students",
      benefits: [
        "Discover your true interests and strengths",
        "Get clarity on career and stream choices",
        "Personalized tasks for skill development",
        "Track progress with visual dashboards",
        "One-on-one mentorship support",
      ],
    },
    {
      icon: Users,
      title: "For Parents",
      benefits: [
        "Understand your child's potential scientifically",
        "Data-driven insights for informed decisions",
        "Monitor progress and development",
        "Access to mentor session summaries",
        "Peace of mind about career choices",
      ],
    },
    {
      icon: Building2,
      title: "For Schools",
      benefits: [
        "Comprehensive student analytics",
        "Early identification of at-risk students",
        "Structured counseling framework",
        "Batch assessment capabilities",
        "Integration with existing programs",
      ],
    },
  ];

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Benefits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Value for Everyone
          </h2>
          <p className="text-muted-foreground text-lg">
            Our platform creates impact across the entire educational ecosystem.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefitGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <group.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.benefits.map((benefit, benefitIndex) => (
                  <motion.li
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: groupIndex * 0.1 + benefitIndex * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
