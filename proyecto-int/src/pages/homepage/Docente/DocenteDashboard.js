// src/pages/homepage/Docente/DocenteDashboard.js
import "./DocenteDashboard.css";
import { useNavigate } from "react-router-dom";

export default function DocenteDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Docente");
  };

  // Por ahora es estático. Después lo puedes traer de la API / localStorage.
  const nombreDocente = "Nombre Nombre Apellido Apellido";
  const correoDocente = "docente@inacapmail.cl";

  return (
    <div className="docente-layout">
      {/* ==== SIDEBAR IZQUIERDA ==== */}
      <aside className="docente-sidebar">
        <div className="sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="sidebar-logo"
          />
        </div>

        <div className="sidebar-card">
          <span className="sidebar-label">Bienvenido/a</span>
          <p className="sidebar-name">{nombreDocente}</p>
          <p className="sidebar-email">{correoDocente}</p>
        </div>

        <nav className="sidebar-menu">
          <button
            className="sidebar-item"
            onClick={() => navigate("/docente/asistencia")}
          >
            <span className="sidebar-bullet" />
            <span>Asistencia de Estudiantes</span>
          </button>
          <button
            className="sidebar-item"
            onClick={() => navigate("/docente/solicitudes")}
          >
            <span className="sidebar-bullet" />
            <span>Solicitudes Recibidas</span>
          </button>
          <button
            className="sidebar-item"
            onClick={() => navigate("/docente/reportes")}
          >
            <span className="sidebar-bullet" />
            <span>Reportes Académicos</span>
          </button>
        </nav>
      </aside>

      {/* ==== CONTENIDO DERECHO ==== */}
      <main className="docente-main">
        <header className="docente-main-header">
          <h1>Panel Docente</h1>
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="docente-main-grid">
          <div
            className="dash-card"
            onClick={() => navigate("/docente/asistencia")}
          >
            <h3>Asistencia de Estudiantes</h3>
            <p>Consulta y marca asistencia de alumnos.</p>
          </div>

          <div
            className="dash-card"
            onClick={() => navigate("/docente/solicitudes")}
          >
            <h3>Solicitudes Recibidas</h3>
            <p>Revisa las solicitudes enviadas por estudiantes.</p>
          </div>

          <div
            className="dash-card"
            onClick={() => navigate("/docente/reportes")}
          >
            <h3>Reportes Académicos</h3>
            <p>Genera y visualiza reportes de rendimiento.</p>
          </div>
        </section>

        <footer className="dash-footer">© 2025 · INACAP</footer>
      </main>
    </div>
  );
}
