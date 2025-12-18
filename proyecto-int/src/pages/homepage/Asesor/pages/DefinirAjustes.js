// src/pages/homepage/Asesor/pages/DefinirAjustes.js
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DefinirAjustes.css";
import { CATEGORIAS, AJUSTES_POR_CATEGORIA } from "./ajustesRazonables";

function AjusteResumenCard({ letra, categoria, categoriaNombre, ajuste, onRemove }) {
  if (!ajuste) return null;

  return (
    <div className="def-card">
      <div className="def-card-head">
        <div className="def-badge-row">
          <span className={`def-pill def-pill-${letra}`}>{letra}</span>
          <span className="def-code">{ajuste.codigo}</span>
        </div>

        <button
          type="button"
          className="def-icon-btn"
          onClick={() => onRemove(categoria, ajuste.codigo)}
          aria-label="Eliminar ajuste"
          title="Quitar ajuste"
        >
          ×
        </button>
      </div>

      <div className="def-card-title">
        {ajuste.titulo}
        {ajuste.detalleExtra ? (
          <span className="def-card-title-extra"> — {ajuste.detalleExtra}</span>
        ) : null}
      </div>

      <div className="def-card-meta">
        <div>
          <span className="def-muted">Tipo:</span>{" "}
          <strong>{categoriaNombre}</strong>
        </div>
        <div className="def-desc">{ajuste.descripcion}</div>
      </div>
    </div>
  );
}

export default function DefinirAjustes() {
  const navigate = useNavigate();

  // Ruta a "ventana de detalles"
  const DETALLE_CASO_PATH = "/asesor/seguimiento";

  // Volver como flecha atrás (con fallback)
  const volverAtras = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  // valor actual del select de cada categoría
  const [seleccion, setSeleccion] = useState({ A: "", B: "", C: "", D: "" });

  // detalle libre cuando se elige "Otras..."
  const [detalles, setDetalles] = useState({ A: "", B: "", C: "", D: "" });

  // ajustes agregados al caso (pueden ser varios por categoría)
  const [ajustesSeleccionados, setAjustesSeleccionados] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
  });

  const getAjuste = (cat, codigo) =>
    AJUSTES_POR_CATEGORIA[cat].find((a) => a.codigo === codigo);

  const ajusteSelA = seleccion.A ? getAjuste("A", seleccion.A) : null;
  const ajusteSelB = seleccion.B ? getAjuste("B", seleccion.B) : null;
  const ajusteSelC = seleccion.C ? getAjuste("C", seleccion.C) : null;
  const ajusteSelD = seleccion.D ? getAjuste("D", seleccion.D) : null;

  const mostrarDetalleA = ajusteSelA?.requiereDetalle;
  const mostrarDetalleB = ajusteSelB?.requiereDetalle;
  const mostrarDetalleC = ajusteSelC?.requiereDetalle;
  const mostrarDetalleD = ajusteSelD?.requiereDetalle;

  const manejarCambioSeleccion = (cat, valor) => {
    setSeleccion((prev) => ({ ...prev, [cat]: valor }));
    setDetalles((prev) => ({ ...prev, [cat]: "" }));
  };

  const estaAgregado = (cat, codigo) =>
    ajustesSeleccionados[cat].some((a) => a.codigo === codigo);

  const agregarAjuste = (cat) => {
    const codigo = seleccion[cat];
    if (!codigo) return;

    const base = getAjuste(cat, codigo);
    if (!base) return;

    if (estaAgregado(cat, codigo)) return;

    const detalleExtra = base.requiereDetalle ? detalles[cat].trim() : "";

    setAjustesSeleccionados((prev) => ({
      ...prev,
      [cat]: [...prev[cat], { ...base, detalleExtra }],
    }));

    setSeleccion((prev) => ({ ...prev, [cat]: "" }));
    setDetalles((prev) => ({ ...prev, [cat]: "" }));
  };

  const quitarAjuste = (cat, codigo) => {
    setAjustesSeleccionados((prev) => ({
      ...prev,
      [cat]: prev[cat].filter((a) => a.codigo !== codigo),
    }));
  };

  const hayAlguno = useMemo(
    () => ["A", "B", "C", "D"].some((cat) => ajustesSeleccionados[cat].length > 0),
    [ajustesSeleccionados]
  );

  const totalAjustes = useMemo(
    () =>
      ["A", "B", "C", "D"].reduce((acc, cat) => acc + ajustesSeleccionados[cat].length, 0),
    [ajustesSeleccionados]
  );

  const guardarYVerDetalle = () => {
    if (!hayAlguno) {
      alert("Debes agregar al menos un ajuste antes de continuar.");
      return;
    }

    navigate(DETALLE_CASO_PATH, {
      state: { ajustesSeleccionados },
    });
  };

  // render de “agregados” (select bloqueado + quitar)
  const renderAgregados = (cat) => {
    const lista = ajustesSeleccionados[cat];
    if (!lista || lista.length === 0) return null;

    return (
      <div className="def-added-list">
        {lista.map((aj) => (
          <div key={`${cat}-${aj.codigo}`} className="def-added-item">
            <div className="def-row">
              <select className="def-select" value={aj.codigo} disabled>
                <option value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              </select>

              <button
                type="button"
                className="def-btn def-btn-danger"
                onClick={() => quitarAjuste(cat, aj.codigo)}
              >
                Quitar
              </button>
            </div>

            {aj.detalleExtra ? (
              <div className="def-added-extra">
                <strong>Detalle:</strong> {aj.detalleExtra}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  };

  const BloqueCategoria = ({ letra, titulo, mostrarDetalle, detalleValue }) => {
    const cat = letra;

    return (
      <section className="def-block">
        <div className="def-block-head">
          <div className="def-block-left">
            <span className={`def-pill def-pill-${letra}`}>{letra}</span>
            <div>
              <div className="def-block-title">{titulo}</div>
              <div className="def-block-sub">
                Selecciona un ajuste y presiona <strong>Agregar</strong>.
              </div>
            </div>
          </div>

          <div className="def-block-kpi">
            <span className="def-muted">Agregados</span>
            <strong>{ajustesSeleccionados[cat].length}</strong>
          </div>
        </div>

        {renderAgregados(cat)}

        <label className="def-label">
          Seleccionar ajuste ({letra})
          <div className="def-row">
            <select
              className="def-select"
              value={seleccion[cat]}
              onChange={(e) => manejarCambioSeleccion(cat, e.target.value)}
            >
              <option value="">Seleccione un ajuste {letra}</option>
              {AJUSTES_POR_CATEGORIA[cat].map((aj) => {
                const disabled = estaAgregado(cat, aj.codigo);
                return (
                  <option key={aj.codigo} value={aj.codigo} disabled={disabled}>
                    {aj.codigo} – {aj.titulo}
                    {disabled ? " (ya agregado)" : ""}
                  </option>
                );
              })}
            </select>

            <button
              type="button"
              className="def-btn def-btn-primary"
              disabled={!seleccion[cat] || estaAgregado(cat, seleccion[cat])}
              onClick={() => agregarAjuste(cat)}
            >
              Agregar
            </button>
          </div>
        </label>

        {mostrarDetalle ? (
          <label className="def-label">
            Detalle del ajuste (Otras…)
            <textarea
              className="def-textarea"
              rows={3}
              placeholder="Describe brevemente el ajuste razonable que quieres registrar."
              value={detalleValue}
              onChange={(e) => setDetalles((prev) => ({ ...prev, [cat]: e.target.value }))}
            />
          </label>
        ) : null}
      </section>
    );
  };

  return (
    <div className="def-page">
      {/* TOPBAR */}
      <header className="def-topbar">
        <div className="def-topbar-left">
          <h2>Definir ajustes razonables</h2>
          <p>
            La <strong>Coordinadora Técnica Pedagógica</strong> selecciona ajustes (A, B, C, D)
            que se propondrán para el estudiante.
          </p>
        </div>

        <div className="def-topbar-right">
          <div className="def-kpi">
            <span className="def-kpi-label">Total ajustes</span>
            <strong className="def-kpi-value">{totalAjustes}</strong>
          </div>
          <div className="def-kpi">
            <span className="def-kpi-label">¿Listo para enviar?</span>
            <strong className="def-kpi-value">{hayAlguno ? "Sí" : "No"}</strong>
          </div>

          <div className="def-actions">
            <button type="button" className="def-btn def-btn-primary" onClick={guardarYVerDetalle}>
              Guardar y ver detalle
            </button>
            <button type="button" className="def-btn def-btn-ghost" onClick={volverAtras}>
              Volver
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="def-main">
        <section className="def-card-surface">
          <div className="def-card-surface-head">
            <h3>Selección por categoría</h3>
            <span className="def-muted">
              Puedes agregar varios ajustes por categoría. Evitamos duplicados automáticamente.
            </span>
          </div>

          <div className="def-blocks">
            <BloqueCategoria
              letra="A"
              titulo={CATEGORIAS.A}
              mostrarDetalle={mostrarDetalleA}
              detalleValue={detalles.A}
            />
            <BloqueCategoria
              letra="B"
              titulo={CATEGORIAS.B}
              mostrarDetalle={mostrarDetalleB}
              detalleValue={detalles.B}
            />
            <BloqueCategoria
              letra="C"
              titulo={CATEGORIAS.C}
              mostrarDetalle={mostrarDetalleC}
              detalleValue={detalles.C}
            />
            <BloqueCategoria
              letra="D"
              titulo={CATEGORIAS.D}
              mostrarDetalle={mostrarDetalleD}
              detalleValue={detalles.D}
            />
          </div>
        </section>

        {/* RESUMEN */}
        <section className="def-card-surface">
          <div className="def-card-surface-head">
            <h3>Resumen de ajustes seleccionados</h3>
            <span className="def-muted">Desde aquí puedes quitar ajustes rápidamente.</span>
          </div>

          {hayAlguno ? (
            <div className="def-grid">
              {["A", "B", "C", "D"].map((cat) =>
                ajustesSeleccionados[cat].map((ajuste) => (
                  <AjusteResumenCard
                    key={`${cat}-${ajuste.codigo}`}
                    letra={cat}
                    categoria={cat}
                    categoriaNombre={CATEGORIAS[cat]}
                    ajuste={ajuste}
                    onRemove={quitarAjuste}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="def-empty">
              Aún no se ha agregado ningún ajuste al caso.
            </div>
          )}

          <div className="def-bottom-actions">
            <button type="button" className="def-btn def-btn-primary" onClick={guardarYVerDetalle}>
              Guardar y ver detalle
            </button>
            <button type="button" className="def-btn def-btn-ghost" onClick={volverAtras}>
              Volver
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
