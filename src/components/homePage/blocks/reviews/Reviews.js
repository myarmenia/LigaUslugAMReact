import React from 'react';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import MainTitle from '../../../UI/titles/MainTitles';
import Box from '@mui/material/Box';
import RatingBlock from '../../../UI/ratingBlock/RatingBlock';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
   card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
      boxShadow: 'none',
   },
   cardContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '12px',
   },
});

const Reviews = ({ review = [], reviewsRef }) => {
   const classes = useStyles();
   return (
      <div ref={reviewsRef} style={{ paddingTop: '75px' }}>
         <MainTitle mb={'75px'}>Կարծիքներ</MainTitle>
         <Grid container spacing={8} justifyContent="center" alignItems="center">
            {review.map((item, index) => (
               <Grid key={index} item sm={10} md={8} lg={3}>
                  <Paper className={classes.card}>
                     <CardContent>
                        <Box className={classes.cardContent}>
                           <Avatar src={item.img_path} style={{ height: '50px', width: '50px' }} />
                           <Box>
                              <Typography
                                 noWrap
                                 gutterBottom
                                 style={{ fontSize: '24px', paddingLeft: '10px' }}>
                                 {item.name}
                              </Typography>
                              <RatingBlock
                                 star={item.employer_star_count_to_executor}
                                 reviews={60}
                                 size={'small'}
                              />
                           </Box>
                        </Box>
                        <Typography style={{ fontSize: '18px', textAlign: 'left' }}>
                           {item.employer_review_to_executor}
                        </Typography>
                     </CardContent>
                  </Paper>
               </Grid>
            ))}
         </Grid>
         <Box sx={{ marginTop: '75px' }}>
            <Grid container spacing={5} justifyContent="center">
               {Array(3)
                  .fill(10)
                  .map((val, index) => (
                     <Grid key={index} item sm={12} md={6} lg={3}>
                        <Box
                           sx={{
                              display: 'flex',
                              marginBottom: '20px',
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}>
                           <Box sx={{ marginRight: '15px' }}>
                              <Avatar />
                           </Box>
                           <Box>
                              <Typography sx={{ fontSize: '24px', fontWeight: 400 }}>
                                 {' '}
                                 Արման Կարապետյան
                              </Typography>
                              <Box>
                                 <RatingBlock size={'small'} reviews={4} />
                              </Box>
                           </Box>
                        </Box>
                        <Box sx={{ fontSize: '18px', textAlign: 'center' }}>
                           Առօրյա պրակտիկան ցույց է տալիս, որ կառուցվածքի ամրապնդումն ու զարգացումը
                           մեզանից պահանջում են վերլուծել զարգացման հետագա ուղղությունները։
                           Ընկերնե՛ր։ ակտիվների լայն շրջանակի հետ խորհրդակցելը հեշտացնում է
                           նախապատրաստումը և իրականացումը:
                        </Box>
                     </Grid>
                  ))}
            </Grid>
            <Typography
               mb={'200px'}
               color={'#808080'}
               style={{ fontSize: '22px', marginTop: 60, textAlign: 'center' }}>
               Վերջին 12 ամիսների ընթացքում հաճախորդների կողմից թողնվել է 589 434 կարծիք: Դրանցից 558 742-ը դրական են։
            </Typography>
         </Box>
      </div>
   );
};

export default Reviews;
