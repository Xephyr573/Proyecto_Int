// src/pages/homepage/Estudiante/EstudianteDashboard.js
import "./EstudianteDashboard.css";
import { useNavigate } from "react-router-dom";

export default function EstudianteDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/Estudiante");

  // Por ahora estático; después puedes traerlo de la API/localStorage
  const nombreEstudiante = "Nombre Nombre Apellido Apellido";
  const correoEstudiante = "estudiante@inacapmail.cl";

  return (
    <div className="est-layout">
      {/* ===== SIDEBAR IZQUIERDA ===== */}
      <aside className="est-sidebar">
        <div className="est-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="est-sidebar-logo"
          />
        </div>

        <div className="est-sidebar-card">
          <span className="est-sidebar-label">Bienvenido/a</span>
          <p className="est-sidebar-name">{nombreEstudiante}</p>
          <p className="est-sidebar-email">{correoEstudiante}</p>
        </div>

        <nav className="est-sidebar-menu">
          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/necesidades")}
          >
            <span className="est-sidebar-bullet" />
            <span>Necesidades Especiales</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/asistencia")}
          >
            <span className="est-sidebar-bullet" />
            <span>Asistencia</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/solicitudes")}
          >
            <span className="est-sidebar-bullet" />
            <span>Historial de Solicitudes</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/reporte")}
          >
            <span className="est-sidebar-bullet" />
            <span>Reporte General</span>
          </button>
        </nav>
      </aside>

      {/* ===== CONTENIDO DERECHO ===== */}
      <main className="est-main">
        <header className="est-main-header">
          <h1>Portal Estudiante</h1>
          <button className="est-btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="est-main-grid">
          <div
            className="est-card"
            onClick={() => navigate("/estudiante/necesidades")}
          >
            <h3>Necesidades Especiales</h3>
            <p>Registra o modifica tus necesidades específicas.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/asistencia")}
          >
            <h3>Asistencia</h3>
            <p>Consulta tu asistencia a clases o entrevistas.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/solicitudes")}
          >
            <h3>Historial de Solicitudes</h3>
            <p>Revisa solicitudes anteriores y su estado.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/reporte")}
          >
            <h3>Reporte General</h3>
            <p>Visualiza tu progreso y estadísticas.</p>
          </div>
        </section>

        <footer className="est-footer">© 2025 · INACAP</footer>
      </main>
    </div>
  );
}
