import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type THIputProps = {
  name: string;
  size?: "small" | "medium";
  label: string;
  type?: string;
  fullWidth: boolean;
};

const HInput = ({
  name,
  size = "small",
  type = "text",
  label,
  fullWidth,
}: THIputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          size={size}
          id="outlined-basic"
          type={type}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default HInput;
