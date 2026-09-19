import { useState } from "react";
import { FaMapPin, FaPhone, FaEnvelope } from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const API_ENDPOINT =
  (typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  "/api/send-mail.php";

export default function CareerSection() {
  const { language, t } = useLanguage();
  const labels = t("career.labels") || {};
  const options = t("career.options") || [];
  const driverLicenseOptions = t("career.driverLicenseOptions") || [];
  const contactInfo = t("contact.info");
  const addr =
    contactInfo?.addressValue ||
    "Buitenwatersloot 109, 2613 TT Delft, Nederland";
  const addrLabel = contactInfo?.address || "Adresimiz";

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    specialty: "",
    experience: "",
    hasDriverLicense: "yes",
    message: "",
  });
  const [status, setStatus] = useState({ type: "idle", msg: "", hints: [] });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      type: "loading",
      msg: t("common.loading") || "Gönderiliyor...",
    });
    try {
      // onSubmit içindeki fetch isteği bölümü:

      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: `İş Başvurusu: ${form.name} (${form.specialty})`, // <-- Bu alanı ekleyin
          type: "job_application",
          lang: language,
        }),
      });
      const rawText = await res.text();
      let data = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        data = {};
      }
      if (res.ok && data.success) {
        setStatus({
          type: "success",
          msg:
            data.message ||
            t("career.success") ||
            "Başvurunuz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.",
          hints: [],
        });
        setForm({
          name: "",
          email: "",
          mobile: "",
          specialty: "",
          experience: "",
          hasDriverLicense: "yes",
          message: "",
        });
      } else {
        const extraHints = [];
        if (!data || Object.keys(data).length === 0) {
          const clean = rawText
            .replace(/<[^>]*>/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          if (clean.length > 0) {
            extraHints.push("Sunucu yanıtı: " + clean.slice(0, 300));
          }
          if (!res.ok)
            extraHints.push(
              "HTTP Durum Kodu: " + res.status + " " + (res.statusText || ""),
            );
        }
        setStatus({
          type: "error",
          msg: data.message || t("common.error") || "Bir hata oluştu.",
          hints: [
            ...(Array.isArray(data.hints) && data.hints.length
              ? data.hints
              : []),
            ...extraHints,
          ],
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        msg: t("common.error") || "Bir hata oluştu.",
        hints: [
          "Ağ hatası: Sunucuya ulaşılamadı. İnternet bağlantınızı veya API yolunu (/api/send-mail.php) kontrol edin.",
          err && err.message ? "Detay: " + err.message : "",
        ].filter(Boolean),
      });
    }
  };

  const inputStyle = (focused) => ({
    width: "100%",
    padding: "0.95rem 1.25rem",
    borderRadius: "16px",
    border: "2px solid transparent",
    backgroundColor: focused ? "#ffffff" : "#f6f8fc",
    color: "#0b2960",
    fontSize: "1rem",
    fontWeight: 500,
    outline: "none",
    transition: "all .25s ease",
    boxShadow: focused ? "0 6px 18px rgba(37,172,191,0.15)" : "none",
    borderColor: focused ? "#25acbf" : "transparent",
    boxSizing: "border-box",
    lineHeight: 1.4,
    minHeight: "55px",
    appearance: "none",
    WebkitAppearance: "none",
  });

  const labelStyle = {
    display: "block",
    fontWeight: 600,
    color: "#0b2960",
    marginBottom: "0.55rem",
    fontSize: "0.95rem",
    letterSpacing: "0.1px",
  };

  const infoCardStyle = (hover) => ({
    backgroundColor: hover ? "#ffffff" : "#f6f8fc",
    borderRadius: "18px",
    border: "none",
    padding: "1.25rem",
    width: "100%",
    boxShadow: hover
      ? "0 12px 28px rgba(11,41,96,0.10)"
      : "0 4px 12px rgba(11,41,96,0.04)",
    transition: "all .3s ease",
    transform: hover ? "translateY(-3px)" : "translateY(0)",
    boxSizing: "border-box",
  });

  const [focused, setFocused] = useState({});
  const [infoHover, setInfoHover] = useState({});
  const toggleFocus = (k, v) => setFocused((p) => ({ ...p, [k]: v }));
  const toggleInfoHover = (k, v) => setInfoHover((p) => ({ ...p, [k]: v }));

  return (
    <div className="container-xxl py-5">
      <div className="container mt-2">
        <div className="row g-5">
          {/* Sol Taraf - Bilgiler & Açıklama */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <h4 className="section-title">
              {t("career.sectionTitle") || "Kariyer & Ekip"}
            </h4>
            <h1 className="display-5 mb-4">
              {t("career.heading") || "Bizimle Çalışmak İster Misiniz?"}
            </h1>
            <p
              className="mb-4"
              style={{ color: "#5a6a84", fontSize: "1.05rem", lineHeight: 1.7 }}
            >
              {t("career.description") ||
                "Ekibimizi büyütüyoruz! İşini titizlikle ve güvenle yapan, tecrübeli ve dinamik çalışma arkadaşları arıyoruz. Kaliteli işçilik anlayışımıza uyum sağlayacak profesyoneller arasındaysanız formu doldurarak başvurunuzu iletebilirsiniz."}
            </p>

            <div className="row g-4 mt-2">
              {/* ADRES KUTUSU */}
              <div className="col-12">
                <div
                  onMouseEnter={() => toggleInfoHover("addr", true)}
                  onMouseLeave={() => toggleInfoHover("addr", false)}
                  style={infoCardStyle(infoHover.addr)}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center"
                      style={{
                        width: "62px",
                        height: "62px",
                        backgroundColor: "#25acbf",
                        borderRadius: "16px",
                        boxShadow: "0 6px 14px rgba(37,172,191,0.30)",
                      }}
                    >
                      <FaMapPin size={24} style={{ color: "#ffffff" }} />
                    </div>
                    <div className="ms-4">
                      <p
                        className="mb-1"
                        style={{ color: "#6b7a92", fontWeight: 500 }}
                      >
                        {addrLabel}
                      </p>
                      <h3
                        className="mb-0"
                        style={{
                          color: "#0b2960",
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          lineHeight: 1.4,
                        }}
                      >
                        {addr}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* TELEFON KUTUSU */}
              <div className="col-12">
                <div
                  onMouseEnter={() => toggleInfoHover("phone", true)}
                  onMouseLeave={() => toggleInfoHover("phone", false)}
                  style={infoCardStyle(infoHover.phone)}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center"
                      style={{
                        width: "62px",
                        height: "62px",
                        backgroundColor: "#25acbf",
                        borderRadius: "16px",
                        boxShadow: "0 6px 14px rgba(37,172,191,0.30)",
                      }}
                    >
                      <FaPhone size={24} style={{ color: "#ffffff" }} />
                    </div>
                    <div className="ms-4">
                      <p
                        className="mb-1"
                        style={{ color: "#6b7a92", fontWeight: 500 }}
                      >
                        {t("career.callNow") || "Bize Ulaşın"}
                      </p>
                      <h3
                        className="mb-0"
                        style={{
                          color: "#0b2960",
                          fontSize: "1.25rem",
                          fontWeight: 700,
                        }}
                      >
                        +31 6 8727 2979
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* E-POSTA KUTUSU */}
              <div className="col-12">
                <div
                  onMouseEnter={() => toggleInfoHover("mail", true)}
                  onMouseLeave={() => toggleInfoHover("mail", false)}
                  style={infoCardStyle(infoHover.mail)}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex flex-shrink-0 align-items-center justify-content-center"
                      style={{
                        width: "62px",
                        height: "62px",
                        backgroundColor: "#25acbf",
                        borderRadius: "16px",
                        boxShadow: "0 6px 14px rgba(37,172,191,0.30)",
                      }}
                    >
                      <FaEnvelope size={24} style={{ color: "#ffffff" }} />
                    </div>
                    <div className="ms-4">
                      <p
                        className="mb-1"
                        style={{ color: "#6b7a92", fontWeight: 500 }}
                      >
                        {t("career.mailUs") || "E-posta Gönderin"}
                      </p>
                      <h3
                        className="mb-0"
                        style={{
                          color: "#0b2960",
                          fontSize: "1.2rem",
                          fontWeight: 700,
                          wordBreak: "break-all",
                        }}
                      >
                        info@emoschildersbedrijf.nl
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - İş Başvuru Formu */}
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "24px",
                padding: "clamp(1.25rem, 3vw, 2.5rem)",
                boxShadow: "0 20px 50px rgba(11,41,96,0.10)",
                border: "1px solid rgba(37,172,191,0.12)",
                boxSizing: "border-box",
              }}
            >
              <form onSubmit={onSubmit}>
                <div className="row g-4">
                  {/* Ad Soyad */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-name" style={labelStyle}>
                      {labels.name || "Adınız Soyadınız"}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="job-name"
                      placeholder={labels.name || "Adınız Soyadınız"}
                      value={form.name}
                      onChange={onChange}
                      onFocus={() => toggleFocus("name", true)}
                      onBlur={() => toggleFocus("name", false)}
                      style={inputStyle(focused.name)}
                      required
                    />
                  </div>

                  {/* E-posta */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-email" style={labelStyle}>
                      {labels.email || "E-Posta Adresiniz"}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="job-email"
                      placeholder={labels.email || "E-Posta Adresiniz"}
                      value={form.email}
                      onChange={onChange}
                      onFocus={() => toggleFocus("email", true)}
                      onBlur={() => toggleFocus("email", false)}
                      style={inputStyle(focused.email)}
                      required
                    />
                  </div>

                  {/* Telefon */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-mobile" style={labelStyle}>
                      {labels.mobile || "Telefon Numaranız"}
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      id="job-mobile"
                      placeholder={labels.mobile || "Telefon Numaranız"}
                      value={form.mobile}
                      onChange={onChange}
                      onFocus={() => toggleFocus("mobile", true)}
                      onBlur={() => toggleFocus("mobile", false)}
                      pattern="^[0-9+() -]{7,20}$"
                      inputMode="tel"
                      autoComplete="tel"
                      style={inputStyle(focused.mobile)}
                      required
                    />
                  </div>

                  {/* Uzmanlık Alanı / Hizmet */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-specialty" style={labelStyle}>
                      {labels.specialty || "Uzmanlık Alanınız"}
                    </label>
                    <select
                      name="specialty"
                      id="job-specialty"
                      value={form.specialty}
                      onChange={onChange}
                      onFocus={() => toggleFocus("specialty", true)}
                      onBlur={() => toggleFocus("specialty", false)}
                      style={{
                        ...inputStyle(focused.specialty),
                        cursor: "pointer",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230b2960'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.1rem",
                        paddingRight: "3rem",
                      }}
                      required
                    >
                      <option value="">
                        {labels.selectSpecialty || "Alan Seçin"}
                      </option>
                      {Array.isArray(options) && options.length > 0 ? (
                        options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="schilder">
                            İç & Dış Boya Ustası
                          </option>
                          <option value="behangen">
                            Duvar Kağıdı Ustası
                          </option>
                          <option value="houtrot">
                            Ahşap Tamiri & Bakım
                          </option>
                          <option value="stucwerk">
                            Sıva & Alçı Ustası
                          </option>
                          <option value="andere">Diğer / Genel İşçi</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Deneyim Süresi */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-experience" style={labelStyle}>
                      {labels.experience || "Tecrübe Süreniz"}
                    </label>
                    <select
                      name="experience"
                      id="job-experience"
                      value={form.experience}
                      onChange={onChange}
                      onFocus={() => toggleFocus("experience", true)}
                      onBlur={() => toggleFocus("experience", false)}
                      style={{
                        ...inputStyle(focused.experience),
                        cursor: "pointer",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230b2960'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.1rem",
                        paddingRight: "3rem",
                      }}
                      required
                    >
                      <option value="">
                        {labels.selectExperience || "Tecrübe Seçin"}
                      </option>
                      <option value="0-2">0 - 2 Yıl</option>
                      <option value="3-5">3 - 5 Yıl</option>
                      <option value="5-10">5 - 10 Yıl</option>
                      <option value="10+">10 Yıldan Fazla</option>
                    </select>
                  </div>

                  {/* Ehliyet / Sürücü Belgesi */}
                  <div className="col-12 col-sm-6">
                    <label htmlFor="job-license" style={labelStyle}>
                      {labels.driverLicense || "Sürücü Belgeniz Var mı?"}
                    </label>
                    <select
                      name="hasDriverLicense"
                      id="job-license"
                      value={form.hasDriverLicense}
                      onChange={onChange}
                      onFocus={() => toggleFocus("hasDriverLicense", true)}
                      onBlur={() => toggleFocus("hasDriverLicense", false)}
                      style={{
                        ...inputStyle(focused.hasDriverLicense),
                        cursor: "pointer",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%230b2960'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.1rem",
                        paddingRight: "3rem",
                      }}
                      required
                    >
                      {Array.isArray(driverLicenseOptions) &&
                      driverLicenseOptions.length > 0 ? (
                        driverLicenseOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="yes">Evet (B Sınıfı veya Üstü)</option>
                          <option value="no">Hayır</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Deneyim ve Hakkında Açıklama */}
                  <div className="col-12">
                    <label htmlFor="job-message" style={labelStyle}>
                      {labels.message ||
                        "Kendinizden ve Deneyimlerinizden Bahsedin"}
                    </label>
                    <textarea
                      name="message"
                      id="job-message"
                      rows={5}
                      placeholder={
                        labels.messagePlaceholder ||
                        "Daha önce çalıştığınız projeler, uzmanlık alanlarınız veya eklemek istedikleriniz..."
                      }
                      value={form.message}
                      onChange={onChange}
                      onFocus={() => toggleFocus("message", true)}
                      onBlur={() => toggleFocus("message", false)}
                      style={{
                        ...inputStyle(focused.message),
                        minHeight: "130px",
                        resize: "vertical",
                        fontFamily: "inherit",
                      }}
                    ></textarea>
                  </div>

                  {/* Başarı Mesajı */}
                  {status.type === "success" && (
                    <div className="col-12">
                      <div
                        role="alert"
                        style={{
                          padding: "1rem 1.25rem",
                          borderRadius: "16px",
                          backgroundColor: "#e8f8f0",
                          border: "2px solid #25acbf",
                          color: "#084a3b",
                          fontWeight: 600,
                          boxShadow: "0 6px 16px rgba(37,211,102,0.15)",
                        }}
                      >
                        {status.msg}
                      </div>
                    </div>
                  )}

                  {/* Hata Mesajı */}
                  {status.type === "error" && (
                    <div className="col-12">
                      <div
                        role="alert"
                        style={{
                          padding: "1rem 1.25rem",
                          borderRadius: "16px",
                          backgroundColor: "#fdecec",
                          border: "2px solid #e35d5d",
                          color: "#842029",
                          boxShadow: "0 6px 16px rgba(227,93,93,0.15)",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            marginBottom: status.hints?.length ? "10px" : 0,
                          }}
                        >
                          {status.msg}
                        </div>
                        {Array.isArray(status.hints) &&
                          status.hints.length > 0 && (
                            <ul
                              style={{
                                margin: 0,
                                paddingLeft: "18px",
                                lineHeight: 1.6,
                                fontSize: "0.92rem",
                              }}
                            >
                              {status.hints.map((h, i) => (
                                <li key={i}>{h}</li>
                              ))}
                            </ul>
                          )}
                      </div>
                    </div>
                  )}

                  {/* Submit Butonu */}
                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={status.type === "loading"}
                      style={{
                        width: "100%",
                        padding: "1.1rem 1.5rem",
                        borderRadius: "18px",
                        border: "none",
                        backgroundColor: "#25acbf",
                        color: "#fff",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        cursor:
                          status.type === "loading" ? "not-allowed" : "pointer",
                        boxShadow: "0 10px 24px rgba(37,172,191,0.32)",
                        transition: "all .28s ease",
                        opacity: status.type === "loading" ? 0.8 : 1,
                        whiteSpace: "nowrap",
                        letterSpacing: "0.2px",
                      }}
                      onMouseEnter={(e) => {
                        if (status.type !== "loading") {
                          e.currentTarget.style.backgroundColor = "#0b2960";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow =
                            "0 14px 30px rgba(11,41,96,0.28)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#25acbf";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 24px rgba(37,172,191,0.32)";
                      }}
                    >
                      {status.type === "loading"
                        ? t("common.loading") || "Gönderiliyor..."
                        : labels.submit || "Başvuruyu Gönder"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
