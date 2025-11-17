// src/pages/homepage/Asesor/pages/RegistrarCaso.js
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

export default function RegistrarCaso() {
  return (
    <div className="asesor-form-page">
      <h2>Registrar caso</h2>
      <p className="asesor-form-text">
        Aquí la Encargada de inclusión registra el caso en el sistema: datos del
        estudiante, descripción y medidas iniciales.
      </p>

      <form className="asesor-form">
        <label>
          RUT estudiante
          <input type="text" placeholder="12.345.678-9" />
        </label>

        <label>
          Nombre estudiante
          <input type="text" placeholder="Nombre completo" />
        </label>

        {/* NUEVO: Motivo del caso */}
        <label>
          Motivo del caso
          <select defaultValue="">
            <option value="" disabled>
              Seleccione un motivo
            </option>
            <option value="academico">Dificultades académicas</option>
            <option value="salud">Salud física / mental</option>
            <option value="discapacidad-permanente">
              Discapacidad permanente
            </option>
            <option value="discapacidad-temporal">
              Condición temporal (accidente, operación, etc.)
            </option>
            <option value="socioeconomico">Situación socioeconómica</option>
            <option value="otro">Otro motivo</option>
          </select>
        </label>

        <label>
          Situación / descripción del caso
          <textarea rows={4} placeholder="Describa brevemente el caso" />
        </label>

        <label>
          Medidas iniciales propuestas
          <textarea
            rows={3}
            placeholder="Medidas o apoyos que se proponen inicialmente"
          />
        </label>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Guardar caso (demo)
          </button>

          <Link to="/AsesorDashboard" className="btn-asesor-volver">
            Volver al panel
          </Link>
        </div>
      </form>
    </div>
  );
}
