# Roadmap: TODO API con Testing, Arquitectura Hexagonal, Docker y CI/CD

## FASE 1: FUNDAMENTOS - Testing y Arquitectura (Semana 1-2)

### 1.1 Setup inicial del proyecto

- [x] Inicializar proyecto Node/TypeScript con configuración base
- [x] Configurar ESLint y Prettier
- [x] Estructura de carpetas hexagonal (domain, application, infrastructure)
- [x] Configurar Jest para testing

### 1.2 Capa de Dominio (sin dependencias externas)

- [x] Entidad Task (id, title, description, status, createdAt)
- [x] Value Objects (TaskStatus, TaskId)
- [x] Interfaces de repositorio (TaskRepository)
- [x] Lógica de negocio básica y validaciones
- [x] Unit tests del dominio (objetivo: >90% coverage)

### 1.3 Capa de Aplicación (casos de uso)

- [x] CreateTask use case
- [x] GetTasks use case
- [x] UpdateTaskStatus use case
- [x] DeleteTask use case
- [x] Unit tests de use cases con mocks del repositorio

### 1.4 Capa de Infraestructura - Persistencia

- [x] Implementación MongoTaskRepository
- [x] Conexión a MongoDB (sin Docker todaví­a, usa MongoDB local o Atlas)
- [x] Mappers entre entidades de dominio y modelos de Mongoose
- [x] Integration tests del repositorio (con MongoDB en memoria)

### 1.5 Capa de Infraestructura - API REST

- [x] Express server con endpoints REST
- [x] Controllers que llaman a use cases
- [x] Middleware de validación y error handling
- [x] E2E tests de endpoints (con supertest + MongoDB en memoria)

---

## FASE 2: CONTAINERIZACIÓN (Semana 2)

### 2.1 Docker básico

- [x] Dockerfile para la aplicación
- [x] .dockerignore optimizado
- [x] Verificar build y ejecución local del contenedor

### 2.2 Docker Compose

- [x] docker-compose.yml con servicios: api + mongo
- [x] Variables de entorno para configuración
- [x] Volúmenes para persistencia de datos MongoDB
- [x] Network entre contenedores
- [x] Verificar que toda la suite de tests corre en contenedor

### 2.3 Entornos múltiples

- [x] docker-compose.dev.yml (con volúmenes para hot reload [no funciona en windows])
- [x] docker-compose.test.yml (para correr tests en CI)
- [x] Configuración de entornos via .env files

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

---

## FASE 4: REFINAMIENTO Y DOCUMENTACIÓN (Semana 4)

### 4.1 Documentación técnica

- [ ] README con arquitectura explicada
- [ ] Diagramas de arquitectura hexagonal
- [ ] Instrucciones de setup y desarrollo
- [ ] Guí­a de testing

### 4.2 Mejoras opcionales (elige 1-2)

- [ ] Paginación en listado de tareas
- [ ] Filtros y búsqueda
- [ ] Autenticación JWT básica
- [ ] Rate limiting
- [ ] Logs estructurados

### 4.3 Preparación para entrevistas

- [ ] Script de demo del proyecto
- [ ] Documento explicando decisiones de arquitectura
- [ ] Métricas: coverage, performance, lí­neas de código
- [ ] Repo público en GitHub bien presentado

---

## Criterios de éxito

- Test coverage >80%
- Pipeline verde (todos los tests pasan)
- Deploy automático funcional
- Código sigue principios SOLID
- Documentación clara para otros devs

---
