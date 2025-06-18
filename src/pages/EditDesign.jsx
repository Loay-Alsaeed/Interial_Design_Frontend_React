import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDesigns } from '../context/DesignContext';
import { useCategory } from '../context/CategoryContext';
import { useStyle } from '../context/StyleContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaEdit, FaSave, FaTimes, FaSpinner, FaArrowLeft, FaEye, FaTrash } from 'react-icons/fa';

export default function EditDesign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { designs, fetchDesigns } = useDesigns();
  const { categoriesProvider } = useCategory();
  const { stylesProvider } = useStyle();
  const { token } = useAuth();
  
  const [design, setDesign] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    sizeWidth: '',
    sizeHeight: '',
    categoryId: '',
    styleId: '',
    designerName: '',
    layoutImage: null,
    Images: []
  });

  useEffect(() => {
    if (designs.length > 0) {
      const foundDesign = designs.find((d) => d.id === id);
      if (foundDesign) {
        setDesign(foundDesign);
        setFormData({
          title: foundDesign.title || '',
          subTitle: foundDesign.subTitle || '',
          sizeWidth: foundDesign.sizeWidth || '',
          sizeHeight: foundDesign.sizeHeight || '',
          categoryId: foundDesign.categoryId || '',
          styleId: foundDesign.styleId || '',
          designerName: foundDesign.designerName || '',
          layoutImage: null,
          Images: []
        });
      } else {
        console.error(`Design with id ${id} not found`);
      }
      setIsLoading(false);
    }
  }, [id, designs]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.subTitle.trim()) newErrors.subTitle = 'العنوان الفرعي مطلوب';
    if (!formData.sizeWidth) newErrors.sizeWidth = 'العرض مطلوب';
    if (!formData.sizeHeight) newErrors.sizeHeight = 'الارتفاع مطلوب';
    if (!formData.categoryId) newErrors.categoryId = 'الفئة مطلوبة';
    if (!formData.styleId) newErrors.styleId = 'النمط مطلوب';
    if (!formData.designerName.trim()) newErrors.designerName = 'اسم المصمم مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'layoutImage') {
      setFormData({ ...formData, layoutImage: files[0] });
      setErrors({ ...errors, layoutImage: '' });
    } else if (name === 'Images') {
      setFormData({ ...formData, Images: Array.from(files) });
      setErrors({ ...errors, Images: '' });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const payload = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === 'Images') {
        formData[key].forEach(image => {
          payload.append('Images', image);
        });
      } else if (formData[key] !== null && formData[key] !== '') {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(`${baseURL}/api/design/${id}`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        await fetchDesigns();
        setIsEditing(false);
        setDesign(response.data);
      }
    } catch (error) {
      console.error('Error updating design:', error);
      alert('فشل في تحديث التصميم');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('هل أنت متأكد من حذف هذا التصميم؟')) return;

    setIsDeleting(true);
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    try {
      const response = await axios.delete(`${baseURL}/api/design/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        navigate('/admin-dashboard');
      }
    } catch (error) {
      console.error('Error deleting design:', error);
      alert('فشل في حذف التصميم');
    } finally {
      setIsDeleting(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categoriesProvider.find(cat => cat.id === categoryId);
    return category ? category.name : 'غير محدد';
  };

  const getStyleName = (styleId) => {
    const style = stylesProvider.find(style => style.id === styleId);
    return style ? style.title : 'غير محدد';
  };

  const designImages = design?.images ? 
    design.images.filter(img => img && img.imageUrl).map((img, index) => ({
      id: img.id,
      url: `${import.meta.env.VITE_BASE_URL}/${img.imageUrl}`,
      alt: `Image ${index + 1}`
    })) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">التصميم غير موجود</h2>
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            العودة للوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <FaArrowLeft className="mr-2" />
                العودة للوحة التحكم
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'تعديل التصميم' : 'تفاصيل التصميم'}
              </h1>
            </div>
            
            <div className="flex space-x-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <FaEdit className="mr-2" />
                    تعديل
                  </button>
                  <button
                    onClick={() => navigate(`/design/${id}`)}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <FaEye className="mr-2" />
                    عرض
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <FaSpinner className="mr-2 animate-spin" />
                    ) : (
                      <FaTrash className="mr-2" />
                    )}
                    حذف
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <FaSpinner className="mr-2 animate-spin" />
                    ) : (
                      <FaSave className="mr-2" />
                    )}
                    حفظ
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                      setFormData({
                        title: design.title || '',
                        subTitle: design.subTitle || '',
                        sizeWidth: design.sizeWidth || '',
                        sizeHeight: design.sizeHeight || '',
                        categoryId: design.categoryId || '',
                        styleId: design.styleId || '',
                        designerName: design.designerName || '',
                        layoutImage: null,
                        Images: []
                      });
                    }}
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    <FaTimes className="mr-2" />
                    إلغاء
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">صور التصميم</h2>
            
            {designImages.length > 0 ? (
              <div>
                <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                  <img
                    src={designImages[currentImageIndex]?.url}
                    alt={designImages[currentImageIndex]?.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {designImages.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto">
                    {designImages.map((image, index) => (
                      <div
                        key={image.id}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                          currentImageIndex === index ? 'border-indigo-600' : 'border-gray-300'
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">لا توجد صور متاحة</p>
              </div>
            )}

            {isEditing && (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    إضافة صور جديدة
                  </label>
                  <input
                    type="file"
                    name="Images"
                    multiple
                    accept="image/*"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Design Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">معلومات التصميم</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{design.title}</p>
                )}
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الفرعي</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="subTitle"
                    value={formData.subTitle}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.subTitle ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                ) : (
                  <p className="text-gray-900">{design.subTitle}</p>
                )}
                {errors.subTitle && <p className="mt-1 text-sm text-red-600">{errors.subTitle}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العرض</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="sizeWidth"
                      value={formData.sizeWidth}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.sizeWidth ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900">{design.sizeWidth}</p>
                  )}
                  {errors.sizeWidth && <p className="mt-1 text-sm text-red-600">{errors.sizeWidth}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الارتفاع</label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="sizeHeight"
                      value={formData.sizeHeight}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        errors.sizeHeight ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <p className="text-gray-900">{design.sizeHeight}</p>
                  )}
                  {errors.sizeHeight && <p className="mt-1 text-sm text-red-600">{errors.sizeHeight}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                {isEditing ? (
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.categoryId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">اختر الفئة</option>
                    {categoriesProvider.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{getCategoryName(design.categoryId)}</p>
                )}
                {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">النمط</label>
                {isEditing ? (
                  <select
                    name="styleId"
                    value={formData.styleId}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.styleId ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">اختر النمط</option>
                    {stylesProvider.map(style => (
                      <option key={style.id} value={style.id}>{style.title}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900">{getStyleName(design.styleId)}</p>
                )}
                {errors.styleId && <p className="mt-1 text-sm text-red-600">{errors.styleId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المصمم</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="designerName"
                    value={formData.designerName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.designerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                ) : (
                  <p className="text-gray-900">{design.designerName}</p>
                )}
                {errors.designerName && <p className="mt-1 text-sm text-red-600">{errors.designerName}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {design.description && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">الوصف</h2>
            <p className="text-gray-700 leading-relaxed">{design.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
