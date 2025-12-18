import "./EstudianteDashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

// ====== DEMO: mismas keys que Encargada ======
const HORAS = ["09:00", "10:00", "11:00", "15:00"];
const LS_SLOTS = "sgar_agenda_slots_v1";
const LS_REQUESTS = "sgar_citas_pendientes_v1";
const LS_USER = "sgar_user";

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
  const first = new Date(year, monthIndex, 1);
  const start = new Date(first);
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

function parseSlotId(slotId) {
  const [dateKey, hour] = slotId.split("|");
  return { dateKey, hour };
}

export default function EstudianteDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // si quieres cerrar sesión real: limpia LS_USER, token, etc.
    // localStorage.removeItem(LS_USER);
    navigate("/Estudiante");
  };

  // Perfil (desde login/backend)
  const [perfil, setPerfil] = useState(null);

  // Vista mensual + día seleccionado
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));

  // Disponibilidad/Reservas (compartido con Encargada)
  const [slotMap, setSlotMap] = useState(() => loadJSON(LS_SLOTS, {}));
  const [requests, setRequests] = useState(() => loadJSON(LS_REQUESTS, []));

  // Carga perfil al entrar
  useEffect(() => {
    const user = loadJSON(LS_USER, null);

    // Fallback demo si aún no guardas userData en login
    setPerfil(
      user || {
        nombre: "Nombre Nombre Apellido Apellido",
        correo: "estudiante@inacapmail.cl",
        carrera: "Ingeniería en Informática",
        sede: "Sede Temuco",
        jornada: "Diurna",
        rut: "Sin registrar",
        telefono: "Sin registrar",
        estado: "Activo",
      }
    );
  }, []);

  // Sync si Encargada o Estudiante cambian storage
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === LS_SLOTS) setSlotMap(loadJSON(LS_SLOTS, {}));
      if (e.key === LS_REQUESTS) setRequests(loadJSON(LS_REQUESTS, []));
      if (e.key === LS_USER) setPerfil(loadJSON(LS_USER, perfil));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfil]);

  useEffect(() => saveJSON(LS_SLOTS, slotMap), [slotMap]);
  useEffect(() => saveJSON(LS_REQUESTS, requests), [requests]);

  const monthMatrix = useMemo(
    () => buildMonthMatrix(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  );

  const selectedDayLabel = useMemo(() => {
    const [y, m, d] = selectedDateKey.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("es-CL", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [selectedDateKey]);

  const getSlotState = (dateKey, hour) => {
    const id = slotIdOf(dateKey, hour);
    const slot = slotMap[id];
    return slot?.state || "available"; // available | blocked | reserved
  };

  const isPendingForSlot = (dateKey, hour) => {
    const id = slotIdOf(dateKey, hour);
    return requests.some((r) => r.slotId === id && r.correo === perfil?.correo);
  };

  // Pendientes del estudiante
  const misPendientes = useMemo(() => {
    if (!perfil?.correo) return [];
    return requests
      .filter((r) => r.correo === perfil.correo)
      .sort((a, b) => (a.dateKey + a.hour).localeCompare(b.dateKey + b.hour));
  }, [requests, perfil]);

  // Próxima entrevista aprobada (slot reservado por correo)
  const miProximaEntrevista = useMemo(() => {
    if (!perfil?.correo) return null;

    const reserved = Object.entries(slotMap)
      .filter(([, v]) => v?.state === "reserved" && v?.correo === perfil.correo)
      .map(([slotId, v]) => ({ slotId, ...v, ...parseSlotId(slotId) }))
      .sort((a, b) => (a.dateKey + a.hour).localeCompare(b.dateKey + b.hour));

    return reserved.length ? reserved[0] : null;
  }, [slotMap, perfil]);

  const handleSolicitar = (dateKey, hour) => {
    if (!perfil) return;

    const id = slotIdOf(dateKey, hour);
    const state = getSlotState(dateKey, hour);

    if (state !== "available") return;
    if (isPendingForSlot(dateKey, hour)) return;

    const ok = window.confirm(`¿Solicitar entrevista para ${dateKey} a las ${hour}?`);
    if (!ok) return;

    const nueva = {
      id: `REQ-${Date.now()}`,
      slotId: id,
      dateKey,
      hour,
      estudiante: perfil.nombre,
      correo: perfil.correo,
      carrera: perfil.carrera,
      createdAt: new Date().toISOString(),
    };

    const next = [...requests, nueva];
    setRequests(next);
    alert("Solicitud enviada. La Encargada debe aprobarla.");
  };

  // Indicador por día: si el estudiante tiene pendiente o reserva en ese día
  const badgePorDia = useMemo(() => {
    const out = {};
    if (!perfil?.correo) return out;

    for (const r of requests) {
      if (r.correo === perfil.correo) out[r.dateKey] = "pending";
    }

    for (const [slotId, v] of Object.entries(slotMap)) {
      if (v?.state === "reserved" && v?.correo === perfil.correo) {
        const { dateKey } = parseSlotId(slotId);
        out[dateKey] = "reserved";
      }
    }
    return out;
  }, [requests, slotMap, perfil]);

  if (!perfil) return null;

  return (
    <div className="est2-layout">
      {/* ===== SIDEBAR ===== */}
      <aside className="est2-sidebar">
        <div className="est2-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="est2-sidebar-logo"
          />
        </div>

        <div className="est2-profile-mini">
          <span className="est2-mini-label">Estudiante</span>
          <div className="est2-mini-name">{perfil.nombre}</div>
          <div className="est2-mini-mail">{perfil.correo}</div>
          <div className="est2-mini-chip">{perfil.carrera}</div>
        </div>

        <nav className="est2-sidebar-menu">

          <button className="est2-sidebar-item" onClick={() => navigate("/estudiante/asistencia")}>
            <span className="est2-dot" />
            <span>Asistencia</span>
          </button>

          <button className="est2-sidebar-item" onClick={() => navigate("/estudiante/solicitudes")}>
            <span className="est2-dot" />
            <span>Historial de Solicitudes</span>
          </button>

          <button className="est2-sidebar-item" onClick={() => navigate("/estudiante/reporte")}>
            <span className="est2-dot" />
            <span>Reporte General</span>
          </button>
        </nav>

        <div className="est2-sidebar-bottom">
          <button className="est2-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="est2-main">
        {/* Header */}
        <header className="est2-header">
          <div>
            <h1>Portal Estudiante</h1>
            <p>
              {perfil.sede} · {perfil.jornada} · Estado: <strong>{perfil.estado}</strong>
            </p>
          </div>

          <div className="est2-header-actions">
            <button className="est2-btn-primary" onClick={() => setSelectedDateKey(toDateKey(new Date()))}>
              Ir a hoy
            </button>
          </div>
        </header>

        {/* Resumen superior */}
        <section className="est2-topgrid">
          <div className="est2-card est2-card-profile">
            <div className="est2-card-title">Mi perfil</div>

            <div className="est2-kv">
              <div>
                <span>Nombre</span>
                <strong>{perfil.nombre}</strong>
              </div>
              <div>
                <span>RUT</span>
                <strong>{perfil.rut}</strong>
              </div>
              <div>
                <span>Correo</span>
                <strong>{perfil.correo}</strong>
              </div>
              <div>
                <span>Teléfono</span>
                <strong>{perfil.telefono}</strong>
              </div>
              <div>
                <span>Carrera</span>
                <strong>{perfil.carrera}</strong>
              </div>
              <div>
                <span>Sede</span>
                <strong>{perfil.sede}</strong>
              </div>
            </div>

            <div className="est2-note">
              En producción, estos datos se cargan desde el backend según tu sesión.
            </div>
          </div>

          <div className="est2-card est2-card-status">
            <div className="est2-card-title">Estado de entrevistas</div>

            <div className="est2-status-row">
              <div className="est2-pill est2-pill-pending">
                Pendientes: <strong>{misPendientes.length}</strong>
              </div>
              <div className="est2-pill est2-pill-ok">
                Aprobada: <strong>{miProximaEntrevista ? "Sí" : "No"}</strong>
              </div>
            </div>

            <div className="est2-next">
              <div className="est2-next-title">Próxima entrevista</div>

              {!miProximaEntrevista && (
                <div className="est2-next-empty">
                  No tienes una entrevista aprobada todavía. Puedes solicitar un bloque en el calendario.
                </div>
              )}

              {miProximaEntrevista && (
                <div className="est2-next-card">
                  <div>
                    <span>Fecha</span>
                    <strong>{miProximaEntrevista.dateKey}</strong>
                  </div>
                  <div>
                    <span>Hora</span>
                    <strong>{miProximaEntrevista.hour}</strong>
                  </div>
                  <div>
                    <span>Estado</span>
                    <strong>Reservado</strong>
                  </div>
                </div>
              )}
            </div>

            {misPendientes.length > 0 && (
              <div className="est2-pendinglist">
                <div className="est2-next-title">Mis solicitudes pendientes</div>
                {misPendientes.slice(0, 3).map((r) => (
                  <div key={r.id} className="est2-pendingitem">
                    <span>{r.dateKey}</span>
                    <strong>{r.hour}</strong>
                  </div>
                ))}
                {misPendientes.length > 3 && (
                  <button className="est2-link" onClick={() => navigate("/estudiante/solicitudes")}>
                    Ver todas
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Calendario + bloques */}
        <section className="est2-calendar">
          <div className="est2-calendar-head">
            <div>
              <h2>Agendar entrevista</h2>
              <p>Selecciona un día y solicita un bloque disponible. La Encargada debe aprobar.</p>
            </div>
          </div>

          <div className="est2-agenda-grid">
            <div className="est2-cal">
              <div className="est2-cal-head">
                <button
                  type="button"
                  className="est2-cal-nav"
                  onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                >
                  ◀
                </button>

                <div className="est2-cal-title">
                  {viewDate.toLocaleDateString("es-CL", { month: "long", year: "numeric" })}
                </div>

                <button
                  type="button"
                  className="est2-cal-nav"
                  onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                >
                  ▶
                </button>
              </div>

              <div className="est2-cal-weekdays">
                {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
                  <div key={d} className="est2-cal-wd">{d}</div>
                ))}
              </div>

              <div className="est2-cal-grid">
                {monthMatrix.flat().map((dateObj) => {
                  const key = toDateKey(dateObj);
                  const inMonth = dateObj.getMonth() === viewDate.getMonth();
                  const isSelected = key === selectedDateKey;
                  const badge = badgePorDia[key]; // pending | reserved | undefined

                  return (
                    <button
                      key={key}
                      type="button"
                      className={
                        "est2-cal-day" +
                        (inMonth ? "" : " est2-cal-day-muted") +
                        (isSelected ? " est2-cal-day-selected" : "")
                      }
                      onClick={() => setSelectedDateKey(key)}
                    >
                      <span className="est2-cal-num">{dateObj.getDate()}</span>
                      {badge === "pending" && <span className="est2-cal-badge est2-badge-pending" />}
                      {badge === "reserved" && <span className="est2-cal-badge est2-badge-reserved" />}
                    </button>
                  );
                })}
              </div>

              <div className="est2-cal-legend">
                <span><span className="est2-lg-dot est2-lg-pending" /> Pendiente</span>
                <span><span className="est2-lg-dot est2-lg-reserved" /> Reservado</span>
              </div>
            </div>

            <div className="est2-day">
              <div className="est2-day-head">
                <h3>Bloques del día</h3>
                <div className="est2-day-sub">{selectedDayLabel}</div>
              </div>

              <div className="est2-slots">
                {HORAS.map((hour) => {
                  const state = getSlotState(selectedDateKey, hour);
                  const pending = isPendingForSlot(selectedDateKey, hour);
                  const disabled = state !== "available" || pending;

                  let label = "Solicitar";
                  let cls = "est2-slot-btn est2-slot-available";

                  if (state === "blocked") {
                    label = "No disponible";
                    cls = "est2-slot-btn est2-slot-blocked";
                  }
                  if (state === "reserved") {
                    label = "Reservado";
                    cls = "est2-slot-btn est2-slot-reserved";
                  }
                  if (pending) {
                    label = "Solicitud pendiente";
                    cls = "est2-slot-btn est2-slot-pending";
                  }

                  return (
                    <button
                      key={`${selectedDateKey}|${hour}`}
                      type="button"
                      className={cls}
                      disabled={disabled}
                      onClick={() => handleSolicitar(selectedDateKey, hour)}
                    >
                      <div className="est2-slot-hour">{hour}</div>
                      <div className="est2-slot-status">{label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <footer className="est2-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </main>
    </div>
  );
}
