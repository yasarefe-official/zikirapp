# ===== Build Stage =====
# Projeyi build etmek için Node.js 20 kullan
FROM node:20 AS builder

WORKDIR /app

# package.json ve lock dosyasını kopyala
COPY package.json package-lock.json* ./

# Tüm (client ve server) bağımlılıkları kur
RUN npm install

# Client kaynak kodunu kopyala
COPY client/ ./client

# Sunucu kaynak kodunu kopyala
COPY . .

# Client'ı build et
# Bu komut, ana dizinde bir `build` klasörü oluşturur
RUN npm run build

# ===== Runtime Stage =====
# Son imaj için küçük ve güvenli alpine imajını kullan
FROM node:20-alpine

WORKDIR /app

# Production bağımlılıklarını builder aşamasından kopyala
# Not: npm install'ı --omit=dev ile çalıştırmak daha da optimize edebilir,
# ama bu yapı daha basit ve garantilidir.
COPY --from=builder /app/node_modules ./node_modules

# Gerekli sunucu dosyalarını kopyala
COPY --from=builder /app/index.js .
COPY --from=builder /app/config/ ./config
COPY --from=builder /app/routes/ ./routes

# Build edilmiş React uygulamasını kopyala
COPY --from=builder /app/build ./build

# Uygulamanın çalışacağı port'u belirt
EXPOSE 8080
ENV PORT=8080

# Uygulamayı başlat
CMD ["node", "index.js"]
