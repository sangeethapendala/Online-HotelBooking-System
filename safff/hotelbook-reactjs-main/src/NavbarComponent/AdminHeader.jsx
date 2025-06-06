import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminHeader.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("Logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    window.location.reload(true);
    navigate("/home");
  };

  return (
    <div className="admin-header flex items-center justify-between  text-center gap-[250px] ">
      <div className="header-heading ">
        <h1 className="text-4xl font-bold ml-[430px]">Admin Dashboard</h1>
      </div>

    <div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
        <li className="nav-item dropdown">
          <button
            className="custom-btn dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Administrative Actions
          </button>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="nav-item">
              <Link
                to="/admin/add-location"
                className="dropdown-item"
                aria-current="page"
              >
                Add Location
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/add-facility"
                className="dropdown-item"
                aria-current="page"
              >
                Add Facility
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/user/hotel/register"
                className="dropdown-item"
                aria-current="page"
              >
                Add Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin/hotel/register"
                className="dropdown-item "
                aria-current="page"
              >
                Add Hotel
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/user/admin/booking/all" className="dropdown-item">
                View All Bookings
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown ">
          <Link
            to=""
            className=" custom-btn text-decoration-none text-white"
            onClick={adminLogout}
          >
            Logout
          </Link>
        </li>
        <ToastContainer />
      </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
