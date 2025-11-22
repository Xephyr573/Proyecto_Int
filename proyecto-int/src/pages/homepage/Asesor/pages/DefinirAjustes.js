// src/pages/homepage/Asesor/pages/DefinirAjustes.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DefinirAjustes.css";
import { CATEGORIAS, AJUSTES_POR_CATEGORIA } from "./ajustesRazonables";

function AjusteCard({ letra, categoriaNombre, ajuste, detalleExtra }) {
  if (!ajuste) return null;

  return (
    <div className="card-ajuste-resumen">
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
      {detalleExtra && (
        <p className="card-ajuste-text">
          <strong>Detalle ingresado:</strong> {detalleExtra}
        </p>
      )}
    </div>
  );
}

export default function DefinirAjustes() {
  const navigate = useNavigate();

  // selección de cada categoría
  const [selA, setSelA] = useState("");
  const [selB, setSelB] = useState("");
  const [selC, setSelC] = useState("");
  const [selD, setSelD] = useState("");

  // detalle libre cuando se elige "Otras..."
  const [detalleA, setDetalleA] = useState("");
  const [detalleB, setDetalleB] = useState("");
  const [detalleC, setDetalleC] = useState("");
  const [detalleD, setDetalleD] = useState("");

  const getAjuste = (cat, codigo) =>
    AJUSTES_POR_CATEGORIA[cat].find((a) => a.codigo === codigo);

  const ajusteA = selA ? getAjuste("A", selA) : null;
  const ajusteB = selB ? getAjuste("B", selB) : null;
  const ajusteC = selC ? getAjuste("C", selC) : null;
  const ajusteD = selD ? getAjuste("D", selD) : null;

  // si el ajuste tiene requiereDetalle = true => mostramos textarea
  const mostrarDetalleA = ajusteA?.requiereDetalle;
  const mostrarDetalleB = ajusteB?.requiereDetalle;
  const mostrarDetalleC = ajusteC?.requiereDetalle;
  const mostrarDetalleD = ajusteD?.requiereDetalle;

  const hayAlguno = ajusteA || ajusteB || ajusteC || ajusteD;

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
          Puedes seleccionar un ajuste en cada categoría{" "}
          <strong>(A, B, C y D)</strong>. Si eliges la opción{" "}
          <strong>“Otras …”</strong>, aparecerá un espacio para escribir el
          detalle específico del ajuste que quieres registrar.
        </p>

        {/* A */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-A">A</span>
            <span className="definir-bloque-titulo">{CATEGORIAS.A}</span>
          </div>
          <label className="select-categoria-ajuste-label">
            Seleccionar presentación de la información (A)
            <select
              className="select-categoria-ajuste"
              value={selA}
              onChange={(e) => {
                setSelA(e.target.value);
                setDetalleA("");
              }}
            >
              <option value="">Seleccione un ajuste A</option>
              {AJUSTES_POR_CATEGORIA.A.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>

          {mostrarDetalleA && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (A – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalleA}
                onChange={(e) => setDetalleA(e.target.value)}
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
            <select
              className="select-categoria-ajuste"
              value={selB}
              onChange={(e) => {
                setSelB(e.target.value);
                setDetalleB("");
              }}
            >
              <option value="">Seleccione un ajuste B</option>
              {AJUSTES_POR_CATEGORIA.B.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>

          {mostrarDetalleB && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (B – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalleB}
                onChange={(e) => setDetalleB(e.target.value)}
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
            <select
              className="select-categoria-ajuste"
              value={selC}
              onChange={(e) => {
                setSelC(e.target.value);
                setDetalleC("");
              }}
            >
              <option value="">Seleccione un ajuste C</option>
              {AJUSTES_POR_CATEGORIA.C.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>

          {mostrarDetalleC && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (C – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalleC}
                onChange={(e) => setDetalleC(e.target.value)}
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
            <select
              className="select-categoria-ajuste"
              value={selD}
              onChange={(e) => {
                setSelD(e.target.value);
                setDetalleD("");
              }}
            >
              <option value="">Seleccione un ajuste D</option>
              {AJUSTES_POR_CATEGORIA.D.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>

          {mostrarDetalleD && (
            <label className="select-categoria-ajuste-label">
              Detalle del ajuste seleccionado (D – Otras)
              <textarea
                className="input-ajuste-detalle"
                rows={3}
                placeholder="Describa brevemente el ajuste razonable que desea registrar."
                value={detalleD}
                onChange={(e) => setDetalleD(e.target.value)}
              />
            </label>
          )}
        </div>
      </fieldset>

      {/* Resumen de los 4 ajustes */}
      <div className="resumen-ajustes-cuadros">
        <h3>Resumen de ajustes seleccionados para este caso</h3>
        <p className="ajustes-panel-text">
          Aquí se muestran en conjunto los ajustes escogidos de las categorías{" "}
          <strong>A, B, C y D</strong>. Esta información es la que luego verá la
          Directora en la validación y el panel de seguimiento.
        </p>

        {hayAlguno ? (
          <div className="resumen-ajustes-grid">
            <AjusteCard
              letra="A"
              categoriaNombre={CATEGORIAS.A}
              ajuste={ajusteA}
              detalleExtra={detalleA}
            />
            <AjusteCard
              letra="B"
              categoriaNombre={CATEGORIAS.B}
              ajuste={ajusteB}
              detalleExtra={detalleB}
            />
            <AjusteCard
              letra="C"
              categoriaNombre={CATEGORIAS.C}
              ajuste={ajusteC}
              detalleExtra={detalleC}
            />
            <AjusteCard
              letra="D"
              categoriaNombre={CATEGORIAS.D}
              ajuste={ajusteD}
              detalleExtra={detalleD}
            />
          </div>
        ) : (
          <p className="ajustes-panel-text">
            Aún no se ha seleccionado ningún ajuste.
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
