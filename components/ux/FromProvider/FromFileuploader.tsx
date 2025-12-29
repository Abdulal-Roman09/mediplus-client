import { Upload } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFileUploaderProps = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  accept?: string;
};

export default function FormFileUploader({
  name,
  label,
  placeholder,
  className,
  accept,
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
        const fileName = value instanceof File ? value.name : null;

        return (
          <div className={cn("grid w-full items-center gap-2", className)}>
            {/* Label placed above the button */}
            {label && <Label htmlFor={name}>{label}</Label>}

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
                  {fileName ?? placeholder ?? "Upload file"}
                </span>
                <Input
                  {...field}
                  id={name}
                  type="file"
                  accept={accept}
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                />
              </label>
            </Button>

            {/* Error message handling */}
            {error && (
              <p className="text-sm text-destructive">{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}
