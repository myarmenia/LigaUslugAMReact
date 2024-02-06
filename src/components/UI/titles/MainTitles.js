import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';

export const useStyles = makeStyles({
  aboutTitle: {
    color: '#445E77',
    fontSize: '56px',
    textAlign: 'center',
    fontWeight: '500',
    '@media(max-width: 1440px)': {
      fontSize: '42px',
    },
  },
});

const MainTitle = ({ mb, mt, children }) => {
  const classes = useStyles();
  return (
    <Typography mb={mb} mt={mt} className={classes.aboutTitle}>
      {children}
    </Typography>
  );
};

export default MainTitle;
