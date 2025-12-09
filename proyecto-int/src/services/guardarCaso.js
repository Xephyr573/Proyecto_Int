import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const crearCaso = async (datosCaso) => {
  try {
    const response = await axios.post(`${API_URL}/casos/registrar/`, datosCaso, {
      headers: {
        'Content-Type': 'application/json',
        // Si usas tokens (JWT), aquí iría el header de Authorization
      }
    });
    return response.data; // Devuelve los datos del caso creado
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            throw error.response.data.error;
        }
        throw 'Error al conectar con el servidor';
    }
};

export const obtenerMotivos = async () => {
    try {
        const response = await axios.get(`${API_URL}/motivos/`); // Ajusta la URL si es diferente
        return response.data;
    } catch (error) {
        console.error("Error obteniendo motivos", error);
        return [];
    }
};