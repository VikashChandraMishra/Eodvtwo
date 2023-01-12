import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    }

    const location = useLocation();

    const toggleNav = (e) => {
        document.getElementById('menu').classList.toggle('hidden');
    }

    useEffect(() => {
    }, [location])

    return (
        <nav className="bg-slate-700 shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <div>
                            <Link to="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-slate-50 text-base md:text-3xl">GPlus</span>
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-1" id="menu">
                            <Link to="/" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-green-500 transition duration-300">Home</Link>

                            {
                                localStorage.getItem('authToken') &&
                                <Link to={`/${localStorage.getItem('user')}/dashboard`} className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                                >Dashboard</Link>
                            }
                            {
                                (localStorage.getItem('user') === 'manager' || localStorage.getItem('user') === 'employee') &&
                                <Link to="/user/account" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                                >Account</Link>
                            }
                            {
                                localStorage.getItem('user') === 'admin' &&
                                <Link to="/admin/register" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-green-500 transition duration-300"
                                >Register</Link>
                            }
                            {
                                localStorage.getItem('user') &&
                                <Link to="/" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-green-500 transition duration-300" onClick={logout} >Logout</Link>
                            }
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="my-4 w-8 h-6 bg-slate-50 cursor-pointer md:hidden block" data-bs-toggle="collapse" data-bs-target="me" onClick={toggleNav}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;