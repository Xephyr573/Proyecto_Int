import { Link } from "react-router-dom";
import "../AsesorDashboard.css";

export default function RegistrarCaso() {
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
              <input type="text" value="2/2025" readOnly className="input-readonly" />
            </label>

            <label>
              Sede / Campus
              <input type="text" placeholder="Ej: Temuco" />
            </label>

            <label>
              Carrera / Programa
              <input type="text" placeholder="Analista Programador" />
            </label>
          </div>
        </fieldset>

        <fieldset className="asesor-fieldset">
          <legend>Datos del estudiante</legend>

          <div className="asesor-grid-2">
            <label>
              RUT estudiante
              <input type="text" placeholder="12.345.678-9" />
            </label>

            <label>
              Nombre completo
              <input type="text" placeholder="Nombre y apellidos" />
            </label>

            <label>
              Correo institucional
              <input type="email" placeholder="estudiante@inacapmail.cl" />
            </label>

            <label>
              Teléfono de contacto
              <input type="text" placeholder="+56 9 1234 5678" />
            </label>
          </div>

          <p className="asesor-ayuda">
            En una implementación real, estos datos podrían cargarse
            automáticamente desde la base de estudiantes de INACAP y sólo
            seleccionarse el estudiante a inscribir en el programa de ajustes.
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

          {/* Resumen del caso como lista (lo que te pidieron) */}
          <label>
            Resumen del caso (selección)
            <select defaultValue="">
              <option value="" disabled>
                Seleccione un resumen
              </option>
              <option value="lectura">
                Dificultades en comprensión lectora y textos extensos
              </option>
              <option value="atencion">
                Dificultades de atención / concentración en clases
              </option>
              <option value="tiempo-evaluaciones">
                Requiere mayor tiempo para evaluaciones y trabajos
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



