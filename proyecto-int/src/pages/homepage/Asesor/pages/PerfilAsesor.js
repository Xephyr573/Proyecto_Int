import { useNavigate } from "react-router-dom";
import "./PerfilAsesor.css";

export default function PerfilAsesor() {
  const navigate = useNavigate();

  return (
    <div className="asesor-page">
      <h1>Mi Perfil</h1>

      <form className="asesor-form">
        <label>Nombre Completo</label>
        <input type="text" placeholder="Nombre y Apellido" />

        <label>Correo Institucional</label>
        <input type="email" placeholder="asesor@inacap.cl" />

        <label>Área</label>
        <input type="text" placeholder="Apoyo Académico" />

        <label>Teléfono</label>
        <input type="text" placeholder="+56 9 ..." />

        <button type="submit">Guardar Cambios</button>
      </form>

      <button className="asesor-btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
}
