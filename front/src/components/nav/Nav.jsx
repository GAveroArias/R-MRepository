import { Link } from "react-router-dom";
import SearchBar from "../searchbar/SearchBar";
import LogoRM from "../../components/nav/LogoRM.png";

function Nav({ onSearch }) {
    return (
        <div className="NavContainer">
            <div className="NavLinks">
                <Link to="/home">
                    <button>Home</button>
                </Link>
                <Link to="/about">
                    <button>About</button>
                </Link>
                <Link to="/favorites">
                    <button>Favorites</button>
                </Link>
                <Link to="/form">
                    <button>Contact</button>
                </Link>
            </div>
            <div className="SearchContainer">
                <SearchBar onSearch={onSearch} />
            </div>
            <div className="LogoContainer">
                <img src={LogoRM} alt="LogoRM" className="LogoLogo" />
            </div>
        </div>
    );
}

export default Nav;
