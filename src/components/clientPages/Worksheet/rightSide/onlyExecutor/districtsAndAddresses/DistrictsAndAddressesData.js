import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import edit from '../../../../../../assets/image/edit.svg';

// const countries = [{
//     id: 1,
//     country: 'Հայաստանի Հանրապետություն'
// }]

// const newArrayCountries = [...countries].map((item) => ({
//     key: item.id,
//     value: item.country,
//     label: item.country
// }))
const id = () => Math.random().toString();

const DistrictsAndAddressesData = ({ editAddress, setEditAddress }) => {
  const classes = useInfoCardStyles();
  const { profile = {}, user } = useSelector((state) => state.profile);
  const { status } = useSelector((state) => state.auth);
  // const { user, error, message, successWork, profile } = useSelector(
  //   (state) => state.profile
  // );
  const { address = '', region = '', country_name = '', executor_working_regions = {} } = profile;
  const rayonName = Object.keys(executor_working_regions);
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
        }}>
        <Typography className={classes.title}>Շրջաններ և հասցեներ</Typography>
        <Box
          style={{ cursor: 'pointer', padding: '0 0 7px 0' }}
          onClick={() => setEditAddress(true)}>
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
          <img src={edit} alt="edit" />
        </Box>
      </Box>
      <CustomDivider />
      <Typography variant={'h5'}>Երկիր</Typography>
      <Typography variant={'h6'}>Հայաստանի Հանրապետություն</Typography>
      <Typography variant={'h5'}>Տարածաշրջան</Typography>
      <Typography variant={'h6'}>{user?.region ? user?.region : user[0]?.region}</Typography>
      <Typography variant={'h5'}>Տեղանք/Քաղաք</Typography>
      <Typography variant={'h6'}>
        {user?.country_name ? user?.country_name : user[0]?.country_name}
      </Typography>
      <Typography variant={'h5'}>Հասցե</Typography>
      <Typography variant={'h6'}>{user?.address ? user?.address : user[0]?.address}</Typography>
      {status !== 'client' && (
        <>
          <Typography variant={'h5'}>Հաճախորդներ այցելելու տարածքներ</Typography>
          <div>
            {rayonName.map((item) => {
              return (
                <Box key={id()}>
                  <Typography variant={'h6'} style={{ marginRight: 5 }}>
                    {item}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {executor_working_regions[item].map((el) => {
                      return (
                        <Box
                          key={id()}
                          sx={{
                            backgroundColor: '#EBEBEB',
                            margin: '0 10px 10px 0',
                            padding: '5px',
                            display: 'flex',
                            alignItems: 'center',
                          }}>
                          <Typography variant={'h4'}>{el}</Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
            })}
          </div>
        </>
      )}
    </Card>
    // <Typography variant={'h6'} style={{marginRight:5}}>{item?.executorwork_region}
    //     {i < 2 ? i !== executor_working_regions?.length -1 ? "," : "" : '...'}</Typography>
  );
};

export default DistrictsAndAddressesData;
