# Análisis y decisiones de diseño — Tyta

## 1. Contexto

Tyta busca ayudar a las personas y familias a organizar responsabilidades, documentación, vencimientos y recordatorios. La aplicación pretende informar y orientar al usuario, sin realizar directamente trámites ni reservar turnos.

El backend se encuentra en una etapa inicial. Este análisis distingue las decisiones implementadas de las mejoras propuestas.

## 2. Código analizado

Archivo: `backend/src/server.ts`

El servidor:
- Importa Express.
- Crea una aplicación con `express()`.
- Define el puerto 3000.
- Habilita el procesamiento de cuerpos JSON.
- Declara una ruta GET `/` que devuelve un mensaje de bienvenida en JSON.
- Inicia el servidor y muestra su dirección local.

Todavía no implementa la gestión de usuarios, recordatorios, documentación ni vencimientos.

## 3. Diagnóstico de diseño

### Creación directa de Express

La aplicación se crea con `const app = express()`.

Es una decisión sencilla y legible. Actualmente no hay múltiples tipos de servidores ni una lógica compleja de creación que justifique agregar una Factory.

### Configuración del puerto

El puerto se define con `const PORT = 3000`.

Esto alcanza para el desarrollo local. Si el proyecto necesita distintos entornos, se podría evaluar leer el puerto desde una variable de entorno.

### Responsabilidades del archivo

`server.ts` configura Express, declara una ruta e inicia el servidor. Para un prototipo pequeño es fácil de entender, pero el archivo podría concentrar demasiadas responsabilidades cuando crezcan las rutas y reglas de negocio.

## 4. Alternativas evaluadas

### Alternativa A: mantener el diseño actual

**Ventajas:**
- Menos código y archivos.
- Lectura y ejecución simples.
- No agrega abstracciones innecesarias.

**Desventajas:**
- El archivo podría crecer demasiado.
- La configuración y las rutas todavía no están separadas.

### Alternativa B: separar configuración e inicio

Crear un módulo que configure y devuelva la aplicación y otro que se encargue de iniciar el servidor.

**Ventajas:**
- Separa responsabilidades.
- Facilita probar la aplicación sin iniciar necesariamente el servidor.
- Favorece la organización futura.

**Desventajas:**
- Agrega estructura que podría ser innecesaria para una sola ruta.
- Requiere mantener esa separación.

### Alternativa C: introducir una Factory

Una función de fábrica podría crear y configurar la aplicación.

**Ventajas:**
- Puede centralizar una creación con distintas configuraciones.
- Puede facilitar la creación de instancias aisladas en pruebas.

**Desventajas:**
- La creación actual es directa y sencilla.
- Introducirla ahora agregaría abstracción sin un beneficio claro demostrado.

### Alternativa D: configurar el puerto mediante una variable de entorno

**Ventajas:**
- Facilita ejecutar la aplicación en distintos entornos.
- Evita depender exclusivamente de un puerto fijo.

**Desventajas:**
- Requiere validar y manejar la configuración.
- No resuelve por sí sola la organización de rutas y reglas de negocio.

## 5. Decisión propuesta

Por ahora se propone mantener la creación directa de Express y no incorporar Factory ni Builder sin una necesidad concreta.

La decisión prioriza simplicidad, legibilidad y una estructura proporcional a la funcionalidad implementada. Los patrones de diseño deben resolver problemas reales, no incorporarse solo por estar disponibles.

Cuando aumenten las rutas y responsabilidades, se puede evaluar separar la configuración del inicio del servidor y externalizar el puerto.

Estas son propuestas de evolución; no se presentan como funcionalidades ya implementadas.

## 6. Relación con los patrones estudiados

- **Factory:** no se considera necesaria para la creación sencilla actual.
- **Builder:** no se justifica porque la configuración tiene pocos pasos y opciones.
- **Facade:** podría evaluarse si una operación necesitara coordinar varias tareas y ofrecer una interfaz sencilla.
- **Adapter:** podría facilitar una futura integración con proveedores externos de notificaciones.
- **Observer:** podría servir si distintos componentes necesitaran reaccionar a eventos, como la proximidad de un vencimiento.

Estos ejemplos son posibilidades futuras. No se afirma que estén implementados.

## 7. Evidencia y limitaciones

El análisis se basa en `backend/src/server.ts`. La implementación permite iniciar el servidor y responder a una solicitud GET en `/`.

El alcance es reducido: no existen todavía reglas de negocio para recordatorios ni vencimientos. Por lo tanto, no corresponde afirmar que el sistema resuelve esas funcionalidades.

La decisión de mantener el diseño actual es provisional y deberá revisarse si el crecimiento del proyecto genera nuevas necesidades.

## 8. Próximos pasos

- Mantener funcional el inicio del servidor.
- Definir las primeras responsabilidades del backend.
- Separar rutas y lógica de negocio cuando la complejidad lo justifique.
- Incorporar pruebas para verificar las rutas.
- Evaluar patrones según problemas concretos y comparando sus beneficios y costos.