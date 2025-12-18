import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EncargadaDashboard.css";

// ================== DATOS DE EJEMPLO ==================
const CASOS_ENCARGADA = [
  { id: "CASO-001", estudiante: "Alexander Torres", carrera: "Ingeniería en Informática", estado: "En entrevista", fechaRegistro: "2025-04-01", origen: "Estudiante" },
  { id: "CASO-002", estudiante: "Matias Soto", carrera: "Analista Programador", estado: "Derivado a CTP", fechaRegistro: "2025-03-30", origen: "Estudiante" },
  { id: "CASO-003", estudiante: "Benjamin Urra", carrera: "Ingeniería en Informática", estado: "Cerrado", fechaRegistro: "2025-03-20", origen: "Estudiante" },
  { id: "CASO-004", estudiante: "Claudio Bravo", carrera: "Contador Público", estado: "En entrevista", fechaRegistro: "2025-06-08", origen: "Estudiante" },
  { id: "CASO-005", estudiante: "Arturo Vidal", carrera: "Ingeneria Agricola", estado: "Derivado a CTP", fechaRegistro: "2025-11-03", origen: "Estudiante" },
  { id: "CASO-006", estudiante: "Bruno Méndez", carrera: "Técnico en Administración", estado: "Cerrado", fechaRegistro: "2025-05-21", origen: "Estudiante" },
  { id: "CASO-007", estudiante: "Camila Vargas", carrera: "Moda y Diseño", estado: "En entrevista", fechaRegistro: "2025-04-15", origen: "Estudiante" },
  { id: "CASO-008", estudiante: "Paulina Rojas", carrera: "Tecnico en Enfermería", estado: "Derivado a CTP", fechaRegistro: "2025-09-07", origen: "Estudiante" },
  { id: "CASO-009", estudiante: "Rebecca Flores", carrera: "Gastronomia", estado: "Cerrado", fechaRegistro: "2025-10-13"},
];

const ARCHIVOS_FORMATOS = [
  "Formato_Ficha_Entrevista_Inicial.docx",
  "Consentimiento_Informado_Ajustes.pdf",
  "Plantilla_Informe_Derivacion.docx",
  "Resumen_Seguimiento_Semestral.xlsx",
];

// ================== CALENDARIO / STORAGE (DEMO) ==================
const HORAS = ["09:00", "10:00", "11:00", "15:00"];
const LS_SLOTS = "sgar_agenda_slots_v1";          // { [slotId]: { state, ... } }
const LS_REQUESTS = "sgar_citas_pendientes_v1";   // [{ id, slotId, dateKey, hour, estudiante, correo, carrera, createdAt }]

const pad2 = (n) => String(n).padStart(2, "0");
const toDateKey = (d) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const slotIdOf = (dateKey, hour) => `${dateKey}|${hour}`;

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function buildMonthMatrix(year, monthIndex) {
  // monthIndex: 0-11
  const first = new Date(year, monthIndex, 1);
  const start = new Date(first);
  // Lunes=1 ... Domingo=0 => ajustamos a lunes como inicio
  const day = start.getDay(); // 0 dom
  const diffToMon = (day === 0 ? -6 : 1) - day;
  start.setDate(start.getDate() + diffToMon);

  const weeks = [];
  const cursor = new Date(start);
  for (let w = 0; w < 6; w++) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export default function EncargadaDashboard() {
  const navigate = useNavigate();

  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [filtroTexto, setFiltroTexto] = useState("");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  // Calendario mensual
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));

  // Slots y solicitudes (demo)
  const [slotMap, setSlotMap] = useState(() => loadJSON(LS_SLOTS, {}));
  const [requests, setRequests] = useState(() => loadJSON(LS_REQUESTS, []));

  // Sincroniza si el estudiante crea solicitudes en otra pestaña
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_SLOTS) setSlotMap(loadJSON(LS_SLOTS, {}));
      if (e.key === LS_REQUESTS) setRequests(loadJSON(LS_REQUESTS, []));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => saveJSON(LS_SLOTS, slotMap), [slotMap]);
  useEffect(() => saveJSON(LS_REQUESTS, requests), [requests]);

  const totalActivos = CASOS_ENCARGADA.filter((c) => c.estado !== "Cerrado").length;
  const totalDerivadosCTP = CASOS_ENCARGADA.filter((c) => c.estado === "Derivado a CTP").length;

  const casosFiltrados = CASOS_ENCARGADA.filter((c) =>
    `${c.id} ${c.estudiante} ${c.carrera}`.toLowerCase().includes(filtroTexto.toLowerCase())
  );

  const monthMatrix = useMemo(
    () => buildMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const requestsByDay = useMemo(() => {
    const m = {};
    for (const r of requests) {
      m[r.dateKey] = (m[r.dateKey] || 0) + 1;
    }
    return m;
  }, [requests]);

  const selectedDayLabel = useMemo(() => {
    const [y, m, d] = selectedDateKey.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }, [selectedDateKey]);

  const dayRequests = useMemo(
    () => requests.filter((r) => r.dateKey === selectedDateKey),
    [requests, selectedDateKey]
  );

  const getSlotState = (dateKey, hour) => {
    const id = slotIdOf(dateKey, hour);
    const slot = slotMap[id];
    // default: disponible si no existe
    return slot?.state || "available"; // available | blocked | reserved
  };

  const toggleBlockSlot = (dateKey, hour) => {
    const id = slotIdOf(dateKey, hour);
    const slot = slotMap[id];
    const state = slot?.state || "available";

    // si está reservado, no se bloquea desde aquí (en demo)
    if (state === "reserved") return;

    const nextState = state === "blocked" ? "available" : "blocked";

    setSlotMap((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), state: nextState },
    }));
  };

  const aprobarSolicitud = (req) => {
    const id = req.slotId;

    // Marca slot como reservado con datos del estudiante (demo)
    setSlotMap((prev) => ({
      ...prev,
      [id]: {
        state: "reserved",
        reservadoPor: req.estudiante,
        correo: req.correo,
        carrera: req.carrera,
        approvedAt: new Date().toISOString(),
      },
    }));

    // Quita solicitud de pendientes
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  const rechazarSolicitud = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
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

        <div className="enc-sidebar-top-actions">
          <button className="enc-sidebar-link" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>

        <nav className="enc-sidebar-menu">
          <button
            className={"enc-sidebar-item " + (pestanaActiva === "resumen" ? "enc-sidebar-item-active" : "")}
            onClick={() => setPestanaActiva("resumen")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={"enc-sidebar-item " + (pestanaActiva === "agenda" ? "enc-sidebar-item-active" : "")}
            onClick={() => setPestanaActiva("agenda")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Agenda y horarios</span>
          </button>

          <button
            className={"enc-sidebar-item " + (pestanaActiva === "casos" ? "enc-sidebar-item-active" : "")}
            onClick={() => setPestanaActiva("casos")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Casos recientes</span>
          </button>

          <button
            className={"enc-sidebar-item " + (pestanaActiva === "detalle" ? "enc-sidebar-item-active" : "")}
            onClick={() => setPestanaActiva("detalle")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Detalle de caso</span>
          </button>

          <button
            className={"enc-sidebar-item " + (pestanaActiva === "documentos" ? "enc-sidebar-item-active" : "")}
            onClick={() => setPestanaActiva("documentos")}
          >
            <span className="enc-sidebar-bullet" />
            <span>Documentos y formatos</span>
          </button>
        </nav>
      </aside>

      {/* ========== MAIN ========== */}
      <main className="enc-main">
        <header className="enc-main-header">
          <div>
            <h1>Panel Encargada de Inclusión</h1>
            <p className="enc-main-subtitle">
              Registro inicial de casos, agenda de entrevistas y envío a Coordinadora / Directora.
            </p>
          </div>
          <div className="enc-header-tags">
            <span className="enc-badge enc-badge-rol">Encargada de Inclusión</span>
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
            <strong className="enc-stat-value">{totalDerivadosCTP}</strong>
            <small>Pendientes de definición de ajustes</small>
          </div>
          <div className="enc-stat-card enc-stat-nuevo">
            <span className="enc-stat-label">Nuevo caso</span>
            <button type="button" className="enc-btn-primary" onClick={() => navigate("/asesor/registrar-caso")}>
              Registrar caso
            </button>
            <small>Abre la pantalla de registro</small>
          </div>
        </section>

        {/* ========== CONTENIDO POR PESTAÑA ========== */}
        {pestanaActiva === "resumen" && (
          <section className="enc-section">
            <div className="enc-grid">
              <div className="enc-card">
                <div className="enc-card-header">
                  <h3>Últimos casos registrados</h3>
                </div>
                <p className="enc-card-help">Vista rápida de los casos ingresados por la Encargada.</p>
                <ul className="enc-list-casos">
                  {CASOS_ENCARGADA.map((c) => (
                    <li key={c.id}>
                      <div>
                        <span className="enc-case-id">{c.id}</span>
                        <p className="enc-case-title">{c.estudiante}</p>
                        <p className="enc-case-meta">{c.carrera} · {c.estado}</p>
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
                <p className="enc-card-help">Atajos a las vistas que más utiliza la Encargada.</p>

                <ul className="enc-list-simple">
                  <li>
                    <button type="button" className="enc-link" onClick={() => setPestanaActiva("agenda")}>
                      Ver agenda mensual
                    </button>
                  </li>

                  <li>
                    <button type="button" className="enc-link" onClick={() => setPestanaActiva("casos")}>
                      Revisar casos recientes
                    </button>
                  </li>

                  <li>
                    <button type="button" className="enc-link" onClick={() => setPestanaActiva("documentos")}>
                      Revisar formatos oficiales
                    </button>
                  </li>

                  <li>
                    <button type="button" className="enc-link" onClick={() => navigate("/asesor/seguimiento")}>
                      Ir a seguimiento
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 2) AGENDA: CALENDARIO MENSUAL + BLOQUES + SOLICITUDES */}
        {pestanaActiva === "agenda" && (
          <section className="enc-section">
            <div className="enc-card">
              <div className="enc-card-header">
                <h3>Agenda mensual y bloqueo de horarios</h3>
              </div>
              <p className="enc-card-help">
                Selecciona un día (calendario tipo Windows). Luego bloquea / habilita bloques horarios.
                Las solicitudes del estudiante aparecerán como pendientes para aprobar o rechazar.
              </p>

              <div className="enc-agenda-grid">
                {/* Calendario mensual */}
                <div className="enc-cal">
                  <div className="enc-cal-head">
                    <button
                      type="button"
                      className="enc-cal-nav"
                      onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                    >
                      ◀
                    </button>

                    <div className="enc-cal-title">
                      {viewDate.toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
                    </div>

                    <button
                      type="button"
                      className="enc-cal-nav"
                      onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                    >
                      ▶
                    </button>
                  </div>

                  <div className="enc-cal-weekdays">
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                      <div key={d} className="enc-cal-wd">{d}</div>
                    ))}
                  </div>

                  <div className="enc-cal-grid">
                    {monthMatrix.flat().map((dateObj) => {
                      const key = toDateKey(dateObj);
                      const inMonth = dateObj.getMonth() === viewDate.getMonth();
                      const isSelected = key === selectedDateKey;
                      const pendCount = requestsByDay[key] || 0;

                      return (
                        <button
                          key={key}
                          type="button"
                          className={
                            "enc-cal-day" +
                            (inMonth ? "" : " enc-cal-day-muted") +
                            (isSelected ? " enc-cal-day-selected" : "")
                          }
                          onClick={() => setSelectedDateKey(key)}
                        >
                          <span className="enc-cal-num">{dateObj.getDate()}</span>
                          {pendCount > 0 && <span className="enc-cal-badge">{pendCount}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bloques del día seleccionado */}
                <div className="enc-day">
                  <div className="enc-day-head">
                    <h4>Bloques del día</h4>
                    <div className="enc-day-sub">{selectedDayLabel}</div>
                  </div>

                  <div className="enc-day-legend">
                    <span><span className="enc-dot enc-dot-free" /> Disponible</span>
                    <span><span className="enc-dot enc-dot-blocked" /> Bloqueado</span>
                    <span><span className="enc-dot enc-dot-reserved" /> Reservado</span>
                  </div>

                  <div className="enc-slots">
                    {HORAS.map((hour) => {
                      const state = getSlotState(selectedDateKey, hour);
                      const id = slotIdOf(selectedDateKey, hour);
                      const slot = slotMap[id];

                      return (
                        <div key={id} className="enc-slot-row">
                          <div className="enc-slot-hour">{hour} - {String(Number(hour.slice(0,2)) + 1).padStart(2,"0")}:00</div>

                          <button
                            type="button"
                            className={
                              "enc-slot-btn " +
                              (state === "available"
                                ? "enc-slot-available"
                                : state === "blocked"
                                ? "enc-slot-blocked"
                                : "enc-slot-reserved")
                            }
                            onClick={() => toggleBlockSlot(selectedDateKey, hour)}
                            disabled={state === "reserved"}
                            title={state === "reserved" ? "Reservado (no editable en demo)" : "Click para bloquear / habilitar"}
                          >
                            {state === "available" && "Disponible"}
                            {state === "blocked" && "Bloqueado"}
                            {state === "reserved" && `Reservado: ${slot?.reservadoPor || "Estudiante"}`}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Solicitudes del día */}
                  <div className="enc-req">
                    <h4>Solicitudes pendientes del día</h4>

                    {dayRequests.length === 0 && (
                      <p className="enc-card-help">No hay solicitudes pendientes para este día.</p>
                    )}

                    {dayRequests.map((r) => (
                      <div key={r.id} className="enc-req-card">
                        <div className="enc-req-top">
                          <div className="enc-req-title">{r.estudiante}</div>
                          <div className="enc-req-time">{r.hour}</div>
                        </div>
                        <div className="enc-req-meta">
                          <div><strong>Carrera:</strong> {r.carrera}</div>
                          <div><strong>Correo:</strong> {r.correo}</div>
                          <div><strong>Fecha:</strong> {r.dateKey}</div>
                        </div>

                        <div className="enc-req-actions">
                          <button type="button" className="enc-req-approve" onClick={() => aprobarSolicitud(r)}>
                            Aprobar
                          </button>
                          <button type="button" className="enc-req-reject" onClick={() => rechazarSolicitud(r)}>
                            Rechazar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="enc-card-help" style={{ marginTop: 10 }}>
                Nota demo: los datos se comparten con Estudiante vía localStorage. En backend esto será una tabla (citas + disponibilidad).
              </p>
            </div>
          </section>
        )}

        {/* 3) Casos recientes */}
        {pestanaActiva === "casos" && (
          <section className="enc-section">
            <div className="enc-card">
              <h3>Casos recientes</h3>
              <p className="enc-card-help">
                Busca casos por nombre, código o carrera para revisar su estado y derivarlos a coordinación.
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
                  Selecciona un caso desde “Casos recientes” o desde el “Resumen general” para ver el detalle.
                </p>
              )}

              {casoSeleccionado && (
                <div className="enc-detalle">
                  <div className="enc-detalle-header">
                    <div>
                      <span className="enc-detalle-id">{casoSeleccionado.id}</span>
                      <h4>{casoSeleccionado.estudiante}</h4>
                      <p className="enc-detalle-meta">
                        {casoSeleccionado.carrera} · Origen: {casoSeleccionado.origen}
                      </p>
                    </div>
                  </div>

                  <p className="enc-detalle-text">
                    Este bloque representa el detalle básico del caso. Aquí se puede complementar información antes de derivar.
                  </p>

                  <div className="enc-detalle-actions">
                    <button type="button" className="enc-btn-primary" onClick={() => navigate("/asesor/registrar-caso")}>
                      Abrir ficha de registro
                    </button>
                    <button type="button" className="enc-btn-secondary" onClick={() => setPestanaActiva("agenda")}>
                      Ver agenda mensual
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
                Plantillas base utilizadas para entrevistas, consentimientos e informes.
              </p>

              <ul className="enc-formatos-list">
                {ARCHIVOS_FORMATOS.map((f) => (
                  <li key={f} className="enc-doc-item">
                    <div className="enc-doc-info">
                      <span className="enc-doc-dot" />
                      <span className="enc-doc-name">{f}</span>
                    </div>
                    <button type="button" className="enc-doc-link" onClick={() => handleDescargarFormato(f)}>
                      Descargar (demo)
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <footer className="enc-footer">© 2025 · SGAR Inclusión · Vista Encargada</footer>
      </main>
    </div>
  );
}
