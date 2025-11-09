import { useNavigate } from "react-router-dom";
import "./ReporteAsesor.css";

export default function ReporteAsesor(){
  const navigate = useNavigate();
  return (
    <div className="ases-page">
      <h1>Reporte General Asesor</h1>
      <section className="kpis">
        <div className="kpi"><h3>Entrevistas realizadas</h3><strong>12</strong></div>
        <div className="kpi"><h3>Estudiantes activos</h3><strong>25</strong></div>
        <div className="kpi"><h3>Apoyos pendientes</h3><strong>3</strong></div>
      </section>
      <button className="btn-back" onClick={()=>navigate(-1)}>← Volver</button>
    </div>
  );
}