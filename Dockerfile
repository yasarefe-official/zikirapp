# ===== Base Stage =====
# PNPM'i kurmak için Node.js 20 kullan
FROM node:20 AS base
RUN npm install -g pnpm

# ===== Build Stage =====
# Bağımlılıkları kurmak ve build etmek için base imajını kullan
FROM base AS builder

WORKDIR /app

# Workspace tanım dosyasını kopyala
COPY pnpm-workspace.yaml .

# Her iki package.json'u da kopyala
COPY package.json .
COPY client/package.json ./client/
COPY server/package.json ./server/

# Tüm workspace bağımlılıklarını kur
# --frozen-lockfile, pnpm-lock.yaml varsa onu kullanır, CI/CD için en iyi pratiktir.
RUN pnpm install --frozen-lockfile

# Tüm kaynak kodunu kopyala
COPY . .

# Sadece client'ı build et
RUN pnpm --filter client build

# ===== Prune Stage =====
# Sadece production bağımlılıklarını ayıklamak için bir ara katman
FROM base AS pruner

WORKDIR /app

COPY --from=builder /app .
RUN pnpm -r deploy --prod /prod/

# ===== Runtime Stage =====
# Son imaj için küçük ve güvenli alpine imajını kullan
FROM node:20-alpine

WORKDIR /app

# Production bağımlılıklarını ve sunucu dosyalarını kopyala
COPY --from=pruner /prod/server/ ./server
COPY --from=pruner /prod/node_modules/ ./node_modules
COPY --from=pruner /prod/package.json .

# Build edilmiş React uygulamasını kopyala
COPY --from=builder /app/client/build ./client/build

# Uygulamanın çalışacağı port'u belirt
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Uygulamayı başlat
CMD ["node", "server/index.js"]
