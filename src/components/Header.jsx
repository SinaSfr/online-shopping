import MobileMenu from "./MobileMenu"
import { Menu } from 'lucide-react'
import Logo from '../assets/images/logo.png'
import { useState } from 'react'
import { Link } from "react-router-dom"


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <header className="border-b border-zinc-400 pb-2">
            <div className="mx-auto max-lg:w-[90%] max-xl:w-[97%] xl:max-w-7xl">
                <section className="flex items-center justify-between">
                    <button onClick={() => setIsMenuOpen(true)}>
                        <Menu size={32} />
                    </button>
                    <Link to="/"><img src={Logo} alt="logo-header" width="67" height="11"
                        loading="lazy" className="transition-all duration-300 hover:scale-90" /></Link>
                </section>
                <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </div>
        </header>
    )
}

export default Header