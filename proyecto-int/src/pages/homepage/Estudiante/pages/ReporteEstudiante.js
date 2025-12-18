import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReporteEstudiante.css";

const LS_USER = "sgar_user";
const LS_ATT = "sgar_attendance_v1";
const LS_NEEDS = "sgar_needs_v1";
const LS_REQ = "sgar_citas_pendientes_v1";
const LS_SLOTS = "sgar_agenda_slots_v1";

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export default function ReporteEstudiante() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const correo = (perfil?.correo || "anon").toLowerCase();

  useEffect(() => {
    const user = loadJSON(LS_USER, null);
    setPerfil(
      user || {
        nombre: "Nombre Nombre Apellido Apellido",
        correo: "estudiante@inacapmail.cl",
        carrera: "Ingeniería en Informática",
        sede: "Sede Temuco",
      }
    );
  }, []);

  const resumen = useMemo(() => {
    const attAll = loadJSON(LS_ATT, {});
    const rows = attAll[correo] || [];

    const total = rows.length || 0;
    const asistio = rows.filter((r) => r.estado === "Asistió").length;
    const noAsistio = rows.filter((r) => r.estado === "No asistió").length;
    const just = rows.filter((r) => r.estado === "Justificada").length;

    const asistenciaPct = total ? Math.round((asistio / total) * 100) : 0;

    const needsAll = loadJSON(LS_NEEDS, {});
    const needs = needsAll[correo] || null;

    const reqs = loadJSON(LS_REQ, []).filter((r) => String(r.correo || "").toLowerCase() === correo);
    const slots = loadJSON(LS_SLOTS, {});
    const reservadas = Object.entries(slots).filter(
      ([, v]) => v?.state === "reserved" && String(v?.correo || "").toLowerCase() === correo
    ).length;

    const pendientesEntrevista = reqs.length;
    const estadoCaso = needs ? (needs.estado === "En revisión" ? "Activo" : "Activo") : "Sin registro";

    return {
      asistenciaPct,
      asistio,
      noAsistio,
      just,
      total,
      pendientesEntrevista,
      reservadas,
      estadoCaso,
      needsEstado: needs ? needs.estado : "Sin registro",
      updatedAt: needs?.updatedAt || perfil?.updatedAt || null,
    };
  }, [correo, perfil]);

  return (
    <div className="rep-page">
      <div className="rep-shell">
        <header className="rep-header">
          <div>
            <h1>Reporte General</h1>
            <p className="rep-sub">
              Resumen del estado del caso, entrevistas y actividad registrada del estudiante.
            </p>
          </div>

          <div className="rep-actions">
            <button className="rep-btn rep-btn-soft" type="button" onClick={() => window.print()}>
              Exportar (PDF)
            </button>
            <button className="rep-btn rep-btn-ghost" type="button" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </header>

        <section className="rep-kpis">
          <div className="rep-kpi rep-k1">
            <span>Asistencia entrevistas</span>
            <strong>{resumen.asistenciaPct}%</strong>
            <small>{resumen.total ? `${resumen.asistio}/${resumen.total} asistidas` : "Sin registros"}</small>
          </div>

          <div className="rep-kpi rep-k2">
            <span>Entrevistas pendientes</span>
            <strong>{resumen.pendientesEntrevista}</strong>
            <small>Solicitudes sin aprobación</small>
          </div>

          <div className="rep-kpi rep-k3">
            <span>Entrevistas reservadas</span>
            <strong>{resumen.reservadas}</strong>
            <small>Bloques aprobados</small>
          </div>

          <div className="rep-kpi rep-k4">
            <span>Estado del caso</span>
            <strong>{resumen.estadoCaso}</strong>
            <small>Necesidades: {resumen.needsEstado}</small>
          </div>
        </section>

        <section className="rep-card">
          <div className="rep-card-title">Resumen ejecutivo</div>
          <div className="rep-summary">
            <div>
              <span>Estudiante</span>
              <strong>{perfil?.nombre}</strong>
            </div>
            <div>
              <span>Carrera</span>
              <strong>{perfil?.carrera}</strong>
            </div>
            <div>
              <span>Sede</span>
              <strong>{perfil?.sede}</strong>
            </div>
            <div>
              <span>Última actualización</span>
              <strong>{resumen.updatedAt ? new Date(resumen.updatedAt).toLocaleString("es-CL") : "-"}</strong>
            </div>
          </div>

          <div className="rep-tablewrap">
            <table className="rep-table">
              <thead>
                <tr>
                  <th>Indicador</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Asistidas</td>
                  <td>{resumen.asistio}</td>
                </tr>
                <tr>
                  <td>No asistió</td>
                  <td>{resumen.noAsistio}</td>
                </tr>
                <tr>
                  <td>Justificadas</td>
                  <td>{resumen.just}</td>
                </tr>
                <tr>
                  <td>Solicitudes de entrevista pendientes</td>
                  <td>{resumen.pendientesEntrevista}</td>
                </tr>
                <tr>
                  <td>Bloques reservados</td>
                  <td>{resumen.reservadas}</td>
                </tr>
                <tr>
                  <td>Estado necesidades especiales</td>
                  <td>{resumen.needsEstado}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rep-note">
            En producción, estos KPIs se calculan desde el backend y se firman como reporte descargable.
          </div>
        </section>

        <footer className="rep-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
