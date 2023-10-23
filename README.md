# ~~**~~c14-08-n-node-react



| Miembros                    |    Rol    |
| :-------------------------- | :-------: |
| Matias Marcelo Dei Castelli | Back-End |
| Jose Rangel                 | Back-End |
| Mateo Movilla               | Back-End |
| Diego Garay Cullas          | Back-End |
| Rocío Aguirre Cerullo      |    QA    |
| Yhonatan Peguero            | Front-End |
| Luis Sánchez               | Front-End |
| Wilder Chambi               | Front-End |
| Juan Pablo Quintana         | Front-End |
| Rocio Livingston            |   UX-UI   |

Guía De Trabajo Proyecto (para iniciar)

PASOS A SEGUIR:

1) Clonar el proyecto
2) Abrir la carpeta con el programa visual studio code o el editor de preferencia
3) Utilizar los siguientes comandos:

   •	git checkout + dev (se utiliza para ingresar a la rama dev);
   •	git branch (para ver en que rama estás posicionado);
   •	git branch + nombre de la nueva rama (para crea una nueva rama);
   •	git checkout + nombre de la rama nueva (para cambiarse a la rama nueva);
4) se realizan todos los cambios en la rama nueva;
5) para guardar los otros cambios se utilizan:
   •	Git pull: sirve para traer todos los cambios nuevos que están en el repositorio; se utiliza este comando, para tener actualizado al día el proyecto
   •	git add .  o git add + nombre del archivo:  sirve para guardar todos los archivos o subir los archivo de a uno en caso de especificar
   •	git commit -m "nombre del comit": se utiliza para confirmar los cambios realizados en un repositorio
   •	git push origin + nombre de la rama en la que se encuentra: Sirve para subir todos los cambios y agregar esa rama en el repositorio
6) Ingresamos al repositorio al link https://github.com/No-Country/c14-08-n-node-react
7) Luego de ingresar al link, presionamos Compare & Pull Request (que se encuentra arriba del nombre de la rama)
8) Luego de clicar Compare & Pull Request, aparecerá un título y un comentario.  Arriba de esto, veremos dos cuadros:

   * el primero puede aparecer con el valor de main . En el caso de que aparezca, se deberá modificar a dev;
   * el segundo es desde que rama se está enviando los datos a mergear
9) Nos aparece un cuadro con dos campos donde podremos ingresar un título y un comentario, que nos permite saber donde se estuvo trabajando
10) presionamos en Create Pull Request
11) presionamos en Merge Pull Request
12) nos aparece 2 cuadros en donde podremos modificar el título del commit y agregar el comentario del commit (nos servirá para el caso  que exista un  conflicto y poder saber que commit genero tal conflicto)
13) presionamos en confirmar merge
14) presionamos en delete branch (que eliminara del repositorio la rama nueva que habíamos creado desde el editor de código, pero no de manera local. No va a borrar la rama de dev)

    Importante

    No subir los cambios a la rama main;  recién cuando se pase  a produción se realizara un merge desde la rama dev a la main

    Sugerencia

    •	estar siempre posicionado en la rama dev
    •	enviar siempre el comando git pull en dev (tener los datos actualizado)
    •	crear la nueva rama siempre partiendo desde dev

    Back-End Extensiones instaladas

    npm install -g @nestjs/cli

    * nest new Api
    * npm install --save @nestjs/typeorm typeorm mysql2
    * npm i dotenv
    * npm i --save-dev @types/uuid
    * npm i --save class-validator class-transformer
    * npm install --save-dev typescript
