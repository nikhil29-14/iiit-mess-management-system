
import {
  LayoutDashboard,
  Utensils,
  ClipboardCheck,
  Wallet,
  Receipt,
  Users
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Daily Menu", icon: Utensils },
  { name: "Attendance", icon: ClipboardCheck },
  { name: "Coupons", icon: Wallet },
  { name: "Transactions", icon: Receipt },
  { name: "Students", icon: Users }
];

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>IIIT BBSR</h2>
        <p>Mess Management</p>
      </div>

      <div className="sidebar-menu">
        <p className="menu-heading">MAIN MENU</p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`menu-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <p>IIIT Bhubaneswar</p>
        <span>Mess Management System</span>
      </div>
    </aside>
  );
}

export default Sidebar;
