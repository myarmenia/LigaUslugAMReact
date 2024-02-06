import React from 'react';
import Box from '@mui/material/Box';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { makeStyles } from '@material-ui/core';
import Avatar from '@mui/material/Avatar';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    '& .MuiCard-root': {
      borderRadius: '10px',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
      padding: '30px',
      margin: '10px',
      paddingBottom: '20px',
      height: 'auto',
    },
    '& .MuiTypography-h3': {
      fontWeight: 500,
      fontSize: 20,
      whiteSpace: 'noWrap',
    },
    '& .MuiTypography-h4': {
      fontWeight: 500,
      fontSize: 17,
      whiteSpace: 'noWrap',
    },
    '& .MuiTypography-h5': {
      color: '#808080',
      fontSize: 16,
      whiteSpace: 'noWrap',
      fontWeight: 400,
    },
    '& .MuiTypography-h6': {
      color: '#000',
      fontSize: 16,
      fontWeight: 400,
      fontStyle: 'italic',
      whiteSpace: 'pre-wrap',
    },
  },
});
const CustomerReviews = React.forwardRef(({ reviews }, ref) => {
  const classes = useStyles();
  const { status } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const photoUrl = user?.img_path ? user.img_path : user[0]?.img_path;
  return (
    <Card className={classes.root}>
      <Typography variant={'h3'} ref={ref}>
        {status !== 'client' ? 'Հաճախորդների կարծիքներ' : 'Կարծիքներ կարծիքներ'}
      </Typography>
      {reviews
        ?.filter((el) => {
          if (el?.user_id?.name) {
            return el.employer_review_to_executor && el.employer_star_count_to_executor;
          } else {
            return el.executor_review_to_employer && el.executor_star_count_to_employer;
          }
        })
        .map((item, index) => (
          <Box style={{ marginBottom: '20px' }} key={index}>
            <CustomDivider />
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}>
              <Avatar
                style={{
                  width: '70px',
                  height: '70px',
                  marginTop: '10px',
                }}
                src={`${process.env.REACT_APP_IMG_API}${
                  item?.user_id?.img_path
                    ? item?.user_id?.img_path
                    : item?.executor_profiles?.users?.img_path
                }`}
              />
              <Box style={{ paddingLeft: '20px' }}>
                <Typography variant={'h4'}>
                  {item?.user_id?.name && item?.user_id?.last_name
                    ? `${item?.user_id?.name} ${item?.user_id?.last_name}`
                    : `${item?.executor_profiles?.users.name} ${item?.executor_profiles?.users?.last_name}`}
                </Typography>
              </Box>
            </Box>
            <Typography style={{ marginBottom: '10px' }} variant={'h6'}>
              {item.user_id.name
                ? item.employer_review_to_executor
                : item.executor_review_to_employer}
            </Typography>
            <Typography variant={'h5'}>գնահատականներ</Typography>
            <Rating
              readOnly
              defaultValue={
                item?.employer_star_count_to_executor && item?.user_id.name
                  ? Number(item.employer_star_count_to_executor)
                  : !item?.user_id?.name && item?.executor_star_count_to_employer
                  ? Number(item.executor_star_count_to_employer)
                  : 0
              }
              style={{ color: '#FFF066', marginBottom: '30px' }}
            />
          </Box>
        ))}
    </Card>
  );
});

export default CustomerReviews;
