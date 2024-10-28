import React from "react";
import { Breadcrumb } from "antd";

const Breadcrumbs = () => (
  <Breadcrumb
    className="breadcrumb"
    separator=" / "
    items={[{ title: "Usuarios" }, { title: "Lista de usuarios" }]}
  />
);

export default Breadcrumbs;
