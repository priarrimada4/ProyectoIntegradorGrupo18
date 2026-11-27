# Análisis y decisiones de diseño — Tyta

## 1. Contexto

Tyta busca ayudar a las personas y familias a organizar responsabilidades, documentación, vencimientos y recordatorios. La aplicación pretende informar y orientar al usuario, sin realizar directamente trámites ni reservar turnos.

El backend se encuentra en una etapa inicial de desarrollo. Este documento registra el análisis de las decisiones de diseño, las alternativas consideradas y los patrones incorporados o evaluados.

Se distingue entre las decisiones implementadas, las adoptadas y las propuestas para futuras etapas.

## 2. Código analizado

### 2.1. Servidor y aplicación

Archivos:

- `backend/src/server.ts`
- `backend/src/app.ts`

Inicialmente, el servidor concentraba la configuración de Express, la declaración de rutas y el inicio de la aplicación.

Posteriormente, se separaron estas responsabilidades:

- `app.ts`: configura Express, habilita el procesamiento de JSON e incorpora las rutas.
- `server.ts`: importa la aplicación y se encarga de iniciar el servidor en el puerto 3000.

Esta separación permite probar la aplicación sin necesidad de iniciar un servidor real.

### 2.2. Modelo de dominio Planning

Archivos:

- `backend/src/domain/planning/Planning.ts`
- `backend/src/domain/planning/PlanningBuilder.ts`
- `backend/src/domain/planning/PlanningBuilder.test.ts`

Se incorporó un modelo `Planning` que representa una planificación dentro del dominio de Tyta.

Actualmente contiene los siguientes atributos:

- Título.
- Descripción.
- Categoría.
- Ubicación.
- Fecha objetivo.
- Presupuesto estimado opcional.

Para construir este objeto se implementó un Builder que permite configurar sus atributos progresivamente y verificar que estén presentes los datos obligatorios antes de crear la instancia.

### 2.3. Repositorio y servicios de Planning

Archivos:

- `backend/src/repositories/PlanningRepository.ts`
- `backend/src/services/PlanningService.ts`

Se incorporó el patrón Repository para separar las operaciones de persistencia de la lógica de negocio.

`PlanningRepository` se encarga de realizar las consultas a PostgreSQL mediante consultas parametrizadas. Actualmente implementa las operaciones de creación, consulta, actualización y eliminación de planificaciones.

También se incorporó `PlanningService`, que centraliza las operaciones relacionadas con las planificaciones y utiliza el repositorio para acceder a los datos.

Esta separación permite mantener responsabilidades claras y reducir el acoplamiento entre la lógica de negocio y la base de datos.

### 2.4. Rutas HTTP de Planning

Archivo:

- `backend/src/routes/PlanningRoute.ts`

Se implementaron las rutas necesarias para realizar las operaciones CRUD de planificaciones:

- GET `/plannings`: obtiene todas las planificaciones.
- GET `/plannings/:id`: busca una planificación por identificador.
- POST `/plannings`: crea una planificación.
- PUT `/plannings/:id`: actualiza una planificación.
- DELETE `/plannings/:id`: elimina una planificación.

Las rutas realizan validaciones de los identificadores y de los datos recibidos, y devuelven los códigos HTTP correspondientes según el resultado de cada operación.

## 3. Diagnóstico de diseño

### 3.1. Creación directa de Express

La aplicación se crea con `const app = express()`.

Es una decisión sencilla y legible. Actualmente no hay múltiples tipos de servidores ni una lógica compleja de creación que justifique agregar una Factory.

### 3.2. Configuración del puerto

El puerto se define con `const PORT = 3000`.

Esto alcanza para el desarrollo local. Si el proyecto necesita distintos entornos, se podría evaluar leer el puerto desde una variable de entorno.

### 3.3. Responsabilidades del servidor

`server.ts` configura Express, declara una ruta e inicia el servidor.

Para un prototipo pequeño resulta fácil de entender, pero el archivo podría concentrar demasiadas responsabilidades cuando crezcan las rutas y las reglas de negocio.

### 3.4. Construcción de objetos del dominio

El modelo `Planning` contiene varios atributos, algunos de ellos opcionales.

A medida que se incorporen nuevas características, la construcción directa mediante un constructor con múltiples parámetros podría dificultar la lectura y el mantenimiento del código.

Por este motivo se incorporó un Builder que centraliza el proceso de construcción y las validaciones de los datos obligatorios.

## 4. Alternativas evaluadas

### 4.1. Organización del servidor

#### Alternativa A: mantener el diseño actual

**Ventajas:**

- Menos código y archivos.
- Lectura y ejecución simples.
- No agrega abstracciones innecesarias.

**Desventajas:**

- El archivo podría crecer demasiado.
- La configuración y las rutas todavía no están separadas.

#### Alternativa B: separar configuración e inicio

Crear un módulo que configure y devuelva la aplicación y otro que se encargue de iniciar el servidor.

**Ventajas:**

- Separa responsabilidades.
- Facilita probar la aplicación sin iniciar necesariamente el servidor.
- Favorece la organización futura.

**Desventajas:**

- Agrega estructura que podría ser innecesaria para una sola ruta.
- Requiere mantener esa separación.

#### Alternativa C: introducir una Factory

Una función de fábrica podría crear y configurar la aplicación.

**Ventajas:**

- Puede centralizar una creación con distintas configuraciones.
- Puede facilitar la creación de instancias aisladas en pruebas.

**Desventajas:**

- La creación actual es directa y sencilla.
- Introducirla ahora agregaría abstracción sin un beneficio claro demostrado.

#### Alternativa D: configurar el puerto mediante una variable de entorno

**Ventajas:**

- Facilita ejecutar la aplicación en distintos entornos.
- Evita depender exclusivamente de un puerto fijo.

**Desventajas:**

- Requiere validar y manejar la configuración.
- No resuelve por sí sola la organización de rutas y reglas de negocio.

### 4.2. Construcción del objeto Planning

#### Alternativa A: utilizar directamente el constructor

Crear las instancias de `Planning` pasando todos los atributos al constructor.

**Ventajas:**

- Implementación sencilla.
- Menor cantidad de clases y métodos.

**Desventajas:**

- La construcción puede volverse difícil de leer cuando aumenta la cantidad de parámetros.
- La lógica de validación podría repetirse en distintos lugares.

#### Alternativa B: implementar el patrón Builder

Crear un objeto encargado de configurar progresivamente los atributos y construir la instancia final.

**Ventajas:**

- Permite construir el objeto paso a paso.
- Mejora la legibilidad cuando existen varios atributos.
- Centraliza las validaciones necesarias para construir una instancia válida.

**Desventajas:**

- Incorpora una clase adicional.
- Puede resultar innecesario para objetos con pocos atributos y una construcción sencilla.

## 5. Decisiones de diseño

### 5.1. Mantener la creación directa de Express

**Decisión:** mantener la creación actual de Express sin incorporar una Factory.

**Justificación:**

La creación de la aplicación es sencilla y no presenta diferentes variantes que justifiquen una abstracción adicional. Se prioriza la simplicidad y se evita incorporar patrones sin una necesidad concreta.

**Estado:** decisión adoptada. Diseño actual implementado.

### 5.2. Incorporar el patrón Builder para Planning

**Decisión:** implementar el patrón Builder para construir objetos `Planning`.

**Justificación:**

La planificación contiene varios atributos y algunos son opcionales. El Builder permite configurar sus datos progresivamente, separar la construcción del objeto final y centralizar la verificación de los atributos obligatorios.

**Implementación:**

- `Planning.ts`: representa el modelo de dominio.
- `PlanningBuilder.ts`: permite configurar los atributos y construir la instancia.
- `PlanningBuilder.test.ts`: verifica distintos escenarios de construcción.

**Verificación:**

**Verificación:**

Se implementaron 11 pruebas automatizadas utilizando Vitest para comprobar el comportamiento del Builder en distintos escenarios, incluyendo:

- Construcción de una planificación con todos sus datos.
- Construcción sin presupuesto estimado.
- Validación de datos obligatorios.
- Rechazo de títulos, descripciones y ubicaciones vacías.
- Rechazo de fechas inválidas.
- Rechazo de categorías no permitidas.
- Rechazo de presupuestos negativos o inválidos.
- Aceptación de un presupuesto igual a cero.

Todas las pruebas fueron ejecutadas correctamente: 11 de 11 aprobadas.

**Estado:** implementado y verificado mediante pruebas automatizadas.

## 5.3. Incorporar PostgreSQL para la persistencia

**Decisión:** utilizar PostgreSQL como sistema gestor de base de datos y Docker para administrar el entorno local de desarrollo.

**Justificación:**

Se necesita persistir la información de las planificaciones para que no se pierda al detener o reiniciar el backend. PostgreSQL permite almacenar los datos de forma estructurada y establecer restricciones sobre ellos.

Se utiliza Docker Compose para levantar la base de datos en un entorno aislado, evitando depender de una instalación local específica.

**Implementación:**

- Se configuró PostgreSQL 16 mediante Docker Compose.
- Se creó la base de datos `tyta` y un usuario específico para la aplicación.
- Se configuró el puerto 5433 del equipo anfitrión para evitar conflictos con una instancia local de PostgreSQL que utiliza el puerto 5432.
- Se almacenaron las credenciales y los parámetros de conexión en un archivo `.env`, excluido del repositorio mediante `.gitignore`.
- Se incorporó `pg` para realizar consultas desde el backend y `dotenv` para cargar las variables de entorno.
- Se implementó un Pool de conexiones en `src/infrastructure/database/connection.ts`.

**Verificación:**

Se comprobó la conexión con PostgreSQL mediante una consulta que permite obtener el nombre de la base de datos y el usuario conectado.

La conexión fue verificada correctamente utilizando la base de datos `tyta` y el usuario `tyta_user`.

**Estado:** implementado y verificado.

## 5.4. Utilizar migraciones para administrar la estructura de la base de datos

\*\*Decisión utilizar node-pg-migrate para gestionar la creación y modificación de las tablas mediante migraciones.

**Justificación:**

Las migraciones permiten mantener un registro de los cambios realizados en la estructura de la base de datos y reproducirlos en distintos entornos sin depender de modificaciones manuales.

**Implementación:**

Se creó la migración src/migrations/create_plannings.ts, que genera la tabla plannings con los atributos correspondientes al modelo de dominio.

También se incorporaron restricciones para aceptar únicamente las categorías permitidas y evitar presupuestos negativos.

La migración fue ejecutada correctamente y se verificó la creación de la tabla en PostgreSQL.

\*\*Estado implementado y verificado.

### 5.5. Incorporar el patrón Repository para el acceso a datos

**Decisión:** separar las operaciones de persistencia de la lógica del dominio mediante un repositorio.

**Justificación:**

El patrón Repository permite centralizar las consultas a la base de datos y evitar que los servicios dependan directamente de PostgreSQL.

**Implementación:**

Se creó `src/repositories/PlanningRepository.ts`, encargado de realizar las operaciones de persistencia de las planificaciones.

Se implementaron los siguientes métodos:

- `create()`: guarda una planificación.
- `findById()`: busca una planificación por su identificador.
- `findAll()`: obtiene todas las planificaciones.
- `update()`: actualiza una planificación existente.
- `delete()`: elimina una planificación.

Se utilizan consultas parametrizadas para enviar los datos a PostgreSQL.

La implementación se realizó mediante pruebas automatizadas utilizando Vitest.

**Verificación:**

Se ejecutaron 10 pruebas automatizadas del repositorio, que verifican las operaciones de persistencia y sus resultados.

**Estado:** implementado y verificado.

### 5.6. Incorporar una capa de servicios

**Decisión:** incorporar una capa de servicios para separar las operaciones del negocio del acceso a datos y de las rutas HTTP.

**Justificación:**

Permite centralizar las operaciones relacionadas con las planificaciones y evitar que las rutas se comuniquen directamente con el repositorio.

**Implementación:**

Se creó `src/services/PlanningService.ts`, que utiliza `PlanningRepository` para realizar las operaciones de creación, consulta, actualización y eliminación.

**Verificación:**

Se implementaron 9 pruebas automatizadas para comprobar el comportamiento de los servicios.

**Estado:** implementado y verificado.

Factory

No se considera necesaria para la creación actual de Express, ya que no existen distintas configuraciones o tipos de aplicaciones que requieran centralizar esa decisión.

Sin embargo, podría evaluarse para la creación de distintos tipos de tareas de Tyta, si cada tipo requiere una construcción o comportamiento particular.

Estado: evaluado para Express y descartado por el momento. Posible aplicación futura en el dominio.

Builder

Se incorporó para construir objetos Planning, debido a la cantidad de atributos y a la necesidad de validar los datos obligatorios antes de crear la instancia.

Permite configurar progresivamente los atributos y centralizar las validaciones necesarias para construir una planificación válida.

Estado: implementado y verificado mediante pruebas automatizadas.

Singleton

Se implementó un módulo compartido para administrar el Pool de conexiones a PostgreSQL. El módulo exporta una instancia que puede ser reutilizada por los componentes que necesitan acceder a la base de datos.

Por el momento, no se implementó explícitamente el patrón Singleton mediante una clase, ya que el módulo permite compartir la instancia sin agregar esa complejidad.

Estado: instancia compartida de conexión implementada. Aplicación explícita del patrón Singleton no realizada.

Repository

Se incorporó para separar las operaciones de persistencia de la lógica de negocio. Permite centralizar las consultas a PostgreSQL y evitar que los servicios dependan directamente de la base de datos.

Se implementó PlanningRepository, que contiene los métodos necesarios para crear, consultar, actualizar y eliminar planificaciones.

Estado: implementado y verificado mediante pruebas automatizadas.

Service Layer

Se incorporó una capa de servicios para centralizar las operaciones relacionadas con las planificaciones y coordinar la comunicación con los repositorios.

Se implementó PlanningService, que utiliza PlanningRepository para realizar las operaciones correspondientes.

Esta separación permite mantener las rutas HTTP independientes del acceso directo a la base de datos.

Estado: implementado y verificado mediante pruebas automatizadas.

Facade

Podría evaluarse si una operación de Tyta necesitara coordinar varios servicios o componentes y ofrecer una interfaz sencilla para utilizarlos.

Estado: posibilidad futura.

Adapter

Podría facilitar futuras integraciones con proveedores externos, por ejemplo, servicios de notificaciones o fuentes de información.

Estado: posibilidad futura.

Observer

Podría utilizarse si distintos componentes necesitaran reaccionar ante determinados eventos, como la creación o proximidad de un vencimiento.

Estado: posibilidad futura.

## 7. Criterios generales de diseño

Las decisiones técnicas del proyecto seguirán estos criterios:

- **Simplicidad:** evitar abstracciones innecesarias.
- **Separación de responsabilidades:** procurar que cada componente tenga una función clara.
- **Bajo acoplamiento:** reducir las dependencias entre componentes.
- **Alta cohesión:** mantener juntas las responsabilidades relacionadas.
- **Reutilización:** evitar duplicaciones de lógica cuando exista una abstracción adecuada.
- **Evolución progresiva:** incorporar complejidad cuando las necesidades del proyecto lo justifiquen.

Los patrones de diseño se aplicarán para resolver problemas concretos, no solamente por formar parte de los contenidos de la materia.

## 8. Evidencia y limitaciones

El análisis de la aplicación se basa en los archivos `backend/src/server.ts` y `backend/src/app.ts`, donde se separan la configuración de Express y el inicio del servidor.

La implementación del modelo `Planning` y su Builder se encuentra en los archivos indicados en la sección 2.2. Su comportamiento se verifica mediante 11 pruebas automatizadas con Vitest, que contemplan escenarios de construcción correcta, datos opcionales y validaciones de los atributos.

La persistencia se implementó mediante PostgreSQL, utilizando migraciones para administrar la estructura de la base de datos y un repositorio para realizar las operaciones sobre las planificaciones.

También se incorporó una capa de servicios y se implementaron las rutas HTTP necesarias para realizar las operaciones CRUD: creación, consulta, actualización y eliminación de planificaciones.

Se ejecutaron pruebas automatizadas con Vitest para verificar el dominio, el repositorio, los servicios, las rutas y la conexión con la base de datos. En la última ejecución se obtuvieron 47 pruebas aprobadas.

Como limitación actual, el backend todavía no cuenta con la implementación completa de usuarios, recordatorios, documentación ni vencimientos. Estas funcionalidades deberán incorporarse progresivamente y sus decisiones de diseño se documentarán cuando se desarrollen.

Además, parte del procesamiento de las solicitudes HTTP todavía se encuentra dentro de las rutas. Se evaluará incorporar una capa de controladores para separar más claramente las responsabilidades y facilitar el mantenimiento del código.

## 9. Próximos pasos

-Revisar la organización de las carpetas Models y domain.
-Evaluar qué entidades y tipos adicionales necesita el dominio.
-Incorporar una capa de controladores para separar el procesamiento HTTP de las rutas.
-Revisar y mejorar el manejo de errores.
-Definir el modelo de tareas y su relación con las planificaciones.
-Incorporar progresivamente usuarios, documentación, recordatorios y vencimientos.
-Agregar pruebas automatizadas para las nuevas funcionalidades.
-Evaluar la incorporación de otros patrones cuando exista una necesidad concreta.
-Actualizar este documento a medida que se implementen nuevas decisiones.
