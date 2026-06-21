import { Link } from "react-router-dom";

function MenuItem({ item }) {
    return (
        <li className="py-3">
            <Link to={item.href} className="text-zinc-900">
                {item.title}
            </Link>
        </li>
    );
}

export default MenuItem;