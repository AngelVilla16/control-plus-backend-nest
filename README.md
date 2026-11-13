# Control Plus Backend (NestJS)

Backend de la aplicación **Control Plus**, construido con [NestJS](https://nestjs.com/) y TypeScript. Expone una API REST para autenticación de usuarios y registro de mediciones (glucosa y presión). Usa PostgreSQL como base de datos y JWT para autenticación.

## Descripción

Proyecto NestJS que gestiona:

- **Autenticación** (`/auth`): registro e inicio de sesión de usuarios con contraseñas hasheadas (bcrypt) y emisión de tokens JWT.
- **Mediciones** (`/mediciones`): registro de mediciones de glucosa y presión arterial, protegidas con JWT.

## Project setup

```bash
$ bun install
```

Configura las variables de entorno en un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=controlplus
JWT_SECRET=tu_clave_secreta
PORT=3000
```

## Compile and run the project

```bash
# development
$ bun run start

# watch mode
$ bun run start:dev

# production mode
$ bun run start:prod
```

## Endpoints

### Auth

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/registro` | Registra un nuevo usuario (`nombre`, `correo`, `contrasena`). |
| POST | `/auth/login` | Inicia sesión (`correo`, `contrasena`) y devuelve un token JWT. |

### Mediciones (requieren header `Authorization: Bearer <token>`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/mediciones/registrar-glucosa` | Registra una medición de glucosa (`glucosa`, `seleccionado`). |
| POST | `/mediciones/registrar-presion` | Registra una medición de presión (`sistolica`, `diastolica`, `seleccionado`). |

## Run tests

```bash
# unit tests
$ bun run test

# e2e tests
$ bun run test:e2e

# test coverage
$ bun run test:cov
```

## Lint y formato

```bash
$ bun run lint
$ bun run format
```

## Deployment

Compila el proyecto y ejecuta el artefacto de producción:

```bash
$ bun run build
$ bun run start:prod
```

## License

UNLICENSED (privado).