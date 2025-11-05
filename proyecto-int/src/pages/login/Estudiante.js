import { Link, useNavigate } from "react-router-dom";
import "./Estudiante.css";

export default function Estudiante() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías validar luego (rut, etc.)
    navigate("/EstudianteDashboard");   // ✅ Redirige al dashboard del estudiante
  };

  return (
    <div className="login-est">
      <h2>Ingreso Estudiante</h2>

      <form onSubmit={handleSubmit}>
        <label>RUT</label>
        <input type="text" placeholder="12.345.678-9" />

        <label>Contraseña</label>
        <input type="password" placeholder="********" />

        <button type="submit" className="btn-login-est">Ingresar</button>

        <a href="#" className="forgot-est">¿Olvidaste tu contraseña?</a>
      </form>

      <Link to="/" className="btn-back-est">Volver</Link>
    </div>
  );
}
