import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

CustomDatePicker.propTypes = {
  onSelectCallback: PropTypes.func,
};

function CustomDatePicker({ onSelectCallback }) {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateSelect = (date) => onSelectCallback(date);
  const handleDateChange = (date) => {
    if (date) setStartDate(date);
  };
  return (
    <DatePicker
      className="custom-date-picker"
      customInput={<TextField label={'Filter by date'} />}
      selected={startDate}
      onSelect={handleDateSelect} // when day is clicked
      onChange={handleDateChange} // only when value has changed
    />
  );
}

export default CustomDatePicker;
