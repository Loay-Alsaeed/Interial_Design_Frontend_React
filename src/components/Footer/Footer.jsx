import {React} from 'react';
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Footer() {
    const designStyles = ['Minimalist', 'Scandinavian', 'Industrial', 'Modern', 'Contemporary', 'Bohemian'];

  return (
    <>
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">InteriorVision</h3>
                        <p className="text-gray-400 mb-4">Transforming spaces into beautiful, functional environments that reflect your personal style.</p>
                        <div className="flex space-x-4">
                            <a href='#' className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FaFacebookF/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                                <RiTwitterXFill/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FiInstagram/>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
                                <FaPinterestP/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <Link to={'/'} >
                                <li className="text-gray-400 hover:text-white transition cursor-pointer">Home</li>
                            </Link>
                            <Link to={'/design'} >
                                <li className="text-gray-400 hover:text-white transition cursor-pointer">Designs</li>
                            </Link>
                            <Link to={'/contact'} >
                                <li className="text-gray-400 hover:text-white transition cursor-pointer">Contact Us</li>
                            </Link>
                            
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
                                <FaMapMarkerAlt className='mt-1 mr-2'/>
                                <span>Jordan, Amman</span>
                            </li>
                            <li className="flex items-center">
                                <FaPhoneAlt className='mr-2'/>
                                <span>(+962) 791065580</span>
                            </li>
                            <li className="flex items-center">
                                <MdEmail className='mr-2'/>
                                <span>loayalsaeed1234@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400">© 2025 InteriorVision. All rights reserved.</p>
                    <p className="text-gray-400">Developed by <a href="https://www.linkedin.com/in/loiy-alsaeed-118360271/" target="_blank" rel="noopener noreferrer" >Loiy Alsaeed</a></p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
