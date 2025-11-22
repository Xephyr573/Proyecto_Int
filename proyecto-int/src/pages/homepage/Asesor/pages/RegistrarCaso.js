// src/pages/homepage/Asesor/pages/RegistrarCaso.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrarCaso.css";

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

// “Base” de estudiantes de ejemplo (solo para demo del botón Buscar)
const BASE_FAKE_ESTUDIANTES = [
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
  const navigate = useNavigate();

  // estado de los datos del estudiante
  const [rut, setRut] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudadResidencia, setCiudadResidencia] = useState("");

  const [mensajeBusqueda, setMensajeBusqueda] = useState(null); // { tipo: "ok" | "error", texto: "" }

  const [carrera, setCarrera] = useState("");

  const buscarDesdeBase = () => {
    const encontrado = BASE_FAKE_ESTUDIANTES.find(
      (e) =>
        e.rut === rut ||
        e.nombreCompleto.toLowerCase() === nombreCompleto.toLowerCase() ||
        e.correo.toLowerCase() === correo.toLowerCase()
    );

    if (encontrado) {
      setRut(encontrado.rut);
      setNombreCompleto(encontrado.nombreCompleto);
      setCorreo(encontrado.correo);
      setTelefono(encontrado.telefono);
      setCiudadResidencia(encontrado.ciudad);
      setMensajeBusqueda({
        tipo: "ok",
        texto:
          "Datos cargados automáticamente desde la base de estudiantes (demo).",
      });
    } else {
      setMensajeBusqueda({
        tipo: "error",
        texto:
          "No se encontraron coincidencias en la base de estudiantes (demo).",
      });
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

      {/* 🔹 Flujo del caso SOLO para el asesor (ahora como navegación) */}
      <div className="flujo-etapas">
        <button
          type="button"
          className="etapa active"
          onClick={() => navigate("/asesor/registrar-caso")}
        >
          1. Entrevista / Registro de caso
        </button>
        <button
          type="button"
          className="etapa"
          onClick={() => navigate("/asesor/definir-ajustes")}
        >
          2. Definición de ajustes
        </button>
        <button
          type="button"
          className="etapa"
          onClick={() => navigate("/asesor/seguimiento")}
        >
          3. Validación / Seguimiento
        </button>
        <button
          type="button"
          className="etapa"
          onClick={() => navigate("/asesor/evaluacion-final")}
        >
          4. Evaluación final
        </button>
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

            <label>
              Ciudad / Lugar de residencia
              <input
                type="text"
                placeholder="Ej: Temuco"
                value={ciudadResidencia}
                onChange={(e) => setCiudadResidencia(e.target.value)}
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
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
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
            onClick={buscarDesdeBase}
          >
            Buscar datos en base de estudiantes (demo)
          </button>

          {mensajeBusqueda && (
            <p
              className={
                mensajeBusqueda.tipo === "ok"
                  ? "mensaje-busqueda-ok"
                  : "mensaje-busqueda-error"
              }
            >
              {mensajeBusqueda.texto}
            </p>
          )}

          <p className="asesor-ayuda">
            En una implementación real, estos datos se cargarían
            automáticamente desde la base de estudiantes de INACAP y solo se
            seleccionaría el estudiante a inscribir en el programa de ajustes.
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

          <Link to="/Asesor" className="btn-asesor-volver">
            Volver al inicio Asesor
          </Link>
        </div>
      </form>
    </div>
  );
}
