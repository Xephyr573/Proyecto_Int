import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EncargadaDashboard.css";

// ================== DATOS DE EJEMPLO ==================
const CASOS_ENCARGADA = [
  {
    id: "CASO-001",
    estudiante: "Alexander Torres",
    carrera: "Ingeniería en Informática",
    estado: "En entrevista",
    fechaRegistro: "2025-04-01",
    origen: "Estudiante",
  },
  {
    id: "CASO-002",
    estudiante: "Valentina Muñoz",
    carrera: "Analista Programador",
    estado: "Derivado a CTP",
    fechaRegistro: "2025-03-30",
    origen: "Estudiante",
  },
  {
    id: "CASO-003",
    estudiante: "Diego Fuentes",
    carrera: "Ingeniería en Informática",
    estado: "Cerrado",
    fechaRegistro: "2025-03-20",
    origen: "Docente",
  },
];

const ARCHIVOS_FORMATOS = [
  "Formato_Ficha_Entrevista_Inicial.docx",
  "Consentimiento_Informado_Ajustes.pdf",
  "Plantilla_Informe_Derivacion.docx",
  "Resumen_Seguimiento_Semestral.xlsx",
];

// Calendario semanal simple (días x horas)
const DIAS_CALENDARIO = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const HORAS_CALENDARIO = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "15:00 - 16:00",
];

function crearAgendaInicial() {
  const agenda = {};
  DIAS_CALENDARIO.forEach((dia) => {
    agenda[dia] = {};
    HORAS_CALENDARIO.forEach((hora) => {
      agenda[dia][hora] = false; // false = disponible, true = bloqueado/entrevista
    });
  });
  // Ejemplo: marcamos algunos bloques como ya reservados
  agenda["Lun"]["11:00 - 12:00"] = true;
  agenda["Mar"]["10:00 - 11:00"] = true;
  agenda["Mié"]["09:00 - 10:00"] = true;
  return agenda;
}

export default function EncargadaDashboard() {
  const navigate = useNavigate();

  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [agendaBloques, setAgendaBloques] = useState(() =>
    crearAgendaInicial()
  );
  const [filtroTexto, setFiltroTexto] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const totalActivos = CASOS_ENCARGADA.filter(
    (c) => c.estado !== "Cerrado"
  ).length;
  const totalDerivadosCTP = CASOS_ENCARGADA.filter(
    (c) => c.estado === "Derivado a CTP"
  ).length;

  const casosFiltrados = CASOS_ENCARGADA.filter((c) =>
    `${c.id} ${c.estudiante} ${c.carrera}`
      .toLowerCase()
      .includes(filtroTexto.toLowerCase())
  );

  // Marcar / desmarcar un bloque del calendario
  const handleToggleCelda = (dia, hora) => {
    setAgendaBloques((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia],
        [hora]: !prev[dia][hora],
      },
    }));
  };

  const handleDescargarFormato = (nombre) => {
    alert(`Descarga de demostración: ${nombre}`);
  };

  return (
    <div className="enc-layout">
      {/* ========== SIDEBAR ========== */}
      <aside className="enc-sidebar">
        <div className="enc-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="enc-sidebar-logo"
          />
        </div>

        <div className="enc-sidebar-card">
          <span className="enc-sidebar-label">Rol</span>
          <p className="enc-sidebar-name">Encargada de Inclusión</p>
          <p className="enc-sidebar-sub">Sede Temuco</p>
        </div>

        <nav className="enc-sidebar-menu">
          <button
            className={
              "enc-sidebar-item " +
              (pestanaActiva === "resumen" ? "enc-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("resumen")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={
              "enc-sidebar-item " +
              (pestanaActiva === "agenda" ? "enc-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("agenda")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Agenda y horarios</span>
          </button>

          <button
            className={
              "enc-sidebar-item " +
              (pestanaActiva === "casos" ? "enc-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("casos")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Casos recientes</span>
          </button>

          <button
            className={
              "enc-sidebar-item " +
              (pestanaActiva === "detalle" ? "enc-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("detalle")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Detalle de caso</span>
          </button>

          <button
            className={
              "enc-sidebar-item " +
              (pestanaActiva === "documentos"
                ? "enc-sidebar-item-active"
                : "")
            }
            onClick={() => setPestanaActiva("documentos")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Documentos y formatos</span>
          </button>
        </nav>

        <div className="enc-sidebar-bottom">
          <button
            className="enc-sidebar-link"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="enc-main">
        {/* HEADER */}
        <header className="enc-main-header">
          <div>
            <h1>Panel Encargada de Inclusión</h1>
            <p className="enc-main-subtitle">
              Registro inicial de casos, agenda de entrevistas y envío a
              Coordinadora / Directora.
            </p>
          </div>
          <div className="enc-header-tags">
            <span className="enc-badge enc-badge-rol">
              Encargada de Inclusión
            </span>
            <span className="enc-badge enc-badge-sede">Sede Temuco</span>
          </div>
        </header>

        {/* STATS */}
        <section className="enc-stats-row">
          <div className="enc-stat-card enc-stat-activos">
            <span className="enc-stat-label">Casos activos</span>
            <strong className="enc-stat-value">{totalActivos}</strong>
            <small>En entrevista o derivados</small>
          </div>
          <div className="enc-stat-card enc-stat-derivados">
            <span className="enc-stat-label">Derivados a CTP</span>
            <strong className="enc-stat-value">{totalDerivadosCTP}</strong>
            <small>Pendientes de definición de ajustes</small>
          </div>
          <div className="enc-stat-card enc-stat-nuevo">
            <span className="enc-stat-label">Nuevo caso</span>
            <button
              type="button"
              className="enc-btn-primary"
              onClick={() => navigate("/asesor/registrar-caso")}
            >
              Registrar caso
            </button>
            <small>Abre la pantalla de registro</small>
          </div>
        </section>

        {/* ========== CONTENIDO POR PESTAÑA ========== */}

        {/* 1) Resumen general */}
        {pestanaActiva === "resumen" && (
          <section className="enc-section">
            <div className="enc-grid">
              <div className="enc-card">
                <div className="enc-card-header">
                  <h3>Últimos casos registrados</h3>
                </div>
                <p className="enc-card-help">
                  Vista rápida de los casos ingresados por la Encargada.
                </p>
                <ul className="enc-list-casos">
                  {CASOS_ENCARGADA.map((c) => (
                    <li key={c.id}>
                      <div>
                        <span className="enc-case-id">{c.id}</span>
                        <p className="enc-case-title">{c.estudiante}</p>
                        <p className="enc-case-meta">
                          {c.carrera} · {c.estado}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="enc-link"
                        onClick={() => {
                          setCasoSeleccionado(c);
                          setPestanaActiva("detalle");
                        }}
                      >
                        Ver detalle
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="enc-card">
                <h3>Accesos rápidos</h3>
                <p className="enc-card-help">
                  Atajos a las vistas que más utiliza la Encargada.
                </p>
                <ul className="enc-list-simple">
                  <li>
                    <button
                      type="button"
                      className="enc-link"
                      onClick={() => setPestanaActiva("agenda")}
                    >
                      Ver agenda semanal
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="enc-link"
                      onClick={() => setPestanaActiva("casos")}
                    >
                      Revisar casos recientes
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="enc-link"
                      onClick={() => setPestanaActiva("documentos")}
                    >
                      Revisar formatos oficiales
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 2) Agenda y horarios – calendario por días */}
        {pestanaActiva === "agenda" && (
          <section className="enc-section">
            <div className="enc-card">
              <div className="enc-card-header">
                <h3>Agenda y bloqueo de horarios</h3>
              </div>
              <p className="enc-card-help">
                Selecciona los bloques de cada día para marcar si están
                disponibles o bloqueados por entrevistas.
              </p>

              <div className="enc-calendar-legend">
                <span>
                  <span className="enc-legend-dot enc-legend-free" /> Disponible
                </span>
                <span>
                  <span className="enc-legend-dot enc-legend-busy" /> Bloqueado /
                  Entrevista
                </span>
              </div>

              <div className="enc-calendar-table-wrapper">
                <table className="enc-calendar-table">
                  <thead>
                    <tr>
                      <th>Hora / Día</th>
                      {DIAS_CALENDARIO.map((dia) => (
                        <th key={dia}>{dia}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HORAS_CALENDARIO.map((hora) => (
                      <tr key={hora}>
                        <td className="enc-calendar-hour-col">{hora}</td>
                        {DIAS_CALENDARIO.map((dia) => {
                          const ocupado = agendaBloques[dia][hora];
                          return (
                            <td key={dia}>
                              <button
                                type="button"
                                className={
                                  "enc-calendar-cell" +
                                  (ocupado ? " enc-calendar-cell-busy" : "")
                                }
                                onClick={() => handleToggleCelda(dia, hora)}
                              >
                                {ocupado ? "Bloqueado" : "Disponible"}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* 3) Casos recientes */}
        {pestanaActiva === "casos" && (
          <section className="enc-section">
            <div className="enc-card">
              <h3>Casos recientes</h3>
              <p className="enc-card-help">
                Busca casos por nombre, código o carrera para revisar su estado
                y derivarlos a coordinación.
              </p>

              <input
                type="text"
                className="enc-busqueda-input"
                placeholder="Buscar por estudiante, caso o carrera"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
              />

              <div className="enc-table-wrapper">
                <table className="enc-table">
                  <thead>
                    <tr>
                      <th>Caso</th>
                      <th>Estudiante</th>
                      <th>Carrera</th>
                      <th>Estado</th>
                      <th>Registro</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={6} className="enc-table-empty">
                          No hay casos con estos filtros.
                        </td>
                      </tr>
                    )}
                    {casosFiltrados.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.estudiante}</td>
                        <td>{c.carrera}</td>
                        <td>{c.estado}</td>
                        <td>{c.fechaRegistro}</td>
                        <td>
                          <button
                            type="button"
                            className="enc-link"
                            onClick={() => {
                              setCasoSeleccionado(c);
                              setPestanaActiva("detalle");
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

        {/* 4) Detalle de caso */}
        {pestanaActiva === "detalle" && (
          <section className="enc-section">
            <div className="enc-card">
              <h3>Detalle de caso</h3>

              {!casoSeleccionado && (
                <p className="enc-card-help">
                  Selecciona un caso desde “Casos recientes” o desde el
                  “Resumen general” para ver el detalle antes de derivar a la
                  Coordinadora Técnica Pedagógica.
                </p>
              )}

              {casoSeleccionado && (
                <div className="enc-detalle">
                  <div className="enc-detalle-header">
                    <div>
                      <span className="enc-detalle-id">
                        {casoSeleccionado.id}
                      </span>
                      <h4>{casoSeleccionado.estudiante}</h4>
                      <p className="enc-detalle-meta">
                        {casoSeleccionado.carrera} · Origen:{" "}
                        {casoSeleccionado.origen}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="enc-btn-cerrar"
                      onClick={() => setCasoSeleccionado(null)}
                    >
                      Cerrar
                    </button>
                  </div>

                  <p className="enc-detalle-text">
                    Este bloque representa el detalle básico del caso registrado
                    por la Encargada. Aquí se puede complementar información
                    antes de derivar a la Coordinadora Técnica Pedagógica.
                  </p>

                  <div className="enc-detalle-actions">
                    <button
                      type="button"
                      className="enc-btn-primary"
                      onClick={() => navigate("/asesor/registrar-caso")}
                    >
                      Abrir ficha de registro
                    </button>
                    <button
                      type="button"
                      className="enc-btn-secondary"
                      onClick={() => setPestanaActiva("agenda")}
                    >
                      Ver agenda semanal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5) Documentos y formatos */}
        {pestanaActiva === "documentos" && (
          <section className="enc-section">
            <div className="enc-card">
              <h3>Documentos y formatos</h3>
              <p className="enc-card-help">
                Plantillas base utilizadas para entrevistas, consentimientos e
                informes. En producción se descargarían desde el repositorio
                oficial de la sede.
              </p>

              <ul className="enc-formatos-list">
                {ARCHIVOS_FORMATOS.map((f) => (
                  <li key={f} className="enc-doc-item">
                    <div className="enc-doc-info">
                      <span className="enc-doc-dot" />
                      <span className="enc-doc-name">{f}</span>
                    </div>
                    <button
                      type="button"
                      className="enc-doc-link"
                      onClick={() => handleDescargarFormato(f)}
                    >
                      Descargar (demo)
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="enc-footer">
          © 2025 · SGAR Inclusión · Vista Encargada
        </footer>
      </main>
    </div>
  );
}
