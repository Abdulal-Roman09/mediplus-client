import * as React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

type FormProps<T extends FieldValues = FieldValues> = {
  children: React.ReactNode;
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  resolver?: UseFormProps<T>["resolver"];
  className?: string;
};

export default function FormHendeler<T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  defaultValues,
  resolver,
  className,
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver,
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const handleFormSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
