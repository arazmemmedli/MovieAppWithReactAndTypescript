import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import shortid from "shortid";
import { IRegister } from "../types/type";
import Search from "./Search";
import { AuthContext, IToken } from '../context/auth';
import { motion, AnimatePresence } from "framer-motion";

function Header() {
    const [scroll, setScroll] = useState(false);
    const [active, setActive] = useState(false);
    const { authTokens, handleLogout, deleteAccount } = useContext(AuthContext) as IToken

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    useEffect(() => {

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <header className={`${scroll && "bg-[rgb(20,20,20)]"} fixed top-0 z-50 transition-all w-full`}>
            <div className="w-full flex items-center h-[68px] px-4 md:px-12 justify-between">
                <div className="flex items-center space-x-5">
                    <Link to={"/"}>
                        <img
                            src="https://rb.gy/ulxxee"
                            width={100}
                            height={100}
                            className="cursor-pointer object-contain"
                        />
                    </Link>
                    <ul className="hidden md:inline-flex space-x-5 items-center">
                        <li>
                            <Link to={"/"}>
                                <span className="text-[#e5e5e5]">Ana Sayfa</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                    <Search />
                    <div className="relative">
                        <div className="block">
                            {
                                authTokens !== null ? <button onClick={() => active === false ? setActive(true) : setActive(false)} className="text-white font-semibold inline-block w-8 h-8 text-xl rounded-[50%] bg-red-600">{authTokens.yourname.charAt(0)}</button> : <Link to={'/account'} className='block'>
                                    <img
                                        src="https://rb.gy/g1pwyx"
                                        alt=""
                                        className="cursor-pointer rounded"
                                    />
                                </Link>
                            }
                        </div>
                        <AnimatePresence>
                            {
                                active && <motion.div initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                                    transition={{ duration: 0.5 }}
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Link
                                        to={"/profile"}
                                        className={"block px-4 py-2 text-sm transition-colors duration-300 ease-out text-gray-700 hover:bg-gray-200"}
                                    >
                                        Your Profile
                                    </Link>
                                    <Link
                                        to={"/favourites"}
                                        className={"block px-4 py-2 text-sm transition-colors duration-300 ease-out text-gray-700 hover:bg-gray-200"}
                                    >
                                        Favourites
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleLogout()
                                            setActive(false)
                                        }}
                                        className={"block px-4 py-2 w-full text-left text-sm transition-colors duration-300 ease-out text-gray-700 hover:bg-gray-200"}
                                    >
                                        Sign out
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            deleteAccount()
                                            setActive(false)
                                        }}
                                        className={"block px-4 py-2 w-full text-left text-sm transition-colors duration-300 ease-out text-gray-700 hover:bg-gray-200"}
                                    >
                                        Delete Account
                                    </button>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;