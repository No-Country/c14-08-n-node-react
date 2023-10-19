const signUpData = {
    "nombre" : {
      "title": "Nombre",
      "autoComplete": "given-name",
      "placeholder": "Luis",
      "id": "nombre",
      "required": true,
      "onRegister": "nombre",
    },
    "apellido": {
      "title": "Apellido",
      "autoComplete": "family-name",
      "placeholder": "Gomez",
      "id": "apellido",
      "required": true,
      "onRegister": "apellido",
    },
    "dof": {
      "title": "Fecha de Nacimiento",
      "autoComplete": "bday",
      "id": "dof",
      "required": false,
      "onRegister": "dof",
    },
    "email": {
      "title": "Correo electronico",
      "autoComplete": "email",
      "placeholder": "luis@example.com",
      "id": "email",
      "required": true,
      "onRegister": "email",
    },
    "password": {
      "title": "Contraseña",
      "autoComplete": "new-password",
      "placeholder": "********",
      "id": "password",
      "required": true,
      "onRegister": "password",
    },
    }

export default signUpData;