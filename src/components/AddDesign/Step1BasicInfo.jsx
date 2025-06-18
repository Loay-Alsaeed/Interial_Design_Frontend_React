import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStyle } from '../../context/StyleContext';
import { useCategory } from '../../context/CategoryContext';
import { useAuth } from '../../context/AuthContext';

function Step1BasicInfo({ onNext, setDesignId, initialData = {}, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    sizeWidth: '',
    sizeHeight: '',
    categoryId: '',
    styleId: '',
    designerId: 'e4dfe359-bf00-4e77-a67d-08ddab9077d6', // Default designer ID
    layoutImage: null,
    Images: [],
  });

  const [errors, setErrors] = useState({});
  const [designers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { stylesProvider, loading: stylesLoading } = useStyle();
  const { categoriesProvider } = useCategory();
  const { token } = useAuth();


  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData(initialData);
    }
    
  }, [initialData]);

  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'العنوان مطلوب';
    if (!formData.subTitle.trim()) newErrors.subTitle = 'العنوان الفرعي مطلوب';
    if (!formData.sizeWidth) newErrors.sizeWidth = 'العرض مطلوب';
    if (!formData.sizeHeight) newErrors.sizeHeight = 'الارتفاع مطلوب';
    if (!formData.categoryId) newErrors.categoryId = 'الفئة مطلوبة';
    if (!formData.styleId) newErrors.styleId = 'النمط مطلوب';
    if (!formData.designerId) newErrors.designerId = 'المصمم مطلوب';
    if (!formData.layoutImage && !isEditing) newErrors.layoutImage = 'صورة التصميم مطلوبة';
    if (formData.Images.length === 0 && !isEditing) newErrors.Images = 'صور التصميم مطلوبة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const baseURL = import.meta.env.VITE_BASE_URL;
    const payload = new FormData();

    Object.keys(formData).forEach(key => {
      if (key === 'Images') {
        formData[key].forEach(image => {
          payload.append('Images', image);
        });
      } else if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(`${baseURL}/api/Design`, payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setDesignId(response.data.id);
      // console.log('response', response.data);
      onNext(formData);
    } catch (err) {
      console.error(err);
      alert('فشل في الإرسال');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="أدخل عنوان التصميم"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الفرعي</label>
          <input
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.subTitle ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="أدخل العنوان الفرعي"
          />
          {errors.subTitle && <p className="mt-1 text-sm text-red-600">{errors.subTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العرض</label>
          <input
            name="sizeWidth"
            type="number"
            value={formData.sizeWidth}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.sizeWidth ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="أدخل العرض"
          />
          {errors.sizeWidth && <p className="mt-1 text-sm text-red-600">{errors.sizeWidth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الارتفاع</label>
          <input
            name="sizeHeight"
            type="number"
            value={formData.sizeHeight}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.sizeHeight ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="أدخل الارتفاع"
          />
          {errors.sizeHeight && <p className="mt-1 text-sm text-red-600">{errors.sizeHeight}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.categoryId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">اختر الفئة</option>
            {categoriesProvider.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">النمط</label>
          <select
            name="styleId"
            value={formData.styleId}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.styleId ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={stylesLoading}
          >
            <option value="">اختر النمط</option>
            {stylesProvider.map(style => (
              <option key={style.id} value={style.id}>{style.title}</option>
            ))}
          </select>
          {errors.styleId && <p className="mt-1 text-sm text-red-600">{errors.styleId}</p>}
          {stylesLoading && <p className="mt-1 text-sm text-gray-500">جاري تحميل الأنماط...</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">المصمم</label>
          <select
            name="designerId"
            value={formData.designerId}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.designerId ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">اختر المصمم</option>
            {designers.map(designer => (
              <option key={designer.id} value={designer.id}>{designer.name}</option>
            ))}
          </select>
          {errors.designerId && <p className="mt-1 text-sm text-red-600">{errors.designerId}</p>}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">صورة المخطط</label>
          <input
            name="layoutImage"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.layoutImage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.layoutImage && <p className="mt-1 text-sm text-red-600">{errors.layoutImage}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">صور التصميم</label>
          <input
            name="Images"
            type="file"
            accept="image/*"
            onChange={handleChange}
            multiple
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.Images ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.Images && <p className="mt-1 text-sm text-red-600">{errors.Images}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'جاري الحفظ...' : 'التالي'}
        </button>
      </div>
    </form>
  );
}

export default Step1BasicInfo;
