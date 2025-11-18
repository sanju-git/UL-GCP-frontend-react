# Stage 1: Build the Vite static files
FROM node:20-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build   # <-- creates /app/dist

# Stage 2: Serve the Vite static build
FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g serve

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
USER nodejs

# Vite output folder is "dist"
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l $PORT"]