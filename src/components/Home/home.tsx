// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const App: React.FC = () => {
const [searchQuery, setSearchQuery] = useState('');
const [selectedStyle, setSelectedStyle] = useState('');
const [selectedRoom, setSelectedRoom] = useState('');
const [budgetRange, setBudgetRange] = useState('');
const designStyles = ['Minimalist', 'Scandinavian', 'Industrial', 'Modern', 'Contemporary', 'Bohemian'];
const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room'];
const budgetRanges = ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+'];
const featuredDesigns = [
{
id: 1,
title: 'Modern Minimalist Living Room',
description: 'Clean lines and neutral colors create a calm, inviting space.',
designer: 'Emma Johnson',
likes: 128,
image: 'https://readdy.ai/api/search-image?query=A%20modern%20minimalist%20living%20room%20with%20clean%20lines%2C%20neutral%20colors%2C%20large%20windows%2C%20natural%20light%2C%20comfortable%20seating%2C%20wooden%20accents%2C%20and%20a%20statement%20light%20fixture.%20The%20space%20features%20a%20plush%20sofa%2C%20coffee%20table%2C%20and%20minimal%20decor%20for%20a%20calm%20inviting%20atmosphere&width=600&height=400&seq=1&orientation=landscape'
},
{
id: 2,
title: 'Scandinavian Bedroom Retreat',
description: 'Light and airy bedroom with natural materials and soft textures.',
designer: 'Alex Peterson',
likes: 94,
image: 'https://readdy.ai/api/search-image?query=A%20bright%20Scandinavian%20bedroom%20with%20white%20walls%2C%20light%20wood%20floors%2C%20a%20cozy%20bed%20with%20white%20linens%20and%20textured%20throws%2C%20minimalist%20furniture%2C%20natural%20materials%2C%20indoor%20plants%2C%20and%20soft%20ambient%20lighting%20creating%20a%20peaceful%20retreat%20atmosphere&width=600&height=400&seq=2&orientation=landscape'
},
{
id: 3,
title: 'Industrial Kitchen Design',
description: 'Exposed brick, metal fixtures, and wood elements for a stylish cooking space.',
designer: 'Michael Chen',
likes: 156,
image: 'https://readdy.ai/api/search-image?query=An%20industrial%20style%20kitchen%20with%20exposed%20brick%20walls%2C%20metal%20pendant%20lights%2C%20stainless%20steel%20appliances%2C%20open%20shelving%2C%20a%20large%20island%20with%20wooden%20countertop%2C%20black%20metal%20fixtures%2C%20concrete%20floors%2C%20and%20minimalist%20decor%20creating%20a%20stylish%20cooking%20space&width=600&height=400&seq=3&orientation=landscape'
},
{
id: 4,
title: 'Contemporary Home Office',
description: 'Functional workspace with modern furniture and smart storage solutions.',
designer: 'Sarah Williams',
likes: 87,
image: 'https://readdy.ai/api/search-image?query=A%20contemporary%20home%20office%20with%20a%20sleek%20desk%2C%20ergonomic%20chair%2C%20built-in%20shelving%2C%20modern%20lighting%2C%20minimalist%20decor%2C%20technology%20integration%2C%20neutral%20color%20palette%20with%20accent%20colors%2C%20and%20large%20windows%20providing%20natural%20light%20in%20a%20functional%20workspace&width=600&height=400&seq=4&orientation=landscape'
},
{
id: 5,
title: 'Bohemian Dining Room',
description: 'Eclectic mix of patterns, textures, and global-inspired elements.',
designer: 'Olivia Martinez',
likes: 112,
image: 'https://readdy.ai/api/search-image?query=A%20bohemian%20dining%20room%20with%20a%20wooden%20table%2C%20mismatched%20chairs%2C%20colorful%20textiles%2C%20hanging%20plants%2C%20woven%20pendant%20lights%2C%20global-inspired%20decor%20elements%2C%20patterned%20rug%2C%20eclectic%20wall%20art%2C%20and%20warm%20ambient%20lighting%20creating%20a%20vibrant%20gathering%20space&width=600&height=400&seq=5&orientation=landscape'
},
{
id: 6,
title: 'Luxury Bathroom Oasis',
description: 'Spa-like retreat with high-end fixtures and elegant finishes.',
designer: 'Daniel Thompson',
likes: 143,
image: 'https://readdy.ai/api/search-image?query=A%20luxury%20bathroom%20with%20marble%20surfaces%2C%20freestanding%20bathtub%2C%20walk-in%20glass%20shower%2C%20double%20vanity%20with%20elegant%20fixtures%2C%20large%20mirrors%2C%20ambient%20lighting%2C%20heated%20floors%2C%20plush%20towels%2C%20and%20minimal%20decor%20creating%20a%20spa-like%20retreat%20with%20high-end%20finishes&width=600&height=400&seq=6&orientation=landscape'
}
];
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white shadow-sm">
<div className="container mx-auto px-4 py-4 flex justify-between items-center">
<div className="flex items-center">
<h1 className="text-2xl font-bold text-indigo-600">InteriorVision</h1>
<nav className="hidden md:flex ml-10">
<a href="#" className="mx-3 text-gray-600 hover:text-indigo-600">Home</a>
<a href="#" className="mx-3 text-gray-600 hover:text-indigo-600">Designs</a>
<a href="#" className="mx-3 text-gray-600 hover:text-indigo-600">Designers</a>
<a href="#" className="mx-3 text-gray-600 hover:text-indigo-600">About</a>
<a href="#" className="mx-3 text-gray-600 hover:text-indigo-600">Contact</a>
</nav>
</div>
<div className="flex items-center">
<button className="text-gray-600 hover:text-indigo-600 mr-4 cursor-pointer whitespace-nowrap !rounded-button">Log In</button>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button">Sign Up</button>
<button className="md:hidden ml-4 text-gray-600">
<i className="fas fa-bars text-xl"></i>
</button>
</div>
</div>
</header>
{/* Hero Section */}
<section className="relative">
<div className="h-[500px] bg-cover bg-center relative" style={{
backgroundImage: `url('https://readdy.ai/api/search-image?query=A%20stunning%20modern%20interior%20design%20with%20soft%20natural%20lighting%2C%20featuring%20a%20spacious%20living%20area%20with%20elegant%20furniture%2C%20large%20windows%2C%20indoor%20plants%2C%20and%20tasteful%20decor.%20The%20left%20side%20has%20a%20gradient%20from%20light%20to%20transparent%20to%20ensure%20text%20readability%20while%20maintaining%20visual%20harmony&width=1440&height=500&seq=7&orientation=landscape')`
}}>
<div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent">
<div className="container mx-auto px-4 h-full flex items-center">
<div className="max-w-lg text-white">
<h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Space</h1>
<p className="text-xl mb-8">Discover stunning interior designs curated by professional designers for every room and style preference.</p>
<button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition mr-4 cursor-pointer whitespace-nowrap !rounded-button">
Explore Designs
</button>
<button className="bg-white text-indigo-600 px-6 py-3 rounded-md hover:bg-gray-100 transition cursor-pointer whitespace-nowrap !rounded-button">
Find a Designer
</button>
</div>
</div>
</div>
</div>
</section>
{/* Search Section */}
<section className="py-8 bg-white shadow-md">
<div className="container mx-auto px-4">
<div className="flex flex-col md:flex-row items-center justify-between gap-4">
<div className="relative w-full md:w-1/3">
<input
type="text"
placeholder="Search designs..."
className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
<i className="fas fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
</div>
<div className="flex flex-wrap gap-4 w-full md:w-2/3 justify-end">
<div className="relative w-full sm:w-auto">
<select
className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-sm"
value={selectedStyle}
onChange={(e) => setSelectedStyle(e.target.value)}
>
<option value="">All Styles</option>
{designStyles.map((style, index) => (
<option key={index} value={style}>{style}</option>
))}
</select>
<i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
</div>
<div className="relative w-full sm:w-auto">
<select
className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-sm"
value={selectedRoom}
onChange={(e) => setSelectedRoom(e.target.value)}
>
<option value="">All Rooms</option>
{roomTypes.map((room, index) => (
<option key={index} value={room}>{room}</option>
))}
</select>
<i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
</div>
<div className="relative w-full sm:w-auto">
<select
className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-sm"
value={budgetRange}
onChange={(e) => setBudgetRange(e.target.value)}
>
<option value="">All Budgets</option>
{budgetRanges.map((budget, index) => (
<option key={index} value={budget}>{budget}</option>
))}
</select>
<i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
</div>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button">
<i className="fas fa-filter mr-2"></i>Apply Filters
</button>
</div>
</div>
</div>
</section>
{/* Design Gallery */}
<section className="py-12">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Designs</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{featuredDesigns.map((design) => (
<div key={design.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
<div className="relative h-64 overflow-hidden">
<a href="https://readdy.ai/home/8c839a71-b4e9-4f0d-a605-e191f54b3163/5de3077f-66ad-4a1d-a0f9-669c652ecc2f" data-readdy="true">
<img
src={design.image}
alt={design.title}
className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
/>
</a>
<button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer !rounded-button">
<i className="far fa-heart text-gray-600"></i>
</button>
</div>
<div className="p-6">
<h3 className="text-xl font-bold mb-2 text-gray-800">{design.title}</h3>
<p className="text-gray-600 mb-4">{design.description}</p>
<div className="flex justify-between items-center">
<div className="flex items-center">
<div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
<span className="text-indigo-600 font-medium">{design.designer.charAt(0)}</span>
</div>
<span className="text-gray-700">{design.designer}</span>
</div>
<div className="flex items-center text-gray-500">
<i className="fas fa-heart mr-1 text-red-500"></i>
<span>{design.likes}</span>
</div>
</div>
</div>
</div>
))}
</div>
<div className="mt-12 text-center">
<button className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md hover:bg-indigo-50 transition cursor-pointer whitespace-nowrap !rounded-button">
Load More Designs
</button>
</div>
</div>
</section>
{/* CTA Section */}
<section className="py-16 bg-indigo-50">
<div className="container mx-auto px-4">
<div className="max-w-4xl mx-auto text-center">
<h2 className="text-3xl font-bold mb-4 text-gray-800">Can't Find What You're Looking For?</h2>
<p className="text-xl text-gray-600 mb-8">Let our professional designers create a custom interior design tailored to your specific needs and preferences.</p>
<button className="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition text-lg cursor-pointer whitespace-nowrap !rounded-button">
Request Custom Design
</button>
</div>
</div>
</section>
{/* Footer */}
<footer className="bg-gray-800 text-white py-12">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div>
<h3 className="text-xl font-bold mb-4">InteriorVision</h3>
<p className="text-gray-400 mb-4">Transforming spaces into beautiful, functional environments that reflect your personal style.</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-pinterest"></i>
</a>
</div>
</div>
<div>
<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Home</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Designs</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Designers</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Contact</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-semibold mb-4">Design Styles</h4>
<ul className="space-y-2">
{designStyles.map((style, index) => (
<li key={index}><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">{style}</a></li>
))}
</ul>
</div>
<div>
<h4 className="text-lg font-semibold mb-4">Contact Us</h4>
<ul className="space-y-2 text-gray-400">
<li className="flex items-start">
<i className="fas fa-map-marker-alt mt-1 mr-2"></i>
<span>123 Design Street, New York, NY 10001</span>
</li>
<li className="flex items-center">
<i className="fas fa-phone-alt mr-2"></i>
<span>(123) 456-7890</span>
</li>
<li className="flex items-center">
<i className="fas fa-envelope mr-2"></i>
<span>info@interiorvision.com</span>
</li>
</ul>
</div>
</div>
<div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400">© 2025 InteriorVision. All rights reserved.</p>
<div className="mt-4 md:mt-0 flex space-x-6">
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Privacy Policy</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Terms of Service</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Cookie Policy</a>
</div>
<div className="mt-4 md:mt-0 flex items-center space-x-4">
<span className="text-gray-400">Payment Methods:</span>
<i className="fab fa-cc-visa text-xl text-gray-300"></i>
<i className="fab fa-cc-mastercard text-xl text-gray-300"></i>
<i className="fab fa-cc-paypal text-xl text-gray-300"></i>
<i className="fab fa-cc-amex text-xl text-gray-300"></i>
</div>
</div>
</div>
</footer>
</div>
);
}
export default App
