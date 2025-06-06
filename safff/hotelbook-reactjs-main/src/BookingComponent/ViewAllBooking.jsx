import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "flowbite-react";
// import Image from "next/image";

const ViewAllBooking = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [expandedBooking, setExpandedBooking] = useState(null);

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
      "http://localhost:8080/api/book/hotel/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const toggleDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  return (
    <div className="container mt-3">
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
                    booking.status === "Confirmed"
                      ? "bg-danger"
                      : "bg-success"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <button
                className="btn btn-warning text-white"
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
                </div>
              )}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllBooking;
