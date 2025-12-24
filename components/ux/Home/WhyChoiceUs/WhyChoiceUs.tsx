import React from "react";
import {
  Award,
  HeartHandshake,
  Clock,
  Users,
  Shield,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Experienced Doctors",
      description:
        "Our team consists of highly qualified and top-rated specialists with years of expertise.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Patient-Centered Care",
      description:
        "We prioritize your comfort, listen to your concerns, and provide personalized treatment plans.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Appointments",
      description:
        "Book instantly online and get confirmed slots without long waiting times.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted by Thousands",
      description:
        "Over 50,000+ happy patients have chosen us for their healthcare needs.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safe & Hygienic",
      description:
        "We follow strict hygiene protocols and use modern sterilized equipment.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Transparent Pricing",
      description:
        "No hidden charges — clear and affordable consultation fees from the start.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Patients <span className="text-primary">Choose Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are committed to providing exceptional healthcare with trust,
            compassion, and excellence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-border 
                         transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Background */}
              <div
                className="inline-flex items-center justify-center w-16 h-16 
                              bg-primary/10 dark:bg-primary/20 text-primary rounded-xl mb-6 
                              group-hover:bg-primary group-hover:text-primary-foreground 
                              transition-all duration-300"
              >
                {feature.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Overlay Effect */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the best healthcare?
          </p>
          <button
            className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-xl 
                             hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Book an Appointment Today
          </button>
        </div>
      </div>
    </section>
  );
}
