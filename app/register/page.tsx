"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ux/components/logo";
import Link from "next/link";
import { registerSchema } from "@/Validation/RegisterValidation";
import z from "zod";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPaient } from "@/services/actions/registerPatient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormData) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPaient(data);
      if (res?.success && res?.data?.id) {
        toast.success("register succssfully");
        router.push("/login");
      }
    } catch (err: any) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md md:max-w-2xl shadow-2xl border-0">
        {/* Logo */}
        <div className="flex items-center justify-center pt-6">
          <Logo />
        </div>
        {/* Header */}
        <CardHeader className="text-center space-y-4 pb-8">
          <CardTitle className="text-3xl font-bold text-foreground">
            Create Account
          </CardTitle>
          <CardDescription className="text-base">
            Join us and book doctor appointments easily
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name - Full width */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("patient.name")}
                className="h-12"
              />
              {errors.patient?.name && (
                <p className="text-sm text-destructive">
                  {errors.patient.name.message}
                </p>
              )}
            </div>

            {/* Email & Password - Side by side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@example.com"
                  {...register("patient.email")}
                  className="h-12"
                />
                {errors.patient?.email && (
                  <p className="text-sm text-destructive">
                    {errors.patient.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-12"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Number & Address - Side by side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Number */}
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Mobile Number</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  {...register("patient.contactNumber")}
                  className="h-12"
                />
                {errors.patient?.contactNumber && (
                  <p className="text-sm text-destructive">
                    {errors.patient.contactNumber.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="123 Main St, Dhaka"
                  {...register("patient.address")}
                  className="h-12"
                />
                {errors.patient?.address && (
                  <p className="text-sm text-destructive">
                    {errors.patient.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Register"}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm text-muted-foreground pt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium underline hover:text-primary/80"
              >
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
