# 📘 Demo: JavaScript Asíncrono

> Documentación explicativa para la demo interactiva de programación asíncrona en JavaScript.

---

## 📋 ¿Qué es este proyecto?

Este proyecto es una **demo interactiva** en un solo archivo HTML que permite explorar y comparar las tres formas principales de manejar operaciones asíncronas en JavaScript:

- **Callbacks** — el enfoque clásico
- **Promises (Promesas)** — el enfoque moderno
- **Async / Await** — el enfoque recomendado actualmente

El objetivo es visualizar en tiempo real cómo se ejecuta el código asíncrono, sin bloquear el hilo principal del navegador.

---

## 📂 Estructura del proyecto

```
/
├── js-async-demo.html   ← Toda la demo en un solo archivo
└── README.md            ← Este archivo
```

El archivo HTML contiene el HTML, CSS y JavaScript en un único archivo autocontenido. No requiere instalación ni dependencias externas.

---

## 🚀 Cómo usar la demo

1. Descarga el archivo `js-async-demo.html`.
2. Ábrelo directamente en cualquier navegador moderno (Chrome, Firefox, Edge, Safari).
3. Interactúa con cada sección usando los botones.

No se necesita servidor, instalación ni conexión a internet.

---

## 🧩 Secciones de la demo

### Sección 01 — Callback

Un **callback** es una función que se pasa como argumento a otra función, para ser ejecutada cuando una tarea termina.

**¿Qué hace esta sección?**
Simula dos tareas encadenadas (descargar y procesar datos) usando `setTimeout` para imitar una operación lenta. Al presionar **▶ EJECUTAR**, la consola muestra que el código síncrono se imprime *antes* que los resultados del callback, demostrando el comportamiento asíncrono.

**Concepto clave: Callback Hell**
Cuando se anidan múltiples callbacks, el código se vuelve difícil de leer y mantener. Este problema se conoce como *Callback Hell* o *Pyramid of Doom*.

```js
// Ejemplo del problema
tarea1(function(res1) {
  tarea2(function(res2) {
    tarea3(function(res3) {
      // Código difícil de seguir y mantener
    })
  })
})
```

---

### Sección 02 — Promise (Promesa)

Una **Promise** es un objeto que representa el resultado eventual de una operación asíncrona. Puede estar en uno de tres estados:

| Estado | Descripción |
|--------|-------------|
| `pending` | En espera, aún no ha terminado |
| `fulfilled` | Completada exitosamente |
| `rejected` | Falló o fue rechazada |

**¿Qué hace esta sección?**
Ofrece dos botones: **▶ ÉXITO** y **✗ ERROR**. Permite ver cómo `.then()` maneja el resultado exitoso y `.catch()` captura los errores, sin necesidad de estructuras de control anidadas.

**Ventaja sobre los callbacks:**
Las promesas permiten encadenar operaciones de forma lineal con `.then()`, lo que hace el código mucho más legible.

```js
tarea1()
  .then(res => tarea2(res))
  .then(res => tarea3(res))
  .catch(err => manejarError(err))
```

---

### Sección 03 — Async / Await

`async/await` es una sintaxis especial construida sobre las Promesas. Permite escribir código asíncrono con una apariencia similar al código síncrono, usando `try/catch` para el manejo de errores.

**¿Qué hace esta sección?**
Ejecuta tres pasos secuenciales (conectar, descargar, procesar) con tiempos distintos. La consola muestra el orden de ejecución, incluyendo la línea síncrona que se imprime *antes* que los pasos, a pesar de estar escrita *después* en el código.

**Reglas importantes:**
- `async` antes de una función la hace retornar automáticamente una Promise.
- `await` solo puede usarse **dentro** de una función `async`.
- `await` pausa la ejecución *dentro de esa función*, pero **no bloquea** el resto del programa.

```js
async function procesarDatos() {
  try {
    const datos = await descargar()    // espera aquí...
    const resultado = await procesar(datos) // luego aquí...
    console.log(resultado)
  } catch (error) {
    console.log("Error:", error)
  }
}
```

---

### Sección 04 — Comparación

Resume las diferencias entre los tres enfoques en una tabla y un timeline animado.

**Tabla comparativa:**

| Técnica | Legibilidad | Manejo de errores | Anidación | Uso hoy |
|---------|-------------|-------------------|-----------|---------|
| Callback | Baja | Manual | Callback Hell | Legado |
| Promise | Media | `.catch()` | Encadenado | Común |
| Async/Await | Alta | `try/catch` | Lineal | ✅ Recomendado |

**Timeline:**
Muestra visualmente cuándo se ejecuta cada tipo de tarea en relación al Event Loop. Las Promesas y Async/Await usan la **Microtask Queue** (prioridad alta), mientras que los callbacks de `setTimeout` usan la **Task Queue** (prioridad estándar).

---

## 🧠 Conceptos clave explicados

### ¿Por qué JavaScript necesita asincronía?

JavaScript es **single-threaded**: ejecuta solo una tarea a la vez. Sin asincronía, una operación lenta (como una petición HTTP) bloquearía todo el programa.

### El Event Loop

El **Event Loop** es el mecanismo que permite a JavaScript manejar múltiples tareas sin bloquearse. Funciona con tres componentes:

1. **Call Stack** — donde se ejecutan las funciones actuales.
2. **Microtask Queue** — donde esperan las Promesas resueltas (alta prioridad).
3. **Task Queue (Callback Queue)** — donde esperan los callbacks de `setTimeout`, `setInterval`, etc.

El Event Loop revisa constantemente si el Call Stack está vacío para mover tareas desde las colas.

---

## 💡 ¿Cuándo usar cada uno?

- **Callback:** Solo cuando usas APIs antiguas que lo requieran (como `fs` en Node.js versiones viejas).
- **Promise:** Cuando trabajas con múltiples operaciones paralelas usando `Promise.all()` o `Promise.race()`.
- **Async/Await:** En la mayoría de los casos modernos. Es la forma más legible y mantenible.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — estructura
- **CSS3** — estilos y animaciones
- **JavaScript Vanilla (ES2017+)** — lógica de la demo
- **Google Fonts** — tipografías `Space Mono` y `Syne`

Sin frameworks, sin dependencias, sin instalación.

---

## 📚 Referencias para profundizar

- [MDN Web Docs — Asynchronous JavaScript](https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous)
- [MDN Web Docs — Promise](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN Web Docs — async function](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function)
- [JavaScript.info — Promises, async/await](https://javascript.info/async)

---

*Demo creada con fines educativos para el Bootcamp JavaScript Trainne 2026.*