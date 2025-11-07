import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./NecesidadesEspeciales.css";

export default function NecesidadesEspeciales() {
  return (
    <div className="page-container">
      <h1>Mantención de Necesidades Especiales</h1>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <label>Tipo de Necesidad</label>
        <select>
          <option>Visual</option>
          <option>Auditiva</option>
          <option>Motriz</option>
          <option>Cognitiva</option>
          <option>Otra</option>
        </select>

        <label>Descripción</label>
        <textarea placeholder="Describe brevemente tu necesidad..."></textarea>

        <label>Apoyos Requeridos</label>
        <input type="text" placeholder="Ej: material ampliado, intérprete, tiempo adicional..." />

        <button type="submit">Guardar Información</button>
      </form>

      <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
