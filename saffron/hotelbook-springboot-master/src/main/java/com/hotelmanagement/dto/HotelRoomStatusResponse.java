package com.hotelmanagement.dto;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

public class HotelRoomStatusResponse extends CommanApiResponse {

	// Jan 2024 2024-02-17 Booked/Available
	Map<String, Map<String, String>> bookingStatus = new LinkedHashMap<>();

	public Map<String, Map<String, String>> getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(Map<String, Map<String, String>> bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

}
