import { useNavigate } from "react-router-dom";
import "./FichaEstudiantes.css";

export default function FichaEstudiantes(){
  const navigate = useNavigate();
  return (
    <div className="ases-page">
      <h1>Ficha de Estudiantes</h1>
      <table className="ases-table">
        <thead><tr><th>Nombre</th><th>RUT</th><th>Apoyo</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td>Alexander Torres</td><td>21.079.691-6</td><td>Visual</td><td>Activo</td></tr>
          <tr><td>Matias Soto</td><td>22.120.297-K</td><td>Auditivo</td><td>En seguimiento</td></tr>
        </tbody>
      </table>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}