import { useState, useEffect } from "react";

export default function WaterNutritionTracker() {
  const [waterIntake, setWaterIntake] = useState(() => {
    return JSON.parse(localStorage.getItem("waterIntake")) || 0;
  });
  const [meals, setMeals] = useState(() => {
    return JSON.parse(localStorage.getItem("meals")) || [];
  });
  const [mealInput, setMealInput] = useState("");

  useEffect(() => {
    localStorage.setItem("waterIntake", JSON.stringify(waterIntake));
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);

  const addWater = () => {
    if (waterIntake < 8) {
      setWaterIntake(waterIntake + 1);
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(waterIntake - 1);
    }
  };

  const addMeal = () => {
    if (mealInput.trim() !== "") {
      setMeals([...meals, mealInput]);
      setMealInput("");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-green-200 rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">Water & Nutrition Tracker</h2>
      
      {/* Water Tracker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Water Intake</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={removeWater}
            className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            -
          </button>
          <span className="text-lg font-bold">{waterIntake}/8 Glasses</span>
          <button
            onClick={addWater}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            +
          </button>
        </div>
      </div>
      
      {/* Nutrition Tracker */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Meal Tracker</h3>
        <div className="flex space-x-2">
          <input
            type="text"
            value={mealInput}
            onChange={(e) => setMealInput(e.target.value)}
            placeholder="Enter meal"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={addMeal}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-6 text-sm">
          {meals.map((meal, index) => (
            <li key={index} className="text-gray-700">{meal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
