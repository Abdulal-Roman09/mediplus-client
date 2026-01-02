"use client";

import { offerings } from "./offeringJson";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhatWeOffer() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            What We Offer
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A complete ecosystem of digital healthcare features to ensure your
            well-being is always a click away.
          </p>
        </div>
        {/* Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {offerings.map((item, index) => (
            <Card
              key={index}
              className="relative group overflow-hidden border bg-card  transition-all duration-500 min-h-[300px] flex flex-col px-8"
            >
              {/* Animated Glow Effect on Hover */}
              <div
                className={`absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-5 blur-3xl transition-opacity group-hover:opacity-20 `}
              />
              <CardHeader className="p-0 text-center flex flex-col items-center">
                {/* Dynamic Styled Icon Wrapper */}
                <div
                  className={`mb-6 p-6 rounded-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${item.color}`}
                >
                  {item.icon}
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight mb-4">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-center">
                <p className="text-muted-foreground text-base leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
              {/* Animated Bottom Line */}
              <div
                className={`absolute bottom-0 left-0 h-1.5 w-0 transition-all duration-500 group-hover:w-full ${item.color.replace(
                  "text",
                  "bg"
                )}`}
              />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
