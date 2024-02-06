import { makeStyles } from '@material-ui/core';

export const useEditCardStyles = makeStyles({
   root: {
      background: '#FFFFFF',
      borderRadius: '20px',
      padding: '26px 30px',
      margin: '20px 0',
      '& .MuiTypography-h6': {
         fontWeight: 500,
         fontSize: 18,
         marginBottom: 10,
      },
      '& .MuiTypography-h5': {
         fontSize: 18,
         color: '#808080',
         marginTop: 15,
      },
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
   },
   inputContainer: {
      width: '31%',
      '@media (max-width: 820px)': {
         width: '100%',
      },
   },
   titleWrap: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   title: {
      fontWeight: '500 !important',
      fontSize: '23px !important',
   },
   btn: {
      height: 30,
      '&:hover': {
         background: '#445E77 !important',
      },
   },
   input: {
      '&::placeholder': {
         textOverflow: 'ellipsis !important',
         textAlign: 'center',
      },
   },
});
