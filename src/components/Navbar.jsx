import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaPaintRoller,
  FaCalendarCheck,
  FaChevronDown,
  FaChevronUp,
  FaBars,
  FaXmark,
  FaHouse,
  FaCircleInfo,
  FaPaintbrush,
  FaLayerGroup,
  FaEnvelope,
  FaPhone,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import Topbar from "./Topbar.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  
  // getSlugTitle kullanımı ile güvenli başlık çekimi sağlandı
  const { t, getSlugTitle, serviceSlugs = [] } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setServicesDropdown(false);
  };

  const scrollTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant" in window ? "instant" : "auto",
      });
    } catch (_) {
      window.scrollTo(0, 0);
    }
  };
  const goAndClose = () => {
    closeAll();
    scrollTop();
  };

  const [bodyOverflow, setBodyOverflow] = useState(null);
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow || "";
      setBodyOverflow(prev);
      document.body.style.overflow = "hidden";
    } else if (bodyOverflow !== null) {
      document.body.style.overflow = bodyOverflow;
      setBodyOverflow(null);
    }
  }, [menuOpen]);

  const desktopPad = "clamp(0.6rem, 5vw, 8rem)";
  const navHeightH = "112px";
  const topbarH = 58;
  const totalNavH = topbarH + 112;
  const mobileMenuTop = `${totalNavH + 10}px`;

  // Alt hizmet başlıklarını güvenli şekilde çeken dizi
  const subServices = serviceSlugs.map((slug) => ({
    slug,
    title: getSlugTitle(slug),
  }));

  const mainNavItems = [
    { to: "/", end: true, label: t("common.home"), icon: FaHouse, key: "home" },
    {
      to: "/about",
      label: t("common.about"),
      icon: FaCircleInfo,
      key: "about",
    },
    {
      key: "services",
      label: t("common.services"),
      icon: FaPaintbrush,
      isDropdown: "services",
    },
    {
      to: "/project",
      label: t("common.projects"),
      icon: FaLayerGroup,
      key: "project",
    },
    {
      to: "/contact",
      label: t("common.contact"),
      icon: FaEnvelope,
      key: "contact",
    },
  ];

  const contactIconStyle = (hover, hoverColor, hoverBg) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "9px",
    textDecoration: "none",
    border: "none",
    padding: 0,
    transition: "all .2s ease",
    cursor: "pointer",
    flexShrink: 0,
    backgroundColor: hover ? hoverBg || "#fff" : "rgba(11,41,96,0.08)",
    color: hover ? hoverColor || "#fff" : "#0b2960",
    boxShadow: hover ? "0 3px 8px rgba(0,0,0,0.12)" : "none",
  });

  return (
    <>
      {/* ===== FIXED NAVBAR + TOPBAR ===== */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 1030,
          backgroundColor: "#fff",
          boxShadow: scrolled
            ? "0 6px 20px rgba(11,41,96,0.08)"
            : "0 2px 8px rgba(11,41,96,0.04)",
          transition: "box-shadow .35s ease",
        }}
      >
        <Topbar />
        <nav
          className={`navbar navbar-expand-xl bg-white navbar-light wow fadeIn`}
          data-wow-delay="0.1s"
          style={{
            minHeight: navHeightH,
            height: navHeightH,
            paddingLeft: desktopPad,
            paddingRight: desktopPad,
            paddingTop: 0,
            paddingBottom: 0,
            margin: 0,
          }}
        >
          <div
            className="container-fluid p-0 m-0 d-flex w-100 h-100 align-items-center justify-content-between"
            style={{ flexFlow: "row nowrap" }}
          >
            {/* LOGO */}
            <Link
              to="/"
              className="navbar-brand d-inline-flex align-items-center m-0 p-0"
              onClick={closeAll}
              style={{ alignSelf: "center", margin: 0, padding: 0 }}
            >
              <img
                style={{
                  width: "11rem",
                  maxWidth: "100%",
                  height: "auto",
                  display: "inline-block",
                  verticalAlign: "middle",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                }}
                src="/icons/emo-logo1.webp"
                alt="Emo Logo"
              />
            </Link>

            {/* Mobil Hamburger */}
            <button
              type="button"
              className="btn navbar-toggler d-xl-none d-inline-flex align-items-center justify-content-center p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                border: `2px solid ${menuOpen ? "#25acbf" : "#0b2960"}`,
                backgroundColor: menuOpen
                  ? "rgba(37,172,191,0.08)"
                  : "transparent",
                color: menuOpen ? "#25acbf" : "#0b2960",
                transition: "all .25s ease",
                boxShadow: menuOpen
                  ? "0 4px 12px rgba(37,172,191,0.22)"
                  : "0 2px 6px rgba(11,41,96,0.08)",
                flexShrink: 0,
              }}
            >
              {menuOpen ? (
                <FaXmark size={20} style={{ display: "block" }} />
              ) : (
                <FaBars size={20} style={{ display: "block" }} />
              )}
            </button>

            {/* MENU + CTA - Desktop */}
            <div
              className="collapse navbar-collapse"
              id="navbarCollapse"
              style={{ flexBasis: "auto", flexGrow: 0, alignSelf: "center" }}
            >
              <div
                className="d-none d-xl-flex align-items-center justify-content-end gap-1"
                style={{
                  height: "100%",
                  paddingTop: 0,
                  paddingBottom: 0,
                  minHeight: navHeightH,
                }}
              >
                <div
                  className="d-flex align-items-center gap-1"
                  style={{ flexWrap: "nowrap" }}
                >
                  {mainNavItems.map((it) => {
                    if (it.isDropdown === "services") {
                      return (
                        <div
                          key="services-dropdown"
                          className={`nav-item dropdown ${servicesDropdown ? "show" : ""}`}
                          onMouseEnter={() => setServicesDropdown(true)}
                          onMouseLeave={() => setServicesDropdown(false)}
                          style={{ flexShrink: 0 }}
                        >
                          <button
                            className="nav-link d-inline-flex align-items-center"
                            style={{
                              fontWeight: 600,
                              color: servicesDropdown ? "#25acbf" : "#0b2960",
                              padding: "0.5rem 0.75rem",
                              borderRadius: 0,
                              transition: "all .2s ease",
                              border: "none",
                              background: "transparent",
                              whiteSpace: "nowrap",
                              flexWrap: "nowrap",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#25acbf";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = servicesDropdown
                                ? "#25acbf"
                                : "#0b2960";
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setServicesDropdown(!servicesDropdown);
                            }}
                          >
                            <FaPaintbrush
                              style={{
                                marginRight: "5px",
                                fontSize: "0.9rem",
                                flexShrink: 0,
                              }}
                            />
                            <span
                              style={{
                                flexShrink: 0,
                                transition: "letter-spacing .2s ease",
                                letterSpacing: servicesDropdown ? "0.3px" : "0",
                              }}
                            >
                              {t("common.services")}
                            </span>
                            <span
                              style={{
                                marginLeft: "4px",
                                display: "inline-flex",
                                flexShrink: 0,
                              }}
                            >
                              {servicesDropdown ? (
                                <FaChevronUp size={10} />
                              ) : (
                                <FaChevronDown size={10} />
                              )}
                            </span>
                          </button>
                          <div
                            className={`dropdown-menu border-0 m-0 ${servicesDropdown ? "show" : ""}`}
                            style={{
                              minWidth: "320px",
                              borderRadius: "12px",
                              padding: "0.5rem",
                              boxShadow: "0 12px 30px rgba(11, 41, 96, 0.16)",
                              border: "1px solid rgba(37, 172, 191, 0.15)",
                              marginTop: "8px",
                            }}
                          >
                            <Link
                              to="/service"
                              className="dropdown-item d-flex align-items-center fw-bold"
                              style={{
                                color: "#fff",
                                backgroundColor: "#0b2960",
                                borderRadius: "8px",
                                padding: "0.65rem 0.9rem",
                                marginBottom: "0.35rem",
                              }}
                              onClick={goAndClose}
                            >
                              <FaPaintRoller
                                style={{
                                  marginRight: "10px",
                                  color: "#25acbf",
                                }}
                              />
                              {t("common.allServices")}
                            </Link>
                            <div
                              className="dropdown-divider"
                              style={{ margin: "0.35rem 0.3rem" }}
                            ></div>
                            {subServices.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/service/${s.slug}`}
                                className="dropdown-item d-flex align-items-center"
                                onClick={goAndClose}
                                style={{
                                  padding: "0.55rem 0.8rem",
                                  borderRadius: "8px",
                                  color: "#0b2960",
                                  fontWeight: 500,
                                  transition: "all .18s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "rgba(37,172,191,0.1)";
                                  e.currentTarget.style.color = "#25acbf";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "transparent";
                                  e.currentTarget.style.color = "#0b2960";
                                }}
                              >
                                <FaPaintRoller
                                  style={{
                                    color: "#25acbf",
                                    marginRight: "10px",
                                    flexShrink: 0,
                                  }}
                                />
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <NavLink
                        key={it.key}
                        to={it.to}
                        end={it.end}
                        onClick={scrollTop}
                        className={({ isActive }) =>
                          `nav-item nav-link d-inline-flex align-items-center ${isActive ? "active" : ""}`
                        }
                        style={({ isActive }) => ({
                          fontWeight: 600,
                          color: isActive ? "#25acbf" : "#0b2960",
                          padding: "0.5rem 0.75rem",
                          borderRadius: 0,
                          transition: "all .2s ease",
                          backgroundColor: "transparent",
                          whiteSpace: "nowrap",
                          flexWrap: "nowrap",
                          flexShrink: 0,
                        })}
                        onMouseEnter={(e) => {
                          const a = e.currentTarget;
                          a.style.color = "#25acbf";
                          a.style.backgroundColor = "transparent";
                        }}
                        onMouseLeave={(e) => {
                          const a = e.currentTarget;
                          a.style.backgroundColor = "transparent";
                          if (a.className.includes("active")) {
                            a.style.color = "#25acbf";
                          } else {
                            a.style.color = "#0b2960";
                          }
                        }}
                      >
                        {({ isActive }) => (
                          <span
                            style={{
                              flexShrink: 0,
                              transition: "letter-spacing .2s ease",
                              letterSpacing: isActive ? "0.3px" : "0",
                            }}
                          >
                            {it.label}
                          </span>
                        )}
                      </NavLink>
                    );
                  })}
                </div>

                {/* İLETİŞİM İKONLARI */}
                <div
                  className="d-none d-xl-inline-flex align-items-center gap-2 mx-2"
                  style={{ alignSelf: "center", flexShrink: 0 }}
                >
                  <a
                    href="tel:+31687272979"
                    aria-label="Telefon ile ara"
                    title="+31 6 8727 2979"
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "#0b2960",
                        color: "#fff",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 10px rgba(11, 41, 96, 0.22)",
                      });
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "rgba(11,41,96,0.08)",
                        color: "#0b2960",
                        transform: "translateY(0)",
                        boxShadow: "none",
                      });
                    }}
                    style={contactIconStyle(false)}
                  >
                    <FaPhone size={15} />
                  </a>
                  <a
                    href="https://wa.me/31687272979"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp ile yaz"
                    title="WhatsApp"
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "#25D366",
                        color: "#fff",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 10px rgba(37, 211, 102, 0.28)",
                      });
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "rgba(11,41,96,0.08)",
                        color: "#0b2960",
                        transform: "translateY(0)",
                        boxShadow: "none",
                      });
                    }}
                    style={contactIconStyle(false)}
                  >
                    <FaWhatsapp size={23} />
                  </a>

                  <a
                    href="https://www.instagram.com/emoschildersbedrijf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram sayfamızı ziyaret et"
                    title="Instagram"
                    onMouseEnter={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "transparent",
                        backgroundImage:
                          "linear-gradient(45deg, #405DE6, #833AB4, #E1306C, #F56040, #FCAF45)",
                        color: "#fff",
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 10px rgba(225, 48, 108, 0.35)",
                      });
                    }}
                    onMouseLeave={(e) => {
                      Object.assign(e.currentTarget.style, {
                        backgroundColor: "rgba(11,41,96,0.08)",
                        backgroundImage: "none",
                        color: "#0b2960",
                        transform: "translateY(0)",
                        boxShadow: "none",
                      });
                    }}
                    style={contactIconStyle(false)}
                  >
                    <FaInstagram size={24} />
                  </a>
                </div>

                {/* CTA Buton */}
                <Link
                  to="/appointment"
                  className="btn d-none d-xl-inline-flex align-items-center justify-content-center ms-1"
                  onClick={scrollTop}
                  style={{
                    backgroundColor: "#25acbf",
                    color: "#fff",
                    border: "2px solid #25acbf",
                    whiteSpace: "nowrap",
                    width: "auto",
                    padding: "0.55rem 1rem",
                    borderRadius: "10px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 12px rgba(37, 172, 191, 0.25)",
                    transition: "all .25s ease",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0b2960";
                    e.currentTarget.style.borderColor = "#0b2960";
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 18px rgba(11, 41, 96, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#25acbf";
                    e.currentTarget.style.borderColor = "#25acbf";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(37, 172, 191, 0.25)";
                  }}
                >
                  <FaCalendarCheck
                    style={{ marginRight: "8px", color: "#fff" }}
                  />
                  {t("navbar.freeDiscovery")}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div
        style={{
          height: `${totalNavH}px`,
          width: "100%",
          flexShrink: 0,
          display: "block",
        }}
      />

      {/* MOBİL MENÜ */}
      {menuOpen && (
        <>
          <div
            onClick={closeAll}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(11, 41, 96, 0.42)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 9994,
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: mobileMenuTop,
              left: "12px",
              width: "calc(100vw - 24px)",
              maxWidth: "calc(100vw - 24px)",
              maxHeight: `calc(100vh - ${topbarH + 82 + 20}px)`,
              overflowY: "auto",
              overflowX: "hidden",
              zIndex: 9999,
              boxSizing: "border-box",
              margin: 0,
              padding: 0,
              animation: "fadeUpCookie .3s ease both",
            }}
          >
            <div
              className="p-4"
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#ffffff",
                background: "#ffffff",
                opacity: 1,
                borderRadius: "16px",
                border: "1px solid rgba(37, 172, 191, 0.3)",
                boxShadow: "0 20px 48px rgba(11, 41, 96, 0.35)",
              }}
            >
              <div
                className="d-flex flex-column gap-1"
                style={{ width: "100%", boxSizing: "border-box" }}
              >
                {mainNavItems.map((it) => {
                  if (it.isDropdown === "services") {
                    return (
                      <div
                        key="services-mob"
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setServicesDropdown(!servicesDropdown);
                          }}
                          className="w-100 d-inline-flex align-items-center justify-content-between"
                          style={{
                            border: "none",
                            padding: "0.85rem 1rem",
                            borderRadius: "12px",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            backgroundColor: servicesDropdown
                              ? "rgba(37,172,191,0.14)"
                              : "transparent",
                            color: servicesDropdown ? "#25acbf" : "#0b2960",
                            transition: "all .2s ease",
                            boxSizing: "border-box",
                            textAlign: "left",
                          }}
                        >
                          <span className="d-inline-flex align-items-center">
                            <span
                              className="d-inline-flex align-items-center justify-content-center me-3"
                              style={{
                                width: "42px",
                                height: "42px",
                                borderRadius: "12px",
                                backgroundColor: servicesDropdown
                                  ? "#fff"
                                  : "rgba(37,172,191,0.14)",
                                color: "#25acbf",
                              }}
                            >
                              <FaPaintbrush size={19} />
                            </span>
                            {t("common.services")}
                          </span>
                          {servicesDropdown ? (
                            <FaChevronUp size={16} />
                          ) : (
                            <FaChevronDown size={16} />
                          )}
                        </button>
                        {servicesDropdown && (
                          <div
                            className="mt-2 mb-1 p-2"
                            style={{
                              width: "100%",
                              maxWidth: "100%",
                              boxSizing: "border-box",
                              backgroundColor: "#fff",
                              borderRadius: "12px",
                              border: "1px solid rgba(37,172,191,0.2)",
                            }}
                          >
                            <Link
                              to="/service"
                              className="w-100 d-inline-flex align-items-center text-decoration-none mb-1"
                              onClick={goAndClose}
                              style={{
                                padding: "0.8rem 1rem",
                                borderRadius: "12px",
                                fontWeight: 700,
                                color: "#fff",
                                backgroundColor: "#0b2960",
                              }}
                            >
                              <FaPaintRoller
                                style={{
                                  marginRight: "10px",
                                  color: "#25acbf",
                                }}
                              />
                              {t("common.allServices")}
                            </Link>
                            <div
                              style={{
                                height: "1px",
                                backgroundColor: "rgba(11,41,96,0.08)",
                                margin: "0.45rem 0.5rem",
                              }}
                            ></div>
                            {subServices.map((s) => (
                              <Link
                                key={s.slug}
                                to={`/service/${s.slug}`}
                                className="w-100 d-inline-flex align-items-center text-decoration-none"
                                onClick={goAndClose}
                                style={{
                                  padding: "0.7rem 1rem",
                                  borderRadius: "10px",
                                  color: "#0b2960",
                                  fontWeight: 500,
                                }}
                              >
                                <FaPaintRoller
                                  style={{
                                    color: "#25acbf",
                                    marginRight: "10px",
                                    flexShrink: 0,
                                  }}
                                />
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }
                  const Icon = it.icon;
                  const SafeIcon = typeof Icon === "function" ? Icon : null;
                  return (
                    <NavLink
                      key={it.key}
                      to={it.to}
                      end={it.end}
                      onClick={goAndClose}
                      className={({ isActive }) =>
                        `w-100 d-inline-flex align-items-center text-decoration-none ${isActive ? "active" : ""}`
                      }
                      style={({ isActive }) => ({
                        padding: "0.85rem 1rem",
                        borderRadius: "12px",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: isActive ? "#25acbf" : "#0b2960",
                        backgroundColor: isActive
                          ? "rgba(37,172,191,0.12)"
                          : "transparent",
                        transition: "all .2s ease",
                        boxSizing: "border-box",
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className="d-inline-flex align-items-center justify-content-center me-3"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "12px",
                              backgroundColor: isActive
                                ? "#fff"
                                : "rgba(37,172,191,0.14)",
                              color: "#25acbf",
                              flexShrink: 0,
                            }}
                          >
                            {SafeIcon && <SafeIcon size={19} />}
                          </span>
                          {it.label}
                        </>
                      )}
                    </NavLink>
                  );
                })}

                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(11,41,96,0.08)",
                    margin: "0.75rem 0.5rem",
                  }}
                ></div>

                <Link
                  to="/appointment"
                  onClick={goAndClose}
                  className="w-100 d-inline-flex align-items-center justify-content-center text-decoration-none"
                  style={{
                    padding: "1rem 1rem",
                    borderRadius: "14px",
                    backgroundColor: "#25acbf",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    boxShadow: "0 8px 18px rgba(37, 172, 191, 0.32)",
                    marginTop: "0.4rem",
                  }}
                >
                  <FaCalendarCheck
                    style={{ marginRight: "10px", color: "#fff" }}
                  />
                  {t("navbar.freeDiscovery")}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}