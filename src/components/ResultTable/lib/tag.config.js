export const classNames = {
  Paid: "fig-tag fig-success",
  Pending: "fig-tag fig-warning",
  "Not Paid": "fig-tag fig-important",
  Authorized: "fig-tag fig-important",
  Void: "fig-tag fig-inverse",
  Voided: "fig-tag fig-inverse",

  Shipped: "fig-tag fig-success",
  "Partially Shipped": "fig-tag fig-important",
  Error: "fig-tag fig-important",
  Processing: "fig-tag fig-warning",
  Hold: "fig-tag fig-warning",
  "Not Shipped": "fig-tag fig-important",
  Cancelled: "fig-tag",
  "Hold Pickup": "fig-tag fig-warning",
  "Picked Up": "fig-tag fig-success",
  Completed: "fig-tag fig-success",

  Active: "fig-tag fig-success",
  Inactive: "fig-tag fig-important",
  Archived: "fig-tag fig-default",
  "Needs Attention": "fig-tag fig-warning",
};

export const shipMethods = {
  FedEx: {
    FDXGND: "FedEx Ground",
    FDXHME: "FedEx Home",
    COLDCHAIN: "FedEx Cold Chain",
    FDX3DAY: "FedEx 3 Day",
    FDX3DAYSAVER: "FedEx 3 Day Saver",
    FDX2DAY: "FedEx 2 Day",
    FDX1DAYSTD: "FedEx 1 Day Standard",
    FDX1DAYPRI: "FedEx 1 Day Priority",
  },

  UPS: {
    UPSGND: "UPS Ground",
    UPS3DAY: "UPS 3 Day",
    UPS2DAY: "UPS 2 Day",
    UPS1DAY: "UPS 1 Day Standard",
    UPS1DAYSAVER: "UPS 1 Day Saver",
  },

  GSO: {
    GSO: "GSO CPS",
    GSOL: "GSO L2L",
  },

  Local: {
    LOCAL: "Local Delivery",
  },
};
