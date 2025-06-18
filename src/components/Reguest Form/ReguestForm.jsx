import { useState } from "react";

export default function ReguestForm({ setIsFormVisible, isFormVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending the data to an API or email service
    console.log("Form submitted:", formData);
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Request Custom Design
              </h2>
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
                    <button type="submit"
                      className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                      Request Consultation
                    </button>
                    <div onClick={() => setIsFormVisible(!isFormVisible)} 
                    className="px-6 py-3 bg-red-600 text-white rounded-md w-fit font-medium hover:bg-red-700 transition whitespace-nowrap cursor-pointer !rounded-button ml-4">
                        Cancel
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
