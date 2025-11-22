// src/pages/homepage/Asesor/pages/flujo/SeguimientoCaso.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SeguimientoCaso.css";

const AJUSTES_SEGUIMIENTO = [
  {
    categoria: "A",
    titulo: "Amplificación de la letra (macrotipo) o imagen",
    descripcion:
      "Letra más grande en guías, presentaciones y evaluaciones para favorecer la lectura.",
  },
  {
    categoria: "B",
    titulo:
      "Ubicar al estudiante en un lugar estratégico dentro de la sala",
    descripcion:
      "Puesto que disminuya distracciones y favorezca la participación.",
  },
  {
    categoria: "C",
    titulo: "Dar mayor tiempo de respuesta y ejecución",
    descripcion:
      "Permitir más tiempo para responder, participar y rendir evaluaciones.",
  },
  {
    categoria: "D",
    titulo: "Disponer de un 50% de tiempo extra en evaluaciones",
    descripcion:
      "Extender el tiempo disponible en evaluaciones escritas u online.",
  },
];

export default function SeguimientoCaso() {
  const navigate = useNavigate();

  return (
    <div className="asesor-form-page seguimiento-page">
      <h2>Seguimiento del caso</h2>
      <p className="asesor-form-text">
        Panel para la <strong>Coordinadora Técnica Pedagógica</strong>, donde se
        registran observaciones de seguimiento para cada ajuste definido en el
        semestre.
      </p>

      {/* Flujo (solo lo ve el asesor/CTP) */}
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
          className="etapa done"
          onClick={() => navigate("/asesor/definir-ajustes")}
        >
          2. Definición de ajustes
        </button>
        <button type="button" className="etapa active">
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

      <div className="seguimiento-panel">
        <h3>Ajustes del estudiante y seguimiento</h3>
        <p className="ajustes-panel-text">
          En cada fila se muestra un ajuste definido para el estudiante. La
          columna <strong>Descripción</strong> viene directamente desde la tabla
          de ajustes razonables y no se edita; solo se registran comentarios de
          seguimiento en las columnas de la derecha.
        </p>

        <table className="seguimiento-tabla">
          <thead>
            <tr>
              <th>Ajuste</th>
              <th>Descripción</th>
              <th>¿Ha habido cambio? (Medicación)</th>
              <th>Desempeño del ajuste (notas, participación)</th>
              <th>¿Hay que hacer algún cambio?</th>
              <th>Apoyo del profesor en los ajustes</th>
            </tr>
          </thead>
          <tbody>
            {AJUSTES_SEGUIMIENTO.map((ajuste, index) => (
              <tr key={index}>
                {/* Ajuste (letra A/B/C/D + nombre) */}
                <td>
                  <div className="seguimiento-ajuste-titulo">
                    <span
                      className={`tag-categoria tag-${ajuste.categoria}`}
                    >
                      {ajuste.categoria}
                    </span>
                    <span>{ajuste.titulo}</span>
                  </div>
                </td>

                {/* Descripción SOLO TEXTO (no editable) */}
                <td className="seguimiento-descripcion">
                  <p>{ajuste.descripcion}</p>
                </td>

                {/* Campos de seguimiento (estos sí se llenan) */}
                <td>
                  <textarea
                    rows={3}
                    placeholder="Ej: Ha mostrado mejoras en la comprensión, requiere aún apoyo en lecturas extensas."
                  />
                </td>
                <td>
                  <textarea
                    rows={3}
                    placeholder="Ej: Evaluaciones parciales suben de nota, mayor participación en clases."
                  />
                </td>
                <td>
                  <textarea
                    rows={3}
                    placeholder="Ej: Mantener ajuste, evaluar incluir apoyo extra en evaluaciones orales."
                  />
                </td>
                <td>
                  <textarea
                    rows={3}
                    placeholder="Ej: Docente aplica el ajuste de forma consistente y registra observaciones."
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="asesor-form-buttons">
        <button type="button" className="btn-asesor-primary">
          Guardar seguimiento (demo)
        </button>
        <button
          type="button"
          className="btn-asesor-volver"
          onClick={() => navigate("/AsesorCoordinadoraLogin")}
        >
          Volver al inicio del asesor
        </button>
      </div>
    </div>
  );
}
