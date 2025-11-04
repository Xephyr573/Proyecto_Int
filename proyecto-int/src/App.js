import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
