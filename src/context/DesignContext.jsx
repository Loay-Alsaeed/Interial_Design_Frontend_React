import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { useAuth } from "./AuthContext"; // استدعاء الـ Auth

const DesignContext = createContext();

export const DesignProvider = ({ children }) => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const fetchDesigns = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      setLoading(true);
      const res = await axios.get(`${baseURL}/api/design`, );
      setDesigns(res.data);
    } catch (err) {
      console.error("Failed to load designs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  useEffect(() => {
}, [designs]);


  return (
    <DesignContext.Provider value={{ designs, setDesigns, fetchDesigns, loading }}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesigns = () => {
  const context = useContext(DesignContext);
  if (!context) throw new Error("useDesigns must be used within a DesignProvider");
  return context;
};
