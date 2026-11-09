
import { useMemo, useState } from "react";
import { Receipt, TrendingUp, TrendingDown, Search } from "lucide-react";

function Transactions({ appData }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const transactions = appData.transactions || [];

  const getStudentName = (roll) => {
    const student = appData.students.find(
      (student) => student.roll === roll
    );

    return student ? student.name : "Unknown Student";
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const studentName = getStudentName(transaction.roll).toLowerCase();

      const matchesSearch =
        studentName.includes(search.toLowerCase()) ||
        transaction.roll.includes(search) ||
        transaction.type.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Purchase" && transaction.amount > 0) ||
        (filter === "Deduction" && transaction.amount < 0);

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter, appData.students]);

  const totalPurchases = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalDeductions = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);

  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="transactions-page">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>View coupon purchases and meal deductions</p>
        </div>
      </div>

      <div className="transaction-summary">
        <div className="transaction-summary-card">
          <div>
            <p>Total Purchases</p>
            <h2>₹{totalPurchases}</h2>
          </div>
          <TrendingUp size={26} />
        </div>

        <div className="transaction-summary-card">
          <div>
            <p>Total Deductions</p>
            <h2>₹{totalDeductions}</h2>
          </div>
          <TrendingDown size={26} />
        </div>

        <div className="transaction-summary-card">
          <div>
            <p>Total Transactions</p>
            <h2>{transactions.length}</h2>
          </div>
          <Receipt size={26} />
        </div>
      </div>

      <div className="transaction-panel">
        <div className="transaction-controls">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by student, roll number or type..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="All">All Transactions</option>
            <option value="Purchase">Purchases</option>
            <option value="Deduction">Deductions</option>
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Student</th>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>#{transaction.id}</td>
                    <td>
                      <strong>{getStudentName(transaction.roll)}</strong>
                      <br />
                      <small>{transaction.roll}</small>
                    </td>
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
                  <td colSpan="6" className="empty-table">
                    No transactions found.
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

export default Transactions;
