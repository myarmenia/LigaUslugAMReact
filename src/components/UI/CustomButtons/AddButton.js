import React from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export const useStyles = makeStyles({
   container: {
      display: 'flex',
      marginTop: '20px',
      alignItems: 'center',
   },
   btn: {
      backgroundColor: '#EBEBEB',
      borderRadius: '5px',
      marginRight: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '35px',
      height: '35px',
      color: '#808080',
      cursor: 'pointer',
      '&:hover': {
         backgroundColor: '#D5D5D5',
      },
   },
   btnText: {
      color: '#808080',
      cursor: 'pointer',
   },
});

const AddButton = ({ fun }) => {
   const classes = useStyles();
   return (
      <Box className={classes.container}>
         <Box onClick={fun} className={classes.btn}>
            +
         </Box>
         <Typography onClick={fun} className={classes.btnText}>
            Ավելացնել
         </Typography>
      </Box>
   );
};

export default AddButton;
