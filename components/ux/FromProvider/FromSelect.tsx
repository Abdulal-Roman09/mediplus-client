import * as React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
};

type FormSelectProps = {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[];
  className?: string;
};

export default function FormSelect({
  name,
  label,
  placeholder = "Select an option",
  required = false,
  options,
  className,
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn("w-full", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage>{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
