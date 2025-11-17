import { useNavigate } from "react-router-dom";
import "./AsesorDashboard.css";

export default function AsesorDashboard() {
  const navigate = useNavigate();

  // Intentamos leer el rol guardado (por ejemplo, desde el login de asesor)
  const rolGuardado = window.localStorage.getItem("rolAsesor");

  // Si no hay nada guardado, dejamos un rol por defecto solo para la demo
  const rolActual = rolGuardado || "ENCARGADA_INCLUSION";

  const nombresRol = {
    ENCARGADA_INCLUSION: "Encargada de inclusión",
    COORDINADORA_PEDAGOGICA: "Coordinadora técnica pedagógica",
    DIRECTORA_CARRERA: "Directora de carrera",
  };

  // Permisos que tiene cada rol dentro del panel
  const permisosPorRol = {
    ENCARGADA_INCLUSION: ["registrarCaso"],
    COORDINADORA_PEDAGOGICA: ["definirAjustes"],
    DIRECTORA_CARRERA: ["validarAjustes"],
  };

  const permisos = permisosPorRol[rolActual] || [];
  const puede = (permiso) => permisos.includes(permiso);

  const usandoRolPorDefecto = !rolGuardado;

  return (
    <div className="asesor-dashboard">
      <h2>Panel Asesor</h2>

      <p className="asesor-descripcion">
        Esta pantalla muestra cómo, según el rol del asesor, algunas opciones del
        panel quedan habilitadas y otras bloqueadas. Para esta versión de
        demostración, el rol se guarda al momento de iniciar sesión y se lee
        desde el navegador.
      </p>

      <div className="asesor-rol-actual">
        Rol actual detectado:{" "}
        <strong>{nombresRol[rolActual] ?? rolActual}</strong>
      </div>

      {usandoRolPorDefecto && (
        <p className="asesor-aviso">
          (No se encontró un rol guardado, se está usando{" "}
          <strong>Encargada de inclusión</strong> como ejemplo.)
        </p>
      )}

      <div className="menu-asesor">
        {/* Registrar caso: Encargada de inclusión */}
        <button
          className={
            "btn-menu-asesor" +
            (!puede("registrarCaso") ? " btn-menu-asesor-disabled" : "")
          }
          disabled={!puede("registrarCaso")}
          onClick={() =>
            puede("registrarCaso") && navigate("/Asesor/registrar-caso")
          }
        >
          Registrar caso
          {!puede("registrarCaso") && (
            <span className="msg-bloqueado">
              No disponible para este rol
            </span>
          )}
        </button>

        {/* Definir ajustes: Coordinadora técnica pedagógica */}
        <button
          className={
            "btn-menu-asesor" +
            (!puede("definirAjustes") ? " btn-menu-asesor-disabled" : "")
          }
          disabled={!puede("definirAjustes")}
          onClick={() =>
            puede("definirAjustes") && navigate("/Asesor/definir-ajustes")
          }
        >
          Definir ajustes
          {!puede("definirAjustes") && (
            <span className="msg-bloqueado">
              No disponible para este rol
            </span>
          )}
        </button>

        {/* Validar ajustes: Directora de carrera */}
        <button
          className={
            "btn-menu-asesor" +
            (!puede("validarAjustes") ? " btn-menu-asesor-disabled" : "")
          }
          disabled={!puede("validarAjustes")}
          onClick={() =>
            puede("validarAjustes") && navigate("/Asesor/validar-ajustes")
          }
        >
          Validar ajustes
          {!puede("validarAjustes") && (
            <span className="msg-bloqueado">
              No disponible para este rol
            </span>
          )}
        </button>
      </div>

      {/* Botón para volver al login/menu de asesor */}
      <div className="asesor-dashboard-footer">
        <button
          type="button"
          className="btn-asesor-volver-login"
          onClick={() => navigate("/Asesor")}
        >
          Volver al login de asesor
        </button>
      </div>
    </div>
  );
}
