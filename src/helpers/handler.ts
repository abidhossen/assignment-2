export function successHandler(success: boolean, message: string, data: any) {
  const result = {
    success: success,
    message: message,
    data: data,
  };
  return result;
}
export function responseUserCreated(data: any) {
  const result = {
    success: true,
    message: 'User registered successfully',
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  };
  return result;
}
export function responseLoginSuccess(data: any) {
  const result = {
    success: true,
    message: 'Login Successful',
    data: {
      token: data.token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        role: data.user.role,
      },
    },
  };
  return result;
}
export function responseLoginFailed() {
  const result = {
    success: false,
    message: 'Authentication failed!',
    errors: 'Email or password incorrect! Try again.',
  };
  return result;
}
export function responseError(data: any) {
  const result = {
    success: false,
    message: 'Internal server error',
    errors: data.message,
  };
  return result;
}
export function responseVehicleCreated(data: any) {
  const result = {
    success: true,
    message: 'Vehicle created successfully',
    data: {
      id: data.id,
      vehicle_name: data.vehicle_name,
      type: data.type,
      registration_number: data.registration_number,
      daily_rent_price: data.daily_rent_price,
      availability_status: data.availability_status,
    },
  };

  return result;
}
export function responseBookingCreated(bookingData: any, vehicleData: any) {
  const result = {
    success: true,
    message: 'Booking created successfully',
    data: {
      customer_id: bookingData.customer_id,
      vehicle_id: bookingData.vehicle_id,
      rent_start_date: bookingData.rent_start_date,
      rent_end_date: bookingData.rent_end_date,
      total_price: bookingData.total_price,
      status: bookingData.status,
    },
    vehicle: {
      vehicle_name: vehicleData.vehicle_name,
      daily_rent_price: vehicleData.daily_rent_price,
    },
  };

  return result;
}
export function responseVehicleUpdated(data: any) {
  const result = {
    success: true,
    message: 'Vehicle updated successfully',
    data: {
      id: data.id,
      vehicle_name: data.vehicle_name,
      type: data.type,
      registration_number: data.registration_number,
      daily_rent_price: data.daily_rent_price,
      availability_status: data.availability_status,
    },
  };

  return result;
}
export function responseVehicleRetrieved(data: any) {
  const result = {
    success: true,
    message: 'Vehicle retrieved successfully',
    data: data,
  };

  return result;
}
export function responseBookingRetrieved(data: any) {
  const result = {
    success: true,
    message: 'Bookings retrieved successfully',
    data: data,
  };

  return result;
}
export function responseBookingRetrievedCustomer(data: any) {
  const result = {
    success: true,
    message: 'Your booking retrieved successfully',
    data: data,
  };

  return result;
}
export function responseVehicleEmpty(data: any) {
  const result = {
    success: true,
    message: 'No vehicle found',
    data: data,
  };

  return result;
}

export function responseUserEmpty(data: any) {
  const result = {
    success: true,
    message: 'No user found',
    data: data,
  };
  return result;
}

export function responseUserUpdated(data: any) {
  const result = {
    success: true,
    message: 'User updated successfully',
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  };

  return result;
}
export function responseBookingCancelled(data: any) {
  const result = {
    success: true,
    message: 'Booking cancelled successfully',
    data: {
      id: 1,
      customer_id: data.customer_id,
      vehicle_id: data.vehicle_id,
      rent_start_date: data.rent_start_date,
      rent_end_date: data.rent_end_date,
      total_price: data.total_price,
      status: data.status,
    },
  };

  return result;
}
export function responseBookingReturned(data: any) {
  const result = {
    success: true,
    message: 'Booking marked as returned. Vehicle is now available',
    data: {
      id: data.id,
      customer_id: data.customer_id,
      vehicle_id: data.vehicle_id,
      rent_start_date: data.rent_start_date,
      rent_end_date: data.rent_end_date,
      total_price: data.total_price,
      status: data.status,
      vehicle: {
        availability_status: 'available',
      },
    },
  };

  return result;
}
export function responseCustom(status: boolean, customMessage: string) {
  const result = {
    success: status,
    message: customMessage,
  };
  return result;
}
export function passwordError() {
  const result = {
    success: false,
    message: 'Very short password!',
    errors: 'Password must contain more than 6 characters',
  };
  return result;
}
export function timeCalculator(start: string, end: string) {
  const endDate = new Date(end);
  const startDate = new Date(start);
  const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  return days;
}
export function priceCalculator(time: number, price: number) {
  const totalPrice = time * price;
  return totalPrice;
}
export function responseEmptyBooking(data: any) {
  const result = {
    success: true,
    message: 'No booking found',
    data: data,
  };
  return result;
}
