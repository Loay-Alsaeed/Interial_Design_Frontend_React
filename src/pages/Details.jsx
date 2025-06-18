import {React, useState, useEffect} from 'react';
// import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { useDesigns } from "../context/DesignContext";
import { useStyle } from "../context/StyleContext";


export default function Design() {
  const [design, setDesign] = useState(null);
  const [style, setStyle] = useState(null);
  const { id } = useParams();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { designs } = useDesigns();
  const { stylesProvider } = useStyle();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
// const [simelerDesigns, setSimilarDesigns] = useState(designs);

// useEffect(() => {
//   if (design) {
//     console.log("✅ Design updated:", design);
//   }
// }, [design]);

useEffect(() => {
  if (designs.length > 0) {
    const foundDesign = designs.find((d) => d.id === id); 
    if (foundDesign) {
      setDesign(foundDesign);
    } else {
      console.warn("🔍 Design not found for id:", id);
    }
  }
}, [designs, id]);

useEffect(() => {
  if (design) {
    const style = stylesProvider.find((s) => s.id === design.styleId);
    if (style) {
     setStyle(style);
     console.log("✅ Style found for design:", style);
    } else {
      console.warn("🔍 Style not found for design:", design);
    }
  }
}, [design, stylesProvider, id]);




// const handleSimelerDesigns = () => {
//   let result = designs.filter((design) => (design.style !== design.style && design.id !== id));
//   setSimilarDesigns(result);
// }

  const handleSubmit = () => {} 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  
  
  // const fetchDesigns = async () => {
  //   try {
  //     const res = await axios.get(`http://localhost:5000/api/designs/${id}`);
  //     setDesign(res.data);
  //     console.log("✅ Loaded design:", res.data);
  //   } catch (err) {
  //     console.error("Failed to load design", err);
  //   }
  // };

  useEffect(() => {
    // fetchDesigns();
    // handleSimelerDesigns();
  }, []);

  const roomImages = Array.isArray(design?.images)
  ? design.images
      .filter((img) => img && img.imageUrl) // تأكد أن الصورة موجودة ولها imageUrl
      .map((img, index) => ({
        id: img.id,
        url: `${baseURL}/${img.imageUrl}`,
        alt: `Image ${index + 1}`
      }))
  : [];


  // console.log("Room images:", roomImages);
  

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };




  if (!design ) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  } else {
    return (
      <>
      
      <div className="min-h-screen bg-gray-50">
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link to={'/'} className="hover:text-indigo-600">Home</Link>
            <FaChevronRight className="mx-2 text-xs text-gray-400"/>
            <Link to={'/design'} className="hover:text-indigo-600">Designs</Link>
            <FaChevronRight className="mx-2 text-xs text-gray-400"/>
            <span className="text-gray-900">{design.title}</span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            to={'/'}
            data-readdy="true"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer">
            <FaChevronLeft className="mr-2"/>
            <span>Back to Designs</span>
          </Link>
        </div>
        {/* Image Gallery and Info Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:w-2/3 relative">
            <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
              {
                roomImages.length > 0 ? 
                <img
                src={roomImages[currentSlide].imageUrl || roomImages[currentSlide].url}
                alt={roomImages[currentSlide].alt}
                className="w-full h-full object-cover"
              /> : 
              <img
                src={`${baseURL}/images/default.png`}
                alt='default image'
                className="w-full h-full object-cover"
              />
              }
             
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer !rounded-button"
              > {isFavorite ? <FaHeart className="text-red-500"/> : <FaRegHeart className="text-gray-600"/>}
              </button>
              {/* Prev/Next Buttons */}
              <button onClick={() => setCurrentSlide((currentSlide - 1 + roomImages.length) % roomImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition cursor-pointer !rounded-button"
              ><FaChevronLeft className="text-gray-800"/>
              </button>
              <button onClick={() => setCurrentSlide((currentSlide + 1) % roomImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition cursor-pointer !rounded-button">
                <FaChevronRight className="text-gray-800"/>
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
                <h1 className="text-3xl font-bold text-gray-900">{design.title}</h1>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-indigo-600 cursor-pointer !rounded-button">
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className="text-gray-500 hover:text-red-500 cursor-pointer !rounded-button"
                  > {isFavorite? <FaHeart className='text-red-500'/> : <FaRegHeart className='text-gray-500'/>} 
                  </button>
                </div>
              </div>
              {/* {Designer Info}
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
              </div> */}
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-2">
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStar/>
                  <FaStarHalfAlt/>
                </div>
                <span className="text-gray-600">4.5 (28 reviews)</span>
              </div>
              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Room Size</p>
                  <p className="font-medium">{design.sizeHeight * design.sizeWidth} sq ft ({design.sizeHeight}' x {design.sizeWidth}')</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Style</p>
                  <p className="font-medium">{
                  style ? style.title : ''
                  }</p>
                </div>
                
              </div>
             {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Concept</h3>
                  {design.concepts && design.concepts.length > 0 && (
                    design.concepts.map((concept) => (
                      <p key={concept.id} className="text-gray-700">
                        {concept.concept}
                      </p>
                    ))
                  )}
                </div>

              {/* CTA Button */}
              <button
                id="requestDesignBtn"
                onClick={() => {
                  document.getElementById('inquiryForm')?.scrollIntoView({ behavior: 'smooth' });
                  setFormData(prev => ({
                    ...prev,
                    message: `I am interested in the ${design.title} design.`
                  }));
                }}
                className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition whitespace-nowrap cursor-pointer !rounded-button">
                Request This Design
              </button>
              
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
              
            </nav>
          </div>
          {/* Tab Content */}
          <div className="py-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Philosophy</h3>
                  {
                    design.descriptions.map((desc) => (
                      <p key={desc.id} className="text-gray-700 mb-4">{desc.content}</p>
                    )) 
                  }
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    {design.keyFeatures.map((feature) => (
                        <li key={id}>{feature.content}</li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Furniture Layout</h3>
                  <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <img
                    src={`${baseURL}/${design.layoutImageUrl}`}
                      alt="Furniture Layout"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Design Considerations</h3>
                  <div className="space-y-4">
                    {design.designConsiderations.map((consideration) => (
                      <div key={consideration.id} className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">{consideration.title}</h4>
                      <p className="text-gray-700 text-sm">{consideration.description}</p>
                    </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Materials Tab */}
            {activeTab === 'materials' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Materials Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {design.designMaterials.map((material) => (
                    <div key={material.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="h-40 bg-gray-100 rounded-md mb-4 overflow-hidden">
                        <img
                          src={`${baseURL}/${material.imageUrl}`}
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
                        {design.designMaterials.map((material, index) => (
                          <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{material.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.application}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.sustainability}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.maintenance}</td>
                        </tr>
                        ))}
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
                  {design.colors.map((color) => (
                    <div key={color.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center">
                      <div
                        className="w-full h-32 rounded-md mb-3"
                        style={{ backgroundColor: color.colorNumber }}
                      ></div>
                      <h4 className="font-medium text-gray-900 text-center">{color.name}</h4>
                      <p className="text-gray-500 text-sm mb-1">{color.colorNumber}</p>
                      <p className="text-gray-600 text-xs text-center">{color.application}</p>
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
                      {design.colors.map((color, index) => (
                        <li key={index} className="flex items-start">
                        <div className="w-4 h-4 rounded-full bg-[#F8F8F8] mt-1 mr-3 border border-gray-200"></div>
                        <div>
                          <span className="font-medium">{color.name}</span> - {}{color.application}
                        </div>
                      </li>
                      ))}
                      
                    </ul>
                  </div>
                  {/* <div>
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
                  </div> */}
                </div>
              </div>
            )}
            
          </div>
        </div>
        {/* Designer Profile Section */}
        {/* <div className="mb-12">
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
        </div> */}
        {/* Similar Designs Section */}

        {/* {(simelerDesigns && simelerDesigns.length > 0) &&
         <div className="mb-12">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-gray-900">Similar Designs You May Like</h2>
           <Link to={'/'} className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer">
             View All <iFaChevronRight className="ml-1"/>
           </Link> 
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {simelerDesigns.map((design) => (
             <div key={design._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
               <div className="h-64 overflow-hidden">
                 <Link to={`/design/${design._id}`} className="block h-full">
                   <img
                     src={`http://localhost:5000/uploads/${design.images[0]}`}
                     alt={design.title}
                     className="w-full h-full object-cover hover:scale-105 transition duration-500"
                     />
                 </Link>
               </div>
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{design.title}</h3>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center">
                     <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                       <span className="text-indigo-700 font-medium">L</span>
                     </div>
                     <span className="text-sm text-gray-700">Loay Alsaeed</span>
                   </div>
                   <button className="text-gray-400 hover:text-red-500 transition cursor-pointer !rounded-button">
                   {isFavorite? <FaHeart className='text-red-500'/> : <FaRegHeart className='text-gray-500'/>}
                   </button>
                 </div>
               </div>
             </div>
           ))}
         </div>
       </div> } */}
       
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
                {/* <div>
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
                </div> */}
                {/* <div>
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
                </div> */}
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
                >Request Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
     
      
      </div>
    </>
  )
  }
}