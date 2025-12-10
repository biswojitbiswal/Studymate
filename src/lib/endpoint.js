export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4040/api/v1";

export const API = {
  AUTH_SIGNIN: `${BACKEND_URL}/auth/signin`,
  AUTH_SIGNUP: `${BACKEND_URL}/auth/signup`,
  // add other endpoints as your backend grows
  PROFILE: `${BACKEND_URL}/auth/profile`, // optional if you have profile route
  // example resource:
  CLASSES: `${BACKEND_URL}/classes`,
};
