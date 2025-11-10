import "./DirectorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function DirectorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dash-wrapper">
      <header className="dash-header">
        <div className="header-left">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
          />
          <h1>Panel del Director</h1>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dash-grid">
        <Link className="dash-card" to="/director/perfil">
          <h3>Mi Perfil</h3>
          <p>Gestiona tu información personal y credenciales.</p>
        </Link>

        <Link className="dash-card" to="/director/gestion">
          <h3>Gestión General</h3>
          <p>Controla los procesos administrativos y académicos.</p>
        </Link>

        <Link className="dash-card" to="/director/asistencia">
          <h3>Asistencia</h3>
          <p>Revisa la asistencia global de estudiantes y asesores.</p>
        </Link>

        <Link className="dash-card" to="/director/reportes">
          <h3>Reportes Institucionales</h3>
          <p>Visualiza estadísticas y resultados globales.</p>
        </Link>
      </div>

      <footer className="dash-footer">© 2025 · INACAP</footer>
    </div>
  );
}
