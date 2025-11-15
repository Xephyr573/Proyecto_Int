import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Estudiante.css";

export default function Estudiante() {
  const navigate = useNavigate();

  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({ rut: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = { rut: "", password: "" };
    let hayError = false;

    if (!rut.trim()) {
      nuevosErrores.rut = "Campo obligatorio";
      hayError = true;
    }

    if (!password.trim()) {
      nuevosErrores.password = "Campo obligatorio";
      hayError = true;
    }

    setErrores(nuevosErrores);

    if (hayError) return;

    navigate("/EstudianteDashboard");
  };

  return (
    <div className="login-est">
      <h2>Ingreso Estudiante</h2>

      <form onSubmit={handleSubmit}>
        <div className="field-est">
          <label>RUT</label>
          <div className="input-wrapper-est">
            <input
              type="text"
              placeholder="12.345.678-9"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
            {errores.rut && (
              <div className="tooltip-error-est">{errores.rut}</div>
            )}
          </div>
        </div>

        <div className="field-est">
          <label>Contraseña</label>
          <div className="input-wrapper-est">
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && (
              <div className="tooltip-error-est">{errores.password}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn-login-est">
          Ingresar
        </button>

        <a href="#" className="forgot-est">
          ¿Olvidaste tu contraseña?
        </a>
      </form>

      <Link to="/" className="btn-back-est">
        Volver
      </Link>
    </div>
  );
}
