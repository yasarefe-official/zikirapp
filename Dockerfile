# Sunucu için Node.js 20-alpine imajını kullan
FROM node:20-alpine

WORKDIR /app

# Sadece sunucu bağımlılıklarını kur
COPY server/package.json ./server/
RUN cd server && npm install --production

# Sunucu kodunu kopyala
COPY server/ ./server/

# Statik HTML dosyasını kopyala
COPY index.html ./

# Uygulamanın çalışacağı port'u belirt
EXPOSE 8080
ENV PORT=8080
ENV NODE_ENV=production

# Uygulamayı başlat
CMD ["node", "server/index.js"]
