import axios from "axios";
import { message } from "antd";

const ActualizarUsuarioAPI = async ({
  id,
  values,
  usuarios,
  setUsuarios,
  actualizarTabla,
  form,
  setIsModalVisible,
  setLoadingModal,
}) => {
  setLoadingModal(true);
  try {
    const { data } = await axios.put(`http://localhost:4000/users/${id}`, values);

    const updatedUsuarios = usuarios.map((user) =>
      user.id === id ? { ...user, ...data } : user
    );

    setUsuarios(updatedUsuarios);
    actualizarTabla();
    form.resetFields();

    setTimeout(() => {
      message.success("Usuario actualizado exitosamente.");
      setIsModalVisible(false);
      setLoadingModal(false);
    }, 2000);
  } catch (error) {
    message.error("Error al actualizar el usuario.");
    setLoadingModal(false);
  }
};

export default ActualizarUsuarioAPI;
