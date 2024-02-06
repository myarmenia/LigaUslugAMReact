import React from 'react';
import Card from '@mui/material/Card';
import { useOrderAboutStyles } from '../../../../globalStyles/OrderAboutStyles';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Rule1 = () => {
  const classes = useOrderAboutStyles();
  return (
    <Card sx={{ boxShadow: 2 }}>
      <Box className={classes.orderSubBlockSpaceBetween}>
        <Typography variant={'h1'}>За что вы платите</Typography>
      </Box>
      <CustomDivider />
      <Typography style={{ marginBottom: '20px' }} variant={'h4'}>
        За отклик или контакт клиента. Отклик-оплачиваете предложение клиену, затем можете обсуждать
        детали и договариваться в чате. Контакт клиента - бесплатно уточняете условия в чате,
        платите только при обмене контактами.
      </Typography>
      {/*<Typography variant={'h5'}>Более >></Typography>*/}
    </Card>
  );
};
export default Rule1;
