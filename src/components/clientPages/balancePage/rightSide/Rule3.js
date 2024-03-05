import React from 'react';
import Card from '@mui/material/Card';
import { useOrderAboutStyles } from '../../../../globalStyles/OrderAboutStyles';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Rule3 = () => {
   const classes = useOrderAboutStyles();
   return (
      <Card sx={{ boxShadow: 2 }}>
         <Box className={classes.orderSubBlockSpaceBetween}>
            <Typography variant={'h1'}>Եթե ​​հաճախորդը չի նայում պատասխանին</Typography>
         </Box>
         <CustomDivider />
         <Typography sx={{ marginBottom: '20px' }} variant={'h4'}>
            Եթե ​​հաճախորդը չբացի ձեր պատասխանը 5 օրվա ընթացքում, մենք կվերադարձնենք դրա դիմաց
            գումարը:
         </Typography>
      </Card>
   );
};
export default Rule3;

// Условия возврата денег

// Если заказчик не выбрал вас в роли исполнителя, то денежные средства за
// отклик будут возвращены на ваш баланс.
