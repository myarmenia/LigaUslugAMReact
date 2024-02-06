import React, { useCallback, useEffect, useRef, useState } from 'react';
import PersonalData from './rightSide/PersonalData';
import OrderNotifications from './leftSide/orderNotifications/OrderNotifications';
import ProfileStatus from './leftSide/ProfileStatus';
import SocialNetworks from './leftSide/socialNetworks/SocialNetworks';
import EditPersonalData from './rightSide/EditPersonalData';
import CustomerReviews from './rightSide/CustomerReviews';
import ModalPersonalData from '../../UI/modals/ModalPersonalData';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import DistrictsAndAddresses from './rightSide/onlyExecutor/districtsAndAddresses/DistrictsAndAddresses';
import Box from '@mui/material/Box';
import ExperienceBlock from './rightSide/onlyExecutor/ExperienceBlock/ExperienceBlock';
import Portfolio from './rightSide/onlyExecutor/portfolio/Portfolio';
import EducationBlock from './rightSide/onlyExecutor/educationBlock/EducationBlock';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toaster from '../../UI/toaster/Toaster';
import { getRayonData, getRegionData } from '../../../store/actions/HeaderActions';
import ModalDeleteProfile from '../../UI/modals/ModalDeleteProfile';
import SupportInTelegram from './SupportInTelegram';
import { getЕxecutorProfilePageData } from '../../../store/actions/ProfileDataActions';
import { setChngeData } from '../../../store/reducers/ExecutorDataReducer';
import { setReytingPosition } from '../../../store/reducers/ProfileDataReducer';
import ExitDelate from './leftSide/ExitDelate';

const useAncetaStyles = makeStyles({
   root: {
      height: '100%',
      minHeight: 'calc(100vh - 90px)',
      paddingTop: '90px',
      // marginBottom: '70px',
      backgroundColor: '#FFF',
      '& .MuiCard-root': {
         borderRadius: '10px',
         marginBottom: '20px',
         boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
         padding: '30px',
         margin: '10px',
      },
   },
});

export const Worksheet = () => {
   const classes = useAncetaStyles();
   const dispatch = useDispatch();
   const { user, error, message, successWork, profile, reytingPosition } = useSelector(
      (state) => state.profile,
   );

   const { status } = useSelector((state) => state.auth); // cuyca tali ispolnitel te zakazchiki vra es
   const { executor } = useSelector((state) => state.executor);
   const [editPersonallyData, setEditPersonallyData] = useState(false);
   const [editSocialNetwork, setEditSocialNetwork] = useState(false);
   const [notificationsOrder, setNotificationOrders] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [editAddress, setEditAddress] = useState(false);
   const [editExperienceBlock, setEditExperienceBlock] = useState(false);
   const [editPortfolio, setEditPortfolio] = useState(false);
   const [editEducationBlock, setEditEducationBlock] = useState(false);
   const [isOpenDeleteProfile, setIsOpenDeleteProfile] = useState(false);
   const [openToaster, setOpenToaster] = useState(false);
   const customerReviewsRef = useRef(null);

   useEffect(() => {
      dispatch(getRegionData());
      dispatch(getRayonData());
      if (status === 'client') {
         dispatch(setChngeData(user));
      }
      // dispatch(getЕxecutorProfilePageData());
   }, [dispatch]);
   const scroll = useCallback(() => {
      customerReviewsRef?.current?.scrollIntoView();
   }, []);

   useEffect(() => {
      if (reytingPosition && customerReviewsRef?.current) {
         setTimeout(() => customerReviewsRef?.current.scrollIntoView(), 0);
         dispatch(setReytingPosition(false));
      }
   }, [reytingPosition, customerReviewsRef, dispatch]);

   useEffect(() => {
      if (status === 'client') {
         dispatch(setChngeData(user));
      }
   }, [status, dispatch, user]);
   return (
      <Box className={classes.root}>
         <Toaster
            error={error}
            success={successWork}
            message={message}
            open={openToaster}
            setOpen={setOpenToaster}
         />
         <Container maxWidth={'lg'}>
            {/* <ModalPersonalData
          showModal={showModal}
          setShowModal={setShowModal}
          setOpenToaster={setOpenToaster}
        /> */}
            <ModalDeleteProfile
               open={isOpenDeleteProfile}
               setOpen={setIsOpenDeleteProfile}
               setOpenToaster={setOpenToaster}
            />
            <Grid container>
               <Grid item xs={12} sm={12} lg={4}>
                  <ProfileStatus
                     role={status} // cuyca tali ispolnitel te zakazchiki vra es
                     user={user} // lriv useri masin informacian
                     setShowModal={setShowModal} // es chi ogtagorcvum
                     profile={profile} // ispoliteli hamara
                  />
                  {/* <SupportInTelegram /> */}
                  <SocialNetworks
                     profile={user} // lriv useri masin informacian
                     openToaster={openToaster}
                     setOpenToaster={setOpenToaster}
                     setEditSocialNetwork={setEditSocialNetwork} // naxnakan false
                     editSocialNetwork={editSocialNetwork}
                  />
                  <OrderNotifications
                     profile={user} // lriv useri masin informacian
                     openToaster={openToaster}
                     setOpenToaster={setOpenToaster}
                     notificationsOrder={notificationsOrder}
                     setNotificationOrders={setNotificationOrders} // naxnakan false
                  />
                  <ExitDelate setIsOpenDeleteProfile={setIsOpenDeleteProfile} />
                  {/* <ProfileActions {...{ setIsOpenDeleteProfile }} /> */}
               </Grid>
               {/* <Typography>kjhasfk</Typography> */}
               <Grid item xs={12} sm={12} lg={8}>
                  <>
                     {editPersonallyData && (
                        <PersonalData setEditPersonallyData={setEditPersonallyData} />
                     )}
                     {editPersonallyData && (
                        <EditPersonalData
                           setOpenToaster={setOpenToaster}
                           setEditPersonallyData={setEditPersonallyData}
                        />
                     )}
                     {status === 'executor' && (
                        <DistrictsAndAddresses
                           editAddress={editAddress}
                           setEditAddress={setEditAddress} // naxnakan false
                           setOpenToaster={setOpenToaster}
                        />
                     )}
                  </>
                  {status === 'executor' && (
                     <Box>
                        <ExperienceBlock
                           editExperienceBlock={editExperienceBlock}
                           setOpenToaster={setOpenToaster}
                           setEditExperienceBlock={setEditExperienceBlock}
                        />
                        <Portfolio
                           editPortfolio={editPortfolio}
                           setEditPortfolio={setEditPortfolio}
                           setOpenToaster={setOpenToaster}
                        />
                        <EducationBlock
                           setOpenToaster={setOpenToaster}
                           editEducationBlock={editEducationBlock}
                           setEditEducationBlock={setEditEducationBlock}
                        />
                     </Box>
                  )}
                  <Box sx={{ overflowWrap: 'anywhere' }} ref={customerReviewsRef}>
                     <CustomerReviews
                        // ref={customerReviewsRef}

                        reviews={executor[0]?.reitings}
                     />
                  </Box>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};
