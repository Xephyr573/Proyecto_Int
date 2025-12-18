// src/pages/homepage/Director/DirectoraDashboard.js
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DirectoraDashboard.css";

// IMPORTANTE: esto debe calzar con App.js:
// <Route path="/director/validarajustes" element={<DirectorValidarAjustes />} />
const VALIDAR_AJUSTES_PATH = "/director/validarajustes";

const CASOS_DIRECTOR = [
  {
    id: "CASO-001",
    estudiante: "Alexander Torres",
    carrera: "Ingeniería en Informática",
    estado: "Pendiente",
    fecha: "2025-04-01",
    ajustesPropuestos: [
      "A1 – Amplificación de la letra (macrotipo) o imagen",
      "B1 – Ubicar al estudiante en un lugar estratégico dentro de la sala",
      "C1 – Dar mayor tiempo de respuesta y ejecución",
    ],
    resumen:
      "Caso con foco en dificultades visuales y atención. Se propone ampliar letra y ajustar ubicación en sala.",
  },
  {
    id: "CASO-002",
    estudiante: "Matias Soto",
    carrera: "Analista Programador",
    estado: "Aprobado",
    fecha: "2025-03-20",
    ajustesPropuestos: [
      "A4 – Ayudas tecnológicas para acceso a la información",
      "D5 – 25% tiempo extra en evaluaciones",
    ],
    resumen:
      "Caso aprobado en reunión anterior. Ajustes ya informados a docentes de la carrera.",
  },
  {
    id: "CASO-003",
    estudiante: "Benjamin Urra",
    carrera: "Ingeniería en Informática",
    estado: "Rechazado",
    fecha: "2025-03-10",
    ajustesPropuestos: ["D7 – 75% de tiempo extra en evaluaciones"],
    resumen:
      "Solicitud rechazada por exceder los criterios institucionales. Se definieron alternativas.",
  },
];

const MENSAJES_DIRECTOR = [
  {
    id: 1,
    asunto: "Nuevo caso derivado desde Asesoría",
    remitente: "Encargada de Inclusión",
    fecha: "01-04-2025",
  },
  {
    id: 2,
    asunto: "Recordatorio: validar ajustes pendientes",
    remitente: "Sistema SGAR",
    fecha: "28-03-2025",
  },
  {
    id: 3,
    asunto: "Consulta sobre criterios de validación",
    remitente: "Docente Bases de Datos",
    fecha: "25-03-2025",
  },
];

export default function DirectorDashboard() {
  const navigate = useNavigate();

  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [tabEstado, setTabEstado] = useState("Pendiente");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [comentario, setComentario] = useState("");

  const totalPendientes = useMemo(
    () => CASOS_DIRECTOR.filter((c) => c.estado === "Pendiente").length,
    []
  );
  const totalAprobados = useMemo(
    () => CASOS_DIRECTOR.filter((c) => c.estado === "Aprobado").length,
    []
  );
  const totalRechazados = useMemo(
    () => CASOS_DIRECTOR.filter((c) => c.estado === "Rechazado").length,
    []
  );

  const casosFiltrados = useMemo(() => {
    return CASOS_DIRECTOR.filter(
      (c) =>
        c.estado === tabEstado &&
        c.carrera.toLowerCase().includes(filtroCarrera.toLowerCase())
    );
  }, [tabEstado, filtroCarrera]);

  const casoPendientePrioritario = useMemo(() => {
    return CASOS_DIRECTOR.find((c) => c.estado === "Pendiente") || null;
  }, []);

  const abrirValidarAjustes = (caso) => {
    // Si quieres pasar data después:
    // navigate(VALIDAR_AJUSTES_PATH, { state: { caso } });
    navigate(VALIDAR_AJUSTES_PATH);
  };

  const handleAccionCaso = (nuevoEstado) => {
    if (!casoSeleccionado) return;

    alert(
      `Demostración:\n` +
        `Caso ${casoSeleccionado.id} marcado como ${nuevoEstado}.\n` +
        `Comentario:\n${comentario || "Sin comentario registrado."}`
    );

    setCasoSeleccionado(null);
    setComentario("");
  };

  return (
    <div className="dir-layout">
      <aside className="dir-sidebar">
        <div className="dir-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="dir-sidebar-logo"
          />
        </div>

        <div className="dir-sidebar-card">
          <span className="dir-sidebar-label">Rol</span>
          <p className="dir-sidebar-name">Directora de Carrera</p>
          <p className="dir-sidebar-sub">Sede Temuco</p>
        </div>

        <nav className="dir-sidebar-menu">
          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "resumen" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("resumen")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "casos" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("casos")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Casos por estado</span>
          </button>

          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "detalle" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("detalle")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Detalle y decisión</span>
          </button>
        </nav>
      </aside>

      <main className="dir-main">
        <header className="dir-main-header">
          <div>
            <h1>Panel Directora de Carrera</h1>
            <p className="dir-subtitle">
              Validación de ajustes razonables y revisión de historial de casos
              de la carrera.
            </p>

            <div className="dir-header-actions">
              <button
                type="button"
                className="dir-btn-primary"
                onClick={() => abrirValidarAjustes(casoSeleccionado)}
              >
                Ir a Validar Ajustes
              </button>

              <button
                type="button"
                className="dir-btn-secondary"
                onClick={() => setPestanaActiva("casos")}
              >
                Ver casos
              </button>
            </div>
          </div>

          <div className="dir-header-tags">
            <span className="dir-badge dir-badge-rol">Directora</span>
            <span className="dir-badge dir-badge-sede">Sede Temuco</span>
          </div>
        </header>

        <section className="dir-resumen-row">
          <div className="dir-resumen-card dir-resumen-pendiente">
            <span className="dir-resumen-label">Pendientes</span>
            <strong>{totalPendientes}</strong>
            <small>Casos a revisar</small>
          </div>
          <div className="dir-resumen-card dir-resumen-aprobado">
            <span className="dir-resumen-label">Aprobados</span>
            <strong>{totalAprobados}</strong>
            <small>Ajustes validados</small>
          </div>
          <div className="dir-resumen-card dir-resumen-rechazado">
            <span className="dir-resumen-label">Rechazados</span>
            <strong>{totalRechazados}</strong>
            <small>Con observaciones</small>
          </div>
        </section>

        {pestanaActiva === "resumen" && (
          <section className="dir-section">
            <div className="dir-grid">
              <div className="dir-card">
                <h3>Bandeja de mensajes</h3>
                <ul className="dir-mensajes-list">
                  {MENSAJES_DIRECTOR.map((m) => (
                    <li key={m.id}>
                      <div className="dir-mensaje-asunto">{m.asunto}</div>
                      <div className="dir-mensaje-meta">
                        <span>{m.remitente}</span>
                        <span>{m.fecha}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dir-card">
                <h3>Acciones rápidas</h3>

                <div className="dir-quick-actions">
                  <button
                    type="button"
                    className="dir-btn-primary"
                    onClick={() => abrirValidarAjustes(casoPendientePrioritario)}
                  >
                    Validar ajustes ahora
                  </button>

                  <button
                    type="button"
                    className="dir-btn-secondary"
                    onClick={() => setPestanaActiva("casos")}
                  >
                    Revisar bandeja de casos
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {pestanaActiva === "casos" && (
          <section className="dir-section">
            <div className="dir-card">
              <div className="dir-tabs">
                {["Pendiente", "Aprobado", "Rechazado"].map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    className={
                      "dir-tab" + (tabEstado === estado ? " dir-tab-active" : "")
                    }
                    onClick={() => setTabEstado(estado)}
                  >
                    {estado}
                  </button>
                ))}
              </div>

              <label className="dir-filter-label">
                Filtrar por carrera
                <input
                  type="text"
                  value={filtroCarrera}
                  onChange={(e) => setFiltroCarrera(e.target.value)}
                />
              </label>

              <div className="dir-table-wrapper">
                <table className="dir-table">
                  <thead>
                    <tr>
                      <th>Caso</th>
                      <th>Estudiante</th>
                      <th>Carrera</th>
                      <th>Fecha</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosFiltrados.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.estudiante}</td>
                        <td>{c.carrera}</td>
                        <td>{c.fecha}</td>
                        <td className="dir-table-actions">
                          <button
                            type="button"
                            className="dir-link"
                            onClick={() => {
                              setCasoSeleccionado(c);
                              setPestanaActiva("detalle");
                              setComentario("");
                            }}
                          >
                            Ver detalle
                          </button>
                          <button
                            type="button"
                            className="dir-link"
                            onClick={() => abrirValidarAjustes(c)}
                          >
                            Validar ajustes
                          </button>
                        </td>
                      </tr>
                    ))}
                    {casosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={5} className="dir-table-empty">
                          No hay casos con esos filtros.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {pestanaActiva === "detalle" && (
          <section className="dir-section">
            <div className="dir-card">
              {!casoSeleccionado ? (
                <div className="dir-empty">
                  <p className="dir-card-help" style={{ margin: 0 }}>
                    Selecciona un caso desde “Casos por estado”.
                  </p>
                </div>
              ) : (
                <>
                  <h3>{casoSeleccionado.id}</h3>
                  <p className="dir-card-help">
                    {casoSeleccionado.estudiante} · {casoSeleccionado.carrera}
                  </p>

                  <button
                    type="button"
                    className="dir-btn-primary"
                    onClick={() => abrirValidarAjustes(casoSeleccionado)}
                  >
                    Ir a Validar Ajustes
                  </button>

                  <textarea
                    className="dir-detalle-textarea"
                    rows={6}
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    placeholder="Comentario"
                    style={{ marginTop: 12 }}
                  />

                  <div className="dir-detalle-acciones">
                    <button
                      type="button"
                      className="dir-btn dir-btn-aprobar"
                      onClick={() => handleAccionCaso("Aprobado")}
                    >
                      Aprobar
                    </button>
                    <button
                      type="button"
                      className="dir-btn dir-btn-rechazar"
                      onClick={() => handleAccionCaso("Rechazado")}
                    >
                      Rechazar
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <footer className="dir-footer">
          © 2025 · SGAR Inclusión · Vista Directora de Carrera
        </footer>
      </main>
    </div>
  );
}
