import React, { useState } from 'react';
import axios from 'axios';

// Define la URL base de tu API de Django
const API_URL = 'http://localhost:8000/api';

export const loginUsuario = async (correo, contrasena) => {
    
    try {
        // Llama a la API de Django
        const response = await axios.post(`${API_URL}/login/`, {
            correo: correo,
            contrasena: contrasena
        });

        // Si el login es exitoso, Django devuelve los datos del usuario (incluyendo el rol)
        const userData = response.data;

        // Opcional: Guarda los datos del usuario en localStorage para mantener la sesión
        localStorage.setItem('usuario', JSON.stringify(userData));

        // Devuelve los datos del usuario para que el componente reaccione
        return userData;

    } catch (error) {

        if (error.response && error.response.data && error.response.data.error) {
            // Si el backend devuelve un mensaje de error específico, lo usamos
            throw error.response.data.error;
        }

        if (error.request) {
            throw 'No se pudo conectar con el servidor. Por favor, intenta más tarde.';
        }

        // Si Django devuelve un error (401, 400, 500), lo capturamos
        // console.error("Error en el servicio de login:", error.response);
        
        throw 'Error al conectar con el servidor';
    }
};

export const logoutUsuario = () => {
    // Limpia los datos del usuario de localStorage para cerrar sesión
    localStorage.removeItem('usuario');
};