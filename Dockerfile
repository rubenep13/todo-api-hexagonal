# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar código compilado del builder
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Usuario no-root por seguridad
USER node

# Comando de inicio
CMD ["node", "dist/index.js"]