import "./App.css";
import React from "react";
import { Layout } from "antd";
import Cabecera from "./components/Cabecera";
import Breadcrumbs from "./components/Breadcrumbs";
import TablaUsuarios from "./components/TablaUsuarios";

const { Content } = Layout;

function App() {
  return (
    <>
        <Layout className="layout">
          <Cabecera />
          <Content className="content">
            <Breadcrumbs />
            <TablaUsuarios />
          </Content>
        </Layout>
    </>
  );
}

export default App;
