import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Award, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();
  const stats = [
    { icon: Users, value: "5000+", label: "Students Assessed" },
    { icon: Award, value: "95%", label: "Satisfaction Rate" },
    { icon: TrendingUp, value: "50+", label: "Partner Schools" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Scientific Assessment Platform
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Discover Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">
                True Potential
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl">
              A comprehensive 90-question assessment designed to unlock students'
              interests, aptitude, and personality — guiding them toward the right
              career path with personalized mentorship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" onClick={() => navigate('/assessment')}>
                Start Assessment
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                For Schools & Institutions
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
              <div className="absolute -top-3 -right-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                Sample Report
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-4">
                Interest Assessment Results
              </h3>

              <div className="space-y-4">
                {[
                  { name: "Analytical", value: 85, color: "bg-primary" },
                  { name: "Creative", value: 72, color: "bg-accent" },
                  { name: "Social", value: 68, color: "bg-emerald-500" },
                  { name: "Practical", value: 55, color: "bg-amber-500" },
                  { name: "Investigative", value: 78, color: "bg-violet-500" },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-medium text-foreground">{item.value}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Top Match:</span>{" "}
                  Engineering & Technology with strong analytical and investigative traits.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
