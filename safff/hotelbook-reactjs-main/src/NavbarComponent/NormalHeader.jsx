import { Link } from "react-router-dom";
import './NormalHeader.css';

const NormalHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
          <li className="nav-item dropdown">
            <a 
              className="nav-link dropdown-toggle" 
              href="#" 
              id="navbarDropdown" 
              role="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              Login/Signup
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link to="/user/customer/register" className="dropdown-item">
                  SignUp
                </Link>
              </li>
              <li>
                <Link to="/user/login" className="dropdown-item">
                  Login
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NormalHeader;
