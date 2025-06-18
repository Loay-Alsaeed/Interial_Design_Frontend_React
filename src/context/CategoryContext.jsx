    import { createContext, useContext, useEffect, useState } from "react";
    import axios from "axios";

    const CategoryContext = createContext();
    export const CategoryProvider = ({ children }) => {
    const [categoriesProvider, setCategoriesProvider] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/Category`);
        setCategoriesProvider(res.data);
        } catch (err) {
        console.error("Failed to load categories", err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categoriesProvider, setCategoriesProvider, fetchCategories, loading }}>
        {children}
        </CategoryContext.Provider>
    );
    };

    export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error("useCategory must be used within a CategoryProvider");
    return context;
    };