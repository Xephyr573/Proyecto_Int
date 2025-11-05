import "./EstudianteDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function EstudianteDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí luego se puede limpiar sesión / tokens
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
          <h1>Portal Estudiante</h1>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <div className="dash-grid">

        <Link className="dash-card" to="/estudiante/perfil">
          <h3>Mi Perfil</h3>
          <p>Revisa o actualiza tu información personal.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/asistencia">
          <h3>Asistencia</h3>
          <p>Revisa tu historial de asistencia.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/solicitudes">
          <h3>Solicitudes</h3>
          <p>Consulta solicitudes realizadas.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/entrevista">
          <h3>Entrevista</h3>
          <p>Gestiona la entrevista individualizada.</p>
        </Link>

        <Link className="dash-card" to="/estudiante/reporte">
          <h3>Reporte</h3>
          <p>Visualiza tu resumen académico.</p>
        </Link>

      </div>

      <footer className="dash-footer">
        © 2025 · INACAP
      </footer>
    </div>
  );
}
