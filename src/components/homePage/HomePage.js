import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Intro from './blocks/intro/Intro';
import PresentHistory from './blocks/presentHistory/PresentHistory';
import CategoriesBlock from './blocks/CategoriesBlock/CategoriesBlock';
import TrustedExperts from './blocks/trustedExperts/TrustedExperts';
import { useDispatch, useSelector } from 'react-redux';
import { getHeaderData } from '../../store/actions/HeaderActions';
import { getNotAppliedTasks } from '../../store/actions/TaskActions';
import ModalTermsOfUse from '../UI/modals/ModalTermsOfUse';
import { Swiper, SwiperSlide } from 'swiper/react';
import GoToTelegramFourm from '../../assets/svg/intro/GoToTelegramFourm';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, EffectFade, Lazy, A11y, Navigation } from 'swiper';
import { sliderInfo } from '../../helper';
import { Avatar, Box, ImageList, useMediaQuery } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { SearchBlock } from './blocks/searchBlock/SearchBlock';
import homePageImg from '../../../src/assets/image/homPagesImg.png';
import homePageImgSmall from '../../../src/assets/image/homePageImgSmall.png';
import sliderFix from '../../../src/assets/image/sliderFix.png';
import Slider from './blocks/Slider';

export const useStyles = makeStyles({
   bagImg: {
      // pt: "90px",
      // backgroundImage: `url(${homePageImg})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
      // width: "100%",
      paddingTop: 'calc((2)*15%/14)',
      paddingBottom: 'calc((2)*0%/14)',
      '@media(max-width: 1130px)': {
         paddingTop: 'calc((2)*62%/14)',
         paddingBottom: 'calc((2)*0%/14)',
      },
      '@media(max-width: 821px)': {
         // backgroundImage: `url(${homePageImgSmall})`,
         // backgroundRepeat: 'no-repeat',
         // backgroundSize: 'cover',
         // backgroundPosition: 'center',
         // paddingTop:"250px",
         // height: '500px',
      },
      // background:
      // 	"linear-gradient(180deg, rgba(73, 148, 43, 0.3) 18.39%, rgba(68, 94, 119, 0.3) 74.86%)",
   },
   sliderBack: {
      // backgroundImage: `url(${sliderFix})`,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'contain',
      backgroundPosition: 'left',
      width: '100%',
      height: '600px',
      position: 'relative',
      // backgroundPosition: 'fixed',
      zIndex: '1',
   },
});

const HomePage = ({
   categoriesRef,
   reviewsRef,
   showTermsOfUse,
   setShowTermsOfUse,
   handleScroll,
}) => {
   // const { auth } = useSelector((state) => state.auth);
   const classes = useStyles();
   const { header } = useSelector((state) => state.header);
   const { auth } = useSelector((state) => state.auth);
   const { category, our_checked_specialists } = header; //
   const [modalCategory, setModalCategory] = useState('');
   const [modalSubCategory, setModalSubCategory] = useState('');
   const [showModal, setShowModal] = useState(false);
   const dispatch = useDispatch();
   useEffect(() => {
      if (auth) {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         dispatch(getNotAppliedTasks());
         dispatch(getHeaderData());
      }
   }, [dispatch, auth]);
   useEffect(() => {
      dispatch(getHeaderData());
   }, [dispatch]);
   const matches1440 = useMediaQuery('(min-width:1440px)');
   const matches1050 = useMediaQuery('(min-width:1050px)');
   const matches728 = useMediaQuery('(min-width:728px)');
   const matches540 = useMediaQuery('(min-width:600px)');
   const matches700 = useMediaQuery('(min-width:700px)');
   const lg = useMediaQuery('(max-width:1440px)');

   return (
      <div>
         {showTermsOfUse && (
            <ModalTermsOfUse
               setShowTermsOfUse={setShowTermsOfUse}
               showTermsOfUse={showTermsOfUse}
            />
         )}
         <Box className={classes.bagImg}>
            <Container
               maxWidth={lg ? 'lg' : 'xl'}
               sx={{
                  position: 'relative',
                  display: 'flex',
                  flexWrap: matches540 ? 'colum' : 'wrap',
                  flexDirection: matches540 ? '' : 'column-reverse',
                  // padding: '20px',
                  justifyContent: 'space-between',
                  alignItems: 'center',
               }}>
               {/* <Box
						sx={{
							position: "fixed",
							bottom: 106,
							right: 20,
							cursor: "pointer",
							zIndex: 10000,
						}}
						// onClick={goToChat}
						// className={classes.chat}
						// onMouseLeave={() => {
						//   setIsOpenText(false);
						// }}
						// onMouseEnter={() => {
						//   setIsOpenText(true);
						// }}
						title='Форум Лига Услуг'
						alt='Форум Лига Услуг'
					>
						<a href='https://t.me/ligaforum' target='_blank'>
							<GoToTelegramFourm />
						</a>
					</Box> */}
               <Box style={{ maxWidth: '500px', display: matches700 ? '' : 'none' }}>
                  <img src={homePageImg} style={{ width: '100%' }} />
               </Box>
               <Intro
                  {...{
                     categoriesRef,
                     showModal,
                     setShowModal,
                     modalCategory,
                     setModalSubCategory,
                     modalSubCategory,
                     setModalCategory,
                     handleScroll,
                  }}
               />
            </Container>
         </Box>
         <PresentHistory />
         <Slider />

         <CategoriesBlock
            categoriesRef={categoriesRef}
            {...{
               category,
               categoriesRef,
               setModalCategory,
               setModalSubCategory,
               setShowModal,
            }}
         />
         <SearchBlock />
         {/* <Container maxWidth={lg ? 'lg' : 'xl'}> */}
         <TrustedExperts
            reviewsRef={reviewsRef}
            our_checked_specialists={our_checked_specialists}
         />
         {/* <Reviews reviewsRef={reviewsRef} review={review} /> */}
         {/* </Container> */}
      </div>
   );
};

export default HomePage;
