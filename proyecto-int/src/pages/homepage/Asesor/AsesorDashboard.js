import "./AsesorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function AsesorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="asesor-wrapper">
      <aside className="asesor-sidebar">
        <img
          src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
          alt="Inacap"
        />
        <nav>
          <Link to="/asesor/entrevistas">Entrevistas</Link>
          <Link to="/asesor/seguimiento">Seguimiento</Link>
          <Link to="/asesor/reportes">Reportes</Link>
          <Link to="/asesor/fichas">Ficha Estudiante</Link>
        </nav>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </aside>

      <main className="asesor-main">
        <h1>Panel del Asesor</h1>
        <p>Administra entrevistas, seguimiento y reportes individuales.</p>

        <div className="asesor-grid">
          <div className="asesor-card">
            <h3>Entrevistas</h3>
            <p>Gestiona entrevistas personalizadas para estudiantes.</p>
          </div>

          <div className="asesor-card">
            <h3>Seguimiento</h3>
            <p>Revisa el progreso y acciones realizadas.</p>
          </div>

          <div className="asesor-card">
            <h3>Reportes</h3>
            <p>Genera reportes sobre las necesidades detectadas.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
