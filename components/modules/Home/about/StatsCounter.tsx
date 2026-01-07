"use client";

import React from "react";
import CountUp from "react-countup";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Stethoscope, Activity } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    {
      title: "Total Patients",
      value: 15000,
      icon: <Users className="w-8 h-8 text-yellow-300" />,
      description: "Trusted by thousands of users worldwide",
      suffix: "+",
    },
    {
      title: "Expert Doctors",
      value: 450,
      icon: <Stethoscope className="w-8 h-8 text-primary" />,
      description: "Certified and experienced specialists",
      suffix: "+",
    },
    {
      title: "Medical Specialties",
      value: 35,
      icon: <Activity className="w-8 h-8 text-red-400" />,
      description: "Diverse healthcare departments",
      suffix: "",
    },
    {
      title: "Successful Consultations",
      value: 50000,
      icon: <UserCheck className="w-8 h-8 text-green-400" />,
      description: "Quality healthcare delivered remotely",
      suffix: "+",
    },
  ];

  return (
    <section className="pt-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Our Impact in Numbers
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Providing reliable digital healthcare services for the last 5 years
            with a mission to make healthcare accessible for everyone.
          </p>
        </div>
        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border bg-card shadow-sm ">
              <CardContent className="flex flex-col items-center p-8">
                {/* Icon Area */}
                <div className="p-3  rounded-xl mb-5 text-foreground">
                  {stat.icon}
                </div>
                {/* React CountUp */}
                <div className="text-3xl font-bold tracking-tight mb-1">
                  <CountUp
                    end={stat.value}
                    duration={3}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                    suffix={stat.suffix}
                  />
                </div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
