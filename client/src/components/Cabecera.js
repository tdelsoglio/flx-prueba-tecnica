import React from 'react';
import { Layout } from 'antd';
import '../App.css';
import Logo from '../assets/Flexxus-Logo-Black-sidebar.png';


const { Header } = Layout;

const Cabecera = () => (
  <Header className='cabecera'>
    <img 
      src={Logo} 
      alt="Logo" 
      className='logo_flexxus'
    />
  </Header>
);

export default Cabecera;
