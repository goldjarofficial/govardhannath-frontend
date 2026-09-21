const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is missing. Check your .env.local file."
  );
}

/* =========================================================
   RESPONSE TYPES
   ========================================================= */

export interface ApiResponse {
  success: boolean;
  message?: string;

  jwtResponse?: {
    token: string;
    [key: string]: unknown;
  };

  [key: string]: unknown;
}

/* =========================================================
   SIGNUP
   ========================================================= */

export interface SignupPayload {
  name: string;
  contactNo: string;
  termsAndPolicy: boolean;
}

/* =========================================================
   LOGIN INITIATE
   ========================================================= */

export interface LoginInitiatePayload {
  mobileNumber: string;
}

/* =========================================================
   LOGIN VERIFY
   ========================================================= */

export interface LoginVerifyPayload {
  mobileNumber: string;
  otp: string;
}

/* =========================================================
   AUTH SERVICE
   ========================================================= */

class AuthService {
  /* =======================================================
     COMMON REQUEST
     ======================================================= */

  private async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    console.log("=================================");
    console.log("API REQUEST");
    console.log("URL:", url);
    console.log("METHOD:", options.method);

    if (options.body) {
      console.log("BODY:", options.body);
    }

    console.log("=================================");

    try {
      const response = await fetch(url, {
        ...options,

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      console.log("API STATUS:", response.status);
      console.log("API RESPONSE:", data);

      if (!response.ok) {
        const error: any = new Error(
          data?.message ||
            `Request failed with status ${response.status}`
        );

        error.status = response.status;

        error.response = {
          status: response.status,
          data,
        };

        throw error;
      }

      return data as T;
    } catch (error) {
      console.error("API FETCH ERROR:", error);

      throw error;
    }
  }

  /* =======================================================
     LOGIN - SEND OTP
     ======================================================= */

  async loginInitiate(
    payload: LoginInitiatePayload
  ): Promise<ApiResponse> {
    return this.request<ApiResponse>(
      "/auth/login/initiate",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  /* =======================================================
     REGISTER
     ======================================================= */

  async signup(
    payload: SignupPayload
  ): Promise<ApiResponse> {
    return this.request<ApiResponse>(
      "/auth/signup",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  /* =======================================================
     VERIFY OTP
     ======================================================= */

  async loginVerify(
    payload: LoginVerifyPayload
  ): Promise<ApiResponse> {
    return this.request<ApiResponse>(
      "/auth/login/verify",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  }

  /* =======================================================
     TOKEN
     ======================================================= */

  setToken(token: string) {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      "auth-token",
      token
    );
  }

  getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(
      "auth-token"
    );
  }

  removeToken() {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(
      "auth-token"
    );
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export const authService =
  new AuthService();