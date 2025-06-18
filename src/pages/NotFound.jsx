import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaExclamationTriangle className="text-white text-5xl" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              الصفحة غير موجودة
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
              يمكنك العودة إلى الصفحة الرئيسية أو استكشاف تصاميمنا الجميلة.
            </p>
          </div>

          {/* Search Suggestion */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <FaSearch className="text-indigo-600 text-xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">هل تبحث عن شيء محدد؟</h3>
            </div>
            <p className="text-gray-600 mb-4">
              جرب البحث في تصاميمنا أو تصفح الفئات المختلفة
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['تصاميم غرف النوم', 'تصاميم المطابخ', 'تصاميم الصالات', 'تصاميم الحمامات'].map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaHome className="mr-3" />
              العودة للصفحة الرئيسية
            </Link>
            
            <Link
              to="/design"
              className="flex items-center justify-center px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaSearch className="mr-3" />
              استكشاف التصاميم
            </Link>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">هل تحتاج مساعدة؟</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">تصفح التصاميم</h4>
              <p className="text-sm text-gray-600">اكتشف مجموعتنا الواسعة من التصاميم المميزة</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">تواصل معنا</h4>
              <p className="text-sm text-gray-600">احصل على مساعدة من فريقنا المتخصص</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">طلب تصميم مخصص</h4>
              <p className="text-sm text-gray-600">احصل على تصميم يناسب احتياجاتك الخاصة</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse delay-3000"></div>
      </div>
    </div>
  );
} 