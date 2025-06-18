import React from 'react'
import { Link } from "react-router-dom";
import heroImage from "../../assets/home.jpg"; // Adjust the path as necessary

export default function Hero() {
  return (
      <>
        <section className="relative">
            <div className="h-[500px] bg-cover bg-center relative" style={{
                backgroundImage: `url(${heroImage})`,
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="max-w-lg text-white">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Transform Your Space</h1>
                            <p className="text-xl mb-8">Discover stunning interior designs curated by professional designers for every room and style preference.</p>
                            <Link to={"/design"}>
                                <button  className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition mr-4 mb-4 cursor-pointer whitespace-nowrap !rounded-button">
                                Explore Designs
                                </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
  )
}
