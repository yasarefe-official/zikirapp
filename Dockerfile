# ===== Build Stage: Frontend =====
# Client'ı build etmek için Node.js 20 kullan
FROM node:20 AS client-builder

WORKDIR /app/client

# Sadece client'ın package.json'unu kopyala
COPY client/package.json client/package-lock.json* ./

# Client bağımlılıklarını kur
RUN npm install

# Client kaynak kodunu kopyala
COPY client/ ./

# Client'ı build et
RUN npm run build

# ===== Build Stage: Backend =====
# Backend bağımlılıklarını kurmak için Node.js 20 kullan
FROM node:20 AS server-builder

WORKDIR /app

# Ana package.json'u kopyala
COPY package.json package-lock.json* ./

# Sadece production bağımlılıklarını kur
RUN npm install --omit=dev

# ===== Runtime Stage =====
# Son imaj için küçük ve güvenli alpine imajını kullan
FROM node:20-alpine

WORKDIR /app

# Gerekli sunucu dosyalarını kopyala
COPY index.js .
COPY config/ ./config
COPY routes/ ./routes

# Backend bağımlılıklarını server-builder'dan kopyala
COPY --from=server-builder /app/node_modules ./node_modules

# Build edilmiş React uygulamasını client-builder'dan kopyala
COPY --from=client-builder /app/client/build ./build

# Uygulamanın çalışacağı port'u belirt
EXPOSE 8080
ENV PORT=8080

# Uygulamayı başlat
CMD ["node", "index.js"]
