import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Box, Button, useMediaQuery } from '@mui/material';
import { A11y, Autoplay, EffectFade, Lazy, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import next from '../../../../src/assets/image/next.svg';
import prev from '../../../../src/assets/image/prev.svg';
import sliderFix from '../../../../src/assets/image/sliderFix.png';
import { sliderInfo } from '../../../helper';
import arrow from '../../../assets/image/Arrow.svg';
import {  useNavigate } from 'react-router-dom';
import qs from 'qs'
import { makeStyles } from '@material-ui/core';
import { LensTwoTone } from '@mui/icons-material';

export const useStyles = makeStyles({
   slideBtn: {
      backgroundColor: '#449D36',
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
         width: '240px',
      },
      '@media(max-width: 600px)': {
         marginBottom: '18px',
         padding: '9px 8px',
         width: '139px',
         marginBottom: '-44px',
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
      fontSize: '40px',
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
    const navigate = useNavigate()
    
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
               width: matches1440 ? '80%' : matches1050 ? '80%' : matches540 ? '70%' : '60%',
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
                              width: matches1440
                                 ? '410px'
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
                              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.25)',
                              background: '#fff',
                              color: 'black',
                           }}
                           // alt={text}
                        >
                           <div style={{ width: '100%', height: '100%' }}>
                              <p className={classes.text}>{category_name}</p>
                              {/* <p className={classes.text2}>{"ggjjghgjh"}</p> */}
                           </div>
                           <Box
                              sx={{
                                 width: !matches728 ? '240px' : '320.72px',
                                 height: '78px',
                                 borderRadius: '20px',
                                 textAlign: 'center',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 color: 'black',
                              }}>
                              <Box className={classes.slideBtn}
                                onClick={()=> status === 'client' ? navigateFn(id) : navigate(`search_works/${category_name}`)}
                              >
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
