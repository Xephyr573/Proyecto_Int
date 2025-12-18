// src/pages/homepage/Asesor/pages/flujo/SeguimientoCaso.js
import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SeguimientoCaso.css";

const AJUSTES_SEGUIMIENTO = [
  {
    categoria: "A",
    codigo: "A1",
    titulo: "Amplificación de la letra (macrotipo) o imagen",
    descripcion:
      "Letra más grande en guías, presentaciones y evaluaciones para favorecer la lectura.",
  },
  {
    categoria: "B",
    codigo: "B1",
    titulo: "Ubicar al estudiante en un lugar estratégico dentro de la sala",
    descripcion: "Puesto que disminuya distracciones y favorezca la participación.",
  },
  {
    categoria: "C",
    codigo: "C1",
    titulo: "Dar mayor tiempo de respuesta y ejecución",
    descripcion:
      "Permitir más tiempo para responder, participar y rendir evaluaciones.",
  },
  {
    categoria: "D",
    codigo: "D1",
    titulo: "Disponer de un 50% de tiempo extra en evaluaciones",
    descripcion:
      "Extender el tiempo disponible en evaluaciones escritas u online.",
  },
];

function normalizarAjustesDesdeState(ajustesSeleccionados) {
  if (!ajustesSeleccionados || typeof ajustesSeleccionados !== "object") return [];
  const cats = ["A", "B", "C", "D"];
  const result = [];

  for (const cat of cats) {
    const lista = Array.isArray(ajustesSeleccionados[cat]) ? ajustesSeleccionados[cat] : [];
    for (const aj of lista) {
      const codigo = aj?.codigo || aj?.id || `${cat}-SINCOD`;
      const titulo = aj?.titulo || aj?.nombre || "Ajuste";
      const descripcion = aj?.descripcion || "";
      const detalleExtra = aj?.detalleExtra || "";
      result.push({ categoria: cat, codigo, titulo, descripcion, detalleExtra });
    }
  }
  return result;
}

export default function SeguimientoCaso() {
  const navigate = useNavigate();
  const location = useLocation();

  const volverAtras = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const ajustes = useMemo(() => {
    const fromState = normalizarAjustesDesdeState(location.state?.ajustesSeleccionados);
    return fromState.length > 0 ? fromState : AJUSTES_SEGUIMIENTO;
  }, [location.state]);

  const [seguimiento, setSeguimiento] = useState({});

  const setCampo = (key, campo, valor) => {
    setSeguimiento((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || {
          medicacion: "",
          desempeno: "",
          cambios: "",
          apoyo: "",
        }),
        [campo]: valor,
      },
    }));
  };

  const contadores = useMemo(() => {
    const total = ajustes.length;
    const conTexto = Object.values(seguimiento).filter((r) =>
      (r?.medicacion || r?.desempeno || r?.cambios || r?.apoyo || "").trim()
    ).length;
    return { total, conTexto };
  }, [ajustes.length, seguimiento]);

  const handleGuardar = () => {
    alert("Seguimiento guardado (demo).");
  };

  return (
    <div className="seg-page">
      {/* Topbar */}
      <header className="seg-topbar">
        <div className="seg-topbar-left">
          <h2>Seguimiento del caso</h2>
          <p>
            Panel para <strong>Coordinadora Técnica Pedagógica</strong>. Registra observaciones por ajuste.
          </p>
        </div>

        <div className="seg-topbar-right">
          <div className="seg-kpi">
            <span className="seg-kpi-label">Ajustes</span>
            <strong className="seg-kpi-value">{contadores.total}</strong>
          </div>
          <div className="seg-kpi">
            <span className="seg-kpi-label">Con seguimiento</span>
            <strong className="seg-kpi-value">{contadores.conTexto}</strong>
          </div>

          <div className="seg-actions">
            <button type="button" className="seg-btn seg-btn-primary" onClick={handleGuardar}>
              Guardar
            </button>
            <button type="button" className="seg-btn seg-btn-ghost" onClick={volverAtras}>
              Volver
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="seg-main">
        <section className="seg-card">
          <div className="seg-card-head">
            <h3>Ajustes del estudiante</h3>
            <span className="seg-muted">
              La descripción no se edita; solo registras seguimiento.
            </span>
          </div>

          <div className="seg-grid">
            {ajustes.map((ajuste, index) => {
              const key = `${ajuste.categoria}-${ajuste.codigo || index}`;
              const row = seguimiento[key] || {
                medicacion: "",
                desempeno: "",
                cambios: "",
                apoyo: "",
              };

              return (
                <article key={key} className="seg-item">
                  <div className="seg-item-head">
                    <div className="seg-badge-row">
                      <span className={`seg-pill seg-pill-${ajuste.categoria}`}>
                        {ajuste.categoria}
                      </span>
                      <span className="seg-code">{ajuste.codigo}</span>
                    </div>

                    <div className="seg-title">
                      {ajuste.titulo}
                      {ajuste.detalleExtra ? (
                        <span className="seg-title-extra"> — {ajuste.detalleExtra}</span>
                      ) : null}
                    </div>

                    <div className="seg-desc">{ajuste.descripcion}</div>
                  </div>

                  <div className="seg-fields">
                    <label className="seg-field">
                      <span>¿Ha habido cambio? (Medicación)</span>
                      <textarea
                        rows={3}
                        value={row.medicacion}
                        onChange={(e) => setCampo(key, "medicacion", e.target.value)}
                        placeholder="Ej: cambios en medicación, ajustes de dosis, etc."
                      />
                    </label>

                    <label className="seg-field">
                      <span>Desempeño del ajuste</span>
                      <textarea
                        rows={3}
                        value={row.desempeno}
                        onChange={(e) => setCampo(key, "desempeno", e.target.value)}
                        placeholder="Ej: notas suben, participa más, mejor comprensión..."
                      />
                    </label>

                    <label className="seg-field">
                      <span>¿Hay que hacer algún cambio?</span>
                      <textarea
                        rows={3}
                        value={row.cambios}
                        onChange={(e) => setCampo(key, "cambios", e.target.value)}
                        placeholder="Ej: mantener, ampliar, reemplazar, condiciones por asignatura..."
                      />
                    </label>

                    <label className="seg-field">
                      <span>Apoyo del profesor</span>
                      <textarea
                        rows={3}
                        value={row.apoyo}
                        onChange={(e) => setCampo(key, "apoyo", e.target.value)}
                        placeholder="Ej: aplica consistentemente, registra evidencias, requiere coordinación..."
                      />
                    </label>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Botonera abajo (por si scrolleas) */}
        <div className="seg-bottom-actions">
          <button type="button" className="seg-btn seg-btn-primary" onClick={handleGuardar}>
            Guardar seguimiento
          </button>
          <button type="button" className="seg-btn seg-btn-ghost" onClick={volverAtras}>
            Volver
          </button>
        </div>
      </main>
    </div>
  );
}
