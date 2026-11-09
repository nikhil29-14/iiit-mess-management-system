
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import DailyMenu from "./pages/DailyMenu";
import Attendance from "./pages/Attendance";
import Coupons from "./pages/Coupons";
import Transactions from "./pages/Transactions";
import Students from "./pages/Students";

import { loadData, saveData } from "./data/initialData";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [appData, setAppData] = useState(loadData);

  useEffect(() => {
    saveData(appData);
  }, [appData]);

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        {activePage === "Dashboard" && (
          <Dashboard appData={appData} />
        )}

        {activePage === "Daily Menu" && (
          <DailyMenu appData={appData} />
        )}

        {activePage === "Attendance" && (
          <Attendance
            appData={appData}
            setAppData={setAppData}
          />
        )}

        {activePage === "Coupons" && (
          <Coupons
            appData={appData}
            setAppData={setAppData}
          />
        )}

        {activePage === "Transactions" && (
          <Transactions appData={appData} />
        )}

        {activePage === "Students" && (
          <Students
            appData={appData}
            setAppData={setAppData}
          />
        )}
      </main>
    </div>
  );
}

export default App;
