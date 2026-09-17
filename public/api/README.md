# Emo Schildersbedrijf - PHPMailer Kurulumu

PHPMailer kütüphanesini kurmak için **BU DIZINDE** (`/public/api/`) adımları izleyin:

## Seçenek 1: Composer ile (önerilen)

```bash
cd public/api
composer require phpmailer/phpmailer:^6.9
```

Bu durumda `send-mail.php` içindeki 3 satır `require_once` yolunu şu şekilde değiştirin:
```php
require_once __DIR__ . '/vendor/autoload.php';
```

## Seçenek 2: Manuel (Composer olmadan)

1.  https://github.com/PHPMailer/PHPMailer/releases adresinden **PHPMailer 6.x** zip dosyasını indirin.
2.  Zip içindeki `src/` klasörünü bu dizine çıkarın ve adını `PHPMailer` olarak değiştirin.
3.  Sonuç hiyerarşisi şöyle olmalı:
    ```
    public/api/
    ├── send-mail.php
    └── PHPMailer/
        └── src/
            ├── PHPMailer.php
            ├── SMTP.php
            └── Exception.php
    ```

## SMTP Ayarları

Aşağıdaki ortam değişkenlerini web sunucunuzda tanımlayın (`.htaccess`, Nginx config, vb.) ya da `send-mail.php` içindeki `$config` dizisinin varsayılan değerlerini kendi SMTP bilgilerinizle doldurun:

| Değişken      | Örnek Değer                       | Açıklama                                  |
|---------------|-----------------------------------|-------------------------------------------|
| `SMTP_HOST`   | `smtp.ziggo.nl`                   | SMTP sunucu adresi                         |
| `SMTP_PORT`   | `587`                             | 587 (STARTTLS), 465 (SSL), 25             |
| `SMTP_USER`   | `info@jouwdomein.nl`              | SMTP kullanıcı adı                         |
| `SMTP_PASS`   | `****`                            | SMTP şifresi / app password                |
| `SMTP_SECURE` | `tls`                             | `tls` (587) veya `ssl` (465)              |
| `FROM_EMAIL`  | `no-reply@jouwdomein.nl`          | Giden gönderen adresi                      |
| `FROM_NAME`   | `Emo Schildersbedrijf`            | Giden gönderen adı                         |
| `TO_EMAIL`    | `info@emoschildersbedrijf.nl`     | Formun GONDERİLECEĞİ adres                 |
| `TO_NAME`     | `Emo Schildersbedrijf`            | Alıcı adı                                  |

## Test

Kurulumdan sonra tarayıcıda React'i açın ve formları doldurun. Console Network sekmesinde `/api/send-mail.php` çağrısına bakın. Başarılı olduğunda JSON `{ success: true }` dönecektir.
