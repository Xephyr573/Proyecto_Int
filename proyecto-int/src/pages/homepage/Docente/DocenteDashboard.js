import "./DocenteDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function DocenteDashboard() {
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
          <h1>Panel Docente</h1>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dash-grid">
        <Link className="dash-card" to="/docente/perfil">
          <h3>Mi Perfil</h3>
          <p>Revisa y actualiza tus datos personales.</p>
        </Link>

        <Link className="dash-card" to="/docente/asistencia">
          <h3>Asistencia de Estudiantes</h3>
          <p>Consulta y marca asistencia de alumnos.</p>
        </Link>

        <Link className="dash-card" to="/docente/solicitudes">
          <h3>Solicitudes Recibidas</h3>
          <p>Revisa las solicitudes enviadas por estudiantes.</p>
        </Link>

        <Link className="dash-card" to="/docente/reportes">
          <h3>Reportes Académicos</h3>
          <p>Genera y visualiza reportes de rendimiento.</p>
        </Link>
      </div>

      <footer className="dash-footer">© 2025 · INACAP</footer>
    </div>
  );
}
