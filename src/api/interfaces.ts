export interface RegisterRequestData {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponseData {
  jwtRes: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  jwtRes: string;
}

export interface UserProfileResponseData {
  name: string;
  email: string;
}
