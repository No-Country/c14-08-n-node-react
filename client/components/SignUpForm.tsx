"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useStore } from "@/store/store";
import signUpData from "@/constants/formInputs";
import FormInput from "./SignUpForm/FormInput";
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { roleIds } from "@/constants/endpoints";
import dayjs, { Dayjs } from 'dayjs';

type FormValues = {
  rolId: number;
  name: string;
  lastname: string;
  email: string;  
  password: string;
  dob: string,

};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [currentCard, setNextCard] = useState(0);

  const [inputComponents, setInputComponents] = useState([] as any[]);

  const [dob, setDob] = useState<Dayjs | null>(dayjs('2022-04-17'));
  const [rolId, setRolId] = useState(roleIds.cliente);

  const { signUpClient } = useStore();

  useEffect(() => {
    useStore.persist.rehydrate();
    renderInputs();
  }, []);

  const changeRolId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event; // Desestructuramos el objeto target
    if (target && typeof target.checked !== "undefined") {
      setRolId(target.checked ? roleIds.abogado : roleIds.cliente);
    }
  
  };

  const renderInputs = () => {
    const inputComponentsArray = Object.keys(signUpData).map((key) => {
      if(key === "nombre" || key === "apellido" || key === "email" || key === "password") {
      const { title, autoComplete, placeholder, id, required, onRegister } = signUpData[key];
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
    }
    
    );
    setInputComponents(inputComponentsArray);
  }

  const handleFormSubmit = (formData: object) => {
    const submitData = { ...formData, rolId };
    console.log(submitData);
    signUpClient(submitData);
    return true;
  };
  return (
    <Container component="main" className="sm:bg-[#DADADA] w-full flex flex-col items-center sm:mt-[52px] max-w-full ">
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          maxWidth: "400px",
        }}
      
      >
        <div className="w-full flex flex-col items-center">
        <Avatar sx={{ m: 1, bgcolor: 'text-gray-700' }}>
          <AccountCircleIcon />
        </Avatar>
        </div>
        <Typography component="h1" variant="h5" className=" hidden text-left text-gray-700 font-semibold sm:block">
          Registro
        </Typography>
        <Typography component="h3" variant="h6" className="hidden text-left text-gray-700 sm:block">
          Ingresa tus datos para poder crearte una cuenta
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
            <Stack direction="row" spacing={1} alignItems="center">
        <Typography>Cliente</Typography>
        <Switch  onChange={(event) => changeRolId(event)} />
        <Typography>Agogado</Typography>
      </Stack>
            {inputComponents.length > 0 && inputComponents[0]}
            {inputComponents.length > 0 && inputComponents[1]}
            <Grid item xs={12}>
              <Typography component="h3" variant="h7" className="text-gray-700">
                Fecha de Nacimiento
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={dob} onChange={(newValue)=>setDob(newValue)} className="bg-white w-full" />
              </LocalizationProvider>
            </Grid>
            
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
            {inputComponents.length > 0 && inputComponents[3]}

            {inputComponents.length > 0 && inputComponents[4]}
            <Grid item xs={12}>
              <Typography component="h3" variant="h7" className="text-gray-700">
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
                className="bg-white"
              />
            </Grid>
            
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
            Sign Up
          </Button>
          <Typography component="h3" variant="h6" className=" text-center text-gray-700">
          Ayuda con el ingreso
        </Typography>
        <Typography component="h3" variant="h5" className=" text-gray-700 text-center">
          Soy Abogado
        </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
