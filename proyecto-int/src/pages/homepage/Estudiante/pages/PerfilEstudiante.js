import { useNavigate } from "react-router-dom";
import "./PerfilEstudiante.css";

export default function PerfilEstudiante(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Registro del Alumno</h1>
      <form className="est-form" onSubmit={(e)=>e.preventDefault()}>
        <div className="row">
          <label>Nombre Completo</label>
          <input type="text" placeholder="Nombre Apellido" />
        </div>
        <div className="row">
          <label>RUT</label>
          <input type="text" placeholder="12.345.678-9" />
        </div>
        <div className="row">
          <label>Carrera</label>
          <input type="text" placeholder="Ingeniería Informática" />
        </div>
        <div className="row">
          <label>Correo</label>
          <input type="email" placeholder="estudiante@inacap.cl" />
        </div>
        <div className="row">
          <label>Teléfono</label>
          <input type="text" placeholder="+56 9 xxxx xxxx" />
        </div>
        <button type="submit">Guardar</button>
      </form>

      <button className="est-btn" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}
