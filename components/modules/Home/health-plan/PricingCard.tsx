import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Feature = {
  text: string;
  included: boolean;
};

type PricingCardProps = {
  name: string;
  price: string;
  duration: string;
  description: string;
  features: Feature[];
  icon: React.ReactNode;
  popular?: boolean;
};

export function PricingCard({
  name,
  price,
  duration,
  description,
  features,
  icon,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`relative flex flex-col p-6 overflow-visible ${
        popular
          ? "border-primary shadow-xl ring-2 ring-primary/30 scale-105"
          : "border-border"
      }`}
    >
      {popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground px-4 py-1.5 font-semibold shadow-md">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="pb-6">
        <div className="mb-3 flex items-center gap-3">
          {icon}
          <CardTitle className="text-2xl">{name}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="mb-8 flex items-baseline gap-1">
          <span className="text-5xl font-bold">{price}</span>
          <span className="text-muted-foreground">{duration}</span>
        </div>

        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-3">
              {feature.included ? (
                <Check className="size-5 text-green-500 shrink-0" />
              ) : (
                <X className="size-5 text-muted-foreground/50 shrink-0" />
              )}
              <span
                className={
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground line-through"
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-8">
        <Button
          className="w-full"
          size="lg"
          variant={popular ? "default" : "outline"}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
}