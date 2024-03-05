import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { A11y, Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import next from '../../../../src/assets/image/next.svg';
import prev from '../../../../src/assets/image/prev.svg';
import sliderFix from '../../../../src/assets/image/sliderBgImg.png';
import { sliderInfo } from '../../../helper';
import arrow from '../../../assets/image/Arrow.svg';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { makeStyles } from '@material-ui/core';
import { LensTwoTone } from '@mui/icons-material';


const colorData = ['#E93A75', '#8A74EF', '#07B8EA', '#FF6B00'];
let i = 0;
function getRandomColor() {
   // const r = Math.floor(Math.random() * 256);
   // const g = Math.floor(Math.random() * 256);
   // const b = Math.floor(Math.random() * 256);
   // return `rgb(${r}, ${g}, ${b})`;

   i >= 3 ? (i = 0) : i++;
   return colorData[i];
}

export const useStyles = makeStyles({
   slideBtn: {
      // backgroundColor: '#8A74EF',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      width: '320px',
      padding: '28px 31px',
      borderRadius: '12px',
      marginBottom: '50px',
      '@media(max-width: 1440px)': {
         marginBottom: '38px',
         padding: '21px 20px',
         width: '220px',
      },
      '@media(max-width: 1050px)': {
         // marginBottom: '38px',
         // padding: '21px 20px',
         width: '220px',
      },
      '@media(max-width: 600px)': {
         marginBottom: '18px',
         padding: '9px 8px',
         width: '139px',
         marginBottom: '-44px',
      },
      '&:hover': {
         backgroundColor: '#EA004F !important',
      },
   },
   slideBtnSpan: {
      color: '#FFF',
      fontSize: '20px',
      fontWeight: '500',
      '@media(max-width: 1440px)': {
         fontSize: '16px',
      },
      '@media(max-width: 600px)': {
         fontSize: '13px',
      },
   },
   text: {
      paddingTop: '120px',
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: '32px',
      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '50px',
      '@media(max-width: 1440px)': {
         fontSize: '30px',
         paddingTop: '90px',
      },
      '@media(max-width: 1050px)': {
         fontSize: '24px',
         paddingTop: '60px',
      },
      '@media(max-width: 600px)': {
         fontSize: '15px',
         lineHeight: '21px',
         height: '31px',
      },
   },
   text2: {
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: '400',
      lineHeight: 'normal',
      '@media(max-width: 1440px)': {
         fontSize: '18px',
      },
      '@media(max-width: 1050px)': {
         fontSize: '16px',
      },
      '@media(max-width: 600px)': {
         fontSize: '12px',
      },
   },
});



function Slider() {
   const matches1440 = useMediaQuery('(min-width:1440px)');
   const matches1050 = useMediaQuery('(min-width:1050px)');
   const matches728 = useMediaQuery('(min-width:728px)');
   const matches540 = useMediaQuery('(min-width:600px)');
   const { status } = useSelector((state) => state.auth);
   const { header, load } = useSelector((state) => state.header);
   const [slide, setSlide] = useState(null);
   const [test, setTest] = useState(null);
   const [statusUs, setStatusUs] = useState(null);
   const navigate = useNavigate();

   const navigateFn = (id) => {
      navigate(`find_specialists/${id}`);
   };
   useEffect(() => {
      setStatusUs(status === 'client');
   }, [status, header]);

   const classes = useStyles();
   return (
      <Box
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            position: 'relative',
            height: matches1440 ? '880px' : matches1050 ? '696px' : matches540 ? '696px' : '400px',
            flexShrink: '0',
            marginTop: '31px',
         }}>
         <Box
            sx={{
               zIndex: '10',
               width: matches1440 ? '88%' : matches1050 ? '84%' : matches540 ? '70%' : '60%',
               height: 'fit-content',
            }}>
            {!load && Array.isArray(header.category) ? (
               <Swiper
                  // slidesPerView={matches1440 ? 4 : matches1050 ? 3 : matches540 ? 2 : 1}
                  slidesPerView={'auto'}
                  spaceBetween={20}
                  lazy
                  loop={true}
                  onSwiper={(swiper) => setSlide(swiper)}
                  // autoplay={{
                  //   delay: 2500,
                  //   disableOnInteraction: false,
                  // }}
                  pagination={{
                     clickable: true,
                  }}
                  style={{
                     margin: '0',
                     height: matches1440
                        ? '524px'
                        : matches1050
                        ? '450px'
                        : matches540
                        ? '380px'
                        : '272px',
                  }}
                  modules={[Autoplay, Lazy, EffectFade, A11y, Navigation]}
                  className="mySwiper">
                  {header.category.map(({ id, category_name }) => (
                     <SwiperSlide
                        key={id}
                        style={{
                           width: 'fit-content',
                           padding: '10px 0 20px',
                           boxSizing: 'border-box',
                        }}>
                        <Box
                           sx={{
                              // width: !matches728 ? '300px' : '360px',
                              minWidth: '176px',
                              marginTop: '10px',
                              marginBottom: '10px',
                              boxSizing: 'border-box',
                              width: '450px',
                              maxWidth: matches1440
                                 ? '450px'
                                 : matches1050
                                 ? '380px'
                                 : matches540
                                 ? '280px'
                                 : '176px',
                              height: matches540 ? '100%' : 'max-content',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              paddingBottom: '20px',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              cursor: 'default',
                              // boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                              background: 'rgba(232, 227, 252, 0.3)',
                              backdropFilter: 'blur(3px)',
                              color: 'black',
                           }}
                           // alt={text}
                        >
                           <div style={{ width: '100%', height: '100%' }}>
                              <p className={classes.text}>{category_name}</p>
                           </div>
                           <Box
                              sx={{
                                 minWidth: !matches728 ? '210px' : '310px',
                                 height: '78px',
                                 borderRadius: '20px',
                                 textAlign: 'center',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 color: 'black',
                              }}>
                              <Box
                                 className={classes.slideBtn}
                                 style={{ backgroundColor: getRandomColor()}}
                                 onClick={() =>
                                    status === 'client'
                                       ? navigateFn(id)
                                       : navigate(`search_works/${category_name}`)
                                 }>
                                 <span className={classes.slideBtnSpan}>
                                    {status === 'client' ? 'Գտնել մասնագետ' : 'Որոնել աշխատանք'}
                                 </span>
                                 <img src={arrow} alt="arrow" style={{ width: '54px' }} />
                              </Box>
                           </Box>
                        </Box>
                     </SwiperSlide>
                  ))}
               </Swiper>
            ) : (
               ''
            )}
         </Box>

         <img
            src={sliderFix}
            alt=""
            style={{
               zIndex: '5',
               position: 'absolute',
               left: '0',
               top: '0',
               height: '100%',
               minWidth: '280px',
               width: matches540 ? 'auto' : '70%',
            }}
         />
         {matches1050 && (
            <Box
               style={{
                  position: 'absolute',
                  bottom: '5%',
                  right: '40px',
                  display: 'flex',
                  gap: '30px',
               }}>
               <img
                  src={prev}
                  onClick={() => {
                     slide?.slidePrev();
                  }}></img>
               <img
                  src={next}
                  onClick={() => {
                     slide?.slideNext();
                  }}></img>
            </Box>
         )}
      </Box>
   );
}

export default Slider;
