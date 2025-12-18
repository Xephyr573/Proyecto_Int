import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NecesidadesEspeciales.css";

const LS_USER = "sgar_user";
const LS_NEEDS = "sgar_needs_v1";
const LS_NEEDS_FILES = "sgar_needs_files_v1";

const TIPOS = [
  "Visual",
  "Auditiva",
  "Motriz",
  "Neurodivergencia",
  "Salud mental",
  "Condición crónica",
  "Temporal",
  "Otra",
];

const BARRERAS = [
  "Lectura de material y diapositivas",
  "Evaluaciones con tiempo limitado",
  "Acceso a material digital",
  "Exposición oral / participación",
  "Movilidad / acceso a sala",
  "Audición / comprensión en sala",
  "Atención / concentración",
];

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

export default function NecesidadesEspeciales() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);

  const [tipo, setTipo] = useState("Visual");
  const [descripcion, setDescripcion] = useState("");
  const [barreras, setBarreras] = useState([]);
  const [apoyos, setApoyos] = useState("");
  const [estado, setEstado] = useState("Borrador"); // Borrador | En revisión
  const [mensaje, setMensaje] = useState("");

  const correoKey = useMemo(() => (perfil?.correo || "anon").toLowerCase(), [perfil]);

  const [adjuntos, setAdjuntos] = useState([]);

  useEffect(() => {
    const user = loadJSON(LS_USER, null);
    setPerfil(
      user || {
        nombre: "Nombre Nombre Apellido Apellido",
        correo: "estudiante@inacapmail.cl",
        carrera: "Ingeniería en Informática",
        sede: "Sede Temuco",
      }
    );
  }, []);

  useEffect(() => {
    const all = loadJSON(LS_NEEDS, {});
    const saved = all[correoKey];
    if (saved) {
      setTipo(saved.tipo || "Visual");
      setDescripcion(saved.descripcion || "");
      setBarreras(saved.barreras || []);
      setApoyos(saved.apoyos || "");
      setEstado(saved.estado || "Borrador");
    }

    const filesAll = loadJSON(LS_NEEDS_FILES, {});
    setAdjuntos(filesAll[correoKey] || []);
  }, [correoKey]);

  const toggleBarrera = (item) => {
    setBarreras((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));
  };

  const guardar = (nextEstado) => {
    setMensaje("");

    if (!descripcion.trim()) {
      setMensaje("Completa la descripción para guardar la información.");
      return;
    }

    const payload = {
      tipo,
      descripcion,
      barreras,
      apoyos,
      estado: nextEstado,
      updatedAt: new Date().toISOString(),
    };

    const all = loadJSON(LS_NEEDS, {});
    all[correoKey] = payload;
    saveJSON(LS_NEEDS, all);

    setEstado(nextEstado);
    setMensaje(nextEstado === "En revisión" ? "Solicitud enviada a revisión." : "Borrador guardado.");
  };

  const handleAdjuntos = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const next = [
      ...adjuntos,
      ...files.map((f) => ({
        id: `F-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: f.name,
        size: f.size,
        type: f.type || "archivo",
        uploadedAt: new Date().toISOString(),
        status: "Pendiente", // Pendiente | Validado | Rechazado (backend)
      })),
    ];

    setAdjuntos(next);

    const filesAll = loadJSON(LS_NEEDS_FILES, {});
    filesAll[correoKey] = next;
    saveJSON(LS_NEEDS_FILES, filesAll);

    e.target.value = "";
  };

  const eliminarAdjunto = (id) => {
    const next = adjuntos.filter((a) => a.id !== id);
    setAdjuntos(next);

    const filesAll = loadJSON(LS_NEEDS_FILES, {});
    filesAll[correoKey] = next;
    saveJSON(LS_NEEDS_FILES, filesAll);
  };

  return (
    <div className="st-page">
      <div className="st-shell">
        <header className="st-header">
          <div>
            <h1>Necesidades Especiales</h1>
            <p className="st-sub">
              Mantén actualizada tu información para que el proceso de inclusión tenga trazabilidad.
            </p>
          </div>

          <div className="st-header-right">
            <div className={"st-badge " + (estado === "En revisión" ? "st-badge-warn" : "st-badge-draft")}>
              {estado}
            </div>
            <button className="st-btn st-btn-ghost" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </header>

        <section className="st-grid2">
          <div className="st-card">
            <div className="st-card-title">Perfil</div>
            <div className="st-kv">
              <div>
                <span>Nombre</span>
                <strong>{perfil?.nombre}</strong>
              </div>
              <div>
                <span>Correo</span>
                <strong>{perfil?.correo}</strong>
              </div>
              <div>
                <span>Carrera</span>
                <strong>{perfil?.carrera}</strong>
              </div>
              <div>
                <span>Sede</span>
                <strong>{perfil?.sede}</strong>
              </div>
            </div>
          </div>

          <div className="st-card">
            <div className="st-card-title">Estado del registro</div>
            <p className="st-help">
              “Borrador” no se envía a la Encargada. “En revisión” queda pendiente de validación (backend).
            </p>

            {mensaje && <div className="st-alert">{mensaje}</div>}

            <div className="st-actions">
              <button className="st-btn st-btn-soft" type="button" onClick={() => guardar("Borrador")}>
                Guardar borrador
              </button>
              <button className="st-btn st-btn-primary" type="button" onClick={() => guardar("En revisión")}>
                Enviar a revisión
              </button>
            </div>
          </div>
        </section>

        <section className="st-card st-formcard">
          <div className="st-card-title">Formulario</div>

          <div className="st-formgrid">
            <div className="st-field">
              <label>Tipo de necesidad</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                {TIPOS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="st-field st-field-wide">
              <label>Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describe brevemente tu necesidad y cómo impacta tu experiencia académica."
              />
            </div>

            <div className="st-field st-field-wide">
              <label>Barreras identificadas</label>
              <div className="st-checkgrid">
                {BARRERAS.map((b) => (
                  <label key={b} className="st-check">
                    <input type="checkbox" checked={barreras.includes(b)} onChange={() => toggleBarrera(b)} />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="st-field st-field-wide">
              <label>Apoyos requeridos / sugeridos</label>
              <input
                value={apoyos}
                onChange={(e) => setApoyos(e.target.value)}
                placeholder="Ej: material ampliado, tiempo adicional, ubicación estratégica, ayudas tecnológicas."
              />
            </div>
          </div>
        </section>

        <section className="st-card">
          <div className="st-card-title">Documentos de respaldo</div>
          <p className="st-help">
            En demo se guarda solo el nombre del archivo. En producción se sube al backend (S3/Drive/Servidor).
          </p>

          <div className="st-upload">
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={handleAdjuntos} />
          </div>

          <div className="st-tablewrap">
            <table className="st-table">
              <thead>
                <tr>
                  <th>Archivo</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adjuntos.length === 0 && (
                  <tr>
                    <td colSpan={4} className="st-empty">
                      No hay documentos cargados.
                    </td>
                  </tr>
                )}
                {adjuntos.map((a) => (
                  <tr key={a.id}>
                    <td className="st-ellipsis">{a.name}</td>
                    <td>
                      <span className={"st-pill " + (a.status === "Validado" ? "ok" : a.status === "Rechazado" ? "no" : "warn")}>
                        {a.status}
                      </span>
                    </td>
                    <td>{new Date(a.uploadedAt).toLocaleDateString("es-CL")}</td>
                    <td className="st-right">
                      <button className="st-link" type="button" onClick={() => eliminarAdjunto(a.id)}>
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="st-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
