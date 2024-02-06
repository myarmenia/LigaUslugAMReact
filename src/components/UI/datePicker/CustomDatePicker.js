import React, { useEffect, useState } from 'react';
import { IconButton, InputAdornment, TextField, Box, useMediaQuery } from '@mui/material';
import Calendar from '../../../assets/image/Calendar.png';
import moment from 'moment';
import { makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'];

export const useStyles = makeStyles({
  root: {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 10,
    '& > .MuiPickerDTToolbar-toolbar.MuiToolbar-root': {},
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#808080',
        borderRadius: '10px',
        backgroundColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'gray',
      },
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #808080',
        borderRadius: '10px',
      },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #808080',
        borderRadius: '10px',
      },
      //focus
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: '1px solid blue',
      },
      // '&.css-rueraa-MuiFormHelperText-root': {
      //   color: 'red !importman',
      // },
      '& fieldset': {
        borderColor: 'black !important',
        border: '2px solid black !important',
      },
    },
  },
});

const CustomDatePicker = (
  {
    value,
    name,
    orders = [],
    removeData = () => {},
    fun,
    touched,
    errors,
    disablePast,
    maxDate,
    width = {},
    placement,
  },
  props,
) => {
  const [locale] = useState('ru');
  const [open, setOpen] = useState(false);
  const [detaValue, setDetaValue] = useState('');
  const max700 = useMediaQuery('(max-width:700px)');

  useEffect(() => {
    // if (!value) {
    //   // setDetaValue(dayjs(new Date()).format('YYYY-MM-DD'));
    // }
    if (!value) {
      const d = dayjs(value);
      if (d) setDetaValue(d);
    }
  }, [value]);

  return (
    <Box sx={{ ...width }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker
          value={detaValue}
          // value={}
          name={name}
          open={open}
          // DialogProps={{
          // 	PaperProps: {
          // 		anchorOrigin: {vertical: "top", horizontal: "left"},
          // 		transformOrigin: {vertical: "top", horizontal: "left"},
          // 	},
          // }}

          PopperProps={{
            anchorOrigin: { vertical: 'top', horizontal: 'left' },
            transformOrigin: { vertical: 'top', horizontal: 'left' },
            placement: 'top',
          }}
          maxDate={maxDate ? new Date() : undefined}
          // error={""}
          disablePast={disablePast}
          sx={{
            height: '43px',
            color: '#000',
            backgroundColor: '#fff',
            // border:"2px solid black",
            borderRadius: 10,
            '& > .MuiPickerDTToolbar-toolbar.MuiToolbar-root': {},
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                // borderColor: '#808080',
                borderRadius: '10px',
                //width: '100%',
                backgroundColor: 'transparent',
              },
              // '&:hover fieldset': {
              //   borderColor: 'blue',
              // },
              '&.Mui-focused fieldset': {
                borderColor: 'gray',
              },
              // '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              //   border: '1px solid #808080',
              //   borderRadius: '10px',
              // },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #808080',
                borderRadius: '10px',
              },
              // //focus
              // '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              //   border: '1px solid blue',
              // },
              '& input[type="text"]': {
                height: '43px',
                padding: '0px 14px',
              },
            },
          }}
          onOpen={() => {
            setOpen(true);
            removeData(orders);
          }}
          // classes={classes.root}
          onChange={(date) => {
            
            setOpen(false);
            // setDetaValue(dayjs(date).format('YYYY-MM-DD'));
            setDetaValue(dayjs(date));
            fun(dayjs(date).format('YYYY-MM-DD'));
          }}
          onClose={() => {
            setOpen(false);
            removeData(orders);
          }}
          inputFormat="DD.MM.YYYY"
          // renderInput={(params) => {
          //   return (
          //     <TextField
          //       disabled={true}
          //       error={true}
          //       helperText={
          //         touched &&
          //         errors ===
          //           'executor_profile_work_experiences[0].dismissal_data must be a `date` type, but the final value was: `Invalid Date` (cast from the value `"Invalid Date"`).'
          //           ? ' '
          //           : errors
          //       }
          //       autoComplete={'off'}
          //       {...params}
          //       inputProps={{
          //         ...params.inputProps,
          //         placeholder: 'день месяц год',
          //         value: params.inputProps.value,
          //         className: 'disable',
          //         // sx:{
          //         // 	color: "rgba(0, 0, 0,100)",
          //         // 	"&[disabled]": {
          //         // 	color: "rgba(0, 0, 0,100)",
          //         // }},
          //         style: { cursor: 'default' },
          //         // disabled: true,
          //       }}
          //       InputProps={{
          //         sx: {
          //           borderRadius: '10px',
          //           borderColor: 'rgb(128 128 128)',
          //         },
          //         // endAdornment: (
          //         //   <InputAdornment
          //         //     position="end"
          //         //     onClick={() => {
          //         //       console.log(3333);
          //         //     }}>
          //         //     <IconButton
          //         //       onClick={(e) => {
          //         //         setOpen(!open);
          //         //         removeData(orders);
          //         //       }}>
          //         //       <img alt="Calendar" src={Calendar} height={20} width={20} />
          //         //     </IconButton>
          //         //   </InputAdornment>
          //         // ),
          //         onClick: () => console.log(8888),
          //       }}
          //       sx={{
          //         // "& .MuiInputBase-input": {
          //         // 	// set the color of the input when the TextField is disabled
          //         // 	"&[disabled]": {
          //         // 		color: "rgba(0, 0, 0,100)",
          //         // 	},
          //         // },
          //         svg: { display: 'none' },
          //         input: { height: 10 },
          //         '& .css-rueraa-MuiFormHelperText-root': {
          //           color: 'red',
          //         },
          //         ...width,
          //       }}
          //       {...props}
          //     />
          //   );
          // }}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CustomDatePicker;

// import React, { useEffect, useState } from 'react';
// import { IconButton, InputAdornment, TextField, Box } from '@mui/material';
// import Calendar from '../../../assets/image/Calendar.png';
// import moment from 'moment';
// import { makeStyles } from '@material-ui/core';
// import dayjs from 'dayjs';
// import 'dayjs/locale/fr';
// import 'dayjs/locale/ru';
// import 'dayjs/locale/de';
// import 'dayjs/locale/ar-sa';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// const locales = ['en', 'fr', 'de', 'ru', 'ar-sa'];

// export const useStyles = makeStyles({
//   root: {
//     color: '#000',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     '& > .MuiPickerDTToolbar-toolbar.MuiToolbar-root': {},
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         borderColor: '#808080',
//         borderRadius: '10px',
//         backgroundColor: 'transparent',
//       },
//       '&:hover fieldset': {
//         borderColor: 'blue',
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: 'gray',
//       },
//       '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
//         border: '1px solid #808080',
//         borderRadius: '10px',
//       },
//       '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
//         border: '1px solid #808080',
//         borderRadius: '10px',
//       },
//       //focus
//       '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//         border: '1px solid blue',
//       },
//       '&.css-rueraa-MuiFormHelperText-root': {
//         color: 'red !importman',
//       },
//     },
//   },
// });

// const CustomDatePicker = (
//   {
//     value,
//     name,
//     orders = [],
//     removeData = () => {},
//     fun,
//     touched,
//     errors,
//     disablePast,
//     maxDate,
//     width = {},
//   },
//   props,
// ) => {
//   const [locale, setLocale] = React.useState('ru');
//   const [open, setOpen] = useState(false);
//   const [detaValue, setDetaValue] = useState('');

//   useEffect(() => {
//     if (!value) {
//       setDetaValue(dayjs(new Date()).format('YYYY-MM-DD'));
//     } else {
//       setDetaValue(dayjs(value).format('YYYY-MM-DD'));
//     }
//   }, [value]);
//   return (
//     <Box sx={{ ...width }}>
//       <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
//         <DatePicker
//           value={detaValue}
//           name={name}
//           // open={!!open}
//           maxDate={maxDate ? new Date() : undefined}
//           error={false}
//           disablePast={disablePast}
//           sx={{
//             color: '#000',
//             backgroundColor: '#fff',
//             borderRadius: 10,
//             '& > .MuiPickerDTToolbar-toolbar.MuiToolbar-root': {},
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#808080',
//                 borderRadius: '10px',
//                 //width: '100%',
//                 backgroundColor: 'transparent',
//               },
//               '&:hover fieldset': {
//                 borderColor: 'blue',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: 'gray',
//               },
//               '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
//                 border: '1px solid #808080',
//                 borderRadius: '10px',
//               },
//               '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
//                 border: '1px solid #808080',
//                 borderRadius: '10px',
//               },
//               //focus
//               '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 border: '1px solid blue',
//               },
//             },
//           }}
//           // classes={classes.root}
//           onChange={(date) => {
//             setOpen(false);
//             setDetaValue(dayjs(date).format('YYYY-MM-DD'));
//             fun(dayjs(date).format('YYYY-MM-DD'));
//           }}
//           onClose={(date) => {
//             setOpen(false);
//           }}
//           // inputFormat="dd/MM/yyyy"
//           renderInput={(params) => {
//             return (
//               <TextField
//                 disabled={true}
//                 onClick={() => {
//                   setOpen(true);
//                 }}
//                 error={true}
//                 helperText={touched && errors}
//                 autoComplete={'off'}
//                 {...params}
//                 inputProps={{
//                   ...params.inputProps,
//                   placeholder: 'dd/mm/yyyy',
//                   value: params.inputProps.value,
//                   // readOnly: true,
//                   style: { cursor: 'default' },
//                 }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={(e) => {
//                           setOpen(!open);
//                           removeData(orders);
//                         }}>
//                         <img alt="Calendar" src={Calendar} height={20} width={20} />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   svg: { display: 'none' },
//                   input: { height: 10, borderRadius: 20 },
//                   '& .css-rueraa-MuiFormHelperText-root': {
//                     color: 'red',
//                   },
//                   ...width,
//                 }}
//                 {...props}
//               />
//             );
//           }}
//         />
//       </LocalizationProvider>
//     </Box>
//   );
// };

// export default CustomDatePicker;
