import { Avatar, Box, Button, Paper, Rating, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState, useMemo } from 'react';
import { useSpecialist } from './css/useSpecialist';
import ModalNewTask from '../UI/modals/ModalNewTask';
import Toaster from '../UI/toaster/Toaster';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const Text = styled(Box)(({ props }) => {
//    return {
//       margin: 0,
//       padding: 0,
//       fontFamily: 'Roboto',
//       letterSpacing: '0em',
//       backgroundColor: props.backgroundColor ? props.backgroundColor : 'red',
//    };
// });
const SpecialistUser = ({ data, selectedCategory, selectedCategories }) => {
   const classes = useSpecialist();
   const [activeModal, setActiveModal] = useState(false);
   const [categories, setCategories] = useState(null);
   const [open, setOpen] = useState(false);
   const { message } = useSelector((state) => state.task);
   const { auth } = useSelector((state) => state.auth);
   // const dispatch = useDispatch();
   const navigate = useNavigate();
   const [success, setSuccess] = useState(false);
   useEffect(() => {
      if (!categories && selectedCategory) {
         setCategories(
            data.executor_categories
               .sort((el) => {
                  if (el.category_name === selectedCategory) {
                     return 1;
                  } else {
                     return 0;
                  }
               })
               .slice(0, 3),
         );
      }
   }, [selectedCategory, categories]);

   const countStar = useMemo(() => {
      if (data?.total_reiting) {
         return +data?.total_reiting;
      }
      return 0;
   }, [data?.total_reiting]);
   return (
      <>
         <Box
            sx={{
               width: '100%',
               marginBottom: '30px',
            }}>
            <Toaster open={open} setOpen={setOpen} message={message} success={success} />
            <ModalNewTask
               modalCategory={selectedCategories}
               activcategory={true}
               showModal={activeModal}
               setShowModal={setActiveModal}
               id={data?.id}
               // setMessage={setMessage}
               setSuccess={setSuccess}
               setOpenToaster={setOpen}
            />

            <Paper
               elevation={2}
               sx={{ p: '8px', cursor: !auth ? 'pointer' : 'default', padding: '25px' }}
               onClick={() => {
                  if (!auth) navigate('/login');
               }}>
               <Box
                  sx={{
                     display: 'flex',
                     gap: '26px',
                  }}>
                  <Avatar
                     alt={data?.users?.img_path}
                     src={
                        data?.users?.img_path &&
                        `${process.env.REACT_APP_IMG_API}${data?.users?.img_path}`
                     }
                     sx={{ width: 122, height: 122 }}
                  />

                  <Box
                     sx={{
                        pt: '5px',
                        display: 'flex',
                        flexDirection: 'column',
                     }}>
                     <Typography
                        variant="h5"
                        onClick={() => {
                           if (auth) {
                              navigate(`/user_information/${data?.id}`);
                           }
                        }}
                        sx={{
                           fontWeight: 500,
                           fontSize: '32px',
                           lineHeight: '38px',
                           cursor: auth ? 'pointer' : 'default',
                        }}>
                        {`${data?.users?.name} ${data?.users?.last_name}`}
                     </Typography>
                     <Rating
                        style={{ color: '#FFF066' }}
                        name="half-rating-read"
                        // value={data.total_reiting}
                        value={countStar}
                        defaultValue={countStar}
                        readOnly
                        precision={0.5}
                     />
                     <Typography
                        variant="body2"
                        sx={{
                           fontWeight: 500,
                           fontSize: '18px',
                           color: '#8D8D8D',
                        }}>
                        {/* {`${data?.users.region ? data?.users.region : ''}`} */}
                        {/* {data?.users.region && <br />} */}

                        {data?.users.region ? data?.users.region : 'Հեռակա կարգով'}
                        <br />
                        {`${data?.users.country_name ? data?.users.country_name : ''}`}
                        <br />
                        {/* {data?.users.country_name && <br />} */}
                        {`${data?.users.address ? data?.users.address : ''}`}
                     </Typography>
                  </Box>
               </Box>
               <Box
                  sx={{
                     mt: '8px',
                     mb: '30px',
                     display: 'flex',
                     justifyContent: 'space-between',
                     alignItems: 'flex-end',
                     flexWrap: 'wrap',
                     gap: '5px',
                     // pt: "40px",
                  }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                     {categories?.map((el) => (
                        <Typography
                           key={el.id}
                           variant="body2"
                           sx={{
                              fontWeight: 500,
                              fontSize: '20px',
                              lineHeight: '151.19%',
                              color: '#445E77',
                           }}>
                           {el.category_name}
                        </Typography>
                     ))}
                  </Box>
                  {auth && (
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           gap: '10px',
                        }}>
                        <Button
                           sx={{ textTransform: 'none' }}
                           variant="outlined"
                           className={`${classes.resultsBtn1} ${classes.resultsBtnP}`}
                           onClick={() => {
                              setActiveModal(true);
                           }}>
                           Առաջարկլ պատվեր
                        </Button>
                        {/* <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  className={`${classes.resultsBtn1} ${classes.resultsBtnP}`}
                >
                  Написать специалисту
                </Button> */}
                     </Box>
                  )}
               </Box>
            </Paper>
         </Box>
      </>
   );
};

export default SpecialistUser;
