# ===== Build Stage =====
# Projeyi build etmek için Node.js'in tam sürümünü kullan
FROM node:18 AS build

# Çalışma dizinini ayarla
WORKDIR /app

# Önce package.json ve lock dosyasını kopyala
# Bu, `npm install`'ın sadece bağımlılıklar değiştiğinde çalışmasını sağlar (Docker layer caching)
COPY package.json ./
# package-lock.json dosyasını da kopyalamaya çalış, varsa kullanır
COPY package-lock.json ./

# Tüm bağımlılıkları kur
RUN npm install

# Client kaynak kodunu kopyala
COPY client/ ./client/

# React uygulamasını build et
RUN npm run build

# ===== Runtime Stage =====
# Daha küçük ve güvenli bir Node.js imajı kullan
FROM node:18-alpine

WORKDIR /app

# Production bağımlılıklarını build aşamasından kopyala
COPY --from=build /app/node_modules ./node_modules

# Sunucu dosyalarını kopyala
COPY index.js .
COPY config/ ./config
COPY routes/ ./routes

# Build edilmiş React uygulamasını kopyala
COPY --from=build /app/build ./build

# Uygulamanın çalışacağı port'u belirt
EXPOSE 8080

# Ortam değişkeni (Koyeb gibi platformlar bunu override edebilir)
ENV PORT=8080

# Uygulamayı başlat
CMD ["node", "index.js"]
