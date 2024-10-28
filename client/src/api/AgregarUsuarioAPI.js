import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";


export const AgregarUsuarioAPI = async (
  values,
  setUsuarios,
  actualizarTabla,
  setLoadingModal,
  setIsModalVisible,
  resetForm
) => {
  setLoadingModal(true);

  const newUser = { id: uuidv4(), ...values };

  try {
    const { data } = await axios.post("http://localhost:4000/users", newUser);
    setUsuarios((prev) => [...prev, data]);
    actualizarTabla();
    resetForm();

    setTimeout(() => {
      message.success("Usuario agregado exitosamente.");
      setIsModalVisible(false);
      setLoadingModal(false);
    }, 2000);

  } catch (error) {
    message.error("Error al agregar el usuario.");
    setLoadingModal(false);
  }
};
