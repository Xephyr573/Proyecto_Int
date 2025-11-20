import { useState } from "react";
import { Link } from "react-router-dom";
import "./Docente.css";

export default function Docente() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({ usuario: "", password: "" });

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

    window.location.href = "./DocenteDashboard";
  };

  return (
    <div className="login-doc">
      <h2>Ingreso Docente</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="field-doc">
          <label>Usuario</label>
          <div className="input-wrapper-doc">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            {errores.usuario && (
              <div className="tooltip-error-doc">{errores.usuario}</div>
            )}
          </div>
        </div>

        <div className="field-doc">
          <label>Contraseña</label>
          <div className="input-wrapper-doc">
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && (
              <div className="tooltip-error-doc">{errores.password}</div>
            )}
          </div>
        </div>

        <button
          type="button"
          className="btn-login-doc"
          onClick={handleLogin}
        >
          Ingresar
        </button>

        <a href="#" className="forgot-doc">
          ¿Olvidaste tu contraseña?
        </a>
      </form>

      <Link to="/" className="btn-back-doc">
        Volver
      </Link>
    </div>
  );
}
