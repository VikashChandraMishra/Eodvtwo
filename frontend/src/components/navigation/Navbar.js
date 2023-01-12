import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    const location = useLocation();

    useEffect(() => {
    }, [location])

    return (
        <nav className="bg-slate-700 shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <a href="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-slate-50 text-base md:text-3xl">GPlus</span>
                            </a>
                        </div>
                        <div className="md:flex items-center space-x-1" id="home">
                            <Link to="/" className="px-2 py-4 text-green-500 text-xs md:text-lg font-semibold">Home</Link>
                            {
                                localStorage.getItem('user') === 'admin' &&
                                <Link to="/admin/dashboard" className="px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                                >Dashboard</Link>
                            }
                            {
                                localStorage.getItem('user') === 'admin' &&
                                <Link to="/admin/register" className="px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                                >Register</Link>
                            }
                            {
                                localStorage.getItem('user') &&
                                <Link to="/" className="px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300" onClick={logout} >Logout</Link>
                            }
                            {/* <a
                                href="/"
                                className="px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                            >About</a
                            >
                            <a
                                href="/"
                                className="px-2 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                            >Contact Us</a
                            > */}
                        </div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 bg-slate-50 cursor-pointer md:hidden block" data-bs-toggle="collapse" data-bs-target="me">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg> */}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;