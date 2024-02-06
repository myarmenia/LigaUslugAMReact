import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   root: {
      display: 'flex',
      position: 'relative',
      //input
      '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
         marginBottom: '10px',
         width: '100%',
      },
      '& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
         borderRadius: '10px',
         border: '1px solid #808080',
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },
      //button
      '& MuiButtonBase-root-MuiButton-root': {
         backgroundColor: '#445E77',
         fontSize: '15px',
         color: '#FAFAFA',
         padding: '7px 24px',
         fontWeight: 500,
         marginBottom: '10px',
         borderRadius: '10px',
         width: '160px',
      },
      '& MuiButtonBase-root-MuiButton-root:hover': {
         backgroundColor: '#3a4e61',
      },
      //checkbox
      '& .css-j204z7-MuiFormControlLabel-root .MuiFormControlLabel-label': {
         color: '#808080',
         fontSize: '16px',
      },
      '& .MuiButton-outlined': {
         background: '#445E77',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         width: '160px',
         marginBottom: '10px',
         '&:hover': {
            background: '#6585a5 !important',
         },
      },
      '& .MuiButton-contained': {
         //background: "#445E77",
         textTransform: 'none',
         //color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         width: '160px',
         marginBottom: '10px',
         '&:hover': {
            //background: '#6585a5 !important',
         },
      },
      //text
      '& .MuiTypography-h6': {
         fontWeight: 400,
         fontSize: 16,
         display: 'flex',
         textDecoration: 'underLine',
      },
   },
   container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      '@media (max-width: 1400px)': {
         width: '70%',
      },
      '@media (max-width: 1000px)': {
         height: '100vh',
         width: '100%',
      },
   },
   img: {
      height: '100vh',
      '@media (max-width: 1500px)': {
         width: '100%',
      },
      '@media (max-width: 1000px)': {
         display: 'none',
      },
   },
   subContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 400,
      '@media (max-width: 330px)': {
         width: 300,
      },
   },
   boxInput: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '25px',
   },
   title: {
      color: '#000',
      fontWeight: '500',
      fontSize: '32px',
      marginBottom: '20px',
      marginLeft: '8px',
      marginRight: '8px',
      '@media (max-width: 1000px)': {
         fontSize: '26px',
      },
   },
   inputText: {
      fontSize: '15px',
      textAlign: 'left',
      width: '70%',
      marginTop: '15px',
      marginBottom: '0',
   },
   input: {
      width: '70%',
      height: '16px',
      fontSize: '25px',
   },
   checkbox: {
      marginTop: '20px',
      alignSelf: 'flex-start',
      paddingLeft: '120px',
   },
   footer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      //marginTop: '25px',
      width: '70%',
   },
   registrTitleBlack: {
      color: '#000',
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
      letterSpacing: '0.32px',
   },
   registrTitleOrange: {
      color: '#FF6B00',
      fontFamily: 'Poppins',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
      letterSpacing: '0.4px',
      cursor: 'pointer',
   },
   registrTitleGreen: {
      color: '#449D36',
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 'normal',
      letterSpacing: '0.32px',
      cursor: 'pointer',
   },
});
