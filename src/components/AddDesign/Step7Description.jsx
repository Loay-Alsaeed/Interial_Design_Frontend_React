import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Step7Description({onNext, onBack, designId}) {
    const [descriptions, setDescriptions] = useState([]);
    const [currentDescription, setCurrentDescription] = useState({
        content: ''
    });
    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentDescription({ ...currentDescription, [name]: value });
    }
    const handleAddDescription = () => {
        const { content } = currentDescription;
        if (!content) {
            setErrors('يرجى تعبئة الحقل المطلوب (المحتوى)');
            return;
        }

        setDescriptions([...descriptions, currentDescription]);
        setCurrentDescription({
            content: ''
        });
        setErrors('');
    };
    const handleRemoveDescription = (index) => {
        const updated = [...descriptions];
        updated.splice(index, 1);
        setDescriptions(updated);
    }
    const handleSubmit = async (e) => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        e.preventDefault();
        if (descriptions.length === 0) {
            setErrors('أضف وصف واحد على الأقل قبل المتابعة');
            return;
        }

        setIsSubmitting(true);
        try {
            for (const description of descriptions) {
                const response = await fetch(`${baseURL}/api/description`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        content: description.content,
                        designId
                    }),
                });

                if (!response.ok) {
                    console.error('Failed to add description:', response);
                    throw new Error('فشل في إضافة الوصف');
                }
            }
            onNext(descriptions);
        } catch (error) {
            console.error('Error submitting descriptions:', error);
            setErrors('حدث خطأ أثناء إرسال البيانات. يرجى المحاولة مرة أخرى.');
        } finally {
            setIsSubmitting(false);
        }
    };


  return (
    <>
            <h2 className="text-2xl font-bold mb-4">إضافة وصف</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">المحتوى</label>
                <textarea
                id="content"
                name="content"
                value={currentDescription.content}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="أدخل الوصف هنا..."
                visible ={isSubmitting}
                />
            </div>
            {errors && <p className="text-red-500 text-sm mb-4">{errors}</p>}
            <button
                type="button"
                onClick={handleAddDescription}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                إضافة وصف
            </button>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`ml-4 inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
            </button>
            </form>
    
            {descriptions.length > 0 && (
            <div className="mt-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-2">الوصفات المضافة:</h3>
                <ul className="list-disc pl-5 space-y-2">
                {descriptions.map((desc, index) => (
                    <li key={index} className="flex justify-between items-center">
                    <span>{desc.content}</span>
                    <button
                        onClick={() => handleRemoveDescription(index)}
                        className="text-red-500 hover:text-red-700"
                        type="button"
                    >
                        حذف
                    </button>
                    </li>   
                ))}
                </ul>
            </div>
            )}
            <div className="mt-6 flex justify-between w-full max-w-md">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                    العودة
                </button>
                <button
                    onClick={() => onNext(descriptions)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    التالي
                </button>
            </div>
     
      
    </>
  )
}
