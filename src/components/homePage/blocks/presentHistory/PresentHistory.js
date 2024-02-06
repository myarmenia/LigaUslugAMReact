import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import AboutLigaImg from '../../../../assets/image/AboutLigaImg.png';

const useStyles = makeStyles({
   titleReview: {
      fontSize: '42px',
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: '14px',
      marginTop: '25px',
      color: '#FE7D1F',
      '@media (max-width: 600px)': {
         fontSize: '60px',
      },
   },
   textReview: {
      fontSize: '22px',
      textAlign: 'center',
      marginBottom: '33px',
      color: '#FE7D1F',
      '@media (max-width: 600px)': {
         fontSize: '26px',
      },
   },
   aboutTitle: {
      color: '#445E77',
      fontSize: '40px',
      textAlign: 'center',
   },
   aboutText: {
      marginBottom: 16,
   },
   bigDiv: {
      display: 'flex',
      alignItems: 'flex-end',
      paddingTop: '95px',
   },
   title1: {
      fontSize: '42px',
      fontWeight: '500',
      lineHeight: '49px',
      paddingBottom: '26px',
   },
   title2: {
      fontSize: '17px',
      lineHeight: '35px',
      fontFamily: 'Roboto',
      paddingBottom: '26px',
   },
   AbouLigaRightImg: {
      '@media (max-width: 990px)': {
         display: 'none',
      },
   },
});

const PresentHistory = () => {
   const classes = useStyles();
   const lg = useMediaQuery('(max-width:1440px)');
   return (
      <>
         <Box>
            <Container maxWidth={lg ? 'lg' : 'xl'}>
               <Box className={classes.bigDiv}>
                  <Box>
                     <Typography className={classes.title1}>Մեր մասին</Typography>
                     <Typography className={classes.title2}>
                        Տվյալ կայքը ժամանակակից և հարմարավետ ծառայություն է, որը կօգնի ձեզ գտնել
                        ճիշտ կատարող ՝ ցանկացած խնդիր լուծելու համար: Նոր հարթակը միավորում է ձեր
                        քաղաքի վերանորոգման, շինարարության, ՏՏ տեխնոլոգիաների, տնտեսական
                        աշխատանքների, բեռնափոխադրումների, իրավաբանական ծառայությունների,
                        գեղեցկության և առողջության, տարածքների մաքրման, բիզնեսի համար
                        ծառայությունների, կենդանիների զբոսանքի և շատ այլ ուղղությունների վստահելի
                        վարպետներին:Յուրաքանչյուր կատարող անցնում է անհրաժեշտ ստուգում, ինչը
                        երաշխավորում է մատուցվող ծառայությունների բարձր որակը: Դուք կարող եք վստահ
                        լինել, որ կգտնեք փորձառու մասնագետ, ով կկատարի ձեր առաջադրանքը նվազագույն
                        ժամկետներում և մատչելի գնով:Պարզապես հանձնարարությունը թողեք մեր կայքում և
                        սպասեք արձագանքի Ձեր ոլորտի մասնագետներից: Արագ և Հարմար Որոնում պրոֆեսիոնալ
                        կատարողների համար, ովքեր պատրաստ են օգնել ձեզ ցանկացած իրավիճակում:Միացեք
                        մեր կայքին և հենց այսօր Գտեք լավագույն կատարողին ձեր մարտահրավերի համար:
                     </Typography>
                     <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sm={4}>
                           <Typography className={classes.titleReview} color={'#445E77'}>
                              300+
                           </Typography>
                           <Typography className={classes.textReview} color={'#000000'}>
                              Ակտիվ Պատվերներ
                           </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography className={classes.titleReview} color={'#445E77'}>
                              1800+
                           </Typography>
                           <Typography className={classes.textReview} color={'#000000'}>
                              Փորձառու Մասնագետներ
                           </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                           <Typography className={classes.titleReview} color={'#445E77'}>
                              9500+
                           </Typography>
                           <Typography className={classes.textReview} color={'#000000'}>
                              Կատարված Պատվերներ
                           </Typography>
                        </Grid>
                     </Grid>
                  </Box>
                  <Box>
                     <img src={AboutLigaImg} alt="Abot_LIga" className={classes.AbouLigaRightImg} />
                  </Box>
               </Box>
            </Container>
         </Box>
      </>
   );
};

export default PresentHistory;
