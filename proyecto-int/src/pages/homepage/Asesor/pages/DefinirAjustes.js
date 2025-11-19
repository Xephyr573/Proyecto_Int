import { useState } from "react";
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

// Ajustes por categoría, usando códigos como en la tabla
const AJUSTES_POR_CATEGORIA = {
  A: [
    {
      id: "A1",
      codigo: "A1",
      titulo: "Amplificación de la letra (macrotipo) o imagen",
      descripcion:
        "Letra más grande en guías, presentaciones y evaluaciones para favorecer la lectura.",
    },
    {
      id: "A2",
      codigo: "A2",
      titulo: "Amplitud de la palabra o sonido",
      descripcion:
        "Uso de micrófono u otros recursos para que se escuche con mayor claridad.",
    },
    {
      id: "A3",
      codigo: "A3",
      titulo: "Controlar la velocidad de la animación o sonido",
      descripcion:
        "Presentar videos o animaciones a velocidad adecuada, permitiendo pausas.",
    },
    {
      id: "A4",
      codigo: "A4",
      titulo:
        "Considerar y disponer ayudas tecnológicas para el acceso a la información",
      descripcion:
        "Uso de lectores de pantalla, lupas digitales u otras ayudas tecnológicas.",
    },
  ],
  B: [
    {
      id: "B1",
      codigo: "B1",
      titulo:
        "Situar al estudiante en un lugar estratégico para favorecer su participación",
      descripcion:
        "Ubicar al estudiante en un puesto que reduzca distracciones y permita mejor visibilidad.",
    },
    {
      id: "B2",
      codigo: "B2",
      titulo:
        "Ofrecer un lugar estratégico en la sala para evitar desplazamientos excesivos",
      descripcion:
        "Considerar accesos, salidas y cercanía a recursos de apoyo.",
    },
    {
      id: "B3",
      codigo: "B3",
      titulo: "Utilización de mobiliario adecuado",
      descripcion:
        "Silla, mesa u otros elementos adaptados a las necesidades del estudiante.",
    },
    {
      id: "B4",
      codigo: "B4",
      titulo: "Promover cambios de posición cuando sea necesario",
      descripcion:
        "Permitir levantarse, cambiar de asiento o posición para disminuir molestias.",
    },
  ],
  C: [
    {
      id: "C1",
      codigo: "C1",
      titulo: "Texto escrito",
      descripcion:
        "Permitir que parte de las respuestas se realicen de forma escrita.",
    },
    {
      id: "C2",
      codigo: "C2",
      titulo: "Información oral",
      descripcion:
        "Aceptar respuestas orales cuando sea pertinente a la actividad.",
    },
    {
      id: "C3",
      codigo: "C3",
      titulo: "Dar mayor tiempo de respuesta y ejecución",
      descripcion:
        "Otorgar un tiempo adicional para responder preguntas y realizar actividades.",
    },
    {
      id: "C4",
      codigo: "C4",
      titulo:
        "Utilizar diferentes opciones de evaluación: oral, escrita u otra",
      descripcion:
        "Ofrecer más de una forma de demostrar el aprendizaje (oral, escrito, práctico).",
    },
  ],
  D: [
    {
      id: "D1",
      codigo: "D1",
      titulo:
        "Adecuar el tiempo utilizado en una actividad o evaluación",
      descripcion:
        "Ajustar la duración de evaluaciones o actividades según las necesidades del estudiante.",
    },
    {
      id: "D2",
      codigo: "D2",
      titulo: "Organizar espacios de distensión",
      descripcion:
        "Considerar pausas o momentos de descanso en actividades extensas.",
    },
    {
      id: "D3",
      codigo: "D3",
      titulo:
        "Disponer de un 25% de tiempo extra en evaluaciones escritas u online",
      descripcion:
        "Extender la duración de la evaluación en un 25% sobre el tiempo general.",
    },
    {
      id: "D4",
      codigo: "D4",
      titulo:
        "Disponer de un 50% de tiempo extra en evaluaciones escritas u online",
      descripcion:
        "Extender la duración de la evaluación en un 50% sobre el tiempo general.",
    },
  ],
};

const NOMBRE_CATEGORIA = {
  A: "Presentación de la información",
  B: "Entorno",
  C: "Forma de respuesta",
  D: "Organización del tiempo y horario",
};

export default function DefinirAjustes() {
  // Categoría que se está viendo (por defecto A)
  const [categoriaActiva, setCategoriaActiva] = useState("A");

  // Ajustes seleccionados (se van acumulando en el recuadro de abajo)
  const [ajustesSeleccionados, setAjustesSeleccionados] = useState([]);

  const tieneSeleccionCategoria = (cat) =>
    ajustesSeleccionados.some((a) => a.categoria === cat);

  // Reglas de desbloqueo: primero A, luego B, luego C, luego D
  const categoriaDesbloqueada = (cat) => {
    if (cat === "A") return true;
    if (cat === "B") return tieneSeleccionCategoria("A");
    if (cat === "C") return tieneSeleccionCategoria("A") && tieneSeleccionCategoria("B");
    if (cat === "D")
      return (
        tieneSeleccionCategoria("A") &&
        tieneSeleccionCategoria("B") &&
        tieneSeleccionCategoria("C")
      );
    return false;
  };

  const ajustesDeCategoria = AJUSTES_POR_CATEGORIA[categoriaActiva] || [];

  const estaSeleccionado = (id) =>
    ajustesSeleccionados.some((a) => a.id === id);

  // Agrega o quita un ajuste de la lista de seleccionados
  const toggleAjuste = (cat, ajuste) => {
    const yaEsta = estaSeleccionado(ajuste.id);
    if (yaEsta) {
      setAjustesSeleccionados((prev) =>
        prev.filter((a) => a.id !== ajuste.id)
      );
    } else {
      setAjustesSeleccionados((prev) => [
        ...prev,
        { ...ajuste, categoria: cat },
      ]);
    }
  };

  return (
    <div className="asesor-form-page">
      <h2>Definir ajustes razonables</h2>
      <p className="asesor-form-text">
        En esta etapa la <strong>Coordinadora Técnica Pedagógica</strong> toma
        el caso registrado y selecciona, desde la Tabla de Ajustes
        Razonables (A, B, C, D), los ajustes que se propondrán para el
        estudiante. Las categorías se van desbloqueando en orden: primero A,
        luego B, después C y finalmente D.
      </p>

      {/* Flujo semestral */}
      <div className="flujo-etapas">
        <div className="etapa done">1. Entrevista / Registro de caso</div>
        <div className="etapa active">2. Definición de ajustes</div>
        <div className="etapa">3. Seguimiento</div>
        <div className="etapa">4. Evaluación final</div>
      </div>

      <form className="asesor-form">
        {/* Resumen (lo que te pidió el profe que sea una lista) */}
        <fieldset className="asesor-fieldset">
          <legend>Resumen del caso</legend>

          <label>
            Resumen del caso (lista)
            <select defaultValue="">
              <option value="" disabled>
                Seleccione un resumen
              </option>
              <option value="lectura">
                Dificultades en comprensión lectora y textos extensos
              </option>
              <option value="tiempo">
                Requiere tiempos adicionales en evaluaciones y trabajos
              </option>
              <option value="atencion">
                Dificultades de atención en ambientes con mucha estimulación
              </option>
              <option value="ansiedad">
                Ansiedad alta frente a evaluaciones y presentaciones
              </option>
            </select>
          </label>

          <label>
            Objetivo general de los ajustes
            <textarea
              rows={3}
              placeholder="Ej: Mejorar el acceso a la información, participación en clases y condiciones equitativas en evaluaciones."
            />
          </label>
        </fieldset>

        {/* TABS de categorías A, B, C, D con desbloqueo */}
        <div className="categorias-tabs">
          {["A", "B", "C", "D"].map((cat) => {
            const desbloqueada = categoriaDesbloqueada(cat);
            return (
              <button
                key={cat}
                type="button"
                disabled={!desbloqueada}
                className={
                  "categoria-tab" +
                  (categoriaActiva === cat ? " categoria-tab-activa" : "") +
                  (!desbloqueada ? " categoria-tab-disabled" : "")
                }
                onClick={() => desbloqueada && setCategoriaActiva(cat)}
              >
                <span className={`tag-categoria tag-${cat}`}>{cat}</span>
                <span className="categoria-tab-text">
                  {NOMBRE_CATEGORIA[cat]}
                </span>
              </button>
            );
          })}
        </div>

        <p className="categorias-help">
          Selecciona los ajustes de la categoría{" "}
          <strong>{categoriaActiva}</strong>. Para pasar a la siguiente
          categoría, debe haber al menos un ajuste seleccionado en la categoría
          anterior.
        </p>

        {/* Lista de ajustes de la categoría activa */}
        <div className="ajustes-panel">
          <h3>
            Ajustes de categoría {categoriaActiva} –{" "}
            {NOMBRE_CATEGORIA[categoriaActiva]}
          </h3>

          <table className="tabla-ajustes">
            <thead>
              <tr>
                <th>Código</th>
                <th>Ajuste</th>
                <th>Descripción</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {ajustesDeCategoria.map((ajuste) => (
                <tr key={ajuste.id}>
                  <td>{ajuste.codigo}</td>
                  <td>{ajuste.titulo}</td>
                  <td>{ajuste.descripcion}</td>
                  <td>
                    <label className="check-ajuste">
                      <input
                        type="checkbox"
                        checked={estaSeleccionado(ajuste.id)}
                        onChange={() =>
                          toggleAjuste(categoriaActiva, ajuste)
                        }
                      />
                      <span>
                        {estaSeleccionado(ajuste.id)
                          ? "Seleccionado"
                          : "Agregar"}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recuadro de ajustes seleccionados (lo que se va llenando abajo) */}
        <div className="ajustes-seleccionados">
          <h3>Ajustes seleccionados para este caso</h3>
          {ajustesSeleccionados.length === 0 ? (
            <p className="ajustes-panel-text">
              Aún no se ha seleccionado ningún ajuste. Marca uno o más ajustes
              en las categorías A, B, C o D para que aparezcan acá.
            </p>
          ) : (
            <table className="tabla-ajustes">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Código</th>
                  <th>Ajuste</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {ajustesSeleccionados.map((ajuste) => (
                  <tr key={ajuste.id}>
                    <td>
                      <span
                        className={`tag-categoria tag-${ajuste.categoria}`}
                      >
                        {ajuste.categoria}
                      </span>
                    </td>
                    <td>{ajuste.codigo}</td>
                    <td>{ajuste.titulo}</td>
                    <td>{ajuste.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <label>
          Comentario para Directora de carrera
          <textarea
            rows={3}
            placeholder="Ej: Se priorizan los ajustes seleccionados por su impacto directo en el acceso a la información y la evaluación del estudiante."
          />
        </label>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Enviar ajustes seleccionados (demo)
          </button>

          <Link to="/AsesorDashboard" className="btn-asesor-volver">
            Volver al panel
          </Link>
        </div>
      </form>
    </div>
  );
}
