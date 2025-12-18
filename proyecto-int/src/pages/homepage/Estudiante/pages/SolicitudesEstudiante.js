import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SolicitudesEstudiante.css";

const LS_USER = "sgar_user";
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

function buildTimeline(item) {
  const base = [
    { t: "Creada", d: item.createdAt || "" },
    { t: "En revisión", d: item.reviewAt || "" },
  ];
  if (item.estado === "Aprobada") base.push({ t: "Aprobada", d: item.updatedAt || "" });
  if (item.estado === "Rechazada") base.push({ t: "Rechazada", d: item.updatedAt || "" });
  if (item.estado === "Pendiente") base.push({ t: "Pendiente", d: item.updatedAt || "" });
  return base;
}

export default function SolicitudesEstudiante() {
  const navigate = useNavigate();

  const [perfil, setPerfil] = useState(null);
  const correo = (perfil?.correo || "anon").toLowerCase();

  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [seleccion, setSeleccion] = useState(null);

  useEffect(() => {
    const user = loadJSON(LS_USER, null);
    setPerfil(
      user || {
        nombre: "Nombre Nombre Apellido Apellido",
        correo: "estudiante@inacapmail.cl",
        carrera: "Ingeniería en Informática",
      }
    );
  }, []);

  const items = useMemo(() => {
    const list = [];

    // 1) Necesidades especiales (si existe)
    const allNeeds = loadJSON(LS_NEEDS, {});
    const n = allNeeds[correo];
    if (n) {
      list.push({
        id: "NEE-1",
        tipo: "Necesidades especiales",
        solicitud: "Registro / Actualización de necesidades",
        estado: n.estado === "En revisión" ? "Pendiente" : "Pendiente",
        createdAt: n.updatedAt,
        updatedAt: n.updatedAt,
        detalle: `Tipo: ${n.tipo || "-"} · Apoyos: ${n.apoyos || "-"}`,
      });
    }

    // 2) Solicitudes de cita del estudiante
    const reqs = loadJSON(LS_REQ, []);
    reqs
      .filter((r) => String(r.correo || "").toLowerCase() === correo)
      .forEach((r) => {
        list.push({
          id: r.id || `CITA-${r.dateKey}-${r.hour}`,
          tipo: "Entrevista",
          solicitud: `Solicitud de entrevista (${r.dateKey} · ${r.hour})`,
          estado: "Pendiente",
          createdAt: r.createdAt,
          updatedAt: r.createdAt,
          detalle: "Solicitud registrada por el estudiante. Pendiente de aprobación por Encargada.",
        });
      });

    // 3) Bloques reservados (aprobados)
    const slots = loadJSON(LS_SLOTS, {});
    Object.entries(slots)
      .filter(([, v]) => v?.state === "reserved" && String(v?.correo || "").toLowerCase() === correo)
      .forEach(([slotId, v]) => {
        const [dateKey, hour] = slotId.split("|");
        list.push({
          id: `RES-${slotId}`,
          tipo: "Entrevista",
          solicitud: `Entrevista reservada (${dateKey} · ${hour})`,
          estado: "Aprobada",
          createdAt: v.createdAt,
          updatedAt: v.updatedAt || v.createdAt,
          detalle: "Bloque aprobado y reservado por la Encargada.",
        });
      });

    // fallback demo si no hay nada
    if (list.length === 0) {
      list.push(
        {
          id: "DEMO-1",
          tipo: "Apoyo académico",
          solicitud: "Tutorías académicas",
          estado: "Pendiente",
          createdAt: "2025-04-08",
          updatedAt: "2025-04-08",
          detalle: "Solicitud de demo para mostrar el flujo.",
        },
        {
          id: "DEMO-2",
          tipo: "Material adaptado",
          solicitud: "Material adaptado",
          estado: "Aprobada",
          createdAt: "2025-03-20",
          updatedAt: "2025-03-20",
          detalle: "Solicitud aprobada (demo).",
        },
        {
          id: "DEMO-3",
          tipo: "Evaluaciones",
          solicitud: "Tiempo adicional",
          estado: "Rechazada",
          createdAt: "2025-03-10",
          updatedAt: "2025-03-10",
          detalle: "Solicitud rechazada (demo).",
        }
      );
    }

    // normalizar estados a: Pendiente | Aprobada | Rechazada
    return list
      .map((x) => ({
        ...x,
        estado:
          x.estado === "Aprobado" ? "Aprobada" : x.estado === "Rechazado" ? "Rechazada" : x.estado,
      }))
      .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  }, [correo]);

  const filtradas = useMemo(() => {
    return items
      .filter((it) => (estado === "Todos" ? true : it.estado === estado))
      .filter((it) => {
        const blob = `${it.id} ${it.tipo} ${it.solicitud} ${it.estado} ${it.detalle}`.toLowerCase();
        return blob.includes(q.toLowerCase());
      });
  }, [items, estado, q]);

  return (
    <div className="sol-page">
      <div className="sol-shell">
        <header className="sol-header">
          <div>
            <h1>Historial de Solicitudes</h1>
            <p className="sol-sub">
              Revisa el estado de tus solicitudes y el detalle del proceso.
            </p>
          </div>
          <button className="sol-btn sol-btn-ghost" onClick={() => navigate(-1)} type="button">
            Volver
          </button>
        </header>

        <section className="sol-card">
          <div className="sol-filters">
            <div className="sol-field">
              <label>Buscar</label>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Código, tipo, solicitud o detalle" />
            </div>

            <div className="sol-field">
              <label>Estado</label>
              <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option>Todos</option>
                <option>Pendiente</option>
                <option>Aprobada</option>
                <option>Rechazada</option>
              </select>
            </div>
          </div>

          <div className="sol-tablewrap">
            <table className="sol-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Solicitud</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length === 0 && (
                  <tr>
                    <td colSpan={5} className="sol-empty">
                      No hay solicitudes con esos filtros.
                    </td>
                  </tr>
                )}

                {filtradas.map((it) => (
                  <tr key={it.id}>
                    <td>{it.updatedAt ? new Date(it.updatedAt).toLocaleDateString("es-CL") : "-"}</td>
                    <td>{it.tipo}</td>
                    <td className="sol-ellipsis">{it.solicitud}</td>
                    <td>
                      <span className={"sol-pill " + (it.estado === "Aprobada" ? "ok" : it.estado === "Rechazada" ? "no" : "warn")}>
                        {it.estado}
                      </span>
                    </td>
                    <td className="sol-right">
                      <button className="sol-link" type="button" onClick={() => setSeleccion(it)}>
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {seleccion && (
          <div className="sol-drawer-backdrop" role="dialog" aria-modal="true">
            <aside className="sol-drawer">
              <div className="sol-drawer-head">
                <div>
                  <div className="sol-drawer-id">{seleccion.id}</div>
                  <h3>{seleccion.solicitud}</h3>
                </div>
                <button className="sol-x" type="button" onClick={() => setSeleccion(null)}>
                  Cerrar
                </button>
              </div>

              <div className="sol-drawer-meta">
                <span className="sol-meta-label">Tipo</span>
                <strong>{seleccion.tipo}</strong>

                <span className="sol-meta-label">Estado</span>
                <strong>{seleccion.estado}</strong>
              </div>

              <div className="sol-block">
                <div className="sol-block-title">Detalle</div>
                <p className="sol-text">{seleccion.detalle}</p>
              </div>

              <div className="sol-block">
                <div className="sol-block-title">Seguimiento</div>
                <div className="sol-timeline">
                  {buildTimeline(seleccion).map((s, idx) => (
                    <div key={idx} className="sol-step">
                      <div className="sol-dot" />
                      <div>
                        <div className="sol-step-title">{s.t}</div>
                        <div className="sol-step-date">{s.d ? new Date(s.d).toLocaleString("es-CL") : "-"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sol-drawer-foot">
                <button className="sol-btn sol-btn-ghost2" type="button" onClick={() => setSeleccion(null)}>
                  Cerrar
                </button>
              </div>
            </aside>
          </div>
        )}

        <footer className="sol-footer">© 2025 · INACAP · SGAR Inclusión</footer>
      </div>
    </div>
  );
}
