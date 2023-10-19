import React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type FormInputProps = {
    title: string;
    onRegister: string;
    required: boolean;
    errors: any;
    placeholder: string;
    register: any;
    id: string;
    autoComplete: string;
};

const FormInput = ({
    title,
    onRegister,
    required,
    errors,
    placeholder,
    register,
    id,
    autoComplete,
}: FormInputProps) => {
  return (
    <Grid key={id} item xs={12}>
      <Typography component="h3" variant="h7" className="text-gray-700">
        {title}
      </Typography>
      <TextField
        autoComplete={autoComplete}
        {...register(onRegister, { required: required })}
        required={required}
        fullWidth
        id={id}
        placeholder={placeholder}
        className="bg-white place"
      />
      {errors[onRegister] && (
        <span className="text-red-500">This field is required</span>
      )}
    </Grid>
  );
};

export default FormInput;
