import { useNavigate } from "react-router-dom";
import "./PerfilDocente.css";

export default function PerfilDocente() {
  const navigate = useNavigate();
  return (
    <div className="doc-page">
      <h1>Perfil del Docente</h1>
      <form className="doc-form" onSubmit={(e)=>e.preventDefault()}>
        <label>Nombre</label>
        <input type="text" placeholder="Nombre completo" />
        <label>Correo Institucional</label>
        <input type="email" placeholder="docente@inacap.cl" />
        <label>Asignatura</label>
        <input type="text" placeholder="Nombre del ramo" />
        <button type="submit">Guardar</button>
      </form>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}