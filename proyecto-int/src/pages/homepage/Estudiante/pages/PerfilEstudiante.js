import { Link } from "react-router-dom";
import "../EstudiantePages.css";
import "./PerfilEstudiante.css";

export default function PerfilEstudiante() {
  return (
    <div className="page-container">
      <h1>Registro del Alumno</h1>
      <form className="form">
        <input type="text" placeholder="Nombre Completo" />
        <input type="text" placeholder="RUT" />
        <input type="text" placeholder="Carrera" />
        <input type="text" placeholder="Correo" />
        <input type="text" placeholder="Teléfono" />
        <button type="submit">Guardar Cambios</button>
      </form>
      <Link to="/EstudianteDashboard" className="btn-back">← Volver</Link>
    </div>
  );
}
