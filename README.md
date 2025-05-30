# 🚀 Aplicación de Microservicios NestJS con TCP
asdasdasdasdasdasdasdasdasdasdasd

Esta es una aplicación didáctica que demuestra la comunicación entre microservicios usando **TCP nativo de NestJS**. Consta de dos microservicios que se comunican entre sí:

- **Microservicio A (Cliente HTTP)**: Expone endpoints HTTP y actúa como cliente TCP
- **Microservicio B (Servidor TCP)**: Escucha mensajes TCP y procesa las peticiones

## 📚 ¿Qué es un Microservicio?

Un **microservicio** es un patrón de arquitectura donde una aplicación se divide en servicios pequeños e independientes que se comunican entre sí a través de la red. Cada microservicio:

- Tiene una responsabilidad específica
- Se puede desarrollar, desplegar y escalar independientemente
- Se comunica con otros servicios a través de APIs bien definidas
- Puede usar diferentes tecnologías y bases de datos

### Comunicación TCP en NestJS

**TCP (Transmission Control Protocol)** es un protocolo de comunicación confiable que garantiza:

- ✅ **Entrega ordenada**: Los mensajes llegan en el orden correcto
- ✅ **Sin pérdida de datos**: Garantiza que todos los mensajes lleguen
- ✅ **Control de flujo**: Maneja la velocidad de transmisión
- ✅ **Detección de errores**: Verifica la integridad de los datos

NestJS implementa TCP de forma nativa usando **patrones de mensajes**, donde cada mensaje tiene un identificador único (patrón) que determina qué función del servidor lo procesará.

## 🔄 Ventajas y Desventajas de TCP vs HTTP vs Colas/Eventos

### TCP (Usado en este proyecto)
**✅ Ventajas:**
- Comunicación directa y rápida
- Menor overhead que HTTP
- Conexión persistente (reutilizable)
- Ideal para comunicación interna entre servicios

**❌ Desventajas:**
- Acoplamiento temporal (ambos servicios deben estar activos)
- No es RESTful (menos estándar para APIs públicas)
- Manejo manual de reconexiones

### HTTP/REST
**✅ Ventajas:**
- Estándar universal y bien conocido
- Fácil de debuggear y testear
- Compatible con herramientas web estándar
- Stateless por naturaleza

**❌ Desventajas:**
- Mayor overhead por headers HTTP
- Menos eficiente para comunicación interna
- Requiere más recursos de red

### Colas/Eventos (RabbitMQ, Kafka)
**✅ Ventajas:**
- Desacoplamiento total entre servicios
- Tolerancia a fallos (persistencia de mensajes)
- Escalabilidad horizontal
- Procesamiento asíncrono

**❌ Desventajas:**
- Complejidad adicional de infraestructura
- Latencia mayor
- Debugging más complejo
- Eventual consistency

## 🏗️ Arquitectura del Proyecto

```
┌─────────────────────┐    TCP    ┌─────────────────────┐
│   Microservicio A   │◄─────────►│   Microservicio B   │
│   (Cliente HTTP)    │           │   (Servidor TCP)    │
│                     │           │                     │
│ ┌─────────────────┐ │           │ ┌─────────────────┐ │
│ │ HTTP Endpoints  │ │           │ │ TCP Patterns    │ │
│ │ GET /ping       │ │           │ │ ping            │ │
│ │ GET /time       │ │           │ │ getTime         │ │
│ │ GET /reverse    │ │           │ │ reverseString   │ │
│ └─────────────────┘ │           │ └─────────────────┘ │
└─────────────────────┘           └─────────────────────┘
         ▲                                   ▲
         │ HTTP                              │ TCP
         │                                   │
    ┌─────────┐                         ┌─────────┐
    │ Cliente │                         │ Puerto  │
    │ Web/API │                         │  3001   │
    └─────────┘                         └─────────┘
```

## 📁 Estructura del Proyecto

```
src/
├── microservices/
│   ├── client-http/              # Microservicio A (Cliente HTTP)
│   │   ├── client-http.controller.ts
│   │   ├── client-http.module.ts
│   │   ├── tcp-client.service.ts
│   │   └── main.ts
│   └── server-tcp/               # Microservicio B (Servidor TCP)
│       ├── server-tcp.controller.ts
│       ├── server-tcp.service.ts
│       ├── server-tcp.module.ts
│       └── main.ts
└── shared/                       # Código compartido
    ├── dtos/                     # Data Transfer Objects
    │   ├── reverse-string.dto.ts
    │   └── query-text.dto.ts
    ├── interfaces/               # Interfaces TypeScript
    │   └── tcp-response.interface.ts
    └── utils/                    # Utilidades
        └── config.ts
```

## 🚀 Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
git clone <repository-url>
cd nest-transporters-app
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo y ajusta las configuraciones:

```bash
cp .env.example .env
```

El archivo `.env` contiene:

```env
# Configuración del Microservicio A (Cliente HTTP)
CLIENT_HTTP_PORT=3000

# Configuración del Microservicio B (Servidor TCP)
SERVER_TCP_PORT=3001

# Configuración del cliente TCP (para conectar A con B)
TCP_HOST=localhost
TCP_PORT=3001

# Configuración de timeouts y reconexión
TCP_TIMEOUT=5000
TCP_RECONNECT_ATTEMPTS=3
TCP_RECONNECT_DELAY=1000
```

## 🏃‍♂️ Ejecutar la Aplicación

### Opción 1: Ejecutar ambos servicios por separado (Recomendado)

**Terminal 1 - Servidor TCP:**
```bash
npm run start:server-tcp:dev
```

**Terminal 2 - Cliente HTTP:**
```bash
npm run start:client-http:dev
```

### Opción 2: Ejecutar en modo producción

**Terminal 1:**
```bash
npm run start:server-tcp
```

**Terminal 2:**
```bash
npm run start:client-http
```

## 🧪 Probar la Aplicación

Una vez que ambos servicios estén ejecutándose, puedes probar los endpoints:

### 1. Ping (Verificar conectividad)
```bash
curl http://localhost:3000/ping
```
**Respuesta esperada:**
```json
{
  "status": "ok",
  "data": "pong"
}
```

### 2. Obtener hora del servidor
```bash
curl http://localhost:3000/time
```
**Respuesta esperada:**
```json
{
  "status": "ok",
  "data": "2024-01-15T10:30:45.123Z"
}
```

### 3. Invertir texto
```bash
curl "http://localhost:3000/reverse?text=hola mundo"
```
**Respuesta esperada:**
```json
{
  "status": "ok",
  "data": "odnum aloh"
}
```

### Usando un navegador web

También puedes abrir estos URLs directamente en tu navegador:

- http://localhost:3000/ping
- http://localhost:3000/time
- http://localhost:3000/reverse?text=NestJS

## 🔧 Características Técnicas

### Microservicio A (Cliente HTTP)
- **Puerto**: 3000 (configurable)
- **Endpoints HTTP**: GET /ping, /time, /reverse
- **Cliente TCP reutilizable** con:
  - Reconexión automática
  - Timeouts configurables
  - Manejo de errores robusto
- **Validación de DTOs** con class-validator
- **Logging detallado** de peticiones y respuestas

### Microservicio B (Servidor TCP)
- **Puerto**: 3001 (configurable)
- **Patrones TCP**: ping, getTime, reverseString
- **Validación automática** de payloads
- **Manejo de errores** con respuestas estructuradas
- **Logging** de todas las operaciones

### Características Compartidas
- **TypeScript** con tipado estricto
- **Configuración centralizada** con variables de entorno
- **DTOs** para validación de datos
- **Interfaces** para tipado de respuestas
- **Logging estructurado** con contexto
- **Manejo de errores** consistente

## 🛠️ Scripts Disponibles

```bash
# Desarrollo (con watch mode)
npm run start:server-tcp:dev    # Servidor TCP en modo desarrollo
npm run start:client-http:dev   # Cliente HTTP en modo desarrollo

# Producción
npm run start:server-tcp        # Servidor TCP
npm run start:client-http       # Cliente HTTP

# Utilidades
npm run build                   # Compilar TypeScript
npm run lint                    # Linter
npm run test                    # Tests unitarios
npm run format                  # Formatear código
```

## 🐛 Troubleshooting

### Error: "ECONNREFUSED"
- Verifica que el servidor TCP esté ejecutándose en el puerto 3001
- Revisa las variables de entorno en `.env`

### Error: "Port already in use"
- Cambia los puertos en el archivo `.env`
- Mata procesos que usen los puertos: `lsof -ti:3000 | xargs kill -9`

### Error de validación
- Verifica que el parámetro `text` no esté vacío
- El texto no puede exceder 1000 caracteres

## 📝 Logs de Ejemplo

**Servidor TCP:**
```
[ServerTCP] 🚀 Microservicio Servidor TCP ejecutándose en puerto 3001
[ServerTcpController] Recibido patrón: ping
[ServerTcpController] Respuesta ping: {"status":"ok","data":"pong"}
```

**Cliente HTTP:**
```
[ClientHTTP] 🚀 Microservicio Cliente HTTP ejecutándose en puerto 3000
[TcpClientService] ✅ Conectado al servidor TCP en localhost:3001
[ClientHttpController] 🌐 Endpoint /ping llamado
[TcpClientService] 📤 Enviando mensaje con patrón: ping
[TcpClientService] 📥 Respuesta recibida: {"status":"ok","data":"pong"}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de uso educativo y está bajo licencia MIT.

---

**¡Feliz coding! 🎉**
