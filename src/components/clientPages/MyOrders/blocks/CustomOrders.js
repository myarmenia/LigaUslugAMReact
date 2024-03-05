import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useMyOrdersStyles } from '../MyOrders';
import { useNavigate } from 'react-router-dom';
import { selectConversationTaskList } from '../../../../store/reducers/MessagingReducer';
import { getConversationTaskList } from '../../../../store/actions/MessageActions';
import { Box } from '@mui/material';
import ModalMeeting from '../../../UI/modals/ModalMeeting';
import {
   Avatar,
   Button,
   Card,
   Dialog,
   DialogActions,
   DialogContent,
   IconButton,
   Paper,
   Rating,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   TextField,
} from '@mui/material';
import { OnlineSvg } from '../../../../assets/svg/Profile/OnlineSvg';
import MessengerSvg from '../../../../assets/svg/MessengerSvg';
import {
   createRating,
   deleteTask,
   finishTask,
   getCompletedTasks,
   getNotAppliedTasks,
   getRespondedTasks,
   messageToModerator,
   rejectExecutor,
   selectExecutor,
} from '../../../../store/actions/TaskActions';
import { resetPartReducer, setSuccess } from '../../../../store/reducers/TaskExecutorReducer';
import { setLoading } from '../../../../store/reducers/AuthReducer';
import { useLocation } from 'react-router-dom';
import { instance } from '../../../../store/api/api';
import { setActiveTaskInfo } from '../../../../store/reducers/MessagingReducer';
import ModalFirstTaskMessage from '../../../UI/modals/ModalFirstTaskMessage';
import Modal from '@mui/material/Modal';
import CustomDatePicker from '../../../UI/datePicker/CustomDatePicker';
import { TimePicker } from '../../../UI/timePicker/TimePicker';
import { DownLoad2Svg } from '../../../../assets/svg/client/DownLoad2Svg';
import { useMemo } from 'react';
import { useCallback } from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/lab';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   maxWidth: 400,
   width: '100%',
   bgcolor: 'background.paper',
   borderRadius: '20px',
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.15)',
   boxShadow: 24,
   p: '20px 90px',
   '@media(max-width: 560px)': {
      maxWidth: 'auto',
      width: '50%',
   },
};

const id = () => Math.random().toString();

async function fetchData(action, dispatch, id) {
   await instance
      .post('v1/user/click-on-special-task', { id: id })
      .then((response) => {
         action(response.data['click-on-special-task']);
      })
      .catch((err) => {
         console.log('error');
      })
      .finally(() => {
         dispatch(setLoading(false));
      });
}

//chat GPT
// async function fetchData(action, dispatch, id) {
//   try {
//     const responses = await Promise.all([
//       instance.post('v1/user/click-on-special-task', { id: id }),
//       // Add other requests here
//     ]);

//     const responseData = responses.map((response) => response.data);
//     // Process responseData as needed
//     action(responseData);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     dispatch(setLoading(false));
//   }
// }

export const TaskLocation = ({ order }) => {
   if (
      (order?.region || order?.tasks?.region) &&
      (order?.country_name || order?.tasks?.country_name) &&
      (order?.address || order?.tasks?.address)
   ) {
      return (
         <>
            <p>{order.region || order?.tasks?.region}</p>
            <p>{order.country_name || order?.tasks?.country_name}, </p>
            <p style={{ textOverflow: 'ellipsis' }}>{order.address || order?.tasks?.address}</p>
         </>
      );
   }
   if (
      (order?.region || order?.tasks?.region) &&
      (order?.country_name || order?.tasks?.country_name)
   ) {
      return (
         <>
            <p style={{ textOverflow: 'ellipsis' }}>{order?.region || order?.tasks?.region}</p>
            <p>{order.country_name || order?.tasks?.country_name}, </p>
         </>
      );
   }
   if (
      (order?.country_name || order?.tasks?.country_name) &&
      (order?.address || order?.tasks?.address)
   ) {
      return (
         <>
            <p>{order.country_name || order?.tasks?.country_name} ,</p>
            <p style={{ textOverflow: 'ellipsis' }}>{order.address || order?.tasks?.address}</p>
         </>
      );
   }
   if ((order?.region || order?.tasks?.region) && (order?.address || order?.tasks?.address)) {
      return (
         <>
            <p>{order.region || order?.tasks?.region}</p>
            <p style={{ textOverflow: 'ellipsis' }}>{order.address || order?.tasks?.address}</p>
         </>
      );
   }
   // if (!order?.task_location || !order?.tasks?.task_location ) {
   //   return "не указано";
   // }
   return <span>{order?.task_location || order?.tasks?.task_location}</span>;
};

const CustomOrders = ({ order, status, setOpenToaster }) => {
   const navigate = useNavigate();
   const classes = useMyOrdersStyles();
   const tasksList = useSelector(selectConversationTaskList);
   const dispatch = useDispatch();
   const [isOpenModalMeeting, setIsOpenModalMeeting] = useState(false);
   const [isOpenFirstMessage, setIsOpenFirstMessage] = useState(false);
   const [messageInfo, setMessageInfo] = useState(null);
   const location = useLocation();
   const pathname = location.pathname;
   const [state, setState] = useState(null);
   const [open, setOpen] = useState(false);
   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [reaffirm, setReaffirm] = useState(false);
   const [invalidAmount, setInvalidAmount] = useState(false);
   const [showReviewField, setShowReviewField] = useState(false);
   const [ratingVal, setRatingVal] = useState(0);
   const [reviewFieldVal, setReviewFieldVal] = useState('');
   const [invalidAmountMessageErr, setInvalidAmountMessageErr] = useState('');
   const [invalidAmountMessage, setInvalidAmountMessage] = useState('');
   const userId = useSelector((state) => state.auth.users.user_id);

   const reject_executor = async (task_id, profile_id, taskId) => {
      await dispatch(
         rejectExecutor({
            reject_task_executor: [
               {
                  task_id: task_id,
                  executor_profile_id: profile_id,
               },
            ],
         }),
      ).then((res) => {
         // if (res.meta.requestStatus === 'fulfilled') {
         // const id = pathname.split('/').filter((el) => !isNaN(el))[1];
         // fetchData(setState, dispatch, id);
         // }
      });
      setOpenToaster(true);
      setTimeout(() => {
         dispatch(resetPartReducer());
      }, 2500);
   };
   // useEffect(() => {
   //   dispatch(setLoading(true));
   //   const id = pathname.split('/').filter((el) => !isNaN(el))[1];
   //   // dispatch(getConversationTaskList());
   //   fetchData(setState, dispatch, id);
   // }, [pathname, dispatch, id, setState]);

   // useEffect(() => {
   //   if (!tasksList?.length) {
   //     dispatch(getConversationTaskList());
   //   }
   // }, [dispatch]);
   const chooseExecutor = async (task_id, execuro_id) => {
      await dispatch(
         selectExecutor({
            task_id: task_id,
            executor_profile_id: execuro_id,
         }),
      ).then((response) => {
         dispatch(setSuccess(true));
         setOpenToaster(true);
         dispatch(setLoading(true));
         // const id = pathname.split('/').filter((el) => !isNaN(el))[1];
         // fetchData(setState, dispatch, id);
      });

      await dispatch(getRespondedTasks());
      setTimeout(() => {
         dispatch(resetPartReducer());
      }, 3000);
   };

   // useEffect(() => {}, [date]); // sra mej zapros arvi modalic ekac timy u date-y
   const sendReview = async (id) => {
      if (showReviewField) {
         let formData = new FormData();
         formData.append('task_id', id);
         formData.append('rating', ratingVal);
         formData.append('content', reviewFieldVal);

         await dispatch(createRating(formData));
         setOpenToaster(true);
         setTimeout(() => {
            dispatch(resetPartReducer());
         }, 3000);
      } else {
         setShowReviewField(!showReviewField);
      }
      dispatch(setLoading(true));
      // const patId = pathname.split('/').filter((el) => !isNaN(el))[1];

      // dispatch(getConversationTaskList());
      fetchData(setState, dispatch, id);
      dispatch(getCompletedTasks());
   };

   //chat GPT
   // const sendReview = useMemo(() => async (id) => {
   //   if (showReviewField) {
   //     let formData = new FormData();
   //     formData.append('task_id', id);
   //     formData.append('rating', ratingVal);
   //     formData.append('content', reviewFieldVal);
   //     await dispatch(createRating(formData));
   //     setOpenToaster(true);
   //     setTimeout(() => {
   //       dispatch(resetPartReducer());
   //     }, 3000);
   //   } else {
   //     setShowReviewField(!showReviewField);
   //   }
   //   dispatch(setLoading(true));
   //   // const patId = pathname.split('/').filter((el) => !isNaN(el))[1];
   //   // console.log(patId);
   //   // dispatch(getConversationTaskList());
   //   fetchData(setState, dispatch, id);
   //   dispatch(getCompletedTasks());
   // }, [showReviewField, ratingVal, reviewFieldVal, dispatch, setOpenToaster, fetchData, setState]);

   //chat GPT useCallback
   // const sendReview = useCallback(async (id) => {
   //   if (showReviewField) {
   //     let formData = new FormData();
   //     formData.append('task_id', id);
   //     formData.append('rating', ratingVal);
   //     formData.append('content', reviewFieldVal);
   //     await dispatch(createRating(formData));
   //     setOpenToaster(true);
   //     setTimeout(() => {
   //       dispatch(resetPartReducer());
   //     }, 3000);
   //   } else {
   //     setShowReviewField(!showReviewField);
   //   }
   //   dispatch(setLoading(true));
   //   // const patId = pathname.split('/').filter((el) => !isNaN(el))[1];
   //   // console.log(patId);
   //   // dispatch(getConversationTaskList());
   //   fetchData(setState, dispatch, id);
   //   dispatch(getCompletedTasks());
   // }, [showReviewField, ratingVal, reviewFieldVal, dispatch, setOpenToaster, fetchData, setState]);

   return (
      <Box
         style={{ cursor: 'pointer' }}
         // onClick={() => {
         //   navigate(`/employer_task/${order.task_id ? order.task_id : order.id}`, {
         //     state: order,
         //   });
         // }}
      >
         <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Box sx={{ textAlign: 'center' }}>
                  <Typography
                     sx={{
                        fontSize: '23px',
                        fontWeight: '500',
                        marginBottom: '10px',
                        '@media (max-width: 560px)': {
                           fontSize: '18px',
                        },
                     }}>
                     Հանդիպում տեղում
                  </Typography>
               </Box>
               <Box style={{ background: '#808080', height: 1, marginBottom: '10px' }} />
               {/* <Box> */}
               {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DateTimePicker label="Basic date picker" />
              </DemoContainer>
            </LocalizationProvider> */}
               {/* </Box> */}
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     gap: '50px',
                     '@media (max-width: 600px)': {
                        flexDirection: 'column',
                        gap: '22px',
                     },
                  }}>
                  <Box>
                     <Typography style={{ paddingBottom: '13px' }}>ամսաթիվը</Typography>
                     <CustomDatePicker fun={(d) => setDate(d)} />
                  </Box>
                  <Box>
                     <Typography style={{ paddingBottom: '13px' }}>Ժամանակ</Typography>
                     <TimePicker fun={(t) => setTime(t)} value={time} />
                  </Box>
               </Box>
               <Box sx={{ textAlign: 'center', paddingTop: '42px' }}>
                  <Button sx={{ backgroundColor: '#4B9A2D !important' }} variant={'contained'}>
                     Ընտրել
                  </Button>
               </Box>
            </Box>
         </Modal>

         <ModalFirstTaskMessage
            open={isOpenFirstMessage}
            setOpen={setIsOpenFirstMessage}
            info={messageInfo}
         />
         <Box className={classes.orderSubBlockSpaceBetween}>
            <Box>
               <Typography variant={'h5'}>
                  Պատվեր № {order?.id} Կարգավիճակ:{' '}
                  {order?.category_name || order?.tasks?.category_name}
               </Typography>
            </Box>

            <Box>
               <Typography variant={'h6'}>
                  ամսաթիվը: {moment(order?.created_at).format(`DD MMM (ddd)`)}
               </Typography>
            </Box>
         </Box>
         <CustomDivider />
         <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
               <Box>
                  <Typography style={{ fontSize: '26px', fontWeight: '500', maxWidth: '400px' }}>
                     {order.subcategory_name ||
                        order?.title ||
                        order?.tasks?.title ||
                        order?.tasks?.subcategory_name}
                  </Typography>
                  <Typography style={{ color: '#5A7287', fontSize: '24px' }}>
                     Սկսած {order.price_from} ֏․
                  </Typography>
               </Box>
               <Box>
                  <Typography
                     className={classes.wrapRight}
                     style={{ color: '#000', fontSize: '24px', fontWeight: '500' }}>
                     հանդիպման վայր
                  </Typography>
                  <Typography
                     className={classes.wrapRight}
                     style={{ color: '#808080', fontSize: '22px' }}>
                     {order.task_location === 'У клиента' ? (
                        <span>
                           {order.region}, {order.country_name}
                           <span style={{ display: 'block' }}>{order.address}</span>
                        </span>
                     ) : (
                        <span>{order.task_location}</span>
                     )}
                  </Typography>
               </Box>
            </Box>

            {order?.status === 'false' &&
               !!order?.click_on_tasks?.length &&
               order?.click_on_tasks
                  ?.filter((el) => el.status !== 'rejected')
                  ?.map((executor, index) => {
                     const task_starttime = moment(executor.startdate_from).toDate();
                     const task_finishtime = moment(executor.start_date_to).toDate();
                     const start_time = moment(task_starttime).format(`L`);
                     const finish_time = moment(task_finishtime).format(`L`);
                     const imgPath = executor.executor_profiles?.users?.img_path;

                     return (
                        <Box key={id()}>
                           {isOpenModalMeeting && (
                              <ModalMeeting
                                 setOpen={setIsOpenModalMeeting}
                                 open={isOpenModalMeeting}
                                 executor_profile_id={executor.executor_profile_id}
                                 task_id={executor.task_id}
                              />
                           )}
                           <CustomDivider />
                           {index !== 0 && <CustomDivider />}
                           <Box className={classes.orderSubBlockSpaceBetween}>
                              <Typography variant={'h6'}>Կատարող № {index + 1}</Typography>
                              <Typography variant={'h6'}>
                                 {moment(executor.created_at).format(`LT L`)}
                              </Typography>
                           </Box>
                           <Box className={classes.orderSubBlockSpaceBetween}>
                              <Box style={{ display: 'flex' }}>
                                 <Box style={{ paddingRight: '5px' }}>
                                    <Avatar
                                       src={`${process.env.REACT_APP_IMG_API}${executor.executor_profile_avatar}`}
                                    />
                                 </Box>
                                 <Box>
                                    <Box
                                       style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          cursor: 'pointer',
                                       }}
                                       onClick={() => {
                                          navigate(
                                             `/user_information/${executor.executor_profile_id}`,
                                          );
                                       }}>
                                       <Typography style={{ paddingRight: '5px' }} variant={'h4'}>
                                          {`${executor?.executor_profile_name} ${executor?.executor_profiles?.users?.last_name}`}
                                       </Typography>
                                       <OnlineSvg />
                                    </Box>
                                    <Box className={classes.orderSubBlockSpaceAround}>
                                       <Rating
                                          style={{ color: '#FFF066' }}
                                          value={
                                             executor?.executor_total_reiting
                                                ? executor?.executor_total_reiting
                                                : 0
                                          }
                                          size={'small'}
                                          readOnly
                                          name="half-rating-read"
                                          precision={0.5}
                                       />
                                       <Typography variant={'h6'}>{`(${
                                          executor?.executor_review_count
                                             ? executor?.executor_review_count
                                             : 0
                                       } отзывов)`}</Typography>
                                    </Box>
                                 </Box>
                              </Box>
                           </Box>

                           <Box style={{ margin: '10px 0' }}>
                              <Typography style={{ whiteSpace: 'pre-wrap' }} variant={'h6'}>
                                 {executor.offer_to_employer}
                              </Typography>
                           </Box>

                           <Box
                              style={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 marginBottom: '20px',
                              }}>
                              <Box style={{ paddingRight: '50px' }}>
                                 <Typography variant={'h6'}>Предлагаемая сроки</Typography>
                                 <Typography variant={'h4'}>
                                    Սկսած {start_time} до {finish_time}
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography variant={'h6'}>Предлагаемая цена</Typography>
                                 <Typography variant={'h4'}>
                                    Սկսած {executor.service_price_from} ֏․ до{' '}
                                    {executor.service_price_to} ֏․
                                 </Typography>
                              </Box>
                           </Box>

                           <Box
                              style={{
                                 display: 'flex',
                                 flexWrap: 'wrap',
                                 justifyContent: 'space-between',
                              }}>
                              <Box
                                 style={{
                                    paddingRight: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 8,
                                 }}>
                                 {/* <span> */}
                                 <Button
                                    sx={{ backgroundColor: '#4B9A2D !important' }}
                                    onClick={() => {
                                       chooseExecutor(
                                          executor.task_id,
                                          executor.executor_profile_id,
                                       );
                                    }}
                                    variant={'contained'}>
                                    Выбрать
                                 </Button>
                                 {/* </span> */}
                                 <Button
                                    style={{ backgroundColor: '#FF0D15' }}
                                    onClick={() => {
                                       reject_executor(
                                          executor.task_id,
                                          executor.executor_profile_id,
                                          state.id,
                                       );
                                    }}
                                    variant={'contained'}>
                                    Отказаться
                                 </Button>
                                 <Button
                                    sx={{ backgroundColor: '#EA004F !important' }}
                                    onClick={() => setOpen(!open)}
                                    variant={'contained'}>
                                    Հանդիպում տեղում
                                 </Button>
                              </Box>
                              <Box>
                                 <Box
                                    style={{
                                       display: 'flex',
                                       justifyContent: 'flex-end',
                                       alignItems: 'center',
                                    }}>
                                    {status !== 'completed' && (
                                       <>
                                          <IconButton
                                             onClick={(e) => {
                                                e.stopPropagation();
                                                if (
                                                   !tasksList.some(
                                                      (val) =>
                                                         val.task_id === state?.id &&
                                                         val.executor_profile_id ===
                                                            executor?.executor_profile_id,
                                                   )
                                                ) {
                                                   setIsOpenFirstMessage(true);
                                                   setMessageInfo(executor);
                                                } else {
                                                   navigate('../chat', {
                                                      order: tasksList.filter(
                                                         (val) =>
                                                            val.task_id === state?.id &&
                                                            val.executor_profile_id &&
                                                            val.executor_profile_id ===
                                                               executor?.executor_profile_id,
                                                      ),
                                                   });

                                                   dispatch(
                                                      setActiveTaskInfo(
                                                         tasksList.filter(
                                                            (val) =>
                                                               val.task_id === state?.id &&
                                                               val.executor_profile_id &&
                                                               val.executor_profile_id ===
                                                                  executor?.executor_profile_id,
                                                         )[0],
                                                      ),
                                                   );
                                                }
                                             }}>
                                             <MessengerSvg />
                                          </IconButton>
                                          <Typography
                                             // sx={{
                                             // 	textAlign: "end",
                                             // 	whiteSpace: "nowrap",
                                             // }}

                                             variant={'h6'}>
                                             Написать исполнителю
                                          </Typography>
                                       </>
                                    )}
                                 </Box>
                              </Box>
                           </Box>
                        </Box>
                     );
                  })}

            {order?.status === 'not confirmed' && (
               <Typography
                  variant="body1"
                  style={{
                     maxWidth: '400px',
                     mt: '8px',
                     color: '#4B9A2D !important',
                  }}>
                  {`Потенциальный исполнитель ${order?.executor_profiles?.users?.name}  ${order?.executor_profiles?.users?.last_name}`}
               </Typography>
            )}
            {order?.status === 'completed' && (
               <Box>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                     }}>
                     <Box>
                        <Typography
                           // className={classes.wrapRight}
                           style={{
                              color: '#808080',
                              fontSize: '24px',
                              fontWeight: '400',
                              paddingTop: '20px',
                           }}>
                           Կատարող
                        </Typography>
                        <Typography
                           variant="body1"
                           sx={{ color: '#000 !important' }}
                           style={{
                              fontSize: '24px',
                              fontWeight: '500',
                              maxWidth: '400px',
                              mt: '8px',
                           }}>
                           {` ${order?.executor_profiles?.users?.name}  ${order?.executor_profiles?.users?.last_name}`}
                        </Typography>
                     </Box>
                     <Box>
                        <Typography
                           style={{
                              marginBottom: '10px',
                              cursor: 'pointer',
                           }}
                           className={classes.wrapRight}
                           variant={'h5'}
                           onClick={() => navigate('/documents_all')}>
                           Համաձայնագիր
                        </Typography>
                        <Typography
                           sx={{
                              '& a': {
                                 textDecoration: 'none',
                              },
                           }}>
                           <a
                              href="https://backend.ligauslug.ru/admin/contract/contract.docx"
                              download>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '3px',
                                    cursor: 'pointer',
                                 }}>
                                 <Box style={{ paddingRight: '5px' }}>
                                    <DownLoad2Svg />
                                 </Box>
                                 <Typography variant="body2" color={'#808080'}>
                                    Ներբեռնել ֆայլը
                                 </Typography>
                              </Box>
                           </a>
                        </Typography>
                     </Box>
                  </Box>
                  <Typography
                     style={{
                        fontSize: '20px',
                        fontWeight: '500',
                        color: '#000',
                        paddingTop: '40px',
                     }}>
                     {`կատարողը ավարտել է աշխատանքները։ Նշված է նյութերի արժեքը ${
                        order?.executor_material_price
                     } դրամ, աշխատանքի արժեքը ${
                        order?.executor_work_price
                     } դրամ, ընդհանուր գումարը ${
                        +order?.executor_work_price + +order?.executor_material_price
                     } դրամ. `}
                  </Typography>
                  <Box sx={{ mt: '8px' }}>
                     {!reaffirm &&
                        !invalidAmount &&
                        !order?.reitings?.created_at &&
                        !order?.problem_messages?.length && (
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 flexWrap: 'wrap',
                                 gap: '8px',
                              }}>
                              <Button
                                 color="success"
                                 onClick={() => {
                                    setReaffirm(true);
                                    sendReview(order?.id);
                                 }}
                                 variant="contained">
                                 Հավաստիացնում եմ
                              </Button>
                              <Button
                                 onClick={() => {
                                    setInvalidAmount(true);
                                 }}
                                 variant="contained"
                                 sx={{
                                    background: '#E54C51 !important',
                                 }}>
                                 Անվավեր գումար
                              </Button>
                           </Box>
                        )}

                     {invalidAmount && !!!order?.problem_messages?.length && (
                        <>
                           <Box
                              className={classes.boxInput}
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 gap: '5px',
                              }}>
                              <Typography variant={'h6'}>Ուղարկել մոդերատորին</Typography>
                              <TextField
                                 variant={'outlined'}
                                 multiline
                                 autoComplete={'off'}
                                 error={invalidAmountMessageErr}
                                 helperText={invalidAmountMessageErr}
                                 rows={2}
                                 value={invalidAmountMessage}
                                 onChange={(e) => setInvalidAmountMessage(e.target.value)}
                              />
                           </Box>
                           <Button
                              color="success"
                              sx={{ maxWidth: '250px', mt: 1 }}
                              onClick={() => {
                                 if (invalidAmountMessage.length > 9) {
                                    dispatch(
                                       messageToModerator({
                                          user_id: userId,
                                          task_id: order.id,
                                          executor_profile_id: order.executor_profile_id,
                                          problem_description: invalidAmountMessage,
                                       }),
                                    )
                                       .then((res) => {
                                          dispatch(setLoading(true));
                                          fetchData(setState, dispatch, order?.id);
                                          dispatch(getCompletedTasks());
                                          return res;
                                       })
                                       .catch((err) => {
                                          console.log(err);
                                       });
                                 } else {
                                    setInvalidAmountMessageErr('Լրացրեք դաշտը');
                                 }
                              }}
                              variant="contained">
                              Ուղարկել
                           </Button>
                        </>
                     )}
                     {reaffirm && showReviewField && !order?.reitings?.created_at && (
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '5px',
                           }}>
                           <Typography variant={'h6'}>Միավորներ</Typography>
                           <Rating
                              value={ratingVal}
                              onChange={(e) => setRatingVal(+e.target.value)}
                              // style={{ color: '#FFF066' }}
                              style={{ color: '#FFF066' }}
                              name="half-rating-read"
                              precision={0.5}
                           />
                           {/* odzivi dashtttt */}
                           <TextField
                              variant={'outlined'}
                              multiline
                              autoComplete={'off'}
                              rows={2}
                              value={reviewFieldVal}
                              onChange={(e) => setReviewFieldVal(e.target.value)}
                           />
                           {!order.reitings?.employer_star_count_to_executor &&
                              !order.reitings?.employer_review_to_executor && (
                                 <Button
                                    color="success"
                                    sx={{
                                       maxWidth: '250px',
                                    }}
                                    onClick={() => {
                                       sendReview(order?.id);
                                    }}
                                    variant="contained">
                                    Թողնել մեկնաբանություն
                                 </Button>
                              )}
                        </Box>
                     )}
                     {order?.reitings?.employer_review_to_executor && (
                        <Box>
                           <Typography
                              variant={'h4'}
                              sx={{
                                 fontWeight: 400,
                                 fontSize: '24px',
                                 lineHeight: '28px',
                              }}>
                              Իմ մեկնաբանությունը
                           </Typography>
                           <Rating
                              value={+order?.reitings?.employer_star_count_to_executor}
                              readOnly
                              style={{ color: '#FFF066' }}
                              name="half-rating-read"
                              precision={0.5}
                           />
                           <Typography
                              variant="body1"
                              sx={{
                                 fontSize: '18px',
                                 fontWeight: 400,
                                 mb: '12px',
                              }}>
                              {order.reitings?.employer_review_to_executor}
                           </Typography>
                        </Box>
                     )}
                     {!!order?.problem_messages?.length && (
                        <Typography
                           variant="h6"
                           sx={{
                              fontSize: '18px',
                              fontWeight: 400,
                              mb: '12px',
                              color: '#E54C51 !important',
                           }}>
                           {order?.problem_messages[0]?.problem_description}
                        </Typography>
                     )}
                  </Box>
               </Box>
            )}
            {order?.status === 'inprocess' && (
               <Typography
                  variant="body1"
                  style={{
                     maxWidth: '400px',
                     mt: '8px',
                     color: '#4B9A2D !important',
                  }}>
                  {`Կատարող ${order?.executor_profiles?.users?.name}  ${order?.executor_profiles?.users?.last_name}`}
               </Typography>
            )}
         </Box>
      </Box>
   );
};

// address: null
// category_name: "IT услуги"
// country_name: null
// created_at: "2023-09-05T13:50:43.000000Z"
// employer_completed_task: "0"
// executor_completed_task: "1"
// executor_material_price: "200"
// executor_profile_id: 79
// executor_profiles: {id: 79, user_id: 163, total_reiting: 5, executor_review_count: 14, balance: 37070, …}
// executor_total_price: 333
// executor_work_price: "133"
// id: 821
// nation: null
// price_from: 111
// price_to: 222
// problem_messages: []
// region: null
// reitings: {id: 67, task_id: 821, user_id: 228, executor_profile_id: 79, employer_star_count_to_executor: '5', …}
// status: "completed"
// subcategory_name: "Компьютерная помощь"
// task_description: "ewrtyui"
// task_finishtime: "2023-09-07"
// task_location: "Дистанционно"
// task_starttime: "2023-09-05"
// title: "1234"
// updated_at: "2023-09-05T13:51:58.000000Z"
// user_id: 228
// views: null

// {
//   "task_id": "822",
//   "user_id": {
//       "id": 228,
//       "name": "h22",
//       "last_name": "a22",
//       "img_path": null
//   },
//   "executor_profile_id": {
//       "id": 79,
//       "user_id": {
//           "id": 163,
//           "name": "Hoso2222",
//           "last_name": "Avetisyan",
//           "img_path": "1692966952palermo00.png"
//       },
//       "total_reiting": 5,
//       "executor_review_count": 15
//   },
//   "employer_star_count_to_executor": "4",
//   "employer_review_to_executor": "hello"
// }

export default CustomOrders;
