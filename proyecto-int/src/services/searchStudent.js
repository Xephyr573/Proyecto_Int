import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';

export const buscarEstudiante = async (termino) => {
    // Protección simple
    const terminoSeguro = String(termino || "").trim();
    if (!terminoSeguro) throw "Ingrese un dato para buscar.";

    try {
        const response = await axios.get(`${API_BASE_URL}/estudiantes/buscar/?q=${terminoSeguro}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw "Estudiante no encontrado.";
        }
        throw "Error al conectar con el servidor.";
    }
};