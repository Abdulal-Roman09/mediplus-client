import { Shield, Activity, Heart, Clock } from "lucide-react";
import { PricingCard } from "./PricingCard";
import { ProcessStep } from "./ProcessStep";
import { PlanComparisonTable } from "./PlanComparisonTable";

const PLANS = [
  {
    name: "Basic Care",
    price: "৳99",
    duration: "per month",
    description: "Essential coverage for individuals seeking fundamental health support.",
    features: [
      { text: "General Physician Consultations", included: true },
      { text: "Basic Lab Tests (5% Discount)", included: true },
      { text: "Digital Health Records", included: true },
      { text: "Emergency Support", included: false },
      { text: "Specialist Care", included: false },
    ],
    icon: <Shield className="size-5 text-blue-500" />,
    popular: false,
  },
  {
    name: "Standard Shield",
    price: "৳299",
    duration: "per month",
    description: "Comprehensive protection for families with enhanced benefits.",
    features: [
      { text: "Unlimited GP Consultations", included: true },
      { text: "Lab Tests (15% Discount)", included: true },
      { text: "Digital Health Records", included: true },
      { text: "Emergency Support (24/7)", included: true },
      { text: "Specialist Referrals", included: false },
    ],
    icon: <Activity className="size-5 text-green-500" />,
    popular: true,
  },
  {
    name: "Premium Plus",
    price: "৳599",
    duration: "per month",
    description: "Full-spectrum health management with priority access and maximum savings.",
    features: [
      { text: "Unlimited GP & Specialist", included: true },
      { text: "Lab Tests (30% Discount)", included: true },
      { text: "Home Medicine Delivery", included: true },
      { text: "24/7 Priority Emergency", included: true },
      { text: "Full Annual Checkup", included: true },
    ],
    icon: <Heart className="size-5 text-red-500" />,
    popular: false,
  },
];

const PROCESS_STEPS = [
  { title: "Choose Plan", description: "Select the health plan that best fits your lifestyle and family needs.", icon: <Shield className="size-6" /> },
  { title: "Quick Registration", description: "Provide your basic details and health history in under 2 minutes.", icon: <Clock className="size-6" /> },
  { title: "Instant Activation", description: "Your coverage starts immediately after payment confirmation.", icon: <Activity className="size-6" /> },
];

export default function HealthPlanPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Our Health Plans
        </h1>
        <p className="text-muted-foreground mt-4 text-pretty text-lg max-w-[700px] mx-auto">
          Choose a plan that works for you. Whether you need basic support or complete family coverage, we've got you covered.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      {/* Process Section */}
      <div className="mt-24 rounded-2xl bg-muted/50 p-8 md:p-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">How it Works</h2>
          <p className="text-muted-foreground mt-2">Get covered in three simple steps</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <ProcessStep
              key={step.title}
              {...step}
              isLast={i === PROCESS_STEPS.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div className="mt-24">
        <h2 className="mb-8 text-center text-3xl font-bold">Plan Comparison</h2>
        <PlanComparisonTable />
      </div>
    </div>
  );
}