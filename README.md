# susCL

**susCL** es un software web de tipo **marketplace**, que facilita la compra y venta de productos mediante un pago de suscripción, ayudando a emprendedores la promoción de su producto y la gestión de las ventas del mismo, y por otro lado, beneficiar a los compradores, dándoles un sólo lugar donde pueden administrar las suscripciones de sus productos favoritos.

## Software Stack

**susCL** es una aplicación web que se ejecuta sobre el siguiente software:

- Ubuntu 18.04
- NodeJS 16.15.0
- PrismaCLI 4.3.1
- MySQL
- Yarn

## Configuraciones de Ejecución para Entorno de Desarrollo/Producción

##Clonar repositorio
Clonamos el repositorio en su máquina local:
```bash
git clone https://github.com/pablovrl/subs.git
```

## Docker
Con una terminal nos situamos en la raíz del proyecto y ejecutar:
```bash
docker build -t subs .
```
Una vez construida la imagen, lanzamos un contenedor que contenga el código clonado anteriormente: 
```bash
docker run -ti -p 3000:3000 -v ${PWD}:/app subs
```

## Instalar dependencias
Una vez dentro del container de docker vamos a la raiz del proyecto:
```bash
cd app
```
Instalamos las dependencias ocupando yarn:
```bash
yarn
```

### Base de Datos
Creamos un archivo `.env` en la raíz del proyecto, y agreamos la siguiente variable de entorno con las credenciales de nuestra base de datos:
```env
DATABASE_URL='mysql://user:password@host/db_name'
```
Hacemos la migración de la base de datos para crear las tablas:
```bash
npx prisma db push
```
Poblamos la base de datos:
```bash
npx prisma db seed
```
### Build para producción
Creamos una versión para producción
```bash
yarn build
```
Ahora sólo nos queda ejecutar nuestro proyecto con:
```bash
yarn start
```
Vamos a nuestro navegador y accedemos a la siguiente url [subs](http://localhost:3000 "subs").

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
