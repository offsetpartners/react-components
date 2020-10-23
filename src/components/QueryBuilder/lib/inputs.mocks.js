const products = [];

// Fake Products data
for (let index = 0; index < 20; index++) {
  products.push(`Product #${index}`);
}

const STATES = [
  {
    label: "Alabama",
    value: "AL",
  },
  {
    label: "Alaska",
    value: "AK",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Arizona",
    value: "AZ",
  },
  {
    label: "Arkansas",
    value: "AR",
  },
  {
    label: "California",
    value: "CA",
  },
  {
    label: "Colorado",
    value: "CO",
  },
  {
    label: "Connecticut",
    value: "CT",
  },
  {
    label: "Delaware",
    value: "DE",
  },
  {
    label: "District Of Columbia",
    value: "DC",
  },
  {
    label: "Federated States Of Micronesia",
    value: "FM",
  },
  {
    label: "Florida",
    value: "FL",
  },
  {
    label: "Georgia",
    value: "GA",
  },
  {
    label: "Guam",
    value: "GU",
  },
  {
    label: "Hawaii",
    value: "HI",
  },
  {
    label: "Idaho",
    value: "ID",
  },
  {
    label: "Illinois",
    value: "IL",
  },
  {
    label: "Indiana",
    value: "IN",
  },
  {
    label: "Iowa",
    value: "IA",
  },
  {
    label: "Kansas",
    value: "KS",
  },
  {
    label: "Kentucky",
    value: "KY",
  },
  {
    label: "Louisiana",
    value: "LA",
  },
  {
    label: "Maine",
    value: "ME",
  },
  {
    label: "Marshall Islands",
    value: "MH",
  },
  {
    label: "Maryland",
    value: "MD",
  },
  {
    label: "Massachusetts",
    value: "MA",
  },
  {
    label: "Michigan",
    value: "MI",
  },
  {
    label: "Minnesota",
    value: "MN",
  },
  {
    label: "Mississippi",
    value: "MS",
  },
  {
    label: "Missouri",
    value: "MO",
  },
  {
    label: "Montana",
    value: "MT",
  },
  {
    label: "Nebraska",
    value: "NE",
  },
  {
    label: "Nevada",
    value: "NV",
  },
  {
    label: "New Hampshire",
    value: "NH",
  },
  {
    label: "New Jersey",
    value: "NJ",
  },
  {
    label: "New Mexico",
    value: "NM",
  },
  {
    label: "New York",
    value: "NY",
  },
  {
    label: "North Carolina",
    value: "NC",
  },
  {
    label: "North Dakota",
    value: "ND",
  },
  {
    label: "Northern Mariana Islands",
    value: "MP",
  },
  {
    label: "Ohio",
    value: "OH",
  },
  {
    label: "Oklahoma",
    value: "OK",
  },
  {
    label: "Oregon",
    value: "OR",
  },
  {
    label: "Palau",
    value: "PW",
  },
  {
    label: "Pennsylvania",
    value: "PA",
  },
  {
    label: "Puerto Rico",
    value: "PR",
  },
  {
    label: "Rhode Island",
    value: "RI",
  },
  {
    label: "South Carolina",
    value: "SC",
  },
  {
    label: "South Dakota",
    value: "SD",
  },
  {
    label: "Tennessee",
    value: "TN",
  },
  {
    label: "Texas",
    value: "TX",
  },
  {
    label: "Utah",
    value: "UT",
  },
  {
    label: "Vermont",
    value: "VT",
  },
  {
    label: "Virgin Islands",
    value: "VI",
  },
  {
    label: "Virginia",
    value: "VA",
  },
  {
    label: "Washington",
    value: "WA",
  },
  {
    label: "West Virginia",
    value: "WV",
  },
  {
    label: "Wisconsin",
    value: "WI",
  },
  {
    label: "Wyoming",
    value: "WY",
  },
];

export const INPUT_TYPES = [
  "date",
  "number",
  "keyword",
  "multi_select",
  "boolean_select",
  "country_region_select",
];

// Missing Keys:
// Order Inputs
// - club_name
// - group_name
// - shipping_method_name
// - sku
export const ORDERS_INPUTS = {
  id: {
    label: "Order Id",
    type: "keyword",
  },
  order_type: {
    label: "Order Type",
    type: "multi_select",
    values: [
      "POS",
      "Admin",
      "Web",
      "Club",
      "Events",
      "Fees",
      "Replacement",
      "Sample",
      "Trade",
    ],
  },
  created_date: {
    label: "Created",
    type: "date",
  },
  ship_status: {
    label: "Shipping Status",
    type: "multi_select",
    values: [
      "Completed",
      "Shipped",
      "Not Shipped",
      "Error",
      "Processing",
      "Hold",
      "Hold Pickup",
      "Picked Up",
      "Cancelled",
    ],
  },
  payment_status: {
    label: "Payment Status",
    type: "boolean_select",
    values: ["Paid", "Not Paid"],
  },
  inventory_location: {
    label: "Inventory Location",
    type: "keyword",
  },
  promo_code: {
    label: "Promo Code",
    type: "keyword",
  },
  subtotal: {
    label: "Subtotal",
    type: "number",
  },
  credits: {
    label: "Credits",
    type: "number",
  },
  discount: {
    label: "Discount",
    type: "number",
  },
  tax: {
    label: "Tax",
    type: "number",
  },
  total: {
    label: "Order Total",
    type: "number",
  },
  gift_message: {
    label: "Gift Message",
    type: "keyword",
  },
  instructions: {
    label: "Instructions",
    type: "keyword",
  },
  quantity: {
    label: "Quantity",
    type: "number",
  },
  sales_agent: {
    label: "Sales Agent",
    type: "keyword",
  },
  sale_credit: {
    label: "Sales Credit",
    type: "keyword",
  },
  compliance_status: {
    label: "Compliance Status",
    type: "boolean_select",
    values: ["Pass", "Fail"],
  },
  compliance_error: {
    label: "Compliance Error",
    type: "keyword",
  },
  membership_opt_in: {
    label: "Membership Opt In",
    type: "boolean_select",
    values: ["Yes", "No"],
  },
  original_wooden_case: {
    label: "Original Wooden Case",
    type: "boolean_select",
    values: ["Yes", "No"],
  },
  editable_notes: {
    label: "Editable Notes",
    type: "keyword",
  },
  cancelled_date: {
    label: "Cancelled Date",
    type: "date",
  },
  last_update: {
    label: "Last Update",
    type: "date",
  },

  customer_id: {
    label: "Customer Id",
    type: "keyword",
  },
  first_name: {
    label: "First Name",
    type: "keyword",
  },
  last_name: {
    label: "First name",
    type: "keyword",
  },
  email: {
    label: "Email",
    type: "keyword",
  },
  phone: {
    label: "Phone Number",
    type: "keyword",
  },
  birthday: {
    label: "Birthday",
    type: "date",
  },
  company: {
    label: "Company",
    type: "keyword",
  },
  address: {
    label: "Address",
    type: "keyword",
  },
  city: {
    label: "City",
    type: "keyword",
  },
  state: {
    label: "State",
    type: "multi_select",
    values: STATES,
  },
  zip: {
    label: "Zip Code",
    type: "keyword",
  },

  requested_ship_date: {
    label: "Requested Ship Date",
    type: "date",
  },
  actual_ship_date: {
    label: "Actual Ship Date",
    type: "date",
  },
  shipping: {
    label: "Shipping Total",
    type: "number",
  },
  shipping_first_name: {
    label: "Shipping First Name",
    type: "keyword",
  },
  shipping_last_name: {
    label: "Shipping Last Name",
    type: "keyword",
  },
  shipping_email: {
    label: "Shipping Email",
    type: "keyword",
  },
  shipping_phone: {
    label: "Shipping Phone",
    type: "keyword",
  },
  shipping_birthday: {
    label: "Shipping Birthday",
    type: "date",
  },
  shipping_company: {
    label: "Shipping Company",
    type: "keyword",
  },
  shipping_city: {
    label: "Shipping City",
    type: "keyword",
  },
  shipping_state: {
    label: "Shipping State",
    type: "multi_select",
    values: STATES,
  },
  shipping_zip: {
    label: "Shipping Zip Code",
    type: "keyword",
  },

  opt_groups: [
    {
      label: "Order Info",
      options: [
        "id",
        "order_type",
        "created_date",
        "ship_status",
        "payment_status",
        "inventory_location",
        "promo_code",
        "subtotal",
        "credits",
        "discount",
        "tax",
        "total",
        "gift_message",
        "instructions",
        "quantity",
        "sales_agent",
        "sale_credit",
        "compliance_status",
        "compliance_error",
        "membership_opt_in",
        "original_wooden_case",
        "editable_notes",
        "cancelled_date",
        "last_update",
      ],
    },
    {
      label: "Customer Info",
      options: [
        "customer_id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "birthday",
        "company",
        "address",
        "city",
        "state",
        "zip",
      ],
    },
    {
      label: "Shipping Info",
      options: [
        "requested_ship_date",
        "actual_ship_date",
        "shipping",
        "shipping_first_name",
        "shipping_last_name",
        "shipping_email",
        "shipping_phone",
        "shipping_birthday",
        "shipping_company",
        "shipping_city",
        "shipping_state",
        "shipping_zip",
      ],
    },
  ],
};

// Missing Key:
// Customers Inputs
// clubs
// groups
// sub_group
// customer_type
// sku
export const CUSTOMERS_INPUTS = {
  id: {
    label: "Customer Id",
    type: "keyword",
  },
  created: {
    label: "Join date",
    type: "date",
  },
  salutation: {
    label: "Salutation",
    type: "keyword",
  },
  first_name: {
    label: "First Name",
    type: "keyword",
  },
  last_name: {
    label: "Last Name",
    type: "keyword",
  },
  birthday: {
    label: "Birthday",
    type: "date",
  },
  job_title: {
    label: "Job Title",
    type: "keyword",
  },
  company: {
    label: "Company",
    type: "keyword",
  },
  credits: {
    label: "Credits",
    type: "number",
  },

  last_order: {
    label: "Last Order Date",
    type: "date",
  },
  order_count: {
    label: "Order Count",
    type: "number",
  },
  order_total: {
    label: "Order Total",
    type: "number",
  },

  active_account: {
    label: "Active Account",
    type: "boolean_select",
    values: ["Active", "Inactive"],
  },
  score: {
    label: "Score",
    type: "number",
  },
  customer_source: {
    label: "Customer Source",
    type: "multi_select",
    values: [
      "On Site Event",
      "Off Site Event",
      "Tour & Tasting",
      "Web",
      "Internal",
    ],
  },
  referral_note: {
    label: "Referral Note",
    type: "keyword",
  },
  referral_code: {
    label: "Referral Code",
    type: "keyword",
  },
  vip_pickup: {
    label: "VIP Pickup",
    type: "boolean_select",
  },
  mail_marketing_opt_in: {
    label: "Mail Marketing Opt In",
    type: "boolean_select",
  },
  marketing_opt_in: {
    label: "Marketing Opt In",
    type: "boolean_select",
  },
  temporary_customer_notes: {
    label: "Temporary Customer Notes",
    type: "keyword",
  },
  special_shipping: {
    label: "Special Shipping",
    type: "keyword",
  },
  last_update: {
    label: "Last Update",
    type: "date",
  },

  email: {
    label: "Primary Email",
    type: "keyword",
  },
  email_alt: {
    label: "Alternative Email",
    type: "keyword",
  },
  phone: {
    label: "Phone Number",
    type: "keyword",
  },
  mobile: {
    label: "Mobile Phone Number",
    type: "keyword",
  },
  work: {
    label: "Work Phone Number",
    type: "keyword",
  },

  first_name_spouse: {
    label: "Spouse's First Name",
    type: "keyword",
  },
  last_name_spouse: {
    label: "Spouse's Last Name",
    type: "keyword",
  },
  email_spouse: {
    label: "Spouse's Email",
    type: "keyword",
  },
  spouse_phone: {
    label: "Spouse's Phone Number",
    type: "keyword",
  },
  children: {
    label: "Children(s)",
    type: "keyword",
  },
  pet: {
    label: "Pet(s)",
    type: "keyword",
  },

  city: {
    label: "City",
    type: "keyword",
  },
  zip: {
    label: "Zip Code",
    type: "keyword",
  },
  personal_country_region: {
    keys: ["country", "state"],
    type: "country_region_select",
    label: "Personal Country/State",
  },

  billing_city: {
    label: "Billing City",
    type: "keyword",
  },
  billing_zip: {
    label: "Billing Zip",
    type: "keyword",
  },
  billing_country_region: {
    type: "country_region_select",
    label: "Billing Country/State",
    keys: ["billing_country", "billing_state"],
  },

  mailing_company: {
    label: "Mailing Company",
    type: "keyword",
  },
  mailing_city: {
    label: "Mailing City",
    type: "keyword",
  },
  mailing_zip: {
    label: "Mailing Zip",
    type: "keyword",
  },
  mailing_country_region: {
    type: "country_region_select",
    label: "Mailing Country/State",
    keys: ["mailing_country", "mailing_state"],
  },

  opt_groups: [
    {
      label: "Customer Info",
      options: [
        "id",
        "created",
        "salutation",
        "first_name",
        "last_name",
        "birthday",
        "job_title",
        "company",
        "credits",
      ],
    },
    {
      label: "Order Info",
      options: ["last_order", "order_count", "order_total"],
    },
    {
      label: "Account",
      options: [
        "active_account",
        "customer_source",
        "referral_note",
        "referral_code",
        "vip_pickup",
        "mail_marketing_opt_in",
        "marketing_opt_in",
        "temporary_customer_notes",
        "special_shipping",
        "last_update",
      ],
    },
    {
      label: "Contact Info",
      options: ["email", "email_alt", "phone", "mobile", "work"],
    },
    {
      label: "Personal Information",
      options: [
        "first_name_spouse",
        "last_name_spouse",
        "email_spouse",
        "spouse_phone",
        "children",
        "pet",
      ],
    },
    {
      label: "Address",
      options: [
        "city",
        "zip",
        "personal_country_region",
        "billing_city",
        "billing_zip",
        "billing_country_region",
        "mailing_company",
        "mailing_city",
        "mailing_zip",
        "mailing_country_region",
      ],
    },
  ],
};
