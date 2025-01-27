# Instrucciones para correr el proyecto en máquina local

## 1. Clonar y descargar el repositorio

Primero, clona y descarga el repositorio de Git.

## 2. Abrir el proyecto en Visual Studio Code

Una vez descargado el repositorio, abre el archivo en **Visual Studio Code**.

## 3. Abrir la terminal y dirigirse a los microservicios

Con el proyecto abierto en VS Code, abre la terminal con `CTRL + Mayús + Ñ` y redirígete a la carpeta de cada microservicio con el comando:

```bash
CD ./auth_api
```

o

```bash
CD ./doctor-api
```

## 4. Instalar dependencias

Una vez en la carpeta del servicio `auth_api`, ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

## 5. Configurar variables de entorno

Crea en la raíz del proyecto un archivo `.env` y escribe las siguientes variables de entorno:

### Variables de entorno: `auth_api`

```env
PORT=3000
DATABASE_URL="mysql://tu_usuario:tu_contraseña_de_mysql@localhost:8080/medical_system_db_auth"
JWT_SECRET="jwt_secret_medical_system"
```

### Variables de entorno: `doctor_api`

```env
PORT=3001
DATABASE_URL="mysql://tu_usuario:tu_contraseña_de_mysql@localhost:8080/medical_system_db_doctor"
AUTH_MICROSERVICE_URL=http://localhost:3000/api/auth
```

**Nota:** Asegúrate de tener instalado **MySQL** en tu computador para poder crear las dos bases de datos requeridas.

## 6. Crear las bases de datos

Con MySQL instalado, abre la terminal de MySQL y crea las bases de datos con los siguientes nombres:

```sql
CREATE DATABASE medical_system_db_auth;
CREATE DATABASE medical_system_db_doctor;
```

## 7. Generar y migrar las tablas

En cada proyecto, ejecuta los siguientes comandos en la terminal:

```bash
npx prisma generate
```

y

```bash
npx prisma migrate dev --name init
```

Estos comandos crearán las tablas correspondientes en la base de datos.

## 8. Ejecutar los servidores

Para ejecutar cada proyecto, ubícate en la carpeta correspondiente y corre el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor en modo desarrollo.

## 9. Ejecutar los tests

Para correr los tests, utiliza el comando:

```bash
npm test
```

## 10. Visualizar la documentación

Para visualizar la documentación en el navegador, ingresa la siguiente URL en la barra de direcciones:

```
http://localhost:3000/api-docs/
```

Esto te permitirá ver la documentación generada con Swagger.

Y eso es todo!
