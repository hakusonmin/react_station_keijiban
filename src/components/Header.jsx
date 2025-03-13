import { Link } from "react-router-dom";
import "../Header.css";

function Header() {
    return (
        <header className="header">
            <h1><Link to="/">掲示板</Link></h1>
        </header>
    );
}

export default Header;

