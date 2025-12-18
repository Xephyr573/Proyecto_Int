// src/pages/homepage/Asesor/AsesorDashboard.js
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AsesorDashboard.css";

// Datos de ejemplo: después los reemplazas por API
const CASOS_ASESOR = [
  {
    id: "CASO-001",
    estudiante: "Alexander Torres",
    carrera: "Ingeniería en Informática",
    estado: "En entrevista",
    fechaEntrevista: "2025-04-03 10:00",
    asistido: true,
    proximaCita: "2025-04-10 10:00",
    resumen:
      "Caso priorizado por dificultades visuales y atención en clases. Entrevista inicial realizada.",
    archivos: [
      "Ficha_entrevista_CASO-001.pdf",
      "Informe_derivacion_CASO-001.docx",
    ],
  },
  {
    id: "CASO-002",
    estudiante: "Matias Soto",
    carrera: "Analista Programador",
    estado: "En seguimiento",
    fechaEntrevista: "2025-04-02 15:30",
    asistido: false,
    proximaCita: "2025-04-09 15:30",
    resumen:
      "Caso por situación de salud mental. Se coordinan ajustes temporales en evaluaciones.",
    archivos: [
      "Ficha_entrevista_CASO-002.pdf",
      "Acuerdo_ajustes_CASO-002.pdf",
    ],
  },
  {
    id: "CASO-003",
    estudiante: "Benjamin Urra",
    carrera: "Ingeniería en Informática",
    estado: "Derivado a Directora",
    fechaEntrevista: "2025-03-25 09:30",
    asistido: true,
    proximaCita: "-",
    resumen:
      "Solicitud de aumento de tiempo en evaluaciones y adecuaciones de horario. Derivado para validación.",
    archivos: ["Ficha_entrevista_CASO-003.pdf"],
  },
    {
    id: "CASO-003",
    estudiante: "Benjamin Urra",
    carrera: "Ingeniería en Informática",
    estado: "Derivado a Directora",
    fechaEntrevista: "2025-03-25 09:30",
    asistido: true,
    proximaCita: "-",
    resumen:
      "Solicitud de aumento de tiempo en evaluaciones y adecuaciones de horario. Derivado para validación.",
    archivos: ["Ficha_entrevista_CASO-003.pdf"],
  },
];

// Plantillas para la pestaña "Documentos y formatos"
const DOCUMENTOS_PLANTILLAS = [
  "Formato_Ficha_Entrevista_Inicial.docx",
  "Consentimiento_Informado_Ajustes.pdf",
  "Plantilla_Informe_Derivacion.docx",
  "Resumen_Seguimiento_Semestral.xlsx",
];

export default function AsesorDashboard() {
  const navigate = useNavigate();

  // pestañas (se elimina agenda)
  const [pestanaActiva, setPestanaActiva] = useState("resumen");

  // filtros
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const carrerasUnicas = useMemo(
    () => Array.from(new Set(CASOS_ASESOR.map((c) => c.carrera))),
    []
  );

  const estadosUnicos = useMemo(
    () => Array.from(new Set(CASOS_ASESOR.map((c) => c.estado))),
    []
  );

  const stats = useMemo(() => {
    const total = CASOS_ASESOR.length;
    const enEntrevista = CASOS_ASESOR.filter((c) => c.estado === "En entrevista").length;
    const enSeguimiento = CASOS_ASESOR.filter((c) => c.estado === "En seguimiento").length;
    const derivados = CASOS_ASESOR.filter((c) => c.estado === "Derivado a Directora").length;
    const noAsistidos = CASOS_ASESOR.filter((c) => c.asistido === false).length;
    return { total, enEntrevista, enSeguimiento, derivados, noAsistidos };
  }, []);

  const casosFiltrados = useMemo(() => {
    return CASOS_ASESOR.filter((c) => {
      const texto = `${c.id} ${c.estudiante} ${c.carrera}`.toLowerCase();
      const matchTexto = texto.includes(filtroBusqueda.toLowerCase());
      const matchCarrera = filtroCarrera ? c.carrera === filtroCarrera : true;
      const matchEstado = filtroEstado ? c.estado === filtroEstado : true;
      return matchTexto && matchCarrera && matchEstado;
    });
  }, [filtroBusqueda, filtroCarrera, filtroEstado]);


  const handleDescargarArchivo = (nombreArchivo) => {
    alert(`Descarga de demostración: ${nombreArchivo}`);
  };

  return (
    <div className="ases-layout">
      {/* ========== SIDEBAR ========== */}
      <aside className="ases-sidebar">
        <div className="ases-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="ases-sidebar-logo"
          />
        </div>

        <div className="ases-sidebar-card">
          <span className="ases-sidebar-label">Rol</span>
          <p className="ases-sidebar-name">Asesoría / CTP</p>
          <p className="ases-sidebar-sub">Sede Temuco</p>
        </div>

        
        <div className="ases-sidebar-top-actions">
          <button className="ases-sidebar-link" onClick={() => navigate("/")}> 
            Volver al inicio
          </button>
        </div>

<nav className="ases-sidebar-menu">
          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "resumen" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("resumen")}
            type="button"
          >
            <span className="ases-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "casos" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("casos")}
            type="button"
          >
            <span className="ases-sidebar-bullet" />
            <span>Casos y seguimiento</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "detalle" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("detalle")}
            type="button"
          >
            <span className="ases-sidebar-bullet" />
            <span>Detalle de caso</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "documentos" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("documentos")}
            type="button"
          >
            <span className="ases-sidebar-bullet" />
            <span>Documentos y formatos</span>
          </button>
        </nav>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="ases-main">
        {/* Header */}
        <header className="ases-main-header">
          <div className="ases-header-left">
            <h1>Panel Asesoría / CTP</h1>
            <p className="ases-main-subtitle">
              Gestión de casos, derivaciones y documentación del flujo SGAR.
            </p>
          </div>

          <div className="ases-header-right">
            <div className="ases-header-tags">
              <span className="ases-badge ases-badge-rol">Coordinadora Técnica Pedagógica</span>
              <span className="ases-badge ases-badge-sede">Sede Temuco</span>
            </div>

            <div className="ases-header-actions">
              <button
                type="button"
                className={`ases-btn-secondary ${pestanaActiva === "casos" ? "ases-btn-active" : ""}`}
                onClick={() => setPestanaActiva("casos")}
              >
                Ver casos
              </button>
              <button
                type="button"
                className={`ases-btn-secondary ${pestanaActiva === "documentos" ? "ases-btn-active" : ""}`}
                onClick={() => setPestanaActiva("documentos")}
              >
                Documentos
              </button>
            </div>
          </div>
        </header>

        {/* Stats */}
        <section className="ases-stats-row">
          <div className="ases-stat-card ases-stat-total">
            <span className="ases-stat-label">Total casos</span>
            <strong className="ases-stat-value">{stats.total}</strong>
            <small>Registrados en el período</small>
          </div>

          <div className="ases-stat-card ases-stat-entrevista">
            <span className="ases-stat-label">En entrevista</span>
            <strong className="ases-stat-value">{stats.enEntrevista}</strong>
            <small>Entrevistas en curso</small>
          </div>

          <div className="ases-stat-card ases-stat-seguimiento">
            <span className="ases-stat-label">En seguimiento</span>
            <strong className="ases-stat-value">{stats.enSeguimiento}</strong>
            <small>Con acciones activas</small>
          </div>

          <div className="ases-stat-card ases-stat-derivados">
            <span className="ases-stat-label">Derivados</span>
            <strong className="ases-stat-value">{stats.derivados}</strong>
            <small>Esperando validación</small>
          </div>

          <div className="ases-stat-card ases-stat-alerta">
            <span className="ases-stat-label">No asistidos</span>
            <strong className="ases-stat-value">{stats.noAsistidos}</strong>
            <small>Requiere re-agendamiento</small>
          </div>
        </section>

        {/* ========= CONTENIDO POR PESTAÑA ========= */}

        {/* 1) Resumen */}
        {pestanaActiva === "resumen" && (
          <section className="ases-section">
            <div className="ases-grid">
              <div className="ases-card">
                <div className="ases-card-header">
                  <h3>Actividad reciente</h3>
                </div>
                <p className="ases-card-help">
                  Vista rápida de los últimos casos y su estado actual.
                </p>

                <ul className="ases-list-casos">
                  {CASOS_ASESOR.map((caso) => (
                    <li key={caso.id}>
                      <div className="ases-case-left">
                        <span className="ases-case-id">{caso.id}</span>
                        <div className="ases-case-text">
                          <p className="ases-case-title">{caso.estudiante}</p>
                          <p className="ases-case-meta">
                            {caso.carrera} ·{" "}
                            <span className={"ases-pill " + pillEstado(caso.estado)}>
                              {caso.estado}
                            </span>
                          </p>
                        </div>
                      </div>

                      <button
                        className="ases-link"
                        type="button"
                        onClick={() => {
                          setCasoSeleccionado(caso);
                          setPestanaActiva("detalle");
                        }}
                      >
                        Ver detalle
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ases-card">
                <h3>Accesos operativos</h3>
                <p className="ases-card-help">
                  Atajos a las pantallas que forman parte del flujo del caso.
                </p>

                <div className="ases-quick-actions">
                  <button
                    type="button"
                    className="ases-quick-card"
                    onClick={() => navigate("/asesor/definir-ajustes")}
                  >
                    <div className="ases-quick-title">Definir ajustes razonables</div>
                    <div className="ases-quick-sub">Seleccionar ajustes (A, B, C, D)</div>
                  </button>
                  <button
                    type="button"
                    className="ases-quick-card"
                    onClick={() => setPestanaActiva("documentos")}
                  >
                    <div className="ases-quick-title">Documentos y formatos</div>
                    <div className="ases-quick-sub">Plantillas y descargas</div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2) Casos */}
        {pestanaActiva === "casos" && (
          <section className="ases-section">
            <div className="ases-card">
              <div className="ases-card-header">
                <div>
                  <h3>Casos registrados</h3>
                  <p className="ases-card-help">
                    Filtra por estudiante, caso, carrera o estado para revisar el seguimiento.
                  </p>
                </div>
              </div>

              <div className="ases-filters">
                <div className="ases-filter-field">
                  <label>Buscar</label>
                  <input
                    type="text"
                    placeholder="Caso, estudiante o carrera"
                    value={filtroBusqueda}
                    onChange={(e) => setFiltroBusqueda(e.target.value)}
                  />
                </div>

                <div className="ases-filter-field">
                  <label>Carrera</label>
                  <select
                    value={filtroCarrera}
                    onChange={(e) => setFiltroCarrera(e.target.value)}
                  >
                    <option value="">Todas</option>
                    {carrerasUnicas.map((carrera) => (
                      <option key={carrera} value={carrera}>
                        {carrera}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="ases-filter-field">
                  <label>Estado</label>
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value)}
                  >
                    <option value="">Todos</option>
                    {estadosUnicos.map((estado) => (
                      <option key={estado} value={estado}>
                        {estado}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="ases-table-wrapper">
                <table className="ases-table">
                  <thead>
                    <tr>
                      <th>Caso</th>
                      <th>Estudiante</th>
                      <th>Carrera</th>
                      <th>Estado</th>
                      <th>Entrevista</th>
                      <th>Asistencia</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={7} className="ases-table-empty">
                          No hay casos con estos filtros.
                        </td>
                      </tr>
                    )}

                    {casosFiltrados.map((caso) => (
                      <tr
                        key={caso.id}
                        className={
                          casoSeleccionado?.id === caso.id
                            ? "ases-table-row-selected"
                            : ""
                        }
                      >
                        <td className="ases-td-strong">{caso.id}</td>
                        <td>{caso.estudiante}</td>
                        <td>{caso.carrera}</td>
                        <td>
                          <span className={"ases-pill " + pillEstado(caso.estado)}>
                            {caso.estado}
                          </span>
                        </td>
                        <td>{caso.fechaEntrevista}</td>
                        <td>
                          <span className={"ases-pill " + (caso.asistido ? "ases-pill-ok" : "ases-pill-warn")}>
                            {caso.asistido ? "Asistido" : "No asistido"}
                          </span>
                        </td>
                        <td className="ases-td-action">
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="ases-table-foot">
                <span>
                  Mostrando <strong>{casosFiltrados.length}</strong> de{" "}
                  <strong>{CASOS_ASESOR.length}</strong>
                </span>
                <button
                  type="button"
                  className="ases-btn-secondary"
                  onClick={() => {
                    setFiltroBusqueda("");
                    setFiltroCarrera("");
                    setFiltroEstado("");
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 3) Detalle */}
        {pestanaActiva === "detalle" && (
          <section className="ases-section">
            <div className="ases-card">
              <div className="ases-card-header">
                <h3>Detalle del caso</h3>
              </div>

              {!casoSeleccionado && (
                <p className="ases-card-help">
                  Selecciona un caso desde “Casos y seguimiento” o desde “Resumen general”.
                </p>
              )}

              {casoSeleccionado && (
                <>
                  <div className="ases-detail-top">
                    <div className="ases-detail-title">
                      <span className="ases-case-id">{casoSeleccionado.id}</span>
                      <div>
                        <h4 className="ases-detail-name">{casoSeleccionado.estudiante}</h4>
                        <p className="ases-detail-meta">
                          {casoSeleccionado.carrera} ·{" "}
                          <span className={"ases-pill " + pillEstado(casoSeleccionado.estado)}>
                            {casoSeleccionado.estado}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="ases-detail-dates">
                      <div className="ases-detail-chip">
                        <span className="ases-detail-chip-label">Entrevista inicial</span>
                        <span className="ases-detail-chip-value">{casoSeleccionado.fechaEntrevista}</span>
                      </div>
                      <div className="ases-detail-chip">
                        <span className="ases-detail-chip-label">Próxima cita</span>
                        <span className="ases-detail-chip-value">{casoSeleccionado.proximaCita}</span>
                      </div>
                    </div>
                  </div>

                  <div className="ases-detail-body">
                    <h4 className="ases-detail-section-title">Resumen</h4>
                    <p className="ases-case-resumen">{casoSeleccionado.resumen}</p>

                    <div className="ases-detail-actions">
                      <button
                        type="button"
                        className="ases-btn-primary-outline"
                        onClick={() => navigate("/asesor/definir-ajustes")}
                      >
                        Ir a definición de ajustes
                      </button>

                      <button
                        type="button"
                        className="ases-btn-secondary"
                        onClick={() => {
                          setCasoSeleccionado(null);
                          setPestanaActiva("casos");
                        }}
                      >
                        Volver a casos
                      </button>
                    </div>
                  </div>

                  <div className="ases-case-files">
                    <h4>Archivos del caso</h4>
                    <p className="ases-card-help">
                      Documentos asociados al caso (entrevista, informes, acuerdos, etc.).
                    </p>

                  <ul className="ases-files-list">
                   {casoSeleccionado.archivos.map((archivo) => (
                    <li key={archivo} className="ases-files-item">
                     <span className="ases-file-name">{archivo}</span>

                     <button
                      type="button"
                      className="ases-doc-link"
                      onClick={() => handleDescargarArchivo(archivo)}
                     >
                      Descargar
                   </button>
                 </li>
               ))}
            </ul>

                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* 4) Documentos */}
        {pestanaActiva === "documentos" && (
          <section className="ases-section">
            <div className="ases-card">
              <div className="ases-card-header">
                <h3>Documentos y formatos</h3>
              </div>
              <p className="ases-card-help">
                Plantillas base utilizadas por la Asesoría / CTP para entrevistas,
                consentimientos e informes.
              </p>

              <ul className="ases-doc-list">
                {DOCUMENTOS_PLANTILLAS.map((doc) => (
                  <li key={doc} className="ases-doc-item">
                    <div className="ases-doc-info">
                      <span className="ases-doc-dot" />
                      <span className="ases-doc-name">{doc}</span>
                    </div>
                    <button
                      type="button"
                      className="ases-doc-link"
                      onClick={() => handleDescargarArchivo(doc)}
                    >
                      Descargar (demo)
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="ases-footer">
          © 2025 · SGAR Inclusión · Vista Asesoría / CTP
        </footer>
      </main>
    </div>
  );
}

function pillEstado(estado) {
  if (estado === "En entrevista") return "ases-pill-info";
  if (estado === "En seguimiento") return "ases-pill-amber";
  if (estado === "Derivado a Directora") return "ases-pill-pink";
  return "ases-pill-neutral";
}
