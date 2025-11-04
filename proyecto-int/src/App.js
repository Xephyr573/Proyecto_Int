import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Ingresar from "./pages/Ingresar";

function App() {
  const [message, setMessage] = useState("Cargando...");

  useEffect(() => {
    //Se hara la peticion a la API de Django
    axios.get('http://127.0.0.1:8000/api/hello')
    .then(response => {
      //response.data contiene el JSON que enviamos desde el Django
      setMessage(response.data.message + " " + response.data.user);
    })
    .catch(error => {
      console.error("Hubo un error al cargar los datos:",error);
      setMessage("Error al conectar con la API");
    });
  }, []); //El arrary vacio [] significa que esto se ejecutara 1 vez al montar el componente
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ingresar" element={<Ingresar />} />
        <Route path="/Estudiante" element={<Estudiante />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;