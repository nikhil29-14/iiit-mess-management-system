
import {
  Users,
  Utensils,
  ClipboardCheck,
  Wallet
} from "lucide-react";

function Dashboard({ appData }) {
  const students = appData.students || [];
  const attendance = appData.attendance || [];

  const today = new Date().toLocaleDateString("en-CA");

  const todayAttendance = attendance.filter(
    (record) => record.date === today
  );

  const presentCount = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const couponStudents = students.filter(
    (student) => student.paymentMode === "COUPON"
  );

  const activeCoupons = couponStudents.filter(
    (student) => student.couponBalance > 0
  ).length;

  const stats = [
    {
      title: "Total Students",
      value: students.length,
      icon: Users
    },
    {
      title: "Meals Served Today",
      value: presentCount,
      icon: Utensils
    },
    {
      title: "Attendance Records Today",
      value: todayAttendance.length,
      icon: ClipboardCheck
    },
    {
      title: "Students with Coupon Balance",
      value: activeCoupons,
      icon: Wallet
    }
  ];

  const messes = [
    {
      name: "Mess A",
      years: "3rd & 4th Year",
      payment: "Coupon Based"
    },
    {
      name: "Mess B",
      years: "2nd Year",
      payment: "Prepaid"
    },
    {
      name: "Mess C",
      years: "1st Year",
      payment: "Prepaid"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome to the IIIT Bhubaneswar Mess Management System
          </p>
        </div>

        <div className="admin-profile">
          <span>Admin</span>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div>
                <p>{stat.title}</p>
                <h2>{stat.value}</h2>
              </div>

              <div className="stat-icon">
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-section">
        <h2>Mess Overview</h2>

        <div className="mess-grid">
          {messes.map((mess) => {
            const messStudents = students.filter(
              (student) => student.mess === mess.name
            );

            return (
              <div className="mess-card" key={mess.name}>
                <h3>{mess.name}</h3>
                <p>{mess.years}</p>
                <span>{mess.payment}</span>
                <p className="mess-student-count">
                  {messStudents.length} Students
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
