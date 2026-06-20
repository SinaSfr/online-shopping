import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import Logo from "../assets/images/logo.png";
import MobileMenu from "./MobileMenu";
import WebMenu from "./WebMenu";
import { MenuData } from "../data/menuData";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const token = localStorage.getItem("token");

    return (
        <header className="border-b border-zinc-300">
            <div className="mx-auto max-lg:w-[90%] max-xl:w-[97%] xl:max-w-7xl">

                <section className="flex items-center justify-between py-4">

                    {/* Right Side */}
                    <div className="flex items-center gap-8">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu size={32} />
                        </button>

                        {/* Desktop Menu */}
                        <div className="hidden lg:block">
                            <WebMenu menuItems={MenuData} />
                        </div>

                    </div>

                    {/* Logo */}
                    <Link to="/">
                        <img
                            src={Logo}
                            alt="logo-header"
                            width="94"
                            height="34"
                            loading="lazy"
                            className="transition-all duration-300 hover:scale-95"
                        />
                    </Link>

                    {/* Login / Dashboard */}
                    {token ? (
                        <Link
                            to="/dashboard"
                            className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                        >
                            حساب کاربری
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-lg bg-black px-4 py-2 text-sm text-white"
                        >
                            ورود
                        </Link>
                    )}

                </section>

                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

            </div>
        </header>
    );
}

export default Header;