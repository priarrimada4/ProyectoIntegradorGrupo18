# Proyecto Integrador – Grupo 18

# Tyta
### Tranqui, yo te aviso.

**Materia:** Metodología de Sistemas II  
**Integrantes:**
- Priscila Arrimada
- Tomás Astudillo
- Valentina Guerrieri

## Descripción del proyecto

Tyta es una herramienta de apoyo pensada para ayudar a personas y familias a organizar las distintas responsabilidades de la vida cotidiana.

La aplicación busca centralizar documentación, vencimientos, trámites, controles y otras cuestiones importantes para el usuario. Su objetivo no es solamente ayudar a recordar qué hay que hacer, sino también facilitar la organización y anticipación de las distintas actividades.

A partir de determinados datos proporcionados por el usuario, Tyta podrá sugerir cuestiones que podría ser conveniente revisar según su situación. Estas sugerencias buscan orientar y facilitar el acceso a información relevante, sin determinar qué debe hacer una persona.

Además, el usuario podrá crear sus propios recordatorios y planificaciones para cualquier aspecto de su vida cotidiana, aunque no esté relacionado con una obligación civil.

Cuando se trate de trámites u otras gestiones, la aplicación buscará ofrecer explicaciones sencillas de los pasos a seguir y facilitar el acceso a las fuentes oficiales correspondientes.

> **Tyta: Tranqui, yo te aviso.**

## Objetivos

- Centralizar responsabilidades y actividades cotidianas.
- Facilitar la creación y administración de recordatorios y vencimientos.
- Permitir organizar objetivos mediante planificaciones y tareas.
- Ayudar a anticipar actividades que requieren varios pasos.
- Facilitar el acceso a información y fuentes confiables.
- Ofrecer una experiencia sencilla e intuitiva.

## Alcance del proyecto

La propuesta contempla tres conceptos principales:

- **Recordatorios:** permiten registrar algo que el usuario no quiere olvidar.
- **Vencimientos:** representan fechas límite que requieren atención.
- **Planificaciones:** permiten organizar un objetivo que necesita varios pasos o actividades.

Una planificación podrá generar tareas, recordatorios y vencimientos asociados.

El proyecto busca evolucionar progresivamente desde la organización personal hacia funcionalidades de planificación guiada, consulta de información externa y organización compartida.

## Estado de desarrollo

Actualmente, el proyecto cuenta con una primera versión funcional para la gestión de planificaciones.

Entre los avances realizados se encuentran:

- Implementación del modelo de dominio `Planning` y del patrón Builder.
- Persistencia de datos mediante PostgreSQL y Docker.
- Implementación del repositorio, los servicios y las rutas del backend.
- Interfaz para crear, consultar y editar planificaciones.
- Selector de categorías.
- Validaciones de formularios y mensajes de error.
- Calendario para visualizar las fechas objetivo.
- Diseño adaptable a distintos tamaños de pantalla.
- Integración entre frontend y backend.
- Pruebas automatizadas y revisión de calidad del código.

La gestión independiente de tareas, recordatorios y vencimientos se contempla para futuras etapas del desarrollo.

## Tecnologías

| Área | Tecnología |

| Frontend | React, TypeScript, Vite y CSS |
| Backend | Node.js, Express y TypeScript |
| Base de datos | PostgreSQL 16 |
| Entorno de base de datos | Docker Compose |
| Migraciones | node-pg-migrate |
| Gestor de paquetes | pnpm |
| Testing backend | Vitest y Supertest |
| Testing frontend | Vitest y Testing Library |
| Calidad del código frontend | Oxlint |
| Control de versiones | Git y GitHub |

## Estructura del proyecto

ProyectoIntegradorGrupo18/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   ├── migrations/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PlanningForm.tsx
│   │   │   ├── PlanningForm.test.tsx
│   │   │   ├── PlanningList.tsx
│   │   │   └── PlanningCalendar.tsx
│   │   ├── services/
│   │   │   ├── planningApi.ts
│   │   │   └── planningApi.test.ts
│   │   ├── types/
│   │   │   └── planning.ts
│   │   ├── utils/
│   │   │   ├── validatePlanning.ts
│   │   │   └── validatePlanning.test.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   ├── vite.config.ts
│   └── package.json
│
├── docs/
│   └── decisiones-diseño.md
├── compose.yaml
└── README.md

## Instalación y ejecución

### Requisitos previos

- Node.js.
- pnpm.
- Docker Desktop.

### Base de datos

Crear un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias para la conexión a PostgreSQL.

Este archivo se encuentra excluido del repositorio mediante `.gitignore` para proteger las credenciales.

Con Docker Desktop iniciado, ejecutar desde la raíz del proyecto:

```bash
docker compose up -d
```

Para comprobar el estado del contenedor:

```bash
docker compose ps
```

### Backend

Desde la carpeta `backend`, instalar las dependencias:

```bash
pnpm install
```

Ejecutar las migraciones para crear las tablas de la base de datos:

```bash
pnpm exec node-pg-migrate up --migrations-dir src/migrations --envPath ../.env
```

Iniciar el servidor:

```bash
pnpm dev
```

En caso de incompatibilidad con la sintaxis de TypeScript en el modo strip-types, ejecutar:

```bash
node --experimental-transform-types src/server.ts
```

El backend estará disponible en `http://localhost:3000`.

### Frontend

Desde una segunda terminal, ingresar a la carpeta `frontend` e instalar las dependencias:

```bash
pnpm install
```

Iniciar la aplicación:

```bash
pnpm dev
```

El frontend estará disponible normalmente en `http://localhost:5173`.

Para utilizar todas las funcionalidades de la aplicación es necesario mantener PostgreSQL, el backend y el frontend en funcionamiento.

La comunicación entre frontend y backend se realiza mediante un proxy configurado en Vite para el entorno de desarrollo local.

## Pruebas automatizadas y calidad del código

### Backend

Desde la carpeta `backend`:

```bash
pnpm test
```

### Frontend

Desde la carpeta `frontend`:

```bash
pnpm test
```

Se implementaron 18 pruebas automatizadas, distribuidas de la siguiente manera:

| Archivo | Cantidad de pruebas |
|---|---:|
| validatePlanning.test.ts | 10 |
| PlanningForm.test.tsx | 3 |
| planningApi.test.ts | 5 |
| Total | 18 |

Las pruebas contemplan casos normales, casos límite y situaciones de error.

Para analizar la calidad del código del frontend:

```bash
pnpm lint
```

Para verificar TypeScript y compilar la aplicación:

```bash
pnpm build
```

Las pruebas automatizadas del frontend pueden ejecutarse sin iniciar el backend ni la base de datos, ya que las solicitudes HTTP se simulan durante las pruebas del servicio.