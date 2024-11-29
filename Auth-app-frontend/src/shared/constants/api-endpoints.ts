const API_BASE_URL = "http://localhost:4000";

export const apiEndpoints = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
  }
};