import { useNavigate } from "react-router-dom";
import "./EntrevistasRealizadas.css";

export default function EntrevistasRealizadas(){
  const navigate = useNavigate();
  return (
    <div className="ases-page">
      <h1>Entrevistas Realizadas</h1>
      <table className="ases-table">
        <thead><tr><th>Fecha</th><th>Estudiante</th><th>Observaciones</th></tr></thead>
        <tbody>
          <tr><td>08/04/2025</td><td>Pedro Soto</td><td>Se recomienda seguimiento semanal</td></tr>
          <tr><td>10/04/2025</td><td>María Gómez</td><td>Avances positivos en apoyo cognitivo</td></tr>
        </tbody>
      </table>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}