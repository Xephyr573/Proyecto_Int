import { useNavigate } from "react-router-dom";
import "./PerfilAsesor.css";

export default function PerfilAsesor(){
  const navigate = useNavigate();
  return (
    <div className="ases-page">
      <h1>Perfil del Asesor</h1>
      <form className="ases-form" onSubmit={(e)=>e.preventDefault()}>
        <label>Nombre</label>
        <input type="text" placeholder="Nombre completo" />
        <label>Correo</label>
        <input type="email" placeholder="asesor@inacap.cl" />
        <label>Área de Apoyo</label>
        <input type="text" placeholder="Psicopedagogía / Tutorías / Inclusión" />
        <button type="submit">Guardar Cambios</button>
      </form>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}