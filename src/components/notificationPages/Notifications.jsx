import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CloseSvg } from '../../assets/svg/CloseSvg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CustomDivider from '../UI/customDivider/CustomDivider';
import moment from 'moment';
import { ReactComponent as EmployerIcon } from '../../assets/svg/employerIcon.svg';
import { ReactComponent as ExecutorIcon } from '../../assets/svg/executorIcon.svg';
import Treaty from './Treaty';
import { Card, CardContent, useMediaQuery } from '@mui/material';
import {
   CHECK_EXECUTOR_ICON,
   EMPLOYER_LINK,
   EMPLOYER_RATING,
   EXECUTOR_LINK,
   EXECUTOR_RATING,
   NOTIFICATION_STATUSES,
} from '../../constants/notification';
import {
   deleteNotification,
   getAllNotifications,
   readNotification,
} from '../../store/actions/NotificationAction';

const Notifications = ({
   created_at,
   id,
   type,
   read_at,
   index,
   notifications,
   employer,
   task_title,
   from_support,
   task_id,
   setOpen,
   setMessage,
   setSuccess,
}) => {
   const dispatch = useDispatch();
   const [readTreaty, setReadTreaty] = useState(false);
   // const user = useSelector((state) => state.auth.users.user_name);
   // const { status } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const matches960 = useMediaQuery('(min-width:960px)');
   const [load, setLoad] = useState(false);
   const isRead = type === 'App\\Notifications\\NotifyAsTaskExecutor';
   console.log(created_at);
   // const [sx, setSx] = useState(21);


   if (!matches960) {
      return (
         (EXECUTOR_LINK.includes(type) || EMPLOYER_LINK.includes(type)) && (
            <Card
               onClick={() => {
                  if (EXECUTOR_LINK.includes(type)) {
                     navigate(`/order_about_page/${task_id}`);
                  } else if (EMPLOYER_LINK.includes(type)) {
                     navigate(`/employer_task/${task_id}`);
                  }
               }}
               sx={{
                  minWidth: 265,
                  mb: 2,
                  boxShadow: '4px 4px 10px 0px #00000026',
                  borderRadius: '20px',
                  cursor: 'pointer',
               }}>
               <CardContent>
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                     }}>
                     <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {CHECK_EXECUTOR_ICON.includes(type) ? (
                           <EmployerIcon width={'80'} height={'80'} />
                        ) : (
                           <ExecutorIcon width={'80'} height={'80'} />
                        )}
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '5px',
                           }}>
                           {CHECK_EXECUTOR_ICON.includes(type)
                              ? 'հաճախորդի անունը'
                              : 'կատարողի անունը'}
                           {/* կատարողի անունը Заказчика */}
                           <Box>{employer}</Box>
                           <Typography variant="body1">{NOTIFICATION_STATUSES[type]}</Typography>
                           <Typography
                              style={{
                                 color: '#616161',
                              }}>
                              {moment(created_at).format('LL')}
                           </Typography>
                        </Box>
                     </Box>
                     {load ? (
                        <Box></Box>
                     ) : (
                        <Box>
                           <IconButton
                              onClick={(e) => {
                                 e.stopPropagation();
                                 (async () => {
                                    setLoad(true);
                                    await dispatch(deleteNotification(id))
                                       .then((res) => {
                                          if (res.meta.requestStatus === 'fulfilled') {
                                             dispatch(getAllNotifications());
                                             setMessage(res.payload.message);
                                             setOpen(true);
                                             setSuccess(true);
                                          } else if (res.meta.requestStatus === 'rejected') {
                                             setMessage('Խնդրում եմ կրկին փորձեք');
                                             setOpen(true);
                                             setSuccess(false);
                                          }
                                       })
                                       .catch((err) => {
                                          console.log(err);
                                          setMessage('Խնդրում եմ կրկին փորձեք');
                                          setOpen(true);
                                          setSuccess(false);
                                       })
                                       .finally(() => {
                                          setLoad(false);
                                       });
                                 })();
                              }}>
                              <CloseSvg />
                           </IconButton>
                        </Box>
                     )}
                  </Box>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        mt: 1,
                        '& span': {
                           fontWeight: 600,
                        },
                     }}>
                     <span>заказ</span>
                     <Box
                        sx={{
                           wordWrap: 'break-word',
                        }}>
                        {task_title}
                     </Box>
                  </Box>
                  {from_support ? (
                     <Box>
                        <Typography
                           sx={{
                              fontSize: '15px',
                              '& a': {
                                 color: '#4B9A2D',
                                 marginLeft: '10px',
                                 cursor: 'pointer',
                                 textDecoration: 'underline',
                              },
                           }}>
                           {from_support}
                        </Typography>
                        <Typography
                           sx={{
                              fontSize: '15px',
                              '& a': {
                                 color: '#4B9A2D',
                                 marginLeft: '10px',
                                 cursor: 'pointer',
                                 textDecoration: 'underline',
                              },
                           }}>
                           Եթե ​​դեռ հարցեր ունեք, կարող եք գնալ
                           <a
                              href={'https://t.me/+nPQJX6VZfJxlYTgy'}
                              target="_blank"
                              rel="nofollow">
                              Տելեգրամ ալիք.
                           </a>
                        </Typography>
                     </Box>
                  ) : null}
                  {!readTreaty && (
                     <Box
                        sx={{
                           mt: 1,
                           display: 'flex',
                           justifyContent: 'center',
                           gap: '5px',
                           flexWrap: 'wrap',
                           alignItems: 'center',
                        }}>
                        {/* {isRead ? (
                  <BlueButton
                    action={() => {
                      setReadTreaty(true);
                    }}
                    label={'Посмотреть договор'}
                  />
                ) : null} */}
                        {!read_at ? (
                           <Box
                              onClick={(e) => {
                                 e.stopPropagation();
                                 dispatch(readNotification(id));
                              }}
                              sx={{ color: '#449D36', fontSize: '20px' }}
                              // label={'Նշել որպես կարդացված'}
                           >
                              Նշել որպես կարդացված
                           </Box>
                        ) : null}
                        {/* {EXECUTOR_RATING.includes(type) && (
                  <BlueButton
                    width={{ width: '221.38px' }}
                    action={() => {
                      if (status !== 'executor') {
                        dispatch(changeStatus('executor'));
                      }

                      dispatch(setReytingPosition(true));
                      navigate('/work_sheet');
                    }}
                    label={'Посмотреть отзывы'}
                  />
                )} */}
                        {/* {EMPLOYER_RATING.includes(type) && (
                  <BlueButton
                    width={{ width: '221.38px' }}
                    action={() => {
                      if (status !== 'client') {
                        dispatch(changeStatus('client'));
                      }
                      dispatch(setReytingPosition(true));
                      navigate('/work_sheet');
                    }}
                    label={'Посмотреть отзывы'}
                  />
                )} */}
                        {/* {(EXECUTOR_LINK.includes(type) || EMPLOYER_LINK.includes(type)) && (
                  <BlueButton
                    width={{ width: '221.38px' }}
                    action={() => {
                      if (EXECUTOR_LINK.includes(type)) {
                        navigate(`/order_about_page/${task_id}`);
                      } else if (EMPLOYER_LINK.includes(type)) {
                        navigate(`/employer_task/${task_id}`);
                      }
                    }}
                    label={'Посмотреть задачу'}
                  />
                )} */}
                     </Box>
                  )}
                  {readTreaty && isRead ? (
                     <Treaty readAt={read_at} id={id} setReadTreaty={setReadTreaty} />
                  ) : null}
               </CardContent>
            </Card>
         )
      );
   }

   return (
      (EXECUTOR_LINK.includes(type) || EMPLOYER_LINK.includes(type)) && (
         <Box
            onClick={() => {
               if (EXECUTOR_LINK.includes(type)) {
                  navigate(`/order_about_page/${task_id}`);
               } else if (EMPLOYER_LINK.includes(type)) {
                  navigate(`/employer_task/${task_id}`);
               }
            }}
            sx={{
               cursor: 'pointer',
               pt: '38px',
               pb: '23px',
               pr: '43px',
               pl: '51px',
               ...(index !== notifications.length - 1 ? { borderBottom: '1px solid #808080' } : {}),
            }}>
            <Box sx={{ display: 'flex', marginBottom: '15px' }}>
               {CHECK_EXECUTOR_ICON.includes(type) ? <EmployerIcon /> : <ExecutorIcon />}
               <Box sx={{ flex: 1, ml: '42px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1">{NOTIFICATION_STATUSES[type]}</Typography>
                        <Typography
                           style={{
                              color: '#FF6B00',
                           }}>
                           {moment(created_at).format('LL')}
                        </Typography>
                     </Box>
                     {/* <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}>
                {CHECK_EXECUTOR_ICON.includes(type) ? 'կատարողի անունը' : 'հաճախորդի անունը'}
                <Box>{employer}</Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                }}>
                заказ
                <Box
                  sx={{
                    overflowWrap: 'anywhere',
                  }}>
                  {task_title}
                </Box>
              </Box>
              {isRead ? (
                <Box
                  onClick={() => setReadTreaty(true)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    pr: 5,
                  }}>
                  Посмотреть договор{' '}
                </Box>
              ) : null}
            </Box> */}
                  </Box>
               </Box>

               <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Box>
                     {!read_at && (
                        <Box
                           onClick={(e) => {
                              e.stopPropagation();
                              dispatch(readNotification(id));
                           }}
                           // label={'Նշել որպես կարդացված'}
                           sx={{
                              color: '#449D36',
                              fontSize: '20px',
                              marginLeft: '10px',
                              '@media(max-width: 1200px)': { fontSize: '16px' },
                           }}>
                           Նշել որպես կարդացված
                        </Box>
                     )}
                     {/* {EXECUTOR_RATING.includes(type) && (
              <BlueButton
                width={{ width: '100%' }}
                action={() => {
                  if (status !== 'executor') {
                    dispatch(changeStatus('executor'));
                  }

                  dispatch(setReytingPosition(true));
                  navigate('/work_sheet');
                }}
                label={'Посмотреть отзывы'}
              />
            )} */}
                     {/* {EMPLOYER_RATING.includes(type) && (
              <BlueButton
                width={{ width: '100%' }}
                action={() => {
                  if (status !== 'client') {
                    dispatch(changeStatus('client'));
                  }
                  dispatch(setReytingPosition(true));
                  navigate('/work_sheet');
                }}
                label={'Посмотреть отзывы'}
              />
            )} */}
                     {/* {(EXECUTOR_LINK.includes(type) || EMPLOYER_LINK.includes(type)) && (
              <BlueButton
                width={{ width: '100%' }}
                action={() => {
                  if (EXECUTOR_LINK.includes(type)) {
                    navigate(`/order_about_page/${task_id}`);
                  } else if (EMPLOYER_LINK.includes(type)) {
                    navigate(`/employer_task/${task_id}`);
                  }
                }}
                label={'Посмотреть задачу'}
              />
            )} */}
                  </Box>
                  <IconButton
                     onClick={(e) => {
                        e.stopPropagation();
                        (async () => {
                           setLoad(true);
                           await dispatch(deleteNotification(id))
                              .then((res) => {
                                 if (res.meta.requestStatus === 'fulfilled') {
                                    dispatch(getAllNotifications());
                                    setMessage(res.payload.message);
                                    setOpen(true);
                                    setSuccess(true);
                                 } else if (res.meta.requestStatus === 'rejected') {
                                    setMessage('Խնդրում եմ կրկին փորձեք');
                                    setOpen(true);
                                    setSuccess(false);
                                 }
                              })
                              .catch((err) => {
                                 setMessage('Խնդրում եմ կրկին փորձեք');
                                 setOpen(true);
                                 setSuccess(false);
                              })
                              .finally(() => {
                                 setLoad(false);
                              });
                        })();
                     }}>
                     <CloseSvg />
                  </IconButton>
               </Box>
               <CustomDivider />
            </Box>
            {readTreaty && isRead && (
               <Treaty readAt={read_at} id={id} setReadTreaty={setReadTreaty} />
            )}
            {from_support ? (
               <Box>
                  <Typography
                     sx={{
                        fontSize: '15px',
                        mb: 1,
                     }}>
                     {from_support}
                  </Typography>
                  <Typography
                     sx={{
                        fontSize: '15px',
                        '& a': {
                           color: '#4B9A2D',
                           marginLeft: '10px',
                           cursor: 'pointer',
                           textDecoration: 'underline',
                        },
                     }}>
                     Եթե ​​դեռ հարցեր ունեք, կարող եք գնալ
                     <a href={'https://t.me/+nPQJX6VZfJxlYTgy'} target="_blank" rel="noreferrer">
                        Տելեգրամ ալիք.
                     </a>
                  </Typography>
               </Box>
            ) : null}
         </Box>
      )
   );
};

export default Notifications;
