import "./Estudiante.css";
import { useNavigate } from "react-router-dom";

export default function Ingresar() {
  const navigate = useNavigate();

  const volverAtras = () => {
    navigate(-1); // Navega a la página anterior
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Ingresar</h2>

        <form>
          <div className="form-group">
            <label>RUT o Correo</label>
            <input type="text" placeholder="Ingresa tu RUT o correo" />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu contraseña" />
          </div>

          <button className="btn-login" type="submit">
            Entrar
          </button>
        </form>

        <a href="https://digital.inacap.cl/tipo-de-usuario/index.html" className="btn-forgot">¿Olvidaste tu contraseña?</a>

        {/* Botón para volver atrás */}
        <button className="btn-back" onClick={volverAtras}>
          Volver atrás
        </button>
      </div>
    </div>
  );
}