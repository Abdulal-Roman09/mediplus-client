"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { toast } from "sonner";
import { patientLogin } from "@/services/actions/loginPatient";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.serivce";
import LoginSchema from "@/Validation/LoginValidation";

type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    try {
      const res = await patientLogin(values);
      if (res?.data?.accessToken) {
        toast.success("Login in successfully");
        storeUserInfo({ accessToken: res?.data?.accessToken });
      }
      router.push("/");
    } catch (err: any) {
      toast.error("Login filed");
    }
  };

  return (
    <div className="min-h-screen from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0 px-4">
        <div className="flex items-center justify-center pt-5">
          <Logo />
        </div>
        <CardHeader className=" space-y-4 pb-8 text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Log in to your doctor appointment account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="patient@example.com"
                {...register("email")}
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*********"
                {...register("password")}
                className="h-12"
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            {/* Extra Links */}
            <Link href={"/register"} className=" text-sm text-muted-foreground">
              if you have no account? ?{" "}
              <span className="text-primary underline">Register</span>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
