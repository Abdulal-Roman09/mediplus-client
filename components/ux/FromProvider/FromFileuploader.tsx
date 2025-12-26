import { Upload } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FormFileUploaderProps = {
  name: string;
  label?: string;
  className?: string;
};

export default function FormFileUploader({
  name,
  label,
  className,
}: FormFileUploaderProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        const fileName = value ? value.name : null;

        return (
          <div
            className={cn(
              "grid w-full max-w-sm items-center gap-1.5",
              className
            )}
          >
            <Button
              variant="outline"
              asChild
              className="w-full justify-start font-normal"
            >
              <label
                htmlFor={name}
                className="cursor-pointer flex items-center w-full"
              >
                <Upload className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">
                  {fileName ?? label ?? "Upload file"}
                </span>

                <Input
                  {...field}
                  id={name}
                  type="file"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                />
              </label>
            </Button>

            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
