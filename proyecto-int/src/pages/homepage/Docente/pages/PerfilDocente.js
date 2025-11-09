import { useNavigate } from "react-router-dom";
import "./PerfilDocente.css";

export default function PerfilDocente() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Mi Perfil</h1>

      <form className="form">
        <label>Nombre Completo</label>
        <input type="text" placeholder="Nombre y Apellido" />

        <label>Correo Institucional</label>
        <input type="email" placeholder="docente@inacap.cl" />

        <label>Asignatura</label>
        <input type="text" placeholder="Programación Web" />

        <label>Teléfono</label>
        <input type="text" placeholder="+56 9" />

        <button type="submit">Guardar Cambios</button>
      </form>

      <button className="btn-back" onClick={() => navigate(-1)}>← Volver</button>
    </div>
  );
}
