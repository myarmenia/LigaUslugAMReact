import React, { useEffect, useRef, useState } from 'react';
import img from '../../../assets/image/authImg.jpg';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import { AuthValidation } from '../../../utils/validation/AuthValidation';
import CustomInput from '../../UI/customInput/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import Toaster from '../../UI/toaster/Toaster';
import BlueButton from '../../UI/CustomButtons/BlueButton';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { GreenArrowSvg } from '../../../assets/svg/intro/GreenArrowSvg';
import { resetAuth } from '../../../store/reducers/AuthReducer';
import { Registration } from '../../../store/actions/AuthActions';
import { useStyles } from '../../../globalStyles/AuthStyles';
import Button from '@mui/material/Button';

const RegistrationPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { error, message, loadAuth, successWork, requestStatus } = useSelector(
      (state) => state.auth,
   );
   //toaster
   const [openToaster, setOpenToaster] = useState(false);
   const formikRef = useRef({});

   useEffect(() => {
      if (error) {
         setOpenToaster(true);
         dispatch(resetAuth());
      }
      if (successWork) {
         setOpenToaster(true);
         setTimeout(() => {
            // navigate("/login")
            dispatch(resetAuth());
            setOpenToaster(false);
         }, 2000);
      }
      dispatch(resetAuth());
   }, [error, message, successWork, dispatch]);

   const HandleSvg = () => {
      navigate('/');
   };

   return (
      <Box className={classes.root}>
         <Box style={{ position: 'absolute' }}>
            <Toaster
               open={openToaster}
               message={message}
               success={successWork}
               setOpen={setOpenToaster}
            />
         </Box>
         <Box className={classes.img}>
            <img alt="BackImage" src={img} className={classes.img} />
         </Box>

         <Box className={classes.container}>
            <Box
               onClick={HandleSvg}
               sx={{
                  position: 'absolute',
                  left: '50px',
                  top: '20px',
                  transform: 'rotate(180deg)',
                  cursor: 'pointer',
                  '@media (max-width: 650px)': {
                     display: 'none',
                  },
               }}>
               <GreenArrowSvg color={'#25588d'} />
            </Box>
            <p className={classes.title}>Գրանցվել</p>
            <Formik
               phonenumber
               password_confirmation
               innerRef={formikRef}
               initialValues={{
                  name: '',
                  last_name: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
               }}
               validationSchema={AuthValidation}
               onSubmit={(values) => {
                  window.ym(91484981, 'reachGoal', 'zayavka');
                  dispatch(Registration(values));
               }}>
               {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                     <Box className={classes.subContainer}>
                        <CustomInput
                           label={'Անուն*'}
                           placeholder={'Անուն'}
                           width={'70%'}
                           name={'name'}
                           value={values.name}
                           handleChange={(val) => setFieldValue('name', val)}
                           touched={touched.name}
                           error={errors.name}
                           mb={8}
                        />
                        <CustomInput
                           label={'Ազգանունը*'}
                           placeholder={'Ազգանունը'}
                           width={'70%'}
                           name={'lastName'}
                           value={values.last_name}
                           handleChange={(val) => setFieldValue('last_name', val)}
                           touched={touched.last_name}
                           error={errors.last_name}
                           mb={8}
                        />
                        <CustomInput
                           label={'Էլ Հասցե*'}
                           placeholder={'Էլ Հասցե'}
                           width={'70%'}
                           name={'email'}
                           value={values.email}
                           handleChange={(val) => setFieldValue('email', val)}
                           touched={touched.email}
                           error={errors.email}
                           mb={8}
                        />
                        <CustomInput
                           label={'Գաղտնաբառ*'}
                           placeholder={'Գաղտնաբառ'}
                           width={'70%'}
                           name={'password'}
                           value={values.password}
                           handleChange={(val) => setFieldValue('password', val)}
                           touched={touched.password}
                           error={errors.password}
                           type="password"
                           mb={8}
                        />
                        <CustomInput
                           label={'Հաստատել գաղտնաբառը*'}
                           placeholder={'Հաստատել գաղտնաբառը'}
                           width={'70%'}
                           name={'password_confirmation'}
                           value={values.password_confirmation}
                           handleChange={(val) => setFieldValue('password_confirmation', val)}
                           touched={touched.password_confirmation}
                           error={errors.password_confirmation}
                           type="password"
                           mb={8}
                        />
                        <Box className={classes.footer}>
                           <BlueButton
                              // width={'160px'}
                              sx={
                                 touched.password_confirmation && errors.password_confirmation
                                    ? { marginTop: '10px' }
                                    : {}
                              }
                              load={loadAuth}
                              label={'Գրանցվել'}
                              action={handleSubmit}
                              backgroundColor={'#449D36'}
                           />
                           {requestStatus && (
                              <Typography
                                 style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                    color: '#4B9A2D',
                                 }}>
                                 Գրանցումն ավարտելու համար հղում է ուղարկվել Ձեր էլ.փոստին, հետևեք
                                 հղմանը
                              </Typography>
                           )}
                           <Box style={{ paddingTop: '25px', display: 'flex', gap: '5px' }}>
                              <Typography className={classes.registrTitleBlack}>
                                 Արդեն ունեք հաշիվ?
                              </Typography>
                              <Typography
                                 onClick={() => navigate('/login')}
                                 className={classes.registrTitleOrange}>
                                 Մուտք գործել
                              </Typography>
                           </Box>
                        </Box>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </Box>
   );
};

export default RegistrationPage;
