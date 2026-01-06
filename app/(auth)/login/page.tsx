"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import Logo from "@/components/ux/sharedComponents/logo";
import { patientLogin } from "@/services/actions/loginPatient";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.serivce";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHendeler from "@/components/ux/FromProvider/FormHandler";
import FormInput from "@/components/ux/FromProvider/FromInput";
import { LoginSchema } from "@/Validation/LoginValidation";

export type LoginFormData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values: LoginFormData) => {
    try {
      const res = await patientLogin(values);
      if (res?.data?.accessToken) {
        toast.success("Login successful");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        toast.error(res?.message || "Login failed");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0 px-4">
        <div className="flex items-center justify-center pt-8">
          <Logo />
        </div>
        <CardHeader className="space-y-2 pb-6 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-balance">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormHendeler
            onSubmit={handleLogin}
            resolver={zodResolver(LoginSchema)}
            defaultValues={{ email: "", password: "" }}
          >
            <div className="space-y-4">
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="name@example.com"
                required
              />
              <div className="space-y-1">
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                />
                <div className="flex justify-end">
                  <Link
                    href="/forget-password"
                    className="text-sm font-medium text-primary hover:underline hover:text-primary/90 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                className="w-full h-11 text-base font-semibold transition-all hover:shadow-lg"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </FormHendeler>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
