import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LogoFooter from '../../../../assets/image/gorc_ka.svg';
import VkSvg from '../../../../assets/svg/footer/VkSvg.js';
import TelegramSvg from '../../../../assets/svg/footer/TelegramSVG';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../../../../store/reducers/AuthReducer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWindowResize } from '../../../../utils/util';

const socialMedia = [
   {
      name: 'VK',
      path: 'https://vk.com/ligauslugvk/',
      svg: <VkSvg />,
   },
   {
      name: 'Telegram',
      path: 'https://t.me/+SCl-X6gNpd00YWM6',
      svg: <TelegramSvg />,
   },
];
export default function Footer({ handleScroll, categoriesRef, reviewsRef, setFooterHeight }) {
   const { auth } = useSelector((state) => state.auth);
   const { status } = useSelector(({ auth }) => auth);
   const footerRef = useRef();
   // const windowWidth = useWindowResize();
   // const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
  
   useEffect(() => {
      if (footerRef.current) {
         setFooterHeight(+footerRef.current.offsetHeight);
      }
   }, [footerRef]);
   const checkLogin = async (enteredStatus) => {
      if (auth) {
         if (status === 'client' && enteredStatus !== status) {
            dispatch(changeStatus('executor'));
         } else if (status === 'executor' && enteredStatus !== status) {
            dispatch(changeStatus('client'));
         }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };
   return (
      <Box
         ref={footerRef}
         style={{
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 0px 32px -19px',
            marginTop: '50px'
            // position: "absolute",
            // bottom: 0,
            // width: "100vw"
         }}>
         <Container maxWidth="lg">
            <Grid
               container
               sx={{
                  paddingTop: 9,
                  paddingBottom: 9,
                  '@media (max-width: 900px)': {
                     paddingTop: 4,
                     paddingBottom: 3,
                  },
               }}>
               <Grid item xs={24} sm={12} md={6} lg={3} sx={{ textAlign: 'center' }}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        paddingBottom: '10px',
                     }}>
                     <Typography sx={{ marginBottom: '5px' }}>
                        <Link
                           to="/"
                           style={{
                              textDecoration: 'none',
                              color: 'black',
                           }}>
                           Նոր պատվեր
                        </Link>
                     </Typography>
                     {location.pathname === '/' && (
                        <>
                           <Typography
                              sx={{ marginBottom: '5px', cursor: 'pointer' }}
                              onClick={() => {
                                 handleScroll(categoriesRef.current);
                              }}>
                              Բոլոր ծառայությունները
                           </Typography>
                           <Typography
                              sx={{ marginBottom: '5px', cursor: 'pointer' }}
                              onClick={() => handleScroll(reviewsRef.current)}>
                              Բոլոր կարծիքները
                           </Typography>
                        </>
                     )}

                     {/* <Typography sx={{ marginBottom: "5px" }}>
                История заказов
              </Typography> */}
                     {/* <Typography>
                        <Link
                           to="/documents"
                           style={{
                              textDecoration: 'none',
                              color: 'black',
                              cursor: 'pointer',
                           }}>
                           Օգտագործման պայմաններ
                        </Link>
                     </Typography> */}
                  </Box>
               </Grid>
               <Grid item xs={24} sm={12} md={6} lg={3}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        paddingBottom: '10px',
                     }}>
                     <Typography
                        sx={{
                           fontSize: '18px',
                           fontWeight: 500,
                           marginBottom: '15px',
                           color: '#000',
                        }}>
                        Աշխատանքի որոնում
                     </Typography>
                     <Typography sx={{ marginBottom: '5px' }}>
                        <Link
                           to={auth ? '/' : '/login'}
                           onClick={() => checkLogin('executor')}
                           style={{
                              textDecoration: 'none',
                              color: 'black',
                              cursor: 'pointer',
                           }}>
                           Մուտք կատարողի համար
                        </Link>
                     </Typography>
                     <Typography>
                        <Link
                           to={auth ? '/' : '/login'}
                           onClick={() => checkLogin('client')}
                           style={{
                              textDecoration: 'none',
                              color: 'black',
                              cursor: 'pointer',
                           }}>
                           Մուտք հաճախորդի համար
                        </Link>
                     </Typography>
                  </Box>
               </Grid>
               <Grid item xs={24} sm={12} md={6} lg={3}>
                  <Box
                     sx={{
                        textAlign: 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        paddingBottom: '10px',
                     }}>
                     <Typography
                        sx={{
                           fontSize: '18px',
                           fontWeight: 500,
                           marginBottom: '15px',
                           color: '#000',
                        }}>
                        Ընկերության մասին
                     </Typography>
                     <Typography sx={{ textAlign: 'center', marginBottom: '5px' }}>
                        <span>Աջակցություն</span> <br />
                        <a
                           href="mailto:sales@webex.am"
                           style={{
                              textDecoration: 'none',
                              color: 'black',
                              fontWeight: 'bold',
                           }}>
                           sales@webex.am
                        </a>
                     </Typography>
                     <Box
                        sx={{
                           display: 'flex',
                           gridGap: '10px',
                           marginBottom: '30px',
                           justifyContent: 'center',
                        }}>
                        {/* {socialMedia.map((el, index) => {
                           return (
                              <a key={index} href={el.path} target="_blank" rel="nofollow">
                                 {el.svg}
                              </a>
                           );
                        })} */}
                     </Box>
                  </Box>
               </Grid>
               <Grid item xs={24} sm={12} md={6} lg={3}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        alignItems: 'center',
                        paddingBottom: '10px',
                     }}>
                     <Box
                        sx={{
                           marginBottom: '30px',
                           '& img': {
                              '@media (max-width: 900px)': {
                                 width: '100px',
                                 marginTop: '-14px',
                              },
                           },
                        }}>
                        <img alt="Gorc-ka" src={LogoFooter} />
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Container>
         <Box
            sx={{
               width: '100%',
               backgroundColor: '#8A74EF',
               height: '67px',
            }}
         />
      </Box>
   );
}
