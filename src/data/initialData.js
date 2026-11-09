
export const initialData = {
  students: [
    {
      roll: "230101",
      name: "Rahul Sharma",
      year: "1st Year",
      mess: "Mess C",
      paymentMode: "PREPAID",
      couponBalance: 0
    },
    {
      roll: "230102",
      name: "Priya Das",
      year: "1st Year",
      mess: "Mess C",
      paymentMode: "PREPAID",
      couponBalance: 0
    },
    {
      roll: "220101",
      name: "Amit Kumar",
      year: "2nd Year",
      mess: "Mess B",
      paymentMode: "PREPAID",
      couponBalance: 0
    },
    {
      roll: "210101",
      name: "Sneha Patnaik",
      year: "3rd Year",
      mess: "Mess A",
      paymentMode: "COUPON",
      couponBalance: 850
    },
    {
      roll: "200101",
      name: "Arjun Singh",
      year: "4th Year",
      mess: "Mess A",
      paymentMode: "COUPON",
      couponBalance: 850
    }
  ],

  attendance: [],

  transactions: [
    {
      id: 1,
      roll: "210101",
      type: "Coupon Purchase",
      amount: 500,
      date: "2026-11-06",
      description: "Initial coupon purchase"
    },
    {
      id: 2,
      roll: "210101",
      type: "Lunch Deduction",
      amount: -55,
      date: "2026-11-06",
      description: "Lunch coupon deduction"
    }
  ],

  menu: [
    {
      name: "Breakfast",
      time: "7:30 AM – 9:00 AM",
      items: ["Poha", "Bread", "Milk", "Tea"],
      price: 23
    },
    {
      name: "Lunch",
      time: "12:30 PM – 2:00 PM",
      items: ["Rice", "Dal", "Roti", "Sabzi"],
      price: 55
    },
    {
      name: "Dinner",
      time: "7:30 PM – 9:00 PM",
      items: ["Rice", "Roti", "Dal", "Paneer"],
      price: 44
    }
  ]
};

const STORAGE_KEY = "iiit_mess_management_data";

export function loadData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Unable to load saved data:", error);
  }

  return initialData;
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Unable to save data:", error);
    return false;
  }
}

export function resetData() {
  localStorage.removeItem(STORAGE_KEY);
  return initialData;
}
