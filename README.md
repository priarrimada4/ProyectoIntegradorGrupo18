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

Actualmente, el proyecto se encuentra en una etapa inicial de desarrollo.

Entre los avances realizados se encuentran:

- Configuración inicial del backend con Node.js, Express y TypeScript.
- Incorporación de Vitest para pruebas automatizadas.
- Implementación del modelo de dominio `Planning`.
- Implementación del patrón Builder para construir objetos `Planning`.
- 11 pruebas automatizadas del `PlanningBuilder`, que cubren construcción correcta, datos opcionales y validaciones.

Las funcionalidades mencionadas en la descripción representan objetivos del proyecto y no necesariamente se encuentran implementadas todavía.

## Tecnologías

| Área | Tecnología |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, Express, TypeScript |
| Gestor de paquetes del backend | pnpm |
| Testing backend | Vitest |
| Control de versiones | Git y GitHub |

La tecnología de persistencia de datos se definirá durante el desarrollo.

## Estructura del proyecto

El repositorio se organiza en dos aplicaciones principales:

```text
ProyectoIntegradorGrupo18/
├── backend/
│   ├── src/
│   │   ├── domain/
│   │   │   └── planning/
│   │   │       ├── Planning.ts
│   │   │       ├── PlanningBuilder.ts
│   │   │       └── PlanningBuilder.test.ts
│   │   └── server.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
│
├── frontend/
│   └── ...
│
├── docs/
│   └── decisiones-diseño.md
│
└── README.md
```

La estructura se irá ampliando a medida que se incorporen nuevas funcionalidades y componentes.

## Instalación y ejecución

### Backend

Desde la carpeta `backend`:

```bash
pnpm install
```

Para iniciar el servidor en desarrollo:

```bash
pnpm dev
```

Para ejecutar las pruebas:

```bash
pnpm test
```

### Frontend

El frontend de Tyta está desarrollado con React, TypeScript y Vite.

Para ejecutar la aplicación localmente, ubicarse en la carpeta `frontend` e instalar las dependencias:

```bash
cd frontend
npm install
```
Una vez instaladas las dependencias, iniciar el servidor de desarrollo con:
```bash
npm run dev
```
Para verificar que el proyecto compile correctamente, ejecutar:
```bash
npm run build
```
Para analizar el código y detectar posibles errores o problemas de estilo, ejecutar:
```bash
npm run lint
```

## Documentación

En la carpeta `docs` se registran las decisiones de diseño y los criterios técnicos que orientan el desarrollo del proyecto.

## Metodología de trabajo

El desarrollo se organiza mediante Git y GitHub, utilizando ramas de trabajo individuales y solicitudes de integración (*Pull Requests*) para incorporar cambios a la rama principal de desarrollo.

Las decisiones relevantes y los avances técnicos se documentan para facilitar la coordinación entre los integrantes del equipo.