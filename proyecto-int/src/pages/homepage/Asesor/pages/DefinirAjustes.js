import { useState } from "react";
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";
import {
  CATEGORIAS,
  AJUSTES_POR_CATEGORIA,
} from "./ajustesRazonables";

// Componente pequeño para la tarjeta del resumen final
function AjusteCard({ letra, categoriaNombre, ajuste }) {
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
    </div>
  );
}

export default function DefinirAjustes() {
  // selección de cada categoría
  const [selA, setSelA] = useState("");
  const [selB, setSelB] = useState("");
  const [selC, setSelC] = useState("");
  const [selD, setSelD] = useState("");

  // desbloqueos en cadena
  const puedeB = !!selA;
  const puedeC = !!selB;
  const puedeD = !!selC;

  const getAjuste = (categoria, codigo) =>
    AJUSTES_POR_CATEGORIA[categoria].find((a) => a.codigo === codigo);

  const ajusteA = selA ? getAjuste("A", selA) : null;
  const ajusteB = selB ? getAjuste("B", selB) : null;
  const ajusteC = selC ? getAjuste("C", selC) : null;
  const ajusteD = selD ? getAjuste("D", selD) : null;

  const hayAlguno = ajusteA || ajusteB || ajusteC || ajusteD;

  return (
    <div className="asesor-form-page">
      <h2>Definir ajustes razonables</h2>
      <p className="asesor-form-text">
        En esta etapa la <strong>Coordinadora Técnica Pedagógica</strong> toma
        el caso registrado y selecciona, desde la Tabla de Ajustes Razonables
        (<strong>A, B, C, D</strong>), los ajustes que se propondrán para el
        estudiante. Primero se define la categoría A, luego B, después C y
        finalmente D. Cada selección se muestra en un resumen al final.
      </p>

      {/* Flujo semestral */}
      <div className="flujo-etapas">
        <div className="etapa done">1. Entrevista / Registro de caso</div>
        <div className="etapa active">2. Definición de ajustes</div>
        <div className="etapa">3. Seguimiento</div>
        <div className="etapa">4. Evaluación final</div>
      </div>

      {/* Resumen del caso con grid bonito */}
      <fieldset className="asesor-fieldset">
        <legend>Resumen del caso</legend>

        <div className="resumen-caso-grid">
          <label>
            Resumen del caso (lista)
            <select defaultValue="">
              <option value="" disabled>
                Seleccione un resumen
              </option>
              <option value="lectura">
                Dificultades en comprensión lectora y textos extensos
              </option>
              <option value="tiempo-evaluaciones">
                Requiere mayor tiempo para evaluaciones y trabajos
              </option>
              <option value="atencion">
                Dificultades de atención / concentración en clases
              </option>
              <option value="presentaciones">
                Alta ansiedad en presentaciones orales o exposiciones
              </option>
            </select>
          </label>

          <label>
            Objetivo general de los ajustes
            <textarea
              rows={4}
              placeholder="Ej: Mejorar el acceso a la información, participación en clases y condiciones equitativas en evaluaciones."
            />
          </label>
        </div>
      </fieldset>

      {/* Bloques A, B, C, D con selects */}
      <fieldset className="asesor-fieldset">
        <legend>Selección de ajustes por categoría</legend>

        <p className="ajustes-panel-text">
          Primero selecciona un ajuste de{" "}
          <strong>A – Presentación de la información</strong>. Al hacerlo se
          desbloquea la categoría B, luego C y finalmente D. Más abajo verás un
          resumen con los cuatro ajustes elegidos (A, B, C y D).
        </p>

        {/* A */}
        <div className="definir-bloque-categoria">
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-A">A</span>
            <span className="definir-bloque-titulo">
              {CATEGORIAS.A}
            </span>
          </div>
          <label className="select-categoria-ajuste-label">
            Seleccionar presentación de la información (A)
            <select
              className="select-categoria-ajuste"
              value={selA}
              onChange={(e) => {
                setSelA(e.target.value);
                // si cambias A, resetea posteriores
                setSelB("");
                setSelC("");
                setSelD("");
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
        </div>

        {/* B */}
        <div
          className={
            "definir-bloque-categoria" +
            (!puedeB ? " bloque-categoria-disabled" : "")
          }
        >
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-B">B</span>
            <span className="definir-bloque-titulo">
              {CATEGORIAS.B}
            </span>
          </div>
          <label className="select-categoria-ajuste-label">
            Seleccionar ajuste de entorno (B)
            <select
              className="select-categoria-ajuste"
              value={selB}
              onChange={(e) => {
                setSelB(e.target.value);
                setSelC("");
                setSelD("");
              }}
              disabled={!puedeB}
            >
              <option value="">
                {puedeB
                  ? "Seleccione un ajuste B"
                  : "Debe seleccionar primero un ajuste A"}
              </option>
              {AJUSTES_POR_CATEGORIA.B.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* C */}
        <div
          className={
            "definir-bloque-categoria" +
            (!puedeC ? " bloque-categoria-disabled" : "")
          }
        >
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-C">C</span>
            <span className="definir-bloque-titulo">
              {CATEGORIAS.C}
            </span>
          </div>
          <label className="select-categoria-ajuste-label">
            Seleccionar forma de respuesta (C)
            <select
              className="select-categoria-ajuste"
              value={selC}
              onChange={(e) => {
                setSelC(e.target.value);
                setSelD("");
              }}
              disabled={!puedeC}
            >
              <option value="">
                {puedeC
                  ? "Seleccione un ajuste C"
                  : "Debe seleccionar primero un ajuste B"}
              </option>
              {AJUSTES_POR_CATEGORIA.C.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* D */}
        <div
          className={
            "definir-bloque-categoria" +
            (!puedeD ? " bloque-categoria-disabled" : "")
          }
        >
          <div className="definir-bloque-header">
            <span className="tag-categoria tag-D">D</span>
            <span className="definir-bloque-titulo">
              {CATEGORIAS.D}
            </span>
          </div>
          <label className="select-categoria-ajuste-label">
            Seleccionar organización del tiempo y horario (D)
            <select
              className="select-categoria-ajuste"
              value={selD}
              onChange={(e) => setSelD(e.target.value)}
              disabled={!puedeD}
            >
              <option value="">
                {puedeD
                  ? "Seleccione un ajuste D"
                  : "Debe seleccionar primero un ajuste C"}
              </option>
              {AJUSTES_POR_CATEGORIA.D.map((aj) => (
                <option key={aj.codigo} value={aj.codigo}>
                  {aj.codigo} – {aj.titulo}
                </option>
              ))}
            </select>
          </label>
        </div>
      </fieldset>

      {/* Resumen con los 4 juntos A, B, C, D */}
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
            />
            <AjusteCard
              letra="B"
              categoriaNombre={CATEGORIAS.B}
              ajuste={ajusteB}
            />
            <AjusteCard
              letra="C"
              categoriaNombre={CATEGORIAS.C}
              ajuste={ajusteC}
            />
            <AjusteCard
              letra="D"
              categoriaNombre={CATEGORIAS.D}
              ajuste={ajusteD}
            />
          </div>
        ) : (
          <p className="ajustes-panel-text">
            Aún no se ha seleccionado ningún ajuste. Comienza eligiendo una
            opción en la categoría A.
          </p>
        )}
      </div>

      <div className="asesor-form-buttons">
        <button type="button" className="btn-asesor-primary">
          Guardar definición (demo)
        </button>
        <Link to="/AsesorDashboard" className="btn-asesor-volver">
          Volver al panel
        </Link>
      </div>
    </div>
  );
}
