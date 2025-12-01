// src/pages/homepage/Director/pages/ValidarAjustes.js
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ValidarAjustes.css";

export default function ValidarAjustes() {
  const ajustesIniciales = [
    {
      id: "A1",
      categoria: "A",
      categoriaNombre: "Presentación de la información",
      titulo: "Amplificación de la letra (macrotipo) o imagen",
      descripcion:
        "Uso de materiales con letra ampliada en guías, presentaciones y evaluaciones.",
      propuestoPorCoordinacion: true,
    },
    {
      id: "B1",
      categoria: "B",
      categoriaNombre: "Entorno",
      titulo: "Ubicar al estudiante en un lugar estratégico dentro de la sala",
      descripcion:
        "Puesto que disminuya distracciones y favorezca la participación y comprensión.",
      propuestoPorCoordinacion: true,
    },
    {
      id: "C1",
      categoria: "C",
      categoriaNombre: "Forma de respuesta",
      titulo: "Dar mayor tiempo de respuesta y ejecución",
      descripcion:
        "Permitir más tiempo para responder, participar y rendir evaluaciones.",
      propuestoPorCoordinacion: true,
    },
    {
      id: "D1",
      categoria: "D",
      categoriaNombre: "Organización del tiempo y horario",
      titulo: "Disponer de un 50% de tiempo extra en evaluaciones",
      descripcion:
        "Extender el tiempo disponible en evaluaciones escritas u online.",
      propuestoPorCoordinacion: false,
    },
  ];

  // "aprobado" | "no_aprobado" | "revisar"
  const [decisiones, setDecisiones] = useState(() => {
    const base = {};
    ajustesIniciales.forEach((ajuste, i) => {
      base[ajuste.id] = i < 3 ? "aprobado" : "revisar";
    });
    return base;
  });

  // Comentarios por ajuste
  const [comentarios, setComentarios] = useState({});
  // Paneles de comentario abiertos (pueden ser varios a la vez)
  const [panelesAbiertos, setPanelesAbiertos] = useState({});

  const handleCambioDecision = (idAjuste, valor) => {
    setDecisiones((prev) => ({
      ...prev,
      [idAjuste]: valor,
    }));
  };

  const total = ajustesIniciales.length;
  const aprobados = ajustesIniciales.filter(
    (a) => decisiones[a.id] === "aprobado"
  ).length;
  const rechazados = ajustesIniciales.filter(
    (a) => decisiones[a.id] === "no_aprobado"
  ).length;
  const enRevision = ajustesIniciales.filter(
    (a) => decisiones[a.id] === "revisar"
  ).length;

  const ajustesConComentarioAbierto = ajustesIniciales.filter(
    (a) => panelesAbiertos[a.id]
  );

  return (
    <div className="asesor-form-page">
      <h2>Validar ajustes</h2>
      <p className="asesor-form-text">
        En esta etapa la <strong>Directora de Carrera</strong> revisa los
        ajustes propuestos por la Coordinación, considerando el reglamento
        institucional y la viabilidad en cada asignatura. Cada ajuste se aprueba
        o no de forma independiente, y el resultado alimenta el panel de
        seguimiento y la evaluación final del semestre.
      </p>

      {/* Info del caso + resumen numérico */}
      <div className="validar-header">
        <div className="validar-info-case">
          <div className="validar-badge">Caso activo</div>
          <h3>Caso: CASO-001</h3>
          <p>
            <strong>Estudiante:</strong> Alexander Torres – Ingeniería en
            Informática
          </p>
          <p>
            <strong>Semestre:</strong> 2/2025 ·{" "}
            <strong>Asignaturas involucradas:</strong> Programación, Bases de
            Datos
          </p>
          <p className="validar-text-small">
            Este caso forma parte del programa de Ajustes Razonables. Las
            decisiones que se tomen aquí serán visibles para docentes y asesores
            en el panel de seguimiento.
          </p>
        </div>

        <div className="validar-resumen-ajustes">
          <h4>Resumen de decisiones</h4>
          <div className="validar-stats-row">
            <div className="validar-stat aprobar">
              <span>{aprobados}</span>
              <small>Ajustes aprobados</small>
            </div>
            <div className="validar-stat revisar">
              <span>{enRevision}</span>
              <small>En revisión</small>
            </div>
            <div className="validar-stat rechazar">
              <span>{rechazados}</span>
              <small>No aprobados</small>
            </div>
          </div>
          <p className="validar-text-small">
            Total de ajustes en el caso: <strong>{total}</strong>.
          </p>
        </div>
      </div>

      <form className="asesor-form">
        <div className="ajustes-panel">
          <h3>Ajustes recibidos para validación</h3>
          <p className="ajustes-panel-text">
            La columna de categoría utiliza la Tabla de Ajustes Razonables:{" "}
            <span className="tag-categoria tag-A">A</span> Presentación de la
            información,{" "}
            <span className="tag-categoria tag-B">B</span> Entorno,{" "}
            <span className="tag-categoria tag-C">C</span> Forma de respuesta y{" "}
            <span className="tag-categoria tag-D">D</span> Organización del
            tiempo y horario. La Directora puede aprobar, no aprobar o dejar en
            revisión cada ajuste.
          </p>

          <table className="tabla-ajustes">
            <thead>
              <tr>
                <th>Categoría</th>
                <th>Ajuste</th>
                <th>Descripción</th>
                <th>Recomendación coordinación</th>
                <th>Decisión Directora</th>
              </tr>
            </thead>
            <tbody>
              {ajustesIniciales.map((ajuste) => (
                <tr key={ajuste.id}>
                  <td>
                    <span
                      className={`tag-categoria tag-${ajuste.categoria}`}
                      title={ajuste.categoriaNombre}
                    >
                      {ajuste.categoria}
                    </span>
                  </td>
                  <td>{ajuste.titulo}</td>
                  <td>{ajuste.descripcion}</td>
                  <td>
                    {ajuste.propuestoPorCoordinacion
                      ? "Propuesto por coordinación"
                      : "No recomendado inicialmente"}
                  </td>
                  <td>
                    <div className="radio-decision">
                      {/* Aprobar */}
                      <label
                        className={
                          "pill-decision pill-aprobar" +
                          (decisiones[ajuste.id] === "aprobado"
                            ? " active"
                            : "")
                        }
                      >
                        <input
                          type="radio"
                          name={`dec-${ajuste.id}`}
                          checked={decisiones[ajuste.id] === "aprobado"}
                          onChange={() =>
                            handleCambioDecision(ajuste.id, "aprobado")
                          }
                        />
                        <span>Aprobar</span>
                      </label>

                      {/* No aprobar */}
                      <label
                        className={
                          "pill-decision pill-rechazar" +
                          (decisiones[ajuste.id] === "no_aprobado"
                            ? " active"
                            : "")
                        }
                      >
                        <input
                          type="radio"
                          name={`dec-${ajuste.id}`}
                          checked={decisiones[ajuste.id] === "no_aprobado"}
                          onChange={() =>
                            handleCambioDecision(ajuste.id, "no_aprobado")
                          }
                        />
                        <span>No aprobar</span>
                      </label>

                      {/* Revisión */}
                      <label
                        className={
                          "pill-decision pill-revisar" +
                          (decisiones[ajuste.id] === "revisar"
                            ? " active"
                            : "")
                        }
                      >
                        <input
                          type="radio"
                          name={`dec-${ajuste.id}`}
                          checked={decisiones[ajuste.id] === "revisar"}
                          onChange={() =>
                            handleCambioDecision(ajuste.id, "revisar")
                          }
                        />
                        <span>Revisión</span>
                      </label>

                      {/* Botón para abrir/cerrar panel de comentario */}
                      <button
                        type="button"
                        className="btn-comentario-ajuste"
                        onClick={() =>
                          setPanelesAbiertos((prev) => ({
                            ...prev,
                            [ajuste.id]: !prev[ajuste.id],
                          }))
                        }
                      >
                        {panelesAbiertos[ajuste.id]
                          ? "Ocultar comentario"
                          : "Comentar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paneles de comentario grandes, uno por cada ajuste abierto */}
        {ajustesConComentarioAbierto.length > 0 && (
          <div className="paneles-comentario-wrapper">
            {ajustesConComentarioAbierto.map((ajuste) => (
              <div key={ajuste.id} className="panel-comentario-ajuste">
                <div className="panel-comentario-header">
                  <span
                    className={`tag-categoria tag-${ajuste.categoria}`}
                  >
                    {ajuste.categoria}
                  </span>

                  <div className="panel-comentario-titulos">
                    <h4>{ajuste.titulo}</h4>
                    <p className="panel-comentario-desc">
                      {ajuste.descripcion}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn-cerrar-panel"
                    onClick={() =>
                      setPanelesAbiertos((prev) => {
                        const copia = { ...prev };
                        delete copia[ajuste.id];
                        return copia;
                      })
                    }
                  >
                    Cerrar
                  </button>
                </div>

                <label className="panel-comentario-label">
                  Comentario de la Directora para este ajuste
                  <textarea
                    className="panel-comentario-textarea"
                    rows={4}
                    placeholder="Escriba un comentario breve sobre este ajuste (por ejemplo, condiciones, observaciones o acuerdos específicos)."
                    value={comentarios[ajuste.id] || ""}
                    onChange={(e) =>
                      setComentarios((prev) => ({
                        ...prev,
                        [ajuste.id]: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        <label>
          Comentario general a la coordinación
          <textarea
            rows={3}
            placeholder="Ej: Se aprueban los ajustes A, B y C. En el ajuste D se solicita revisar el porcentaje de tiempo extra propuesto y definir criterios por asignatura."
          />
        </label>

        <label>
          Orientaciones para el panel de seguimiento (docentes / asesores)
          <textarea
            rows={3}
            placeholder="Ej: Priorizar seguimiento del ajuste C en evaluaciones parciales y registrar observaciones en el panel de seguimiento."
          />
        </label>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Guardar validación (demo)
          </button>

          <Link to="/Directora" className="btn-asesor-volver">
            Volver atrás
          </Link>
        </div>
      </form>
    </div>
  );
}
