import { Link } from "react-router-dom";
import "./Home.css";
export default function Home() {
  return (
    <>
      
      <header>
        <div className="logo-container">
          <img
            src="https://vectorseek.com/wp-content/uploads/2023/08/INACAP-Logo-Vector.svg-.png"
            alt="Logo del Proyecto"
            className="logo"
          />
        </div>
      </header>

      <header>
        <Link to="/Ingresar" className="btn-1">Ingresar</Link>
      </header>

      <div className="title-container">
        <h1>Servicio de inclusión educativa</h1>
      </div>

      <main className="home-container">
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

        <div className="about-image">
          <img
            src="ruta-de-tu-imagen-1.jpg"
            alt="Sobre el proyecto"
            className="project-image"
          />
        </div>
      </main>

      <footer>
        <p>© 2025 - Proyecto Grupo 7</p>
      </footer>
    </>
  );
}