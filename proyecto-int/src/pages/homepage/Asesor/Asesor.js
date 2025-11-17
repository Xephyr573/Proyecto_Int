import { Link } from "react-router-dom";
import "./Asesor.css";

export default function Asesor() {
  return (
    <div className="login-asesor-menu">
      <h2>Ingreso Asesores</h2>
      <p>Selecciona tu tipo de asesor para ingresar:</p>

      <div className="asesor-options">
        <Link to="/AsesorInclusionLogin" className="asesor-card">
          Encargada de inclusión
          <span>Registra el caso en el sistema</span>
        </Link>

        <Link to="/AsesorCoordinadoraLogin" className="asesor-card">
          Coordinadora técnica pedagógica
          <span>Define los ajustes razonables</span>
        </Link>

        <Link to="/AsesorDirectoraLogin" className="asesor-card">
          Directora de carrera
          <span>Valida y comenta los ajustes</span>
        </Link>
      </div>

      <Link to="/" className="btn-back-asesor">
        Volver
      </Link>
    </div>
  );
}
