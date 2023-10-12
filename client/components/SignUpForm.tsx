"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Inputs = {
  example: string;
  exampleRequired: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [currentCard, setNextCard] = useState(0);

  const handleFormSubmit = (formData: any) => {
    console.log(formData);
    return true;
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
            className={currentCard === 0 ? "block" : "hidden"}
          >
            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Nombre
              </Typography>
              <TextField
                autoComplete="given-name"
                {...register("nombre", { required: true })}
                required
                fullWidth
                id="nombre"
                placeholder="Luis"
                autoFocus
              />
              {errors.nombre && (
                <span className="text-red-500">This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Apellido
              </Typography>
              <TextField
                required
                fullWidth
                id="apellido"
                placeholder="Gomez"
                {...register("apellido", { required: true })}
                autoComplete="family-name"
              />
              {errors.apellido && (
                <span className="text-red-500">This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Fecha de Nacimiento
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker {...register("dof")} />
              </LocalizationProvider>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={"bg-blue-500"}
              onClick={() => setNextCard(1)}
            >
              Siguiente
            </Button>
          </Grid>
          <Grid
            container
            spacing={2}
            className={currentCard === 1 ? "block" : "hidden"}
          >
            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Correo electronico
              </Typography>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="luis@gmail.com"
                {...register("email", { required: true })}
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-red-500">This field is required</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Contraseña
              </Typography>
              <TextField
                required
                fullWidth
                {...register("password", { required: true })}
                placeholder="********"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {errors.password && (
                <span className="text-red-500">This field is required</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography component="h3" variant="h7">
                Confirmar Contraseña
              </Typography>
              <TextField
                required
                fullWidth
                placeholder="********"
                type="password"
                id="confirmarPassword"
                autoComplete="new-password"
                name="confirmarPassword"
              />
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={"bg-blue-500"}
              onClick={() => setNextCard(0)}
            >
              Volver
            </Button>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className={`bg-blue-500 ${currentCard === 0 ? "hidden" : "block"}`}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
