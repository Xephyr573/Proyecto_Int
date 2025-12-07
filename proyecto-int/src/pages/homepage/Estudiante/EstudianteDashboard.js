// src/pages/homepage/Estudiante/EstudianteDashboard.js
import "./EstudianteDashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"; //Importaremos Hooks, son funciones que permiten “enganchar” el estado de React y el ciclo de vida.
import { BLOQUES_CALENDARIO } from "../../../datosGlobales"; //intente ajustar la ruta donde cree el archivo pero me da errores, al igual que con el Asesor.

export default function EstudianteDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => navigate("/Estudiante");

  // Por ahora estático; después puedes traerlo de la API/localStorage
  const nombreEstudiante = "Nombre Nombre Apellido Apellido";
  const correoEstudiante = "estudiante@inacapmail.cl";

  //Aqui se vera el estado para saber los bloques ocupados, estos se leen desde la memoria
  const [bloquesOcupados, setBloquesOcupados] = useState([]);

  //Al cargar la pagina, podremos leer lo que decidio el Asesor
  useEffect(() => {
    const guardados = localStorage.getItem("bloques_ocupados");
    if (guardados) {
      setBloquesOcupados(JSON.parse(guardados));
    }
  }, []);

  //Esta es la funcion para que el estudiante reserve
  const handleReservar = (idBloque) => {
    const confirmar = window.confirm("¿Desea reservar esta hora?");
    if (confirmar) {
      //Se agrega el bloqueo
      const nuevosOcupados = [...bloquesOcupados, idBloque];
      setBloquesOcupados(nuevosOcupados);

      //Guardaremos para que el Asesor tambien vea que se ocupó
      localStorage.setItem("bloques_ocupados", JSON.stringify(nuevosOcupados));
      alert("¡Hora Reservada con exito!");
    }
  };


  return (
    <div className="est-layout">
      {/* ===== SIDEBAR IZQUIERDA ===== */}
      <aside className="est-sidebar">
        <div className="est-sidebar-top">
          <img
            src="https://digital.inacap.cl/recursos/inacap-liferay/img/logo-footer.png"
            alt="Inacap"
            className="est-sidebar-logo"
          />
        </div>

        <div className="est-sidebar-card">
          <span className="est-sidebar-label">Bienvenido/a</span>
          <p className="est-sidebar-name">{nombreEstudiante}</p>
          <p className="est-sidebar-email">{correoEstudiante}</p>
        </div>

        <nav className="est-sidebar-menu">
          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/necesidades")}
          >
            <span className="est-sidebar-bullet" />
            <span>Necesidades Especiales</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/asistencia")}
          >
            <span className="est-sidebar-bullet" />
            <span>Asistencia</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/solicitudes")}
          >
            <span className="est-sidebar-bullet" />
            <span>Historial de Solicitudes</span>
          </button>

          <button
            className="est-sidebar-item"
            onClick={() => navigate("/estudiante/reporte")}
          >
            <span className="est-sidebar-bullet" />
            <span>Reporte General</span>
          </button>
        </nav>
      </aside>

      {/* ===== CONTENIDO DERECHO ===== */}
      <main className="est-main">
        <header className="est-main-header">
          <h1>Portal Estudiante</h1>
          <button className="est-btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </header>

        <section className="est-main-grid">
          <div
            className="est-card"
            onClick={() => navigate("/estudiante/necesidades")}
          >
            <h3>Necesidades Especiales</h3>
            <p>Registra o modifica tus necesidades específicas.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/asistencia")}
          >
            <h3>Asistencia</h3>
            <p>Consulta tu asistencia a clases o entrevistas.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/solicitudes")}
          >
            <h3>Historial de Solicitudes</h3>
            <p>Revisa solicitudes anteriores y su estado.</p>
          </div>

          <div
            className="est-card"
            onClick={() => navigate("/estudiante/reporte")}
          >
            <h3>Reporte General</h3>
            <p>Visualiza tu progreso y estadísticas.</p>
          </div>
        </section>
        <section className="est-calendar-section">
          <h2>Agendar Entrevista con Asesor</h2>
          <p>Selecciona un bloque disponible para solicitar una entrevista</p>

          <div className="est-calendar-grid">
            {BLOQUES_CALENDARIO.map((bloque) => {
              const estaOcupado = bloquesOcupados.includes(bloque.id);
              return (
                <button
                key={bloque.id}
                disabled={estaOcupado}
                className={'est-calendar-block ${estaOcupado ? "ocupado" : "disponible"}'}
                onClick={() => handleReservar(bloque.id)}
              >
                <span className="est-cal-day">{bloque.dia}</span>
                <span className="est-cal-hour">{bloque.hora}</span>
                <span className="est-cal-status">
                  {estaOcupado ? "No Disponible" : "Reservar"}
                </span>
              </button>
              );
            })}
          </div>
        </section>
        <footer className="est-footer">© 2025 · INACAP</footer>
      </main>
    </div>
  );
}
