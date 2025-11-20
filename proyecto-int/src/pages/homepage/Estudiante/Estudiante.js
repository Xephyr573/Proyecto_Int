import { Link, useNavigate } from "react-router-dom";
import "./Estudiante.css";
import { useState } from "react";
import { loginUsuario } from "../../../services/authService";

export default function Estudiante() {

  const navigate = useNavigate();
  const [correo, setCorreo] = useState(""); // Estado para el correo
  const [contrasena, setContrasena] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(null); // Estado para mensajes de error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    try { 
      const userData = await loginUsuario(correo, contrasena); // Llama a la API usando el servicio
      
      if (userData.rol === 'Estudiante') {
        navigate("/EstudianteDashboard");   // ✅ Redirige al dashboard del estudiante
      } else {
        setError("Acceso denegado: No eres un estudiante.");
      }
  
    } catch (errorMessage) {
      setError(errorMessage); // Muestra el mensaje de error recibido del servicio
      }
};

  return (
    <div className="login-est">
      <h2>Ingreso Estudiante</h2>

      <form onSubmit={handleSubmit}>
        <label>Correo</label>
        <input type="text" 
        placeholder="Correo" 
        value={correo} 
        onChange={(e) => setCorreo(e.target.value)}/>

        <label>Contraseña</label>
        <input 
        type="password" 
        placeholder="********"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)} />

        {error && <p className="error-message-est">{error}</p>} {/* Mostrar mensaje de error si existe */}

        <button type="submit" className="btn-login-est">Ingresar</button>

        <a href="#" className="forgot-est">¿Olvidaste tu contraseña?</a>
      </form>

      <Link to="/" className="btn-back-est">Volver</Link>
    </div>
  );
}
