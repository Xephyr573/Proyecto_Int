import { useNavigate } from "react-router-dom";
import "./NecesidadesEspeciales.css";

export default function NecesidadesEspeciales(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Mantención de Necesidades Especiales</h1>

      <form className="est-form" onSubmit={(e)=>e.preventDefault()}>
        <div className="row">
          <label>Tipo de Necesidad</label>
          <select>
            <option>Visual</option>
            <option>Auditiva</option>
            <option>Motriz</option>
            <option>Cognitiva</option>
            <option>Otra</option>
          </select>
        </div>

        <div className="row">
          <label>Descripción</label>
          <textarea placeholder="Describe brevemente tu necesidad..."></textarea>
        </div>

        <div className="row">
          <label>Apoyos Requeridos</label>
          <input type="text" placeholder="Ej: material ampliado, intérprete, tiempo adicional..." />
        </div>

        <button type="submit">Guardar</button>
      </form>

      <button className="est-btn" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}
