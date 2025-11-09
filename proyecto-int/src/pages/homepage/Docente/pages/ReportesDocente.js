import { useNavigate } from "react-router-dom";
import "./ReportesDocente.css";

export default function ReportesDocente(){
  const navigate = useNavigate();
  return (
    <div className="doc-page">
      <h1>Reportes del Docente</h1>
      <section className="kpis">
        <div className="kpi"><h3>Asistencias registradas</h3><strong>80%</strong></div>
        <div className="kpi"><h3>Solicitudes atendidas</h3><strong>15</strong></div>
      </section>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}