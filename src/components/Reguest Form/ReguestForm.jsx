import { useState } from "react";
import axios from 'axios';

export default function ReguestForm({ setIsFormVisible, isFormVisible }) {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name Required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter Valid Email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Required';
    if (!formData.message.trim()) newErrors.message = 'Message Required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const baseURL = import.meta.env.VITE_BASE_URL;
    try {
      const res = await axios.post(`${baseURL}/api/email/custom`, formData);
      if (res.status !== 200) {
        throw new Error('Failed to send message');
      }
      setSubmitSuccess(true);
      console.log('email sended successfuly');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error(err);
      alert('فشل في إرسال الرسالة');
    } finally {
      setIsLoading(false);
    }


    // console.log("Form submitted:", formData);

    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      timeline: "",
      budget: "",
      message: "",
    });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-[700px] mx-4 my-4 overflow-hidden   shadow-lg">
          <div className="px-6">
            <div className="flex justify-between items-start mb-4"></div>
            <div className="mb-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Request Custom Design
                </h2>
                <p
                  onClick={() => setIsFormVisible(!isFormVisible)}
                 className="text-xl font-bold text-red-400 mb-6 cursor-pointer">X</p>
              </div>

                {submitSuccess? 
                (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="mr-3">
                        <p className="text-sm font-medium text-green-800">
                          Your message has been sent successfully. We will contact you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                ): 
                (
                  <form id="inquiryForm" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter your full name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1" >
                          Email Address
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="your@email.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>
                      </div>
                      <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1" >
                          Phone Number
                          </label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="(123) 456-7890" />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1" >
                          Additional Information
                        </label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Tell us about your space, specific requirements, or any questions you have...">
                        </textarea>
                      </div>
                    </div>
                    <div className="flex items-center mb-6">
                      <input  type="checkbox" id="consent" required
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                      <label htmlFor="consent" className="ml-2 block text-sm text-gray-700" >
                          I agree to receive communications about this design and related services.
                      </label>
                    </div>
                    <div className="text-right flex justify-end items-center">
                      <button 
                        type="submit"
                        disabled = {isLoading}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                        {isLoading? 'Loading...': 'Request Consultation'} 
                      </button>
                      
                    </div>
                  </form>  
                )}

                
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
