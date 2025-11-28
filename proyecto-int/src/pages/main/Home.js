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
            <Link to="/Estudiante">Estudiante</Link>
            <Link to="/Asesor">Asesor</Link>
            <Link to="/Directora">Director</Link>

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
                src="https://www.gob.mx/cms/uploads/document/main_image/46398/Servicio_social.jpg"
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
                src="https://comunicacion.uaa.mx/revista/wp-content/uploads/2019/01/servicio-social.jpg"
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

        {/* SECCIÓN DE SERVICIOS */}
        <section className="servicios-section">
          <h2>Servicios destacados</h2>
          <div className="servicios-container">
            <div className="servicio-card">
            <img src="https://cdn-icons-png.flaticon.com/512/2491/2491065.png" alt="Apoyo psicológico" />
              <h3>Apoyo psicológico</h3>
              <p>Atención confidencial para estudiantes que requieran acompañamiento emocional.</p>
            </div>
          <div className="servicio-card">
           <img src="https://cdn-icons-png.flaticon.com/512/4324/4324856.png" alt="Tutorías académicas" />
             <h3>Tutorías académicas</h3>
             <p>Refuerzo en asignaturas críticas con apoyo personalizado de docentes tutores.</p>
          </div>
          <div className="servicio-card">
           <img src="https://cdn-icons-png.flaticon.com/512/4849/4849089.png" alt="Adaptaciones curriculares" />
            <h3>Adaptaciones curriculares</h3>
            <p>Gestión de ajustes razonables para garantizar la equidad educativa.</p>
          </div>
         </div>
        </section>

        {/* SECCIÓN FAQ */}
        <section className="faq-section">
         <h2>Preguntas frecuentes</h2>
         <div className="faq-container">
            <details>
              <summary>¿Quiénes pueden acceder al servicio de inclusión?</summary>
              <p>Cualquier estudiante con una condición de salud o necesidad especial puede solicitar apoyo.</p>
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

      <footer>
        <p>© 2025 - INACAP</p>
      </footer>
    </>
  );
}
