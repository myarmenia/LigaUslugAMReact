import React, { memo, useEffect, useMemo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/core';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, InputLabel, Select, TextField, useMediaQuery } from '@mui/material';

export const useStyles = makeStyles({
   root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '18px',
      '& .MuiOutlinedInput-root': {
         '& fieldset': {
            border: '1px solid #808080',
            borderRadius: '10px',
            //width: '100%',
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
      },
   },
   boxInput: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '18px',
   },
   inputText: {
      fontSize: '17px',
      textAlign: 'left',
      width: '100%',
      margin: 0,
   },
   select: {
      color: 'red',
   },
});
const CustomSelect = React.forwardRef(
   (
      {
         label,
         setIndex = () => {},
         didMount = false,
         handleChange,
         disabled,
         placeholder,
         value,
         name,
         touched,
         error,
         mt,
         sx = {},
         arr = [],
      },
      ref,
   ) => {
      const classes = useStyles();
      const isplaceholder = useMemo(() => {
         if (value) {
            return true;
         }
         return false;
      }, [value]);
      useEffect(() => {
         if (didMount) handleChange();
      }, [didMount, handleChange]);
      const media400 = useMediaQuery('(min-width:400px)');
      return (
         <Box className={classes.root}>
            <p style={{ marginTop: mt }} className={classes.inputText}>
               {label}
            </p>
            <FormControl style={{ height: '10px', marginBottom: '10px' }} fullWidth>
               {/* <InputLabel className="demo-multiple-name-label">Категории</InputLabel> */}
               <Select
                  labelId="demo-multiple-name-label"
                  onChange={(e) => {
                     handleChange(e.target.value);
                  }}
                  sx={sx}
                  style={{
                     '& .MuiOutlinedInputInput': {
                        color: isplaceholder ? '#000 !important' : '#b9b1b1!important',
                     },
                  }}
                  disabled={disabled}
                  value={value ? value : ''}
                  name={name}
                  inputProps={{
                     style: { color: 'red' },
                  }}
                  error={Boolean(touched && error)}
                  renderValue={(value) => {
                     if (value.length > 20) {
                        return value.substring(0, 25) + '...';
                     }
                     return value;
                  }}>
                  {/* <MenuItem disabled selected value={''}>
                     {placeholder}
                  </MenuItem> */}

                  {arr.map((item, i) => (
                     <MenuItem
                        onClick={() => setIndex(i)}
                        id={item?.key}
                        key={i}
                        sx={{ whiteSpace: 'pre-wrap' }}
                        value={[item?.value, item?.key]}>
                        {item?.label}
                     </MenuItem>
                  ))}
               </Select>
               {touched && error && (
                  <FormHelperText
                     style={{
                        color: '#F44336',
                        paddingLeft: '15px',
                        position: 'absolute',
                        right: 0,
                        top: '40px',
                     }}>
                     {error}
                  </FormHelperText>
               )}
            </FormControl>
         </Box>
      );
   },
);

export default memo(CustomSelect);
