// src/pages/homepage/Asesor/pages/DefinirAjustes.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DefinirAjustes.css";
import { CATEGORIAS, AJUSTES_POR_CATEGORIA } from "./ajustesRazonables";

function AjusteCard({ letra, categoria, categoriaNombre, ajuste, onRemove }) {
  if (!ajuste) return null;

  return (
    <div className="card-ajuste-resumen">
      <button
        type="button"
        className="btn-remove-ajuste"
        onClick={() => onRemove(categoria, ajuste.codigo)}
        aria-label="Eliminar ajuste"
      >
        ×
      </button>

      <div className="card-ajuste-header">
        <span className={`tag-categoria tag-${letra}`}>{letra}</span>
        <strong>
          {ajuste.codigo} – {ajuste.titulo}
        </strong>
      </div>

      <p className="card-ajuste-text">
        <strong>Tipo de ajuste:</strong> {categoriaNombre}
      </p>
      <p className="card-ajuste-text">
        <strong>Descripción:</strong> {ajuste.descripcion}
      </p>

      {ajuste.detalleExtra && (
        <p className="card-ajuste-text">
          <strong>Detalle ingresado:</strong> {ajuste.detalleExtra}
        </p>
      )}
    </div>
  );
}

export default function DefinirAjustes() {
  const navigate = useNavigate();

  // valor actual del select de cada categoría
  const [seleccion, setSeleccion] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  // detalle libre cuando se elige "Otras..."
  const [detalles, setDetalles] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
  });

  // ajustes agregados al caso (pueden ser varios por categoría)
  const [ajustesSeleccionados, setAjustesSeleccionados] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
  });

  const getAjuste = (cat, codigo) =>
    AJUSTES_POR_CATEGORIA[cat].find((a) => a.codigo === codigo);

  // Ajustes actualmente seleccionados en el combo
  const ajusteSelA = seleccion.A ? getAjuste("A", seleccion.A) : null;
  const ajusteSelB = seleccion.B ? getAjuste("B", seleccion.B) : null;
  const ajusteSelC = seleccion.C ? getAjuste("C", seleccion.C) : null;
  const ajusteSelD = seleccion.D ? getAjuste("D", seleccion.D) : null;

  const mostrarDetalleA = ajusteSelA?.requiereDetalle;
  const mostrarDetalleB = ajusteSelB?.requiereDetalle;
  const mostrarDetalleC = ajusteSelC?.requiereDetalle;
  const mostrarDetalleD = ajusteSelD?.requiereDetalle;

  const manejarCambioSeleccion = (cat, valor) => {
    setSeleccion((prev) => ({
      ...prev,
      [cat]: valor,
    }));
    setDetalles((prev) => ({
      ...prev,
      [cat]: "",
    }));
  };

  const agregarAjuste = (cat) => {
    const codigo = seleccion[cat];
    if (!codigo) return;

    const base = getAjuste(cat, codigo);
    if (!base) return;

    const yaExiste = ajustesSeleccionados[cat].some(
      (a) => a.codigo === codigo
    );
    if (yaExiste) return;

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

  const hayAlguno = ["A", "B", "C", "D"].some(
    (cat) => ajustesSeleccionados[cat].length > 0
  );

  return (
    <div className="asesor-form-page">
      <h2>Definir ajustes razonables</h2>
      <p className="asesor-form-text">
        En esta etapa la <strong>Coordinadora Técnica Pedagógica</strong> toma
        el caso registrado y selecciona, desde la Tabla de Ajustes Razonables{" "}
        (<strong>A, B, C, D</strong>), los ajustes que se propondrán para el
        estudiante.
      </p>

      {/* Flujo del caso – navegación entre pantallas del asesor */}
      <div className="flujo-etapas">
        <button
          type="button"
          className="etapa done"
          onClick={() => navigate("/asesor/registrar-caso")}
        >
          1. Entrevista / Registro de caso
        </button>
        <button
          type="button"
          className="etapa active"
          onClick={() => navigate("/asesor/definir-ajustes")}
        >
          2. Definición de ajustes
        </button>
        <button
          type="button"
          className="etapa"
          onClick={() => navigate("/asesor/seguimiento")}
        >
          3. Validación / Seguimiento
        </button>
        <button
          type="button"
          className="etapa"
          onClick={() => navigate("/asesor/evaluacion-final")}
        >
          4. Evaluación final
        </button>
      </div>

      <fieldset className="asesor-fieldset">
        <legend>Selección de ajustes por categoría</legend>

        <p className="ajustes-panel-text">
          Puedes agregar varios ajustes en cada categoría{" "}
          <strong>(A, B, C y D)</strong>. Selecciona un ajuste y presiona{" "}
          <strong>“Agregar”</strong>. Si eliges la opción{" "}
          <strong>“Otras …”</strong>, aparecerá un espacio para escribir el
          detalle específico del ajuste.
        </p>

        {/* A */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-A">A</span>
            <span className="definir-bloque-titulo">{CATEGORIAS.A}</span>
          </div>

          <label className="select-categoria-ajuste-label">
            Seleccionar presentación de la información (A)
            <div className="select-row">
              <select
                className="select-categoria-ajuste"
                value={seleccion.A}
                onChange={(e) => manejarCambioSeleccion("A", e.target.value)}
              >
                <option value="">Seleccione un ajuste A</option>
                {AJUSTES_POR_CATEGORIA.A.map((aj) => (
                  <option key={aj.codigo} value={aj.codigo}>
                    {aj.codigo} – {aj.titulo}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-agregar-ajuste"
                onClick={() => agregarAjuste("A")}
              >
                Agregar
              </button>
            </div>
          </label>

          {mostrarDetalleA && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (A – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalles.A}
                onChange={(e) =>
                  setDetalles((prev) => ({ ...prev, A: e.target.value }))
                }
              />
            </label>
          )}
        </div>

        {/* B */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-B">B</span>
            <span className="definir-bloque-titulo">{CATEGORIAS.B}</span>
          </div>

          <label className="select-categoria-ajuste-label">
            Seleccionar ajuste de entorno (B)
            <div className="select-row">
              <select
                className="select-categoria-ajuste"
                value={seleccion.B}
                onChange={(e) => manejarCambioSeleccion("B", e.target.value)}
              >
                <option value="">Seleccione un ajuste B</option>
                {AJUSTES_POR_CATEGORIA.B.map((aj) => (
                  <option key={aj.codigo} value={aj.codigo}>
                    {aj.codigo} – {aj.titulo}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-agregar-ajuste"
                onClick={() => agregarAjuste("B")}
              >
                Agregar
              </button>
            </div>
          </label>

          {mostrarDetalleB && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (B – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalles.B}
                onChange={(e) =>
                  setDetalles((prev) => ({ ...prev, B: e.target.value }))
                }
              />
            </label>
          )}
        </div>

        {/* C */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-C">C</span>
            <span className="definir-bloque-titulo">{CATEGORIAS.C}</span>
          </div>

          <label className="select-categoria-ajuste-label">
            Seleccionar forma de respuesta (C)
            <div className="select-row">
              <select
                className="select-categoria-ajuste"
                value={seleccion.C}
                onChange={(e) => manejarCambioSeleccion("C", e.target.value)}
              >
                <option value="">Seleccione un ajuste C</option>
                {AJUSTES_POR_CATEGORIA.C.map((aj) => (
                  <option key={aj.codigo} value={aj.codigo}>
                    {aj.codigo} – {aj.titulo}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-agregar-ajuste"
                onClick={() => agregarAjuste("C")}
              >
                Agregar
              </button>
            </div>
          </label>

          {mostrarDetalleC && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (C – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalles.C}
                onChange={(e) =>
                  setDetalles((prev) => ({ ...prev, C: e.target.value }))
                }
              />
            </label>
          )}
        </div>

        {/* D */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-D">D</span>
            <span className="definir-bloque-titulo">{CATEGORIAS.D}</span>
          </div>

          <label className="select-categoria-ajuste-label">
            Seleccionar organización del tiempo y horario (D)
            <div className="select-row">
              <select
                className="select-categoria-ajuste"
                value={seleccion.D}
                onChange={(e) => manejarCambioSeleccion("D", e.target.value)}
              >
                <option value="">Seleccione un ajuste D</option>
                {AJUSTES_POR_CATEGORIA.D.map((aj) => (
                  <option key={aj.codigo} value={aj.codigo}>
                    {aj.codigo} – {aj.titulo}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-agregar-ajuste"
                onClick={() => agregarAjuste("D")}
              >
                Agregar
              </button>
            </div>
          </label>

          {mostrarDetalleD && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (D – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalles.D}
                onChange={(e) =>
                  setDetalles((prev) => ({ ...prev, D: e.target.value }))
                }
              />
            </label>
          )}
        </div>
      </fieldset>

      {/* Resumen de todos los ajustes agregados */}
      <div className="resumen-ajustes-cuadros">
        <h3>Resumen de ajustes seleccionados para este caso</h3>
        <p className="ajustes-panel-text">
          Aquí se muestran todos los ajustes escogidos de las categorías{" "}
          <strong>A, B, C y D</strong>. Desde estas tarjetas puedes eliminar un
          ajuste si ya no corresponde al caso.
        </p>

        {hayAlguno ? (
          <div className="resumen-ajustes-grid">
            {["A", "B", "C", "D"].map((cat) =>
              ajustesSeleccionados[cat].map((ajuste) => (
                <AjusteCard
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
          <p className="ajustes-panel-text">
            Aún no se ha agregado ningún ajuste al caso.
          </p>
        )}
      </div>

      <div className="asesor-form-buttons">
        <button type="button" className="btn-asesor-primary">
          Guardar definición (demo)
        </button>
        <Link to="/Asesor" className="btn-asesor-volver">
          Volver al inicio Asesor
        </Link>
      </div>
    </div>
  );
}
