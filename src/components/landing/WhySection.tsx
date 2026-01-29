import { motion } from "framer-motion";
import { AlertCircle, Brain, Compass, BookOpen, Flame, Home } from "lucide-react";

const WhySection = () => {
  const problems = [
    { stat: "70%", text: "of students are confused about career choices" },
    { stat: "60%", text: "choose streams based on peer/parent pressure" },
    { stat: "45%", text: "end up in careers misaligned with their strengths" },
  ];

  const dimensions = [
    { icon: Compass, name: "Interest", desc: "RIASEC-based interests", color: "text-primary" },
    { icon: Brain, name: "Aptitude", desc: "Cognitive tendencies", color: "text-accent" },
    { icon: AlertCircle, name: "Personality", desc: "Behavioral traits", color: "text-emerald-500" },
    { icon: BookOpen, name: "Study Style", desc: "Learning discipline", color: "text-amber-500" },
    { icon: Flame, name: "Motivation", desc: "Drive & stress handling", color: "text-violet-500" },
    { icon: Home, name: "Environment", desc: "Constraints & support", color: "text-rose-500" },
  ];

  return (
    <section id="why" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Why Early Assessment Matters
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            The Career Confusion Crisis
          </h2>
          <p className="text-muted-foreground text-lg">
            Without proper guidance, students often make uninformed decisions that 
            impact their entire professional life.
          </p>
        </motion.div>

        {/* Problem Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-destructive mb-2">
                {problem.stat}
              </div>
              <p className="text-muted-foreground">{problem.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution - 6 Dimensions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Our 6-Dimensional Assessment
            </h3>
            <p className="text-muted-foreground">
              90 scientifically designed questions covering every aspect of student potential
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensions.map((dim, index) => (
              <motion.div
                key={dim.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                  <dim.icon className={`w-5 h-5 ${dim.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{dim.name}</h4>
                  <p className="text-sm text-muted-foreground">{dim.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhySection;
