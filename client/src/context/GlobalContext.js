import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ usuarios, setUsuarios, filteredUsuarios, setFilteredUsuarios, loading, setLoading, loadingModal, setLoadingModal }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
