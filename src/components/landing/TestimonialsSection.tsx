import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Class 11 Student",
      school: "DPS, Noida",
      content: "The assessment helped me understand why I've always been drawn to creative activities. Now I'm confidently pursuing design instead of following the engineering crowd.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      school: "Father of Class 9 student",
      content: "As a parent, I finally have scientific data to support my son's career discussions. The detailed report removed so much guesswork from our planning.",
      rating: 5,
    },
    {
      name: "Dr. Meera Patel",
      role: "School Counselor",
      school: "Ryan International School",
      content: "NAVSPRO has transformed how we approach career counseling. The 6-dimensional assessment gives us comprehensive insights we never had before.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            What People Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Hear from students, parents, and educators who have experienced the NAVSPRO difference.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Quote className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                <div className="text-xs text-muted-foreground mt-1">{testimonial.school}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
