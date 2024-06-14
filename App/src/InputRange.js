import React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './searchEngine.css';

function SalaryRangeSlider({value, setValue}) {
  return (
    <div>
      <InputRange
        maxValue={100000}
        minValue={0}
        value={value}
        onChange={value => setValue(value)}/>
    </div>
  );
}

export default SalaryRangeSlider;