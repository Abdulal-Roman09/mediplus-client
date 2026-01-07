import { Stethoscope } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Stethoscope className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-primary">
        MediPlus
      </span>
    </div>
  );
}
