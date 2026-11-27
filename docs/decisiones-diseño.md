# Análisis y decisiones de diseño — Tyta

## 1. Contexto

Tyta busca ayudar a las personas y familias a organizar responsabilidades, documentación, vencimientos y recordatorios. La aplicación pretende informar y orientar al usuario, sin realizar directamente trámites ni reservar turnos.

El backend se encuentra en una etapa inicial de desarrollo. Este documento registra el análisis de las decisiones de diseño, las alternativas consideradas y los patrones incorporados o evaluados.

Se distingue entre las decisiones implementadas, las adoptadas y las propuestas para futuras etapas.

## 2. Código analizado

### 2.1. Servidor inicial

Archivo: `backend/src/server.ts`

El servidor:

- Importa Express.
- Crea una aplicación con `express()`.
- Define el puerto 3000.
- Habilita el procesamiento de cuerpos JSON.
- Declara una ruta GET `/` que devuelve un mensaje de bienvenida en JSON.
- Inicia el servidor y muestra su dirección local.

Todavía no implementa la gestión de usuarios, recordatorios, documentación ni vencimientos.

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

-Se implementaron 11 pruebas automatizadas utilizando Vitest para comprobar el comportamiento del Builder en distintos escenarios:

- Construcción de una planificación con todos sus datos.
- Construcción sin presupuesto estimado.
- Lanzamiento de un error cuando faltan datos obligatorios.
- Rechazo de títulos compuestos únicamente por espacios.
- Rechazo de descripciones vacías o compuestas únicamente por espacios.
- Rechazo de fechas inválidas.
- Rechazo de categorías no permitidas.
- Rechazo de presupuestos negativos.
- Aceptación de un presupuesto igual a cero.
- Rechazo de ubicaciones compuestas únicamente por espacios.
- Rechazo de presupuestos infinitos.
- Todas las pruebas fueron ejecutadas correctamente: 11 de 11 aprobadas.

**Estado:** implementado y verificado mediante pruebas automatizadas.

## 6. Relación con los patrones estudiados

### Factory

No se considera necesaria para la creación actual de Express, ya que no existen distintas configuraciones o tipos de aplicaciones que requieran centralizar esa decisión.

Sin embargo, podría evaluarse para la creación de distintos tipos de tareas de Tyta, si cada tipo requiere una construcción o comportamiento particular.

**Estado:** evaluado para Express y descartado por el momento. Posible aplicación futura en el dominio.

### Builder

Se incorporó para construir objetos `Planning`, debido a la cantidad de atributos y a la necesidad de validar los datos obligatorios antes de crear la instancia.

**Estado:** implementado.

### Singleton

Podría evaluarse para administrar una instancia compartida de algún recurso de infraestructura, como un cliente o conexión de base de datos.

Su incorporación dependerá de la tecnología de persistencia elegida y de la necesidad real de compartir una instancia.

**Estado:** pendiente de evaluación.

### Facade

Podría evaluarse si una operación de Tyta necesitara coordinar varios servicios o componentes y ofrecer una interfaz sencilla para utilizarlos.

**Estado:** posibilidad futura.

### Adapter

Podría facilitar futuras integraciones con proveedores externos, por ejemplo, servicios de notificaciones o fuentes de información.

**Estado:** posibilidad futura.

### Observer

Podría utilizarse si distintos componentes necesitaran reaccionar ante determinados eventos, como la creación o proximidad de un vencimiento.

**Estado:** posibilidad futura.

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

El análisis inicial del servidor se basa en `backend/src/server.ts`, que permite iniciar la aplicación y responder a una solicitud GET en `/`.

La implementación del modelo `Planning` y su Builder se encuentra en los archivos indicados en la sección 2.2.

La implementación del modelo `Planning` y su Builder se encuentra en los archivos indicados en la sección 2.2.

El comportamiento de `PlanningBuilder` se verifica mediante 11 pruebas automatizadas con Vitest, que contemplan escenarios de construcción correcta, datos opcionales, validaciones de campos obligatorios y situaciones de error. En la última ejecución, todas las pruebas fueron aprobadas.

El sistema todavía no cuenta con la implementación completa de usuarios, recordatorios, documentación, vencimientos ni persistencia de planificaciones.

Por lo tanto, las decisiones relacionadas con esas funcionalidades deberán revisarse cuando se desarrollen sus respectivos componentes.

El sistema todavía no cuenta con la implementación completa de usuarios, recordatorios, documentación, vencimientos ni persistencia de planificaciones.

Por lo tanto, las decisiones relacionadas con esas funcionalidades deberán revisarse cuando se desarrollen sus respectivos componentes.

## 9. Próximos pasos

- Mantener funcional el inicio del servidor.
- Definir las primeras responsabilidades del backend.
- Evaluar la separación entre configuración, rutas y lógica de negocio.
- Incorporar pruebas para verificar las rutas.
- Definir el modelo de tareas y su relación con las planificaciones.
- Evaluar la tecnología y estrategia de persistencia.
- Analizar la incorporación de Factory y Singleton cuando exista una necesidad concreta.
- Actualizar este documento a medida que se implementen nuevas decisiones.
