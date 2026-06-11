import { useState, useRef, useEffect } from "react";
import { ChevronDown } from 'lucide-react'
import { Link } from "react-router-dom";

function DropdownMenuItem({ item }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const ref = useRef(null);
    const [dropdownHeight, setDropdownHeight] = useState("0px");

    useEffect(() => {
        if (isDropdownOpen) {
            setDropdownHeight(`${ref.current.scrollHeight}px`);
        } else {
            setDropdownHeight("0px");
        }
    }, [isDropdownOpen]);

    return (
        <li className="py-3">
            <div
                className="flex items-center justify-between cursor-pointer">
                <Link to={item.href} className="text-zinc-900">
                    {item.title}
                </Link>

                <ChevronDown size={32}
                    strokeWidth={1.5}
                    className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""
                        }`} onClick={() => setIsDropdownOpen(prev => !prev)}
                />
            </div>

            <ul
                ref={ref}
                style={{ maxHeight: dropdownHeight }}
                className="flex flex-col overflow-hidden transition-all duration-300 bg-white divide-y divide-zinc-300"
            >
                {item.children.map((sub, i) => (
                    <li key={i} className="px-10 py-2">
                        <Link to={sub.href} className="text-zinc-900">
                            {sub.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}

export default DropdownMenuItem;