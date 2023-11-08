"use client"
import React, { useEffect, useState } from 'react';

const CalculatorForm = () => {
  const [principal, setPrincipal] = useState<string | number>('');
  const [percentage, setPercentage] = useState<string | number>('');
  const [days, setDays] = useState<string | number>('');
  const [finalAmount, setFinalAmount] = useState<number | undefined>();
  const [wFee, setWFee] = useState<string | undefined>();
  const [withdrawalAmount, setWithdrawalAmount] = useState<string | undefined>();

  const calculateAmount = () => {
    compoundedAmount(Number(principal), Number(days));
  };

  const compoundedAmount = (amount: number, times: number, start: number = 0 ) => {
    if(times == 0) {
        setFinalAmount(Number(amount))
    }else {
        compoundedAmount((amount * (1 + (Number(percentage) / 100))), --times)
    }
  }

  useEffect(() => {
    setWFee(`${parseFloat(`${finalAmount}`) * 0.15}`);
  }, [finalAmount])
  
  useEffect(() => {
    setWithdrawalAmount(`${parseFloat(`${finalAmount}`) - Number(wFee)}`)
  }, [wFee])
  
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Amount Calculator</h2>
        <div className="mb-4">
          <label className="block text-black text-left mb-2">Principal:</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            value={principal}
            onChange={(e) => setPrincipal(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-left mb-2">Percentage:</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            value={percentage}
            onChange={(e) => setPercentage(parseFloat(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-black text-left mb-2">Days:</label>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            value={days}
            onChange={(e) => setDays(parseFloat(e.target.value))}
          />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300" onClick={calculateAmount}>
          Calculate
        </button>
        {finalAmount && 
          <>
            <p className="text-black mt-4">Final Amount: <span className='text-red-500'>{parseFloat(`${finalAmount}`).toFixed(2)}</span></p>
            <p className="text-black mt-4">Withdrawal Fee(15%): <span className='text-red-500'>{parseFloat(`${wFee}`).toFixed(2)}</span></p>
            <p className="text-black mt-4">Withdrawal Amount: <span className='text-red-500'>{parseFloat(`${withdrawalAmount}`).toFixed(2)}</span></p>
          </>
        }
      </div>
    </div>
  );
};

export default CalculatorForm;
