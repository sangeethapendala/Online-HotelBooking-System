import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CustomerHeader.css";
import GetAllLocations from "../LocationComponent/GetAllLocations";

const CustomerHeader = () => {
  let navigate = useNavigate();

  const userLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-customer");

    navigate("/home");
    window.location.reload(true);
  };

  return (
    <div className="admin-header flex items-center justify-between  text-center gap-[190px]">
      <div className="header-heading">
        <h1 className="text-4xl  ml-[320px]">Customer Dashboard</h1>
      </div>

      <div>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <Link
              to="/home/all/hotel/location"
              className="nav-link active"
              aria-current="page"
            >
              <GetAllLocations />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="user/hotel/bookings"
              className="nav-link active"
              aria-current="page"
            >
              <button
                className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm"
                role="button"
              >
                My Bookings
              </button>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/userprofile"
              className="nav-link active"
              aria-current="page"
            >
              <button
                className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm"
                role="button"
              >
                Profile
              </button>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to=""
              class="nav-link active"
              aria-current="page"
              onClick={userLogout}
            >
              <button
                className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm"
                role="button"
              >
                Logout
              </button>
            </Link>
            <ToastContainer />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerHeader;
