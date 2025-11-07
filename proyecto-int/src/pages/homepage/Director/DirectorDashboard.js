import "./DirectorDashboard.css";
import { Link, useNavigate } from "react-router-dom";

export default function DirectorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="dir-wrapper">
      <header className="dir-header">
        <h1>Panel del Director</h1>
        <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
      </header>

      <main className="dir-main">
        <section className="dir-summary">
          <h2>Resumen General</h2>
          <p>Supervisa el funcionamiento académico, solicitudes y reportes globales.</p>
        </section>

        <div className="dir-grid">
          <Link className="dir-card" to="/director/reportes">
            <h3>Reportes Generales</h3>
            <p>Consulta estadísticas de asistencia y rendimiento.</p>
          </Link>

          <Link className="dir-card" to="/director/solicitudes">
            <h3>Solicitudes</h3>
            <p>Revisa y aprueba solicitudes de ajustes razonables.</p>
          </Link>

          <Link className="dir-card" to="/director/docentes">
            <h3>Docentes</h3>
            <p>Gestiona información y desempeño docente.</p>
          </Link>
        </div>
      </main>

      <footer className="dir-footer">© 2025 · INACAP</footer>
    </div>
  );
}
