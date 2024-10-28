
import axios from "axios";
import { message } from "antd";

const EliminarUsuarioAPI = async ({
  id,
  setUsuarios,
  actualizarTabla,
  setIsModalVisible,
  setLoadingModal,
}) => {
  setLoadingModal(true);

  try {
    await axios.delete(`http://localhost:4000/users/${id}`);

    // Actualizamos la lista de usuarios eliminando al usuario correspondiente
    setUsuarios((prev) => prev.filter((user) => user.id !== id));
    actualizarTabla();

    message.success("Usuario eliminado exitosamente.");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    message.error("Error al eliminar el usuario. Por favor, inténtelo de nuevo.");
  } finally {
    setTimeout(() => {
      setIsModalVisible(false);
      setLoadingModal(false);
    }, 2000);
  }
};

export default EliminarUsuarioAPI;
