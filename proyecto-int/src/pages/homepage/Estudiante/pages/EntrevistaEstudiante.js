import { useNavigate } from "react-router-dom";
import "../EstudiantePages.css";
import "./EntrevistaEstudiante.css";

export default function EntrevistaEstudiante() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Entrevista Individualizada</h1>

      <div className="grid-two">
        <div className="panel">
          <h3>Datos Iniciales</h3>
          <div className="form">
            <label>Fecha</label>
            <input type="date" />

            <label>Asesor</label>
            <input type="text" placeholder="Nombre del asesor" />

            <label>Modalidad</label>
            <select>
              <option>Presencial</option>
              <option>Online</option>
            </select>
          </div>
        </div>

        <div className="panel">
          <h3>Observaciones</h3>
          <div className="form">
            <label>Resumen</label>
            <textarea placeholder="Escribe aquí las observaciones de la entrevista..."></textarea>

            <label>Recomendaciones</label>
            <textarea placeholder="Apoyos, tiempos, materiales, etc."></textarea>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn secondary" onClick={() => navigate(-1)}>Cancelar</button>
        <button
          className="btn"
          onClick={() => alert("Entrevista guardada correctamente (demo)")}
        >
          Guardar Entrevista
        </button>
      </div>

      <button className="btn-back" to="/EstudianteDashboard" onClick={() => navigate(-1)}>← Volver</button>
    </div>
  );
}
