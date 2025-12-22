import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
            <FileQuestion className="h-12 w-12" />
            <span className="absolute -right-2 -top-2 flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              404
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Page Not Found
            </h1>
            <p className="text-muted-foreground">
              Oops! It looks like the page you are looking for {"doesn't"} exist or
              has been moved to a new location.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
