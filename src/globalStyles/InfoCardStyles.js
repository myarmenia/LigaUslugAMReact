import { makeStyles } from '@material-ui/core';

export const useInfoCardStyles = makeStyles({
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
         margin: '10px 0',
      },
      '& .MuiTypography-h4': {
         fontSize: 16,
         color: '#000',
         margin: '0',
         whiteSpace: 'wrap',
         fontWeight: 'normal',
         padding: '2px',
      },
      '& .MuiTypography-h3': {
         fontSize: 14,
         color: '#808080',
         margin: '5px 0 10px 0',
      },
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },
   },
   radio: {
      '&$checked': {
         color: '#4B9A2D',
      },
   },
   checked: {},
   inputText: {
      fontSize: '15px',
      textAlign: 'left',
      width: '100%',
      marginTop: '15px',
      marginBottom: '4px',
      color: '#000000',
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
   orderSubBlockSpaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '8px',
   },
   categoriesBackGround: {
      backgroundColor: '#EBEBEB',
      margin: '0 10px 10px 0',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
   },
   delBtn: {
      padding: '0 0 4px 4px',
      fontSize: '15px',
      cursor: 'pointer',
   },
   singleInput: {
      width: '40%',
      margin: '0 40px 0px 0',
      '@media (max-width: 800px)': {
         width: '100%',
         margin: '0 0 20px 0',
      },
   },
});
