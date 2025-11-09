import { useNavigate } from "react-router-dom";
import "./ReportesDirector.css";

export default function ReportesDirector(){
  const navigate = useNavigate();
  return (
    <div className="dir-page">
      <h1>Reportes Globales</h1>
      <section className="kpis">
        <div className="kpi"><h3>Asistencia Promedio</h3><strong>91%</strong></div>
        <div className="kpi"><h3>Solicitudes Totales</h3><strong>42</strong></div>
        <div className="kpi"><h3>Entrevistas Realizadas</h3><strong>15</strong></div>
      </section>

      <table className="dir-table">
        <thead><tr><th>Indicador</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Estudiantes con apoyos activos</td><td>27</td></tr>
          <tr><td>Profesores asignados</td><td>8</td></tr>
          <tr><td>Reuniones programadas</td><td>5</td></tr>
        </tbody>
      </table>

      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}