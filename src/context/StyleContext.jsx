import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const StyleContext = createContext();
export const StyleProvider = ({ children }) => {
  const [stylesProvider, setStylesProvider] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStyles = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/api/style`);
      setStylesProvider(res.data);
        // console.log("Styles loaded successfully:", res.data);
    } catch (err) {
      console.error("Failed to load styles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  return (
    <StyleContext.Provider value={{ stylesProvider, setStylesProvider, fetchStyles, loading }}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) throw new Error("useStyle must be used within a StyleProvider");
  return context;
};