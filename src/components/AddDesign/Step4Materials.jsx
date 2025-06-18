import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

function Step4Materials({ onNext, onBack, designId }) {
  const [currentMaterial, setCurrentMaterial] = useState({
    name: '',
    description: '',
    image: null,
    application: '',
    supplier: '',
    sustainability: '',
    maintenance: '',
  });

  const [materials, setMaterials] = useState([]);
  const [errors, setErrors] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token } = useAuth();


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setCurrentMaterial({ ...currentMaterial, image: files[0] });
    } else {
      setCurrentMaterial({ ...currentMaterial, [name]: value });
    }
  };

  const handleAddMaterial = () => {
    const { name, description, image } = currentMaterial;
    if (!name || !description || !image) {
      setErrors('يرجى تعبئة الحقول المطلوبة (الاسم، الوصف، الصورة)');
      return;
    }

    setMaterials([...materials, currentMaterial]);
    setCurrentMaterial({
      name: '',
      description: '',
      image: null,
      application: '',
      supplier: '',
      sustainability: '',
      maintenance: '',
    });
    setErrors('');
  };

  const handleRemoveMaterial = (index) => {
    const updated = [...materials];
    updated.splice(index, 1);
    setMaterials(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (materials.length === 0) {
      setErrors('أضف مادة واحدة على الأقل قبل المتابعة');
      return;
    }

    setIsSubmitting(true);
    setErrors('');

    const baseURL = import.meta.env.VITE_BASE_URL;

    try {
      for (const mat of materials) {
        const formData = new FormData();
        formData.append('designId', designId);
        formData.append('name', mat.name);
        formData.append('description', mat.description);
        formData.append('image', mat.image);

        if (mat.application) formData.append('application', mat.application);
        if (mat.supplier) formData.append('supplier', mat.supplier);
        if (mat.sustainability) formData.append('sustainability', mat.sustainability);
        if (mat.maintenance) formData.append('maintenance', mat.maintenance);

        await axios.post(`${baseURL}/api/Material`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${token}`,
            }
          }
        );
      }

      onNext(materials); // تابع للمرحلة التالية
    } catch (err) {
      console.error(err);
      setErrors('فشل في إرسال البيانات');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-lg font-bold">إضافة المواد</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          name="name"
          value={currentMaterial.name}
          onChange={handleChange}
          placeholder="اسم المادة *"
          className="input"
        />

        <textarea
          name="description"
          value={currentMaterial.description}
          onChange={handleChange}
          placeholder="الوصف *"
          className="input"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        <input
          name="application"
          value={currentMaterial.application}
          onChange={handleChange}
          placeholder="طريقة الاستخدام"
          className="input"
        />

        <input
          name="supplier"
          value={currentMaterial.supplier}
          onChange={handleChange}
          placeholder="المورد"
          className="input"
        />

        <input
          name="sustainability"
          value={currentMaterial.sustainability}
          onChange={handleChange}
          placeholder="الاستدامة"
          className="input"
        />

        <input
          name="maintenance"
          value={currentMaterial.maintenance}
          onChange={handleChange}
          placeholder="الصيانة"
          className="input"
        />

        <button
          type="button"
          onClick={handleAddMaterial}
          className="btn-primary"
        >
          إضافة مادة
        </button>
      </div>

      {materials.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold text-gray-700">المواد المضافة:</h3>
          {materials.map((mat, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-3 rounded"
            >
              <span>{mat.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveMaterial(index)}
                className="text-red-500 hover:underline"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}

      {errors && <p className="text-red-500">{errors}</p>}

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onBack} className="btn-secondary">
          رجوع
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? 'جاري الحفظ...' : 'إنهاء'}
        </button>
      </div>
    </form>
  );
}

export default Step4Materials;
