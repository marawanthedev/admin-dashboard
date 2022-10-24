import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

CustomDatePicker.propTypes = {
  onSelectCallback: PropTypes.func,
};

function CustomDatePicker({ onSelectCallback, text, previous }) {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateSelect = (date) => onSelectCallback(date);
  const handleDateChange = (date) => {
    if (date) setStartDate(date);
  };
  return (
    <DatePicker
      className="custom-date-picker"
      customInput={<TextField label={text} />}
      selected={startDate}
      name={text}
      onSelect={handleDateSelect} // when day is clicked
      onChange={handleDateChange} // only when value has changed
      maxDate={new Date()}
    />
  );
}

export default CustomDatePicker;
