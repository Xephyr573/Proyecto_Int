import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Home.css";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onClickOutside = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="logo-container">
            <img
              src="https://vectorseek.com/wp-content/uploads/2023/08/INACAP-Logo-Vector.svg-.png"
              alt="INACAP"
              className="logo"
              loading="lazy"
            />
          </div>

          {/* MENÚ INGRESAR (MISMAS RUTAS) */}
          <div className="menu-wrapper" ref={menuRef}>
            <button
              type="button"
              className="menu-btn"
              aria-haspopup="true"
              aria-expanded={menuOpen ? "true" : "false"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              Ingresar
            </button>

            <div className={`menu-content ${menuOpen ? "open" : ""}`}>
              <Link to="/Docente" onClick={() => setMenuOpen(false)}>
                Docente
              </Link>
              <Link to="/Estudiante" onClick={() => setMenuOpen(false)}>
                Estudiante
              </Link>
              <Link to="/Asesor" onClick={() => setMenuOpen(false)}>
                Asesor
              </Link>
              <Link to="/Directora" onClick={() => setMenuOpen(false)}>
                Director
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* HERO (BLANCO PRO) */}
      <section className="hero hero-light">
        <div className="hero-inner">
          <div className="hero-badge">Servicio institucional</div>

          <div className="title-container">
            <h1>Servicio de inclusión educativa</h1>
            <p className="subtitle">
              Acompañamiento, orientación y ajustes razonables para fortalecer el aprendizaje y la equidad.
            </p>
          </div>

          <div className="main-buttons">
            <a
              href="https://portales.inacap.cl/estudiantes/asuntos-estudiantiles/contactos-por-sede/index"
              className="btn-2 btn-primary"
            >
              Contacto INACAP
            </a>

            <a
              href="https://portal.inacap.cl/diversidad-genero-inclusion-y-convivencia"
              className="btn-3 btn-secondary"
            >
              Saber más
            </a>
          </div>

          <div className="hero-strip" aria-hidden="true"></div>
        </div>
      </section>

      <main className="home-container">
        {/* INFO 1 */}
        <section className="about-section about-light">
          <div className="about-container">
            <div className="about-image">
              <img
                src="https://www.gob.mx/cms/uploads/document/main_image/46398/Servicio_social.jpg"
                alt="Estudiantes recibiendo apoyo y acompañamiento"
                className="project-image"
                loading="lazy"
              />
            </div>

            <div className="about-text">
              <h2>¿Para qué sirve?</h2>
              <p>
                Nuestro sistema mejora la experiencia educativa de estudiantes con necesidades específicas,
                entregando orientación y herramientas para fortalecer su proceso formativo.
              </p>
              <p>
                Promueve la inclusión, el apoyo oportuno y el acompañamiento académico personalizado.
              </p>
            </div>
          </div>
        </section>

        {/* INFO 2 */}
        <section className="about-section about-light">
          <div className="about-container reverse">
            <div className="about-image">
              <img
                src="https://comunicacion.uaa.mx/revista/wp-content/uploads/2019/01/servicio-social.jpg"
                alt="Equipo de apoyo y seguimiento académico"
                className="project-image"
                loading="lazy"
              />
            </div>

            <div className="about-text">
              <h2>¿En qué consiste?</h2>
              <p>
                Ofrecemos seguimiento continuo, atención especializada y acceso a profesionales asesores.
              </p>
              <p>
                Facilitamos la coordinación entre directores, docentes, asesores y estudiantes para actuar a tiempo.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section className="servicios-section servicios-light">
          <div className="section-head">
            <h2>Servicios destacados</h2>
            <p>Apoyos clave para bienestar, rendimiento y equidad educativa.</p>
          </div>

          <div className="servicios-container">
            <article className="servicio-card card-accent accent-1">
              <div className="card-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2491/2491065.png"
                  alt="Ícono de apoyo psicológico"
                  loading="lazy"
                />
              </div>
              <h3>Apoyo psicológico</h3>
              <p>Atención confidencial para estudiantes que requieran acompañamiento emocional.</p>
            </article>

            <article className="servicio-card card-accent accent-2">
              <div className="card-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4324/4324856.png"
                  alt="Ícono de tutorías académicas"
                  loading="lazy"
                />
              </div>
              <h3>Tutorías académicas</h3>
              <p>Refuerzo en asignaturas críticas con apoyo personalizado de docentes tutores.</p>
            </article>

            <article className="servicio-card card-accent accent-3">
              <div className="card-icon">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4849/4849089.png"
                  alt="Ícono de adaptaciones curriculares"
                  loading="lazy"
                />
              </div>
              <h3>Adaptaciones curriculares</h3>
              <p>Gestión de ajustes razonables para garantizar la equidad educativa.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section faq-light">
          <div className="section-head">
            <h2>Preguntas frecuentes</h2>
            <p>Respuestas claras y rápidas para orientar tu solicitud.</p>
          </div>

          <div className="faq-container">
            <details>
              <summary>¿Quiénes pueden acceder al servicio de inclusión?</summary>
              <p>Cualquier estudiante con una condición de salud o necesidad específica puede solicitar apoyo.</p>
            </details>

            <details>
              <summary>¿Cómo puedo agendar una entrevista?</summary>
              <p>Desde tu panel de estudiante puedes ingresar a “Ficha y Entrevista” y completar el formulario.</p>
            </details>

            <details>
              <summary>¿El servicio tiene costo?</summary>
              <p>No. Todos los servicios de inclusión son gratuitos para los estudiantes de INACAP.</p>
            </details>
          </div>
        </section>
      </main>

      <footer className="footer-light">
        <p>© 2025 - INACAP</p>
      </footer>
    </>
  );
}
