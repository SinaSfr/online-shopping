import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

function WebMenu({ menuItems }) {
    return (
        <nav>
            <ul className="flex items-center gap-8">

                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className="group relative"
                    >

                        {item.children ? (
                            <>
                                <button className="flex items-center gap-1 text-sm font-medium">
                                    {item.title}
                                    <ChevronDown size={16} />
                                </button>

                                <div
                                    className="
                                        invisible absolute top-full right-0 z-20 mt-3
                                        min-w-[220px]
                                        translate-y-2
                                        opacity-0
                                        transition-all duration-200
                                        group-hover:visible
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    "
                                >
                                    <ul className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                                        {item.children.map((child, childIndex) => (
                                            <li key={childIndex}>
                                                <Link
                                                    to={child.href}
                                                    className="
                                                        block px-4 py-3 text-sm
                                                        transition-colors
                                                        hover:bg-zinc-100
                                                    "
                                                >
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link
                                to={item.href}
                                className="
                                    text-sm font-medium
                                    transition-colors
                                    hover:text-zinc-500
                                "
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