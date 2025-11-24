// src/pages/homepage/Asesor/Login/AsesorPedagogicoLogin.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Asesor.css";
import { loginUsuario } from "../../../../services/authServices";  //Importa el servicio de login desde authServices.js

export default function AsesorPedagogicoLogin() {

  // Estados para los campos del formulario y errores
  const [correo, setCorreo] = useState(""); //Usamos correo para ingresar al dashboard
  const [contrasena, setcontrasena] = useState("");
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
      if (userData.rol === 'Asesor') {
        // Éxito: El rol es correcto, redirige al dashboard
        navigate("/asesor/definir-ajustes"); 
      } else {
        // Error: Es un usuario válido, pero no es el rol esperado
        setErrores('Acceso denegado: Sus credenciales no pertenecen a un Asesor.'); 
        navigate("/asesor"); // Redirige de vuelta a la página de login del asesor
      }
      } catch (errorMessage) {
      // 6. Si el servicio lanzó un error (ej. "Credenciales inválidas")
      // 'errorMessage' ya es el string de error que lanzamos desde authService
      setErrores(errorMessage);
    }
  };

  return (
    <div className="login-asesor">
      <h2>Coord. Técnica Pedagógica</h2>

      <form onSubmit={handleLogin}>

        <div className="field-asesor">
          <label>Correo</label>
          <div className="input-wrapper-asesor">
            <input
              type="email"
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
              type="passsword"
              placeholder="********"
              value={contrasena}
              onChange={(e) => setcontrasena(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          className="btn-login-asesor"
          onClick={handleLogin}
        >
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

      <Link to="/Asesor" className="btn-back-asesor">
        Volver
      </Link>
    </div>
  );
}
