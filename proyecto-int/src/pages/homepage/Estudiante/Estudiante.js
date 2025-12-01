import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Estudiante.css";
import { loginUsuario } from "../../../services/authServices";  //Importa el servicio de login desde authServices.js

export default function Estudiante() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setErrores] = useState();

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
      if (userData.rol === 'Estudiante') {
        // Éxito: El rol es correcto, redirige al dashboard
        navigate("/EstudianteDashboard");
      } else {
        // Error: Es un usuario válido, pero no es el rol esperado
        setErrores('Acceso denegado: Sus credenciales no pertenecen a un estudiante.'); 
        navigate("/Estudiante"); // Redirige de vuelta a la página de login del asesor
      }
      } catch (errorMessage) {
      // 6. Si el servicio lanzó un error (ej. "Credenciales inválidas")
      // 'errorMessage' ya es el string de error que lanzamos desde authService
      setErrores(errorMessage);
    }
  };

  return (
    <div className="login-est">
      <h2>Ingreso Estudiante</h2>

      <form onSubmit={handleLogin}>
        <div className="field-est">
          <label>Correo</label>
          <div className="input-wrapper-est">
            <input
              type="text"
              placeholder="usuario@inacapmail.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        <div className="field-est">
          <label>Contraseña</label>
          <div className="input-wrapper-est">
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
