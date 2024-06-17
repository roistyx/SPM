import React, { useState } from 'react';

function calculateMinDate() {
  const today = new Date();
  const minYear = today.getFullYear() - 18;
  const minMonth = today.getMonth() + 1; // JavaScript months are 0-indexed, add 1 for normal month.
  const minDay = today.getDate();
  return `${minYear}-${minMonth.toString().padStart(2, '0')}-${minDay
    .toString()
    .padStart(2, '0')}`;
}

function DynamicDateInput({ handleChange }) {
  const [inputType, setInputType] = useState('text'); // Start with 'text'
  const [value, setValue] = useState('');

  const handleFocus = () => {
    setInputType('date'); // Change to 'date' on focus
  };

  const handleBlur = (event) => {
    if (event.target.value === '') {
      setInputType('text'); // Change back to 'text' if no date is selected
    }
  };

  const handleDateValueChange = (event) => {
    setValue(event.target.value);
    handleChange(event);
  };

  return (
    <input
      type={inputType}
      name="dob"
      placeholder="Date of Birth"
      value={value}
      max={calculateMinDate()}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleDateValueChange}
    />
  );
}

export default DynamicDateInput;
