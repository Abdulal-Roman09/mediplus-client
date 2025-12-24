"use client";

import { FieldValue } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ux/components/logo";
import Link from "next/link";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPaient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { patientLogin } from "@/services/actions/loginPatient";
import { storeUserInfo } from "@/services/auth.serivce";
import { LogIn } from "lucide-react";
import FormHandler from "@/provider/FromProvider/FormHandler";
import FormInput from "@/provider/FromProvider/FromInput";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (values: FieldValue) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPaient(data);
      if (res?.success && res?.data?.id) {
        toast.success("Registration successful!", {
          position: "top-center",
          icon: <LogIn className="w-5 h-5" />,
        });

        const result = await patientLogin({
          password: values.password,
          email: values.patient.email,
        });

        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
        }

        router.push("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <Card className="w-full max-w-2xl shadow-xl border-0 px-4">
        {/* Logo */}
        <div className="flex justify-center pt-8 pb-4">
          <Logo />
        </div>

        {/* Header */}
        <CardHeader className="text-center space-y-3 pb-6">
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Create Account
          </CardTitle>
          <CardDescription className="text-base">
            Join us and book doctor appointments easily
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent className="space-y-6 pb-8">
          <FormHandler onSubmit={handleRegister}>
            <div className="space-y-6">
              {/* Full Name */}
              <FormInput
                name="patient.name"
                label="Full Name"
                placeholder="Enter your full name"
                required
              />

              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="patient.email"
                  label="Email"
                  type="email"
                  placeholder="example@gmail.com"
                  required
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Contact & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  name="patient.contactNumber"
                  label="Contact Number"
                  placeholder="017xxxxxxxxxx"
                  required
                />
                <FormInput
                  name="patient.address"
                  label="Address"
                  placeholder="Enter your full address"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 text-base font-medium hover:opacity-90 transition-opacity"
              >
                Register
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground pt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium underline hover:text-primary/80"
              >
                Log In
              </Link>
            </p>
          </FormHandler>
        </CardContent>
      </Card>
    </div>
  );
}
