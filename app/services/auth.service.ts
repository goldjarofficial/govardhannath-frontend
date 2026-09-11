import api from '@/app/lib/axios';

export interface SendOtpRequest {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export const authService = {
  sendOtp: async (
    data: SendOtpRequest,
  ) => {
    const response = await api.post(
      '/auth/send-otp',
      data,
    );

    return response.data;
  },

  verifyOtp: async (
    data: VerifyOtpRequest,
  ) => {
    const response = await api.post(
      '/auth/verify-otp',
      data,
    );

    return response.data;
  },
};