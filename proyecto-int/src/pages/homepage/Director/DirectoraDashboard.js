// src/pages/homepage/Director/DirectoraDashboard.js
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DirectoraDashboard.css";

const VALIDAR_AJUSTES_PATH = "/director/validarajustes";
const LS_AJUSTES_PROPUESTOS = "sgar_ajustes_propuestos_v1";

// ====== Carreras (Área -> Carreras) ======
const CARRERAS_POR_AREA = {
  "Administración y Servicios": [
    "Administración de Empresas",
    "Ingeniería en Administración de Empresas",
    "Administración Gastronómica",
    "Gastronomía",
    "Gestión Turística",
    "Ingeniería en Gestión Turística",
  ],
  Salud: ["Técnico en Farmacia", "Técnico en Odontología"],
  "Energía y Sostenibilidad": [
    "Ingeniería Agrícola",
    "Técnico Agrícola",
    "Construcción Civil",
    "Técnico en Construcción",
    "Técnico en Topografía y Geomática",
    "Ingeniería Eléctrica",
    "Técnico en Electricidad Industrial",
    "Ingeniería en Logística",
    "Técnico en Logística",
    "Ingeniería en Mecánica y Electromovilidad Automotriz",
    "Mecánica Automotriz en Maquinaria Pesada",
    "Técnico en Mantenimiento Industrial",
    "Técnico en Mecánica y Electromovilidad Automotriz",
    "Técnico en Prevención de Riesgos y Gestión de Emergencias",
  ],
  "Tecnología Aplicada": [
    "Técnico en Automatización y Robótica",
    "Animación Digital y Videojuegos",
    "Diseño Digital Profesional",
    "Diseño Digital y Web",
    "Analista Programador",
    "Ingeniería en Ciberseguridad",
    "Ingeniería en Informática",
    "Ingeniería en Telecomunicaciones y Servicios Digitales",
  ],
};

const ALL_AREAS = ["Todas", ...Object.keys(CARRERAS_POR_AREA)];

// ====== Casos base (demo) ======
const CASOS_BASE = [
  {
    id: "CASO-001",
    estudiante: "Alexander Torres",
    carrera: "Ingeniería en Informática",
    estado: "Pendiente",
    fecha: "2025-04-01",
    resumen:
      "Caso con foco en dificultades visuales y atención. Se propone ampliar letra y ajustar ubicación en sala.",
    // Se rellenará desde localStorage si existe
    ajustesPropuestos: [],
  },
  {
    id: "CASO-002",
    estudiante: "Matias Soto",
    carrera: "Analista Programador",
    estado: "Aprobado",
    fecha: "2025-03-20",
    resumen:
      "Caso aprobado en reunión anterior. Ajustes ya informados a docentes de la carrera.",
    ajustesPropuestos: [
      {
        codigo: "A4",
        categoria: "A",
        titulo: "Ayudas tecnológicas para acceso a la información",
        descripcion:
          "Uso de herramientas digitales para acceder a contenidos y evaluaciones.",
        recomendado: true,
      },
      {
        codigo: "D5",
        categoria: "D",
        titulo: "25% de tiempo extra en evaluaciones",
        descripcion:
          "Extender el tiempo disponible en evaluaciones escritas u online.",
        recomendado: true,
      },
    ],
  },
  {
    id: "CASO-003",
    estudiante: "Benjamin Urra",
    carrera: "Ingeniería en Informática",
    estado: "Rechazado",
    fecha: "2025-03-10",
    resumen:
      "Solicitud rechazada por exceder los criterios institucionales. Se definieron alternativas.",
    ajustesPropuestos: [
      {
        codigo: "D7",
        categoria: "D",
        titulo: "75% de tiempo extra en evaluaciones",
        descripcion:
          "Propuesta que excede el criterio institucional. Se sugiere alternativa menor.",
        recomendado: false,
      },
    ],
  },
];

const MENSAJES_DIRECTOR = [
  {
    id: 1,
    asunto: "Nuevo caso derivado desde Asesoría",
    remitente: "Encargada de Inclusión",
    fecha: "01-04-2025",
  },
  {
    id: 2,
    asunto: "Recordatorio: validar ajustes pendientes",
    remitente: "Sistema SGAR",
    fecha: "28-03-2025",
  },
  {
    id: 3,
    asunto: "Consulta sobre criterios de validación",
    remitente: "Docente Bases de Datos",
    fecha: "25-03-2025",
  },
];

function safeReadLS(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

function buildResumenAjustesFromPayload(payload) {
  // payload.ajustes viene desde DefinirAjustes.js con:
  // { id, categoria, categoriaNombre, titulo, descripcion, propuestoPorCoordinacion }
  const ajustes = Array.isArray(payload?.ajustes) ? payload.ajustes : [];
  return ajustes.map((a) => ({
    codigo: a.id, // A1, B1...
    categoria: a.categoria, // A, B, C, D
    titulo: a.titulo,
    descripcion: a.descripcion,
    recomendado: Boolean(a.propuestoPorCoordinacion),
  }));
}

export default function DirectorDashboard() {
  const navigate = useNavigate();

  const [pestanaActiva, setPestanaActiva] = useState("resumen");
  const [tabEstado, setTabEstado] = useState("Pendiente");

  // Buscar por id/estudiante/carrera (lo usas como “barra”)
  const [busqueda, setBusqueda] = useState("");

  // Bloque carreras
  const [areaSeleccionada, setAreaSeleccionada] = useState("Todas");
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("Todas");

  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  // ====== 1) Leer payload guardado por DefinirAjustes ======
  const [payloadDefinidos, setPayloadDefinidos] = useState(() =>
    safeReadLS(LS_AJUSTES_PROPUESTOS)
  );

  // Si quieres que se actualice al instante cuando vuelves desde DefinirAjustes,
  // recargamos el payload cada vez que vuelves a esta vista (al montar).
  useEffect(() => {
    setPayloadDefinidos(safeReadLS(LS_AJUSTES_PROPUESTOS));
  }, []);

  // ====== 2) Construir casos “vivos” mezclando CASOS_BASE + payload ======
  const casos = useMemo(() => {
    const base = [...CASOS_BASE];

    const casoPayload = payloadDefinidos?.caso;
    if (!casoPayload?.id) return base;

    // Solo actualizamos el caso que coincida (CASO-001 en tu demo)
    return base.map((c) => {
      if (c.id !== casoPayload.id) return c;

      const resumenAjustes = buildResumenAjustesFromPayload(payloadDefinidos);

      return {
        ...c,
        // si cambiaste estudiante/carrera desde el payload, también se reflejará
        estudiante: casoPayload.estudiante || c.estudiante,
        carrera: casoPayload.carrera || c.carrera,
        // el resumen “bonito” viene 100% desde lo definido
        ajustesPropuestos: resumenAjustes,
      };
    });
  }, [payloadDefinidos]);

  // ====== KPIs por estado ======
  const totalPendientes = useMemo(
    () => casos.filter((c) => c.estado === "Pendiente").length,
    [casos]
  );
  const totalAprobados = useMemo(
    () => casos.filter((c) => c.estado === "Aprobado").length,
    [casos]
  );
  const totalRechazados = useMemo(
    () => casos.filter((c) => c.estado === "Rechazado").length,
    [casos]
  );

  const carrerasDisponibles = useMemo(() => {
    if (areaSeleccionada === "Todas") {
      const flat = Object.values(CARRERAS_POR_AREA).flat();
      const uniq = Array.from(new Set(flat)).sort();
      return ["Todas", ...uniq];
    }
    const arr = CARRERAS_POR_AREA[areaSeleccionada] || [];
    const uniq = Array.from(new Set(arr)).sort();
    return ["Todas", ...uniq];
  }, [areaSeleccionada]);

  const onChangeArea = (value) => {
    setAreaSeleccionada(value);
    setCarreraSeleccionada("Todas");
  };

  const casosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return casos.filter((c) => {
      const matchEstado = c.estado === tabEstado;

      const matchCarrera =
        carreraSeleccionada === "Todas" ? true : c.carrera === carreraSeleccionada;

      const matchArea =
        areaSeleccionada === "Todas"
          ? true
          : (CARRERAS_POR_AREA[areaSeleccionada] || []).includes(c.carrera);

      const matchBusqueda =
        q.length === 0
          ? true
          : `${c.id} ${c.estudiante} ${c.carrera}`.toLowerCase().includes(q);

      return matchEstado && matchArea && matchCarrera && matchBusqueda;
    });
  }, [casos, tabEstado, areaSeleccionada, carreraSeleccionada, busqueda]);

  const abrirValidarAjustes = (caso) => {
    if (!caso) {
      alert("Selecciona un caso para validar ajustes.");
      return;
    }

    // 1) Cambiar “barra de búsqueda” al nombre del estudiante
    setBusqueda(caso.estudiante);

    // 2) Asegurar que ValidarAjustes tome lo definido (payload actual)
    // Si el caso abierto coincide con el payload, ya está guardado.
    // Si no, en demo no hacemos nada.
    navigate(VALIDAR_AJUSTES_PATH);
  };

  const seleccionarCaso = (c) => {
    setCasoSeleccionado(c);
    setPestanaActiva("detalle");
  };

  return (
    <div className="dir-layout">
      <aside className="dir-sidebar">
        <div className="dir-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="dir-sidebar-logo"
          />
        </div>

        <div className="dir-sidebar-card">
          <span className="dir-sidebar-label">Rol</span>
          <p className="dir-sidebar-name">Directora de Carrera</p>
          <p className="dir-sidebar-sub">Sede Temuco</p>
        </div>

        <nav className="dir-sidebar-menu">
          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "resumen" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("resumen")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Resumen general</span>
          </button>

          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "casos" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("casos")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Casos por estado</span>
          </button>

          <button
            className={
              "dir-sidebar-item " +
              (pestanaActiva === "detalle" ? "dir-sidebar-item-active" : "")
            }
            onClick={() => setPestanaActiva("detalle")}
          >
            <span className="dir-sidebar-bullet" />
            <span>Detalle del caso</span>
          </button>
        </nav>
      </aside>

      <main className="dir-main">
        <header className="dir-main-header">
          <div>
            <h1>Panel Directora de Carrera</h1>
            <p className="dir-subtitle">
              Validación de ajustes razonables y revisión de historial de casos de la carrera.
            </p>

            <div className="dir-header-actions">
              <button
                type="button"
                className="dir-btn-primary"
                onClick={() => abrirValidarAjustes(casoSeleccionado)}
              >
                Ir a Validar Ajustes
              </button>

              <button
                type="button"
                className="dir-btn-secondary"
                onClick={() => setPestanaActiva("casos")}
              >
                Ver casos
              </button>
            </div>
          </div>

          <div className="dir-header-tags">
            <span className="dir-badge dir-badge-rol">Directora</span>
            <span className="dir-badge dir-badge-sede">Sede Temuco</span>
          </div>
        </header>

        <section className="dir-resumen-row">
          <div className="dir-resumen-card dir-resumen-pendiente">
            <span className="dir-resumen-label">Pendientes</span>
            <strong>{totalPendientes}</strong>
            <small>Casos a revisar</small>
          </div>
          <div className="dir-resumen-card dir-resumen-aprobado">
            <span className="dir-resumen-label">Aprobados</span>
            <strong>{totalAprobados}</strong>
            <small>Ajustes validados</small>
          </div>
          <div className="dir-resumen-card dir-resumen-rechazado">
            <span className="dir-resumen-label">Rechazados</span>
            <strong>{totalRechazados}</strong>
            <small>Con observaciones</small>
          </div>
        </section>

        {pestanaActiva === "resumen" && (
          <section className="dir-section">
            <div className="dir-grid">
              <div className="dir-card">
                <h3>Bandeja de mensajes</h3>
                <ul className="dir-mensajes-list">
                  {MENSAJES_DIRECTOR.map((m) => (
                    <li key={m.id}>
                      <div className="dir-mensaje-asunto">{m.asunto}</div>
                      <div className="dir-mensaje-meta">
                        <span>{m.remitente}</span>
                        <span>{m.fecha}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dir-card">
                <h3>Sincronización (demo)</h3>
                <p className="dir-card-help">
                  Si la Coordinación definió ajustes, este panel los toma automáticamente desde localStorage.
                </p>
                <button
                  type="button"
                  className="dir-btn-secondary"
                  onClick={() => setPayloadDefinidos(safeReadLS(LS_AJUSTES_PROPUESTOS))}
                >
                  Recargar ajustes definidos
                </button>
              </div>
            </div>
          </section>
        )}

        {pestanaActiva === "casos" && (
          <section className="dir-section">
            <div className="dir-card">
              <div className="dir-tabs">
                {["Pendiente", "Aprobado", "Rechazado"].map((estado) => (
                  <button
                    key={estado}
                    type="button"
                    className={"dir-tab" + (tabEstado === estado ? " dir-tab-active" : "")}
                    onClick={() => setTabEstado(estado)}
                  >
                    {estado}
                  </button>
                ))}
              </div>

              <div className="dir-filter-row">
                <label className="dir-filter-label">
                  Área
                  <select value={areaSeleccionada} onChange={(e) => onChangeArea(e.target.value)}>
                    {ALL_AREAS.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="dir-filter-label">
                  Carrera
                  <select
                    value={carreraSeleccionada}
                    onChange={(e) => setCarreraSeleccionada(e.target.value)}
                  >
                    {carrerasDisponibles.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="dir-filter-label">
                  Buscar (caso / estudiante / carrera)
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Ej: CASO-001 o Alexander"
                  />
                </label>
              </div>

              <div className="dir-table-wrapper">
                <table className="dir-table">
                  <thead>
                    <tr>
                      <th>Caso</th>
                      <th>Estudiante</th>
                      <th>Carrera</th>
                      <th>Fecha</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {casosFiltrados.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.estudiante}</td>
                        <td>{c.carrera}</td>
                        <td>{c.fecha}</td>
                        <td className="dir-table-actions">
                          <button type="button" className="dir-link" onClick={() => seleccionarCaso(c)}>
                            Ver detalle
                          </button>
                          <button type="button" className="dir-link" onClick={() => abrirValidarAjustes(c)}>
                            Validar ajustes
                          </button>
                        </td>
                      </tr>
                    ))}
                    {casosFiltrados.length === 0 && (
                      <tr>
                        <td colSpan={5} className="dir-table-empty">
                          No hay casos con esos filtros.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="dir-card-help" style={{ marginTop: 10 }}>
                “CASO-001” se alimenta desde lo que definió Coordinación en “Definir ajustes”.
              </p>
            </div>
          </section>
        )}

        {pestanaActiva === "detalle" && (
          <section className="dir-section">
            <div className="dir-card">
              {!casoSeleccionado ? (
                <div className="dir-empty">
                  <p className="dir-card-help" style={{ margin: 0 }}>
                    Selecciona un caso desde “Casos por estado”.
                  </p>
                </div>
              ) : (
                <>
                  <div className="dir-detail-hero">
                    <div>
                      <div className="dir-detail-id">{casoSeleccionado.id}</div>
                      <div className="dir-detail-title">{casoSeleccionado.estudiante}</div>
                      <div className="dir-detail-sub">
                        {casoSeleccionado.carrera} · {casoSeleccionado.fecha}
                      </div>
                    </div>

                    <div className="dir-detail-hero-actions">
                      <span className={"dir-state-pill dir-state-" + casoSeleccionado.estado.toLowerCase()}>
                        {casoSeleccionado.estado}
                      </span>

                      <button
                        type="button"
                        className="dir-btn-primary"
                        onClick={() => abrirValidarAjustes(casoSeleccionado)}
                      >
                        Validar ajustes
                      </button>
                    </div>
                  </div>

                  <div className="dir-detail-grid">
                    <div className="dir-detail-card">
                      <div className="dir-detail-card-head">
                        <h4>Ficha del caso</h4>
                        <span className="dir-muted">Vista ejecutiva</span>
                      </div>

                      <div className="dir-kv">
                        <div className="dir-kv-item">
                          <span>Caso</span>
                          <strong>{casoSeleccionado.id}</strong>
                        </div>
                        <div className="dir-kv-item">
                          <span>Estudiante</span>
                          <strong>{casoSeleccionado.estudiante}</strong>
                        </div>
                        <div className="dir-kv-item">
                          <span>Carrera</span>
                          <strong>{casoSeleccionado.carrera}</strong>
                        </div>
                        <div className="dir-kv-item">
                          <span>Fecha</span>
                          <strong>{casoSeleccionado.fecha}</strong>
                        </div>
                        <div className="dir-kv-item">
                          <span>Ajustes definidos</span>
                          <strong>{casoSeleccionado.ajustesPropuestos?.length || 0}</strong>
                        </div>
                        <div className="dir-kv-item">
                          <span>Origen</span>
                          <strong>
                            {casoSeleccionado.id === payloadDefinidos?.caso?.id
                              ? "DefinirAjustes (sincronizado)"
                              : "Demo"}
                          </strong>
                        </div>
                      </div>

                      <div className="dir-note">{casoSeleccionado.resumen}</div>

                      <div className="dir-note-soft">
                        El detalle por ajuste (Aprobar / No aprobar / Revisión y comentarios) se realiza en “Validar ajustes”.
                      </div>
                    </div>

                    <div className="dir-detail-card">
                      <div className="dir-detail-card-head">
                        <h4>Resumen de ajustes definidos</h4>
                        <span className="dir-muted">Vista rápida</span>
                      </div>

                      <div className="dir-ajustes-cards">
                        {(casoSeleccionado.ajustesPropuestos || []).map((a) => (
                          <div key={a.codigo} className="dir-aj-card">
                            <div className="dir-aj-top">
                              <span className={"dir-aj-tag dir-aj-" + a.categoria}>{a.categoria}</span>
                              <div className="dir-aj-code">{a.codigo}</div>
                              <span className={"dir-aj-pill " + (a.recomendado ? "ok" : "warn")}>
                                {a.recomendado ? "Recomendado" : "No recomendado"}
                              </span>
                            </div>
                            <div className="dir-aj-title">{a.titulo}</div>
                            <div className="dir-aj-desc">{a.descripcion}</div>
                          </div>
                        ))}

                        {(!casoSeleccionado.ajustesPropuestos ||
                          casoSeleccionado.ajustesPropuestos.length === 0) && (
                          <div className="dir-empty-lite">
                            Aún no hay ajustes definidos para este caso.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <footer className="dir-footer">© 2025 · SGAR Inclusión · Vista Directora de Carrera</footer>
      </main>
    </div>
  );
}
