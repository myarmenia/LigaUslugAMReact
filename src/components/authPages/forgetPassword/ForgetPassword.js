import React from 'react';
import img from '../../../assets/image/authImg.jpg';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import CustomInput from '../../UI/customInput/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import BlueButton from '../../UI/CustomButtons/BlueButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useStyles } from '../../../globalStyles/AuthStyles';
import { GreenArrowSvg } from '../../../assets/svg/intro/GreenArrowSvg';
import { UpdatePassword } from '../../../utils/validation/UpdatePassword';
import { ResetPassword } from '../../../store/actions/AuthActions';

const ForgetPasswordPage = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const { load } = useSelector((state) => state.auth);
   // const [open, setOpen] = useState(false)
   const handleSvg = () => {
      navigate('/');
   };
   let userInfo = location.search.replaceAll(/(\?|email=|\&|token)/g, '');
   let email = userInfo.split('=')[0];
   let token = userInfo.split('=')[1];

   return (
      <Box className={classes.root}>
         <Box>
            <img alt="BackImage" src={img} className={classes.img} />
         </Box>
         <Box className={classes.container}>
            {/* <Toaster error={error} success={success} message={message} open={open} setOpen={setOpen}/> */}
            <Box
               onClick={handleSvg}
               style={{
                  position: 'absolute',
                  left: '50px',
                  top: '20px',
                  transform: 'rotate(180deg)',
                  cursor: 'pointer',
               }}>
               <GreenArrowSvg color={'#25588d'} />
            </Box>
            <p className={classes.title}>Վերականգնել գաղտնաբառը</p>
            <Formik
               initialValues={{ password: '', password_confirm: '' }}
               validationSchema={UpdatePassword}
               onSubmit={(values) => {
                  // window.ym(91484981, 'reachGoal', 'zayavka');
                  dispatch(ResetPassword({ ...values, token, email }));
                  navigate('/login');
               }}>
               {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                  <form onSubmit={handleSubmit}>
                     <Box className={classes.subContainer}>
                        <CustomInput
                           label={'Գաղտնաբառ'}
                           width={'70%'}
                           name={'password'}
                           type={'password'}
                           placeholder={'Գաղտնաբառ'}
                           value={values.password}
                           handleChange={(val) => setFieldValue('password', val)}
                           touched={touched.password}
                           error={errors.password}
                        />
                        <CustomInput
                           label={'Հաստատել գաղտնաբառը'}
                           placeholder={'Հաստատել գաղտնաբառը'}
                           width={'70%'}
                           type={'password'}
                           name={'password_confirm'}
                           value={values.password_confirmation}
                           handleChange={(val) => setFieldValue('password_confirm', val)}
                           touched={touched.password_confirmation}
                           error={errors.password_confirmation}
                        />
                        <Box className={classes.footer}>
                           <BlueButton action={handleSubmit} load={load} label={'Շարունակել'} />
                           <Typography
                              style={{ fontSize: '15px', textAlign: 'center' }}
                              color={'#fff'}>
                              Գրանցումն ավարտելու համար հղումը ուղարկվում է ձեր փոստին, հետևեք
                              հղմանը
                           </Typography>
                        </Box>
                     </Box>
                  </form>
               )}
            </Formik>
         </Box>
      </Box>
   );
};

export default ForgetPasswordPage;
