import React, { useState, useContext } from "react";
import { Modal, Button, Typography, Spin, Divider } from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import EliminarUsuarioAPI from "../../api/EliminarUsuarioAPI";

const { Text } = Typography;

const EliminarUsuario = ({ record, actualizarTabla}) => {
  const { setUsuarios, loadingModal, setLoadingModal } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
      await EliminarUsuarioAPI({
        id: record.id,
        setUsuarios,
        actualizarTabla,
        setIsModalVisible,
        setLoadingModal,
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        Eliminar
      </Button>
      <Modal
        title="Eliminar Usuario"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Eliminar"
        okButtonProps={{ danger: true }}
      >
        <Divider className="divider_sup" />
          <Spin spinning={loadingModal}>
            <Text>
              ¿Está seguro que quiere eliminar el usuario <Text style={{ color: "red" }}>@{record.name}{record.lastname}</Text>?
            </Text>
          </Spin>
        <Divider className="divider_inf_eliminar" />
      </Modal>
    </>
  );
};

export default EliminarUsuario;