// src/pages/homepage/Asesor/pages/DefinirAjustes.js
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

export default function DefinirAjustes() {
  return (
    <div className="asesor-form-page">
      <h2>Definir ajustes</h2>
      <p className="asesor-form-text">
        Aquí la Coordinadora técnica pedagógica revisa el caso y define los
        ajustes razonables que se propondrán al estudiante.
      </p>

      <form className="asesor-form">
        <label>
          ID / Código del caso
          <input type="text" placeholder="Ej: CASO-001" />
        </label>

        <label>
          Resumen del caso
          <textarea rows={3} placeholder="Resumen breve del caso" />
        </label>

        {/* Motivo principal del ajuste */}
        <label>
          Motivo principal del ajuste
          <select defaultValue="">
            <option value="" disabled>
              Seleccione un motivo
            </option>
            <option value="evaluacion">Evaluación (pruebas, controles)</option>
            <option value="metodologia">Metodología de clases</option>
            <option value="recursos">Recursos / materiales</option>
            <option value="infraestructura">
              Infraestructura / accesibilidad
            </option>
            <option value="acompanamiento">Acompañamiento / tutorías</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Ajustes propuestos
          <textarea
            rows={4}
            placeholder="Ej: tiempo extra en evaluaciones, cambio de sala, apoyo lector, etc."
          />
        </label>

        <label>
          Observaciones para Dirección
          <textarea
            rows={3}
            placeholder="Comentarios que se enviarán a la Directora de carrera"
          />
        </label>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Enviar ajustes (demo)
          </button>

          <Link to="/AsesorDashboard" className="btn-asesor-volver">
            Volver al panel
          </Link>
        </div>
      </form>
    </div>
  );
}
