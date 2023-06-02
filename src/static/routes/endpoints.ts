export const endpoints = {
  /** ------------- Auth Routes --------------- */
  SIGNUP: "/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  FORGET_PASSWORD: "/password/forget",
  RESET_PASSWORD: "/password/forget/reset",
  EMAIL_VERIFIED: "/register/confirm",
  /** ------------- Auth Routes --------------- */

  /** ------------- Protected Routes --------------- */
  CREATE_ORGANIZATION: "/register/organization",
  GET_ORGANIZATIONS_LIST: "/organizations",
  EDIT_ORGANIZATION: "/organizations",
  SET_ORGANIZATION: "/organizations/set_default",
  WAREHOUSE: "/warehouses",
  CURRENCY: "/currencies",
  TAXES: "/taxes",
  TAX_GROUP: "/taxgroup",
  APPROVALS: "/approvals",
  ANALYTICS: "/analytics",
  ROLE: "/roles",
  INVITE_USER: "/invites",
  MEAL_PREFERENCE: "/mealpreference",
  SEAT_PREFERENCE: "/seatpreference",
  FLIGHT_PREFERENCE: "/flightpreference",
  TIME_PREFERENCE: "/timepreference",
  CAR_TYPE_PREFERENCE: "/cartypespreference",
  TRIP: "/trips",
  TAGS: "/tags",
  EXPENSE: "/expenses",
  BULK_EXPENSE:"/bulkexpenses",
  PAYMENTS_MODES: "/paymentmodes",
  REPORTS: "/reports",
  ADVANCES:"/advances",
  MERCHANT_PREFERENCE: "/merchant",
  CATEGORY: "/category"
  /** ------------- Admin Routes --------------- */

  /** ------------- Owner Routes --------------- */
  /** ------------- Owner Routes --------------- */
};
