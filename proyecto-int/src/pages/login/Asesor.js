import { Link } from "react-router-dom";
import "./Asesor.css";

export default function Asesor() {
  return (
    <div className="login-doc">
      <h2>Ingreso Docente</h2>

      <form>
        <label>Usuario</label>
        <input type="text" placeholder="Usuario" />

        <label>Contraseña</label>
        <input type="password" placeholder="********" />

        <button type="submit" className="btn-login-doc">Ingresar</button>

        <a href="#" className="forgot-doc">¿Olvidaste tu contraseña?</a>
      </form>

      <Link to="/" className="btn-back-doc">Volver</Link>
    </div>
  );
}
