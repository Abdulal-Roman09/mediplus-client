"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  required: boolean;
}

export default function FormInput({
  name,
  type = "text",
  label,
  placeholder,
  required = true,
}: FormInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2 mb-4">
          <Label htmlFor={name} className={error ? "text-red-500" : ""}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            required
            className={`${
              error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-gray-200"
            }`}
          />
          {error && (
            <small className="text-red-500 font-medium">{error.message}</small>
          )}
        </div>
      )}
    />
  );
}
