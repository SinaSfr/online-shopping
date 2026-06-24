import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function WebMenu({ menuItems }) {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <nav>
            <ul className="flex items-center gap-8">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="relative"
                        onMouseEnter={() => setActiveMenu(index)}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        {item.children ? (
                            <>
                                <button className="flex items-center gap-1 text-sm font-medium">
                                    {item.title}
                                    <ChevronDown size={16} />
                                </button>

                                {activeMenu === index && (
                                    <ul className="absolute top-full right-0 mt-3 min-w-[220px] rounded-lg border border-zinc-200 bg-white shadow-lg overflow-hidden">
                                        {item.children.map((child, childIndex) => (
                                            <li key={childIndex}>
                                                <Link
                                                    to={child.href}
                                                    className="block px-4 py-3 text-sm hover:bg-zinc-100"
                                                >
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={item.href}
                                className="text-sm font-medium hover:text-zinc-500 transition-colors"
                            >
                                {item.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default WebMenu;