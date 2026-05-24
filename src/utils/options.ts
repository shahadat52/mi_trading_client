export const LIMIT_OPTIONS = [
  { label: 'Limit', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: 'All', value: 1000 },
];

export const CATEGORY_OPTIONS = [
  { value: "", label: "সকল" },
  { value: "khatungonj", label: "খাতুনগঞ্জ" },
  { value: "caktai", label: "চাক্তাই" },
  { value: "outside", label: "বাহির" },
]

export const SUPPLIER_TYPE_OPTIONS = [
  { value: "regular", label: "সাধারণ" },
  { value: "commission", label: "কমিশন" },
  { value: "common", label: "কমন" }
]

export const USER_ROLE_OPTIONS = [
  { value: '', label: 'Select Role' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'employee', label: 'Employee' },
  { value: 'specialManager', label: 'Special Manager' },
  { value: 'salesManager', label: 'Sales Manager' },
  { value: 'purchaseManager', label: 'Purchase Manager' },
  { value: 'deliveryManager', label: 'Delivery Manager' },
  { value: 'commissionManager', label: 'Commission Manager' },
];


export const PAYMENT_METHOD_OPTIONS = [
  { value: '', label: 'Select Payment Method' },
  { value: 'cash', label: 'Cash' },
  { value: 'bank', label: 'Bank' },
  { value: 'bkash', label: 'bKash' },
  { value: 'nagad', label: 'Nagad' },
  { value: 'rocket', label: 'Rocket' },
  { value: 'card', label: 'Card' },
];


export const MONTH_OPTIONS = [
  { value: '', label: 'Select Month' },
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

export const ATTENDANCE_STATUS_OPTIONS = [
  [
    { label: "Present", value: "present", color: "hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700" },
    { label: "Absent", value: "absent", color: "hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700" },
    { label: "Unpaid Leave", value: "unpaid_leave", color: "hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700" },
    { label: "Paid Leave", value: "paid_leave", color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700" },
  ]
];



