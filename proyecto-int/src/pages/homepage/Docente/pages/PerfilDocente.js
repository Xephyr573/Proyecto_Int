// src/pages/homepage/Docente/pages/PerfilDocente.js
import "./PerfilDocente.css";
import { useEffect, useMemo, useState } from "react";
import { DocenteShell } from "../DocenteShell";

function readUser() {
  try {
    const raw = localStorage.getItem("user") || localStorage.getItem("usuario");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeUser(next) {
  try {
    localStorage.setItem("user", JSON.stringify(next));
  } catch {}
}

export default function PerfilDocente() {
  const stored = useMemo(() => readUser(), []);
  const [editando, setEditando] = useState(false);

  const [form, setForm] = useState({
    nombre: stored?.nombre || stored?.name || "Docente",
    correo: stored?.correo || stored?.email || "docente@inacapmail.cl",
    sede: stored?.sede || "Sede Temuco",
    asignatura: stored?.asignatura || "Asignatura no definida",
    carrera: stored?.carrera || "Carrera no definida",
  });

  useEffect(() => {
    // si el user llega después por login, podrías sincronizar acá
  }, []);

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const guardar = () => {
    const next = { ...(stored || {}), ...form, rol: stored?.rol || "Docente" };
    writeUser(next);
    setEditando(false);
  };

  return (
    <DocenteShell
      active="dashboard"
      title="Perfil docente"
      subtitle="Gestione la información base que se utiliza para reportes y trazabilidad del flujo SGAR."
    >
      <section className="doc-section">
        <div className="doc-card-surface">
          <div className="doc-profile-header">
            <div>
              <h3>Información general</h3>
              <p className="doc-muted">
                Estos datos pueden venir desde el backend (perfil autenticado) y se almacenan localmente como demostración.
              </p>
            </div>

            <div className="doc-profile-actions">
              {!editando && (
                <button type="button" className="doc-btn doc-btn-secondary" onClick={() => setEditando(true)}>
                  Editar
                </button>
              )}
              {editando && (
                <>
                  <button type="button" className="doc-btn doc-btn-ok" onClick={guardar}>
                    Guardar
                  </button>
                  <button type="button" className="doc-btn doc-btn-secondary" onClick={() => setEditando(false)}>
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="doc-profile-grid">
            <label className="doc-field">
              Nombre
              <input
                className="doc-input doc-input-wide"
                value={form.nombre}
                disabled={!editando}
                onChange={(e) => onChange("nombre", e.target.value)}
              />
            </label>

            <label className="doc-field">
              Correo institucional
              <input
                className="doc-input doc-input-wide"
                value={form.correo}
                disabled={!editando}
                onChange={(e) => onChange("correo", e.target.value)}
              />
            </label>

            <label className="doc-field">
              Sede
              <input
                className="doc-input"
                value={form.sede}
                disabled={!editando}
                onChange={(e) => onChange("sede", e.target.value)}
              />
            </label>

            <label className="doc-field">
              Asignatura
              <input
                className="doc-input"
                value={form.asignatura}
                disabled={!editando}
                onChange={(e) => onChange("asignatura", e.target.value)}
              />
            </label>

            <label className="doc-field doc-field-span">
              Carrera / Unidad asociada
              <input
                className="doc-input doc-input-wide"
                value={form.carrera}
                disabled={!editando}
                onChange={(e) => onChange("carrera", e.target.value)}
              />
            </label>
          </div>

          <div className="doc-profile-footnote">
            <span className="doc-pill doc-pill-warn">Demo</span>
            <span className="doc-muted">
              En producción: GET /api/me y PUT /api/me para actualizar el perfil.
            </span>
          </div>
        </div>
      </section>
    </DocenteShell>
  );
}
