import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Asesor.css";

export default function AsesorPedagogicoLogin() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({ usuario: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = () => {
    const nuevosErrores = { usuario: "", password: "" };
    let hayError = false;

    if (!usuario.trim()) {
      nuevosErrores.usuario = "Campo obligatorio";
      hayError = true;
    }

    if (!password.trim()) {
      nuevosErrores.password = "Campo obligatorio";
      hayError = true;
    }

    setErrores(nuevosErrores);
    if (hayError) return;

    // Guardar rol de Coordinadora técnica pedagógica
    window.localStorage.setItem("rolAsesor", "COORDINADORA_PEDAGOGICA");

    // Ir al dashboard del asesor
    navigate("/AsesorDashboard");
  };

  return (
    <div className="login-asesor">
      <h2>Coord. Técnica Pedagógica</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field-asesor">
          <label>Usuario</label>
          <div className="input-wrapper-asesor">
            <input
              type="text"
              placeholder="usuario@inacap.cl"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {errores.usuario && (
              <div className="tooltip-error-asesor">{errores.usuario}</div>
            )}
          </div>
        </div>

        <div className="field-asesor">
          <label>Contraseña</label>
          <div className="input-wrapper-asesor">
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && (
              <div className="tooltip-error-asesor">{errores.password}</div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="btn-login-asesor"
          onClick={handleLogin}
        >
          Ingresar
        </button>

        <a href="#" className="forgot-asesor">
          ¿Olvidaste tu contraseña?
        </a>
      </form>

      <Link to="/Asesor" className="btn-back-asesor">
        Volver
      </Link>
    </div>
  );
}
