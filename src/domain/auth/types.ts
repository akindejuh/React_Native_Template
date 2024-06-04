// Requests
export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
  phone_number: string;
}

// Response
export interface AuthResponse extends Omit<ServerResponse, 'data'> {
  data: {
    token: string;
    id: string;
  };
}
