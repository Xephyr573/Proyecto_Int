// src/pages/homepage/Docente/pages/ReportesDocente.js
import "./ReportesDocente.css";
import { useMemo, useState } from "react";
import { DocenteShell } from "../DocenteShell";

const KPIS = [
  { label: "Asistencia promedio", value: "80%", hint: "Últimos 30 días", tone: "info" },
  { label: "Solicitudes atendidas", value: 15, hint: "Semestre actual", tone: "ok" },
  { label: "Pendientes", value: 3, hint: "Requieren decisión", tone: "warn" },
];

const RESUMEN = [
  { semana: "Semana 1", carrera: "Ing. Informática", asist: "82%", solicitudes: 4, pendientes: 1 },
  { semana: "Semana 2", carrera: "Ing. Informática", asist: "78%", solicitudes: 6, pendientes: 2 },
  { semana: "Semana 3", carrera: "Analista Programador", asist: "80%", solicitudes: 5, pendientes: 0 },
];

export default function ReportesDocente() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    return RESUMEN.filter((r) =>
      `${r.semana} ${r.carrera}`.toLowerCase().includes(q.toLowerCase())
    );
  }, [q]);

  return (
    <DocenteShell
      active="reportes"
      title="Reportes académicos"
      subtitle="Indicadores de asistencia y trazabilidad de solicitudes del flujo de inclusión."
    >
      <section className="doc-section">
        <div className="doc-card-surface">
          <div className="doc-kpis doc-kpis-3">
            {KPIS.map((k) => (
              <div key={k.label} className={"doc-kpi doc-kpi-" + k.tone}>
                <span className="doc-kpi-label">{k.label}</span>
                <strong className="doc-kpi-value">{k.value}</strong>
                <small className="doc-kpi-hint">{k.hint}</small>
              </div>
            ))}
          </div>

          <div className="doc-report-toolbar">
            <label className="doc-field">
              Filtrar por carrera/semana
              <input className="doc-input doc-input-wide" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ej: Informática, Semana 2" />
            </label>

            <button type="button" className="doc-btn doc-btn-secondary" onClick={() => setQ("")}>
              Limpiar
            </button>

            <button type="button" className="doc-btn doc-btn-ok" onClick={() => alert("Demo: exportación a PDF/Excel desde backend.")}>
              Exportar
            </button>
          </div>

          <div className="doc-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Semana</th>
                  <th>Carrera</th>
                  <th>Asistencia</th>
                  <th>Solicitudes</th>
                  <th className="doc-th-right">Pendientes</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="doc-empty">
                      No hay datos con este filtro.
                    </td>
                  </tr>
                )}
                {rows.map((r) => (
                  <tr key={r.semana + r.carrera}>
                    <td className="doc-strong">{r.semana}</td>
                    <td>{r.carrera}</td>
                    <td>
                      <div className="doc-progress">
                        <div className="doc-progress-bar" style={{ width: r.asist }} />
                        <span className="doc-progress-text">{r.asist}</span>
                      </div>
                    </td>
                    <td className="doc-strong">{r.solicitudes}</td>
                    <td className="doc-td-right">
                      <span className={"doc-pill " + (r.pendientes > 0 ? "doc-pill-warn" : "doc-pill-ok")}>
                        {r.pendientes}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="doc-note">
            En backend, estos KPIs deberían calcularse con filtros por sede/carrera/docente y rango de fechas.
          </p>
        </div>
      </section>
    </DocenteShell>
  );
}
