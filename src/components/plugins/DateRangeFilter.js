import * as React from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DateRangePicker(props) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" spacing={2}>
            <DatePicker
                label="Start Date"
                value={startDate}
                views={['year', 'month', 'day']}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  props.onDateChange({
                    startDate: newValue,
                    endDate: endDate
                  })
                }}
                renderInput={(params) => <TextField {...params} data-testid="startDate" />}
            />
            <DatePicker
                label="End Date"
                value={endDate}
                views={['year', 'month', 'day']}
                minDate={startDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  props.onDateChange({
                    startDate: startDate,
                    endDate: newValue
                  })
                }}
                renderInput={(params) => <TextField {...params}  data-testid="endDate" />}
            />
      </Stack>
    </LocalizationProvider>
  );
}