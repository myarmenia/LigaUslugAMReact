import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
   Box,
   Button,
   CircularProgress,
   Modal,
   TextField,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { useStyles } from '../../../globalStyles/ModalStyles';
import Divider from '@mui/material/Divider';
import { CloseSvg } from '../../../assets/svg/CloseSvg';
import { isValidNumber } from '../../../helper';
import { instance } from '../../../store/api/api';
import { verifyPhoneCode } from '../../../store/actions/ProfileDataActions';
import { setClearMessage, setProfileIsWrongCode } from '../../../store/reducers/ProfileDataReducer';

const BODY_ITEM = {
   display: 'flex',
   flexDirection: 'column',
   gap: '22px',
   justifyContent: 'center',
   alignItems: 'center',
};
const INPUT_PROPS = {
   inputprops: {
      sx: {
         borderRadius: '10px',
      },
   },
};
export const BUTTON_STYLE = {
   width: '190px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: '10px',
   margin: '0 auto',
   background: '#5A7287',
   color: '#fff',
   '&:hover': {
      background: '#5A7287',
   },
};

export const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   bgcolor: 'background.paper',
   borderRadius: '10px',
   border: 'none',
   outline: 'none',
   boxShadow: 24,
   p: 3,
};

const ModalPersonalData = ({ showModal, setShowModal }) => {
   const classes = useStyles();
   const [showTimer, setShowTimer] = useState(true);
   const [isSent, setIsSent] = useState(false);
   const [currentCount, setCurrentCount] = useState(null);
   const isWrongCode = useSelector((state) => state.profile.isWrongCode);
   const phoneState = useSelector((state) => state.profile.user.phone_status);
   const message = useSelector((state) => state.profile.message);
   const load = useSelector((state) => state.profile.load);
   const [showPhonCode, setShowPhonCode] = useState(false);
   const [phoneNumberMessage, setPhoneNumberMessage] = useState('');
   // const [requestStatus, setRequestStatus] = useState({
   // 	status: "ERROR",
   // 	status_text:
   // 		"Подозрение на флуд (слишком много запросов от этого IP пользователя - 4 за последние 10 минут)",
   // })
   const [requestStatus, setRequestStatus] = useState({});
   // message
   // status "ERROR"
   // status_text "Подозрение на флуд (слишком много запросов от этого IP пользователя - 4 за последние 10 минут)"
   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      setValue,
      watch,
      control,
   } = useForm({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
   });
   useEffect(() => {
      // if phone number already registered close modal
      if (phoneState) {
         setShowModal(false);
      }
   }, [phoneState, setShowModal]);
   const dispatch = useDispatch();
   // const [verificationCode, setVerificationCode] = useState('')
   const handleClose = () => {
      setShowModal(false);
      setRequestStatus({});
      dispatch(setClearMessage());
      reset();
   };

   const timer = () => setCurrentCount(currentCount - 1);

   useEffect(() => {
      if (currentCount <= 0) {
         setShowTimer(true);
         return;
      }
      if (+currentCount === 1) {
         setShowTimer(false);
      }
      const id = setInterval(timer, 1000);
      return () => clearInterval(id);
   }, [currentCount, timer]);

   useEffect(() => {
      dispatch(setClearMessage());
   }, []);
   const matches600 = useMediaQuery('(min-width:600px)');

   return (
      <div>
         <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ ...style, width: { xs: 240, sm: 400, md: 500 } }}>
               <Box className={classes.root}>
                  <Box className={classes.titleWrap}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                           width: { xs: '89%', sm: '81%', md: '76%' },
                        }}>
                        <Typography variant={'h5'}>Հաստատել Հեռախոսահամարը</Typography>
                     </Box>
                     <Box onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <CloseSvg size={15} />
                     </Box>
                  </Box>
                  <Divider color={'#808080'} style={{ height: 1, margin: '10px 0px' }} />
                  <>
                     {requestStatus.status === 'ERROR' ? (
                        <Box>
                           <Typography variant="body1">
                              Չհաջողվեց հաստատել հեռախոսահամարը: Ձեր հեռախոսահամարից 3-ից ավելի
                              հարցում է արվել։ Խնդրում ենք կրկին փորձել 24 ժամ հետո:
                           </Typography>
                        </Box>
                     ) : (
                        <>
                           {load ? (
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '40px 0',
                                 }}>
                                 <CircularProgress size={20} />
                              </Box>
                           ) : message ? (
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    margin: '40px 0',
                                 }}>
                                 {message}
                              </Box>
                           ) : (
                              <>
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       flexDirection: 'column',
                                       gap: '34px',
                                       padding: '30px',
                                    }}>
                                    <Box sx={BODY_ITEM}>
                                       <Controller
                                          name="phone_number"
                                          control={control}
                                          rules={{
                                             required: 'Մուտքագրեք ձեր Հեռախոսահամարը',
                                             minLength: {
                                                value: 11,
                                                message: 'Համարը պետք է պարունակի 11 նիշ',
                                             },
                                             maxLength: {
                                                value: 11,
                                                message: 'Համարը պետք է պարունակի 11 նիշ',
                                             },
                                          }}
                                          render={({ field: { onChange, value } }) => (
                                             <PhoneInput
                                                value={value}
                                                onChange={onChange}
                                                defaultCountry="RU"
                                                dropdownClass="dropdown_phone_input"
                                                id="phone-input"
                                                placeholder="+37477 777 777"
                                                containerStyle={
                                                   {
                                                      // maxWidth:"400px",
                                                      // width:"393px",
                                                      // "@media only screen and (max-width: 600px)":{
                                                      //   width:"200px",
                                                      // }
                                                   }
                                                }
                                                inputStyle={{
                                                   width: matches600 ? '394px' : '250px',
                                                   height: '42px',
                                                   background: 'none',
                                                }}
                                                buttonStyle={{
                                                   background: 'none',
                                                   '& hover': {
                                                      background: 'none',
                                                   },
                                                }}
                                             />
                                          )}
                                       />
                                       {errors.phone_number && (
                                          <Box sx={{ color: 'red' }}>
                                             {errors.phone_number.message}
                                          </Box>
                                       )}
                                       <Button
                                          sx={BUTTON_STYLE}
                                          style={{ textTransform: 'none' }}
                                          {...INPUT_PROPS}
                                          onClick={handleSubmit(async (data) => {
                                             window.ym(91484981, 'reachGoal', 'zayavka');
                                             const response = await instance.post(
                                                'v1/user/get-phone-number',
                                                {
                                                   phone_number: `+${data.phone_number}`,
                                                },
                                             );
                                             if (response.data.message?.status === 'ERROR') {
                                                setRequestStatus(response.data.message);
                                             } else if (
                                                response.data.message !==
                                                'Այս Հեռախոսահամարը արդեն հաստատվել է։'
                                             ) {
                                                setShowPhonCode(true);
                                                setPhoneNumberMessage('');
                                             } else {
                                                setPhoneNumberMessage(response.data.message);
                                             }
                                             setIsSent(true);
                                          })}>
                                          {isSent ? 'Կրկին ուղարկել' : 'Հաստատեք Հեռախոսահամարը'}
                                       </Button>
                                       {phoneNumberMessage === 'Այս Հեռախոսահամարը արդեն հաստատվել է։' && (
                                          <Box
                                             sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                             }}>
                                             {phoneNumberMessage}
                                          </Box>
                                       )}
                                    </Box>
                                    {showPhonCode ? (
                                       <Box sx={BODY_ITEM}>
                                          <TextField
                                             {...register('verification_code')}
                                             sx={{
                                                width: matches600 ? '394px' : '250px',
                                                borderRadius: '10px',
                                             }}
                                             {...INPUT_PROPS}
                                             placeholder="Մուտքագրեք զանգի վերջին 4 թվանշանները"
                                          />
                                          <Button
                                             sx={BUTTON_STYLE}
                                             style={{ textTransform: 'none' }}
                                             disabled={!isSent}
                                             onClick={() => {
                                                window.ym(91484981, 'reachGoal', 'zayavka');
                                                dispatch(setProfileIsWrongCode());
                                                dispatch(
                                                   verifyPhoneCode(watch('verification_code')),
                                                );
                                             }}>
                                             Հաստատել
                                          </Button>
                                          {isWrongCode && (
                                             <Box sx={{ color: 'red' }}>սխալ կոդ</Box>
                                          )}
                                       </Box>
                                    ) : null}
                                 </Box>
                              </>
                           )}
                        </>
                     )}
                  </>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalPersonalData;
