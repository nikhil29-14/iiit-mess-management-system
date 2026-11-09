# IIIT Bhubaneswar Mess Management System

A web-based academic project developed to simplify mess operations at IIIT Bhubaneswar. The system provides a dashboard for student records, daily menus, meal attendance, coupon management, and transaction tracking.

## Live Application

https://iiit-mess-management-system.vercel.app/

## Source Code

https://github.com/nikhil29-14/iiit-mess-management-system

## Features

- **Dashboard:** Overview of registered students, meals served, attendance, and mess details.
- **Daily Menu:** Displays breakfast, lunch, dinner, timings, and meal prices.
- **Attendance Management:** Records student attendance for individual meals and prevents duplicate attendance entries.
- **Coupon Management:** Supports coupon purchases and automatic balance deductions for coupon-based students.
- **Transaction History:** Tracks coupon purchases and meal deductions.
- **Student Management:** Allows new student records to be added with mess and payment details.
- **Data Persistence:** Uses browser localStorage to retain changes after refreshing the application.

## Mess Structure

| Mess | Student Group | Payment Mode |
|---|---|---|
| Mess A | 3rd and 4th Year | Coupon Based |
| Mess B | 2nd Year | Prepaid |
| Mess C | 1st Year | Prepaid |

## Meal Prices

| Meal | Price |
|---|---:|
| Breakfast | ₹23 |
| Lunch | ₹55 |
| Dinner | ₹44 |

## Technology Stack

- React
- Vite
- JavaScript
- CSS
- Lucide React
- Browser localStorage
- GitHub
- Vercel

## Run Locally

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   `git clone https://github.com/nikhil29-14/iiit-mess-management-system.git`

2. Navigate into the project directory:

   `cd iiit-mess-management-system`

3. Install dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

5. Open the local URL shown in the terminal, usually:

   `http://localhost:5173`

### Production Build

Run:

`npm run build`

The production files are generated in the `dist` directory.

## Data Storage and Limitations

This version is a frontend-only academic prototype. Application data is stored in the browser's localStorage.

- Data persists in the same browser after refresh.
- Data is not shared between different browsers or devices.
- There is no backend server or centralized database.
- Authentication and role-based access control are not implemented.
- Coupon purchases are simulated within the application.

These limitations distinguish this demonstration version from a production-ready mess management platform.

## Project Purpose

The project demonstrates how common mess operations can be organized through a simple web application, including student management, prepaid and coupon-based meal attendance, and transaction tracking.

**Developed as an academic project at IIIT Bhubaneswar.**
