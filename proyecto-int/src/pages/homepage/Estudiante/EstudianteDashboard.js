import "./EstudianteDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function EstudianteDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/");

  return (
    <div className="dash-wrapper">
      <header className="dash-header">
        <div className="header-left">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
          />
          <h1>Portal Estudiante</h1>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dash-grid">
        <Link className="dash-card" to="/estudiante/perfil">
          <h3>Mi Perfil</h3>
          <p>Revisa y actualiza tu información personal.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/necesidades">
          <h3>Necesidades Especiales</h3>
          <p>Registra o modifica tus necesidades específicas.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/asistencia">
          <h3>Asistencia</h3>
          <p>Consulta si has asistido a clases o entrevistas previas.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/solicitudes">
          <h3>Historial de Solicitudes</h3>
          <p>Revisa solicitudes anteriores y su estado.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/reporte">
          <h3>Reporte General</h3>
          <p>Visualiza tu progreso y estadísticas.</p>
        </Link>
      </div>

      <footer className="dash-footer">© 2025 · INACAP</footer>
    </div>
  );
}
