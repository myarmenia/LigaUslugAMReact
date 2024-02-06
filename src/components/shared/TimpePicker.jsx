import React from "react";
import { TextField } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import { ReactComponent as TimePickerSVG } from "../../assets/svg/TimePickerSVG.svg";

export default function BasicTimePicker({
  fieldProps = {},
  pickerProps = {},
  fieldStyle = {},
  value,
  onChange = () => {},
  placeholder = "",
}) {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <TimePicker
        value={value || null}
        {...pickerProps}
        onChange={onChange}
        components={{
          OpenPickerIcon: TimePickerSVG,
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              sx={{ width: "241px", ...fieldStyle }}
              inputProps={{ ...params.inputProps, placeholder }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
}
