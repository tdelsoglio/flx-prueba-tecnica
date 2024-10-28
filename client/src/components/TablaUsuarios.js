/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { Table, Input, Select, Space, Button, Tag, Spin } from "antd";
import { GlobalContext } from "../context/GlobalContext";
import AgregarUsuario from "./modals/AgregarUsuario";
import EditarUsuario from "./modals/EditarUsuario";
import EliminarUsuario from "./modals/EliminarUsuario";
import { UsuariosAPI } from "../api/UsuariosAPI";

const { Option } = Select;
const { Search } = Input;

const TablaUsuarios = () => {
  const {
    usuarios,
    setUsuarios,
    filteredUsuarios,
    setFilteredUsuarios,
    loading,
    setLoading,
  } = useContext(GlobalContext);

  const [estado, setEstado] = useState(""); // Estado actual del filtro
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [pageSize, setPageSize] = useState(9); // Tamaño de página
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Hook para recargar usuarios al cambiar filtros o paginación
  useEffect(() => {
    // Obtener usuarios desde la API
    UsuariosAPI({
      estado,
      page: currentPage,
      limit: pageSize,
      setUsuarios,
      setFilteredUsuarios,
      setLoading,
    });    
  }, [currentPage, pageSize, estado]); // Actualiza los usuarios cuando cambie el filtro o la página

  // Filtrar por búsqueda
  const handleSearch = (value) => {
    setEstado("");
    setLoadingSearch(true);

    const filtered = usuarios.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUsuarios(filtered);

    setTimeout(() => {
      setLoadingSearch(false);
    }, 500);
  };

  // Actualizar estado del filtro
  const handleEstadoChange = (value) => {
    setEstado(value || ""); 
    setCurrentPage(1);
  };

  // Renderizar estado como tag
  const renderEstado = (status) => {
    const color = status === "active" ? "green" : "red";
    const label = status === "active" ? "Activo" : "Inactivo";
    return <Tag color={color}>{label}</Tag>;
  };

  const columns = [
    { title: "Usuario", dataIndex: "username", key: "usuario", width: 350 },
    { title: "Nombre", dataIndex: "name", key: "nombre", width: 350 },
    { title: "Apellido", dataIndex: "lastname", key: "apellido", width: 350 },
    {
      title: "Estado",
      dataIndex: "status",
      key: "estado",
      width: 80,
      render: renderEstado,
    },
    {
      title: "Acciones",
      key: "acciones",
      width: 80,
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Editar
          </Button>
          <EliminarUsuario record={record} actualizarTabla={handleActualizar} />
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditRecord(record);
    setIsModalVisible(true);
  };

  const handleActualizar = () => {
    UsuariosAPI({
      estado,
      page: currentPage,
      limit: pageSize,
      setUsuarios,
      setFilteredUsuarios,
      setLoading,
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <>
      <Space className="space">
        <div className="div_buscador_filtro">
          <Search
            className="buscador"
            placeholder="Buscar usuario"
            onSearch={handleSearch}
          />
          <Select
            className="filtro"
            placeholder="Filtrar por estado"
            onChange={handleEstadoChange}
            style={{ width: 150 }}
            value={estado || undefined}
            allowClear
          >
            <Option value="active">Activo</Option>
            <Option value="inactive">Inactivo</Option>
          </Select>
        </div>

        <AgregarUsuario actualizarTabla={handleActualizar} />
      </Space>

      {loading || loadingSearch ? (
        <Spin className="spin" size="large" />
      ) : (
        <Table
          className="tabla"
          columns={columns}
          dataSource={filteredUsuarios}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: usuarios.length,
            onChange: handlePageChange,
            showSizeChanger: false,
          }}
          rowKey="id"
        />
      )}

      {editRecord && (
        <EditarUsuario
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          record={editRecord}
          actualizarTabla={handleActualizar}
        />
      )}
    </>
  );
};

export default TablaUsuarios;
