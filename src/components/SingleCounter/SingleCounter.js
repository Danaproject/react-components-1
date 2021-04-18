import React, { useState, useEffect } from 'react';
import './SingleCounter.css';

const limit = 500;

const SingleCounter = ({ initialValue = 0 }) => {

  const [value, setValue] = useState(initialValue);
  const [step, setStep] = useState(1);

  const handleDecrement = () =>
    setValue((prevState) => (prevState - step < 0 ? 0 : prevState - step));

  const handleIncrement = () =>
    setValue((prevState) =>
      prevState + step > limit ? limit : prevState + step,
    );

  const handleChangeStep = (e) => setStep(Number(e.target.value));

  // component did mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('value'));
    setValue(data);
  }, []);

  // component did update - after data update
  useEffect(() => {
    localStorage.setItem('value', JSON.stringify(value));
  }, [value]);

  useEffect(() => {
    console.log('value:', value);
  }, [value]);

  return (
    <div className="SingleCounter">
      <h2>Counter 0 - 500</h2>

      <label>
        <span>step</span>
        <select value={step} onChange={handleChangeStep}>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </label>

      <div className="SingleCounter__buttons">
        <button className="SingleCounter__button" onClick={handleDecrement}>
          -
        </button>
        <p className="SingleCounter__value">{value}</p>
        <button className="SingleCounter__button" onClick={handleIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default SingleCounter;
