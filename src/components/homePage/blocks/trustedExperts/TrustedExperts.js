import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import MainTitle from '../../../UI/titles/MainTitles';
import RatingBlock from '../../../UI/ratingBlock/RatingBlock';
import Typography from '@mui/material/Typography';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
// import "swiper/css"
// import "swiper/css/pagination"
// import "swiper/css/navigation"

// Import Swiper styles

// import './styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay, EffectFade, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';

export const useStyles = makeStyles({
   //   card: {
   //     //borderRadius: '30px',
   //     display: 'flex',
   //     minWidth: '280px',
   //     flexDirection: 'column',
   //     justifyContent: 'center',
   //     alignItems: 'center',
   //     boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.13)',
   //     padding: '30px 5px',
   //   },
   //   btn: {
   //     backgroundColor: '#49942B',
   //     borderRadius: '30px',
   //     padding: '10px 27px',
   //     fontSize: '17px',
   //     color: '#fff',
   //     fontWeight: '400',
   //   },
   SlideCard: {
      width: '700px !important',
      // height: '441px !important',
      padding: '60px 40px 60px 60px',
      marginBottom: '69px',
      // border: '1px solid #F5F5F5',
      // boxShadow: '0px 0px 6px -4px #000000',
      // boxShadow: '0px 50px 41px -48px #32E3D2',
      border: '1px solid #e8e8e8',
      borderRadius: '20px',
      '@media (max-width: 1440px)': {
         width: '426px !important',
         // height: '358px !important',
         marginBottom: '42px',
         padding: '46px 32px 46px 46px',
      },
      '@media (max-width: 850px)': {
         width: '336px',
         // height: '280px',
         padding: '24px 18px 24px 24px',
      },
   },
   avatar: {
      width: '100px',
      height: '100px',
      borderRadius: '15px',
      '@media (max-width: 1440px)': {
         width: '76px',
         height: '76px',
      },
   },
   location: {
      display: 'flex',

      alignItems: 'center',
      gap: '5px',
   },
   name: {
      fontWeight: '500',
      fontSize: '30px',
      margin: '0',
      // paddingLeft: '17px',
      '@media (max-width: 1440px)': {
         fontSize: '22px',
         // paddingLeft: '13px',
      },
      '@media (max-width: 600px)': {
         fontSize: '16px',
      },
   },
   cardText: {
      fontSize: '24px',
      textAlign: 'center',
      lineHeight: '54px',
      paddingTop: '50px',
      '@media (max-width: 1440px)': {
         paddingTop: '37px',
         fontSize: '18px',
         lineHeight: '40px',
      },
      '@media (max-width: 850px)': {},
      '@media (max-width: 600px)': {
         paddingTop: '24px',
         fontSize: '14px',
         lineHeight: '22px',
      },
   },
});

const TrustedExperts = ({ our_checked_specialists = [], reviewsRef }) => {
   const classes = useStyles();
   // const navigate = useNavigate();
   // const load = useSelector((state) => state.profile.load);
   const matches728 = useMediaQuery('(min-width:728px)');
   const matches800 = useMediaQuery('(min-width:800px)');
   const matches1440 = useMediaQuery('(min-width:1440px)');
   const matches1050 = useMediaQuery('(min-width:1050px)');
   const matches540 = useMediaQuery('(min-width:600px)');

   const [open, setOpen] = useState(false);

   return (
      <div
         ref={reviewsRef}
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            position: 'relative',
         }}>
         {/* <MainTitle mt={'75px'} mb={'75px'}>
        Наши Проверенные Специалисты
      </MainTitle> */}
         {!!our_checked_specialists?.length && (
            <Box
            sx={{
               width: matches1440 ? '90%' : matches1050 ? '95%' : matches540 ? '95%' : '98%',
               margin: '0 6px',
               // height: 'fit-content',
               // width: '100%',
            }}>
               <MainTitle mb={8} color={'#000'} align='left'> 
                  Մեր փորձառու մասնագետները
               </MainTitle>

               <Swiper
                  freeMode={true}
                  grabCursor={true}
                  pagination={matches800 ? true : false}
                  modules={[Pagination, FreeMode, Autoplay]}
                  className="mySwiper"
                  slidesPerView={'auto'}
                  spaceBetween={12}>
                  {our_checked_specialists.map((expert, index) => (
                     <SwiperSlide key={index}>
                        <div className={classes.SlideCard}>
                           <div
                              style={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 alignItems: 'flex-start',
                              }}>
                              <div
                                 style={{ display: 'flex', alignItems: 'flex-start', gap: '13px' }}>
                                 <div className={classes.avatar}>
                                    {!!expert?.users?.img_path ? (
                                       // eslint-disable-next-line jsx-a11y/img-redundant-alt
                                       <img
                                          src={
                                             expert?.users?.img_path
                                                ? `${process.env.REACT_APP_IMG_API}${expert?.users?.img_path}`
                                                : ''
                                          }
                                          alt="photo"
                                          style={{ borderRadius: '12px' }}
                                          // style={{
                                          //   width: '100px',
                                          //   height: '100px',
                                          //   borderRadius: '15px',
                                          //   '@media (max-width: 1440px)': {
                                          //     width: '76px',
                                          //     height: '76px',
                                          //   },
                                          // }}
                                       />
                                    ) : (
                                       <PersonIcon sx={{ width: '100%', height: '100%' }} />
                                    )}
                                 </div>
                                 <div>
                                    <p className={classes.name}>
                                       {`${expert?.users?.name} ${expert?.users?.last_name}`}
                                    </p>
                                    {expert?.users?.region && (
                                       <div className={classes.location}>
                                          <svg
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                             <rect width="24" height="24" fill="white" />
                                             <g id="1920" clipPath="url(#clip0_0_1)">
                                                <rect
                                                   width="1920"
                                                   height="6239"
                                                   transform="translate(-370 -5098)"
                                                   fill="white"
                                                />
                                                <g id="REVIEW" filter="url(#filter0_d_0_1)">
                                                   <rect
                                                      id="Rectangle 4263"
                                                      x="-180"
                                                      y="-111"
                                                      width="700"
                                                      height="541"
                                                      rx="12"
                                                      fill="white"
                                                   />
                                                </g>
                                                <g
                                                   id="Travel Map Location Pin"
                                                   clipPath="url(#clip1_0_1)">
                                                   <g id="Group">
                                                      <g id="Group_2">
                                                         <path
                                                            id="Vector"
                                                            d="M19.7137 8.57122C19.7137 12.8398 11.9994 23.1426 11.9994 23.1426C11.9994 23.1426 4.28516 12.8398 4.28516 8.57122C4.28516 6.52526 5.09791 4.5631 6.54462 3.1164C7.99133 1.66969 9.95349 0.856934 11.9994 0.856934C14.0454 0.856934 16.0076 1.66969 17.4543 3.1164C18.901 4.5631 19.7137 6.52526 19.7137 8.57122V8.57122Z"
                                                            stroke="#848484"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                         />
                                                         <path
                                                            id="Vector_2"
                                                            d="M12.0011 11.1429C13.4213 11.1429 14.5725 9.99159 14.5725 8.57143C14.5725 7.15127 13.4213 6 12.0011 6C10.581 6 9.42969 7.15127 9.42969 8.57143C9.42969 9.99159 10.581 11.1429 12.0011 11.1429Z"
                                                            stroke="#848484"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                         />
                                                      </g>
                                                   </g>
                                                </g>
                                             </g>
                                             <defs>
                                                <filter
                                                   id="filter0_d_0_1"
                                                   x="-185.077"
                                                   y="-116.077"
                                                   width="710.153"
                                                   height="551.153"
                                                   filterUnits="userSpaceOnUse"
                                                   colorInterpolationFilters="sRGB">
                                                   <feFlood
                                                      floodOpacity="0"
                                                      result="BackgroundImageFix"
                                                   />
                                                   <feColorMatrix
                                                      in="SourceAlpha"
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                                      result="hardAlpha"
                                                   />
                                                   <feOffset />
                                                   <feGaussianBlur stdDeviation="2.53826" />
                                                   <feComposite in2="hardAlpha" operator="out" />
                                                   <feColorMatrix
                                                      type="matrix"
                                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                                                   />
                                                   <feBlend
                                                      mode="normal"
                                                      in2="BackgroundImageFix"
                                                      result="effect1_dropShadow_0_1"
                                                   />
                                                   <feBlend
                                                      mode="normal"
                                                      in="SourceGraphic"
                                                      in2="effect1_dropShadow_0_1"
                                                      result="shape"
                                                   />
                                                </filter>
                                                <clipPath id="clip0_0_1">
                                                   <rect
                                                      width="1920"
                                                      height="6239"
                                                      fill="white"
                                                      transform="translate(-370 -5098)"
                                                   />
                                                </clipPath>
                                                <clipPath id="clip1_0_1">
                                                   <rect width="24" height="24" fill="white" />
                                                </clipPath>
                                             </defs>
                                          </svg>
                                          <p>{expert?.users?.region}</p>
                                       </div>
                                    )}
                                 </div>
                              </div>
                              <div>
                                 <RatingBlock star={expert.total_reiting} />
                              </div>
                           </div>

                           <Typography className={classes.cardText}>
                              {!expert?.users?.about_me ? (
                                 'Տեղեկատվությունը բացակայում է'
                              ) : (
                                 //  <span onClick={() => setOpen((prev) => !prev)}>
                                 //     {!open
                                 //        ? expert?.users?.about_me.slice(0, 30) + '...'
                                 //        : expert?.users?.about_me}
                                 //  </span>
                                 <span>{expert?.users?.about_me}</span>
                              )}
                              {/* <span>
                      {!expert?.users?.about_me
                        ? 'Информация отсутствует'
                        : expert?.users?.about_me.slice(0, 130) + '...'}
                    </span> */}
                           </Typography>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </Box>
         )}

         {/* <Grid container spacing={6} justifyContent="center" alignItems="center" mb={'100px'}>
        {our_checked_specialists.map((expert, index) => (
          <Grid key={index} item sm={7} md={5} lg={4} sx={{ minWidth: '312px' }} maxWidth>
            <Card
              sx={{
                ':hover': {
                  boxShadow: 20,
                },
              }}
              className={classes.card}
              style={{ borderRadius: '30px' }}> */}
         {/*<Avatar src={expert.users.img_path} mb={'24px'} style={{height: '108px', width: '108px'}} />*/}
         {/* <Avatar
                style={{ height: '108px', width: '108px' }}
                src={
                  expert?.users?.img_path
                    ? `${process.env.REACT_APP_IMG_API}${expert?.users?.img_path}`
                    : ''
                }
              />
              <CardContent>
                <Typography
                  // noWrap
                  // gutterBottom
                  sx={{
                    mb: '45px',
                    fontSize: '30px',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                  color={'#49942B'}>
                  {`${expert?.users?.name} ${expert?.users?.last_name}`}
                </Typography>

                <RatingBlock reviews={expert.executor_review_count} star={expert.total_reiting} />
                <Typography
                  mb={'24px'}
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  {expert?.special}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '18px',
                    textAlign: 'center',
                    height: '190px',
                    '@media(max-width: 800px)': {
                      height: '100%',
                    },
                  }}> */}
         {/* {!expert?.users?.about_me ? (
                    'Информация отсутствует'
                  ) : (
                    <span
                      onClick={() => setOpen((prev) => !prev)}
                      >
                      {!open
                        ? expert?.users?.about_me.slice(0, 130) + '...'
                        : expert?.users?.about_me}
                    </span>
                  )} */}
         {/* <span>
                    {!expert?.users?.about_me
                      ? 'Информация отсутствует'
                      : expert?.users?.about_me.slice(0, 130) + '...'}
                  </span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="success"
                  onClick={async () => {
                    if (!load) {
                      navigate(`user_information/${expert.id}`);
                    }
                  }}>
                  {load ? 'Загрузка...' : 'Узнать больше'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      </div>
   );
};

export default TrustedExperts;
