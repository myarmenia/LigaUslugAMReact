import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CustomInput from '../../UI/customInput/CustomInput';
import { makeStyles } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { instance } from '../../../store/api/api';
import Toaster from '../../UI/toaster/Toaster';
import telegram from '../../../assets/pngwing.com.png';
import { Avatar, Link } from '@mui/material';

const useStyles = makeStyles({
   root: {
      height: '100%',
      minHeight: 'calc(100vh - 90px)',
      paddingTop: '90px',
      '@media (max-width: 900px)': {
         minHeight: 'calc(100vh - 570px)',
      },
      // marginBottom: '70px',
      // backgroundColor: '#CFCFCF',
      '& .MuiCard-root': {
         borderRadius: '10px',
         marginBottom: '20px',
         boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
         padding: '30px',
         margin: '10px',
      },
      '& .MuiTypography-h4': {
         fontWeight: 500,
         fontSize: 20,
         whiteSpace: 'noWrap',
      },
      '& .MuiButton-outlined': {
         background: '#8A74EF',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         width: '160px',
         marginBottom: '10px',
      },
   },
   containerSupport: {
      padding: '0 200px',
      margin: '20px 0 50px 0',
      '@media (max-width: 950px)': {
         padding: '0',
      },
   },
   subContainerSupport: {
      padding: '0 100px',
      '@media (max-width: 1100px)': {
         padding: '0',
      },
   },
});
const responsMessageForSupport = async (value, setMessage) => {
   const data = await instance
      .post('v1/user/message-for-support', value)
      .then((response) => {
         setMessage(response?.data?.message);
      })
      .catch((err) => {
         console.log(err);
      });
};

const Support = () => {
   const classes = useStyles();
   const [responseMessage, setResponseMessage] = useState('');
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      if (loading) {
         setTimeout(() => {
            setResponseMessage('');
            setLoading(false);
         }, 5000);
      }
   }, [loading]);
   return (
      <div className={classes.root}>
         <Toaster
            message={responseMessage}
            success={responseMessage}
            setOpen={setLoading}
            open={loading}
         />
         <Container maxWidth={'lg'} sx={{ paddingBottom: '10px' }}>
            <Box className={classes.containerSupport}>
               <Card>
                  <Typography
                     sx={{ textAlign: 'center', whiteSpace: 'normal !important' }}
                     variant={'h4'}>
                     Աջակցություն
                  </Typography>
                  {loading && (
                     <Typography sx={{ textAlign: 'center' }}>{responseMessage}</Typography>
                  )}
                  <Divider color={'#808080'} style={{ margin: '20px 0 40px 0' }} />
                  <Formik
                     initialValues={{
                        email: '',
                        text: '',
                     }}
                     validationSchema={object().shape({
                        email: string()
                           .required('Պարտադիր դաշտ')
                           .min(3, 'Շատ կարճ')
                           .max(250, 'Չափազանց երկար')
                           .email('Սա էլ փոստ չէ'),
                     })}
                     onSubmit={(values) => {
                        setLoading(true);
                        responsMessageForSupport(values, setResponseMessage);
                     }}>
                     {({ values, errors, touched, setFieldValue, handleSubmit }) => (
                        <>
                           <form onSubmit={handleSubmit}>
                              <Box className={classes.subContainerSupport}>
                                 <Box style={{ marginBottom: '30px' }}>
                                    <CustomInput
                                       placeholder={'էլ փոստ '}
                                       name={'email'}
                                       value={values.email}
                                       handleChange={(val) => setFieldValue('email', val)}
                                       touched={touched.email}
                                       error={errors.email}
                                       variant="outlined"
                                    />
                                 </Box>
                                 <CustomInput
                                    variant="outlined"
                                    name={'text'}
                                    value={values.text}
                                    handleChange={(val) => setFieldValue('text', val)}
                                    textArea={true}
                                    placeholder={'Հաղորդագրություն'}
                                 />
                              </Box>
                              <Box
                                 style={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                 }}>
                                 <Box sx={{ mb: 1 }}>
                                    Կարող եք գրել ալիքի հեռագրային աջակցության ծառայությանը։
                                 </Box>
                                 <Box
                                    style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       marginBottom: 15,
                                    }}>
                                    {/* <Avatar
                                       src={telegram}
                                       variant="rounded"
                                       sx={{
                                          width: 25,
                                          height: 25,
                                          marginRight: 1,
                                       }}
                                    /> */}
                                    {/* <Box>
                                       <Typography variant={'h6'}>
                                          <Link
                                             href={'https://t.me/+nPQJX6VZfJxlYTgy'}
                                             target="_blank"
                                             style={{
                                                margin: 0,
                                                cursor: 'pointer',
                                             }}>
                                             Телеграм
                                          </Link>
                                       </Typography>
                                    </Box> */}
                                 </Box>
                              </Box>
                              <Box
                                 style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: '15px',
                                 }}>
                                 <Button
                                    // className={classes.btnn}
                                    disabled={loading}
                                    style={{
                                       background: 'red !important',
                                    }}
                                    // sx={{
                                    //   ':hover': {
                                    //     backgroundColor: 'red', // theme.palette.primary.main
                                    //   },
                                    // }}
                                    variant={'outlined'}
                                    onClick={handleSubmit}>
                                    Ուղարկել
                                 </Button>
                              </Box>
                           </form>
                        </>
                     )}
                  </Formik>
               </Card>
            </Box>
         </Container>
      </div>
   );
};

export default Support;
