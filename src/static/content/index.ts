/** @format */

import { Icons } from 'app/shared'
import { routeNames } from 'static/routes'

const {
  ORGANIZATION_PROFILE,
  CURRENCY,
  TAX,
  TAGS,
  USERS,
  APPROVALS,
  MODULES,
  TRIPS,
  MODULES_TRIP,
  MODULES_EXPENSE,
  MODULES_MERCHANT,
  MEAL_PREFENRECES,
  SEAT_PREFENRECES,
  FLIGHT_PREFENRECES,
  TIME_PREFENRECES,
  CAR_TYPE_PREFENRECES,
  PAYMENTS_MODES,
  MODULES_PAID_THROUGH,
  MODULES_CATEGORY,
} = routeNames
export const Content = {
  sign_up_header: 'Sign Up To Expense',
  sign_in_header: 'Sign In To Expense',
  forget_password: 'Forget Password',
  reset_password: 'Reset Password',
  already_have_code: 'Already have an Code',
  aleady_have_account: 'Already have an Account ?',
  dont_have_account: 'Dont have an Account ?',
  congratulations: 'Welcome to Expense Managment System',
  account_verified: 'Your Account Verified Successfully!',
  account_not_verified: 'Account Verification Field. Please try Later!',
  password_field_required: 'Please enter your password!',
  enter_confirmation_code: 'Please enter confirmation code!',
  enter_confirm_password: 'Please enter confirm password!',
  enter_your_name: 'Please enter your Name!',
  currency: 'Currencies',
  enter_name: 'Name is required',
  enter_currency_code: 'Currency code required',
  enter_symbol: 'Symbol required',
  enter_business_name: 'Business Name Required',
  enter_organization_type: 'Organization Type Required',
  enter_time_zone: 'Timezone Required',
  enter_fiscal_year: 'Fiscal Year Required',
  enter_base_currency: 'Base Currency Required',
  enter_country_name: 'Country Required',
  enter_phone: 'Phone Required',
  enter_rate: 'Rate is required',
  manage_system_settings: 'Manage System Settings',
  meal_preferences: 'Meal Preferences',
  seat_preferences: 'Seat Preferences',
  flight_preferences: 'Flight Preferences',
  time_preferences: 'Time Preferences',
  car_type_preferences: 'Car Type Preferences',
  pending_approvals: 'Pending Approvals',
  trips: 'Trips',
  reports: 'Reports',
  TRIP_CONTENT: {
    DOMESTIC: 'Domestic',
    INTERNATIONAL: 'International',
    TRIP_NAME: 'Trip name',
    TRIP_PLACEHOLDER: 'eg: Trip to New York',
    BISINESS_PURPSE: 'Business Purpose',
    DESTINATION_COUNTRY: 'Destination Country',
    IS_VISA_REQUIRED: 'Is visa required?',
    TRIP_ITINERARY: 'TRIP ITINERARY',
    TRIP_MODES: {
      FLIGHT: 'Flight',
      CAR: 'Car',
      HOTAL: 'Hotal',
      BUS: 'Bus',
      TRAIN: 'Train',
    },
    FLIGHT: {
      FLIGHT_TYPE: [
        { NAME: 'One Way', VALUE: 1 },
        { NAME: 'Round Trip', VALUE: 2 },
        { NAME: 'Multi-city', VALUE: 3 },
      ],

      SEAT_PREFERENCE: 'Seat Preference',
      MEAL_PREFERENCE: 'Meal Preference',
      ONE_MULTY_WAY_TRIP_TABLE_HEADER: ['DEPART FROM *', 'ARRIVE AT *', 'DEPARTURE DATE *', 'DESCRIPTION'],
      ROUND_TRIP_TABLE_HEDER: ['DEPART FROM *', 'ARRIVE AT *', 'DEPARTURE DATE *', 'RETURN DATE *', 'DESCRIPTION'],
    },
    RULES: {
      REQUIRE_NAME: 'please enter trip name',
      REQUIRE_COUNTRY: 'please select country',
    },
  },
  expenses: 'Expenses',
  tag: 'Tags',
  payment_through_account: 'Paid Through Account',
  Setting_Prefrence: {
    orgnization: [
      { label: 'Organization Profile', url: ORGANIZATION_PROFILE },
      { label: 'Currencies', url: CURRENCY },
      { label: 'Taxes', url: TAX },
      { label: 'Tags', url: TAGS },
      { label: 'Payment Modes', url: PAYMENTS_MODES },
    ],
    User_control: [
      { label: 'Users ', url: USERS },
      { label: 'Roles & Permissions', url: '/#' },
      { label: 'Departments', url: '/#' },
      { label: 'Policies', url: '/#' },
    ],
    customization: [
      { label: 'Modules', url: MODULES },
      { label: 'PDF Templates', url: '/#' },
      { label: 'Email Templates', url: '/#' },
    ],
    automation: [
      { label: 'Approvals ', url: APPROVALS },
      { label: 'Report Automation ', url: '/#' },
      { label: 'Workflow Rules ', url: '/#' },
      { label: 'Actions', url: '/#' },
    ],
    preferences: [
      { label: 'Meal Preferences', url: MEAL_PREFENRECES },
      { label: 'Seat Preferences', url: SEAT_PREFENRECES },
      { label: 'Flight Preferences', url: FLIGHT_PREFENRECES },
      { label: 'Time Preferences', url: TIME_PREFENRECES },
      { label: 'Car Type Prefrences', url: CAR_TYPE_PREFENRECES },
    ],
    integrations: [
      { label: 'SeeBiz Apps', url: '/#' },
      { label: 'Accounting & ERP', url: '/#' },
      { label: 'HR & Projects', url: '/#' },
      { label: 'Travel', url: '/#' },
      { label: 'View All', url: '/#' },
    ],
    developer_space: [
      { label: 'API Usage', url: '/#' },
      { label: 'ZSC Key', url: '/#' },
    ],
  },
  Modules_list: [
    {
      label: 'Trips',
      url: MODULES_TRIP,
      icon: Icons.MdOutlineCardTravel,
      description: 'Customize trip requests, create custom statuses for trips, and set up preferences.',
    },
    {
      label: 'Expenses',
      url: MODULES_EXPENSE,
      icon: Icons.AiOutlineFileText,
      description: 'Configure the fields required in expense creation forms and set up other preferences.',
    },
    {
      label: 'Reports',
      url: TRIPS,
      icon: Icons.VscReport,
      description: 'Configure submission and notification preferences for reports and set up report types.',
    },
    {
      label: 'Advances',
      url: TRIPS,
      icon: Icons.BsWallet2,
      description: 'Customize the fields in advance requests and create custom statuses, if required.',
    },
    {
      label: 'Purchase Request',
      url: TRIPS,
      icon: Icons.BsBasket,
      description: 'Configure the fields you require in your purchase requests and set up other preferences.',
    },
    {
      label: 'Categories',
      url: MODULES_CATEGORY,
      icon: Icons.BiCategory,
      description:
        'Add expense categories for which your organization incurs business expenses. You can group expense categories to create expense types.',
    },
    {
      label: 'Paid through Accounts',
      url: MODULES_PAID_THROUGH,
      icon: Icons.BsArrowUpRightCircle,
      description: "Add the accounts through which you pay reimbursements for your employees' expense reports.",
    },
    {
      label: 'Customers',
      url: TRIPS,
      icon: Icons.VscOrganization,
      description: 'Add the customers for whom you incur business expenses and bill them.',
    },
    {
      label: 'Projects',
      url: TRIPS,
      icon: Icons.VscProject,
      description:
        'Add the business projects for which you incur expenses, so that users can associate the project-related expenses with them.',
    },
    {
      label: 'Merchants',
      url: MODULES_MERCHANT,
      icon: Icons.AiOutlineShop,
      description:
        'Add the merchants to whom you incur business expenses so that users can associate them to their respective expenses.',
    },
  ],
  Trip_Prefrences: {
    trip_allowance: [
      {
        label: 'International Trips',
        id: 'inttrips',
      },
      {
        label: 'Domestic Trips',
        id: 'domtrips',
      },
      {
        label: 'All Trips',
        id: 'all trips',
      },
      {
        label: 'None',
        id: 'none',
      },
    ],
    trip_allowance2: [
      {
        label: 'Associate expenses incurred only within the trips duration.',
        value: 'allow_only_expenses_within_trip_range',
      },
      {
        label: "Create an advance for the trip's budget amount and associate it with the trip when it is approved.",
        value: 'can_create_advance_on_approval',
      },
    ],
    onTripSubmission: [
      {
        label: 'Attach trip as PDF file to notification email',
        value: 'can_attach_trip_pdf_in_mail',
      },
      {
        label: 'Receive a copy of Trip',
        value: 'is_cc_required_on_submit',
        field: true,
        type: 'text',
        name: 'cc_email_on_submit',
      },
      {
        label: 'Display Terms and Conditions',
        value: 'term',
        field: true,
        type: 'textareaField',
        name: 'terms',
      },
    ],
    ApprovalPerformance: [
      {
        label: 'Allow approvers to approve their own trips',
        value: 'enable_self_approval',
      },
      {
        label: 'Receive a copy of trip upon its Approval',
        value: 'is_cc_required_on_approval',
        field: true,
        type: 'text',
        name: 'cc_email_on_approval',
      },
    ],
    SendNotificationsWhen: [
      {
        label: 'Trips are approved',
        value: 'can_notify_on_approval',
      },
      {
        label: 'Trips are submitted',
        value: 'can_notify_on_submit',
      },
      {
        label: 'Trips are Cancelled',
        value: 'can_notify_on_cancel',
      },
    ],
  },
  Analytics_Content: {
    expense_subtitle:
      "View statistics of the expense reports you've created and resolve the policy violations in your reports",
    expense_data: [
      'Expense Details',
      'Expense By Categorey',
      'Expense By Attendee',
      'Expense By Customer',
      'Expense By Project',
      'Expense By Merchant',
      'Expense By Currency',
    ],
    report_data: ['Expense Report Details', 'Policy Voilation'],
    trips_data: ['Trip Details', 'Trip Stage Summary', 'Trip Summary by Report Status'],
    activity_log_data: ['Activity Log'],
  },
}
