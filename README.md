# ![image](https://user-images.githubusercontent.com/62177255/188337689-f9367ee2-3041-4598-8d57-e8c0df556d75.png)


**susCL** es un software web de tipo **marketplace**, que facilita la compra y venta de productos mediante un pago de suscripción, ayudando a emprendedores la promoción de su producto y la gestión de las ventas del mismo, y por otro lado, beneficiar a los compradores, dándoles un sólo lugar donde pueden administrar las suscripciones de sus productos favoritos.

## Software Stack

**susCL** es una aplicación web que se ejecuta sobre el siguiente software:

- Ubuntu 18.04
- NodeJS 16.15.0
- PrismaCLI 4.3.1
- MySQL
- Yarn

## Configuraciones de Ejecución para Entorno de Desarrollo/Producción

Clonamos el repositorio en su máquina local:
```bash
git clone https://github.com/pablovrl/subs.git
```

### Configuración de Base de Datos
Creamos un archivo `.env` en la raíz del proyecto, y agregamos las siguientes variables de entorno:
- DATABASE_URL: Debe ingresar el string de conexión con las credenciales de la base de datos (debe ser mysql).
- URL: Debe ingresar la URL en la que será desplegada la aplicación (en este caso el localhost).
```env
DATABASE_URL='mysql://user:password@host/db_name'
URL=http://localhost:3000
```

### Docker (Entorno de Desarrollo)
Con una terminal nos situamos en la raíz del proyecto y ejecutamos:
```bash
docker build -t subs .
```
Una vez construida la imagen, lanzamos un contenedor que contenga el código clonado anteriormente:
```bash
docker run -ti -p 3000:3000 -v ${PWD}:/subs subs
```

Una vez dentro del contenedor entramos a la raíz del proyecto:
```bash
cd subs
```

Instalamos las dependencias ocupando yarn:
```bash
yarn
```
Hacemos la migración de la base de datos para crear las tablas:
```bash
npx prisma db push
```
Poblamos la base de datos:
```bash
npx prisma db seed
```

Iniciamos el proyecto en modo desarrollador:
```bash
yarn dev
```
Y ya tendríamos corriendo el proyecto en modo desarrollador.

### Entorno de Producción (siendo root)
#### Actualizar paquetes del sistema operativo
```bash
apt update && apt upgrade
```
#### Instalar curl
```bash
apt install curl
```

#### Instalar nvm (para luego instalar node 16.15.0)
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

#### Instalar nodejs 16.15.0
```bash
nvm install 16.15.0
nvm use 16.15.0
```

#### Instalar yarn y pm2
```bash
npm i -g yarn
npm i -g pm2
```

#### Ingresamos a la raíz del proyecto
```bash
cd directorio-del-proyecto
```

Instalamos las dependencias ocupando yarn:
```bash
yarn
```
Hacemos la migración de la base de datos para crear las tablas:
```bash
npx prisma db push
```
Poblamos la base de datos:
```bash
npx prisma db seed
```
Creamos una versión para producción
```bash
yarn build
```
Ahora sólo nos queda ejecutar nuestro proyecto con:
```bash
pm2 start yarn --name "nextjs" -- start
```
Y así ya tenemos nuestra aplicación lista para un enterno de producción.

### Credenciales de acceso
| Correo electrónico | Contraseña | Tipo Usuario |
|--------------------|------------|--------------|
|vendedor@vendedor.com| vendedor|vendedor|
|cliente@cliente.com|cliente|cliente| 

## Tecnologías utilizadas
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación.
- [React](https://es.reactjs.org/) - Biblioteca para construir interfaces de usuario.
- [Next.js](https://nextjs.org "Next.js") - Framework de React que incluye su propio servidor.
- [Chakra UI](https://chakra-ui.com/ "Chakra UI") - Librería de componentes UI para react.
- [Prisma](https://prisma.io "Prisma") - ORM que nos permite comunicar nuestro servidor con la base de datos.
- [Yarn](https://yarnpkg.com/ "Yarn") - Administrador de dependencias de node.

## Contribuidores del proyecto
- Integrante: Pablo Sebastián Villarroel Antillanca - pablo.villarroel1901@alumnos.ubiobio.cl
- Integrante: Elvis Aarón Rodríguez Durán - elvis.rodriguez1901@alumnos.ubiobio.cl
