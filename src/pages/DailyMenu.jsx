
import { Utensils } from "lucide-react";

function DailyMenu({ appData }) {
  const meals = appData.menu || [];

  return (
    <div className="daily-menu-page">
      <div className="page-header">
        <div>
          <h1>Daily Menu</h1>
          <p>Today's meals, timings and prices</p>
        </div>
      </div>

      <div className="menu-grid">
        {meals.map((meal) => (
          <div className="daily-meal-card" key={meal.name}>
            <div className="meal-icon">
              <Utensils size={26} />
            </div>

            <h2>{meal.name}</h2>

            <p className="meal-time">{meal.time}</p>

            <div className="meal-items">
              <h3>Today's Items</h3>

              <ul>
                {meal.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="meal-price">
              <span>Meal Price</span>
              <strong>₹{meal.price}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyMenu;
