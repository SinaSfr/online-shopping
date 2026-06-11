import { X } from 'lucide-react'
import Logo from '../assets/images/logo.png'
import { useState } from 'react'
import DropdownMenuItem from './DropDownMenuItem'
import MenuItem from './MenuItem'

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {

    const MenuItems = [
        {
            title: "صفحه اصلی",
            href: "/",
        },
        {
            title: "تورهای گردشگران",
            href: "#",
            children: [
                {
                    title: "ویزای شینگن",
                    href: "/visa/schengen",
                },
                {
                    title: "ویزای ترکیه",
                    href: "/visa/turkey",
                },
                {
                    title: "ویزای دبی",
                    href: "/visa/dubai",
                },
            ],
        },
        {
            title: "خدمات ویزا",
            href: "/visa-services",
        },
        {
            title: "مقالات",
            href: "/blog",
        },
        {
            title: "درباره ما",
            href: "/about",
        },
        {
            title: "تورهای گردشگران",
            href: "#",
            children: [
                {
                    title: "ویزای شینگن",
                    href: "/visa/schengen",
                },
                {
                    title: "ویزای ترکیه",
                    href: "/visa/turkey",
                },
                {
                    title: "ویزای دبی",
                    href: "/visa/dubai",
                },
            ],
        },
    ];

    return (
        <div
            className={`header-menu bg-white fixed z-30 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} inset-0 w-full transition-all duration-300 overflow-scroll`}>
            <div>
                <div className="flex items-center justify-between py-3 mx-auto w-[90%]">
                    <a href="/">
                        <img src={Logo} alt="logo-header" width="94"
                            height="34" loading="lazy"
                            className="transition-all duration-300 hover:scale-105" />
                    </a>
                    <button onClick={() => setIsMenuOpen(false)}>
                        <X width={36} height={36} strokeWidth={1.5} />
                    </button>
                </div>
            </div>
            <div className="pb-5 bg-white w-[90%] mx-auto">
                <nav className="pt-2">
                    <ul className="text-sm divide-y divide-zinc-300">
                        {MenuItems.map((item, i) =>
                            item.children ? (
                                <DropdownMenuItem key={i} item={item} />
                            ) : (
                                <MenuItem key={i} item={item} />
                            )
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default MobileMenu