import { Link } from "react-router-dom";
import "./Director.css";

export default function Director() {
  return (
    <div className="login-dir">
      <h2>Ingreso Director</h2>

      <form>
        <label>RUT</label>
        <input type="text" placeholder="12.345.678-9" />

        <label>Contraseña</label>
        <input type="password" placeholder="********" />

        <button type="submit" className="btn-login-dir">Ingresar</button>

        <a href="#" className="forgot-dir">¿Olvidaste tu contraseña?</a>
      </form>

      <Link to="/" className="btn-back-dir">Volver</Link>
    </div>
  );
}
