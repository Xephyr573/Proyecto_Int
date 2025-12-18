// src/pages/homepage/Docente/pages/SolicitudesRecibidas.js
import "./SolicitudesRecibidas.css";
import { useMemo, useState } from "react";
import { DocenteShell } from "../DocenteShell";

const SOLICITUDES_BASE = [
  { id: "SOL-001", fecha: "2025-04-05", estudiante: "Alexander Torres", carrera: "Ingeniería en Informática", solicitud: "Apoyo visual", estado: "Pendiente" },
  { id: "SOL-002", fecha: "2025-04-07", estudiante: "Matias Soto", carrera: "Analista Programador", solicitud: "Tiempo extra en evaluaciones", estado: "Aprobada" },
  { id: "SOL-003", fecha: "2025-04-09", estudiante: "Camila Vargas", carrera: "Moda y Diseño", solicitud: "Adecuación de evaluación", estado: "Pendiente" },
];

function EstadoPill({ value }) {
  const cls =
    value === "Aprobada"
      ? "doc-pill doc-pill-ok"
      : value === "Rechazada"
      ? "doc-pill doc-pill-bad"
      : "doc-pill doc-pill-warn";
  return <span className={cls}>{value}</span>;
}

export default function SolicitudesRecibidas() {
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [detalle, setDetalle] = useState(null);
  const [rows, setRows] = useState(SOLICITUDES_BASE);
  const [comentario, setComentario] = useState("");

  const filtradas = useMemo(() => {
    return rows.filter((r) => {
      const texto = `${r.id} ${r.fecha} ${r.estudiante} ${r.carrera} ${r.solicitud} ${r.estado}`.toLowerCase();
      const okQ = texto.includes(q.toLowerCase());
      const okE = estado === "Todos" ? true : r.estado === estado;
      return okQ && okE;
    });
  }, [rows, q, estado]);

  const decidir = (id, nuevoEstado) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, estado: nuevoEstado } : r)));
    setDetalle((prev) => (prev?.id === id ? { ...prev, estado: nuevoEstado } : prev));
  };

  return (
    <DocenteShell
      active="solicitudes"
      title="Solicitudes recibidas"
      subtitle="Revisión de solicitudes de estudiantes y registro de decisión docente."
    >
      <section className="doc-section">
        <div className="doc-card-surface">
          <div className="doc-toolbar">
            <div className="doc-toolbar-left">
              <label className="doc-field">
                Buscar
                <input
                  className="doc-input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Código, estudiante, solicitud…"
                />
              </label>

              <label className="doc-field">
                Estado
                <select className="doc-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Pendiente</option>
                  <option>Aprobada</option>
                  <option>Rechazada</option>
                </select>
              </label>
            </div>

            <div className="doc-toolbar-right">
              <button type="button" className="doc-btn doc-btn-secondary" onClick={() => { setQ(""); setEstado("Todos"); }}>
                Limpiar filtros
              </button>
            </div>
          </div>

          <div className="doc-split">
            <div className="doc-split-left">
              <div className="doc-table-wrap">
                <table className="doc-table">
                  <thead>
                    <tr>
                      <th>Solicitud</th>
                      <th>Estudiante</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th className="doc-th-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtradas.length === 0 && (
                      <tr>
                        <td colSpan={5} className="doc-empty">No hay solicitudes con estos filtros.</td>
                      </tr>
                    )}

                    {filtradas.map((r) => (
                      <tr key={r.id}>
                        <td>
                          <div className="doc-strong">{r.solicitud}</div>
                          <div className="doc-muted doc-small">{r.id} · {r.carrera}</div>
                        </td>
                        <td className="doc-strong">{r.estudiante}</td>
                        <td className="doc-mono">{r.fecha}</td>
                        <td><EstadoPill value={r.estado} /></td>
                        <td className="doc-td-right">
                          <button type="button" className="doc-link" onClick={() => { setDetalle(r); setComentario(""); }}>
                            Ver detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="doc-note">
                En backend, este módulo debe listar solicitudes por docente/carrera y registrar decisión con un PATCH.
              </p>
            </div>

            <div className="doc-split-right">
              <div className="doc-detail-card">
                <div className="doc-detail-header">
                  <h3>Detalle</h3>
                  {!detalle && <span className="doc-muted">Seleccione una solicitud</span>}
                </div>

                {!detalle && (
                  <div className="doc-detail-empty">
                    <p className="doc-muted">
                      Seleccione una fila para ver la solicitud, revisar antecedentes y registrar una decisión.
                    </p>
                  </div>
                )}

                {detalle && (
                  <>
                    <div className="doc-detail-row">
                      <span className="doc-muted">Código</span>
                      <span className="doc-strong">{detalle.id}</span>
                    </div>
                    <div className="doc-detail-row">
                      <span className="doc-muted">Estudiante</span>
                      <span className="doc-strong">{detalle.estudiante}</span>
                    </div>
                    <div className="doc-detail-row">
                      <span className="doc-muted">Carrera</span>
                      <span>{detalle.carrera}</span>
                    </div>
                    <div className="doc-detail-row">
                      <span className="doc-muted">Fecha</span>
                      <span className="doc-mono">{detalle.fecha}</span>
                    </div>
                    <div className="doc-detail-row">
                      <span className="doc-muted">Estado</span>
                      <EstadoPill value={detalle.estado} />
                    </div>

                    <div className="doc-divider" />

                    <label className="doc-field">
                      Comentario docente
                      <textarea
                        className="doc-textarea"
                        rows={5}
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Registre una observación breve (criterio, condiciones, acuerdos, evidencias)."
                      />
                    </label>

                    <div className="doc-actions">
                      <button type="button" className="doc-btn doc-btn-ok" onClick={() => decidir(detalle.id, "Aprobada")}>
                        Aprobar
                      </button>
                      <button type="button" className="doc-btn doc-btn-bad" onClick={() => decidir(detalle.id, "Rechazada")}>
                        Rechazar
                      </button>
                      <button type="button" className="doc-btn doc-btn-secondary" onClick={() => setDetalle(null)}>
                        Cerrar
                      </button>
                    </div>

                    <p className="doc-note doc-note-tight">
                      En producción, el comentario se enviará al backend junto con la decisión.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DocenteShell>
  );
}
