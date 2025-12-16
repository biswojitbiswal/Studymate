// export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4040/api/v1";
export const BACKEND_URL = "/api/v1";



export const API = {
  AUTH_SIGNIN: `${BACKEND_URL}/auth/signin`,
  AUTH_SIGNUP: `${BACKEND_URL}/auth/signup`,
  AUTH_REFRESH: `${BACKEND_URL}/auth/refresh`,
  AUTH_SIGNOUT: `${BACKEND_URL}/auth/signout`,
  PROFILE: `${BACKEND_URL}/auth/profile`, // optional if you have profile route
  // example resource:
  CLASSES: `${BACKEND_URL}/classes`,
  USERS: `${BACKEND_URL}/users`,


  ADMIN: {
    BOARD: {
      CREATE: `${BACKEND_URL}/board`,
      GET: `${BACKEND_URL}/board`,
      GET_BY_ID: `${BACKEND_URL}/board`,
      DELETE: `${BACKEND_URL}/board`,
      UPDATE: `${BACKEND_URL}/board`
    },

    LEVEL: {
      CREATE: `${BACKEND_URL}/level`,
      GET: `${BACKEND_URL}/level`,
      GET_BY_ID: `${BACKEND_URL}/level`,
      DELETE: `${BACKEND_URL}/level`,
      UPDATE: `${BACKEND_URL}/level`
    },

    LANGUAGE: {
      CREATE: `${BACKEND_URL}/language`,
      GET: `${BACKEND_URL}/language`,
      GET_BY_ID: `${BACKEND_URL}/language`,
      DELETE: `${BACKEND_URL}/language`,
      UPDATE: `${BACKEND_URL}/language`
    },

    SUBJECT: {
      CREATE: `${BACKEND_URL}/subject`,
      GET: `${BACKEND_URL}/subject`,
      GET_BY_ID: `${BACKEND_URL}/subject`,
      DELETE: `${BACKEND_URL}/subject`,
      UPDATE: `${BACKEND_URL}/subject`
    }
  }
};
