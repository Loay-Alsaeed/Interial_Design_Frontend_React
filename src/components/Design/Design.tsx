// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: '',
    budget: '',
    message: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTerms: false
  });
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', loginForm);
    setLoginForm({
      email: '',
      password: '',
      rememberMe: false
    });
    setIsLoginModalOpen(false);
  };
  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpForm({
      ...signUpForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.passwordConfirm) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-red-500 text-sm mt-2';
      errorDiv.textContent = 'Passwords do not match';
      const passwordConfirmInput = document.getElementById('signUpPasswordConfirm');
      const existingError = passwordConfirmInput?.parentElement?.querySelector('.text-red-500');
      if (!existingError && passwordConfirmInput?.parentElement) {
        passwordConfirmInput.parentElement.appendChild(errorDiv);
      }
      return;
    }
    console.log('Sign up submitted:', signUpForm);
    setSignUpForm({
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      acceptTerms: false
    });
    setIsSignUpModalOpen(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      timeline: '',
      budget: '',
      message: ''
    });
  };
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  const roomImages = [
    {
      id: 1,
      url: "https://readdy.ai/api/search-image?query=Modern%2520minimalist%2520living%2520room%2520with%2520clean%2520lines%252C%2520neutral%2520color%2520palette%252C%2520large%2520windows%2520with%2520natural%2520light%252C%2520sleek%2520furniture%252C%2520minimal%2520decor%252C%2520and%2520open%2520space%2520creating%2520a%2520serene%2520contemporary%2520atmosphere%2520with%2520perfect%2520balance%2520of%2520form%2520and%2520function&width=1200&height=800&seq=101&orientation=landscape",
      alt: "Modern minimalist living room - front view"
    },
    {
      id: 2,
      url: "https://readdy.ai/api/search-image?query=Modern%2520minimalist%2520living%2520room%2520from%2520side%2520angle%2520showing%2520sleek%2520sofa%252C%2520coffee%2520table%252C%2520accent%2520chairs%252C%2520large%2520windows%2520with%2520natural%2520light%252C%2520neutral%2520color%2520palette%252C%2520wooden%2520flooring%252C%2520and%2520minimal%2520decor%2520elements%2520creating%2520an%2520elegant%2520contemporary%2520space&width=1200&height=800&seq=102&orientation=landscape",
      alt: "Modern minimalist living room - side view"
    },
    {
      id: 3,
      url: "https://readdy.ai/api/search-image?query=Modern%2520minimalist%2520living%2520room%2520detail%2520shot%2520focusing%2520on%2520entertainment%2520center%2520with%2520sleek%2520TV%2520unit%252C%2520floating%2520shelves%252C%2520hidden%2520storage%252C%2520ambient%2520lighting%252C%2520and%2520carefully%2520curated%2520decorative%2520objects%2520in%2520neutral%2520tones%2520against%2520a%2520clean%2520backdrop&width=1200&height=800&seq=103&orientation=landscape",
      alt: "Modern minimalist living room - entertainment area"
    },
    {
      id: 4,
      url: "https://readdy.ai/api/search-image?query=Modern%2520minimalist%2520living%2520room%2520corner%2520view%2520showing%2520reading%2520nook%2520with%2520comfortable%2520accent%2520chair%252C%2520floor%2520lamp%252C%2520small%2520side%2520table%252C%2520bookshelf%252C%2520large%2520windows%2520with%2520natural%2520light%252C%2520and%2520subtle%2520decor%2520elements%2520creating%2520a%2520peaceful%2520retreat%2520within%2520the%2520space&width=1200&height=800&seq=104&orientation=landscape",
      alt: "Modern minimalist living room - reading corner"
    },
  ];
  const materialsList = [
    { name: "Engineered Oak Flooring", description: "Durable and elegant natural wood finish" },
    { name: "Matte White Wall Paint", description: "Low VOC, washable finish" },
    { name: "Concrete Accent Wall", description: "Sealed and polished for durability" },
    { name: "Walnut Veneer", description: "For cabinetry and built-ins" },
    { name: "Brushed Brass Hardware", description: "For all fixtures and handles" },
    { name: "Natural Linen", description: "For upholstery and window treatments" },
    { name: "Tempered Glass", description: "For tables and shelving" },
    { name: "LED Recessed Lighting", description: "Energy efficient, dimmable" }
  ];
  const colorPalette = [
    { name: "Cloud White", hex: "#F8F8F8", type: "Main Wall Color" },
    { name: "Warm Grey", hex: "#B8B2A7", type: "Accent Wall" },
    { name: "Natural Oak", hex: "#D4B88C", type: "Flooring & Wood Elements" },
    { name: "Soft Charcoal", hex: "#3C3C3C", type: "Furniture" },
    { name: "Matte Black", hex: "#252525", type: "Fixtures & Hardware" },
    { name: "Sage Green", hex: "#B2BDA0", type: "Accent Color" }
  ];
  const budgetBreakdown = [
    { category: "Furniture", amount: "$8,500", items: "Sofa, chairs, tables, storage units" },
    { category: "Flooring", amount: "$3,200", items: "Engineered oak flooring, installation" },
    { category: "Wall Treatments", amount: "$1,800", items: "Paint, concrete accent wall" },
    { category: "Lighting", amount: "$2,200", items: "Ceiling fixtures, floor lamps, table lamps" },
    { category: "Window Treatments", amount: "$1,500", items: "Custom linen curtains, hardware" },
    { category: "Accessories", amount: "$1,200", items: "Art, cushions, decor objects" },
    { category: "Labor", amount: "$4,600", items: "Design fee, contractor work" }
  ];
  const similarDesigns = [
    {
      id: 1,
      title: "Scandinavian Inspired Living",
      designer: "Sofia Lindberg",
      imageUrl: "https://readdy.ai/api/search-image?query=Scandinavian%2520living%2520room%2520with%2520light%2520wood%2520floors%252C%2520white%2520walls%252C%2520minimalist%2520furniture%2520with%2520clean%2520lines%252C%2520natural%2520textiles%252C%2520subtle%2520pops%2520of%2520color%252C%2520large%2520windows%2520with%2520natural%2520light%252C%2520and%2520simple%2520decor%2520creating%2520a%2520bright%2520and%2520airy%2520atmosphere&width=600&height=400&seq=105&orientation=landscape"
    },
    {
      id: 2,
      title: "Japanese Minimalism",
      designer: "Takeshi Yamada",
      imageUrl: "https://readdy.ai/api/search-image?query=Japanese%2520minimalist%2520living%2520room%2520with%2520tatami%2520mat%2520flooring%252C%2520low%2520furniture%252C%2520sliding%2520paper%2520doors%252C%2520natural%2520wood%2520elements%252C%2520zen%2520garden%2520view%252C%2520subtle%2520lighting%252C%2520and%2520carefully%2520placed%2520decor%2520items%2520creating%2520a%2520peaceful%2520and%2520harmonious%2520atmosphere&width=600&height=400&seq=106&orientation=landscape"
    },
    {
      id: 3,
      title: "Warm Minimalist Retreat",
      designer: "Emma Johnson",
      imageUrl: "https://readdy.ai/api/search-image?query=Warm%2520minimalist%2520living%2520room%2520with%2520terracotta%2520and%2520earth%2520tones%252C%2520clean%2520lines%252C%2520comfortable%2520furniture%252C%2520natural%2520materials%252C%2520textural%2520elements%252C%2520ambient%2520lighting%252C%2520and%2520carefully%2520curated%2520decor%2520creating%2520a%2520cozy%2520yet%2520uncluttered%2520contemporary%2520space&width=600&height=400&seq=107&orientation=landscape"
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">InteriorVision</h1>
            <nav className="hidden md:flex ml-10">
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">Home</a>
              <a href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/c761db2b-969d-464a-962c-21122bcd0370" data-readdy="true" className="px-4 py-2 text-indigo-600 hover:text-indigo-800">Designs</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">Designers</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="px-4 py-2 text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button
              id="loginButton"
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 whitespace-nowrap cursor-pointer !rounded-button"
            >
              Log In
            </button>
            {isLoginModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg max-w-md w-full mx-4">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Log In</h3>
                      <button
                        onClick={() => setIsLoginModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500 transition !rounded-button"
                      >
                        <i className="fas fa-times text-xl"></i>
                      </button>
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            value={loginForm.email}
                            onChange={handleLoginInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="loginPassword"
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            required
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="rememberMe"
                              name="rememberMe"
                              checked={loginForm.rememberMe}
                              onChange={handleLoginInputChange}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                              Remember me
                            </label>
                          </div>
                          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button"
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLoginModalOpen(false);
                            setIsSignUpModalOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-800 font-medium">
                          Sign up
                        </a>
                      </p>
                    </div>
                    {isSignUpModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg max-w-md w-full mx-4">
                          <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                              <h3 className="text-xl font-bold text-gray-900">Create Account</h3>
                              <button
                                onClick={() => setIsSignUpModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500 transition !rounded-button"
                              >
                                <i className="fas fa-times text-xl"></i>
                              </button>
                            </div>
                            <form onSubmit={handleSignUpSubmit}>
                              <div className="space-y-4">
                                <div>
                                  <label htmlFor="signUpName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    id="signUpName"
                                    name="name"
                                    value={signUpForm.name}
                                    onChange={handleSignUpInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your full name"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor="signUpEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                  </label>
                                  <input
                                    type="email"
                                    id="signUpEmail"
                                    name="email"
                                    value={signUpForm.email}
                                    onChange={handleSignUpInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="your@email.com"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor="signUpPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    id="signUpPassword"
                                    name="password"
                                    value={signUpForm.password}
                                    onChange={handleSignUpInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Create a password"
                                    required
                                  />
                                </div>
                                <div>
                                  <label htmlFor="signUpPasswordConfirm" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                  </label>
                                  <input
                                    type="password"
                                    id="signUpPasswordConfirm"
                                    name="passwordConfirm"
                                    value={signUpForm.passwordConfirm}
                                    onChange={handleSignUpInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Confirm your password"
                                    required
                                  />
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id="signUpTerms"
                                    name="acceptTerms"
                                    checked={signUpForm.acceptTerms}
                                    onChange={handleSignUpInputChange}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    required
                                  />
                                  <label htmlFor="signUpTerms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the Terms of Service and Privacy Policy
                                  </label>
                                </div>
                                <button
                                  type="submit"
                                  className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button"
                                >
                                  Create Account
                                </button>
                              </div>
                            </form>
                            <div className="mt-6 text-center">
                              <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <a href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIsSignUpModalOpen(false);
                                    setIsLoginModalOpen(true);
                                  }}
                                  className="text-indigo-600 hover:text-indigo-800 font-medium">
                                  Log in
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">Sign Up</button>
            <button className="md:hidden text-gray-600 hover:text-gray-900 cursor-pointer !rounded-button">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-indigo-600">Home</a>
            <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
            <a href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/c761db2b-969d-464a-962c-21122bcd0370" data-readdy="true" className="hover:text-indigo-600">Designs</a>
            <i className="fas fa-chevron-right mx-2 text-xs text-gray-400"></i>
            <span className="text-gray-900">Modern Minimalist Living Room</span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <a
            href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/c761db2b-969d-464a-962c-21122bcd0370"
            data-readdy="true"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            <span>Back to Designs</span>
          </a>
        </div>
        {/* Image Gallery and Info Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:w-2/3 relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              <img
                src={roomImages[currentSlide].url}
                alt={roomImages[currentSlide].alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer !rounded-button"
              >
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-xl ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}></i>
              </button>
              {/* Prev/Next Buttons */}
              <button
                onClick={() => setCurrentSlide((currentSlide - 1 + roomImages.length) % roomImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition cursor-pointer !rounded-button"
              >
                <i className="fas fa-chevron-left text-gray-800"></i>
              </button>
              <button
                onClick={() => setCurrentSlide((currentSlide + 1) % roomImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition cursor-pointer !rounded-button"
              >
                <i className="fas fa-chevron-right text-gray-800"></i>
              </button>
            </div>
            {/* Thumbnails */}
            <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
              {roomImages.map((image, index) => (
                <div
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`w-24 h-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${currentSlide === index ? 'border-indigo-600' : 'border-transparent'}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Design Information */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-900">Modern Minimalist Living Room</h1>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-indigo-600 cursor-pointer !rounded-button">
                    <i className="fas fa-share-alt text-lg"></i>
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className="text-gray-500 hover:text-red-500 cursor-pointer !rounded-button"
                  >
                    <i className={`${isFavorite ? 'fas text-red-500' : 'far'} fa-heart text-lg`}></i>
                  </button>
                </div>
              </div>
              {/* Designer Info */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-lg font-medium text-indigo-700">EJ</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Emma Johnson</p>
                  <p className="text-sm text-gray-600">Minimalist Design Specialist</p>
                </div>
                <button className="ml-auto px-4 py-2 text-sm border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition whitespace-nowrap cursor-pointer !rounded-button">
                  Contact Designer
                </button>
              </div>
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <span className="text-gray-600">4.5 (28 reviews)</span>
              </div>
              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Room Size</p>
                  <p className="font-medium">400 sq ft (20' x 20')</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Style</p>
                  <p className="font-medium">Minimalist, Modern</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium">4-6 weeks</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">$18,000 - $25,000</p>
                </div>
              </div>
              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Concept</h3>
                <p className="text-gray-700">
                  This modern minimalist living room embraces clean lines, a neutral color palette, and thoughtful design elements to create a serene yet sophisticated space. The design focuses on quality over quantity, with each piece carefully selected for both form and function. Natural light is maximized through large windows, while strategic lighting creates ambiance for evening use.
                </p>
              </div>
              {/* CTA Button */}
              <button
                id="requestDesignBtn"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                Request This Design
              </button>
              {/* Modal Dialog */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-lg w-full mx-4 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Confirm Design Request</h3>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500 transition !rounded-button"
                        >
                          <i className="fas fa-times text-xl"></i>
                        </button>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Design Summary</h4>
                        <p className="text-gray-600 mb-4">Modern Minimalist Living Room design featuring:</p>
                        <ul className="text-gray-600 space-y-2 mb-4">
                          <li className="flex items-start">
                            <i className="fas fa-check text-indigo-600 mt-1 mr-2"></i>
                            <span>Clean lines and neutral color palette</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-check text-indigo-600 mt-1 mr-2"></i>
                            <span>Premium materials and finishes</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-check text-indigo-600 mt-1 mr-2"></i>
                            <span>Custom furniture and lighting solutions</span>
                          </li>
                        </ul>
                        <div className="bg-gray-50 p-4 rounded-md mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Estimated Cost</span>
                            <span className="font-bold text-indigo-600">$23,000</span>
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
                        <ul className="text-gray-600 space-y-2">
                          <li className="flex items-start">
                            <i className="fas fa-1 text-indigo-600 mt-1 mr-2"></i>
                            <span>Initial consultation with Emma Johnson</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-2 text-indigo-600 mt-1 mr-2"></i>
                            <span>Detailed design proposal and timeline</span>
                          </li>
                          <li className="flex items-start">
                            <i className="fas fa-3 text-indigo-600 mt-1 mr-2"></i>
                            <span>Project planning and execution</span>
                          </li>
                        </ul>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {
                            setIsModalOpen(false);
                            document.getElementById('inquiryForm')?.scrollIntoView({ behavior: 'smooth' });
                            setFormData(prev => ({
                              ...prev,
                              budget: '$20,000 - $30,000',
                              message: 'I am interested in the Modern Minimalist Living Room design.'
                            }));
                          }}
                          className="flex-1 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button"
                        >
                          Proceed with Request
                        </button>
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition whitespace-nowrap cursor-pointer !rounded-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Tabs Section */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'overview' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap cursor-pointer !rounded-button`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'materials' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap cursor-pointer !rounded-button`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'colors' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap cursor-pointer !rounded-button`}
              >
                Color Palette
              </button>
              <button
                onClick={() => setActiveTab('budget')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === 'budget' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap cursor-pointer !rounded-button`}
              >
                Budget
              </button>
            </nav>
          </div>
          {/* Tab Content */}
          <div className="py-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Philosophy</h3>
                  <p className="text-gray-700 mb-4">
                    This modern minimalist living room design embodies the principle of "less is more," focusing on essential elements that bring both beauty and functionality to the space. The design creates a sense of calm through clean lines, open space, and a carefully curated selection of furniture and accessories.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Natural light is maximized through large windows, while the neutral color palette creates a timeless foundation that can be easily updated with seasonal accents. Each element has been thoughtfully selected to create a cohesive, harmonious environment that promotes relaxation and connection.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Open concept layout maximizing space and flow</li>
                    <li>Floor-to-ceiling windows for abundant natural light</li>
                    <li>Custom built-in storage to minimize clutter</li>
                    <li>Floating entertainment unit with hidden cable management</li>
                    <li>Layered lighting scheme with ambient, task, and accent lighting</li>
                    <li>Acoustic considerations for optimal sound quality</li>
                    <li>Sustainable and durable material selections</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Furniture Layout</h3>
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <img
                      src="https://readdy.ai/api/search-image?query=Modern%2520minimalist%2520living%2520room%2520floor%2520plan%2520and%2520layout%2520diagram%2520showing%2520furniture%2520arrangement%252C%2520traffic%2520flow%252C%2520spatial%2520relationships%252C%2520and%2520key%2520design%2520elements%2520with%2520clean%2520lines%2520and%2520clear%2520labels%2520on%2520a%2520white%2520background%2520with%2520subtle%2520grid%2520pattern&width=800&height=500&seq=108&orientation=landscape"
                      alt="Living room floor plan"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Considerations</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">Functionality</h4>
                      <p className="text-gray-700 text-sm">
                        The layout is designed for both everyday living and entertaining, with comfortable seating, accessible storage, and flexible arrangements.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">Sustainability</h4>
                      <p className="text-gray-700 text-sm">
                        Materials were selected for their durability, low environmental impact, and timeless appeal to reduce the need for frequent replacements.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">Adaptability</h4>
                      <p className="text-gray-700 text-sm">
                        The neutral base design allows for easy updates through accessories and art, adapting to changing preferences over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Materials Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {materialsList.map((material, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="h-40 bg-gray-100 rounded-md mb-4 overflow-hidden">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Close%2520up%2520detailed%2520texture%2520of%2520$%7Bmaterial.name%7D%2520material%2520sample%2520for%2520interior%2520design%2520on%2520neutral%2520background%2520with%2520soft%2520lighting%2520highlighting%2520the%2520material%2520characteristics%2520and%2520quality&width=300&height=300&seq=${200 + index}&orientation=squarish`}
                          alt={material.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{material.name}</h4>
                      <p className="text-gray-600 text-sm">{material.description}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Material Specifications</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sustainability</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maintenance</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Engineered Oak Flooring</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Flooring throughout</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Nordic Wood Co.</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FSC Certified</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sweep and damp mop</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Matte White Wall Paint</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All walls except accent</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">EcoColor Paints</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Zero VOC</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Washable finish</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Concrete Accent Wall</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">TV wall</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Urban Surfaces</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Recycled content</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sealed, wipe clean</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Natural Linen</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Upholstery, curtains</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Pure Textiles</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Organic certified</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dry clean only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* Colors Tab */}
            {activeTab === 'colors' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Color Palette</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
                  {colorPalette.map((color, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                      <div
                        className="w-full h-32 rounded-md mb-3"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <h4 className="font-medium text-gray-900 text-center">{color.name}</h4>
                      <p className="text-gray-500 text-sm mb-1">{color.hex}</p>
                      <p className="text-gray-600 text-xs text-center">{color.type}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Application Guide</h3>
                    <p className="text-gray-700 mb-4">
                      The color palette is designed to create a harmonious, calming environment while providing visual interest through subtle contrasts. The neutral base allows for flexibility in accessorizing and future updates.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#F8F8F8] mt-1 mr-3 border border-gray-200"></div>
                        <div>
                          <span className="font-medium">Cloud White</span> - Primary wall color, creating a bright, airy foundation
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#B8B2A7] mt-1 mr-3"></div>
                        <div>
                          <span className="font-medium">Warm Grey</span> - Accent wall behind entertainment unit, adding depth
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#D4B88C] mt-1 mr-3"></div>
                        <div>
                          <span className="font-medium">Natural Oak</span> - Flooring and wooden elements for warmth
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#3C3C3C] mt-1 mr-3"></div>
                        <div>
                          <span className="font-medium">Soft Charcoal</span> - Main furniture pieces for contrast and grounding
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#252525] mt-1 mr-3"></div>
                        <div>
                          <span className="font-medium">Matte Black</span> - Hardware, fixtures, and accents for definition
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#B2BDA0] mt-1 mr-3"></div>
                        <div>
                          <span className="font-medium">Sage Green</span> - Subtle accent color in cushions and art for life and freshness
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Psychology</h3>
                      <p className="text-gray-700 mb-4">
                        The selected color palette is designed to create a specific psychological impact on the space's occupants:
                      </p>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li><span className="font-medium">White</span> - Creates a sense of space, cleanliness, and purity</li>
                        <li><span className="font-medium">Warm Grey</span> - Adds sophistication and a calming neutrality</li>
                        <li><span className="font-medium">Natural Wood Tones</span> - Brings warmth, nature, and grounding</li>
                        <li><span className="font-medium">Charcoal/Black</span> - Provides definition, focus, and elegance</li>
                        <li><span className="font-medium">Sage Green</span> - Introduces nature, renewal, and subtle vitality</li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Adaptations</h3>
                      <p className="text-gray-700 mb-4">
                        The neutral base palette allows for seasonal updates through accessories:
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h4 className="font-medium text-gray-900">Spring/Summer</h4>
                          <p className="text-gray-700">Add brighter sage greens, soft blues, or pale yellows through cushions, throws, and fresh flowers</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h4 className="font-medium text-gray-900">Fall/Winter</h4>
                          <p className="text-gray-700">Introduce deeper greens, rust tones, or warm terracotta with heavier textiles and ambient lighting</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Budget Tab */}
            {activeTab === 'budget' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Budget Breakdown</h3>
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-medium text-gray-900">Total Estimated Cost</h4>
                    <p className="text-2xl font-bold text-indigo-600">$23,000</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {budgetBreakdown.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                            <td className="px-6 py-4 text-sm text-gray-500">{item.items}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">{item.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {Math.round(parseInt(item.amount.replace(/[^0-9]/g, '')) / 23000 * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
                          <td className="px-6 py-4 text-sm text-gray-500"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">$23,000</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">100%</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Considerations</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Quality vs. Cost</h4>
                        <p className="text-gray-700 text-sm">
                          This design prioritizes quality for key pieces (sofa, flooring) while finding value in accessories and decorative elements. Investment pieces are selected for longevity and timeless appeal.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Phased Implementation</h4>
                        <p className="text-gray-700 text-sm">
                          The design can be implemented in phases, starting with structural elements (flooring, paint), then furniture, and finally accessories. This allows for budget flexibility over time.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Alternative Options</h4>
                        <p className="text-gray-700 text-sm">
                          For each category, we've identified potential cost-saving alternatives that maintain the design integrity while reducing overall expense.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost-Saving Alternatives</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">Engineered Oak Flooring</p>
                          <p className="text-sm text-gray-600">$3,200</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Luxury Vinyl Plank</p>
                          <p className="text-sm text-gray-600">$1,800 (Save $1,400)</p>
                        </div>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">Custom Sofa</p>
                          <p className="text-sm text-gray-600">$3,500</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Ready-made Sofa</p>
                          <p className="text-sm text-gray-600">$1,800 (Save $1,700)</p>
                        </div>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-100">
                        <div>
                          <p className="font-medium text-gray-900">Designer Lighting</p>
                          <p className="text-sm text-gray-600">$2,200</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Quality Retail Lighting</p>
                          <p className="text-sm text-gray-600">$1,200 (Save $1,000)</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Custom Cabinetry</p>
                          <p className="text-sm text-gray-600">$2,800</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">Modular System</p>
                          <p className="text-sm text-gray-600">$1,600 (Save $1,200)</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-gray-900">Potential Savings</p>
                        <p className="font-bold text-green-600">$5,300</p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium text-gray-900">Reduced Budget</p>
                        <p className="font-bold text-indigo-600">$17,700</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Designer Profile Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet the Designer</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%2520portrait%2520of%2520a%2520female%2520interior%2520designer%2520in%2520her%252030s%2520with%2520a%2520confident%2520expression%252C%2520stylish%2520business%2520casual%2520attire%252C%2520in%2520a%2520bright%2520modern%2520design%2520studio%2520with%2520soft%2520natural%2520lighting%2520and%2520minimal%2520background&width=400&height=400&seq=109&orientation=squarish"
                    alt="Emma Johnson - Interior Designer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex justify-center space-x-3 mb-4">
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition cursor-pointer">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition cursor-pointer">
                    <i className="fab fa-pinterest text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition cursor-pointer">
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-indigo-600 transition cursor-pointer">
                    <i className="fas fa-globe text-lg"></i>
                  </a>
                </div>
                <div className="text-center">
                  <button className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                    Contact Emma
                  </button>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Emma Johnson</h3>
                <p className="text-indigo-600 font-medium mb-4">Minimalist Design Specialist</p>
                <p className="text-gray-700 mb-4">
                  Emma Johnson is an award-winning interior designer with over 10 years of experience specializing in minimalist and modern design. With a background in architecture and a passion for creating serene, functional spaces, Emma has transformed hundreds of homes across the country.
                </p>
                <p className="text-gray-700 mb-6">
                  Her design philosophy centers on the belief that thoughtfully curated spaces with quality materials and clean lines create the most impactful and livable environments. Emma is known for her attention to detail, innovative space planning, and ability to balance aesthetics with functionality.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Specializations</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex items-center">
                        <i className="fas fa-check text-indigo-600 mr-2 text-sm"></i>
                        <span>Minimalist Design</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-indigo-600 mr-2 text-sm"></i>
                        <span>Open Concept Spaces</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-indigo-600 mr-2 text-sm"></i>
                        <span>Sustainable Materials</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-check text-indigo-600 mr-2 text-sm"></i>
                        <span>Space Optimization</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Credentials</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li className="flex items-center">
                        <i className="fas fa-award text-indigo-600 mr-2 text-sm"></i>
                        <span>NCIDQ Certified</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-award text-indigo-600 mr-2 text-sm"></i>
                        <span>LEED Accredited Professional</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-award text-indigo-600 mr-2 text-sm"></i>
                        <span>Masters in Interior Architecture</span>
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-award text-indigo-600 mr-2 text-sm"></i>
                        <span>Design Excellence Award 2024</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Similar Designs Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Designs You May Like</h2>
            <a href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/c761db2b-969d-464a-962c-21122bcd0370" data-readdy="true" className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
              View All <i className="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarDesigns.map((design) => (
              <div key={design.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="h-64 overflow-hidden">
                  <img
                    src={design.imageUrl}
                    alt={design.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{design.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-indigo-700 font-medium">{design.designer.charAt(0)}</span>
                      </div>
                      <span className="text-sm text-gray-700">{design.designer}</span>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition cursor-pointer !rounded-button">
                      <i className="far fa-heart"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Inquiry Form Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Request More Information</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form id="inquiryForm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">Project Timeline</label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="">Select timeline</option>
                    <option value="Immediate (1-2 months)">Immediate (1-2 months)</option>
                    <option value="Soon (3-6 months)">Soon (3-6 months)</option>
                    <option value="Planning Phase (6+ months)">Planning Phase (6+ months)</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                    <option value="$20,000 - $30,000">$20,000 - $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us about your space, specific requirements, or any questions you have..."
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="consent"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-gray-700">
                  I agree to receive communications about this design and related services.
                </label>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button"
                >
                  Request Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">InteriorVision</h3>
              <p className="mb-4">Transforming spaces into beautiful, functional homes since 2020.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                  <i className="fab fa-pinterest-p"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/c761db2b-969d-464a-962c-21122bcd0370" data-readdy="true" className="hover:text-white transition">Designs</a></li>
                <li><a href="#" className="hover:text-white transition">Designers</a></li>
                <li><a href="#" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Newsletter</h4>
              <p className="mb-4">Subscribe to get the latest design inspiration and tips.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-gray-800 text-white border-none rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm flex-grow"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2025 InteriorVision. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <i className="fab fa-cc-visa text-2xl mr-2"></i>
                <i className="fab fa-cc-mastercard text-2xl mr-2"></i>
                <i className="fab fa-cc-paypal text-2xl mr-2"></i>
                <i className="fab fa-cc-amex text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App
