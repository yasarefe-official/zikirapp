# Fullstack Zikir Uygulaması (Dockerfile Edition)

Bu proje, React (Frontend) ve Node.js/Express (Backend) kullanılarak geliştirilmiş, modern ve güvenli bir zikir uygulamasıdır. Proje, **Dockerfile** ile konteynerize edilmiştir. Bu, Koyeb, Heroku, Render gibi modern platformlara dağıtımı son derece kolay, güvenilir ve taşınabilir hale getirir.

## ✨ Özellikler

- **Kullanıcı Girişi:** Benzersiz kullanıcı adıyla giriş ve kayıt.
- **Zikir Sayacı:** Animasyonlu, offline modda tam destekli sayaç.
- **Offline-Online Senkronizasyon:** İnternet yokken yapılan zikirler, bağlantı kurulduğunda otomatik olarak sunucuyla senkronize edilir.
- **Global Leaderboard:** Kullanıcıların en yüksek skorlarını gösteren canlı liderlik tablosu.
- **Paylaşılabilir İstatistik Linkleri:** Kullanıcılar, istatistiklerini tamamen client-side oluşturulan güvenli bir link ile paylaşabilir.
- **Kullanıcı Profili:** Toplam zikir ve diğer istatistikler.
- **Otomatik Veritabanı Migration:** Uygulama ilk çalıştığında gerekli veritabanı tablosunu kendi oluşturur.

## 🚀 Teknoloji Yığını

- **Frontend:** React, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express, Postgres.js
- **Veritabanı:** PostgreSQL
- **Deployment:** **Docker**

## ⚙️ Kurulum ve Çalıştırma (Docker ile)

### Ön Gereksinimler
- Docker ve Docker Compose'un yüklü olması.
- PostgreSQL veritabanı (lokal veya bulut üzerinde).

### Yapılandırma
1. Projenin ana dizininde bir `.env` dosyası oluşturun.
2. İçine PostgreSQL veritabanı bilgilerinizi ekleyin:
   ```
   DATABASE_HOST=<your_host>
   DATABASE_NAME=<your_db_name>
   DATABASE_USER=<your_user>
   DATABASE_PASSWORD=<your_password>
   PORT=8080
   ```
   *Not: `DATABASE_HOST` için, eğer Docker host makinenizdeki bir veritabanına bağlanıyorsanız, `host.docker.internal` gibi özel bir adres kullanmanız gerekebilir.*

### Çalıştırma
1. Projeyi klonlayın: `git clone <repo_url>`
2. Ana dizine gidin: `cd <proje_dizini>`
3. Docker imajını build edin:
   ```bash
   docker build -t zikir-app .
   ```
4. Konteyneri çalıştırın:
   ```bash
   docker run -p 8080:8080 --env-file .env zikir-app
   ```
   Uygulama artık `http://localhost:8080` adresinde çalışıyor olacaktır.

## 部署 Koyeb'e Deploy Etme (Dockerfile ile)

Bu `Dockerfile` yapısı, Koyeb'e dağıtım için idealdir.

1. **Koyeb'de Veritabanı Oluşturma:**
   - Koyeb panelinde yeni bir **Database Service** oluşturun ve bağlantı bilgilerinizi not alın.

2. **Uygulamayı Deploy Etme:**
   - Koyeb'de yeni bir **Web Service** oluşturun ve GitHub reponuzu bağlayın.
   - **Deployment Method** olarak **Dockerfile**'ı seçin. Koyeb, projenizdeki `Dockerfile`'ı otomatik olarak algılayacaktır.
   - **Environment Variables** (Ortam Değişkenleri) bölümüne, `.env` dosyanızdaki bilgileri (veritabanı bağlantısı vb.) ekleyin.
   - "Deploy" butonuna tıklayın.

Koyeb, `Dockerfile`'ınızdaki adımları takip ederek projenizi build edecek ve konteyneri başlatacaktır. Bu yöntem, size build ve runtime ortamı üzerinde tam kontrol sağlar ve platformdan kaynaklı hataları ortadan kaldırır.

---

Bu README dosyası, projenin son, Dockerize edilmiş yapısını açıklamaktadır. Geliştirme sürecinde emeği geçen herkese teşekkürler!
