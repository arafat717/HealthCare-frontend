import { SxProps, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type THIputProps = {
  name: string;
  size?: "small" | "medium";
  label: string;
  type?: string;
  fullWidth: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const HInput = ({
  name,
  size = "small",
  type = "text",
  label,
  fullWidth,
  sx,
  placeholder,
  required,
}: THIputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth={fullWidth}
          size={size}
          id="outlined-basic"
          type={type}
          label={label}
          variant="outlined"
          sx={{ ...sx }}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default HInput;
