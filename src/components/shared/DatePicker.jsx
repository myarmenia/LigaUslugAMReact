import React from "react";
import {TextField} from "@mui/material";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import {ReactComponent as DateIconSVG} from "../../assets/svg/DateIconSVG.svg";

const BasicDatePicker = React.forwardRef(({
    fieldProps = {},
    pickerProps = {},
    fieldStyle = {},
    value,
    onChange = () => {
    },
    placeholder = '',
}, ref) => {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                value={value || null}
                {...pickerProps}
                onChange={onChange}
                components={{
                    OpenPickerIcon: DateIconSVG,
                }}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        sx={{width: '241px', ...fieldStyle}}
                        inputProps={{...params.inputProps, placeholder}}
                    />
                }}
            />
        </LocalizationProvider>
    );
}
)
export default BasicDatePicker
