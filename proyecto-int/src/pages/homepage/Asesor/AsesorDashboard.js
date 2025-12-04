import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AsesorDashboard.css";

// TODO: backend: reemplazar estos arreglos por datos reales desde la API
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

export default function AsesorDashboard() {
  const navigate = useNavigate();

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
    const matchCarrera = filtroCarrera
      ? c.carrera === filtroCarrera
      : true;
    return matchTexto && matchCarrera;
  });

  const handleToggleBloque = (idBloque) => {
    setBloquesBloqueados((prev) =>
      prev.includes(idBloque)
        ? prev.filter((b) => b !== idBloque)
        : [...prev, idBloque]
    );
  };

  const handleDescargarArchivo = (nombreArchivo) => {
    // TODO: backend: aquí iría la descarga real del archivo
    alert(`Descarga de demostración: ${nombreArchivo}`);
  };

  const carrerasUnicas = Array.from(
    new Set(CASOS_ASESOR.map((c) => c.carrera))
  );

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div>
          <h2>Panel Asesoría / CTP</h2>
          <p className="dash-subtitle">
            Gestión de casos, agenda de entrevistas y seguimiento
            semestral de ajustes razonables.
          </p>
        </div>
        <div className="dash-header-tags">
          <span className="dash-badge dash-badge-rol">
            Coordinadora Técnica Pedagógica
          </span>
          <span className="dash-badge dash-badge-sede">
            Sede Temuco
          </span>
        </div>
      </header>

      {/* Estadísticas rápidas */}
      <section className="dash-row dash-row-mb">
        <div className="dash-stat-card stat-activos">
          <span className="dash-stat-label">Casos activos</span>
          <strong className="dash-stat-value">{totalCasos}</strong>
          <small>Registrados en el semestre</small>
        </div>
        <div className="dash-stat-card stat-seguimiento">
          <span className="dash-stat-label">En seguimiento</span>
          <strong className="dash-stat-value">{enSeguimiento}</strong>
          <small>Con observaciones recientes</small>
        </div>
        <div className="dash-stat-card stat-derivados">
          <span className="dash-stat-label">Derivados a Dirección</span>
          <strong className="dash-stat-value">{derivados}</strong>
          <small>Esperando validación</small>
        </div>
      </section>

      <div className="dash-main-grid">
        {/* Columna izquierda: calendario + lista de casos */}
        <section className="dash-column">
          <div className="dash-card">
            <div className="dash-card-header">
              <h3>Agenda de entrevistas</h3>
              <button
                type="button"
                className="dash-btn-secondary"
                onClick={() => navigate("/asesor/registrar-caso")}
              >
                Registrar nuevo caso
              </button>
            </div>
            <p className="dash-card-help">
              Selecciona bloques horarios para marcar entrevistas ya
              tomadas o bloquear horarios no disponibles.
            </p>

            <div className="dash-calendar-grid">
              {BLOQUES_CALENDARIO.map((bloque) => {
                const bloqueado = bloquesBloqueados.includes(bloque.id);
                return (
                  <button
                    key={bloque.id}
                    type="button"
                    className={
                      "dash-calendar-block" +
                      (bloqueado ? " dash-calendar-block-busy" : "")
                    }
                    onClick={() => handleToggleBloque(bloque.id)}
                  >
                    <span className="dash-calendar-day">
                      {bloque.dia}
                    </span>
                    <span className="dash-calendar-hour">
                      {bloque.hora}
                    </span>
                    <span className="dash-calendar-status">
                      {bloqueado ? "Bloqueado / Entrevista" : "Disponible"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="dash-card">
            <h3>Casos registrados</h3>
            <p className="dash-card-help">
              Filtra por carrera o por nombre para revisar el
              seguimiento de cada caso.
            </p>

            <div className="dash-filters">
              <input
                type="text"
                placeholder="Buscar por caso, estudiante o carrera"
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
              />
              <select
                value={filtroCarrera}
                onChange={(e) => setFiltroCarrera(e.target.value)}
              >
                <option value="">Todas las carreras</option>
                {carrerasUnicas.map((carrera) => (
                  <option key={carrera} value={carrera}>
                    {carrera}
                  </option>
                ))}
              </select>
            </div>

            <div className="dash-table-wrapper">
              <table className="dash-table">
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
                      <td colSpan={7} className="dash-table-empty">
                        No hay casos con estos filtros.
                      </td>
                    </tr>
                  )}
                  {casosFiltrados.map((caso) => (
                    <tr key={caso.id}>
                      <td>{caso.id}</td>
                      <td>{caso.estudiante}</td>
                      <td>{caso.carrera}</td>
                      <td>{caso.estado}</td>
                      <td>{caso.fechaEntrevista}</td>
                      <td>
                        <span
                          className={
                            "dash-tag-asistencia " +
                            (caso.asistido
                              ? "dash-tag-asistencia-ok"
                              : "dash-tag-asistencia-no")
                          }
                        >
                          {caso.asistido ? "Asistido" : "No asistido"}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="dash-link"
                          onClick={() => setCasoSeleccionado(caso)}
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

        {/* Columna derecha: detalle de caso y archivos */}
        <section className="dash-column">
          <div className="dash-card">
            <h3>Detalle del caso seleccionado</h3>
            {!casoSeleccionado && (
              <p className="dash-card-help">
                Selecciona un caso de la tabla para ver su resumen,
                agenda y acceder rápidamente a las pantallas de Registro,
                Definición de ajustes y Seguimiento.
              </p>
            )}

            {casoSeleccionado && (
              <>
                <div className="dash-case-header">
                  <div>
                    <span className="dash-case-id">
                      {casoSeleccionado.id}
                    </span>
                    <h4>{casoSeleccionado.estudiante}</h4>
                    <p className="dash-case-meta">
                      {casoSeleccionado.carrera} · Estado:{" "}
                      <strong>{casoSeleccionado.estado}</strong>
                    </p>
                  </div>
                  <div className="dash-case-fechas">
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

                <p className="dash-case-resumen">
                  {casoSeleccionado.resumen}
                </p>

                <div className="dash-case-actions">
                  <button
                    type="button"
                    className="dash-btn-primary"
                    onClick={() => navigate("/asesor/registrar-caso")}
                  >
                    Ver ficha de registro
                  </button>
                  <button
                    type="button"
                    className="dash-btn-primary-outline"
                    onClick={() => navigate("/asesor/definir-ajustes")}
                  >
                    Ver definición de ajustes
                  </button>
                  <button
                    type="button"
                    className="dash-btn-primary-outline"
                    onClick={() => navigate("/asesor/seguimiento")}
                  >
                    Ver seguimiento del caso
                  </button>
                </div>

                <div className="dash-case-files">
                  <h4>Archivos del caso</h4>
                  <p className="dash-card-help">
                    Ejemplo de documentos que la asesora puede cargar o
                    descargar (entrevistas, consentimientos, informes).
                  </p>
                  <ul>
                    {casoSeleccionado.archivos.map((archivo) => (
                      <li key={archivo}>
                        <span>{archivo}</span>
                        <button
                          type="button"
                          className="dash-link"
                          onClick={() =>
                            handleDescargarArchivo(archivo)
                          }
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
      </div>
    </div>
  );
}
