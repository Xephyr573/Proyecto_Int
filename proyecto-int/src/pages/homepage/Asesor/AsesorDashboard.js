// src/pages/homepage/Asesor/AsesorDashboard.js
import { useState } from "react";
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
    estudiante: "Valentina Muñoz",
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
    estudiante: "Diego Fuentes",
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

const BLOQUES_CALENDARIO = [
  { id: 1, dia: "Lun 7", hora: "09:00 - 10:00" },
  { id: 2, dia: "Lun 7", hora: "10:00 - 11:00" },
  { id: 3, dia: "Mar 8", hora: "10:00 - 11:00" },
  { id: 4, dia: "Mié 9", hora: "15:00 - 16:00" },
  { id: 5, dia: "Jue 10", hora: "09:00 - 10:00" },
  { id: 6, dia: "Vie 11", hora: "11:00 - 12:00" },
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

  // Pestaña activa del panel
  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [filtroCarrera, setFiltroCarrera] = useState("");
  const [bloquesBloqueados, setBloquesBloqueados] = useState([]);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const totalCasos = CASOS_ASESOR.length;
  const enSeguimiento = CASOS_ASESOR.filter(
    (c) => c.estado === "En seguimiento"
  ).length;
  const derivados = CASOS_ASESOR.filter(
    (c) => c.estado === "Derivado a Directora"
  ).length;

  const casosFiltrados = CASOS_ASESOR.filter((c) => {
    const texto = `${c.id} ${c.estudiante} ${c.carrera}`.toLowerCase();
    const matchTexto = texto.includes(filtroBusqueda.toLowerCase());
    const matchCarrera = filtroCarrera ? c.carrera === filtroCarrera : true;
    return matchTexto && matchCarrera;
  });

  const carrerasUnicas = Array.from(new Set(CASOS_ASESOR.map((c) => c.carrera)));

  const handleToggleBloque = (idBloque) => {
    setBloquesBloqueados((prev) =>
      prev.includes(idBloque)
        ? prev.filter((b) => b !== idBloque)
        : [...prev, idBloque]
    );
  };

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

        <nav className="ases-sidebar-menu">
          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "resumen" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("resumen")}
          >
            <span className="ases-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "agenda" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("agenda")}
          >
            <span className="ases-sidebar-bullet" />
            <span>Agenda de entrevistas</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "casos" ? "ases-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("casos")}
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
          >
            <span className="ases-sidebar-bullet" />
            <span>Detalle de caso</span>
          </button>

          <button
            className={
              "ases-sidebar-item " +
              (pestanaActiva === "documentos"
                ? "ases-sidebar-item-active"
                : "")
            }
            onClick={() => setPestanaActiva("documentos")}
          >
            <span className="ases-sidebar-bullet" />
            <span>Documentos y formatos</span>
          </button>
        </nav>

        <div className="ases-sidebar-bottom">
          <button
            className="ases-sidebar-link"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="ases-main">
        {/* Header */}
        <header className="ases-main-header">
          <div>
            <h1>Panel Asesoría / CTP</h1>
            <p className="ases-main-subtitle">
              Administración de casos, entrevistas y coordinación con Encargada
              / Directora.
            </p>
          </div>
          <div className="ases-header-tags">
            <span className="ases-badge ases-badge-rol">
              Coordinadora Técnica Pedagógica
            </span>
            <span className="ases-badge ases-badge-sede">Sede Temuco</span>
          </div>
        </header>

        {/* Stats */}
        <section className="ases-stats-row">
          <div className="ases-stat-card ases-stat-activos">
            <span className="ases-stat-label">Casos activos</span>
            <strong className="ases-stat-value">{totalCasos}</strong>
            <small>Registrados en el semestre</small>
          </div>
          <div className="ases-stat-card ases-stat-seguimiento">
            <span className="ases-stat-label">En seguimiento</span>
            <strong className="ases-stat-value">{enSeguimiento}</strong>
            <small>Con observaciones recientes</small>
          </div>
          <div className="ases-stat-card ases-stat-derivados">
            <span className="ases-stat-label">Derivados a Dirección</span>
            <strong className="ases-stat-value">{derivados}</strong>
            <small>Esperando validación</small>
          </div>
        </section>

        {/* ========= CONTENIDO POR PESTAÑA ========= */}

        {/* 1) Resumen general */}
        {pestanaActiva === "resumen" && (
          <section className="ases-section">
            <div className="ases-grid">
              <div className="ases-card">
                <div className="ases-card-header">
                  <h3>Visión rápida de casos</h3>
                </div>
                <p className="ases-card-help">
                  Últimos casos registrados y su estado actual.
                </p>
                <ul className="ases-list-casos">
                  {CASOS_ASESOR.map((caso) => (
                    <li key={caso.id}>
                      <div>
                        <span className="ases-case-id">{caso.id}</span>
                        <p className="ases-case-title">
                          {caso.estudiante}
                        </p>
                        <p className="ases-case-meta">
                          {caso.carrera} · {caso.estado}
                        </p>
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
                <h3>Accesos rápidos</h3>
                <p className="ases-card-help">
                  Ingrese directamente a las pantallas clave del flujo SGAR.
                </p>
                <ul className="ases-list-simple">
                  <li>
                    <button
                      type="button"
                      className="ases-link"
                      onClick={() => navigate("/asesor/registrar-caso")}
                    >
                      Registrar nuevo caso
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="ases-link"
                      onClick={() => navigate("/asesor/definir-ajustes")}
                    >
                      Definir ajustes razonables
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="ases-link"
                      onClick={() => navigate("/asesor/seguimiento")}
                    >
                      Seguimiento semestral
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 2) Agenda de entrevistas */}
        {pestanaActiva === "agenda" && (
          <section className="ases-section">
            <div className="ases-card">
              <div className="ases-card-header">
                <h3>Agenda de entrevistas</h3>
                <button
                  type="button"
                  className="ases-btn-secondary"
                  onClick={() => navigate("/asesor/registrar-caso")}
                >
                  Registrar nuevo caso
                </button>
              </div>
              <p className="ases-card-help">
                Marca los bloques en los que ya tienes entrevistas agendadas o
                que quieras bloquear para evitar sobrecarga.
              </p>

              <div className="ases-calendar-legend">
                <span>
                  <span className="ases-legend-dot ases-legend-free" />{" "}
                  Disponible
                </span>
                <span>
                  <span className="ases-legend-dot ases-legend-busy" /> Bloqueado
                  / Entrevista
                </span>
              </div>

              <div className="ases-calendar-grid">
                {BLOQUES_CALENDARIO.map((bloque) => {
                  const bloqueado = bloquesBloqueados.includes(bloque.id);
                  return (
                    <button
                      key={bloque.id}
                      type="button"
                      className={
                        "ases-calendar-block" +
                        (bloqueado ? " ases-calendar-block-busy" : "")
                      }
                      onClick={() => handleToggleBloque(bloque.id)}
                    >
                      <span className="ases-calendar-day">
                        {bloque.dia}
                      </span>
                      <span className="ases-calendar-hour">
                        {bloque.hora}
                      </span>
                      <span className="ases-calendar-status">
                        {bloqueado ? "Bloqueado / Entrevista" : "Disponible"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 3) Casos y seguimiento */}
        {pestanaActiva === "casos" && (
          <section className="ases-section">
            <div className="ases-card">
              <h3>Casos registrados</h3>
              <p className="ases-card-help">
                Filtra por carrera o por nombre para revisar el seguimiento de
                cada caso.
              </p>

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
                        <td>{caso.id}</td>
                        <td>{caso.estudiante}</td>
                        <td>{caso.carrera}</td>
                        <td>
                          <span
                            className={
                              "ases-tag-estado " +
                              (caso.estado === "En entrevista"
                                ? "ases-tag-estado-entrevista"
                                : caso.estado === "En seguimiento"
                                ? "ases-tag-estado-seguimiento"
                                : caso.estado === "Derivado a Directora"
                                ? "ases-tag-estado-derivado"
                                : "ases-tag-estado-otro")
                            }
                          >
                            {caso.estado}
                          </span>
                        </td>
                        <td>{caso.fechaEntrevista}</td>
                        <td>
                          <span
                            className={
                              "ases-tag-asistencia " +
                              (caso.asistido
                                ? "ases-tag-asistencia-ok"
                                : "ases-tag-asistencia-no")
                            }
                          >
                            {caso.asistido ? "Asistido" : "No asistido"}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="ases-link"
                            onClick={() => {
                              setCasoSeleccionado(caso);
                              setPestanaActiva("detalle");
                            }}
                          >
                            Ver detalles
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

        {/* 4) Detalle de caso */}
        {pestanaActiva === "detalle" && (
          <section className="ases-section">
            <div className="ases-card">
              <h3>Detalle del caso seleccionado</h3>

              {!casoSeleccionado && (
                <p className="ases-card-help">
                  Selecciona un caso desde la pestaña “Casos y seguimiento” para
                  ver su resumen, agenda y archivos.
                </p>
              )}

              {casoSeleccionado && (
                <>
                  <div className="ases-case-header">
                    <div>
                      <span className="ases-case-id">
                        {casoSeleccionado.id}
                      </span>
                      <h4>{casoSeleccionado.estudiante}</h4>
                      <p className="ases-case-meta">
                        {casoSeleccionado.carrera} · Estado:{" "}
                        <strong>{casoSeleccionado.estado}</strong>
                      </p>
                    </div>
                    <div className="ases-case-fechas">
                      <p>
                        <strong>Entrevista inicial:</strong>{" "}
                        {casoSeleccionado.fechaEntrevista}
                      </p>
                      <p>
                        <strong>Próxima cita:</strong>{" "}
                        {casoSeleccionado.proximaCita}
                      </p>
                    </div>
                  </div>

                  <p className="ases-case-resumen">
                    {casoSeleccionado.resumen}
                  </p>

                  <div className="ases-case-actions">
                    <button
                      type="button"
                      className="ases-btn-primary"
                      onClick={() => navigate("/asesor/registrar-caso")}
                    >
                      Ver ficha de registro
                    </button>
                    <button
                      type="button"
                      className="ases-btn-primary-outline"
                      onClick={() => navigate("/asesor/definir-ajustes")}
                    >
                      Ver definición de ajustes
                    </button>
                    <button
                      type="button"
                      className="ases-btn-primary-outline"
                      onClick={() => navigate("/asesor/seguimiento")}
                    >
                      Ver seguimiento del caso
                    </button>
                  </div>

                  <div className="ases-case-files">
                    <h4>Archivos del caso</h4>
                    <p className="ases-card-help">
                      Ejemplo de documentos que la asesora puede cargar o
                      descargar (entrevistas, consentimientos, informes).
                    </p>
                    <ul>
                      {casoSeleccionado.archivos.map((archivo) => (
                        <li key={archivo}>
                          <span>{archivo}</span>
                          <button
                            type="button"
                            className="ases-link"
                            onClick={() => handleDescargarArchivo(archivo)}
                          >
                            Descargar (demo)
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

        {/* 5) Documentos y formatos */}
        {pestanaActiva === "documentos" && (
          <section className="ases-section">
            <div className="ases-card">
              <h3>Documentos y formatos</h3>
              <p className="ases-card-help">
                Plantillas base utilizadas por la Asesoría / CTP para entrevistas,
                consentimientos e informes. En una versión real se descargarían
                desde el repositorio oficial de la sede.
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
