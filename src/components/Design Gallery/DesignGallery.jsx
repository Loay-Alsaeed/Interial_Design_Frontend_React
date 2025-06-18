import React, { useState, useEffect } from 'react';
import { IoIosHeart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDesigns } from "../../context/DesignContext";
import Filter from '../Filter/Filter';
import { useStyle } from '../../context/StyleContext';
import {useCategory} from '../../context/CategoryContext'; 

export default function DesignGallery({title}) {
    const { designs } = useDesigns();
    const { stylesProvider } = useStyle(); 
    const {categoriesProvider} = useCategory();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filtered, setFiltered] = useState([]); 
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    
    useEffect(() => {
        setFiltered(designs);
    }, [designs]);

    // useEffect(() => {
    //     console.log("Styles Provider:", stylesProvider);
    // }, [stylesProvider])
    

    // const designStyles = ['Minimalist', 'Scandinavian', 'Industrial', 'Modern', 'Contemporary', 'Bohemian', '2D Plan', '3D Design'];
    
    // const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room'];

    const handleFilter = () => {
    const result = designs.filter((design) => {
        const matchesSearch = design.title.toLowerCase().includes(searchQuery.toLowerCase());

        // تحقق من المطابقة بالـ style حسب styleId وليس design.id
        const matchesStyle = !selectedStyle || selectedStyle === '' ? true : design.styleId === selectedStyle.id;

        // const matchesRoom = selectedRoom ? design.roomType === selectedRoom : true;
        const matchesRoom = !selectedCategory || selectedCategory === '' ?  true : design.categoryId === selectedCategory.id;

        return matchesSearch && matchesStyle && matchesRoom;
    });

    setFiltered(result);
};

    // console.log(selectedCategory);
    return (
        <>
            <Filter
                designStyles={stylesProvider}
                designCategory={categoriesProvider}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onApplyFilter={handleFilter} // ✅ ممرر باسم جديد وواضح
            />
            <section className="pb-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">{title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.length > 0 ?  filtered.map((design) => (
                            <div key={design.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition group cursor-pointer">
                                <div className="relative h-64 overflow-hidden">
                                    <Link to={`/design/${design.id}`} className="absolute inset-0">
                                    <img
                                        src={
                                            design.images && design.images.length > 0 && design.images[0].imageUrl
                                            ? `${baseURL}/${design.images[0].imageUrl}`
                                            : `${baseURL}/images/default.png`
                                        }
                                        alt={design.title || 'default image'}
                                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                                        />
                                    </Link>
                                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer !rounded-button">
                                        <IoIosHeart className='text-gray-600' />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800">{design.title}</h3>
                                    <p className="text-gray-600 mb-4">{design.subTitle}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            {/* <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                                                <span className="text-indigo-600 font-medium ">L</span>
                                            </div> */}
                                            <span className="text-gray-700"></span>
                                        </div>
                                        {/* <div className="flex items-center text-gray-500">
                                            <IoIosHeart className=' mr-1 text-red-500' />
                                            <span>{design.likes}</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        )) : <div className="col-span-3 text-center text-gray-500">No designs found.</div>}
                    </div>
                </div>
            </section>
        </>
    );
}
