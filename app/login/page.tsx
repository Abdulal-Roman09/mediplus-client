"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import Logo from "@/components/ux/components/logo";
import { patientLogin } from "@/services/actions/loginPatient";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.serivce";
import FormHandler from "@/lib/provider/FromProvider/FormHandler";
import FormInput from "@/lib/provider/FromProvider/FromInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const hendelLogin = async (values: FieldValues) => {
    try {
      const res = await patientLogin(values);
      if (res?.data?.accessToken) {
        toast.success("Login successful");
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      }
      // eslint-disable-next-line
    } catch (err: any) {
      toast.error(err.message);
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
          <FormHandler onSubmit={hendelLogin}>
            <FormInput
              name="email"
              label="email"
              type="email"
              placeholder="example@gamil.com"
              required
            />
            <FormInput
              name="password"
              label="password"
              type="password"
              placeholder="*******"
              required
            />
            <Button className="w-full" type="submit">
              Login
            </Button>
          </FormHandler>
          {/* Login Link */}
          <div className=" text-sm text-muted-foreground pt-4">
            Already have an account?{" "}
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
