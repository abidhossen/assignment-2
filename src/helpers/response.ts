import { Response } from 'express';
export const responseUnauthorized = (res: Response) => {
  res.status(401).json({
    success: false,
    message: 'Unauthorized!',
    data: 'You must register or login to access this resource.',
  });
};
export const responseForbidden = (res: Response) => {
  res.status(403).json({
    success: false,
    message: 'Insufficient Permission!',
    data: 'You do not have permission to access this resource.',
  });
};
export const responseNotFound = (res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Not Found!',
    data: 'The requested resource was not found.',
  });
};
export const responseBadRequest = (res: Response, des: string) => {
  res.status(400).json({
    success: false,
    message: 'Validation errors or Invalid input!',
    data: des,
  });
};
export const responseServerError = (res: Response, error: any) => {
  res.status(500).json({
    success: false,
    message: 'Internal Server Error!',
    data: error,
  });
};
export function responseUserCreated(res: Response, data: any) {
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  });
}
export function responseLoginSuccess(res: Response, data: any) {
  res.status(200).json({
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
  });
}
export function responseSuccess(res: Response, message: string, data: any) {
  res.status(200).json({
    success: true,
    message: message,
    data: data,
  });
}
