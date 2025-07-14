import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type THFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
};

const HForm = ({ children, onSubmit }: THFormProps) => {
  const methods = useForm();

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default HForm;
