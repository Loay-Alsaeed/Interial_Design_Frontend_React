import { CiMenuFries } from "react-icons/ci";
import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import { useState } from "react";


const Header = () => {
const { token, logout } = useAuth();
 const [isMenuVisible, setIsMenuVisible] = useState(false);

const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
}

const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
}
window.addEventListener("scroll", () => {
    setIsMenuVisible(false);
}
);



    return (
        <>
        <header className="bg-white shadow-md border-b-2 border-gray-200 ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">InteriorVision</h1>
                <nav className="hidden md:flex ml-10 space-x-6 rtl:space-x-reverse">
                    <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>

                    {/* Dropdown for Designs */}
                    <div className="relative group">
                        <button className="text-gray-600 hover:text-indigo-600">Designs</button>
                        <div className="absolute hidden group-hover:block hover:block bg-white shadow-md rounded-md  w-40 z-10">
                            <Link to="/design" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">All Designs</Link>
                            <Link to="/2d" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">2D Plan</Link>
                            <Link to="/3d" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">3D Design</Link>
                        </div>
                    </div>

                    <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
                </nav>
                </div>

                <div className="flex items-center">
                    {token && (
                        <button className="hidden md:flex bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button"
                            onClick={handleLogout}>
                            Log out
                        </button>
                    )}
                    {!token && (<>
                        <button className="hidden md:flex text-gray-600 hover:text-indigo-600 mr-4 cursor-pointer whitespace-nowrap !rounded-button">
                        <Link to="/login">Log In</Link> 
                        </button>
                        <button className="hidden md:flex bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button">
                        <Link to="/signup">Sign Up</Link>
                        </button>
                    </>)}
                    <button onClick={toggleMenu}
                     className="md:hidden ml-4 text-gray-600">
                        <CiMenuFries size={24} className="cursor-pointer" />
                    </button>
                </div>
            </div>
        </header>
        {isMenuVisible && 
           <div className="md:hidden bg-white shadow-md border-b-2 border-gray-200 py-4 w-[200px] fixed top-[64px] right-0 h-fit z-50">
            <nav className="container mx-auto px-4 flex flex-col justify-center text-right gap-5">
                <Link to="/" className="mx-3 text-gray-600 hover:text-indigo-600 hover:border-b-2">Home</Link>
                <Link to="/design" className="mx-3 text-gray-600 hover:text-indigo-600 hover:border-b-2">Designs</Link>
                <Link to="/contact" className="mx-3 text-gray-600 hover:text-indigo-600 hover:border-b-2">Contact</Link>
                {!token && 
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button">
                    <Link to="/login">Log In</Link> 
                </button>}
                {token && (
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition cursor-pointer whitespace-nowrap !rounded-button"
                        onClick={handleLogout}>
                        Log out
                    </button>
                )}
            </nav>
        </div> 
        }
        
        </>
    );
}

export default Header;