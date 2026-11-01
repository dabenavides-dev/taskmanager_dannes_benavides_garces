# Declaración de Uso de IA y Fuentes de Aprendizaje

**Opción:** B - Custom Events
**Fuentes:** Meta AI + Tutoriales YouTube + Clases del docente

### Fuentes adicionales
- **YouTube:** Tutoriales "LocalStorage CRUD Vanilla" y "CustomEvent Observer Pattern" - me ayudaron a entender por qué se duplicaban tareas y cómo desacoplar el dashboard.
- **Clases del docente:** Como agregar los commits.

### Promts utilizados
1. Ayúdame a comprender como se estructura una app TaskManager en JavaScript Vanilla sin frameworks que haga CRUD completo, use localStorage con JSON.stringify y JSON.parse

2. Ayúdame con un styles para este proyecto y comparteme los codigos de los colores con tonos azules.

### Errores
1. **localStorage:** IA proponía guardar innerHTML. Corregí con lo visto en clase y YouTube: solo guardar array con `JSON.stringify`.

2. **CustomEvent:** Con tutorial de YouTube centralicé en `guardarYNotificar()` que hace `setItem` + `dispatchEvent`. Aprendí patrón observer sin librerías.

3. **Orden por prioridad:** Se ordenaba alfabéticamente. Corregí con mapa de pesos ` {Alta:3, Media:2, Baja:1}`.

### Aprendizaje
Entendí que localStorage solo guarda strings, que fetch solo debe ejecutarse si no hay datos, y que CustomEvent permite que el Dashboard escuche sin ser llamado directamente.

Declaración: Código comprendido y adaptado por mí.