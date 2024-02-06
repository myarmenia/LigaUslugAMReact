import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import OrderBlock from './blocks/OrderBlock';
import AddNewOrderBlock from './blocks/AddNewOrderBlock';
import MyOrdersBlock from './blocks/MyOrdersBlock';
import AddNewOrderForm from './blocks/AddNewOrderForm';
import CustomDatePicker from '../../UI/datePicker/CustomDatePicker';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getCauntEmployerTasks, getNotAppliedTasks } from '../../../store/actions/TaskActions';
import Toaster from '../../UI/toaster/Toaster';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import ModalFirstTaskMessage from '../../UI/modals/ModalFirstTaskMessage';
import { instance, options } from '../../../store/api/api';
import { setTaskCount, setTaskList } from '../../../store/reducers/TaskReducer';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Echo from 'laravel-echo';

export const useMyOrdersStyles = makeStyles({
   root: {
      height: '100%',
      minHeight: 'calc(100vh - 70px)',
      paddingTop: '70px',
      '@media (min-width: 900px)': {
         paddingTop: '110px',
      },
      backgroundColor: '#FFF',
      // marginBottom: '70px',
      //paddingTop: '40px',
      '& .MuiTypography-h4': {
         fontWeight: 500,
         fontSize: 20,
         //whiteSpace: 'noWrap',//TODO
      },
      '& .MuiTypography-h5': {
         fontWeight: 500,
         fontSize: 17,
         //whiteSpace: 'noWrap',//TODO
      },
      '& .MuiTypography-h6': {
         color: '#808080',
         fontSize: 14,
         //whiteSpace: 'noWrap',//TODO
         fontWeight: 400,
      },
      '& .MuiTypography-body1': {
         color: '#808080',
         fontSize: '14px',
      },

      //button
      '& .MuiButton-contained': {
         backgroundColor: '#4B9A2D',
         borderRadius: '10px',
         height: '40px',
         textTransform: 'none',
         fontSize: '15px',
         fontWeight: 500,
         '@media (max-width: 365px)': {
            marginBottom: '10px',
         },
      },
      '& .MuiButton-outlined': {
         background: '#445E77',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         '&:hover': {
            background: '#6585a5 !important',
         },
      },
      //cardItem
      '& .MuiCard-root': {
         borderRadius: '20px',
         margin: '10px',
         boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
         padding: '30px',
         // '@media (max-width: 450px)': {

         //     margin: '20px 0',
         // },
         '@media (max-width: 450px)': {
            margin: '20px 0',
         },
      },
      '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
         width: '170px',
         borderRadius: '10px',
         border: '1px solid #808080',
         height: '45px',
         backgroundColor: '#fff',
      },
      //input
      '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
         marginBottom: '10px',
         width: '100%',
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },

      //select
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      //from
      '& .MuiOutlinedInputInput': {
         color: '#000',
      },
   },
   radio: {
      '&$checked': {
         color: '#4B9A2D',
      },
   },
   checked: {},

   header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '20px 20px 0 20px',
      flexWrap: 'wrap',
      gap: '2px',
   },
   datePickerBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      '@media (max-width: 582px)': {
         justifyContent: 'flex-start',
      },
   },
   datepicker: {
      background: '#fff',
   },
   boxInput: {
      width: '100%',
      marginBottom: '18px',
   },
   boxInput2: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '18px',
   },
   inputText: {
      fontSize: '17px',
      textAlign: 'left',
      width: '100%',
      marginTop: '15px',
      marginBottom: '4px',
      color: '#000000',
   },
   input: {
      width: '100%',
      height: '16px',
      fontSize: '25px',
   },
   checkbox: {
      marginTop: '20px',
      alignSelf: 'flex-start',
      paddingLeft: '120px',
   },
   time: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      padding: '12px 42px',
      borderRadius: '10px',
      width: '150px',
      cursor: 'pointer',
   },
   orderSubBlockSpaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: '10px',
   },
   orderSubBlockSpaceAround: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: '10px',
   },
   wrapBox: {
      '@media (max-width: 450px)': {
         width: '100%',
         marginBottom: '20px',
      },
   },
   wrapRight: {
      textAlign: 'right',
      '@media (max-width: 450px)': {
         textAlign: 'left',
      },
   },
   btnDanger: {
      background: '#E54C51',
      color: '#fff',
      borderRadius: '10px',
      cursor: 'pointer',
      padding: '4px 12px',
      fontSize: '0.875rem',
      lineHeight: '1.75',
      letterSpacing: '0.02857em',
      fontWeight: '600',
      '&:hover': {
         background: '#965A3E !important',
      },
   },
   containerSupport: {
      padding: '0 200px',
      margin: '70px 0 500px 0',
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
   singleBlock: {
      display: 'flex',
      justifyContent: 'flex-end',
   },
   orderSubBlockSpaceBetween2: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
   },
   orderSubBlockSpaceBetweenImages: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   inLineBlock: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '30%',
      '@media (max-width: 800px)': {
         width: '100%',
      },
   },
   inLineBlock2: {
      width: '50%',
      '@media (max-width: 800px)': {
         width: '100%',
      },
   },
   inLineStyle: {
      textAlign: 'right',
      '@media (max-width: 800px)': {
         textAlign: 'left',
      },
   },
});
const filterTask = (arr = [], val = '') => {
   if (val.length > 2) {
      return arr.filter(({ title }) => title?.toLowerCase().includes(val?.toLowerCase()));
   }
   return arr;
};

export const MyOrders = () => {
   const classes = useMyOrdersStyles();
   const [valueTime, setValueTime] = useState(new Date());
   const [showForm, setShowForm] = useState(false);
   const [isOpenFirstMessage, setIsOpenFirstMessage] = useState(false);
   const [messageInfo, setMessageInfo] = useState(null);
   const [isMounted, setIsMounted] = useState(true);

   const {
      status,
      error,
      rejectLoadBtn,
      tasksList = [],
      successWork,
      message,
   } = useSelector((state) => state.task);
   const userId = useSelector((state) => state.auth.users?.user_id);
   const [openToaster, setOpenToaster] = useState(false);
   const [activ, setActiv] = useState(true);
   const [title, setTitle] = useState({
      subTitle: 'Ընթանում է կատարողների որոնում',
      index: 0,
   });
   const [value, setValue] = useState('');
   const [count, setCount] = useState(null);

   // console.log('tasksList', tasksList);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getCauntEmployerTasks());
      dispatch(getNotAppliedTasks());
   }, [dispatch]);

   useEffect(() => {
      setIsMounted(true)
      if (tasksList.length) {
         const id = [];
         for (let element of tasksList) {
            if (element.click_on_tasks) {
               id.push(
                  ...element.click_on_tasks
                     .filter((el) => !el.employer_watched_click)
                     .map((el) => el.id),
               );
            }
         }
         if (id.length) {
            instance
               .post('v1/user/employer-watched-click', { ids: [...id] })
               .then((respose) => {})
               .catch((err) => {
                  console.log('error');
               });
         }
      }
      return ()=> setIsMounted(false)
   }, [tasksList]);

   useEffect(() => {
      dispatch(
         setTaskList(
            tasksList.filter((item) => {
               return (
                  moment(item.created_at).format('YYYY-MM-DD') ===
                  moment(valueTime).format('YYYY-MM-DD')
               );
            }),
         ),
      );
   }, [valueTime, dispatch]);
   
   useEffect(() => {
      const echo = new Echo(options);

      if (userId) {
         echo.channel(`SectionTaskCount_chanal.${userId}`).listen('.SectionTaskCount', (e) => {
            setCount(e.arr);
         });
      }
      // return echo.leave(`SectionTaskCount_chanal.${userId}`)
   }, [userId]);

   useEffect(() => {
      if (count) {
         dispatch(setTaskCount(count));
         setCount(null);
      }
   }, [count, dispatch]);

   return (
      <Box className={classes.root}>
         <ModalFirstTaskMessage
            open={isOpenFirstMessage}
            setOpen={setIsOpenFirstMessage}
            info={messageInfo}
         />
         <Container maxWidth={'lg'}>
            <Toaster
               error={error}
               success={successWork}
               message={message}
               open={openToaster}
               setOpen={setOpenToaster}
            />
            <Grid
               container
               spacing={1}
               sx={{
                  '&>.MuiGrid-item': { width: '100%' },
               }}>
               <Grid item sm={12} lg={4} sx={{}}>
                  {/* //+ Создать новый заказ */}
                  <Card>
                     <AddNewOrderBlock setShowForm={setShowForm} setActiv={setActiv} />
                  </Card>
                  <Card>
                     {/* //taki cucaky  */}
                     <MyOrdersBlock
                        setTitle={setTitle}
                        setShowForm={setShowForm}
                        activ={activ}
                        setActiv={setActiv}
                     />
                  </Card>
               </Grid>

               <Grid item sm={12} lg={8}>
                  {/* //lriv taki cucakneri exacy */}
                  {!showForm ? (
                     <Box>
                        <Box className={classes.header} sx={{ paddingBottom: '15px' }}>
                           <Typography variant={'h4'}>{title?.subTitle}</Typography>
                           <Box
                              className={classes.datePickerBox}
                              sx={{
                                 displey: 'flex',
                                 gap: 1,
                                 flexWrap: 'wrap',
                              }}>
                              <TextField
                                 variant="outlined"
                                 onChange={(e) => setValue(e.target.value)}
                                 value={value}
                                 size="small"
                                 sx={{
                                    '@media (max-width: 579px)': {
                                       width: '254px',
                                    },
                                    // padding: "10px 14px",
                                    '&.Mui-focused fieldset': {
                                       borderColor: 'gray',
                                       borderRadius: '20px',
                                    },
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                                       border: '1px solid #808080',
                                       borderRadius: '11px',
                                    },
                                    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                                       {
                                          border: '1px solid #808080',
                                          borderRadius: '11px',
                                       },
                                    //focus
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                       {
                                          border: '1px solid blue',
                                          borderRadius: '11px',
                                       },
                                 }}
                                 placeholder="Որոնել պատվերներ"
                                 inputProps={{
                                    sx: {
                                       padding: '10px 14px',
                                    },
                                 }}
                                 InputProps={{
                                    endAdornment: (
                                       <SearchIcon
                                          sx={{ color: 'rgba(0, 0, 0, 0.25)' }}
                                          fontSize="small"
                                       />
                                    ),
                                 }}
                              />
                              <CustomDatePicker
                                 // orders={tasksList}
                                 // removeData={(val) => dispatch(setTaskList(val))}
                                 value={valueTime}
                                 fun={(val) => setValueTime(val)}
                              />
                           </Box>
                        </Box>
                        {filterTask(tasksList, value)?.map((order, index) =>
                           tasksList?.length !== 0 ? (
                              <Card key={index}>
                                 <OrderBlock
                                    openToaster={openToaster}
                                    rejectLoadBtn={rejectLoadBtn} //false
                                    setOpenToaster={setOpenToaster}
                                    status={status}
                                    order={order}
                                    setModalOpen={setIsOpenFirstMessage}
                                    {...{ setMessageInfo }}
                                 />
                              </Card>
                           ) : (
                              <p>~</p>
                           ),
                        )}
                     </Box>
                  ) : (
                     //+ Создать новый заказ
                     <Card>
                        <AddNewOrderForm
                           setShowForm={setShowForm}
                           setOpenToaster={setOpenToaster}
                        />
                     </Card>
                  )}
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};
