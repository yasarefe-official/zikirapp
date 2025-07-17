# Fullstack Zikir Uygulaması (PNPM Monorepo & Docker)

Bu proje, React (Frontend) ve Node.js/Express (Backend) kullanılarak geliştirilmiş, modern ve güvenli bir zikir uygulamasıdır. Proje, **PNPM Workspaces** kullanılarak bir monorepo olarak yapılandırılmış ve **çok aşamalı bir Dockerfile** ile konteynerize edilmiştir. Bu, en iyi pratiklere uygun, yüksek performanslı, temiz ve hatasız bir dağıtım süreci sağlar.

## ✨ Özellikler

- **Kullanıcı Girişi:** Benzersiz kullanıcı adıyla giriş ve kayıt.
- **Zikir Sayacı:** Animasyonlu, offline modda tam destekli sayaç.
- **Offline-Online Senkronizasyon:** İnternet yokken yapılan zikirler, bağlantı kurulduğunda otomatik olarak sunucuyla senkronize edilir.
- **Global Leaderboard:** Kullanıcıların en yüksek skorlarını gösteren canlı liderlik tablosu.
- **Paylaşılabilir İstatistik Linkleri:** Kullanıcılar, istatistiklerini tamamen client-side oluşturulan güvenli bir link ile paylaşabilir.
- **Kullanıcı Profili:** Toplam zikir ve diğer istatistikler.
- **Otomatik Veritabanı Migration:** Uygulama ilk çalıştığında gerekli veritabanı tablosunu kendi oluşturur.

## 🚀 Teknoloji Yığını

- **Paket Yöneticisi:** **PNPM**
- **Frontend:** React, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express, Postgres.js
- **Veritabanı:** PostgreSQL
- **Deployment:** **Docker**

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v20.x veya üstü)
- **PNPM**'in yüklü olması (`npm install -g pnpm`)
- Docker (lokal çalıştırma için)
- PostgreSQL veritabanı

### Lokal Geliştirme Ortamı
1. Projeyi klonlayın: `git clone <repo_url>`
2. Ana dizine gidin: `cd <proje_dizini>`
3. Tüm workspace bağımlılıklarını kurun:
   ```bash
   pnpm install
   ```
4. Geliştirme sunucularını başlatın:
   - Frontend için (client): `pnpm --filter client start`
   - Backend için (server): `pnpm --filter server start`

### Docker ile Çalıştırma
1. Projenin ana dizininde bir `.env` dosyası oluşturun ve veritabanı bilgilerinizi girin.
2. Docker imajını build edin: `docker build -t zikir-app .`
3. Konteyneri çalıştırın: `docker run -p 8080:8080 --env-file .env zikir-app`
   Uygulama artık `http://localhost:8080` adresinde çalışıyor olacaktır.

## 部署 Koyeb'e Deploy Etme (Dockerfile ile)

Bu optimize edilmiş `Dockerfile` ve PNPM yapısı, Koyeb'e dağıtım için idealdir.

1. **Koyeb'de Veritabanı Oluşturma:**
   - Koyeb panelinde yeni bir **Database Service** oluşturun ve bağlantı bilgilerinizi not alın.

2. **Uygulamayı Deploy Etme:**
   - Koyeb'de yeni bir **Web Service** oluşturun ve GitHub reponuzu bağlayın.
   - **Deployment Method** olarak **Dockerfile**'ı seçin.
   - **Environment Variables** (Ortam Değişkenleri) bölümüne, `.env` dosyanızdaki bilgileri ekleyin.
   - "Deploy" butonuna tıklayın.

Koyeb, `Dockerfile`'ınızdaki adımları takip ederek projenizi build edecek ve konteyneri başlatacaktır. Bu yöntem, size build ve runtime ortamı üzerinde tam kontrol sağlar ve tüm platform kaynaklı hataları ortadan kaldırır.

### `pnpm-lock.yaml` Üzerine Not
Bu repo, dağıtım süreçlerini basitleştirmek ve tutarlı kurulumlar sağlamak için bir `pnpm-lock.yaml` dosyası içerir. Eğer bağımlılıkları güncellerseniz (`pnpm install <paket_adi>`), `pnpm-lock.yaml` dosyasını da reponuza commitlediğinizden emin olun.

---

Bu README dosyası, projenin son, PNPM ve Docker tabanlı yapısını açıklamaktadır. Geliştirme sürecinde emeği geçen herkese teşekkürler!
