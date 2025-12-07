// import { Response } from 'express';

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
export function responseVehicleRetrieved(data: any) {
  const result = {
    success: true,
    message: 'Vehicle retrieved successfully',
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
export function responseCustomError(customMessage: string) {
  const result = {
    success: false,
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
