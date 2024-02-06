import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toNumber } from 'lodash';
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles({
  raiting: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    marginTop: '10px',
    width: '100px',
    '@media (max-width: 1440px)': {
      width: '61px',
      marginRight: '20px',
    },
    '@media (max-width: 600px)': {
      width: '34px',
      marginRight: '30px',
    },
  },
});

const RatingBlock = ({ reviews, size = 'medium', star = 4 }) => {
  const classes = useStyles();
  return (
    <Box className={classes.raiting}>
      <Rating
        style={{ color: '#FF9500' }}
        name="half-rating-read"
        defaultValue={toNumber(star)}
        precision={0.5}
        size={size}
        readOnly
      />
      {reviews ? (
        <Typography style={{ whiteSpace: 'nowrap' }}>{`${reviews} մեկ․․.`}</Typography>
      ) : null}
    </Box>
  );
};

export default RatingBlock;
