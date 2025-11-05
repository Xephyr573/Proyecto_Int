import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      {/* LOGO */}
      <header>
        <div className="logo-container">
          <img
            src="https://vectorseek.com/wp-content/uploads/2023/08/INACAP-Logo-Vector.svg-.png"
            alt="Logo del Proyecto"
            className="logo"
          />
        </div>
      </header>

      {/* MENU INGRESAR */}
      <header>
        <div className="menu-wrapper">
          <div className="menu-btn">Ingresar</div>

          <div className="menu-content">
            <Link to="/Docente">Docente</Link>
            <Link to="/Director">Director</Link>
            <Link to="/Estudiante">Estudiante</Link>
            <Link to="/Asesor">Asesor</Link>
          </div>
        </div>
      </header>

      {/* TITULO CENTRAL */}
      <div className="title-container">
        <h1>Servicio de inclusión educativa</h1>
      </div>

      <main className="home-container">

        {/* BOTONES PRINCIPALES */}
        <div className="main-buttons">
          <a
            href="https://portales.inacap.cl/estudiantes/asuntos-estudiantiles/contactos-por-sede/index"
            className="btn-2"
          >
            Contacto Inacap
          </a>

          <a
            href="https://portal.inacap.cl/diversidad-genero-inclusion-y-convivencia"
            className="btn-3"
          >
            Saber más
          </a>
        </div>

        {/* SECCIÓN INFO + IMÁGENES */}
        <section className="about-section">
          <div className="about-container">
            <div className="about-image">
              <img
                src="/imgs/inclusion.jpg"
                alt="Inclusión"
                className="project-image"
              />
            </div>

            <div className="about-text">
              <h2>¿Para qué sirve?</h2>
              <p>
                Nuestro sistema permite mejorar la experiencia educativa de
                estudiantes con necesidades específicas, brindando orientación y
                herramientas que fortalecen su proceso formativo.
              </p>

              <p>
                Favorece la inclusión, apoyo oportuno y acompañamiento académico
                personalizado.
              </p>
            </div>
          </div>
        </section>

        {/* SEGUNDA SECCIÓN */}
        <section className="about-section second">
          <div className="about-container reverse">
            <div className="about-image">
              <img
                src="/imgs/apoyo.jpg"
                alt="Apoyo"
                className="project-image"
              />
            </div>

            <div className="about-text">
              <h2>¿En qué consiste?</h2>
              <p>
                Ofrecemos seguimiento continuo, atención especializada y acceso
                a profesionales asesores.
              </p>

              <p>
                Permitimos una comunicación más directa entre directores,
                docentes, asesores y estudiantes.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE NOTICIAS */}
        <section className="news-section">
          <h2>Noticias recientes</h2>

          <div className="news-container">

            <div className="news-item">
              <img src="/imgs/noticia1.jpg" alt="Noticia 1" />
              <h3>Semana de Inclusión</h3>
              <p>
                Este mes se realizará una jornada de talleres sobre inclusión en
                todas las sedes.
              </p>
            </div>

            <div className="news-item">
              <img src="/imgs/noticia2.jpg" alt="Noticia 2" />
              <h3>Nuevo portal</h3>
              <p>
                Se lanzó una nueva plataforma de apoyo académico para estudiantes.
              </p>
            </div>

            <div className="news-item">
              <img src="/imgs/noticia3.jpg" alt="Noticia 3" />
              <h3>Más apoyo</h3>
              <p>
                Aumenta el número de asesores profesionales incorporados al área.
              </p>
            </div>

          </div>
        </section>
      </main>

      <footer>
        <p>© 2025 - INACAP</p>
      </footer>
    </>
  );
}
