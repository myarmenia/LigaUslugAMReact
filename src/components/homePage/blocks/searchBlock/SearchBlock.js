import { makeStyles } from '@material-ui/core';
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../../../../assets/image/search_block_bg.png';
import BlueButton from '../../../UI/CustomButtons/BlueButton';
import fastSearch from '../../../../assets/image/fastSearch.png';
import fastSearchIcon from '../../../../assets/image/fastSearchIcon.png';
import fastSearchRotate from '../../../../assets/image/fastSearchRotate.png';
import Button from '@mui/material/Button';

const useSearchBlock = makeStyles({
   container: {
      width: '100%',
      height: '492px',
      filter: 'drop-shadow(4px 4px 30px rgba(0, 0, 0, 0.25))',
      borderRadius: '30px',
      display: 'flex',
      alignItems: 'start',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative',
      '@media (max-width: 850px)': {
         height: '250px',
      },
      '@media (max-width: 600px)': {
         alignItems: 'center',
         justifyContent: 'start',
         paddingTop: '25px',
         height: '525px',
      },
   },
   bg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '0',
      left: '0',
   },
   h2: {
      fontWeight: '700',
      fontSize: '56px',
      lineHeight: 'normal',
      color: '#FFF',
      marginBottom: '9px',
      '@media (max-width: 1440px)': {
         fontSize: '42px',
      },
      '@media (max-width: 850px)': {
         fontSize: '32px',
      },
   },
   span: {
      fontSize: '22px',
      lineHeight: '42px',
      textAlign: 'center',
      fontWeight: '400',
      // width: '60%',
      color: '#FFF',
      marginBottom: '16px',
      '@media (max-width: 1440px)': {
         fontSize: '16px',
         lineHeight: 'normal',
      },
      '@media (max-width: 850px)': {
         fontSize: '12px',
         lineHeight: 'normal',
      },
   },
   begImg: {
      backgroundImage: `url(${fastSearch})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      '@media (max-width: 600px)': {
         backgroundImage: `url(${fastSearchRotate})`,
      },
   },
   fastSearchIcon: {
      '@media (max-width: 1440px)': {
         width: '186px',
         height: '134px',
      },
      '@media (max-width: 850px)': {
         width: '96px',
         height: '68px',
      },
   },
   fastSearchBtn: {
      backgroundColor: '#FF6B00',
      borderRadius: '12px',
      color: '#FFF',
      fontSize: '24px',
      fontWeight: '500',
      width: '336px',
      height: '78px',
      '@media (max-width: 1440px)': {
         fontSize: '19px',
         width: '252px',
         height: '58px',
      },
      '@media (max-width: 850px)': {
         fontSize: '13px',
         width: '170px',
         height: '50px',
      },
   },
});
const btnSx = {
   fontWeight: '500',
   fontSize: '36px',
   lineHeight: '42px',
   padding: '19px 62px',
   '@media (max-width: 1000px)': {
      fontSize: '28px',
      lineHeight: '36px',
      padding: '12px 48px',
   },
   '@media (max-width: 388px)': {
      fontSize: '28px',
      lineHeight: '36px',
      padding: '12px 14px',
   },
};

export const SearchBlock = () => {
   const classes = useSearchBlock();
   const navigate = useNavigate();
   const lg = useMediaQuery('(max-width:1440px)');
   return (
      <Box className={classes.begImg}>
         <Container maxWidth={lg ? 'lg' : 'xl'} sx={{ my: '100px', padding: '0' }}>
            <Box className={classes.container}>
               <img src={fastSearchIcon} alt="fastSearchIcon" className={classes.fastSearchIcon} />
               <Typography className={classes.h2}>Արագ որոնում</Typography>
               <Typography className={classes.span}>
                  Ձեզ հետաքրքրող ցանկացած ոլորտի մասնագետ կարող եք գտնել։
               </Typography>
               {/* <Button
            sx={btnSx}
            label={'Найти специалиста'}
            action={() => navigate('find_specialists')}
          >
          </Button> */}
               <Button
                  onClick={() => navigate('find_specialists')}
                  className={classes.fastSearchBtn}>
                  Գտեք մասնագետ
               </Button>
            </Box>
         </Container>
      </Box>
   );
};
