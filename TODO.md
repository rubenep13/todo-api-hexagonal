# Roadmap: TODO API con Testing, Arquitectura Hexagonal, Docker y CI/CD

## FASE 1: FUNDAMENTOS - Testing y Arquitectura (Semana 1-2)

### 1.1 Setup inicial del proyecto
- [ ] Inicializar proyecto Node/TypeScript con configuración base
- [ ] Configurar ESLint y Prettier
- [ ] Estructura de carpetas hexagonal (domain, application, infrastructure)
- [ ] Configurar Jest para testing

### 1.2 Capa de Dominio (sin dependencias externas)
- [ ] Entidad Task (id, title, description, status, createdAt)
- [ ] Value Objects (TaskStatus, TaskId)
- [ ] Interfaces de repositorio (TaskRepository)
- [ ] Lógica de negocio básica y validaciones
- [ ] Unit tests del dominio (objetivo: >90% coverage)

### 1.3 Capa de Aplicación (casos de uso)
- [ ] CreateTask use case
- [ ] GetTasks use case
- [ ] UpdateTaskStatus use case
- [ ] DeleteTask use case
- [ ] Unit tests de use cases con mocks del repositorio

### 1.4 Capa de Infraestructura - Persistencia
- [ ] Implementación MongoTaskRepository
- [ ] Conexión a MongoDB (sin Docker todavía, usa MongoDB local o Atlas)
- [ ] Mappers entre entidades de dominio y modelos de Mongoose
- [ ] Integration tests del repositorio (con MongoDB en memoria)

### 1.5 Capa de Infraestructura - API REST
- [ ] Express server con endpoints REST
- [ ] Controllers que llaman a use cases
- [ ] Middleware de validación y error handling
- [ ] E2E tests de endpoints (con supertest + MongoDB en memoria)

**Entregable Fase 1:** API funcional con >80% test coverage, sin Docker

---

## FASE 2: CONTAINERIZACIÓN (Semana 2)

### 2.1 Docker básico
- [ ] Dockerfile para la aplicación
- [ ] .dockerignore optimizado
- [ ] Verificar build y ejecución local del contenedor

### 2.2 Docker Compose
- [ ] docker-compose.yml con servicios: api + mongo
- [ ] Variables de entorno para configuración
- [ ] Volúmenes para persistencia de datos MongoDB
- [ ] Network entre contenedores
- [ ] Verificar que toda la suite de tests corre en contenedor

### 2.3 Entornos múltiples
- [ ] docker-compose.dev.yml (con volúmenes para hot reload)
- [ ] docker-compose.test.yml (para correr tests en CI)
- [ ] Configuración de entornos via .env files

**Entregable Fase 2:** Proyecto completamente dockerizado, levantable con un comando

---

## FASE 3: CI/CD (Semana 3)

### 3.1 GitHub Actions - Pipeline básico
- [ ] Workflow que corre en cada push/PR
- [ ] Jobs: lint, tests unitarios, tests integración
- [ ] Build de imagen Docker
- [ ] Cache de dependencias para velocidad

### 3.2 Deployment automático
- [ ] Configurar cuenta en Railway o Render (gratis tier)
- [ ] Workflow de deployment a staging en cada merge a main
- [ ] Variables de entorno en producción (MongoDB Atlas)
- [ ] Health check endpoint para verificar deploy

### 3.3 Mejoras de pipeline
- [ ] Test coverage reports
- [ ] Notificaciones de fallos (opcional)
- [ ] Deploy manual a producción con aprobación (opcional)

**Entregable Fase 3:** Pipeline completo que va de commit → tests → deploy automático

---

## FASE 4: REFINAMIENTO Y DOCUMENTACIÓN (Semana 4)

### 4.1 Documentación técnica
- [ ] README con arquitectura explicada
- [ ] Diagramas de arquitectura hexagonal
- [ ] Instrucciones de setup y desarrollo
- [ ] Guía de testing

### 4.2 Mejoras opcionales (elige 1-2)
- [ ] Paginación en listado de tareas
- [ ] Filtros y búsqueda
- [ ] Autenticación JWT básica
- [ ] Rate limiting
- [ ] Logs estructurados

### 4.3 Preparación para entrevistas
- [ ] Script de demo del proyecto
- [ ] Documento explicando decisiones de arquitectura
- [ ] Métricas: coverage, performance, líneas de código
- [ ] Repo público en GitHub bien presentado

**Entregable Final:** Proyecto portfolio-ready que demuestra dominio de testing, arquitectura, Docker y CI/CD

---

## Criterios de éxito
- Test coverage >80%
- Pipeline verde (todos los tests pasan)
- Deploy automático funcional
- Código sigue principios SOLID
- Documentación clara para otros devs

---

## Notas de contexto

### Stack tecnológico
- **Runtime:** Node.js 20+
- **Lenguaje:** TypeScript
- **Framework:** Express
- **Base de datos:** MongoDB + Mongoose
- **Testing:** Jest
- **Containerización:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Deployment:** Railway o Render

### Arquitectura Hexagonal
```
src/
├── domain/              # Capa de dominio (lógica de negocio pura)
│   ├── entities/
│   ├── value-objects/
│   └── repositories/    # Interfaces (puertos)
├── application/         # Casos de uso
│   └── use-cases/
└── infrastructure/      # Adaptadores
    ├── persistence/     # Implementación de repositorios
    ├── http/           # Controllers y rutas
    └── config/         # Configuración
```

### Beneficios del proyecto para tu carrera
- Demuestra conocimiento de testing end-to-end
- Muestra comprensión de arquitectura limpia
- Evidencia experiencia con Docker y CI/CD
- Portfolio tangible para entrevistas técnicas
- Cubre gaps críticos que te frenan en posiciones senior reales