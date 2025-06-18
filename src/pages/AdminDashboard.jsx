import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // استدعاء الـ Auth
import LoginAdmin from '../components/AdminLogin/AdminLogin'; // استدعاء مكون تسجيل الدخول
// import { CategoryProvider } from '../context/CategoryContext';
import { useCategory } from '../context/CategoryContext';
import { useStyle } from '../context/StyleContext'; // استدعاء الـ StyleContext
import { FaEdit, FaTrash, FaEye, FaSpinner } from "react-icons/fa";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    designs: 0,
    categories: 0,
    styles: 0,
    designers: 0
  });
  const [recentDesigns, setRecentDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const {token} = useAuth(); // استدعاء التوكن من الكونتكست
  const [isAdmin, setIsAdmin] = useState(false);
  const { categoriesProvider } = useCategory(); // استدعاء الفئات من الكونتكست
  const { stylesProvider } = useStyle(); // استدعاء الأنماط من الكونتكست

  useEffect(() => {
    fetchDashboardData();
    fetchIsAdmin();
  }, [token]);


  const fetchIsAdmin = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.get(`${baseURL}/api/auth/admin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(res.status === 200) {
        setIsAdmin(true);
      }
      console.log(res);
      return res.data.isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }

  const fetchDashboardData = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      const [designsRes, categoriesRes, stylesRes] = await Promise.all([
        axios.get(`${baseURL}/api/design`),
        axios.get(`${baseURL}/api/Category`),
        axios.get(`${baseURL}/api/Style`),
        // axios.get(`${baseURL}/api/Designer`)
      ]);
      setStats({
        designs: designsRes.data.length,
        categories: categoriesRes.data.length,
        styles: stylesRes.data.length,
        designers: 1
      });

      // Get recent designs (last 5)
      setRecentDesigns(designsRes.data.slice(-5).reverse());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddDesign = () => {
    navigate('/design-form');
  };

  const handleDeleteDesign = async (designId) => {
    setDeletingId(designId);
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      // Call the API to delete the design
    const res = await axios.delete(`${baseURL}/api/design/${designId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
    )
      if (res.status === 200) {
        // Remove the deleted design from the recent designs state
        setRecentDesigns((prevDesigns) => prevDesigns.filter((design) => design.id !== designId));
        // Optionally, you can also update the stats if needed
        setStats((prevStats) => ({
          ...prevStats,
          designs: prevStats.designs - 1
        }));
        setDeletingId(null);
      }

    } catch (error) {
      console.error('Error deleting design:', error);
      setDeletingId(null);
    }
  
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!token) {
    return <LoginAdmin/>
  }

  if (!isAdmin) {
    return <LoginAdmin message="You are not authorized to access this page." />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleAddDesign}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Design
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Total Designs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.designs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Styles</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.styles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="mr-4">
                <p className="text-sm font-medium text-gray-600">Designers</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.designers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Designs */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Designs</h2>
          <div className="overflow-x-auto">
            { recentDesigns.length === 0 ? (
              <p className="text-gray-500">No recent designs available.</p>
            ) :
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-center">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Style</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Designer</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
  {recentDesigns.map((design) => (
    <tr key={design.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{design.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {
            categoriesProvider.find((cat) => cat.id === design.categoryId)?.name || "Unknown"
          }
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {
            stylesProvider.find((sty) => sty.id === design.styleId)?.title || "Unknown"
          }
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{design.designerName}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div>
          <button
            onClick={() => navigate(`/design-form/${design.id}`)}
            className="text-indigo-600 hover:text-indigo-900 mr-1"
            title="Edit"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => handleDeleteDesign(design.id)}
            className="text-red-500 hover:text-red-700 mr-1"
            title="Delete"
            disabled={deletingId === design.id}
          >
            {deletingId === design.id ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaTrash />
            )}
          </button>

          <button
            onClick={() => navigate(`/design/${design.id}`)}
            className="text-green-600 hover:text-green-900 mr-1"
            title="View"
          >
            <FaEye />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
        }

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
