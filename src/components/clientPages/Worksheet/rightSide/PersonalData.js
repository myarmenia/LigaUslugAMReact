import * as React from 'react';
import { useInfoCardStyles } from '../../../../globalStyles/InfoCardStyles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import moment from 'moment';
import edit from '../../../../assets/image/edit.svg'

const PersonalData = ({ setEditPersonallyData }) => {
  const classes = useInfoCardStyles();
  const { status } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          pb: 8,
        }}>
        <Typography className={classes.title}>Անձնական տվյալներ</Typography>
        <Box
          sx={{
            cursor: 'pointer',
            padding: '0 0 7px 0',
            margin: '0 40px 0px 0',
            // "@media (max-width: 800px)": {
            //   // margin: "0 0 20px 0",
            // },
          }}
          onClick={() => setEditPersonallyData(true)}>
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
          <img src={edit} alt="edit" />
        </Box>
      </Box>
      <Box style={{ background: '#808080', height: 2 }} />
      {status === 'executor' && (
        <Box>
          <Typography variant={'h5'}>Անուն</Typography>
          <Typography variant={'h6'}>{user?.name ? user?.name : user[0]?.name}</Typography>
        </Box>
      )}
      {/* <Typography variant={"h5"}>Фамилия</Typography>
      <Typography variant={"h6"}>
        {user?.last_name ? user?.last_name : user[0]?.last_name}
      </Typography> */}
      <Typography variant={'h5'}>Սեռ</Typography>
      <Typography variant={'h6'}>{user?.gender ? user?.gender : user[0]?.gender}</Typography>
      <Typography variant={'h5'}>Ծննդյան ամսաթիվ</Typography>
      <Typography variant={'h6'}>
        {moment(
          user?.birth_date
            ? user?.birth_date
            : user[0]?.birth_date
            ? user[0]?.birth_date
            : '01/01/2022',
        ).format('DD/MM/YYYY')}
      </Typography>
      {status === 'executor' && (
        <Box>
          <Typography style={{ marginBottom: '10px' }} variant={'h5'}>
          Իմ մասին
          </Typography>
          <Typography>{user?.about_me ? user?.about_me : ''}</Typography>
        </Box>
      )}
    </Card>
  );
};
export default PersonalData;
