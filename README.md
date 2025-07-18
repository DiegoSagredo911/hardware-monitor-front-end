# 🖥️ Hardware Monitor Front end

Frontend para el monitoreo en tiempo real del hardware de múltiples equipos. Desarrollado con **Next.js**, **React** y **TailwindCSS**, permite visualizar métricas como CPU, RAM y otros datos recolectados desde distintos PCs, con actualización automática mediante WebSockets.

---

## 🔗 Arquitectura del Proyecto

Este frontend es uno de los componentes del sistema de monitoreo distribuido. Funciona en conjunto con los siguientes proyectos:

| Proyecto                                                                                    | Rol                                                                                        |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [`hardware-monitor-back-end`](https://github.com/DiegoSagredo911/hardware-monitor-back-end) | API que recibe, procesa y expone datos de hardware (WebSocket + REST)                      |
| [`hardware-monitor-cliente`](https://github.com/DiegoSagredo911/hardware-monitor-cliente)   | Aplicación que se instala en los PCs monitoreados y envía las métricas al backend vía MQTT |
| **Este repositorio**                                                                        | Interfaz web de administración para visualizar todos los reportes y métricas               |

> 🔄 Estos tres componentes trabajan juntos para ofrecer un sistema completo de monitoreo en tiempo real.

---

## 🚀 Características

- 📋 Listado de PCs conectados con métricas activas.
- 📊 Gráficas interactivas de CPU, RAM y otros recursos.
- 🔄 Actualización automática mediante WebSockets (`socket.io-client`).
- 🎨 Interfaz moderna, responsive y personalizable con TailwindCSS.

---

## 🔧 Variable de Entorno

Este frontend se comunica con el backend a través de la variable:

```env
NEXT_PUBLIC_URL=http://localhost:3001
```

> Cambia este valor en el archivo `.env` según la dirección del backend (`hardware-monitor-back-end`) que estés utilizando.

---

## ⚙️ Instalación y Ejecución

1. **Clona el proyecto**

```bash
git clone https://github.com/DiegoSagredo911/hardware-monitor-front-end.git
cd hardware-monitor-front-end
```

2. **Instala las dependencias**

```bash
npm install
# o
yarn install
```

3. **Crea un archivo `.env`**

```env
NEXT_PUBLIC_URL=http://localhost:3001
```

4. **Inicia el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. Accede a la app desde [http://localhost:3000](http://localhost:3000)

---

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/                  # Páginas principales (App Router de Next.js)
│   ├── components/           # Componentes reutilizables (charts, tablas, info)
│   ├── hooks/                # Hooks personalizados para datos y WebSockets
│   └── utils/                # Funciones utilitarias
├── public/                   # Archivos estáticos
├── .env                      # Variables de entorno
├── package.json              # Scripts y dependencias
├── next.config.mjs           # Configuración de Next.js
├── tailwind.config.js        # Configuración de TailwindCSS
└── README.md
```

---

## 📦 Scripts Disponibles

| Comando         | Descripción                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo        |
| `npm run build` | Crea la build para producción           |
| `npm start`     | Corre la app en modo producción         |
| `npm run lint`  | Corre el linter para revisión de código |

---

## 🧩 Tecnologías Utilizadas

- [**Next.js**](https://nextjs.org/) – Framework de React con SSR y rutas modernas.
- [**React**](https://react.dev/) – Librería principal para construir la interfaz.
- [**TailwindCSS**](https://tailwindcss.com/) – Framework de utilidades CSS.
- [**Recharts**](https://recharts.org/) – Gráficas para visualización de datos.
- [**axios**](https://axios-http.com/) – Cliente HTTP para consumir la API.
- [**socket.io-client**](https://socket.io/) – Comunicación en tiempo real.

---

## 🌐 Despliegue

Este frontend puede desplegarse fácilmente en:

- [**Vercel**](https://vercel.com/)
- [**Netlify**](https://www.netlify.com/)

Consulta la [documentación de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más información.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!
Abre un _issue_ o _pull request_ para reportar errores o proponer mejoras.

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.
