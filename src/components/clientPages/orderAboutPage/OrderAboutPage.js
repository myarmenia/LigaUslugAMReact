import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileShow from './leftBlocks/ProfileShow';
import AdditionalFiles from './leftBlocks/AdditionalFiles';
import ResponseAmount from './leftBlocks/ResponseAmount';
import OrderContent from './rightBlocks/OrderContent';
import ModalWallet from '../../UI/modals/ModalWallet';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useOrderAboutStyles } from '../../../globalStyles/OrderAboutStyles';
import Toaster from '../../UI/toaster/Toaster';
import { useDispatch, useSelector } from 'react-redux';
import { instance } from '../../../store/api/api';
import { changeStatus, setLoading } from '../../../store/reducers/AuthReducer';
import { getHeaderData } from '../../../store/actions/HeaderActions';
// import ClientOredrPage from "./rightBlocks/ClientOredrPage";
import { resetPartReducer } from '../../../store/reducers/TaskExecutorReducer';
// import {
//   getExecutorBalance,
//   getExecutorPageData,
// } from "../../../store/actions/ExecutorDataActions";
// import { getNotAppliedTasks } from "../../../store/actions/TaskActions";
// import { getЕxecutorProfilePageData } from "../../../store/actions/ProfileDataActions";

const OrderAboutPage = () => {
   const classes = useOrderAboutStyles();
   const [showModal, setShowModal] = useState(false);
   const [openToaster, setOpenToaster] = useState(null);
   const { header } = useSelector((state) => state.header);
   const { error, successWork, message } = useSelector((state) => state.taskExecutor);
   const taskExecutor = useSelector((state) => state.taskExecutor);
   const [state, setState] = useState(null);
   const { pathname } = useLocation();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { auth, status, load } = useSelector((state) => state.auth);

   useEffect(() => {
      async function fetchData() {
         if (status !== 'executor' && auth) {
            await dispatch(changeStatus('executor'));
         }
      }
      fetchData();
   }, [status, auth, dispatch]);
   useEffect(() => {
      dispatch(setLoading(true));
      const id = pathname.split('/').filter((el) => !isNaN(el))[1];

      (async () => {
         await instance
            .post('v1/user/click-on-special-task', { id: id })
            .then((response) => {
               setState(response.data['click-on-special-task']);
            })
            .catch((err) => {
               console.log('error');
            })
            .finally(() => {
               dispatch(setLoading(false));
            });
      })();
   }, [pathname, dispatch]);
   useEffect(() => {
      if (!header.category) {
         dispatch(getHeaderData());
      }
   }, [dispatch, header]);

   useEffect(() => {
      if (
         message ===
         'Вы не можете подать заявку на эту работу, потому что вашего баланса недостаточно'
      ) {
         setShowModal(true);
      }
   }, [message]);
   useEffect(() => {
      if (openToaster === false) {
         setOpenToaster(null);
         // navigate(-1)
         dispatch(resetPartReducer());
      }
   }, [openToaster]);
   useEffect(() => {
      dispatch(resetPartReducer());
   }, [dispatch]);

   return (
      <Box className={classes.root}>
         <Container maxWidth={'lg'}>
            <Toaster
               error={error}
               success={successWork}
               message={message}
               open={openToaster}
               setOpen={setOpenToaster}
            />
            <ModalWallet showModal={showModal} setShowModal={setShowModal} />
            <Grid container spacing={1}>
               <Grid item sm={12} lg={4}>
                  <ProfileShow state={state} />
                  <AdditionalFiles state={state} />
                  <ResponseAmount state={state} />

                  {/* {state?.status === "false" && <ResponseAmount state={state} />} */}
               </Grid>
               <Grid item sm={12} lg={8} sx={{ width: '100%' }}>
                  <OrderContent
                     setOpenToaster={setOpenToaster}
                     state={state}
                     setState={setState}
                     setShowModal={setShowModal}
                  />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export default OrderAboutPage;
