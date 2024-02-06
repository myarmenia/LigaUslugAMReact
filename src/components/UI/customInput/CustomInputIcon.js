import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   root: {
      '& .MuiFormHelperText-root': {
         color: 'red',
      },
      '& .MuiOutlinedInput-root': {
         '& fieldset': {
            border: '1px solid #808080',
            borderRadius: '10px',
            //height: '30px',
            padding: '5px 5px',
         },

         '&:hover fieldset': {
            border: '1px solid blue',
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
            border: '1px solid #808080',
         },
      },
   },
   inputText: {
      fontSize: '15px',
      textAlign: 'left',
      width: '100%',
      margin: 0,
      height: '40px',
   },
});

const CustomInputIcon = React.forwardRef(
   (
      {
         label,
         name,
         value,
         handleChange,
         touched,
         error,
         icon = false,
         mb = 10,
         width = '100%',
         iconRight = false,
         placeholder,
         onInpitChange,
         maxWidth = {},
         type='',
         sx = {},
      },
      ref,
   ) => {
      const classes = useStyles();

      useEffect(() => {
         if (onInpitChange) {
            onInpitChange(ref?.current?.value);
         }
      }, [ref?.current?.value, onInpitChange]);
      return (
         <TextField
            variant={'outlined'}
            placeholder={placeholder}
            InputProps={{
               style: { height: '45px', ...sx },
               endAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
               startAdornment: <InputAdornment position="start">{iconRight}</InputAdornment>,
            }}
            inputProps={{
               ref: ref,
               sx: {
                  color: '#000',

                  // "::placeholder ": {
                  // 	color: "#000",
                  // 	opacity: 1 /* Firefox */,
                  // },

                  // "::-ms-input-placeholder": {
                  // 	/* Internet Explorer 10-11 */ color: "#000",
                  // },

                  // "::-ms-input-placeholder": {
                  // 	/* Microsoft Edge */ color: "#000",
                  // },
               },
            }}
            type={type}
            className={classes.root}
            name={name}
            style={{ width, ...maxWidth }}
            autoComplete={'off'}
            value={value}
            onChange={handleChange}
            error={Boolean(touched && error)}
            helperText={touched && error}
         />
      );
   },
);

export default CustomInputIcon;
