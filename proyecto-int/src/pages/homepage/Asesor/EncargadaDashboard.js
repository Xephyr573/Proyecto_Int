import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EncargadaDashboard.css";

// TODO: backend: reemplazar por datos reales desde la API
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

const BLOQUES_ENCARGADA = [
  { id: 1, dia: "Lun 7", hora: "09:00 - 10:00" },
  { id: 2, dia: "Lun 7", hora: "11:00 - 12:00" },
  { id: 3, dia: "Mar 8", hora: "15:00 - 16:00" },
  { id: 4, dia: "Mié 9", hora: "10:00 - 11:00" },
  { id: 5, dia: "Jue 10", hora: "09:00 - 10:00" },
];

const ARCHIVOS_FORMATOS = [
  "Formato_Ficha_Entrevista_Inicial.docx",
  "Consentimiento_Informado_Ajustes.pdf",
  "Plantilla_Informe_Derivacion.docx",
];

export default function EncargadaDashboard() {
  const navigate = useNavigate();

  const [bloquesBloqueados, setBloquesBloqueados] = useState([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const totalActivos = CASOS_ENCARGADA.filter(
    (c) => c.estado !== "Cerrado"
  ).length;
  const totalDerivados = CASOS_ENCARGADA.filter(
    (c) => c.estado === "Derivado a CTP"
  ).length;

  const casosFiltrados = CASOS_ENCARGADA.filter((c) =>
    `${c.id} ${c.estudiante} ${c.carrera}`
      .toLowerCase()
      .includes(filtroTexto.toLowerCase())
  );

  const handleToggleBloque = (idBloque) => {
    setBloquesBloqueados((prev) =>
      prev.includes(idBloque)
        ? prev.filter((b) => b !== idBloque)
        : [...prev, idBloque]
    );
  };

  const handleDescargarFormato = (nombre) => {
    // TODO: backend: descarga real
    alert(`Descarga de demostración: ${nombre}`);
  };

  return (
    <div className="enc-page">
      <header className="enc-header">
        <div>
          <h2>Panel Encargada de Inclusión</h2>
          <p className="enc-subtitle">
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

      <section className="enc-stats-row">
        <div className="enc-stat-card enc-stat-activos">
          <span className="enc-stat-label">Casos activos</span>
          <strong className="enc-stat-value">{totalActivos}</strong>
          <small>En entrevista o derivados</small>
        </div>
        <div className="enc-stat-card enc-stat-derivados">
          <span className="enc-stat-label">Derivados a CTP</span>
          <strong className="enc-stat-value">{totalDerivados}</strong>
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

      <div className="enc-main-grid">
        {/* Columna izquierda */}
        <section className="enc-column">
          <div className="enc-card">
            <div className="enc-card-header">
              <h3>Agenda y bloqueo de horarios</h3>
            </div>
            <p className="enc-card-help">
              Marca los bloques en los que ya tienes entrevistas agendadas o
              que quieras bloquear para evitar sobrecarga.
            </p>

            <div className="enc-calendar-grid">
              {BLOQUES_ENCARGADA.map((b) => {
                const bloqueado = bloquesBloqueados.includes(b.id);
                return (
                  <button
                    key={b.id}
                    type="button"
                    className={
                      "enc-calendar-block" +
                      (bloqueado ? " enc-calendar-block-busy" : "")
                    }
                    onClick={() => handleToggleBloque(b.id)}
                  >
                    <span className="enc-calendar-day">{b.dia}</span>
                    <span className="enc-calendar-hour">{b.hora}</span>
                    <span className="enc-calendar-status">
                      {bloqueado ? "Bloqueado" : "Disponible"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="enc-card">
            <h3>Formatos y documentos</h3>
            <p className="enc-card-help">
              Descarga rápida de los principales documentos usados en la
              entrevista y registro de casos.
            </p>
            <ul className="enc-formatos-list">
              {ARCHIVOS_FORMATOS.map((f) => (
                <li key={f}>
                  <span>{f}</span>
                  <button
                    type="button"
                    className="enc-link"
                    onClick={() => handleDescargarFormato(f)}
                  >
                    Descargar (demo)
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Columna derecha */}
        <section className="enc-column">
          <div className="enc-card">
            <h3>Casos recientes</h3>
            <p className="enc-card-help">
              Busca casos por nombre, código o carrera para revisar su estado y
              derivarlos a coordinación.
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
                          onClick={() => setCasoSeleccionado(c)}
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

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
                  por la Encargada. Aquí se puede complementar información antes
                  de derivar a la Coordinadora Técnica Pedagógica.
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
                    onClick={() => navigate("/asesor/definir-ajustes")}
                  >
                    Ver definición de ajustes (cuando exista)
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
