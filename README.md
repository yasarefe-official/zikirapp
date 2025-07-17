# Fullstack Zikir Uygulaması

Bu proje, React (Frontend) ve Node.js/Express (Backend) kullanılarak geliştirilmiş, modern, hızlı ve güvenli bir zikir uygulamasıdır. Render üzerinde tek bir pipeline ile tam otomatik olarak deploy edilmek üzere tasarlanmıştır.

## ✨ Özellikler

- **Kullanıcı Girişi:** Benzersiz kullanıcı adıyla giriş ve kayıt.
- **Zikir Sayacı:** Animasyonlu ve sesli, offline modda tam destekli sayaç.
- **Offline-Online Senkronizasyon:** İnternet yokken yapılan zikirler, bağlantı kurulduğunda otomatik olarak sunucuyla senkronize edilir.
- **Global Leaderboard:** Kullanıcıların en yüksek skorlarını gösteren canlı liderlik tablosu.
- **Paylaşılabilir İstatistik Linkleri:** Kullanıcılar, istatistiklerini tamamen client-side oluşturulan güvenli bir link ile paylaşabilir.
- **Kullanıcı Profili:** Toplam zikir, ortalamalar ve başarımlar gibi detaylı istatistikler.
- **Güvenlik:** API'lerde temel rate limiting, input validation ve CORS önlemleri.
- **Performans:** Hızlı yükleme süreleri ve fallback UI'lar ile optimize edilmiş frontend.

## 🚀 Teknoloji Yığını

- **Frontend:** React, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express, Mongoose
- **Veritabanı:** MongoDB
- **Deployment:** Render

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler
- Node.js (v18.x veya üstü)
- npm
- MongoDB veritabanı (lokal veya bulut üzerinde, örn: MongoDB Atlas)

### Kurulum
1. Projeyi klonlayın: `git clone <repo_url>`
2. Ana dizine gidin: `cd <proje_dizini>`
3. Gerekli bağımlılıkları yükleyin. Bu komut hem client hem de server için tüm `node_modules` klasörlerini kuracaktır:
   ```bash
   npm install
   ```
   *Not: Bu komut, ana `package.json` dosyasındaki `postinstall` script'i sayesinde hem `client` hem de `server` için `npm install` çalıştırır. Eğer `postinstall` script'i yoksa, aşağıdaki komutları ayrı ayrı çalıştırın:*
   ```bash
   npm install --prefix client
   npm install --prefix server
   ```

### Yapılandırma
1. `server` dizininde bir `.env` dosyası oluşturun.
2. İçine veritabanı bağlantı cümlenizi ekleyin:
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   PORT=3001
   ```

### Çalıştırma
- **Geliştirme Modu (Frontend ve Backend Ayrı Ayrı):**
  - Frontend'i başlatmak için (client dizininde): `npm start`
  - Backend'i başlatmak için (server dizininde): `npm start`
- **Production Modu (Tek Sunucu):**
  1. Frontend'i build edin: `npm run build --prefix client`
  2. Ana sunucuyu başlatın (ana dizinde): `npm start`

## 部署 Render'a Deploy Etme

Bu proje, Render'ın "monorepo" desteği ile kolayca deploy edilebilir.

1. Render'da yeni bir **Web Service** oluşturun.
2. GitHub reponuzu bağlayın.
3. Ayarları aşağıdaki gibi yapın:
   - **Root Directory:** `.` (ana dizin)
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** `18` veya üstü
4. **Environment Variables** (Ortam Değişkenleri) kısmına, `.env` dosyanızdaki `MONGO_URI` ve diğer hassas bilgileri ekleyin.
5. "Create Web Service" butonuna tıklayın.

Render, `build` komutunu çalıştırarak önce client bağımlılıklarını kuracak, React uygulamasını build edecek, sonra server bağımlılıklarını kuracak. Ardından `start` komutu ile Express sunucusunu başlatacaktır. Express sunucusu, build edilmiş React dosyalarını statik olarak sunacaktır.

---

Bu README dosyası, projenin temelini ve kullanımını açıklamaktadır. Geliştirme sürecinde emeği geçen herkese teşekkürler!
