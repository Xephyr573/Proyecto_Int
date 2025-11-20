import { useNavigate } from "react-router-dom";
import "./ReporteEstudiante.css";

export default function ReporteEstudiante(){
  const navigate = useNavigate();

  return (
    <div className="est-page">
      <h1>Reporte General</h1>

      <section className="kpis">
        <div className="kpi"><h3>Asistencia a Entrevistas</h3><strong>85%</strong></div>
        <div className="kpi"><h3>Solicitudes Aprobadas</h3><strong>3</strong></div>
        <div className="kpi"><h3>Reuniones Pendientes</h3><strong>1</strong></div>
      </section>

      <table className="est-table">
        <thead>
          <tr><th>Indicador</th><th>Valor</th></tr>
        </thead>
        <tbody>
          <tr><td>Promedio de asistencia</td><td>92%</td></tr>
          <tr><td>Solicitudes totales</td><td>5</td></tr>
          <tr><td>Última entrevista</td><td>15/04/2025</td></tr>
        </tbody>
      </table>

      <button className="est-btn" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}
