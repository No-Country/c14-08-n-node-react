const loginData: object = {
  email: {
    title: "Correo electronico",
    autoComplete: "email",
    placeholder: "luis@example.com",
    id: "email",
    required: true,
    onRegister: "email",
  },
  password: {
    title: "Contraseña",
    autoComplete: "new-password",
    placeholder: "********",
    id: "password",
    required: true,
    onRegister: "password",
  },
};

export default loginData;
