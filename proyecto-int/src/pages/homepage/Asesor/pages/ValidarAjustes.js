// src/pages/homepage/Asesor/pages/ValidarAjustes.js
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

export default function ValidarAjustes() {
  return (
    <div className="asesor-form-page">
      <h2>Validar ajustes</h2>
      <p className="asesor-form-text">
        Aquí la Directora de carrera revisa los ajustes propuestos, decide si se
        aprueban o se modifican y deja un comentario de feedback para la
        coordinación.
      </p>

      <form className="asesor-form">
        <label>
          ID / Código del caso
          <input type="text" placeholder="Ej: CASO-001" />
        </label>

        <label>
          Ajustes propuestos
          <textarea
            rows={4}
            placeholder="Resumen de los ajustes recibidos desde la coordinación"
          />
        </label>

        {/* Motivo de la decisión */}
        <label>
          Motivo de la decisión
          <select defaultValue="">
            <option value="" disabled>
              Seleccione un motivo
            </option>
            <option value="cumple-reglamento">
              Se ajusta al reglamento institucional
            </option>
            <option value="no-cumple-reglamento">
              No se ajusta al reglamento
            </option>
            <option value="requiere-clarificacion">
              Requiere mayor claridad / antecedentes
            </option>
            <option value="impacto-academico">
              Impacto en el desarrollo de la asignatura
            </option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Decisión
          <select defaultValue="">
            <option value="" disabled>
              Seleccione una opción
            </option>
            <option value="aprobado">Aprobar ajustes</option>
            <option value="rechazado">Rechazar ajustes</option>
            <option value="modificar">Solicitar modificación</option>
          </select>
        </label>

        <label>
          Comentario a la coordinadora
          <textarea
            rows={3}
            placeholder="Ej: se aprueban con observación, modificar tal punto, etc."
          />
        </label>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Registrar decisión (demo)
          </button>

          <Link to="/AsesorDashboard" className="btn-asesor-volver">
            Volver al panel
          </Link>
        </div>
      </form>
    </div>
  );
}
