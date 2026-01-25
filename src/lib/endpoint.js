export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4040/api/v1";
// export const BACKEND_URL = "/api/v1";



export const API = {
  AUTH_SIGNIN: `${BACKEND_URL}/auth/signin`,
  AUTH_SIGNUP: `${BACKEND_URL}/auth/signup`,
  AUTH_REFRESH: `${BACKEND_URL}/auth/refresh`,
  AUTH_SIGNOUT: `${BACKEND_URL}/auth/signout`,
  PROFILE: `${BACKEND_URL}/auth/profile`,
  VERIFY_EMAIL: `${BACKEND_URL}/auth/verify-email`,
  TOGGLE_STATUS: `${BACKEND_URL}/auth/toggle`,


  //Classes
  BROWSE_CLASSES: `${BACKEND_URL}/public/classes/browse`,
  BROWSE_CLASSES_BY_ID: `${BACKEND_URL}/public/classes`,


  ADMIN: {
    BOARD: {
      CREATE: `${BACKEND_URL}/board`,
      GET: `${BACKEND_URL}/board`,
      GET_BY_ID: `${BACKEND_URL}/board`,
      GET_FOR_PUBLIC: `${BACKEND_URL}/board/public`,
      DELETE: `${BACKEND_URL}/board`,
      UPDATE: `${BACKEND_URL}/board`
    },

    LEVEL: {
      CREATE: `${BACKEND_URL}/level`,
      GET: `${BACKEND_URL}/level`,
      GET_BY_ID: `${BACKEND_URL}/level`,
      GET_FOR_PUBLIC: `${BACKEND_URL}/level/public`,
      DELETE: `${BACKEND_URL}/level`,
      UPDATE: `${BACKEND_URL}/level`
    },

    LANGUAGE: {
      CREATE: `${BACKEND_URL}/language`,
      GET: `${BACKEND_URL}/language`,
      GET_BY_ID: `${BACKEND_URL}/language`,
      GET_FOR_PUBLIC: `${BACKEND_URL}/language/public`,
      DELETE: `${BACKEND_URL}/language`,
      UPDATE: `${BACKEND_URL}/language`
    },

    SUBJECT: {
      CREATE: `${BACKEND_URL}/subject`,
      GET: `${BACKEND_URL}/subject`,
      GET_BY_ID: `${BACKEND_URL}/subject`,
      GET_FOR_PUBLIC: `${BACKEND_URL}/subject/public`,
      DELETE: `${BACKEND_URL}/subject`,
      UPDATE: `${BACKEND_URL}/subject`
    },

    CLASSES: {
      GET: `${BACKEND_URL}/admin/classes`,
      ARCHIVE: `${BACKEND_URL}/admin/classes/archive`,
    }
  },


  STUDENT: {
    GET_STUDENTS: `${BACKEND_URL}/student`,
    GET_ME: `${BACKEND_URL}/student/me`,
    UPDATE_ME: `${BACKEND_URL}/student/me`,
    GET_STUDENT_BY_ID: `${BACKEND_URL}/student`,




    TASK: {
      CREATE: `${BACKEND_URL}/task`,
      GET: `${BACKEND_URL}/task`,
      GET_BY_ID: `${BACKEND_URL}/task`,
      DELETE: `${BACKEND_URL}/task`,
      UPDATE: `${BACKEND_URL}/task`,
      COMPLETE: `${BACKEND_URL}/task/status`
    }
  },





  TUTOR: {
    TUTOR_APPLY: `${BACKEND_URL}/tutor/apply`,
    GET_TUTORS: `${BACKEND_URL}/tutor`,
    GET_ME: `${BACKEND_URL}/tutor/me`,
    UPDATE_ME: `${BACKEND_URL}/tutor/me`,
    GET_TUTOR_BY_ID: `${BACKEND_URL}/tutor`,
    GET_TUTOR_REQUESTS: `${BACKEND_URL}/tutor/requests`,
    TUTOR_APPROVED: `${BACKEND_URL}/tutor/approved`,
    TUTOR_REJECTED: `${BACKEND_URL}/tutor/rejected`,



    CLASSES: {
      CREATE: `${BACKEND_URL}/tutor/classes`,
      GET: `${BACKEND_URL}/tutor/classes`,
      GET_BY_ID: `${BACKEND_URL}/tutor/classes`,
      DELETE: `${BACKEND_URL}/tutor/classes`,
      UPDATE: `${BACKEND_URL}/tutor/classes`,
      PUBLISH: `${BACKEND_URL}/tutor/classes/publish`,
      ARCHIVE: `${BACKEND_URL}/tutor/classes/archive`,
    },

    AVAILABILITY: {
      CREATE: `${BACKEND_URL}/schedule/availibility`,
      GET: `${BACKEND_URL}/schedule/availibility`,
      DELETE: `${BACKEND_URL}/schedule/availibility`,
      UPDATE: `${BACKEND_URL}/schedule/availibility`,
      TOGGLE: `${BACKEND_URL}/schedule/availibility/toggle`,
    },

    TIMEOFF: {
      CREATE: `${BACKEND_URL}/schedule/timeoff`,
      GET: `${BACKEND_URL}/schedule/timeoff`,
      DELETE: `${BACKEND_URL}/schedule/timeoff`,
    },

    LEAVE: {
      CREATE: `${BACKEND_URL}/schedule/leave`,
      GET: `${BACKEND_URL}/schedule/leave`,
      DELETE: `${BACKEND_URL}/schedule/leave`,
    }
  }
};
