<?php
error_reporting(0);
ini_set('display_errors', 0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailerException;
use PHPMailer\PHPMailer\SMTP;

$phpmailerDirs = [
    __DIR__ . '/PHPMailer-6.12.0/src',
    __DIR__ . '/PHPMailer/src',
];
$phpmailerLoaded = false;

if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';
    $phpmailerLoaded = true;
} else {
    foreach ($phpmailerDirs as $dir) {
        if (file_exists($dir . '/PHPMailer.php')) {
            require_once $dir . '/PHPMailer.php';
            require_once $dir . '/SMTP.php';
            require_once $dir . '/Exception.php';
            $phpmailerLoaded = true;
            break;
        }
    }
}

$config = [
    'smtp_host' => getenv('SMTP_HOST') ?: 'mail.emoschildersbedrijf.nl',
    'smtp_port' => (int)(getenv('SMTP_PORT') ?: 587), // 465 yerine 587 deneyin
    'smtp_user' => getenv('SMTP_USER') ?: 'info@emoschildersbedrijf.nl',
    'smtp_pass' => getenv('SMTP_PASS') ?: '*+ig_VXm&qyAO^9S',
    'smtp_secure' => getenv('SMTP_SECURE') ?: PHPMailer::ENCRYPTION_STARTTLS, // SMTPS yerine STARTTLS
    'from_email' => getenv('FROM_EMAIL') ?: 'info@emoschildersbedrijf.nl',
    'from_name'  => getenv('FROM_NAME') ?: 'Emo Schildersbedrijf Website',
    'to_email'   => getenv('TO_EMAIL') ?: 'info@emoschildersbedrijf.nl',
    'to_name'    => getenv('TO_NAME') ?: 'Emo Schildersbedrijf',
];

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    $data = $_POST;
}
$data = is_array($data) ? $data : [];

$formType = isset($data['type']) ? $data['type'] : 'contact';
$lang = isset($data['lang']) ? $data['lang'] : 'tr';

function txt($tr, $nl, $en) {
    global $lang;
    if ($lang === 'nl') return $nl;
    if ($lang === 'en') return $en;
    return $tr;
}

$debugInfo = [
    'phpVersion' => PHP_VERSION,
    'smtpHost'   => $config['smtp_host'],
    'smtpPort'   => $config['smtp_port'],
    'smtpUser'   => $config['smtp_user'],
    'smtpSecure' => $config['smtp_secure'] === PHPMailer::ENCRYPTION_STARTTLS ? 'STARTTLS(587)' : ($config['smtp_secure'] === PHPMailer::ENCRYPTION_SMTPS ? 'SMTPS(465)' : $config['smtp_secure']),
    'openssl'    => extension_loaded('openssl') ? true : false,
    'sockets'    => extension_loaded('sockets') ? true : false,
];

if ($formType === 'appointment') {
    $required = ['name', 'email', 'mobile', 'service', 'date', 'time'];
} else {
    $required = ['name', 'email', 'subject', 'message'];
}

$missing = [];
foreach ($required as $r) {
    if (empty(trim($data[$r] ?? ''))) {
        $missing[] = $r;
    }
}

if (!empty($missing)) {
    echo json_encode([
        'success' => false,
        'message' => txt(
            'Zorunlu alanlar eksik: ' . implode(', ', $missing),
            'Verplichte velden ontbreken: ' . implode(', ', $missing),
            'Required fields are missing: ' . implode(', ', $missing)
        ),
    ]);
    http_response_code(400);
    exit;
}

$name    = trim($data['name']);
$email   = trim($data['email']);
$mobile  = trim($data['mobile'] ?? '');
$service = trim($data['service'] ?? '');
$date    = trim($data['date'] ?? '');
$time    = trim($data['time'] ?? '');
$subject = trim($data['subject'] ?? '');
$message = trim($data['message'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => txt('Geçersiz e-posta adresi', 'Ongeldig e-mailadres', 'Invalid e-mail address'),
    ]);
    http_response_code(400);
    exit;
}

if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
    echo json_encode([
        'success' => false,
        'message' => txt(
            'Sunucu yapılandırması eksik: PHPMailer kütüphanesi kurulmamış. README.md dosyasını inceleyin.',
            'Server configuratie ontbreekt: PHPMailer bibliotheek is niet geinstalleerd. Bekijk README.md.',
            'Server setup incomplete: PHPMailer library is not installed. Check README.md.'
        ),
    ]);
    http_response_code(500);
    exit;
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_user'];
    $mail->Password   = $config['smtp_pass'];
    $mail->SMTPSecure = $config['smtp_secure'];
    $mail->Port       = $config['smtp_port'];
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;
    $mail->Timeout    = 25;
    $mail->SMTPAutoTLS = false;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => false,
            'verify_peer_name'  => false,
            'allow_self_signed' => true,
        ],
    ];

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email'], $config['to_name']);
    $mail->addReplyTo($email, $name);

    if ($formType === 'appointment') {
        $services = [
            '1' => txt('İç Mekan Boyama',              'Interieur schilderwerk',            'Interior Painting'),
            '2' => txt('Dış Cephe Boyama',             'Buitenschilderwerk / Gevel',         'Exterior / Facade Painting'),
            '3' => txt('Bakım Boyama / MJOP',          'Onderhoud schilderwerk / MJOP',      'Maintenance Painting / MJOP'),
            '4' => txt('Ahşap Tamiri ve Boyama',       'Houtrot reparatie & schilderwerk',   'Wood Rot Repair & Painting'),
            '5' => txt('Lateks (Plastik) Boyama',      'Latex / Muurverf',                   'Latex / Wall Paint'),
            '6' => txt('Duvar Kağıdı & Renovlies',     'Behang & Renovlies',                 'Wallpaper & Renovlies'),
        ];
        $serviceLabel = $services[$service] ?? $service;

        $mailSubject = sprintf(
            '[%s] %s - %s',
            txt('Randevu', 'Afspraak', 'Appointment'),
            $name,
            $serviceLabel
        );

        $labelName     = txt('Ad Soyad',       'Naam',        'Full Name');
        $labelPhone    = txt('Telefon',        'Telefoon',    'Phone');
        $labelService  = txt('Hizmet',         'Dienst',      'Service');
        $labelDate     = txt('Tarih',          'Datum',       'Date');
        $labelTime     = txt('Saat',           'Tijd',        'Time');
        $labelNote     = txt('Not',            'Notitie',     'Note');
        $heading       = txt('Yeni Randevu Talebi', 'Nieuwe afsprakaanvraag', 'New Appointment Request');

        $bodyHtml = '
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2 style="color:#0b2960;">' . $heading . '</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">' . $labelName . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($name) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">E-mail:</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($email) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . $labelPhone . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($mobile) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . $labelService . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($serviceLabel) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . $labelDate . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($date) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . $labelTime . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($time) . '</td></tr>';
        if (!empty($message)) {
            $bodyHtml .= '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">' . $labelNote . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . nl2br(htmlspecialchars($message)) . '</td></tr>';
        }
        $bodyHtml .= '
          </table>
          <p style="margin-top:20px;color:#777;font-size:12px;">' . txt(
            'Bu e-posta Emo Schildersbedrijf iletişim formu aracılığıyla gönderilmiştir.',
            'Deze e-mail is verzonden via het Emo Schildersbedrijf contactformulier.',
            'This e-mail was sent via the Emo Schildersbedrijf contact form.'
          ) . '</p>
        </div>';
    } else {
        $labelName     = txt('Ad Soyad',   'Naam',        'Full Name');
        $labelSubject  = txt('Konu',       'Onderwerp',   'Subject');
        $labelMessage  = txt('Mesaj',      'Bericht',     'Message');
        $heading       = txt('Yeni İletişim Mesajı', 'Nieuw contactbericht', 'New Contact Message');

        $mailSubject = sprintf(
            '[%s] %s - %s',
            txt('İletişim', 'Contact', 'Contact'),
            $name,
            $subject
        );

        $bodyHtml = '
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2 style="color:#0b2960;">' . $heading . '</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">' . $labelName . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($name) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">E-mail:</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($email) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . $labelSubject . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($subject) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">' . $labelMessage . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . nl2br(htmlspecialchars($message)) . '</td></tr>
          </table>
          <p style="margin-top:20px;color:#777;font-size:12px;">' . txt(
            'Bu e-posta Emo Schildersbedrijf iletişim formu aracılığıyla gönderilmiştir.',
            'Deze e-mail is verzonden via het Emo Schildersbedrijf contactformulier.',
            'This e-mail was sent via the Emo Schildersbedrijf contact form.'
          ) . '</p>
        </div>';
    }

    $mail->isHTML(true);
    $mail->Subject = $mailSubject;
    $mail->Body    = $bodyHtml;
    $mail->AltBody = strip_tags(preg_replace('/<br\s*\/?>/i', "\n", $bodyHtml));

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => $formType === 'appointment'
            ? txt(
                'Teşekkürler! Randevu talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.',
                'Bedankt! Uw afspraakaanvraag is ontvangen. Wij nemen zo snel mogelijk contact met u op.',
                'Thank you! Your appointment request has been received. We will contact you as soon as possible.'
            )
            : txt(
                'Teşekkürler! Mesajınız gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
                'Bedankt! Uw bericht is verzonden. Wij nemen zo snel mogelijk contact met u op.',
                'Thank you! Your message has been sent. We will contact you as soon as possible.'
            ),
    ]);
    http_response_code(200);
} catch (\Throwable $e) {
    $errorMsg  = isset($mail) ? trim((string)$mail->ErrorInfo) : '';
    if ($errorMsg === '') $errorMsg = trim((string)$e->getMessage());
    $lowerErr  = mb_strtolower($errorMsg, 'UTF-8');
    $hints     = [];
    if (stripos($lowerErr, 'could not connect') !== false || stripos($lowerErr, 'connection') !== false || stripos($lowerErr, 'smtp connect()') !== false) {
        $hints[] = 'SMTP bağlantı hatası: Firewall/port 465, DNS veya hosting tarafında giden SMTP izinlerini kontrol edin.';
    }
    if (stripos($lowerErr, 'authentication') !== false || stripos($lowerErr, 'password') !== false || stripos($lowerErr, 'username') !== false) {
        $hints[] = 'E-posta şifresi hatalı olabilir. Hosting panelindeki info@emoschildersbedrijf.nl şifresi ile $config[\'smtp_pass\'] alanını eşleştirin.';
    }
    if (stripos($lowerErr, 'ssl') !== false || stripos($lowerErr, 'tls') !== false || stripos($lowerErr, 'certificate') !== false) {
        $hints[] = 'SSL/TLS sertifika doğrulama sorunu. Alternatif: Port 587 + STARTTLS deneyin.';
    }
    if (empty($hints)) $hints[] = 'Detay için debug alanını inceleyin; hosting hatası veya form doğrulaması olabilir.';

    $response = [
        'success' => false,
        'message' => txt(
            'Mesaj gönderilemedi. SMTP sunucu ayarlarınızı kontrol edin. Hata: ' . mb_substr($errorMsg, 0, 60),
            'Bericht kon niet verzonden worden. Controleer uw SMTP-serverinstellingen. Fout: ' . mb_substr($errorMsg, 0, 60),
            'Message could not be sent. Check your SMTP server settings. Error: ' . mb_substr($errorMsg, 0, 60)
        ),
        'hints'    => $hints,
        'error'    => $errorMsg,
        'debug'    => array_merge($debugInfo, [
            'fileLine' => $e->getFile() . '::' . $e->getLine(),
            'exception' => get_class($e),
        ]),
    ];
    echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    http_response_code(500);
}
