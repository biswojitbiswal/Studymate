



export const API = {
  AUTH_SIGNIN: `/auth/signin`,
  AUTH_SIGNUP: `/auth/signup`,
  AUTH_REFRESH: `/auth/refresh`,
  AUTH_SIGNOUT: `/auth/signout`,
  PROFILE: `/auth/profile`,
  VERIFY_EMAIL: `/auth/verify-email`,
  TOGGLE_STATUS: `/auth/toggle`,


  //Classes
  BROWSE_CLASSES: `/public/classes/browse`,
  BROWSE_CLASSES_BY_ID: `/public/classes`,



  //Checkout
  GET_CHECKOUT_DETAILS: `/order/checkout`,
  CREATE_ORDER: `/order`,
  GET_ORDER_STATUS: '/order',


  VERIFY_PAYMENT: `/payments/verify`,


  SESSION: {
    CREATE_PRIVATE: `/sessions/private/request`,
    GET_BY_ID: `/sessions/class`,
    CANCELLATION: `/sessions/cancel`,
    RESCHEDULE: `/sessions/reschedule`,
    APPROVE: `/sessions/approve`,
    REJECT: `/sessions/reject`,
    CREATE_DBOUT: `/sessions/group/dbout`,
    CREATE_EXTRA: `/sessions/group/extra`,
    GET_UPCOMING: `/sessions/upcoming`,
  },


  ADMIN: {
    BOARD: {
      CREATE: `/board`,
      GET: `/board`,
      GET_BY_ID: `/board`,
      GET_FOR_PUBLIC: `/board/public`,
      DELETE: `/board`,
      UPDATE: `/board`
    },

    LEVEL: {
      CREATE: `/level`,
      GET: `/level`,
      GET_BY_ID: `/level`,
      GET_FOR_PUBLIC: `/level/public`,
      DELETE: `/level`,
      UPDATE: `/level`
    },

    LANGUAGE: {
      CREATE: `/language`,
      GET: `/language`,
      GET_BY_ID: `/language`,
      GET_FOR_PUBLIC: `/language/public`,
      DELETE: `/language`,
      UPDATE: `/language`
    },

    SUBJECT: {
      CREATE: `/subject`,
      GET: `/subject`,
      GET_BY_ID: `/subject`,
      GET_FOR_PUBLIC: `/subject/public`,
      DELETE: `/subject`,
      UPDATE: `/subject`
    },

    CLASSES: {
      GET: `/admin/classes`,
      ARCHIVE: `/admin/classes/archive`,
    },

    COMMISSION: {
      CREATE: `/commission`,
      GET: `/commission`,
      GET_BY_ID: `/commission`,
      DELETE: `/commission`,
      UPDATE: `/commission`
    },

    TAX: {
      CREATE: `/tax-setting`,
      GET: `/tax-setting`,
      GET_BY_ID: `/tax-setting`,
      DELETE: `/tax-setting`,
      UPDATE: `/tax-setting`
    },

    COUPON: {
      CREATE: `/coupon`,
      GET: `/coupon`,
      GET_COUPON: `/coupon/checkout`,
      GET_BY_ID: `/coupon`,
      DELETE: `/coupon`,
      UPDATE: `/coupon`,
      VALIDATE: `/coupon/validate`,
    },

  },


  STUDENT: {
    GET_STUDENTS: `/student`,
    GET_ME: `/student/me`,
    UPDATE_ME: `/student/me`,
    GET_STUDENT_BY_ID: `/student`,




    TASK: {
      CREATE: `/task`,
      GET: `/task`,
      GET_BY_ID: `/task`,
      DELETE: `/task`,
      UPDATE: `/task`,
      COMPLETE: `/task/status`
    },


    CLASSES: {
      GET_ALL_ENROLLED: `/class-enrollments`
    }
  },





  TUTOR: {
    TUTOR_APPLY: `/tutor/apply`,
    GET_TUTORS: `/tutor`,
    GET_ME: `/tutor/me`,
    UPDATE_ME: `/tutor/me`,
    GET_TUTOR_BY_ID: `/tutor`,
    GET_TUTOR_REQUESTS: `/tutor/requests`,
    TUTOR_APPROVED: `/tutor/approved`,
    TUTOR_REJECTED: `/tutor/rejected`,



    CLASSES: {
      CREATE: `/tutor/classes`,
      GET: `/tutor/classes`,
      GET_BY_ID: `/tutor/classes`,
      DELETE: `/tutor/classes`,
      UPDATE: `/tutor/classes`,
      PUBLISH: `/tutor/classes/publish`,
      ARCHIVE: `/tutor/classes/archive`,
    },

    AVAILABILITY: {
      CREATE: `/schedule/availibility`,
      GET: `/schedule/availibility`,
      DELETE: `/schedule/availibility`,
      UPDATE: `/schedule/availibility`,
      TOGGLE: `/schedule/availibility/toggle`,
    },

    TIMEOFF: {
      CREATE: `/schedule/timeoff`,
      GET: `/schedule/timeoff`,
      DELETE: `/schedule/timeoff`,
    },

    LEAVE: {
      CREATE: `/schedule/leave`,
      GET: `/schedule/leave`,
      DELETE: `/schedule/leave`,
    },


  }
};
