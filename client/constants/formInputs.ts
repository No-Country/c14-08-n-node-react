const signUpData = {
    "nombre" : {
      "title": "Nombre",
      "autoComplete": "given-name",
      "placeholder": "Luis",
      "id": "nombre",
      "required": true,
      "onRegister": "name",
    },
    "apellido": {
      "title": "Apellido",
      "autoComplete": "family-name",
      "placeholder": "Gomez",
      "id": "apellido",
      "required": true,
      "onRegister": "last_Name",
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
      "id": "pass",
      "required": true,
      "onRegister": "pass",
    },
    }

export default signUpData;