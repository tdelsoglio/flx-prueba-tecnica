import axios from "axios";

const API_URL = "http://localhost:4000/users"; // URL de la API

export const UsuariosAPI = async ({ estado, page = 1, limit = 9, setUsuarios, setFilteredUsuarios, setLoading }) => {
  try {
    setLoading(true);
    const offset = (page - 1) * limit; // Calcular el offset
    const estadoQuery = estado ? `&status=${estado}` : ""; // Filtrar por estado si está definido

    const { data } = await axios.get(
      `${API_URL}?limit=${limit}&offset=${offset}${estadoQuery}`
    );

    setUsuarios(data);
    setFilteredUsuarios(data);
  } catch (error) {
    console.error("Error al cargar los usuarios.", error);
  } finally {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }
};
