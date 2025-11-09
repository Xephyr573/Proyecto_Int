import "./AsesorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function AsesorDashboard() {
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
          <h1>Panel del Asesor</h1>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dash-grid">
        <Link className="dash-card" to="/asesor/perfil">
          <h3>Mi Perfil</h3>
          <p>Actualiza tu información profesional.</p>
        </Link>

        <Link className="dash-card" to="/asesor/entrevistas">
          <h3>Entrevistas Realizadas</h3>
          <p>Visualiza las entrevistas agendadas y completadas.</p>
        </Link>

        <Link className="dash-card" to="/asesor/fichas">
          <h3>Ficha de Estudiantes</h3>
          <p>Consulta fichas individuales y observaciones.</p>
        </Link>

        <Link className="dash-card" to="/asesor/reporte">
          <h3>Reporte de Asesorías</h3>
          <p>Accede a reportes de seguimiento y apoyo estudiantil.</p>
        </Link>
      </div>

      <footer className="dash-footer">© 2025 · INACAP</footer>
    </div>
  );
}
