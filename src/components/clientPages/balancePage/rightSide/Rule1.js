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
            <Typography variant={'h1'}>Ինչի՞ համար եք վճարում:</Typography>
         </Box>
         <CustomDivider />
         <Typography style={{ marginBottom: '20px' }} variant={'h4'}>
            Հաճախորդի պատասխանի կամ կապի համար: Պատասխան - դուք վճարում եք առաջարկը հաճախորդին,
            այնուհետև կարող եք քննարկել մանրամասները և համաձայնության գալ չաթում: Հաճախորդի կոնտակտ
            - ճշտեք պայմանները չաթում անվճար, վճարեք միայն կոնտակտներ փոխանակելիս:
         </Typography>
         {/*<Typography variant={'h5'}>Более >></Typography>*/}
      </Card>
   );
};
export default Rule1;
