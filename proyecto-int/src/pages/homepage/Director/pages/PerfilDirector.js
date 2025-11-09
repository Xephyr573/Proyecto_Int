import { useNavigate } from "react-router-dom";
import "./PerfilDirector.css";

export default function PerfilDirector(){
  const navigate = useNavigate();
  return (
    <div className="dir-page">
      <h1>Perfil del Director</h1>
      <form className="dir-form" onSubmit={(e)=>e.preventDefault()}>
        <label>Nombre</label>
        <input type="text" placeholder="Nombre del Director" />
        <label>Correo Institucional</label>
        <input type="email" placeholder="director@inacap.cl" />
        <label>Facultad / Área</label>
        <input type="text" placeholder="Facultad de Ingeniería y Tecnología" />
        <label>Teléfono</label>
        <input type="text" placeholder="+56 9 XXXX XXXX" />
        <button type="submit">Guardar Cambios</button>
      </form>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}