"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Video,
  ShieldCheck,
  Users,
  Clock,
  Stethoscope,
  FileText,
  Calendar,
  MessageSquare,
} from "lucide-react";

export default function WhatWeOfferPage() {
  return (
    <div>
      {/* Key Features */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">What We Offer</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          We provide a comprehensive set of features designed to make your
          healthcare experience seamless and effective.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <Stethoscope className="mx-auto h-10 w-10 " />
              <CardTitle>Expert Doctors</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Verified specialists across various medical fields.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <Video className="mx-auto h-10 w-10 " />
              <CardTitle>Video Consultation</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Live video calls for real-time medical advice from home.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <ShieldCheck className="mx-auto h-10 w-10 " />
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Your personal and medical information is fully protected with
              advanced encryption.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <Users className="mx-auto h-10 w-10 " />
              <CardTitle>User-Friendly Interface</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Intuitive design for easy navigation on any device.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <Calendar className="mx-auto h-10 w-10 " />
              <CardTitle>Easy Scheduling</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Book and manage appointments effortlessly.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <Clock className="mx-auto h-10 w-10 " />
              <CardTitle>24/7 Availability</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Access doctors anytime, even on holidays.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <FileText className="mx-auto h-10 w-10 " />
              <CardTitle>Digital Prescriptions</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Receive e-prescriptions directly in the app.
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-xl transition-shadow">
            <CardHeader>
              <MessageSquare className="mx-auto h-10 w-10 " />
              <CardTitle>Secure Chat</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Text-based follow-ups and quick queries.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
