// src/pages/homepage/Asesor/pages/RegistrarCaso.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegistrarCaso.css";
import { buscarEstudiante } from "../../../../services/searchStudent";

export default function RegistrarCaso() {
  const navigate = useNavigate();

  // estado de los datos del estudiante
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cede, setCede] = useState("");
  const [carrera, setCarrera] = useState("");
  const [mensajeBusqueda, setMensajeBusqueda] = useState(null); // { tipo: "ok" | "error", texto: "" }
  const [inputBusqueda, setInputBusqueda] = useState("");

  const buscarDesdeBase = async (e) => {
    e.preventDefault();
    const terminoBusqueda = rut || correo || nombre;

    if (!terminoBusqueda) {
      setMensajeBusqueda({
        tipo: "error",
        texto: "Ingrese RUT, correo o nombre para buscar.",
      });
      return;
    }

    setMensajeBusqueda({tipo: "info", texto: "Buscando estudiante..."});

    try {
      const datos = await buscarEstudiante(terminoBusqueda);

      setRut(datos.rut);
      setNombre(datos.usuario.nombre);
      setCorreo(datos.usuario.correo);
      setCede(datos.cede);
      setCarrera(datos.carrera);

      setMensajeBusqueda({
            tipo: "ok",
            texto: `Datos de ${datos.usuario.nombre} cargados con éxito.`,
        });

    } catch (error) {
        console.error("Error capturado:", error);
        let mensajeError = "Ocurrió un error inesperado.";

        if (typeof error === 'string') {
            // Si el servicio lanzó un texto (ej: throw "No encontrado")
          mensajeError = error; 
      } else if (error.message) {
          // Si es un objeto Error estándar (ej: error de red)
          mensajeError = error.message;
        } else if (error.response && error.response.data && error.response.data.error) {
            // Si es un error que viene de Axios/Django
            mensajeError = error.response.data.error;
        }

        // Captura el string de error del servicio (404, 400, o error de red)
        setMensajeBusqueda({
            tipo: "error",
            texto: mensajeError, 
        });
      }
  };

  return (
    <div className="asesor-form-page">
      <h2>Registrar caso</h2>
      {/* <p className="asesor-form-text">
        En esta pantalla la <strong>Encargada de Inclusión</strong> registra el
        caso en el sistema. Se levantan los datos del estudiante, el motivo de
        la solicitud y un resumen inicial que luego será utilizado por la
        Coordinadora y la Directora en las siguientes etapas del flujo
        semestral.
      </p> */}

      {/*  Flujo del caso SOLO para el asesor (ahora como navegación) */}
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

      {/* Cuadro de DATOS DE CASO */}

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
          </div>
        </fieldset>

        {/* Cuadro DATOS ESTUDIANTE */}

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
                placeholder="+569 1234 5678"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </label>

            <label>
              Carrera
              <input
                type="text"
                placeholder="Carrera del estudiante"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
              />
            </label>

            <label>
              Cede
              <input
                type="text"
                placeholder="Ej: Cede Temuco"
                value={cede}
                onChange={(e) => setCede(e.target.value)}
              />
            </label>
          </div>

          <button
            type="button"
            className="btn-asesor-secondary"
            onClick={buscarDesdeBase}
          >
            Buscar datos del estudiante
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

          {/* <p className="asesor-ayuda">
            En una implementación real, estos datos se cargarían
            automáticamente desde la base de estudiantes de INACAP y solo se
            seleccionaría el estudiante a inscribir en el programa de ajustes.
          </p> */}
        </fieldset>

        <fieldset className="asesor-fieldset">
          <legend>Motivo de la solicitud</legend>

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
            Guardar registro
          </button>

          <Link to="/Asesor" className="btn-asesor-volver">
            Volver al inicio Asesor
          </Link>
        </div>
      </form>
    </div>
  );
}

