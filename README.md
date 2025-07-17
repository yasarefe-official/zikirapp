# Fullstack Zikir Uygulaması (PostgreSQL & Koyeb Edition)

Bu proje, React (Frontend) ve Node.js/Express (Backend) kullanılarak geliştirilmiş, modern, hızlı ve güvenli bir zikir uygulamasıdır. Koyeb üzerinde, PostgreSQL veritabanı ile tam otomatik olarak deploy edilmek üzere tasarlanmıştır.

## ✨ Özellikler

- **Kullanıcı Girişi:** Benzersiz kullanıcı adıyla giriş ve kayıt.
- **Zikir Sayacı:** Animasyonlu, offline modda tam destekli sayaç.
- **Offline-Online Senkronizasyon:** İnternet yokken yapılan zikirler, bağlantı kurulduğunda otomatik olarak sunucuyla senkronize edilir.
- **Global Leaderboard:** Kullanıcıların en yüksek skorlarını gösteren canlı liderlik tablosu.
- **Paylaşılabilir İstatistik Linkleri:** Kullanıcılar, istatistiklerini tamamen client-side oluşturulan güvenli bir link ile paylaşabilir.
- **Kullanıcı Profili:** Toplam zikir ve diğer istatistikler.
- **Güvenlik:** API'lerde temel input validation ve CORS önlemleri.
- **Otomatik Veritabanı Migration:** Uygulama ilk çalıştığında gerekli veritabanı tablosunu kendi oluşturur.

## 🚀 Teknoloji Yığını

- **Frontend:** React, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express, **Postgres.js**
- **Veritabanı:** **PostgreSQL**
- **Deployment:** **Koyeb**

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v18.x veya üstü)
- npm
- PostgreSQL veritabanı

### Kurulum ve Build
1. Projeyi klonlayın: `git clone <repo_url>`
2. Ana dizine gidin: `cd <proje_dizini>`
3. Tüm bağımlılıkları kurun ve projeyi build edin:
   ```bash
   npm run build
   ```
   Bu komut, ana `package.json` dosyasındaki `build` script'ini çalıştırır. Bu script sırasıyla:
   1. `server` bağımlılıklarını kurar (`npm install --prefix server`)
   2. `client` bağımlılıklarını kurar (`npm install --prefix client`)
   3. `client` uygulamasını build eder (`npm run build --prefix client`)

### Yapılandırma
1. `server` dizininde bir `.env` dosyası oluşturun.
2. İçine PostgreSQL veritabanı bilgilerinizi ekleyin:
   ```
   DATABASE_HOST=<your_host>
   DATABASE_NAME=<your_db_name>
   DATABASE_USER=<your_user>
   DATABASE_PASSWORD=<your_password>
   PORT=3001
   ```

### Çalıştırma
- **Sunucuyu Başlatma:**
  ```bash
  npm start
  ```
  Bu komut, `server/index.js` dosyasını çalıştırır ve Express sunucusu build edilmiş React dosyalarını sunar.

## 部署 Koyeb'e Deploy Etme

Bu proje, birleşik `build` script'i sayesinde Koyeb'in standart build sürecine tam uyumludur.

1. **Koyeb'de Veritabanı Oluşturma:**
   - Koyeb panelinde yeni bir **Database Service** oluşturun.
   - Veritabanı bilgilerinizi (host, db name, user, password) bir yere not alın.

2. **Uygulamayı Deploy Etme:**
   - Koyeb'de yeni bir **Web Service** oluşturun ve GitHub reponuzu bağlayın.
   - Koyeb, `package.json` dosyasını algılayacak ve build ayarlarını genellikle otomatik olarak doğru şekilde yapılandıracaktır. Kontrol etmeniz gereken ayarlar:
     - **Build Command:** `npm run build`
     - **Run Command:** `npm start`
   - **Environment Variables** (Ortam Değişkenleri) bölümüne, daha önce not aldığınız veritabanı bilgilerini ekleyin:
     - `DATABASE_HOST`
     - `DATABASE_NAME`
     - `DATABASE_USER`
     - `DATABASE_PASSWORD`
     - `PORT` (genellikle `8080` veya Koyeb'in sağladığı değişken kullanılır)
   - "Deploy" butonuna tıklayın.

Koyeb, `build` komutunu çalıştırarak projenizi adım adım kuracak ve "Cannot find module" hatası olmadan sunucuyu başlatacaktır.

---

Bu README dosyası, projenin PostgreSQL'e uyarlanmış son halini açıklamaktadır. Geliştirme sürecinde emeği geçen herkese teşekkürler!
