import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AsistenciaEstudiante.css";

const LS_USER = "sgar_user";
const LS_ATT = "sgar_attendance_v1";

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

const seedRows = [
  { id: "A-1", fecha: "2025-03-10", tipo: "Entrevista", estado: "Asistió", observacion: "" },
  { id: "A-2", fecha: "2025-03-05", tipo: "Clase de Apoyo", estado: "No asistió", observacion: "" },
];

export default function AsistenciaEstudiante() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const correoKey = (perfil?.correo || "anon").toLowerCase();

  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [fTipo, setFTipo] = useState("Todos");
  const [fEstado, setFEstado] = useState("Todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState(null);
  const [justText, setJustText] = useState("");
  const [justFile, setJustFile] = useState(null);

  useEffect(() => {
    const user = loadJSON(LS_USER, null);
    setPerfil(user || { nombre: "Estudiante", correo: "estudiante@inacapmail.cl" });
  }, []);

  useEffect(() => {
    const all = loadJSON(LS_ATT, {});
    const saved = all[correoKey];
    setRows(saved?.length ? saved : seedRows);
  }, [correoKey]);

  useEffect(() => {
    const all = loadJSON(LS_ATT, {});
    all[correoKey] = rows;
    saveJSON(LS_ATT, all);
  }, [rows, correoKey]);

  const stats = useMemo(() => {
    const total = rows.length;
    const asistio = rows.filter((r) => r.estado === "Asistió").length;
    const noAsistio = rows.filter((r) => r.estado === "No asistió").length;
    const just = rows.filter((r) => r.estado === "Justificada").length;
    return { total, asistio, noAsistio, just };
  }, [rows]);

  const tipos = useMemo(() => ["Todos", ...Array.from(new Set(rows.map((r) => r.tipo)))], [rows]);

  const filtradas = useMemo(() => {
    return rows
      .filter((r) => (fTipo === "Todos" ? true : r.tipo === fTipo))
      .filter((r) => (fEstado === "Todos" ? true : r.estado === fEstado))
      .filter((r) => {
        const blob = `${r.fecha} ${r.tipo} ${r.estado} ${r.observacion || ""}`.toLowerCase();
        return blob.includes(q.toLowerCase());
      })
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }, [rows, q, fTipo, fEstado]);

  const abrirJustificar = (row) => {
    setTarget(row);
    setJustText("");
    setJustFile(null);
    setModalOpen(true);
  };

  const guardarJustificacion = () => {
    if (!target) return;

    if (!justText.trim()) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === target.id
          ? {
              ...r,
              estado: "Justificada",
              observacion: justText.trim(),
              evidenciaNombre: justFile?.name || "",
              updatedAt: new Date().toISOString(),
            }
          : r
      )
    );

    setModalOpen(false);
    setTarget(null);
  };

  return (
    <div className="att-page">
      <div className="att-shell">
        <header className="att-header">
          <div>
            <h1>Asistencia</h1>
            <p className="att-sub">Registro de participación en entrevistas y actividades de apoyo.</p>
          </div>
          <button className="att-btn att-btn-ghost" onClick={() => navigate(-1)}>
            Volver
          </button>
        </header>

        <section className="att-stats">
          <div className="att-stat att-s1">
            <span>Total</span>
            <strong>{stats.total}</strong>
          </div>
          <div className="att-stat att-s2">
            <span>Asistidas</span>
            <strong>{stats.asistio}</strong>
          </div>
          <div className="att-stat att-s3">
            <span>No asistió</span>
            <strong>{stats.noAsistio}</strong>
          </div>
          <div className="att-stat att-s4">
            <span>Justificadas</span>
            <strong>{stats.just}</strong>
          </div>
        </section>

        <section className="att-card">
          <div className="att-filters">
            <div className="att-field">
              <label>Buscar</label>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Fecha, tipo, estado u observación" />
            </div>

            <div className="att-field">
              <label>Tipo</label>
              <select value={fTipo} onChange={(e) => setFTipo(e.target.value)}>
                {tipos.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="att-field">
              <label>Estado</label>
              <select value={fEstado} onChange={(e) => setFEstado(e.target.value)}>
                {["Todos", "Asistió", "No asistió", "Justificada"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="att-tablewrap">
            <table className="att-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Observación</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="att-empty">
                      No hay registros con esos filtros.
                    </td>
                  </tr>
                )}

                {filtradas.map((r) => (
                  <tr key={r.id}>
                    <td>{new Date(r.fecha).toLocaleDateString("es-CL")}</td>
                    <td>{r.tipo}</td>
                    <td>
                      <span
                        className={
                          "att-pill " +
                          (r.estado === "Asistió" ? "ok" : r.estado === "No asistió" ? "no" : "warn")
                        }
                      >
                        {r.estado}
                      </span>
                    </td>
                    <td className="att-ellipsis">{r.observacion || "-"}</td>
                    <td className="att-right">
                      {r.estado === "No asistió" && (
                        <button className="att-link" type="button" onClick={() => abrirJustificar(r)}>
                          Justificar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {modalOpen && (
          <div className="att-modal-backdrop" role="dialog" aria-modal="true">
            <div className="att-modal">
              <div className="att-modal-head">
                <h3>Justificar inasistencia</h3>
                <button className="att-x" onClick={() => setModalOpen(false)} type="button">
                  Cerrar
                </button>
              </div>

              <p className="att-modal-sub">
                Completa el motivo. En producción, el archivo se sube al backend y queda con estado “Pendiente”.
              </p>

              <label className="att-modal-label">Motivo</label>
              <textarea
                value={justText}
                onChange={(e) => setJustText(e.target.value)}
                placeholder="Ej: control médico, fuerza mayor, etc."
              />

              <label className="att-modal-label">Evidencia (opcional)</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setJustFile(e.target.files?.[0] || null)} />

              <div className="att-modal-actions">
                <button className="att-btn att-btn-ghost" type="button" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
                <button className="att-btn att-btn-primary" type="button" onClick={guardarJustificacion} disabled={!justText.trim()}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="att-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
