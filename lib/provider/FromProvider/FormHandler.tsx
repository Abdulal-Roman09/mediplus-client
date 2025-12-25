"use client";

import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodSchema } from "zod";

interface IFormProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<T>;
  resolver?: ZodSchema<T>;
  defaultValues?: Partial<T>;
}

export default function FormHandler<T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: IFormProps<T>) {
  const methods = useForm<T>({
    resolver: resolver ? zodResolver(resolver) : undefined,
    defaultValues,
  });

  const submit: SubmitHandler<T> = (data) => {
    console.log(data);
    onSubmit?.(data);
  };

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
}
