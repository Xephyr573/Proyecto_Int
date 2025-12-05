// src/pages/homepage/Director/DirectorDashboard.js
import { useState } from "react";
import "./DirectorDashboard.css";

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
  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [tabEstado, setTabEstado] = useState("Pendiente");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [comentario, setComentario] = useState("");

  const totalPendientes = CASOS_DIRECTOR.filter(
    (c) => c.estado === "Pendiente"
  ).length;
  const totalAprobados = CASOS_DIRECTOR.filter(
    (c) => c.estado === "Aprobado"
  ).length;
  const totalRechazados = CASOS_DIRECTOR.filter(
    (c) => c.estado === "Rechazado"
  ).length;

  const casosFiltrados = CASOS_DIRECTOR.filter(
    (c) =>
      c.estado === tabEstado &&
      c.carrera.toLowerCase().includes(filtroCarrera.toLowerCase())
  );

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
      {/* SIDEBAR */}
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

      {/* MAIN */}
      <main className="dir-main">
        <header className="dir-main-header">
          <div>
            <h1>Panel Directora de Carrera</h1>
            <p className="dir-subtitle">
              Validación de ajustes razonables y revisión de historial de casos
              de la carrera.
            </p>
          </div>
          <div className="dir-header-tags">
            <span className="dir-badge dir-badge-rol">Directora</span>
            <span className="dir-badge dir-badge-sede">Sede Temuco</span>
          </div>
        </header>

        {/* Resumen estados arriba siempre visible */}
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

        {/* CONTENIDO POR PESTAÑA */}

        {/* 1) Resumen general */}
        {pestanaActiva === "resumen" && (
          <section className="dir-section">
            <div className="dir-grid">
              <div className="dir-card">
                <h3>Bandeja de mensajes</h3>
                <p className="dir-card-help">
                  Mensajes enviados por asesoría, docentes y el sistema
                  relacionados con casos de la carrera.
                </p>

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
                <h3>Historial de casos</h3>
                <p className="dir-card-help">
                  Vista compacta de los casos y su estado actual.
                </p>
                <ul className="dir-historial-list">
                  {CASOS_DIRECTOR.map((c) => (
                    <li key={c.id}>
                      <span className="dir-historial-id">{c.id}</span>
                      <span className="dir-historial-text">
                        {c.estudiante} · {c.carrera} · {c.estado}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 2) Casos por estado */}
        {pestanaActiva === "casos" && (
          <section className="dir-section">
            <div className="dir-card">
              <h3>Casos por estado</h3>
              <p className="dir-card-help">
                Seleccione una pestaña para ver los casos pendientes, aprobados
                o rechazados. Puede filtrar por carrera.
              </p>

              <div className="dir-tabs">
                {["Pendiente", "Aprobado", "Rechazado"].map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    className={
                      "dir-tab" +
                      (tabEstado === estado ? " dir-tab-active" : "")
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
                  placeholder="Ej: Ingeniería en Informática"
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
                    {casosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={5} className="dir-table-empty">
                          No hay casos con estos filtros.
                        </td>
                      </tr>
                    )}
                    {casosFiltrados.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.estudiante}</td>
                        <td>{c.carrera}</td>
                        <td>{c.fecha}</td>
                        <td>
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 3) Detalle y decisión */}
        {pestanaActiva === "detalle" && (
          <section className="dir-section">
            <div className="dir-card">
              <h3>Detalle del caso y decisión</h3>

              {!casoSeleccionado && (
                <p className="dir-card-help">
                  Seleccione un caso desde la pestaña "Casos por estado" para
                  revisar los ajustes propuestos y registrar la decisión.
                </p>
              )}

              {casoSeleccionado && (
                <div className="dir-detalle-layout">
                  <div className="dir-detalle-col">
                    <div className="dir-detalle-header">
                      <div>
                        <h4>{casoSeleccionado.id}</h4>
                        <p className="dir-detalle-subtitle">
                          {casoSeleccionado.estudiante} ·{" "}
                          {casoSeleccionado.carrera}
                        </p>
                      </div>
                      <span className="dir-detalle-estado">
                        {casoSeleccionado.estado}
                      </span>
                    </div>

                    <h4 className="dir-detalle-title">Ajustes propuestos</h4>
                    <ul className="dir-ajustes-list">
                      {casoSeleccionado.ajustesPropuestos.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>

                    <p className="dir-detalle-resumen">
                      {casoSeleccionado.resumen}
                    </p>
                  </div>

                  <div className="dir-detalle-col">
                    <h4 className="dir-detalle-title">
                      Comentario de la Directora
                    </h4>
                    <textarea
                      className="dir-detalle-textarea"
                      rows={6}
                      placeholder="Escriba un comentario breve sobre este caso (por qué se aprueba o no se aprueba, condiciones, observaciones o acuerdos que se definen con la carrera)."
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                    />

                    <div className="dir-detalle-acciones">
                      <button
                        type="button"
                        className="dir-btn dir-btn-aprobar"
                        onClick={() => handleAccionCaso("Aprobado")}
                      >
                        Aprobar ajustes
                      </button>
                      <button
                        type="button"
                        className="dir-btn dir-btn-rechazar"
                        onClick={() => handleAccionCaso("Rechazado")}
                      >
                        No aprobar ajustes
                      </button>
                      <button
                        type="button"
                        className="dir-btn dir-btn-revision"
                        onClick={() =>
                          handleAccionCaso("Pendiente / En revisión")
                        }
                      >
                        Dejar en revisión
                      </button>
                    </div>
                  </div>
                </div>
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
