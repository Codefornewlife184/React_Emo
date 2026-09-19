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
    'smtp_port' => (int)(getenv('SMTP_PORT') ?: 587),
    'smtp_user' => getenv('SMTP_USER') ?: 'info@emoschildersbedrijf.nl',
    'smtp_pass' => getenv('SMTP_PASS') ?: '*+ig_VXm&qyAO^9S',
    'smtp_secure' => getenv('SMTP_SECURE') ?: PHPMailer::ENCRYPTION_STARTTLS,
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

// Form tiplerine göre zorunlu alanlar
if ($formType === 'appointment') {
    $required = ['name', 'email', 'mobile', 'service', 'date', 'time'];
} elseif ($formType === 'job_application') {
    $required = ['name', 'email', 'mobile', 'specialty', 'experience'];
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

$name             = trim($data['name']);
$email            = trim($data['email']);
$mobile           = trim($data['mobile'] ?? '');
$service          = trim($data['service'] ?? '');
$date             = trim($data['date'] ?? '');
$time             = trim($data['time'] ?? '');
$subject          = trim($data['subject'] ?? '');
$message          = trim($data['message'] ?? '');
$specialty        = trim($data['specialty'] ?? '');
$experience       = trim($data['experience'] ?? '');
$hasDriverLicense = trim($data['hasDriverLicense'] ?? 'yes');

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
            'Sunucu yapılandırması eksik: PHPMailer kütüphanesi kurulmamış.',
            'Server configuratie ontbreekt: PHPMailer bibliotheek is niet geïnstalleerd.',
            'Server setup incomplete: PHPMailer library is not installed.'
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
            '1' => txt('İç Mekan Boyama', 'Interieur schilderwerk', 'Interior Painting'),
            '2' => txt('Dış Cephe Boyama', 'Buitenschilderwerk / Gevel', 'Exterior / Facade Painting'),
            '3' => txt('Bakım Boyama / MJOP', 'Onderhoud schilderwerk / MJOP', 'Maintenance Painting / MJOP'),
            '4' => txt('Ahşap Tamiri ve Boyama', 'Houtrot reparatie & schilderwerk', 'Wood Rot Repair & Painting'),
            '5' => txt('Lateks (Plastik) Boyama', 'Latex / Muurverf', 'Latex / Wall Paint'),
            '6' => txt('Duvar Kağıdı & Renovlies', 'Behang & Renovlies', 'Wallpaper & Renovlies'),
        ];
        $serviceLabel = $services[$service] ?? $service;

        $mailSubject = sprintf('[%s] %s - %s', txt('Randevu', 'Afspraak', 'Appointment'), $name, $serviceLabel);

        $bodyHtml = '
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2 style="color:#0b2960;">' . txt('Yeni Randevu Talebi', 'Nieuwe afsprakaanvraag', 'New Appointment Request') . '</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">' . txt('Ad Soyad', 'Naam', 'Full Name') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($name) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">E-mail:</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($email) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Telefon', 'Telefoon', 'Phone') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($mobile) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Hizmet', 'Dienst', 'Service') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($serviceLabel) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Tarih', 'Datum', 'Date') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($date) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Saat', 'Tijd', 'Time') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($time) . '</td></tr>';
        if (!empty($message)) {
            $bodyHtml .= '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">' . txt('Not', 'Notitie', 'Note') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . nl2br(htmlspecialchars($message)) . '</td></tr>';
        }
        $bodyHtml .= '</table></div>';

    } elseif ($formType === 'job_application') {
        $specialties = [
            '1' => txt('İç Mekan Boyama', 'Interieur schilderwerk', 'Interior Painting'),
            '2' => txt('Dış Cephe Boyama', 'Buitenschilderwerk / Gevel', 'Exterior / Facade Painting'),
            '3' => txt('Bakım Boyama / MJOP', 'Onderhoud schilderwerk / MJOP', 'Maintenance Painting / MJOP'),
            '4' => txt('Ahşap Tamiri ve Boyama', 'Houtrot reparatie & schilderwerk', 'Wood Rot Repair & Painting'),
            '5' => txt('Lateks (Plastik) Boyama', 'Latex / Muurverf', 'Latex / Wall Paint'),
            '6' => txt('Duvar Kağıdı & Renovlies', 'Behang & Renovlies', 'Wallpaper & Renovlies'),
            'schilder' => txt('İç & Dış Boya Ustası', 'Binnen & Buitenschilder', 'Interior & Exterior Painter'),
            'behangen' => txt('Duvar Kağıdı Ustası', 'Behangspecialist', 'Wallpaper Specialist'),
            'houtrot'  => txt('Ahşap Tamiri & Bakım', 'Houtrot reparatie & onderhoud', 'Wood Rot Repair & Maintenance'),
            'stucwerk' => txt('Sıva & Alçı Ustası', 'Stukadoor', 'Plasterer'),
            'andere'   => txt('Diğer / Genel İşçi', 'Overige / Algemeen medewerker', 'Other / General Worker'),
        ];

        $experiences = [
            '0-2'  => txt('0 - 2 Yıl', '0 - 2 Jaar', '0 - 2 Years'),
            '3-5'  => txt('3 - 5 Yıl', '3 - 5 Jaar', '3 - 5 Years'),
            '5-10' => txt('5 - 10 Yıl', '5 - 10 Jaar', '5 - 10 Years'),
            '10+'  => txt('10 Yıldan Fazla', 'Meer dan 10 jaar', 'More than 10 years'),
        ];

        $specialtyLabel  = $specialties[$specialty] ?? $specialty;
        $experienceLabel = $experiences[$experience] ?? $experience;
        $licenseLabel    = ($hasDriverLicense === 'yes') 
            ? txt('Evet (B Sınıfı veya Üstü)', 'Ja (Rijbewijs B)', 'Yes (Driver License B)')
            : txt('Hayır', 'Nee', 'No');

        $mailSubject = sprintf('[%s] %s - %s', txt('İş Başvurusu', 'Sollicitatie', 'Job Application'), $name, $specialtyLabel);

        $bodyHtml = '
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2 style="color:#0b2960;">' . txt('Yeni İş Başvurusu', 'Nieuwe Sollicitatie', 'New Job Application') . '</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">' . txt('Ad Soyad', 'Naam', 'Full Name') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($name) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">E-mail:</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($email) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Telefon', 'Telefoon', 'Phone') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($mobile) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Uzmanlık Alanı', 'Vakgebied', 'Specialty') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($specialtyLabel) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Tecrübe', 'Ervaring', 'Experience') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($experienceLabel) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Sürücü Belgesi', 'Rijbewijs', 'Driver License') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($licenseLabel) . '</td></tr>';
        if (!empty($message)) {
            $bodyHtml .= '<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">' . txt('Açıklama / Mesaj', 'Bericht', 'Message') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . nl2br(htmlspecialchars($message)) . '</td></tr>';
        }
        $bodyHtml .= '</table></div>';

    } else {
        $mailSubject = sprintf('[%s] %s - %s', txt('İletişim', 'Contact', 'Contact'), $name, $subject);

        $bodyHtml = '
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">
          <h2 style="color:#0b2960;">' . txt('Yeni İletişim Mesajı', 'Nieuw contactbericht', 'New Contact Message') . '</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;width:35%;">' . txt('Ad Soyad', 'Naam', 'Full Name') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($name) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">E-mail:</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($email) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;">' . txt('Konu', 'Onderwerp', 'Subject') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . htmlspecialchars($subject) . '</td></tr>
            <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:bold;vertical-align:top;">' . txt('Mesaj', 'Bericht', 'Message') . ':</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">' . nl2br(htmlspecialchars($message)) . '</td></tr>
          </table>
        </div>';
    }

    $mail->isHTML(true);
    $mail->Subject = $mailSubject;
    $mail->Body    = $bodyHtml;
    $mail->AltBody = strip_tags(preg_replace('/<br\s*\/?>/i', "\n", $bodyHtml));

    $mail->send();

    echo json_encode([
        'success' => true,
        'message' => txt(
            'Teşekkürler! Talebiniz başarıyla alındı.',
            'Bedankt! Uw aanvraag is succesvol ontvangen.',
            'Thank you! Your request has been successfully received.'
        ),
    ]);
    http_response_code(200);
} catch (\Throwable $e) {
    $errorMsg = isset($mail) ? trim((string)$mail->ErrorInfo) : '';
    if ($errorMsg === '') $errorMsg = trim((string)$e->getMessage());

    echo json_encode([
        'success' => false,
        'message' => txt('Mesaj gönderilemedi. Hata: ' . mb_substr($errorMsg, 0, 60), 'Bericht kon niet verzonden worden.', 'Message could not be sent.'),
        'error'   => $errorMsg,
    ], JSON_UNESCAPED_UNICODE);
    http_response_code(500);
}