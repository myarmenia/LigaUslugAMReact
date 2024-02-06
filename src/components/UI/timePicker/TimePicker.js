import { Box } from '@mui/material';
import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as TP } from '@mui/x-date-pickers/TimePicker';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useEffect } from 'react';


export function TimePicker({ fun, value }) {
  const [detaValue, setDetaValue] = useState('');
  useEffect(() => {
    setDetaValue(value);
  }, [value]);
  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']} sx={{ padding: '0', maxWidth: '210px' }}>
          <TP
            value={detaValue}
            onChange={(time) => {
              // setDetaValue(dayjs(time).format('YYYY-MM-DD'));
              setDetaValue(dayjs(time).format('HH:mm:ss'));
              fun(dayjs(time).format('HH:mm:ss'));
            }}
            sx={{
              height: '43px',

              '& input[type="text"]': {
                height: '43px',

                padding: '0px 14px',
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
}
