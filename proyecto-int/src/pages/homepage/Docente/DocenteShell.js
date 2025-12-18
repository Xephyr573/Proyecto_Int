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

export function DocenteShell({ active, title, subtitle, children }) {
  const navigate = useNavigate();
  const docente = useMemo(() => getDocenteFromStorage(), []);
  const nombre = docente?.nombre || docente?.name || "Docente";
  const correo = docente?.correo || docente?.email || "docente@inacapmail.cl";
  const sede = docente?.sede || "Sede Temuco";

  return (
    <div className="doc-layout">
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
          <p className="doc-sb-name">{nombre}</p>
          <p className="doc-sb-sub">{correo}</p>
          <div className="doc-sb-chiprow">
            <span className="doc-chip">{sede}</span>
          </div>
        </div>

        <nav className="doc-sb-menu">

          <button
            className={"doc-sb-item " + (active === "solicitudes" ? "doc-sb-item-active" : "")}
            type="button"
            onClick={() => navigate("/docente/solicitudes")}
          >
            <span className="doc-sb-dot" />
            <span>Solicitudes recibidas</span>
          </button>

          <button className="doc-sb-item" type="button" onClick={() => navigate(-1)} title="Volver">
            <span className="doc-sb-dot doc-sb-dot-muted" />
            <span>Volver</span>
          </button>
        </nav>

        <div className="doc-sb-bottom">
          <button className="doc-sb-logout" type="button" onClick={() => navigate("/Docente")}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="doc-main">
        <header className="doc-topbar">
          <div>
            <h1>{title}</h1>
            <p className="doc-subtitle">{subtitle}</p>
          </div>
          <div className="doc-topbar-tags">
            <span className="doc-badge">Docente</span>
            <span className="doc-badge doc-badge-muted">{sede}</span>
          </div>
        </header>

        {children}

        <footer className="doc-footer">© 2025 · SGAR Inclusión · Vista Docente</footer>
      </main>
    </div>
  );
}