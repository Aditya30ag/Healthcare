import React, { useState } from 'react';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(2);
      setBmi(bmiValue);
      let bmiMessage = '';
      if (bmiValue < 18.5) {
        bmiMessage = 'Underweight';
      } else if (bmiValue < 24.9) {
        bmiMessage = 'Normal weight';
      } else if (bmiValue < 29.9) {
        bmiMessage = 'Overweight';
      } else {
        bmiMessage = 'Obesity';
      }
      setMessage(bmiMessage);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="w-full p-8 bg-white shadow-lg rounded-2xl mt- ">
       
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter your weight"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Height (cm):</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter your height"
          />
        </div>
        <button
          onClick={calculateBMI}
          className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Calculate BMI
        </button>
        {bmi && (
          <div className="mt-4">
            <p className="text-xl font-semibold">Your BMI: {bmi}</p>
            <p className="text-lg">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;