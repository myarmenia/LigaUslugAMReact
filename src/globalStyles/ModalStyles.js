import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   root: {
      //input
      // '& MuiFormControl-root MuiTextField-root css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
      //   width: '100%',
      // },
      //texts
      '& .MuiTypography-h4': {
         fontWeight: 500,
         fontSize: 20,
         whiteSpace: 'noWrap',
      },
      '& .MuiTypography-h5': {
         fontWeight: 500,
         fontSize: 16,
         whiteSpace: 'noWrap',
         '@media (max-width: 600px)': {
            fontSize: 12,
         },
      },
      '& .MuiTypography-h6': {
         color: '#808080',
         fontSize: 14,
         whiteSpace: 'noWrap',
         fontWeight: 400,
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      '& MuiFormControl-root-MuiTextField-root': {
         marginBottom: '10px',
         width: '100%',
      },
      '& MuiInputBase-root-MuiOutlinedInput-root': {
         borderRadius: '10px',
         border: '1px solid #808080',
      },
      '& MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },
      '& MuiButtonBase-root-MuiButton-root': {
         backgroundColor: '#445E77',
         fontSize: '15px',
         color: '#FAFAFA',
         padding: '7px 24px',
         fontWeight: 500,
         marginBottom: '10px',
         borderRadius: '10px',
         //width: '160px',
      },
      '& .MuiButton-contained': {
         background: '#445E77',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         '&:hover': {
            background: '#6585a5 !important',
         },
      },
      '& .MuiButton-outlined': {
         background: '#445E77',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         '&:hover': {
            background: '#6585a5 !important',
         },
      },
      //checkbox
      '& MuiFormControlLabel-root .MuiFormControlLabel-label': {
         color: '#808080',
         fontSize: '16px',
      },
      '& MuiBox-root css-0': {
         width: '40%',
      },
      //select
      '& MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      //textArea
      '& .MuiInputBase-root-MuiOutlinedInput-root': {
         borderRadius: '10px',
         border: '1px solid #808080',
         height: '73px',
      },
      '& MuiOutlinedInputInput MuiInputBase-input MuiInputBase-inputMultiline css-1sqnrkk-MuiInputBase-input-MuiOutlinedInputInput':
         {
            height: '100%',
         },
      //DatePicker
      '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
         width: '170px',
         borderRadius: '10px',
         //border: '1px solid #808080',
         height: '45px',
      },
      //input file
      '& .MuiBox-root css-0': {
         width: '40%',
      },
   },
   titleWrap: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   title: {
      color: '#445E77',
      fontWeight: '500',
      fontSize: '20px',
      margin: 0,
   },
   exitModal: {
      backgroundColor: '#EBEBEB',
      cursor: 'pointer',
      height: '38px',
   },
   headerBlock: {
      display: 'flex',
      alignItems: 'center',
      height: 80,
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
      fontSize: '15px',
      textAlign: 'left',
      width: '100%',
      marginTop: '15px',
      marginBottom: '4px',
   },
   input: {
      width: '160px',
      height: '1px !important',
      fontSize: '25px',
      '&::placeholder': {
         textOverflow: 'ellipsis !important',
         textAlign: 'center',
      },
   },
   inputIcon: {
      display: 'flex',
      alignItems: 'center',
   },
   checkbox: {
      marginTop: '20px',
      alignSelf: 'flex-start',
      paddingLeft: '120px',
   },
   time: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      padding: '12px 42px',
      borderRadius: '10px',
      width: '150px',
      cursor: 'pointer',
   },
   footer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
      width: '100%',
   },
   btnBlock: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   defaultBlock: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   inputFilled: {
      width: 320,
      height: 35,
   },
});
