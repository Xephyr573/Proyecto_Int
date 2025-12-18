import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EntrevistaEstudiante.css";

const LS_USER = "sgar_user";
const LS_SLOTS = "sgar_agenda_slots_v1";          // reservado por Encargada
const LS_REQUESTS = "sgar_citas_pendientes_v1";   // solicitud del estudiante
const LS_PRE = "sgar_preinterview_v1";

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function parseSlotId(slotId) {
  const [dateKey, hour] = String(slotId || "").split("|");
  return { dateKey, hour };
}

export default function EntrevistaEstudiante() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);

  const [slots, setSlots] = useState(() => loadJSON(LS_SLOTS, {}));
  const [requests, setRequests] = useState(() => loadJSON(LS_REQUESTS, []));
  const [pre, setPre] = useState({
    motivo: "",
    barreras: "",
    expectativas: "",
    modalidadPreferida: "Presencial",
  });

  const correo = (perfil?.correo || "").toLowerCase();

  useEffect(() => {
    const user = loadJSON(LS_USER, null);
    setPerfil(user || { nombre: "Estudiante", correo: "estudiante@inacapmail.cl", carrera: "Ingeniería en Informática" });
  }, []);

  useEffect(() => {
    const all = loadJSON(LS_PRE, {});
    if (all[correo]) setPre(all[correo]);
  }, [correo]);

  useEffect(() => saveJSON(LS_SLOTS, slots), [slots]);
  useEffect(() => saveJSON(LS_REQUESTS, requests), [requests]);

  const misPendientes = useMemo(() => {
    return requests
      .filter((r) => String(r.correo || "").toLowerCase() === correo)
      .sort((a, b) => (a.dateKey + a.hour).localeCompare(b.dateKey + b.hour));
  }, [requests, correo]);

  const proximaAprobada = useMemo(() => {
    const reserved = Object.entries(slots)
      .filter(([, v]) => v?.state === "reserved" && String(v?.correo || "").toLowerCase() === correo)
      .map(([slotId, v]) => ({ slotId, ...v, ...parseSlotId(slotId) }))
      .sort((a, b) => (a.dateKey + a.hour).localeCompare(b.dateKey + b.hour));

    return reserved[0] || null;
  }, [slots, correo]);

  const guardarPre = () => {
    const all = loadJSON(LS_PRE, {});
    all[correo] = pre;
    saveJSON(LS_PRE, all);
    alert("Información guardada (demo).");
  };

  return (
    <div className="int-page">
      <div className="int-shell">
        <header className="int-header">
          <div>
            <h1>Entrevista</h1>
            <p className="int-sub">Consulta el estado de tu solicitud y completa información previa para la entrevista.</p>
          </div>
          <button className="int-btn int-btn-ghost" onClick={() => navigate(-1)}>
            Volver
          </button>
        </header>

        <section className="int-grid">
          <div className="int-card">
            <div className="int-card-title">Estado</div>

            {proximaAprobada ? (
              <div className="int-highlight">
                <div>
                  <span>Próxima entrevista</span>
                  <strong>{proximaAprobada.dateKey} · {proximaAprobada.hour}</strong>
                </div>
                <div className="int-pill ok">Reservada</div>
              </div>
            ) : (
              <div className="int-highlight soft">
                <div>
                  <span>Próxima entrevista</span>
                  <strong>No hay entrevista aprobada</strong>
                </div>
                <div className="int-pill warn">Sin reserva</div>
              </div>
            )}

            <div className="int-list">
              <div className="int-list-title">Solicitudes pendientes</div>

              {misPendientes.length === 0 && <div className="int-empty">No tienes solicitudes pendientes.</div>}

              {misPendientes.slice(0, 4).map((r) => (
                <div key={r.id} className="int-row">
                  <span>{r.dateKey}</span>
                  <strong>{r.hour}</strong>
                  <span className="int-pill warn">Pendiente</span>
                </div>
              ))}
            </div>

            <div className="int-note">
              Cuando la Encargada apruebe, tu bloque pasará a “Reservada” y aparecerá arriba automáticamente.
            </div>
          </div>

          <div className="int-card">
            <div className="int-card-title">Datos del estudiante</div>
            <div className="int-kv">
              <div><span>Nombre</span><strong>{perfil?.nombre}</strong></div>
              <div><span>Correo</span><strong>{perfil?.correo}</strong></div>
              <div><span>Carrera</span><strong>{perfil?.carrera}</strong></div>
            </div>
          </div>
        </section>

        <section className="int-card int-form">
          <div className="int-card-title">Formulario pre-entrevista</div>
          <p className="int-help">
            Esta información ayuda a hacer la entrevista más eficiente. En producción, se envía al backend y queda asociada a tu caso.
          </p>

          <div className="int-formgrid">
            <div className="int-field">
              <label>Modalidad preferida</label>
              <select value={pre.modalidadPreferida} onChange={(e) => setPre((p) => ({ ...p, modalidadPreferida: e.target.value }))}>
                <option>Presencial</option>
                <option>Online</option>
              </select>
            </div>

            <div className="int-field int-wide">
              <label>Motivo de la entrevista</label>
              <textarea
                value={pre.motivo}
                onChange={(e) => setPre((p) => ({ ...p, motivo: e.target.value }))}
                placeholder="Explica qué necesitas conversar o resolver en la entrevista."
              />
            </div>

            <div className="int-field int-wide">
              <label>Barreras o dificultades actuales</label>
              <textarea
                value={pre.barreras}
                onChange={(e) => setPre((p) => ({ ...p, barreras: e.target.value }))}
                placeholder="Ej: evaluaciones, materiales, participación en sala, movilidad, etc."
              />
            </div>

            <div className="int-field int-wide">
              <label>Expectativas / qué esperas obtener</label>
              <textarea
                value={pre.expectativas}
                onChange={(e) => setPre((p) => ({ ...p, expectativas: e.target.value }))}
                placeholder="Ej: acuerdos de apoyo, ajustes razonables, seguimiento, etc."
              />
            </div>
          </div>

          <div className="int-actions">
            <button className="int-btn int-btn-primary" type="button" onClick={guardarPre}>
              Guardar información
            </button>
          </div>
        </section>

        <footer className="int-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
