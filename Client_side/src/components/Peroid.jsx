import { useState, useEffect } from "react";
import { Line } from "recharts";

export default function PeriodOvulationTracker() {
  const [isWoman, setIsWoman] = useState(null);
  const [lastPeriodDate, setLastPeriodDate] = useState(
    localStorage.getItem("lastPeriodDate") || ""
  );
  const [cycleLength, setCycleLength] = useState(
    localStorage.getItem("cycleLength") || 28
  );
  const [predictedData, setPredictedData] = useState([]);

  useEffect(() => {
    if (lastPeriodDate) {
      localStorage.setItem("lastPeriodDate", lastPeriodDate);
    }
  }, [lastPeriodDate]);

  useEffect(() => {
    localStorage.setItem("cycleLength", cycleLength);
  }, [cycleLength]);

  useEffect(() => {
    if (lastPeriodDate) {
      generatePrediction();
    }
  }, [lastPeriodDate, cycleLength]);

  const generatePrediction = () => {
    const startDate = new Date(lastPeriodDate);
    let data = [];
    for (let i = 0; i < 4; i++) {
      let periodStart = new Date(startDate);
      periodStart.setDate(periodStart.getDate() + i * cycleLength);
      let ovulationDay = new Date(periodStart);
      ovulationDay.setDate(ovulationDay.getDate() + 14);
      data.push({ cycle: i + 1, period: periodStart, ovulation: ovulationDay });
    }
    setPredictedData(data);
  };

  if (isWoman === null) {
    return (
      <div className="p-6 max-w-md mx-auto bg-pink-200 rounded-2xl shadow-md space-y-6 text-center">
        <h2 className="text-xl font-bold">Are you a woman?</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsWoman(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Yes
          </button>
          <button
            onClick={() => setIsWoman(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  if (!isWoman) return null;

  return (
    <div className="p-6 max-w-md mx-auto bg-pink-200 rounded-2xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">Period & Ovulation Tracker</h2>
      <h3 className="text-xl font-bold">For Women</h3>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-semibold">Last Period Date</span>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold">Cycle Length (Days)</span>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </label>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Predictions</h3>
        <ul className="list-disc pl-6 text-sm">
          {predictedData.map((entry, index) => (
            <li key={index} className="text-gray-700">
              Cycle {entry.cycle}: Period Start: {entry.period.toDateString()}, Ovulation: {entry.ovulation.toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
