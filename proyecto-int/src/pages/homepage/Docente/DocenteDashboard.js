// src/pages/homepage/Docente/DocenteDashboard.js
import "./DocenteDashboard.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function getDocenteFromStorage() {
  try {
    const raw = localStorage.getItem("user") || localStorage.getItem("usuario");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export default function DocenteDashboard() {
  const navigate = useNavigate();

  const docente = useMemo(() => getDocenteFromStorage(), []);
  const nombreDocente = docente?.nombre || docente?.name || "Docente";
  const correoDocente = docente?.correo || docente?.email || "docente@inacapmail.cl";
  const sede = docente?.sede || "Sede Temuco";
  const asignatura = docente?.asignatura || "Asignatura no definida";

  const stats = [
    { label: "Solicitudes pendientes", value: 3, hint: "Requieren revisión", tone: "warn" },
    { label: "Entrevistas esta semana", value: 2, hint: "Con estudiantes", tone: "info" },
    { label: "Asistencias registradas", value: "80%", hint: "Últimos 30 días", tone: "ok" },
    { label: "Reportes emitidos", value: 5, hint: "Rendimiento y seguimiento", tone: "neutral" },
  ];

  const actividad = [
    { id: 1, title: "Nueva solicitud recibida", meta: "Alexander Torres · Ajuste visual · Pendiente" },
    { id: 2, title: "Asistencia marcada", meta: "Entrevista · Matías Soto · Asistió" },
    { id: 3, title: "Reporte actualizado", meta: "Rendimiento semanal · Ingeniería en Informática" },
  ];

  return (
    <div className="doc-layout">
      {/* SIDEBAR */}
      <aside className="doc-sb">
        <div className="doc-sb-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="doc-sb-logo"
          />
        </div>

        <div className="doc-sb-card">
          <span className="doc-sb-label">Cuenta</span>
          <p className="doc-sb-name">{nombreDocente}</p>
          <p className="doc-sb-sub">{correoDocente}</p>
          <div className="doc-sb-chiprow">
            <span className="doc-chip">{sede}</span>
            <span className="doc-chip doc-chip-muted">{asignatura}</span>
          </div>
        </div>

        <nav className="doc-sb-menu">
          <button className="doc-sb-item doc-sb-item-active" type="button">
            <span className="doc-sb-dot" />
            <span>Panel docente</span>
          </button>

          <button
            className="doc-sb-item"
            type="button"
            onClick={() => navigate("/docente/solicitudes")}
          >
            <span className="doc-sb-dot" />
            <span>Solicitudes recibidas</span>
          </button>


          {/* Si ya tienes ruta creada, puedes activar este botón:
              onClick={() => navigate("/docente/perfil")} */}
          
        </nav>

        <div className="doc-sb-bottom">
          <button className="doc-sb-logout" type="button" onClick={() => navigate("/Docente")}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="doc-main">
        <header className="doc-topbar">
          <div>
            <h1>Panel Docente</h1>
            <p className="doc-subtitle">
              Gestión rápida de solicitudes.
            </p>
          </div>
          <div className="doc-topbar-tags">
            <span className="doc-badge">Docente</span>
            <span className="doc-badge doc-badge-muted">{sede}</span>
          </div>
        </header>

        <section className="doc-kpis">
          {stats.map((s) => (
            <div key={s.label} className={"doc-kpi doc-kpi-" + s.tone}>
              <span className="doc-kpi-label">{s.label}</span>
              <strong className="doc-kpi-value">{s.value}</strong>
              <small className="doc-kpi-hint">{s.hint}</small>
            </div>
          ))}
        </section>

        <section className="doc-grid">
          <button className="doc-card" type="button" onClick={() => navigate("/docente/solicitudes")}>
            <h3>Solicitudes recibidas</h3>
            <p>Revisa solicitudes y registra tu decisión o comentario docente.</p>
            <span className="doc-card-link">Abrir módulo</span>
          </button>
        </section>

        <section className="doc-section">
          <div className="doc-card-surface">
            <div className="doc-card-surface-header">
              <h3>Actividad reciente</h3>
              <span className="doc-muted">Últimas acciones</span>
            </div>
            <ul className="doc-activity">
              {actividad.map((a) => (
                <li key={a.id}>
                  <div className="doc-activity-title">{a.title}</div>
                  <div className="doc-activity-meta">{a.meta}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <footer className="doc-footer">© 2025 · SGAR Inclusión · Vista Docente</footer>
      </main>
    </div>
  );
}
