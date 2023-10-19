"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useStore } from "@/store/store";
import loginData from "@/constants/loginInputs";
import FormInput from "./SignUpForm/FormInput";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type FormValues = {
  email: string;  
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [currentCard, setNextCard] = useState(0);
  const [inputComponents, setInputComponents] = useState([] as any[]);

  const { login } = useStore();

  useEffect(() => {
    useStore.persist.rehydrate();
    renderInputs();
  }, []);

  const renderInputs = () => {
    const inputComponentsArray = Object.keys(loginData).map((key) => {
      const { title, autoComplete, placeholder, id, required, onRegister } = loginData[key];
      return (
        <FormInput 
        key={id}  
        title={title}
        autoComplete={autoComplete}
        placeholder={placeholder}
        id={id}
        required={required}
        register={register}
        onRegister={onRegister}
        errors={errors}
        />
      );
          
    }
    
    );
    setInputComponents(inputComponentsArray);
  }

  const handleFormSubmit = (formData: object) => {
    console.log(formData);
    login(formData);
    return true;
  };
  return (
    <Container component="main" className="sm:bg-[#DADADA] w-full flex flex-col items-center sm:mt-[52px] max-w-full h-screen ">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          maxWidth: "400px",
        }}
      
      >
        <div className="sm:hidden">
        <Typography component="h1" variant="h5" className="text-left text-gray-700 font-semibold">
          Te damos la bienvenida
        </Typography>
        <Typography component="h3" variant="h6" className="text-left text-gray-700">
          Ingresa tus datos para poder acceder a mas de 60 especialidades legales
        </Typography>
        </div>
        <Typography component="h1" variant="h5" className=" hidden text-left text-gray-700 font-semibold sm:block">
          Ingreso
        </Typography>
        <Typography component="h3" variant="h6" className="hidden text-left text-gray-700 sm:block">
          Ingresa tus datos para poder administrar tu agenda de turnos
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
            {inputComponents.length > 0 && inputComponents[0]}
            
          </Grid>
          <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={`bg-gray-700 ${currentCard === 0 ? "block" : "hidden"}`}
              onClick={() => setNextCard(1)}
            >
              Siguiente
            </Button>
          <Grid
            container
            spacing={2}
            className={currentCard === 1 ? "block" : "hidden"}
          >
            {inputComponents.length > 0 && inputComponents[1]}
            
          </Grid>
          <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className={` bg-transparent border border-solid border-gray-700 rounded text-gray-700 ${currentCard === 0 ? "hidden" : "block"}`}
              onClick={() => setNextCard(0)}
            >
              Volver
            </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className={`bg-gray-700 ${currentCard === 0 ? "hidden" : "block"}`}
          >
            Continuar
          </Button>
          <Typography component="h3" variant="h6" className=" text-center text-gray-700">
          Ayuda con el ingreso
        </Typography>
        <Typography component="h3" variant="h5" className=" text-gray-700 text-center">
          ¿No tienes cuenta? Registrate
        </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
