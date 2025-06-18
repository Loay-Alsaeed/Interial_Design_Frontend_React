import React from 'react'
import { useState } from 'react';
import ReguestForm from '../Reguest Form/ReguestForm';


export default function CTA() {
    const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
        <section className="py-16 bg-indigo-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Can't Find What You're Looking For?</h2>
                    <p className="text-xl text-gray-600 mb-8">Let our professional designers create a custom interior design tailored to your specific needs and preferences.</p>
                    <button onClick={() => setIsFormVisible(!isFormVisible)}
                     className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition text-lg cursor-pointer whitespace-nowrap !rounded-button">
                        Request Custom Design
                    </button>
                </div>
            </div>
        </section>
        {isFormVisible && <ReguestForm 
        isFormVisible={isFormVisible}
        setIsFormVisible={setIsFormVisible}
        />}
    </>
  )
}
