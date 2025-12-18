import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilEstudiante.css";

const LS_USER = "sgar_user";

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

export default function PerfilEstudiante() {
  const navigate = useNavigate();

  const [modoEdicion, setModoEdicion] = useState(false);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    carrera: "",
    correo: "",
    telefono: "",
    sede: "Sede Temuco",
  });

  useEffect(() => {
    const user = loadJSON(LS_USER, null);

    setForm(
      user || {
        nombre: "Nombre Nombre Apellido Apellido",
        rut: "12.345.678-9",
        carrera: "Ingeniería en Informática",
        correo: "estudiante@inacapmail.cl",
        telefono: "+56 9 0000 0000",
        sede: "Sede Temuco",
      }
    );
  }, []);

  const incompleto = useMemo(() => {
    return !form.nombre.trim() || !form.carrera.trim() || !form.correo.trim();
  }, [form]);

  const onChange = (k) => (e) => {
    setMsg("");
    setForm((p) => ({ ...p, [k]: e.target.value }));
  };

  const guardar = () => {
    setMsg("");

    if (incompleto) {
      setMsg("Completa al menos nombre, carrera y correo para guardar.");
      return;
    }

    saveJSON(LS_USER, {
      ...form,
      updatedAt: new Date().toISOString(),
    });

    setModoEdicion(false);
    setMsg("Datos guardados correctamente.");
  };

  return (
    <div className="est-page">
      <div className="est-shell">
        <header className="est-header">
          <div>
            <h1>Perfil del Estudiante</h1>
            <p className="est-sub">
              Mantén tu información actualizada. Esta ficha se usará para entrevistas, solicitudes y reportes.
            </p>
          </div>

          <div className="est-header-actions">
            {!modoEdicion ? (
              <button className="est-btn est-btn-soft" type="button" onClick={() => setModoEdicion(true)}>
                Editar
              </button>
            ) : (
              <div className="est-btnrow">
                <button className="est-btn est-btn-ghost" type="button" onClick={() => setModoEdicion(false)}>
                  Cancelar
                </button>
                <button className="est-btn est-btn-primary" type="button" onClick={guardar} disabled={incompleto}>
                  Guardar
                </button>
              </div>
            )}

            <button className="est-btn est-btn-ghost" type="button" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </header>

        {msg && <div className="est-alert">{msg}</div>}

        <section className="est-grid">
          <div className="est-card">
            <div className="est-card-title">Datos personales</div>

            <div className="est-formgrid">
              <div className="field">
                <label>Nombre completo</label>
                <input
                  value={form.nombre}
                  onChange={onChange("nombre")}
                  disabled={!modoEdicion}
                  placeholder="Nombre Apellido"
                />
              </div>

              <div className="field">
                <label>RUT</label>
                <input value={form.rut} onChange={onChange("rut")} disabled={!modoEdicion} placeholder="12.345.678-9" />
              </div>

              <div className="field">
                <label>Teléfono</label>
                <input
                  value={form.telefono}
                  onChange={onChange("telefono")}
                  disabled={!modoEdicion}
                  placeholder="+56 9 xxxx xxxx"
                />
              </div>

              <div className="field">
                <label>Correo</label>
                <input
                  value={form.correo}
                  onChange={onChange("correo")}
                  disabled={!modoEdicion}
                  placeholder="estudiante@inacap.cl"
                />
              </div>
            </div>
          </div>

          <div className="est-card">
            <div className="est-card-title">Información académica</div>

            <div className="est-formgrid">
              <div className="field wide">
                <label>Carrera</label>
                <input
                  value={form.carrera}
                  onChange={onChange("carrera")}
                  disabled={!modoEdicion}
                  placeholder="Ingeniería en Informática"
                />
              </div>

              <div className="field wide">
                <label>Sede</label>
                <input value={form.sede} onChange={onChange("sede")} disabled={!modoEdicion} placeholder="Sede Temuco" />
              </div>
            </div>

            <div className="est-note">
              En producción, estos datos se obtendrán desde la cuenta (auth) y se validarán contra registros institucionales.
            </div>
          </div>
        </section>

        <footer className="est-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
