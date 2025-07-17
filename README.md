# Fullstack Zikir Uygulaması (Birleşik Yapı)

Bu proje, React (Frontend) ve Node.js/Express (Backend) kullanılarak geliştirilmiş, modern ve güvenli bir zikir uygulamasıdır. Proje, **tek bir `package.json`** ile yönetilen standart bir yapıya sahiptir. Bu, Koyeb, Heroku, Render gibi modern platformlara dağıtımı son derece kolaylaştırır.

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
- **Deployment:** Koyeb, Heroku, Render vb.

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v18.x veya üstü)
- npm
- PostgreSQL veritabanı

### Kurulum ve Build
1. Projeyi klonlayın: `git clone <repo_url>`
2. Ana dizine gidin: `cd <proje_dizini>`
3. Tüm bağımlılıkları kurun:
   ```bash
   npm install
   ```
4. Projeyi build edin (Bu, `client` klasöründeki React uygulamasını derleyip ana dizinde bir `build` klasörü oluşturur):
   ```bash
   npm run build
   ```

### Yapılandırma
1. Projenin ana dizininde bir `.env` dosyası oluşturun.
2. İçine PostgreSQL veritabanı bilgilerinizi ekleyin:
   ```
   DATABASE_HOST=<your_host>
   DATABASE_NAME=<your_db_name>
   DATABASE_USER=<your_user>
   DATABASE_PASSWORD=<your_password>
   PORT=3001
   ```

### Çalıştırma
- Sunucuyu başlatın:
  ```bash
  npm start
  ```
  Bu komut, `index.js` dosyasını çalıştırır. Express sunucusu, `build` klasöründeki statik React dosyalarını sunar.

## 部署 Koyeb'e Deploy Etme

Bu birleşik yapı, Koyeb'e dağıtım için idealdir.

1. **Koyeb'de Veritabanı Oluşturma:**
   - Koyeb panelinde yeni bir **Database Service** oluşturun ve bağlantı bilgilerinizi not alın.

2. **Uygulamayı Deploy Etme:**
   - Koyeb'de yeni bir **Web Service** oluşturun ve GitHub reponuzu bağlayın.
   - Koyeb, `package.json` dosyasını algılayacak ve build ayarlarını doğru şekilde yapılandıracaktır.
     - **Build Command:** `npm run build`
     - **Run Command:** `npm start`
   - **Environment Variables** (Ortam Değişkenleri) bölümüne, `.env` dosyanızdaki bilgileri ekleyin.
   - "Deploy" butonuna tıklayın.

Koyeb, standart süreci takip edecektir: `npm install` ile tüm bağımlılıkları kuracak, `npm run build` ile React uygulamasını derleyecek ve son olarak `npm start` ile sunucuyu başlatacaktır. Bu yapı, "Cannot find module" gibi hataları tamamen ortadan kaldırır.

---

Bu README dosyası, projenin son, birleşik yapısını açıklamaktadır. Geliştirme sürecinde emeği geçen herkese teşekkürler!
