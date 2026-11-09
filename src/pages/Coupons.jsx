
import { useState } from "react";
import { Wallet, PlusCircle, History } from "lucide-react";

function Coupons({ appData, setAppData }) {
  const couponStudents = appData.students.filter(
    (student) => student.paymentMode === "COUPON"
  );

  const [selectedRoll, setSelectedRoll] = useState(
    couponStudents[0]?.roll || ""
  );

  const selectedStudent = couponStudents.find(
    (student) => student.roll === selectedRoll
  );

  const transactions = appData.transactions.filter(
    (transaction) => transaction.roll === selectedRoll
  );

  const purchaseCoupon = () => {
    if (!selectedStudent) {
      alert("Please select a coupon-based student.");
      return;
    }

    const amount = 500;

    const newTransaction = {
      id: Date.now(),
      roll: selectedStudent.roll,
      type: "Coupon Purchase",
      amount,
      date: new Date().toLocaleDateString("en-CA"),
      description: "Coupon balance recharge"
    };

    setAppData((previous) => ({
      ...previous,
      students: previous.students.map((student) =>
        student.roll === selectedRoll
          ? {
              ...student,
              couponBalance: student.couponBalance + amount
            }
          : student
      ),
      transactions: [
        ...previous.transactions,
        newTransaction
      ]
    }));
  };

  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="coupons-page">
      <div className="page-header">
        <div>
          <h1>Coupon Management</h1>
          <p>Manage student coupon balances and purchases</p>
        </div>
      </div>

      {couponStudents.length === 0 ? (
        <div className="coupon-panel">
          <p>No coupon-based students are currently registered.</p>
        </div>
      ) : (
        <>
          <div className="coupon-panel">
            <div className="coupon-controls">
              <label htmlFor="coupon-student">
                Select Student
              </label>

              <select
                id="coupon-student"
                value={selectedRoll}
                onChange={(event) =>
                  setSelectedRoll(event.target.value)
                }
              >
                {couponStudents.map((student) => (
                  <option key={student.roll} value={student.roll}>
                    {student.name} ({student.roll})
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <div className="coupon-summary">
                <div className="coupon-balance-card">
                  <div>
                    <p>Available Coupon Balance</p>
                    <h2>₹{selectedStudent.couponBalance}</h2>
                    <span>{selectedStudent.name}</span>
                  </div>

                  <Wallet size={35} />
                </div>

                <button
                  className="primary-button"
                  onClick={purchaseCoupon}
                >
                  <PlusCircle size={18} />
                  Purchase ₹500 Coupons
                </button>
              </div>
            )}
          </div>

          <div className="coupon-panel">
            <div className="section-heading">
              <History size={21} />
              <h2>Transaction History</h2>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Transaction Type</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.length > 0 ? (
                    [...transactions]
                      .sort((a, b) => b.id - a.id)
                      .map((transaction) => (
                        <tr key={transaction.id}>
                          <td>{transaction.type}</td>
                          <td>{transaction.description}</td>
                          <td>{formatDate(transaction.date)}</td>
                          <td
                            className={
                              transaction.amount > 0
                                ? "transaction-credit"
                                : "transaction-debit"
                            }
                          >
                            {transaction.amount > 0 ? "+" : "-"}₹
                            {Math.abs(transaction.amount)}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="empty-table">
                        No transactions found for this student.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Coupons;
