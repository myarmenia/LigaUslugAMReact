import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const useStyles = makeStyles(({ theme, props }) => {
   return {
      root: {
         //width: '100%',
         display: 'flex',
         flexDirection: 'column',
         // marginBottom: '18px',
         '& .MuiFormHelperText-root': {
            color: 'red',
            position: 'absolute',
            bottom: -20,
            right: 0,
         },
         '& .MuiOutlinedInput-root': {
            '& fieldset': {
               border: '1px solid #808080',
               borderRadius: '10px',
               //width: '100%',
            },
            '&:hover fieldset': {
               border: '1px solid blue',
            },
            '&.Mui-focused fieldset': {
               borderColor: '#808080',
            },
            // '&.Mui-focused fieldset': {
            //     borderColor: 'gray',
            // },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
               border: '1px solid #808080',
               borderRadius: '10px',
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
               border: '1px solid #808080',
               borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
               border: '1px solid #808080',
            },
            //focus
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
               border: '1px solid #808080',
            },
            '& .MuiOutlinedInputInput': {
               //height: '30px',
               // padding: '10px',
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
         marginBottom: '5px',
         width: '100%',
         margin: 0,
      },
   };
});

const CustomInput = ({
   label,
   name,
   value,
   handleChange,
   touched,
   error,
   textArea = false,
   mb = 10,
   icon = false,
   width = '100%',
   placeholder,
   type,
   isPhone,
   height,
   position,
   deletComponent,
   variant = 'standard',
   ...rest
}) => {
   const isPassword = useMemo(() => type === 'password', [type]);
   const [isShownPassword, setIsShownPassword] = useState(false);
   const classes = useStyles();
   return (
      <Box
         sx={{
            marginBottom: `${mb}px`,
            width,
            display: 'flex',
            alignItems: 'flex-start',
         }}
         a={'porc'}
         className={classes.root}>
         <p className={classes.inputText}>{label}</p>
         <TextField
            variant={variant}
            multiline={textArea}
            placeholder={placeholder}
            inputProps={{
               maxLength: 200,
               sx: {
                  color: '#000',
                  padding: !textArea ? '9.5px 14px' : 0,
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
            InputProps={{
               ...(deletComponent && {
                  endAdornment: deletComponent,
               }),
               ...(icon
                  ? {
                       endAdornment: <InputAdornment position="start">{'Դրամ.'}</InputAdornment>,
                    }
                  : {}),
               ...(isPhone ? { startAdornment: '+' } : {}),
               ...(isPassword
                  ? {
                       sx: { height: '43px' },
                       endAdornment: !isShownPassword ? (
                          <VisibilityIcon
                             sx={{ cursor: 'pointer' }}
                             onClick={() => setIsShownPassword(true)}
                          />
                       ) : (
                          <VisibilityOffIcon
                             sx={{ cursor: 'pointer' }}
                             onClick={() => setIsShownPassword(false)}
                          />
                       ),
                    }
                  : {}),
               ...(height ? { sx: { height: height } } : {}),
            }}
            name={name}
            type={isPassword ? (isShownPassword ? 'text' : 'password') : type}
            autoComplete={'off'}
            value={value}
            style={{ width: '100%' }}
            FormHelperTextProps={{
               style: position
                  ? { position: 'relative', bottom: 0, right: 12 }
                  : { color: 'red', position: 'absolute', bottom: -20, right: 0 },
            }}
            onChange={(e) => handleChange(e.target.value)}
            rows={textArea ? 2 : 0}
            error={Boolean(touched && error)}
            helperText={touched && error}
            {...rest}
         />
      </Box>
   );
};

export default CustomInput;
