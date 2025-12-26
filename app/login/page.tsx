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
import Logo from "@/components/ux/components/logo";
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
      // eslint-disable-next-line
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-0 px-4">
        <div className="flex items-center justify-center pt-5">
          <Logo />
        </div>
        <CardHeader className="space-y-4 pb-8 text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Log in to your doctor appointment account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormHendeler
            onSubmit={handleLogin}
            resolver={zodResolver(LoginSchema)}
            defaultValues={{ email: "", password: "" }}
          >
            <div className="space-y-6">
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="example@gmail.com"
                required
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="••••••"
                required
              />
              <Button className="w-full" type="submit">
                Login
              </Button>
            </div>
          </FormHendeler>

          <div className="text-sm text-muted-foreground pt-4 text-center">
            {"Don't have an account? "}
            <Link
              href="/register"
              className="text-primary font-medium underline hover:text-primary/80"
            >
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
