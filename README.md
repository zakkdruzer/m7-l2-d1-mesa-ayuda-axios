# Mesa de Ayuda — Vue + Vite + Axios + JWT

Aplicación frontend desarrollada con Vue 3 para consumir una API REST educativa de mesa de ayuda. El proyecto permite listar tickets, ver el detalle de un ticket, iniciar sesión con JWT, crear tickets autenticados y sumar mejoras opcionales como búsqueda, distintivos de prioridad, validación previa y contador de sesión.

## Demo

El frontend también puede visualizarse desplegado en GitHub Pages.

> Importante: aunque el frontend se vea en GitHub Pages, las peticiones a la API solo funcionarán si el backend también está corriendo y accesible. Si el backend se mantiene solo en `localhost`, la demo publicada servirá principalmente para mostrar la interfaz y la navegación.

## Objetivo del ejercicio

La actividad está diseñada en 4 bloques principales:

1. Listar tickets
2. Ver detalle de un ticket
3. Iniciar sesión con JWT
4. Crear un ticket nuevo

Después de completar esos bloques, se agregaron varios opcionales para mejorar la experiencia y reforzar conceptos.

## Funcionalidades implementadas

### Núcleo del ejercicio

- Listado de tickets con estados de cargando, error, vacío y con datos.
- Detalle de ticket solicitado al servidor por identificador.
- Manejo del caso “ticket no encontrado”.
- Inicio de sesión con JWT usando credenciales de prueba.
- Persistencia de sesión tras refrescar la página.
- Visualización de nombre y rol del usuario autenticado.
- Cierre de sesión limpiando el estado local.
- Creación de tickets con credencial JWT.
- Errores de validación mostrados por campo.
- Actualización de la lista sin recargar toda la aplicación.

### Opcionales implementados

- Buscador por asunto o solicitante.
- Distintivo visual por prioridad.
- Antigüedad del ticket.
- Validación previa en navegador.
- Notificación temporal de creación exitosa.
- Interceptores de Axios.
- Composables para sesión y tickets.
- Paginación usando metadata de la API.
- Cuenta regresiva de sesión basada en expiración del token.

## Tecnologías usadas

### Frontend

- Vue
- Vite
- Vue Router
- Axios
- Composition API
- JavaScript
- CSS

### Backend local incluido

Este repositorio también incluye la carpeta del backend educativo local (node-backend-edu) para que cualquier persona que clone o haga fork del proyecto pueda levantar tanto el frontend como el backend y probar el ejercicio completo.

## Estructura del proyecto

```txt
.
├── node-backend-edu/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppNavbar.vue
│   │   ├── TicketCard.vue
│   │   └── TicketDetalle.vue
│   ├── composables/
│   │   ├── useAuth.js
│   │   └── useTickets.js
│   ├── router/
│   │   └── index.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── ticketsService.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── LoginView.vue
│   │   └── NuevoTicketView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

> Si la carpeta del backend en tu repositorio tiene otro nombre, reemplaza `backend/` por el nombre real.

## Requisitos

- Node.js
- npm
- Git

## Instalación del proyecto completo

1. Clona el repositorio:

```bash
git clone https://github.com/TU-USUARIO/TU-REPO.git
cd TU-REPO
```

2. Instala las dependencias del frontend:

```bash
npm install
```

3. Entra a la carpeta del backend local incluida en el proyecto e instala sus dependencias:

```bash
cd backend
npm install
```

4. Vuelve a la raíz del proyecto:

```bash
cd ..
```

## Cómo ejecutar frontend y backend juntos

Este ejercicio trabaja con dos servidores:

- Backend en `http://localhost:3001`
- Frontend en `http://localhost:5173`

### Terminal 1 — Backend

Desde la carpeta del backend:

```bash
cd backend
npm run dev
```

Backend disponible en:

```txt
http://localhost:3001
```

### Terminal 2 — Frontend

Desde la raíz del proyecto:

```bash
npm run dev
```

Frontend disponible en:

```txt
http://localhost:5173
```

## Cómo usar el ejercicio

1. Levanta primero el backend y déjalo corriendo durante toda la práctica.
2. Abre el frontend en el navegador.
3. Revisa la lista de tickets en la pantalla principal.
4. Abre el detalle de un ticket desde la lista.
5. Inicia sesión para habilitar la creación de tickets.
6. Crea tickets válidos e inválidos para probar validación local y del servidor.
7. Usa el buscador y revisa los distintivos de prioridad.

## Credenciales de prueba

- Usuario: `admin`
- Contraseña: `admin123`

## Endpoints utilizados por el frontend

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tickets` | Lista de tickets |
| GET | `/api/tickets/:id` | Detalle de un ticket |
| POST | `/api/login` | Obtención del token JWT |
| POST | `/api/tickets` | Creación de ticket autenticada |

## Autenticación

El ejercicio usa JWT para autenticar operaciones de escritura. En el frontend, el token se almacena para conservar la sesión tras refrescar la página y se adjunta automáticamente en las peticiones protegidas mediante interceptores de Axios.

## Validaciones implementadas

- Validación previa en el navegador para mínimos de asunto, descripción y solicitante.
- Validación final del servidor al crear tickets.
- Errores `422` mostrados por campo.
- Prevención de doble envío del formulario.

## Búsqueda, prioridad y sesión

Como mejoras opcionales, la lista puede filtrarse por asunto o solicitante y los tickets muestran distintivos visuales de prioridad. Además, la sesión muestra nombre, rol y tiempo restante del token.

## Deploy en GitHub Pages

El frontend puede visualizarse en GitHub Pages.

Para eso se configuró:

- `base` en `vite.config.js`
- `createWebHashHistory()` en Vue Router
- despliegue compatible con Vite para repositorios en GitHub Pages

### Limitación importante

Si el backend sigue corriendo solo en `localhost:3001`, el frontend publicado en GitHub Pages no podrá consumir esa API desde internet.

Eso significa que:

- la interfaz puede verse online;
- pero para una demo completamente funcional es necesario desplegar también el backend en un servicio externo.

## Scripts útiles

### Frontend

```bash
npm run dev
npm run build
npm run preview
```

Si configuraste despliegue con `gh-pages`, también puedes usar:

```bash
npm run deploy
```

### Backend

Desde la carpeta del backend:

```bash
npm run dev
```

## Para ver el resultado completo debes montar el backend en local, aunque también puedes ver el resultado parcial en:

https://zakkdruzer.github.io/m7-l2-d1-mesa-ayuda-axios

## Autor

Proyecto desarrollado como actividad práctica de consumo de datos desde una API con Vue 3, Axios y JWT, ampliado con opcionales de experiencia de usuario, sesión y búsqueda.
