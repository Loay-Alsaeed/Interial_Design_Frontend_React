
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";


export default function Filter({
    searchQuery,
    setSearchQuery,
    selectedStyle,
    setSelectedStyle,
    selectedCategory,
    setSelectedCategory,
    designStyles = [],
    designCategory = [],
    onApplyFilter // ✅ اسم جديد واضح
}) {
    return (
        <section className="py-8 pt-16 bg-white ">
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
                        <CiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' />
                    </div>
                    <div className="flex flex-wrap gap-4 w-full md:w-2/3 justify-end">
                        <div className="relative w-full sm:w-auto">
                            <select
                                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-sm"
                                value={selectedStyle?.title || "All Styles"}
                                onChange={(e) =>{

                                    setSelectedStyle(designStyles.find(style => style.title === e.target.value))
                                    // console.log("Selected Style:", designStyles.find(style => style.title === e.target.value));
                                }
                                } 
                            >
                                <option value="">All Styles</option>
                                {designStyles.map((style) => (
                                    <option key={style.id} value={style.title}>{style.title}</option>
                                ))}
                            </select>
                            <IoIosArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select
                                className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8 text-sm"
                                value={selectedCategory?.name || 'All Rooms'}
                                onChange={(e) => {
                                    setSelectedCategory(designCategory.find(category => category.name === e.target.value))
                                }}
                            >
                                <option value="">All Rooms</option>
                                {designCategory.map((category) => (
                                    <option key={category.id} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            <IoIosArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                        </div>
                        <button onClick={onApplyFilter}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button flex items-center gap-2">
                            <FiFilter />
                            <p>Apply Filters</p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
