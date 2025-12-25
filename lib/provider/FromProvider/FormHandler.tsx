import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IFormProps {
  children: ReactNode;
  onSubmit?: SubmitHandler<FieldValues>;
}
export default function FormHandler({ children, onSubmit }: IFormProps) {
  const methods = useForm();
  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    onSubmit(data);
  };
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
}
