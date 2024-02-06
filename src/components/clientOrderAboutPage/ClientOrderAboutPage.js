import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderAboutStyles } from '../../globalStyles/OrderAboutStyles';
import Toaster from '../UI/toaster/Toaster';
import { instance } from '../../store/api/api';
import { setLoading } from '../../store/reducers/AuthReducer';
import { getConversationTaskList } from '../../store/actions/MessageActions';
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
   Typography,
} from '@mui/material';
import CustomDivider from '../UI/customDivider/CustomDivider';
import { TaskLocation } from '../clientPages/MyOrders/blocks/CustomOrders';
import moment from 'moment';
import { resetPartReducer, setSuccess } from '../../store/reducers/TaskExecutorReducer';
import MessengerSvg from '../../assets/svg/MessengerSvg';
import {
   createRating,
   deleteTask,
   finishTask,
   getNotAppliedTasks,
   getRespondedTasks,
   messageToModerator,
   rejectExecutor,
   selectExecutor,
} from '../../store/actions/TaskActions';
import ModalMeeting from '../UI/modals/ModalMeeting';
import { OnlineSvg } from '../../assets/svg/Profile/OnlineSvg';
import ModalFirstTaskMessage from '../UI/modals/ModalFirstTaskMessage';
import { setActivTask } from '../../store/reducers/TaskReducer';
// import DownloadFileSvg2 from "../../assets/svg/DownloadFileSvg2";
// import CustomInputAddFile from "../UI/customInputAddFile/CustomInputAddFile";
import { DownLoad2Svg } from '../../assets/svg/client/DownLoad2Svg';
import { setActiveTaskInfo } from '../../store/reducers/MessagingReducer';
import FileImg from '../../assets/file.svg';

const id = () => Math.random().toString();
const fileType = ['txt', 'pdf', 'docx'];

async function fetchData(action, dispatch, id) {
   await instance
      .post('v1/user/click-on-special-task', { id: id })
      .then((response) => {
         // console.log('res',response);
         action(response.data['click-on-special-task']);
      })
      .catch((err) => {
         console.log('error');
      })
      .finally(() => {
         dispatch(setLoading(false));
      });
}

const ClientOrderAboutPage = () => {
   const classes = useOrderAboutStyles();
   const navigate = useNavigate();
   // const otherClasses = useStyles();
   const [isOpenModalMeeting, setIsOpenModalMeeting] = useState(false);
   const [isOpenFirstMessage, setIsOpenFirstMessage] = useState(false);
   const [messageInfo, setMessageInfo] = useState(null);
   const [openToaster, setOpenToaster] = useState(false);
   const [showReviewField, setShowReviewField] = useState(false);
   const [invalidAmount, setInvalidAmount] = useState(false);
   const [invalidAmountMessage, setInvalidAmountMessage] = useState('');
   const [invalidAmountMessageErr, setInvalidAmountMessageErr] = useState('');
   const [ratingVal, setRatingVal] = useState(0);
   const [reviewFieldVal, setReviewFieldVal] = useState('');
   const [reaffirm, setReaffirm] = useState(false);
   const { error, successWork, message } = useSelector((state) => state.taskExecutor);
   const [openDialog, setOpenDialog] = useState(false);
   const { tasksList = [] } = useSelector((state) => state.messages);
   const userId = useSelector((state) => state.auth.users.user_id);
   const [state, setState] = useState(null);
   const location = useLocation();
   const pathname = location.pathname;
   const dispatch = useDispatch();
   const { auth, status, load } = useSelector((state) => state.auth);

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
         if (res.meta.requestStatus === 'fulfilled') {
            const id = pathname.split('/').filter((el) => !isNaN(el))[1];
            fetchData(setState, dispatch, id);
         }
      });
      setOpenToaster(true);
      setTimeout(() => {
         dispatch(resetPartReducer());
      }, 2500);
   };
   useEffect(() => {
      dispatch(setLoading(true));
      const id = pathname.split('/').filter((el) => !isNaN(el))[1];
      dispatch(getConversationTaskList());
      fetchData(setState, dispatch, id);
   }, [pathname, dispatch]);

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
         const id = pathname.split('/').filter((el) => !isNaN(el))[1];
         fetchData(setState, dispatch, id);
      });

      await dispatch(getRespondedTasks());
      setTimeout(() => {
         dispatch(resetPartReducer());
      }, 3000);
   };
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
      const patId = pathname
         .split('/')
         .filter(Boolean)
         .filter((el) => !isNaN(el))[0];

      dispatch(getConversationTaskList());
      fetchData(setState, dispatch, patId);
   };
   useEffect(() => {
      if (invalidAmountMessage.length > 9) {
         setInvalidAmountMessageErr('');
      }
   }, [invalidAmountMessage]);

   const completedTask = async (task_id) => {
      await dispatch(
         finishTask({
            employercomplatetask: [
               {
                  task_id: task_id,
               },
            ],
         }),
      );

      setOpenToaster(true);
      // await dispatch(getRespondedTasks());
      setTimeout(() => {
         dispatch(resetPartReducer());
      }, 3000);
      dispatch(setLoading(true));
      const id = pathname.split('/').filter((el) => !isNaN(el))[1];
      fetchData(setState, dispatch, id);
   };

   const task_starttime = moment(state?.task_starttime).toDate();
   const task_finishtime = moment(state?.task_finishtime).toDate();
   const start_time = moment(task_starttime).format(`DD MMM (ddd)`);
   const finsih_time = moment(task_finishtime).format(`DD MMM (ddd)`);

   if (!state) {
      return (
         <Box className={classes.root}>
            <Container maxWidth={'lg'}>
               <Box>
                  <Card>
                     <Box
                        sx={{
                           display: 'flex',
                           gap: '5px',
                           justifyContent: 'space-between',
                           flexWrap: 'wrap',
                        }}></Box>

                     <Box>
                        <Box style={{ textAlign: 'center' }}>
                           <Typography
                              style={{
                                 marginBottom: '10px',
                                 color: '#000',
                                 fontWeight: '500',
                                 fontSize: '24px',
                              }}>
                              պատվերը ջնջված է
                           </Typography>
                        </Box>
                     </Box>

                     <CustomDivider />
                  </Card>
               </Box>
            </Container>
         </Box>
      );
   }

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
               message={successWork ? 'Կատարողը հաջողությամբ ընտրվել է' : message}
               open={openToaster}
               setOpen={setOpenToaster}
            />
            <Dialog
               open={openDialog}
               onClose={() => {
                  setOpenDialog(false);
               }}
               aria-labelledby="alert-dialog-title"
               aria-describedby="alert-dialog-description">
               <DialogContent>Դուք իսկապես ցանկանում եք ջնջել այս պատվերը</DialogContent>
               <DialogActions sx={{ justifyContent: 'center' }}>
                  <Button
                     onClick={() => {
                        (async () => {
                           const formData = new FormData();
                           formData.append('_method', 'delete');

                           await dispatch(
                              deleteTask({
                                 id: state.id,
                                 formData: formData,
                              }),
                           ).then((res) => {
                              if (res.meta.requestStatus === 'fulfilled') {
                                 dispatch(getNotAppliedTasks());
                                 navigate('/my_orders');
                              }
                           });
                        })();
                        // sendReview(state.id)
                     }}
                     color="success"
                     variant="contained">
                     Այո՛
                  </Button>
                  <Button
                     color="error"
                     variant="contained"
                     onClick={() => {
                        setOpenDialog(false);
                     }}
                     autoFocus>
                     Ոչ
                  </Button>
               </DialogActions>
            </Dialog>
            <Box>
               <Card>
                  <Box
                     sx={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                     }}>
                     <Box>
                        <Typography
                           sx={{
                              fontWeight: 500,
                              fontSize: '24px',
                              color: '#000',
                           }}>
                           Պատվեր № {state?.id}, Կարգավիճակ: {state?.category_name}
                        </Typography>
                     </Box>
                     <Box>
                        <Typography
                           variant="body2"
                           sx={{
                              color: '#808080',
                              fontSize: '21px',
                              //whiteSpace: 'noWrap',//TODO
                              fontWeight: 500,
                           }}>
                           {moment(state?.created_at).format(`DD MMM (ddd)`)}
                        </Typography>
                     </Box>
                  </Box>
                  <CustomDivider />
                  {/* //stuc sksuma Не откликнувшие заказы -- sra masy */}
                  {/* taza */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                     <Typography
                        sx={{
                           maxWidth: '400px',
                           overflowWrap: 'anywhere',
                           fontSize: '26px',
                           fontWeight: '500',
                        }}>
                        {state?.title}
                     </Typography>
                     <Box>
                        <Typography
                           color={'#808080'}
                           sx={{ minWidth: ' 136px', overflowWrap: 'anywhere', fontSize: '24px' }}>
                           Ենթակատեգորիա
                        </Typography>
                        <Typography
                           sx={{
                              maxWidth: '400px',
                              overflowWrap: 'anywhere',
                              color: '#000',
                              fontWeight: '500',
                              textAlign: 'right',
                              paddingBottom: '15px',
                              paddingTop: '5px',
                           }}>
                           {state?.subcategory_name}
                        </Typography>

                        <Typography color={'#5A7287'} sx={{ fontSize: '30px', fontWeight: '500' }}>
                        սկսած {state?.price_from} դրամից
                        </Typography>
                     </Box>
                  </Box>
                  <CustomDivider />
                  {/* <Box
              sx={{
                marginBottom: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '5px',
                justifyContent: 'space-between',
              }}>
              <Box>
                <Typography color={'#808080'} variant={'h6'}>
                  Подкатегория
                </Typography>
                <Typography variant={'h5'} sx={{ maxWidth: '400px', overflowWrap: 'anywhere' }}>
                  {state?.subcategory_name}
                </Typography>
                <Typography variant={'h5'} sx={{ maxWidth: '400px', overflowWrap: 'anywhere' }}>
                  {state?.title}
                </Typography>
              </Box>
              <Box>
                <Typography variant={'h4'}>{state?.task_location}</Typography>
                <TaskLocation order={state} />
                <Typography color={'#5A7287'} variant={'h5'}>
                  սկսած  {state?.price_from} руб.
                </Typography>
              </Box>
            </Box> */}

                  <Box>
                     <Typography
                        style={{
                           marginBottom: '10px',
                           color: '#000',
                           fontWeight: '500',
                           fontSize: '24px',
                        }}>
                        Հանդիպման վայր
                     </Typography>
                     <Typography color={'#808080'} sx={{ fontSize: '22px' }}>
                        {/* {state?.task_location} */}
                        {state?.task_location === 'У клиента' ? (
                           <div>
                              {state.region}, {state.country_name}, {state.address}
                           </div>
                        ) : (
                           <span>{state?.task_location}</span>
                        )}
                     </Typography>
                  </Box>
                  <CustomDivider />
                  <Box>
                     <Typography
                        style={{
                           marginBottom: '10px',
                           color: '#000',
                           fontWeight: '500',
                           fontSize: '24px',
                        }}>
                        Когда
                     </Typography>
                     <Typography color={'#808080'} sx={{ fontSize: '22px' }}>
                        {start_time} - {finsih_time}, можно предложить свои даты
                     </Typography>
                  </Box>
                  <CustomDivider />
                  <Box>
                     <Box>
                        <Typography
                           style={{
                              marginBottom: '10px',
                              color: '#000',
                              fontWeight: '500',
                              fontSize: '24px',
                           }}>
                           Описание
                        </Typography>
                        <Typography color={'#808080'} variant={'h6'}>
                           {state?.task_description}
                        </Typography>
                     </Box>
                     <Box
                        sx={{
                           display: 'flex',
                           flexWrap: 'wrap',
                           alignItems: 'center',
                           gap: '5px',
                        }}>
                        {state?.image_tasks?.map((val, ind) => (
                           <a
                              key={val?.id}
                              download
                              target={'_blank'}
                              rel="noreferrer"
                              style={{ cursor: 'pointer' }}
                              href={`${process.env.REACT_APP_IMG_TASK}${val?.image_name}`}>
                              <img
                                 key={val?.id}
                                 src={
                                    fileType.some((el) => {
                                       return val?.image_name?.toLowerCase()?.includes(el);
                                    })
                                       ? FileImg
                                       : `${process.env.REACT_APP_IMG_TASK + val?.image_name}`
                                 }
                                 alt={val?.image_name}
                                 style={{ height: 75, width: 75, margin: 10 }}
                              />
                           </a>
                        ))}
                     </Box>
                  </Box>
                  {/* //ste verjanuma Не откликнувшие заказы -- masy */}
                  <CustomDivider />
                  <Box
                     sx={{
                        display: 'flex',
                        gap: '5px',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                     }}>
                     {state?.status === 'not confirmed' && state?.special_task_executors && (
                        <Box>
                           <Typography
                              sx={{
                                 color: '#4B9A2D',
                              }}
                              variant="body1">
                              Դուք անձնական պատվեր եք ներկայացրել
                           </Typography>
                           <Box
                              sx={{
                                 display: 'flex',
                                 gap: '5px',
                                 alignItems: 'center',
                                 flexWrap: 'wrap',
                              }}>
                              <Avatar
                                 sx={{
                                    width: '60px',
                                    height: '60px',
                                 }}
                                 alt={state?.executor_profiles?.users.img_path}
                                 src={`${process.env.REACT_APP_IMG_API}${state?.special_task_executors?.executor_profiles?.users.img_path}`}
                              />
                              <Box>
                                 <Typography style={{ fontSize: '17px' }} color={'#00000'}>
                                    Պոտենցիալ կատարող
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    sx={{
                                       fontSize: '17px',
                                       cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                       navigate(
                                          `/user_information/${state?.special_task_executors.executor_profiles?.id}`,
                                       );
                                    }}>
                                    {`${state?.special_task_executors.executor_profiles?.users?.name} ${state?.special_task_executors.executor_profiles?.users?.last_name}`}
                                 </Typography>
                                 <Rating
                                    size="small"
                                    value={
                                       state?.special_task_executors.executor_profiles?.users
                                          ?.employer_avg_rating
                                    }
                                    // precision={
                                    //   el?.executor_profiles?.users?.employer_avg_rating
                                    //     ? Number(
                                    //         el?.executor_profiles?.users
                                    //           ?.employer_avg_rating
                                    //       )
                                    //     : 0
                                    // }
                                    name={'half-rating-read'}
                                    style={{ color: '#FFF066' }}
                                    readOnly
                                 />
                              </Box>
                           </Box>
                        </Box>
                     )}

                     {(state?.status === 'completed' || state?.status === 'inprocess') && (
                        <Box
                           sx={{
                              '& a': {
                                 mt: '5px',
                                 textDecoration: 'none',
                                 color: '#808080',
                                 cursor: 'pointer',
                              },
                           }}>
                           <Box
                              sx={{
                                 display: 'flex',
                                 gap: '5px',
                                 alignItems: 'center',
                              }}>
                              <Avatar
                                 alt={state?.executor_profiles?.users.img_path}
                                 src={`${process.env.REACT_APP_IMG_API}${state?.executor_profiles?.users.img_path}`}
                              />
                              <Box>
                                 <Typography style={{ fontSize: '17px' }} color={'#00000'}>
                                     կատարող00000
                                 </Typography>
                                 <Typography
                                    variant="h5"
                                    sx={{ fontSize: '17px', cursor: 'pointer' }}
                                    onClick={() => {
                                       navigate(
                                          `/user_information/${state?.executor_profiles?.id}`,
                                       );
                                    }}>
                                    {`${state?.executor_profiles?.users?.name} ${state?.executor_profiles?.users?.last_name}`}
                                 </Typography>
                              </Box>
                           </Box>
                           {state?.executor_profiles?.users?.phone_status === 'verified' && (
                              <a href={`tel:+${state?.executor_profiles?.users?.phonenumber}`}>
                                 {`${state?.executor_profiles?.users?.phonenumber}`}
                              </a>
                           )}
                        </Box>
                     )}
                     <Box>
                        {state?.status === 'inprocess' && (
                           <Box>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    gap: '5px',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                 }}>
                                 <IconButton
                                    onClick={() => {
                                       if (
                                          !tasksList.some(
                                             (val) =>
                                                val.task_id === state?.id &&
                                                val.executor_profile_id ===
                                                   state?.executor_profiles.id,
                                          )
                                       ) {
                                          setIsOpenFirstMessage(true);
                                          setMessageInfo(state);
                                       } else {
                                          navigate('../chat', {
                                             order: tasksList.filter(
                                                (val) =>
                                                   val.task_id === state?.id &&
                                                   val.executor_profile_id &&
                                                   val.executor_profile_id ===
                                                      state?.executor_profiles.id,
                                             ),
                                          });

                                          dispatch(
                                             setActiveTaskInfo(
                                                tasksList.filter(
                                                   (val) =>
                                                      val.task_id === state?.id &&
                                                      val.executor_profile_id &&
                                                      val.executor_profile_id ===
                                                         state?.executor_profiles.id,
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
                                    Գրեք կատարող
                                 </Typography>
                              </Box>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                 }}>
                                 <Box
                                    className={classes.wrapBox}
                                    sx={{
                                       '& a': {
                                          textDecoration: 'none',
                                       },
                                    }}>
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
                                    {/* <a
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
                              Скачать файл
                            </Typography>
                          </Box>
                        </a> */}
                                 </Box>
                              </Box>
                           </Box>
                        )}
                     </Box>
                  </Box>
                  {state?.status === 'inprocess' && state?.executor_completed_task === '1' ? (
                     <>
                        <Button
                           color="success"
                           onClick={async () => completedTask(state?.id)}
                           variant="contained">
                           Ավարտել աշխատանքը
                        </Button>
                     </>
                  ) : null}
                  {state?.status === 'completed' && (
                     <Box sx={{ mt: '8px' }}>
                        {!reaffirm &&
                           !invalidAmount &&
                           !state?.reitings?.created_at &&
                           !state?.problem_messages?.length && (
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
                                       sendReview(state?.id);
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

                        {invalidAmount && !!!state?.problem_messages?.length && (
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
                                 onClick={async () => {
                                    if (invalidAmountMessage.length > 9) {
                                       await dispatch(
                                          messageToModerator({
                                             user_id: userId,
                                             task_id: state.id,
                                             executor_profile_id: state.executor_profile_id,
                                             problem_description: invalidAmountMessage,
                                          }),
                                       ).then((res) => {
                                          dispatch(setLoading(true));
                                          const id = pathname
                                             .split('/')
                                             .filter((el) => !isNaN(el))[1];
                                          fetchData(setState, dispatch, id);
                                       });
                                    } else {
                                       setInvalidAmountMessageErr('Լրացրեք դաշտը');
                                    }
                                 }}
                                 variant="contained">
                                 Թողնել
                              </Button>
                           </>
                        )}
                        {reaffirm && showReviewField && !state?.reitings?.created_at && (
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 gap: '5px',
                              }}>
                              <Typography variant={'h6'}>Գնահատական</Typography>
                              <Rating
                                 value={ratingVal}
                                 onChange={(e) => setRatingVal(e.target.value)}
                                 style={{ color: '#FFF066' }}
                                 name="half-rating-read"
                                 precision={0.5}
                              />
                              <TextField
                                 variant={'outlined'}
                                 multiline
                                 autoComplete={'off'}
                                 rows={2}
                                 value={reviewFieldVal}
                                 onChange={(e) => setReviewFieldVal(e.target.value)}
                              />
                              {!state.reitings?.employer_star_count_to_executor &&
                                 !state.reitings?.employer_review_to_executor && (
                                    <Button
                                       color="success"
                                       sx={{
                                          maxWidth: '250px',
                                       }}
                                       onClick={() => {
                                          sendReview(state?.id);
                                       }}
                                       variant="contained">
                                       Թողնել կարծիք Կատարողին
                                    </Button>
                                 )}
                           </Box>
                        )}
                        {state?.reitings?.employer_review_to_executor && (
                           <Box>
                              <Typography
                                 variant={'h4'}
                                 sx={{
                                    fontWeight: 400,
                                    fontSize: '24px',
                                    lineHeight: '28px',
                                 }}>
                                 Իմ  կարծիքը
                              </Typography>
                              <Rating
                                 value={+state?.reitings?.employer_star_count_to_executor}
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
                                 {state.reitings?.employer_review_to_executor}
                              </Typography>
                           </Box>
                        )}
                        {!!state?.problem_messages?.length && (
                           <Typography
                              variant="h6"
                              sx={{
                                 fontSize: '18px',
                                 fontWeight: 400,
                                 mb: '12px',
                                 color: '#E54C51 !important',
                              }}>
                              {state?.problem_messages[0]?.problem_description}
                           </Typography>
                        )}
                     </Box>
                  )}
                  {(state?.status === 'inprocess' || state?.status === 'completed') &&
                     state?.executor_work_price &&
                     state?.executor_material_price && (
                        <Box sx={{ mt: '8px' }}>
                           <CustomDivider />
                           <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                 <TableHead>
                                    <TableRow>
                                       <TableCell>Նյութերի արժեքը</TableCell>
                                       <TableCell align="right">Աշխատանքի արժեքը </TableCell>
                                       <TableCell align="right">Ընդհանուր գումարը</TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    <TableRow
                                       sx={{
                                          '&:last-child td, &:last-child th': {
                                             border: 0,
                                          },
                                       }}>
                                       <TableCell component="th" scope="row">
                                          {state?.executor_work_price} Դրամ
                                       </TableCell>
                                       <TableCell align="right">
                                          {state?.executor_material_price} Դրամ
                                       </TableCell>
                                       <TableCell align="right">
                                          {+state?.executor_work_price +
                                             +state?.executor_material_price}{' '}
                                          Դրամ
                                       </TableCell>
                                    </TableRow>
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </Box>
                     )}
                  {state?.status === 'false' && !state?.click_on_tasks?.length && (
                     <Typography
                        variant="body2"
                        color={'warning'}
                        sx={{ cursor: 'pointer', color: '#E54C51' }}
                        onClick={() => setOpenDialog(true)}>
                        Ջնջել
                     </Typography>
                  )}
                  {state?.status === 'false' &&
                     !!state?.click_on_tasks?.length &&
                     state?.click_on_tasks
                        ?.filter((el) => el.status !== 'rejected')
                        ?.map((executor, index) => {
                           const task_starttime = moment(executor.startdate_from).toDate();
                           const task_finishtime = moment(executor.start_date_to).toDate();
                           const start_time = moment(task_starttime).format(`L`);
                           const finish_time = moment(task_finishtime).format(`L`);
                           const imgPath = executor.executor_profiles?.users?.img_path;
                           console.log('executorCard', executor);
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
                                 {index !== 0 && <CustomDivider />}
                                 <Box className={classes.orderSubBlockSpaceBetween}>
                                    <Typography variant={'h6'}>
                                       Կատարող No. {index + 1}
                                    </Typography>
                                    <Typography variant={'h6'}>
                                       {moment(executor.created_at).format(`LT L`)}
                                    </Typography>
                                 </Box>
                                 <Box className={classes.orderSubBlockSpaceBetween}>
                                    <Box style={{ display: 'flex' }}>
                                       <Box style={{ paddingRight: '5px' }}>
                                          <Avatar
                                             src={`${process.env.REACT_APP_IMG_API}${imgPath}`}
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
                                             <Typography
                                                style={{ paddingRight: '5px' }}
                                                variant={'h4'}>
                                                {`${executor?.executor_profiles?.users?.name} ${executor?.executor_profiles?.users?.last_name}`}
                                             </Typography>
                                             <OnlineSvg />
                                          </Box>
                                          <Box className={classes.orderSubBlockSpaceAround}>
                                             <Rating
                                                style={{ color: '#FFF066' }}
                                                value={
                                                   executor?.executor_profiles?.total_reiting
                                                      ? executor?.executor_profiles?.total_reiting
                                                      : 0
                                                }
                                                size={'small'}
                                                readOnly
                                                name="half-rating-read"
                                                precision={0.5}
                                             />
                                             <Typography variant={'h6'}>{`(${
                                                executor?.executor_profiles?.executor_review_count
                                                   ? executor?.executor_profiles
                                                        ?.executor_review_count
                                                   : 0
                                             } կարծիքներ)`}</Typography>
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
                                       <Typography variant={'h6'}>Առաջարկվող ժամկետը</Typography>
                                       <Typography variant={'h4'}>
                                          սկսած  {start_time} մինչև {finish_time}
                                       </Typography>
                                    </Box>
                                    <Box>
                                       <Typography variant={'h6'}>Предлагаемая цена</Typography>
                                       <Typography variant={'h4'}>
                                          սկսած  {executor.service_price_from} 	֏. մինչև{' '}
                                          {executor.service_price_to} 	֏.
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
                                       <span style={{ paddingRight: '30px' }}>
                                          <Button
                                             onClick={() => {
                                                chooseExecutor(
                                                   executor.task_id,
                                                   executor.executor_profile_id,
                                                );
                                             }}
                                             variant={'contained'}>
                                             Ընտրել
                                          </Button>
                                       </span>
                                       <Button
                                          style={{ backgroundColor: '#E54C51' }}
                                          onClick={() => {
                                             reject_executor(
                                                executor.task_id,
                                                executor.executor_profile_id,
                                                state.id,
                                             );
                                          }}
                                          variant={'contained'}>
                                          Հրաժարվել
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
                                                   onClick={() => {
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
                                                   Գրեք կատարող
                                                </Typography>
                                             </>
                                          )}
                                       </Box>
                                    </Box>
                                 </Box>
                              </Box>
                           );
                        })}
               </Card>
            </Box>
         </Container>
      </Box>
   );
};

export default ClientOrderAboutPage;
