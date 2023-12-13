import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { BiSun, BiMoon } from 'react-icons/bi';

export const Navbar = () => {
    const { currentTheme, theme, setCurrentTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    };

    const handleChangeTheme = () => {
        setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <nav className={`navbar navbar-expand-lg ${theme[currentTheme].bgColor}`}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <Link className={`navbar-brand mt-2 mt-lg-0 ${theme[currentTheme].textColor}`} to="/foods">
                        <h1>Calorie Choice</h1>
                    </Link>
                    <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
                        <li className="nav-item">
                            <Link className={`nav-link ${theme[currentTheme].textColor}`} to="/foods">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${theme[currentTheme].textColor}`} to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${theme[currentTheme].textColor}`} to="/foods/admin">Admin Access</Link>
                        </li>
                        <li className="nav-item">
                            <button className={`btn btn-lg btn-block ${theme[currentTheme].btnVariant} ${theme[currentTheme].textColor}`} type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                        <li className="nav-item" style={{marginLeft: '730px'}}>
                            <button
                                type="button"
                                className={`btn btn-${theme[currentTheme].btnVariant} ${theme[currentTheme].textColor}`}
                                onClick={handleChangeTheme}
                            >
                                {currentTheme === 'light' ? <BiMoon size="20" /> : <BiSun size="20" />}
                                {currentTheme}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
