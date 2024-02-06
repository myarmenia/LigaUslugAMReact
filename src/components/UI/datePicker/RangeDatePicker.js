import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/x-date-pickers/AdapterDateFns';
// import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import {useStyles} from "./CustomDatePicker";
import {IconButton, InputAdornment} from "@mui/material";
import Calendar from "../../../assets/image/Calendar.png";
import {changeDateFormat} from "../../../helper";
import {  LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateRangePicker } from '@mui/lab';

const RangeDatePicker = ({value, fun, touched, errors}) => {
    //const [value, setValue] = React.useState([null, null]);
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    return (
        <Box className={classes.root}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText=""
                        endText=""
                        value={value}
                        open={open}
                        onChange={(newValue) => {
                            setOpen(!open)
                            fun(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <Box>
                                <TextField
                                    {...startProps}
                                    error={Boolean(touched && errors)}
                                    helperText={touched && errors}
                                    autoComplete={'off'}
                                    InputProps={{
                                        style: {
                                            paddingBottom: '2px',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={(e) => setOpen(!open)}>
                                                    <img alt="Calendar" src={Calendar} height={20} width={20}/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{
                                        ...startProps.inputProps,
                                        placeholder: 'от',
                                        value: startProps.inputProps.value ? changeDateFormat(startProps.inputProps.value) : null
                                    }}
                                    sx={{
                                        svg: {display: "none"},
                                        input: {height: 10, borderRadius: 20},
                                        mb: '10px',
                                    }}
                                />
                                <TextField
                                    {...endProps}
                                    error={Boolean(touched && errors)}
                                    helperText={touched && errors}
                                    autoComplete={'off'}
                                    inputProps={{
                                        ...endProps.inputProps,
                                        placeholder: 'до',
                                        value: endProps.inputProps.value ? changeDateFormat(endProps.inputProps.value) : null,
                                    }}
                                    InputProps={{
                                        style: {
                                            paddingBottom: '2px',
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={(e) => setOpen(!open)}>
                                                    <img alt="Calendar" src={Calendar} height={20} width={20}/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        svg: {display: "none"},
                                        input: {height: 10, borderRadius: 20},
                                    }}
                                />
                            </Box>
                        )}
                    />
            </LocalizationProvider>
        </Box>
    );
}

export default RangeDatePicker;
