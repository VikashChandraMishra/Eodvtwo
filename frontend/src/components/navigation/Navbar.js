import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/Insight.png"

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
        <nav className="shadow-md w-full" style={{backgroundColor: '#a0c336'}}>
            <div className="max-w-7xl px-4">
                <div className="flex justify-between md:justify-start">
                    <div className="flex flex-col md:flex-row justify-between w-full">
                        <div>
                            <Link to="/" className="flex flex-col items-center py-4">
                                <img src={logo} alt="unavailable" className="w-32 h-12 md:w-40 md:h-14" />
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-1" id="menu">
                            <Link to="/" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-red-500 transition duration-300">Home</Link>

                            {
                                localStorage.getItem('authToken') &&
                                <Link to={`/${localStorage.getItem('user')}/dashboard`} className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-red-500 transition duration-300"
                                >Dashboard</Link>
                            }
                            {
                                (localStorage.getItem('user') === 'manager' || localStorage.getItem('user') === 'employee') &&
                                <Link to="/user/account" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-red-500 transition duration-300"
                                >Account</Link>
                            }
                            {
                                localStorage.getItem('user') === 'admin' &&
                                <Link to="/admin/register" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-red-500 transition duration-300"
                                >Register</Link>
                            }
                            {
                                localStorage.getItem('user') &&
                                <Link to="/" className="text-xs md:text-lg px-2 py-4 text-slate-50 font-semibold hover:text-red-500 transition duration-300" onClick={logout} >Logout</Link>
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