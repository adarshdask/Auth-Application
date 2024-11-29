
export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    name: string;
    email: string;
  };
}

export interface signupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

