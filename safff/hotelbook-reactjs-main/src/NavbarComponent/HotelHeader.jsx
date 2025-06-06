import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./HotelHeader.css";
const HotelHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-hotel"));
  console.log(user);

  const hotelLogout = () => {
    toast.success("logged out!!!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-hotel");
    window.location.reload(true);
    navigate("home");
  };

  return (
    <div className="admin-header flex items-center justify-between  text-center gap-[250px] ">
      <div className="header-heading ">
        <h1 className="text-4xl font-bold ml-[430px]">Manager Dashboard</h1>
      </div>

      <div>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
          <li className="nav-item">
            <Link
              to="user/hotel/bookings/all"
              className="nav-link active"
              aria-current="page"
            >
              <button
                className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm"
                role="button"
              >
                All Booked Hotel
              </button>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to=""
              class="nav-link active"
              aria-current="page"
              onClick={hotelLogout}
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

export default HotelHeader;
