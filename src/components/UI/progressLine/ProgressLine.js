import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  orangeProgress: {
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#449D36',
    },
    borderRadius:"20px"
  },
}));

const ProgressLine = ({ persent, sx = {} }) => {
  const classes = useStyles();
  return (
    <Box>
      <Box style={{ marginBottom: '10px' }}>
        <Typography sx={{ ...sx }}>{`էջի լրծվացություն${persent} %`}</Typography>
      </Box>
      {/* <progress
        style={{ width: '100%' }}
        id="file"
        value={persent}
        max="100"
      /> */}
      <LinearProgress className={classes.orangeProgress} variant="determinate" value={persent} />
    </Box>
  );
};

export default ProgressLine;
