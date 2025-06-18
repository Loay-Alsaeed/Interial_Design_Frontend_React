import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Step5Colors({ onNext, onBack, designId }) {
    const [colors, setColors] = useState([]);
    const [currentColor, setCurrentColor] = useState({
        name: '',
        colorNumber: '',
        application:''
    });
    const [errors, setErrors] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useAuth();

    const handleChange = (e) => {
    const { name, value } = e.target;
      setCurrentColor({ ...currentColor, [name]: value });
    }

    const handleAddColor = () => {
        const { name, colorNumber, application } = currentColor;
        if (!name || !colorNumber || !application) {
            setErrors('يرجى تعبئة الحقول المطلوبة (الاسم، رقم اللون، التطبيق)');
            return;
        }

        setColors([...colors, currentColor]);
        setCurrentColor({
            name: '',
            colorNumber: '',
            application: ''
        });
        setErrors('');
    };

    const handleRemoveColor = (index) => {
        const updated = [...colors];
        updated.splice(index, 1);
        setColors(updated);
    };

    const handleSubmit = async (e) => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        e.preventDefault();
        if (colors.length === 0) {
            setErrors('أضف لون واحد على الأقل قبل المتابعة');
            return;
        }

        setIsSubmitting(true);
        try {
            for (const color of colors) {
                const response = await fetch(`${baseURL}/api/color`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: color.name,
                    colorNumber: color.colorNumber,
                    application: color.application,
                    designId: designId
                    }),
                });
                console.log('color', color);
                console.log('designId', designId);
                console.log('response', response);
                if (!response.ok) {
                    
                    throw new Error('فشل في إضافة اللون');
                }
            }
           
        } catch (error) {
            setErrors(error.message);
        } finally {
            setIsSubmitting(false);
            onNext(colors); // Call onNext to proceed to the next step
        }
    }
 


  return (
    <>
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-bold">Add Colors</h2>
            {errors && <div className="text-red-500">{errors}</div>}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block mb-2">Color Name</label>
                    <input
                        type="text"
                        name="name"
                        value={currentColor.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter color name"
                        visible={isSubmitting}
                    />
                </div>
                <div>
                    <label className="block mb-2">Color Number</label>
                    <input
                        type="text"
                        name="colorNumber"
                        value={currentColor.colorNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter color number"
                        visible={isSubmitting}
                    />
                </div>
                <div>
                    <label className="block mb-2">Application</label>
                    <input
                        type="text"
                        name="application"
                        value={currentColor.application}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter application details"
                        visible={isSubmitting}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAddColor}
                    className="bg-blue-500 text-white p-2 rounded"
                    disabled={isSubmitting}
                >
                    Add Color
                </button>
                <div className="mt-4">
                    <h3 className="text-md font-semibold">Added Colors</h3>
                    <ul className="list-disc pl-5">
                        {colors.map((color, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{color.name} - {color.colorNumber} - {color.application}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveColor(index)}
                                    className="text-red-500 ml-2"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>   
                 
            </div>
            <div className="flex justify-between mt-6">
                <button type="button" onClick={onBack} className="btn-secondary">
                    Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary">
                    {isSubmitting ? 'جاري الحفظ...' : 'إنهاء'}
                </button>
            </div>
        </form>
    </>
  )
};
