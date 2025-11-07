import "./DocenteDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function DocenteDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="doc-dash-wrapper">
      <header className="doc-header">
        <div className="doc-header-left">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
          />
          <h1>Panel Docente</h1>
        </div>
        <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <main className="doc-main">
        <section className="doc-info">
          <h2>Bienvenido, Docente</h2>
          <p>Gestiona tus clases, asistencia y estudiantes desde este panel.</p>
        </section>

        <div className="doc-grid">
          <Link className="doc-card" to="/docente/estudiantes">
            <h3>Estudiantes</h3>
            <p>Revisa las fichas y necesidades de tus alumnos.</p>
          </Link>

          <Link className="doc-card" to="/docente/asistencia">
            <h3>Asistencia</h3>
            <p>Registra la asistencia de cada sesión.</p>
          </Link>

          <Link className="doc-card" to="/docente/reportes">
            <h3>Reportes</h3>
            <p>Envía informes de seguimiento y desempeño.</p>
          </Link>
        </div>
      </main>

      <footer className="doc-footer">© 2025 · INACAP</footer>
    </div>
  );
}
