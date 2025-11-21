import { useState } from "react";
import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

// Lista de carreras para el menú desplegable
const CARRERAS_INACAP = [
  // Administración y Servicios
  "Administración de Empresas",
  "Ingeniería en Administración de Empresas",
  "Administración Gastronómica",
  "Gastronomía",
  "Técnico en Farmacia",
  "Técnico en Odontología",
  "Gestión Turística",
  "Ingeniería en Gestión Turística",
  // Energía y Sostenibilidad
  "Ingeniería Agrícola",
  "Técnico Agrícola",
  "Construcción Civil",
  "Técnico en Construcción",
  "Técnico en Topografía y Geomática",
  "Ingeniería Eléctrica",
  "Técnico en Electricidad Industrial",
  // Mantenimiento y Logística
  "Ingeniería en Logística",
  "Técnico en Logística",
  "Ingeniería en Mecánica y Electromovilidad Automotriz",
  "Mecánica Automotriz en Maquinaria Pesada",
  "Técnico en Mantenimiento Industrial",
  "Técnico en Mecánica y Electromovilidad Automotriz",
  // Tecnología Aplicada
  "Técnico en Automatización y Robótica",
  "Animación Digital y Videojuegos",
  "Diseño Digital Profesional",
  "Diseño Digital y Web",
  "Analista Programador",
  "Ingeniería en Ciberseguridad",
  "Ingeniería en Informática",
  "Ingeniería en Telecomunicaciones y Servicios Digitales",
  "Otro (especificar en observaciones)",
];

// Mini “base de datos” de ejemplo (solo demo front)
const ESTUDIANTES_DEMO = [
  {
    rut: "21.079.691-6",
    nombre: "Alexander Torres",
    correo: "alexander.torres@inacapmail.cl",
    telefono: "+56 9 1234 5678",
    carrera: "Ingeniería en Informática",
    residencia: "Labranza",
  },
  {
    rut: "21.958.928-K",
    nombre: "Benjamin Urra",
    correo: "benjamin.urra05@inacapmail.cl",
    telefono: "+56 9 1234 5678",
    carrera: "Analista Programador",
    residencia: "Temuco",
  },
];

export default function RegistrarCaso() {
  // estado para poder rellenar automático
  const [carrera, setCarrera] = useState("");
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [residencia, setResidencia] = useState("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState(null);
  const [tipoMensajeBusqueda, setTipoMensajeBusqueda] = useState("ok"); // "ok" | "error"

  // normaliza texto: minúsculas, sin tildes, sin espacios de más
  const limpiarTexto = (texto) =>
    texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  // busca por rut, correo o nombre en la base demo
  const buscarEstudianteDemo = () => {
    const vrut = limpiarTexto(rut);
    const vcorreo = limpiarTexto(correo);
    const vnombre = limpiarTexto(nombre);

    const encontrado = ESTUDIANTES_DEMO.find((est) => {
      const rutEst = limpiarTexto(est.rut);
      const correoEst = limpiarTexto(est.correo);
      const nombreEst = limpiarTexto(est.nombre);

      if (vrut && rutEst === vrut) return true;
      if (vcorreo && correoEst === vcorreo) return true;
      if (vnombre && nombreEst.includes(vnombre)) return true;
      return false;
    });

    if (encontrado) {
      setRut(encontrado.rut);
      setNombre(encontrado.nombre);
      setCorreo(encontrado.correo);
      setTelefono(encontrado.telefono);
      setCarrera(encontrado.carrera);
      setResidencia(encontrado.residencia || "");

      setTipoMensajeBusqueda("ok");
      setMensajeBusqueda(
        `Datos cargados desde la base demo para: ${encontrado.nombre}.`
      );
    } else {
      setTipoMensajeBusqueda("error");
      setMensajeBusqueda(
        "No se encontraron datos con la información ingresada (demo)."
      );
    }
  };

  return (
    <div className="asesor-form-page">
      <h2>Registrar caso</h2>
      <p className="asesor-form-text">
        En esta pantalla la <strong>Encargada de Inclusión</strong> registra el
        caso en el sistema. Se levantan los datos del estudiante, el motivo de
        la solicitud y un resumen inicial que luego será utilizado por la
        Coordinadora y la Directora en las siguientes etapas del flujo
        semestral.
      </p>

      {/* Paso del flujo semestral */}
      <div className="flujo-etapas">
        <div className="etapa active">1. Entrevista / Registro de caso</div>
        <div className="etapa">2. Definición de ajustes</div>
        <div className="etapa">3. Seguimiento</div>
        <div className="etapa">4. Evaluación final</div>
      </div>

      <form className="asesor-form">
        <fieldset className="asesor-fieldset">
          <legend>Datos del caso</legend>

          <div className="asesor-grid-2">
            <label>
              Código del caso
              <input
                type="text"
                value="CASO-001"
                readOnly
                className="input-readonly"
              />
            </label>

            <label>
              Semestre
              <input
                type="text"
                value="2/2025"
                readOnly
                className="input-readonly"
              />
            </label>

            {/* AQUÍ cambiamos Sede/Campus por ciudad de residencia */}
            <label>
              Ciudad / comuna de residencia
              <input
                type="text"
                placeholder="Ej: Temuco"
                value={residencia}
                onChange={(e) => setResidencia(e.target.value)}
              />
            </label>

            <label>
              Carrera / Programa
              <select
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              >
                <option value="" disabled>
                  Seleccione una carrera
                </option>
                {CARRERAS_INACAP.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </fieldset>

        <fieldset className="asesor-fieldset">
          <legend>Datos del estudiante</legend>

          <div className="asesor-grid-2">
            <label>
              RUT estudiante
              <input
                type="text"
                placeholder="12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
            </label>

            <label>
              Nombre completo
              <input
                type="text"
                placeholder="Nombre y apellidos"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>

            <label>
              Correo institucional
              <input
                type="email"
                placeholder="estudiante@inacapmail.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </label>

            <label>
              Teléfono de contacto
              <input
                type="text"
                placeholder="+56 9 0000 0000"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </label>
          </div>

          <button
            type="button"
            className="btn-asesor-secondary"
            onClick={buscarEstudianteDemo}
          >
            Buscar estudiante en base (demo)
          </button>

          {mensajeBusqueda && (
            <p
              className={
                tipoMensajeBusqueda === "ok"
                  ? "mensaje-busqueda-ok"
                  : "mensaje-busqueda-error"
              }
            >
              {mensajeBusqueda}
            </p>
          )}

          <p className="asesor-ayuda">
            En la versión real, al ingresar el <strong>RUT</strong>, el{" "}
            <strong>nombre</strong> o el <strong>correo institucional</strong>,
            el sistema consultará automáticamente la base de estudiantes de
            INACAP y completará estos campos, incluyendo la{" "}
            <strong>ciudad / comuna donde vive</strong>. Aquí se muestra una
            simulación con datos de prueba desde el frontend.
          </p>
        </fieldset>

        <fieldset className="asesor-fieldset">
          <legend>Motivo de la solicitud</legend>

          <label>
            Origen de la solicitud
            <select defaultValue="">
              <option value="" disabled>
                Seleccione una opción
              </option>
              <option value="estudiante">Estudiante</option>
              <option value="docente">Docente</option>
              <option value="familia">Familia / Apoderado</option>
              <option value="otros">Otro estamento</option>
            </select>
          </label>

          <label>
            Motivo principal
            <select defaultValue="">
              <option value="" disabled>
                Seleccione un motivo
              </option>
              <option value="dificultades-academicas">
                Dificultades académicas persistentes
              </option>
              <option value="salud-mental">
                Situación de salud mental diagnosticada
              </option>
              <option value="discapacidad-permanente">
                Discapacidad permanente
              </option>
              <option value="discapacidad-temporal">
                Condición temporal (accidente, cirugía, etc.)
              </option>
              <option value="socioeconomico">Situación socioeconómica</option>
              <option value="otro">Otro motivo</option>
            </select>
          </label>

          <label>
            Resumen del caso (selección)
            <select defaultValue="">
              <option value="" disabled>
                Seleccione un resumen
              </option>
              <option value="lectura">
                Dificultades en comprensión lectora y textos extensos
              </option>
              <option value="tiempo-evaluaciones">
                Requiere mayor tiempo para evaluaciones y trabajos
              </option>
              <option value="atencion">
                Dificultades de atención / concentración en clases
              </option>
              <option value="presentaciones">
                Alta ansiedad en presentaciones orales o exposiciones
              </option>
            </select>
          </label>

          <label>
            Detalle del caso
            <textarea
              rows={4}
              placeholder="Describa brevemente la situación del estudiante, antecedentes relevantes y acuerdos iniciales."
            />
          </label>
        </fieldset>

        <div className="asesor-form-buttons">
          <button type="button" className="btn-asesor-primary">
            Guardar registro (demo)
          </button>

          <Link to="/AsesorDashboard" className="btn-asesor-volver">
            Volver al panel
          </Link>
        </div>
      </form>
    </div>
  );
}
