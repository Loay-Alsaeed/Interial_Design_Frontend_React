import React from 'react'
import { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { FiFilter } from "react-icons/fi";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStyle, setSelectedStyle] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [budgetRange, setBudgetRange] = useState('');
    const designStyles = ['Minimalist', 'Scandinavian', 'Industrial', 'Modern', 'Contemporary', 'Bohemian'];
    const roomTypes = ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Dining Room'];
    const budgetRanges = ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '$20,000+'];


  return (
    <>
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
                        <CiSearch className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'/>
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
                            <IoIosArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'/>
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
                            <IoIosArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'/>
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
                            <IoIosArrowDown className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'/>
                        </div>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button
                        flex items-center gap-2">
                            <FiFilter />
                            <p>Apply Filters</p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
