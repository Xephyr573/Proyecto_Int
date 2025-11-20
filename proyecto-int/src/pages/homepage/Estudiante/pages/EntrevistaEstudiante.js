import { useNavigate } from "react-router-dom";
import "./EntrevistaEstudiante.css";

export default function EntrevistaEstudiante(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Entrevista Individualizada</h1>

      <div className="grid-two">
        <div className="panel">
          <h3>Datos Iniciales</h3>
          <div className="est-form small">
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
          <div className="est-form small">
            <label>Resumen</label>
            <textarea placeholder="Escribe observaciones de la entrevista..."></textarea>

            <label>Recomendaciones</label>
            <textarea placeholder="Apoyos, tiempos, materiales, etc."></textarea>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="est-btn secondary" onClick={()=>navigate(-1)}>Cancelar</button>
        <button className="est-btn" onClick={()=>alert("Entrevista guardada (demo)")}>Guardar Entrevista</button>
      </div>
    </div>
  );
}
