
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DirectoraLogin.css";
import { loginUsuario } from "../../../services/authServices";  //Importa el servicio de login desde authServices.js

export default function AsesorDirectoraLogin() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setErrores] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrores(null); // Limpia errores previos

    if (!correo.trim() || !contrasena.trim()) { //Se hace una sola comprobación
      setErrores("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Llama a la API usando el servicio de login definido en authServices.js
      const userData = await loginUsuario(correo, contrasena);

      // Verificamos si el rol es el correcto
      if (userData.rol === 'Director') {
        // Éxito: El rol es correcto, redirige al dashboard
        navigate("/director/validarajustes"); 
      } else {
        // Error: Es un usuario válido, pero no es el rol esperado
        setErrores('Acceso denegado: Sus credenciales no pertenecen a un Director.'); 
        navigate("/Directora"); // Redirige de vuelta a la página de login del asesor
      }
      } catch (errorMessage) {
      setErrores(errorMessage);
    }
  };

  return (
    <div className="login-asesor">
      <h2>Directora de Carrera</h2>

      <form onSubmit={handleLogin}>
        <div className="field-asesor">
          <label>Correo</label>
          <div className="input-wrapper-asesor">
            <input
              type="text"
              placeholder="usuario@inacap.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="field-asesor">
          <label>Contraseña</label>
          <div className="input-wrapper-asesor">
            <input
              type="password"
              placeholder="********"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
        </div>

        {error && (
            <div style={{ 
                color: '#c62828', 
                backgroundColor: '#ffebee', 
                padding: '8px', 
                borderRadius: '4px',
                marginBottom: '15px'
            }}>
                {/* Muestra el texto guardado en el estado 'error' */}
                {error}
            </div>
        )}

        <button
        type="button" className="btn-login-asesor" onClick={handleLogin} >
            Ingresar
        </button>


        <button
          type="button"
          className="forgot-asesor"
          onClick={() => alert("Recuperación de contraseña (demo).")}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </form>

      <Link to="/" className="btn-back-asesor">
        Volver
      </Link>
    </div>
  );
}
