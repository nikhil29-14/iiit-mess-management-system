
import { useMemo, useState } from "react";
import { Users, Search, UserPlus } from "lucide-react";

function Students({ appData, setAppData }) {
  const [search, setSearch] = useState("");
  const [messFilter, setMessFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    roll: "",
    name: "",
    year: "1st Year",
    mess: "Mess C",
    paymentMode: "PREPAID"
  });

  const students = appData.students || [];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.roll.toLowerCase().includes(search.toLowerCase());

      const matchesMess =
        messFilter === "All" || student.mess === messFilter;

      const matchesPayment =
        paymentFilter === "All" ||
        student.paymentMode === paymentFilter;

      return matchesSearch && matchesMess && matchesPayment;
    });
  }, [students, search, messFilter, paymentFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleYearChange = (event) => {
    const year = event.target.value;

    const defaultMess = {
      "1st Year": "Mess C",
      "2nd Year": "Mess B",
      "3rd Year": "Mess A",
      "4th Year": "Mess A"
    };

    const defaultPayment = year === "3rd Year" || year === "4th Year"
      ? "COUPON"
      : "PREPAID";

    setFormData((previous) => ({
      ...previous,
      year,
      mess: defaultMess[year],
      paymentMode: defaultPayment
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const roll = formData.roll.trim();
    const name = formData.name.trim();

    if (!roll || !name) {
      alert("Please enter all required details.");
      return;
    }

    if (students.some((student) => student.roll === roll)) {
      alert("A student with this roll number already exists.");
      return;
    }

    const newStudent = {
      ...formData,
      roll,
      name,
      couponBalance: formData.paymentMode === "COUPON" ? 0 : 0
    };

    setAppData((previous) => ({
      ...previous,
      students: [...previous.students, newStudent]
    }));

    setFormData({
      roll: "",
      name: "",
      year: "1st Year",
      mess: "Mess C",
      paymentMode: "PREPAID"
    });

    setShowForm(false);
  };

  return (
    <div className="students-page">
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage student records and payment modes</p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <UserPlus size={18} />
          {showForm ? "Close Form" : "Add Student"}
        </button>
      </div>

      {showForm && (
        <div className="student-form-panel">
          <h2>Add New Student</h2>

          <form onSubmit={handleSubmit}>
            <div className="student-form-grid">
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Student Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleYearChange}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mess</label>
                <select
                  name="mess"
                  value={formData.mess}
                  onChange={handleChange}
                >
                  <option>Mess A</option>
                  <option>Mess B</option>
                  <option>Mess C</option>
                </select>
              </div>

              <div className="form-group">
                <label>Payment Mode</label>
                <select
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                >
                  <option value="PREPAID">Prepaid</option>
                  <option value="COUPON">Coupon Based</option>
                </select>
              </div>
            </div>

            <button type="submit" className="primary-button">
              Add Student
            </button>
          </form>
        </div>
      )}

      <div className="student-summary">
        <div className="student-summary-card">
          <Users size={25} />
          <div>
            <p>Total Students</p>
            <h2>{students.length}</h2>
          </div>
        </div>
      </div>

      <div className="student-panel">
        <div className="student-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={messFilter}
            onChange={(event) => setMessFilter(event.target.value)}
          >
            <option value="All">All Messes</option>
            <option value="Mess A">Mess A</option>
            <option value="Mess B">Mess B</option>
            <option value="Mess C">Mess C</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(event) => setPaymentFilter(event.target.value)}
          >
            <option value="All">All Payment Modes</option>
            <option value="PREPAID">Prepaid</option>
            <option value="COUPON">Coupon Based</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>Year</th>
                <th>Mess</th>
                <th>Payment Mode</th>
                <th>Coupon Balance</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.roll}>
                    <td>{student.roll}</td>
                    <td><strong>{student.name}</strong></td>
                    <td>{student.year}</td>
                    <td>{student.mess}</td>
                    <td>
                      <span
                        className={`payment-badge ${
                          student.paymentMode === "PREPAID"
                            ? "prepaid"
                            : "coupon"
                        }`}
                      >
                        {student.paymentMode === "PREPAID"
                          ? "Prepaid"
                          : "Coupon Based"}
                      </span>
                    </td>
                    <td>
                      {student.paymentMode === "COUPON"
                        ? `₹${student.couponBalance}`
                        : "—"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-table">
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

export default Students;
