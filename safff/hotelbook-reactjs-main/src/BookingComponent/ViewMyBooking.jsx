import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Card } from "flowbite-react";
// import Image from "next/image";

const ViewMyBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);

  let navigate = useNavigate();
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  useEffect(() => {
    const getAllBooking = async () => {
      const allBooking = await retrieveAllBooking();
      if (allBooking) {
        setAllBookings(allBooking.bookings);
      }
    };

    getAllBooking();
  }, []);

  const retrieveAllBooking = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/book/hotel/fetch?userId=${user.id}`
    );
    return response.data;
  };

  const navigateToHotelBookingPage = (booking) => {
    navigate("/hotel/booking/detail", { state: booking });
  };

  const cancelHotelBooking = (bookingId) => {
    fetch("http://localhost:8080/api/book/hotel/update/status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: bookingId,
        status: "Cancel",
      }),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.responseCode === 0) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else if (res.responseCode === 1) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const toggleDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">My Bookings</h2>
      <div className="row g-4">
        {allBookings.map((booking) => (
          <div className="col-md-4" key={booking.bookingId}>
            <Card
              className="max-w-sm"
              // renderImage={() => (
              //   <Image
              //     width={500}
              //     height={500}
              //     src={`http://localhost:8080/api/hotel/${booking.hotelImage}`}
              //     alt="Hotel"
              //   />
              // )}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {booking.hotelName}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                <strong>Booking Date:</strong> {booking.checkIn}
                <br />
                <strong>Booking Amount :</strong> <b>{booking.totalAmount}</b>
                <br />
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ${
                    booking.status === "Approved" ? "bg-denger" : "bg-success"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => toggleDetails(booking.bookingId)}
              >
                {expandedBooking === booking.bookingId
                  ? "Hide Details"
                  : "View Details"}
              </button>
              {expandedBooking === booking.bookingId && (
                <div className="mt-3">
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    <strong>Hotel Email:</strong> {booking.hotelEmail}
                    <br />
                    <strong>Hotel Contact:</strong> {booking.hotelContact}
                    <br />
                    <strong>Booking Id:</strong> {booking.bookingId}
                    <br />
                    <strong>Customer Name:</strong> {booking.customerName}
                    <br />
                    <strong>Customer Contact:</strong> {booking.customerContact}
                    <br />
                    <strong>Check In:</strong> {booking.checkIn}
                    <br />
                    <strong>Check Out:</strong> {booking.checkOut}
                    <br />
                    <strong>Total Day:</strong> {booking.totalDay}
                    <br />
                    <strong>Room No:</strong> {booking.hotelRoomId}
                    <br />
                    <strong>Total Person:</strong> {booking.totalPerson}
                    <br />
                    <strong>Total Payable Amount:</strong> {booking.totalAmount}
                    <br />
                  </p>
                  {booking.status === "Approved" && (
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => navigateToHotelBookingPage(booking)}
                      >
                        Pay
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => cancelHotelBooking(booking.bookingId)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {booking.status === "Pending" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelHotelBooking(booking.bookingId)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ViewMyBooking;
