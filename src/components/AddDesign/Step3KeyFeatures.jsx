import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';


function Step3KeyFeatures({ onNext, onBack, designId, initialData = [], isEditing = false }) {
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      setFeatures(initialData);
    }
  }, [initialData]);

  const handleAddFeature = () => {
    if (currentFeature.trim() !== '') {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature('');
      setErrors({});
    } else {
      setErrors({ feature: 'يجب إدخال ميزة' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleRemoveFeature = (index) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  const validateForm = () => {
    if (features.length === 0) {
      setErrors({ features: 'يجب إضافة ميزة واحدة على الأقل' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const baseURL = import.meta.env.VITE_BASE_URL;

    try {
        console.log('designId', designId);
      for (const feature of features) {
        await axios.post(`${baseURL}/api/KeyFeature`, {
          content: feature,
          designId: designId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      onNext(features);
    } catch (err) {
      console.error(err);
      alert('فشل في إرسال الميزات');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المميزات الرئيسية
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={currentFeature}
            onChange={(e) => setCurrentFeature(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="مثلاً: مقاومة للماء"
            className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.feature ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={handleAddFeature}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            إضافة
          </button>
        </div>
        {errors.feature && (
          <p className="mt-2 text-sm text-red-600">{errors.feature}</p>
        )}
      </div>

      {features.length > 0 ? (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <span className="text-gray-700">{feature}</span>
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          لا توجد ميزات مضافة حتى الآن
        </div>
      )}

      {errors.features && (
        <p className="text-sm text-red-600">{errors.features}</p>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          رجوع
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'جاري الحفظ...' : 'إنهاء'}
        </button>
      </div>
    </form>
  );
}

export default Step3KeyFeatures;
