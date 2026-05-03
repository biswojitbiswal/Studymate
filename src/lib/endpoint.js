



export const API = {
  AUTH_SIGNIN: `/auth/signin`,
  AUTH_SIGNUP: `/auth/signup`,
  AUTH_REFRESH: `/auth/refresh`,
  AUTH_SIGNOUT: `/auth/signout`,
  PROFILE: `/auth/profile`,
  VERIFY_EMAIL: `/auth/verify-email`,
  TOGGLE_STATUS: `/auth/toggle`,
  FORGOT_PASSWORD: `/auth/forgot-password`,
  RESET_PASSWORD: `/auth/reset-password`,
  CHANGE_PASSWORD: `/auth/change-password`,
  AUTH_UPDATE: `/auth`,


  //Classes
  BROWSE_CLASSES: `/public/classes/browse`,
  BROWSE_CLASSES_BY_ID: `/public/classes`,


  WISHLIST: {
    TOGGLE: `/wishlists`,
    GET_ALL: `/wishlists`
  },


  CHAT: {
    DM_CREATE: `/chat/dm`,
    GROUP_CREATE: `/chat/group`,
    MESSAGE_CREATE: `/chat/message`,
    GET_MESSAGE: `/chat/messages`,
    GET_CONVERSATIONS: `/chat/conversations`,
    DELETE_FOR_ME: `/chat/messages`,
    DELETE_FOR_EVERYONE: `/chat/messages`,
    TOGGLE_PINNED: `/chat/messages`,
    MUTE_CONVERSATIONS: `/chat/conversations`,
  },




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
    GET_MEETING_LINK: `/sessions`
  },


  REVIEW: {
    CREATE: `/reviews`,
    GET_ALL: `/reviews/admin`,
    STATUS_UPDATE: `/reviews`,
    GET_BY_STUDENT: `/reviews`,
    GET_BROWSE: `/reviews`
  },


  PREFERENCE: {
    CREATE: `notification-preferences`,
    GET: `notification-preferences`
  },


  NOTIFICATION: {
    GET_ALL: `notification`,
    GET_COUNT: `notification/count`,
    BULK_MARK_AS_READ: `notification/bulk/mark-read`,
    MARK_AS_READ: `notification`
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

    ORDER: {
      GET_ALL: `/order`,
      GET_BY_ID: `/order`
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
    },

    ORDERS: {
      GET_MY_ORDERS: `/order/my`,
      GET_BY_ID: `order`
    },

    DASHBOARD: {
      ANALYTICS: `/admin/student/analytics`
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
      GET_FREE_AVAILIBILITY: `/schedule/tutors/`
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


    RESOURCES: {
      CREATE: `/resources`,
      UPDATE: `/resources`,
      DELETE: `/resources`,
      GET: `/resources/class`,
      GET_FOR_STUDENT: `/resources/student`
    },


    ASSIGNMENTS: {
      CREATE: `/assignments`,
      UPDATE: `/assignments`,
      DELETE: `/assignments`,
      UPDATE_STATUS: `/assignments`,
      GET_BY_ID: `/assignments`,
      GET: `/assignments/class`,
      GET_FOR_STUDENT: `/assignments/assigned`,
    },


    WALLET: {
      CREATE: `/wallet/withdrawls`,
      GET_WITHDRAWL_TUTOR: `/wallet/withdrawls`,
      GET_ALL: `/wallet/admin/withdrawls`
    },


    DASHBOARD: {
      ANALYTICS: `/admin/tutor/analytics`
    }
  }
};
