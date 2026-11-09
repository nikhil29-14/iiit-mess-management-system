
import { useMemo, useState } from "react";
import { ClipboardCheck, Search } from "lucide-react";

const mealPrices = {
  Breakfast: 23,
  Lunch: 55,
  Dinner: 44
};

function Attendance({ appData, setAppData }) {
  const [meal, setMeal] = useState("Breakfast");
  const [search, setSearch] = useState("");
  const [messFilter, setMessFilter] = useState("All");

  const today = new Date().toLocaleDateString("en-CA");

  const students = appData.students || [];
  const attendance = appData.attendance || [];

  const todayAttendance = attendance.filter(
    (record) =>
      record.date === today &&
      record.meal === meal
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.roll.toLowerCase().includes(search.toLowerCase());

      const matchesMess =
        messFilter === "All" || student.mess === messFilter;

      return matchesSearch && matchesMess;
    });
  }, [students, search, messFilter]);

  const getAttendanceStatus = (roll) => {
    const record = attendance.find(
      (item) =>
        item.roll === roll &&
        item.date === today &&
        item.meal === meal
    );

    return record ? record.status : "Not Marked";
  };

  const handleAttendance = (student) => {
    const currentStatus = getAttendanceStatus(student.roll);

    if (currentStatus === "Present") {
      alert("Attendance has already been marked for this meal.");
      return;
    }

    if (
      student.paymentMode === "COUPON" &&
      student.couponBalance < mealPrices[meal]
    ) {
      alert(
        `${student.name} has insufficient coupon balance. Please purchase coupons first.`
      );
      return;
    }

    const newRecord = {
      id: Date.now(),
      roll: student.roll,
      date: today,
      meal,
      status: "Present"
    };

    const updatedStudents = students.map((item) => {
      if (
        item.roll === student.roll &&
        item.paymentMode === "COUPON"
      ) {
        return {
          ...item,
          couponBalance: item.couponBalance - mealPrices[meal]
        };
      }

      return item;
    });

    const newTransaction =
      student.paymentMode === "COUPON"
        ? {
            id: Date.now() + 1,
            roll: student.roll,
            type: `${meal} Deduction`,
            amount: -mealPrices[meal],
            date: today,
            description: `${meal} attendance coupon deduction`
          }
        : null;

    setAppData((previous) => ({
      ...previous,
      students: updatedStudents,
      attendance: [...previous.attendance, newRecord],
      transactions: newTransaction
        ? [...previous.transactions, newTransaction]
        : previous.transactions
    }));
  };

  const presentCount = todayAttendance.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = filteredStudents.filter(
    (student) => getAttendanceStatus(student.roll) === "Not Marked"
  ).length;

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1>Attendance Management</h1>
          <p>Record daily student meal attendance</p>
        </div>
      </div>

      <div className="attendance-summary">
        <div className="summary-card">
          <ClipboardCheck size={24} />
          <div>
            <p>Present</p>
            <h2>{presentCount}</h2>
          </div>
        </div>

        <div className="summary-card">
          <div>
            <p>Not Marked</p>
            <h2>{absentCount}</h2>
          </div>
        </div>
      </div>

      <div className="attendance-panel">
        <div className="attendance-controls">
          <div>
            <label>Select Meal</label>
            <select
              value={meal}
              onChange={(event) => setMeal(event.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div>
            <label>Filter by Mess</label>
            <select
              value={messFilter}
              onChange={(event) => setMessFilter(event.target.value)}
            >
              <option value="All">All Messes</option>
              <option value="Mess A">Mess A</option>
              <option value="Mess B">Mess B</option>
              <option value="Mess C">Mess C</option>
            </select>
          </div>

          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search student..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Student Name</th>
                <th>Year</th>
                <th>Mess</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const status = getAttendanceStatus(student.roll);

                  return (
                    <tr key={student.roll}>
                      <td>{student.roll}</td>
                      <td><strong>{student.name}</strong></td>
                      <td>{student.year}</td>
                      <td>{student.mess}</td>
                      <td>{student.paymentMode}</td>
                      <td>
                        <span
                          className={`attendance-status ${
                            status === "Present"
                              ? "present"
                              : "absent"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="attendance-button"
                          disabled={status === "Present"}
                          onClick={() => handleAttendance(student)}
                        >
                          {status === "Present"
                            ? "Marked"
                            : "Mark Present"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="empty-table">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
