import { Avatar, Box, Card, Link, Typography } from '@mui/material';
import { useProfileCardStyles } from '../../../../globalStyles/ProfileCardStyles';
import { setIsOpenLogoutModal } from '../../../../store/reducers/AuthReducer';
import { useDispatch } from 'react-redux';

export default function ExitDelate({setIsOpenDeleteProfile}) {
  const classes = useProfileCardStyles();
  const dispatch = useDispatch();
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box className={classes.orderSubBlockSpaceBetween} sx={{ mb: 2 }}>
        <Typography sx={{ fontSize: '23px', fontWeight: '500' }}>Պրոֆիլի գործողություններ</Typography>
      </Box>
      <Box style={{ background: '#808080', height: 2, marginBottom: '10px' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{ fontSize: '18px', cursor: 'pointer' }}
          onClick={() => {
            dispatch(setIsOpenLogoutModal(true));
          }}>
          Դուրս գալ
        </Typography>
        <Typography sx={{ fontSize: '18px', cursor: 'pointer' }} onClick={()=>setIsOpenDeleteProfile(true)}>gdhhdh</Typography>
        <Typography sx={{ color: '#808080', fontSize: '18px' }}>
          Դուք կկորցնեք ձեր կատարողի և հաճախորդի հաշիվները
        </Typography>
      </Box>
    </Card>
  );
}
