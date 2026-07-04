# AniMest

AniMest artık gerçek backend, SQLite veritabanı ve HTTP-only session cookie ile çalışır.

## Çalıştırma

```powershell
node server.js
```

Site:

```text
http://127.0.0.1:5174/
```

Varsayılan veritabanı konumu Windows'ta:

```text
%LOCALAPPDATA%\AniMest\animemest.db
```

Özel veritabanı dosyası kullanmak için:

```powershell
$env:ANIMEST_DB="C:\path\to\animemest.db"
node server.js
```

## Google Giriş

Google ile giriş sahte bir demo akışı değildir. Çalışması için Google Cloud Console'da OAuth Client oluşturup şu değişkenleri ayarla:

```powershell
$env:GOOGLE_CLIENT_ID="..."
$env:GOOGLE_CLIENT_SECRET="..."
$env:GOOGLE_REDIRECT_URI="http://127.0.0.1:5174/api/auth/google/callback"
node server.js
```

Credential yoksa Google butonu oturum açmaz; yapılandırma gerektiğini bildirir.
