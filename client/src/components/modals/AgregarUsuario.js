import React, { useState, useContext } from "react";
import { Modal, Button, Form, Input, Divider, Select, Spin} from "antd";
import { GlobalContext } from "../../context/GlobalContext";
import { AgregarUsuarioAPI } from "../../api/AgregarUsuarioAPI";

const { Option } = Select;

const AgregarUsuario = ({actualizarTabla}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { setUsuarios, loadingModal, setLoadingModal } = useContext(GlobalContext);
  const [form] = Form.useForm();

  const handleOk = async (values) => {   
      await AgregarUsuarioAPI(
        values,
        setUsuarios,
        actualizarTabla,
        setLoadingModal,
        setIsModalVisible,
        form.resetFields
      );
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Agregar Usuario
      </Button>
      <Modal
        title="Agregar Usuario"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Divider className="divider_sup" />
        <Spin spinning={loadingModal}>
          <Form
            layout="vertical"
            onFinish={handleOk}
            requiredMark={false}
            form={form}
          >
            <div className="div_conteiner_c">
                <div className="div_conteiner_r">
                  <Form.Item
                    name="username"
                    label="Usuario"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese el usuario",
                      },
                    ]}
                  >
                    <Input placeholder="JohnDoe" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese un correo válido",
                      },
                      {
                        type: "email",
                        message: "Ingrese un correo electrónico válido",
                      },
                    ]}
                  >
                    <Input placeholder="john.doe@example.com" />
                  </Form.Item>
                </div>

                <div className="div_conteiner_r">
                  <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese el nombre",
                      },
                    ]}
                  >
                    <Input placeholder="John" />
                  </Form.Item>

                  <Form.Item
                    name="lastname"
                    label="Apellido"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese el apellido",
                      },
                    ]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>

                <div className="div_conteiner_r">
                  <Form.Item
                    name="status"
                    label="Estado"
                    rules={[
                      {
                        required: true,
                        message: "Por favor seleccione un estado",
                      },
                    ]}
                  >
                    <Select placeholder="Seleccione un estado" style={{width:250}}>
                      <Option value="active">Activo</Option>
                      <Option value="inactive">Inactivo</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="age"
                    label="Edad"
                    rules={[
                      { required: true, message: "Por favor ingrese la edad" },
                      {
                        validator: (_, value) => {
                          const numberValue = Number(value);
                          if (
                            !value ||
                            isNaN(numberValue) ||
                            numberValue < 18 ||
                            numberValue > 90
                          ) {
                            return Promise.reject(
                              "Edad no válida. Debe ser entre 18 y 90."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input type="number" placeholder="43" />
                  </Form.Item>
                </div>
            </div>
            <Divider className="divider_inf" />
            <div className="btn_form">
              <Button
                type="primary"
                htmlType="submit"
                loadingModal={loadingModal}
                className="btn"
              >
                Agregar Usuario
              </Button>
            </div>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

export default AgregarUsuario;
