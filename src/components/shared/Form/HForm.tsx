import React, { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TResolver = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type THFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TResolver;

const HForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: THFormProps) => {
  const formConfig: TResolver = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);

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
