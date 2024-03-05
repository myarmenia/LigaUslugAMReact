import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export const useStyles = makeStyles({
  aboutTitle: {
    color: '#445E77',
    fontSize: '42px',
    textAlign: 'center',
    fontWeight: '400',
    '@media(max-width: 1440px)': {
      fontSize: '42px',
    },
  },
});

const MainTitle = ({ mb, mt, children, align='center', color = '#445E77'}) => {
  const classes = useStyles();
  return (
    <Typography mb={mb} mt={mt} textAlign={align} style={{textAlign: align, color: color}} className={classes.aboutTitle}>
      {children}
    </Typography>
  );
};

export default MainTitle;
