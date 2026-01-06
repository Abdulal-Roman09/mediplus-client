/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MailCheck } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/ux/sharedComponents/logo";
import FormInput from "@/components/ux/FromProvider/FromInput";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import { ForgetPasswordSchema } from "@/Validation/forgetPasswordValidation";
import { post } from "@/services/api/api";

type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;

export default function ForgetPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSentTo, setEmailSentTo] = useState("");

  const handleForgetPassword = async (values: ForgetPasswordData) => {
    try {
      await post("/auth/forget-password", values, {
        headers: { "Content-Type": "application/json" },
      });
      setEmailSentTo(values.email);
      setIsSubmitted(true);
      toast.success("Reset link sent successfully!");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0 px-2">
        <div className="flex items-center justify-center pt-8">
          <Logo />
        </div>

        {!isSubmitted ? (
          <>
            <CardHeader className="space-y-2 pb-6 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-sm">
                No worries, we&apos;ll send you reset instructions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormHendeler
                onSubmit={handleForgetPassword}
                resolver={zodResolver(ForgetPasswordSchema)}
                defaultValues={{ email: "" }}
              >
                <div className="space-y-5">
                  <FormInput
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                  <Button className="w-full py-6 text-base" type="submit">
                    Send Reset Link
                  </Button>
                </div>
              </FormHendeler>
            </CardContent>
          </>
        ) : (
          <CardContent className="py-10 text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <MailCheck className="w-12 h-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Check your email
              </h2>
              <p className="text-muted-foreground text-sm">
                We sent a password reset link to <br />
                <span className="font-semibold text-primary">
                  {emailSentTo}
                </span>
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Try another email
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
