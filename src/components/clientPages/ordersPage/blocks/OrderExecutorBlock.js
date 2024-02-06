import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { OnlineSvg } from '../../../../assets/svg/Profile/OnlineSvg';
import { DeleteSvg } from '../../../../assets/svg/DeleteSvg';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import { useOrderStyles } from '../../../../globalStyles/OrderStyles';
import moment from 'moment';
import UserSvg from '../../../../assets/svg/header/UserSvg';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import CustomInputIcon from '../../../UI/customInput/CustomInputIcon';
import { getCompletedOrders, postFinshInWork } from '../../../../store/actions/TaskExecutorActions';
import { finishTask, getCompletedTasks } from '../../../../store/actions/TaskActions'; //9/4/23
import { resetPartReducer } from '../../../../store/reducers/TaskExecutorReducer'; //9/4/23
import { setLoading } from '../../../../store/reducers/AuthReducer';
import { createRating } from '../../../../store/actions/TaskActions';
import { instance } from '../../../../store/api/api';

import { Divider, Rating, TextField } from '@mui/material';

const validetionReview = (value, action) => {
   if (!value.length) {
      action('Обязательное поле');
      return false;
   }
   return true;
};

const OrderExecutorBlock = ({ order, index, deleteOrder }) => {
   const classes = useOrderStyles();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   let timeFromNow = moment(order?.created_at).fromNow();
   const task_starttime = moment(order.task_starttime).toDate();
   const task_finishtime = moment(order.task_finishtime).toDate();
   const start_time = moment(task_starttime).format(`DD MMM (ddd)`);
   const finsih_time = moment(task_finishtime).format(`DD MMM (ddd)`);
   const [isFinshWorking, setIsFinshWorking] = useState(false);
   const [costOfMaterials, setCostOfMaterials] = useState('');
   const [costOfWork, setCostOfWork] = useState('');
   const [state, setState] = useState(order);
   const [openToaster, setOpenToaster] = useState(null);
   const [ratingVal, setRatingVal] = useState(0);
   const [reviewFieldValErr, setReviewFieldValErr] = useState('');
   const [reviewFieldVal, setReviewFieldVal] = useState('');
   const [refresh, setRefresh] = useState(false);
   const [ste, setSte] = useState([]); //---itogum petq chekav

   useEffect(() => {
      if (openToaster === false) {
         setOpenToaster(null);
         // navigate(-1)
         dispatch(resetPartReducer());
      }
   }, [openToaster]);

   const completedTask = async (task_id) => {
      //9/4/23
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
   };
   return (
      <Box
         onClick={() => {
            if (order.status !== 'inprocess' && order.status !== 'completed') {
               navigate(`/order_about_page/${order.task_id ? order.task_id : order.id}`, {
                  state: order,
               });
            }
         }}
         sx={{ cursor: 'pointer' }}>
         <Box style={{ flexWrap: 'wrap' }} className={classes.orderSubBlockSpaceBetween}>
            <Box
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
               }}>
               <Box style={{ paddingRight: '5px' }}>
                  {order?.users?.img_path || order?.tasks?.users?.img_path ? (
                     <Avatar
                        src={`${process.env.REACT_APP_IMG_API}${
                           order?.users?.img_path || order?.tasks?.users?.img_path
                        }`}
                     />
                  ) : (
                     <UserSvg />
                  )}
               </Box>
               <Box>
                  <Box style={{ display: 'flex', alignItems: 'center' }}>
                     <Typography style={{ paddingRight: '5px' }} variant={'h2'}>
                        {order?.users?.name || order?.tasks?.users?.name}
                     </Typography>
                     <OnlineSvg />
                  </Box>
               </Box>
            </Box>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
               <Typography variant={'h5'}>{timeFromNow}</Typography>
               <Box style={{ paddingLeft: '10px', cursor: 'pointer' }}>
                  <DeleteSvg />
               </Box>
            </Box>
         </Box>
         <CustomDivider />
         <Box>
            <Box className={classes.wrapBox}>
               <Typography style={{ marginBottom: '10px' }} variant={'h1'}>
                  {order?.title || order?.tasks?.title}
               </Typography>
               <Typography color={order.status === 'default' && '#808080'} variant={'h4'}>
                  {order?.task_description || order?.tasks?.task_description}
               </Typography>
               <Typography
                  style={{ marginBottom: '10px' }}
                  // className={classes.wrapRight}
                  variant={'h2'}>
                  Категория
               </Typography>
               <Typography variant={'h5'}>
                  {order?.category_name || order?.tasks?.category_name}
               </Typography>
            </Box>
            <Box>
               <Typography
                  style={{ marginBottom: '10px' }}
                  // className={classes.wrapRight}
                  variant={'h2'}>
                  Дата выполнения работ
               </Typography>
               <Typography
                  //  className={classes.inLineStyle}
                  variant={'h5'}>
                  {start_time} - {finsih_time}
                  {/* можно предложить свои даты */}
               </Typography>

               {order.status === 'inprocess' && (
                  <>
                     <CustomDivider />
                     {isFinshWorking &&
                        !order?.executor_work_price &&
                        !order?.executor_material_price && (
                           <>
                              <Box
                                 sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                    mt: '35px',
                                 }}>
                                 <Box style={{ paddingRight: '10px' }}>
                                    <Typography>Стоимость материалов</Typography>
                                    <CustomInputIcon
                                       width={'100%'}
                                       value={costOfMaterials}
                                       handleChange={(e) => {
                                          const re = /^[0-9\b]+$/;
                                          if (e.target.value === '' || re.test(e.target.value)) {
                                             setCostOfMaterials(e.target.value);
                                          }
                                       }}
                                       placeholder={'От'}
                                       icon={'Руб.'}
                                    />
                                 </Box>
                                 <Box>
                                    <Typography>Стоимость работы</Typography>
                                    <CustomInputIcon
                                       value={costOfWork}
                                       handleChange={(e) => {
                                          const re = /^[0-9\b]+$/;
                                          if (e.target.value === '' || re.test(e.target.value)) {
                                             setCostOfWork(e.target.value);
                                          }
                                       }}
                                       placeholder={'До'}
                                       width={'100%'}
                                       icon={'Руб.'}
                                    />
                                 </Box>
                              </Box>
                           </>
                        )}
                     <Box
                        sx={{
                           margin: '20px 0',
                           display: 'flex',
                           alignItems: 'center',
                           flexWrap: 'wrap',
                           gap: '8px',
                        }}>
                        {order?.executor_completed_task === '0' && (
                           <Button
                              style={{ width: '200px' }}
                              onClick={async () => {
                                 setRefresh(true);
                                 if (isFinshWorking) {
                                    dispatch(
                                       postFinshInWork({
                                          task_id: order.id,
                                          executor_material_price: costOfMaterials,
                                          executor_work_price: costOfWork,
                                          executor_completed_task: '1',
                                       }),
                                    );
                                    setState({
                                       ...state,
                                       executor_material_price: costOfMaterials,
                                       executor_work_price: costOfWork,
                                       executor_completed_task: '1',
                                    });
                                    setIsFinshWorking(false);
                                    completedTask(order?.id); //9/4/23
                                 } else {
                                    setIsFinshWorking(true);
                                 }
                              }}
                              variant={'contained'}>
                              Завершить заказ
                           </Button>
                        )}
                     </Box>
                  </>
                  // <Typography color={'orange'} variant={'h4'}>
                  //   bbo
                  // </Typography>
               )}
               {order.status === 'completed' && (
                  <>
                     {order?.executor_work_price && order?.executor_material_price ? (
                        <>
                           <Typography sx={{ color: '#000', fontSize: '22px', fontWeight: '500' }}>
                              Стоимость материалов {order?.executor_material_price} рублей,
                              стоимость работы {order?.executor_work_price} рублей, итоговая сумма{' '}
                              {+order?.executor_work_price + +order?.executor_material_price}{' '}
                              рублей.
                           </Typography>
                        </>
                     ) : null}

                     <Box sx={{ mt: '25px' }}>
                        {!order?.reitings?.executor_review_to_employer &&
                        !order?.reitings?.executor_star_count_to_employer ? (
                           <>
                              <Box sx={{ mt: '25px', mb: '17px' }}>
                                 <Typography
                                    sx={{
                                       // mb: "8px",
                                       fontWeight: 400,
                                       fontSize: '24px',
                                       // lineHeight: "28px",
                                       color: '#808080',
                                    }}>
                                    Оценка
                                 </Typography>
                                 <Rating
                                    value={ratingVal}
                                    onChange={(e) => setRatingVal(e.target.value)}
                                    precision={0.5}
                                    name={'half-rating-read'}
                                    sx={{ color: '#FFF066' }}
                                 />
                              </Box>
                              <Box>
                                 <TextField
                                    sx={{}}
                                    fullWidth
                                    variant={'outlined'}
                                    multiline
                                    autoComplete={'off'}
                                    rows={3}
                                    error={reviewFieldValErr}
                                    helperText={reviewFieldValErr}
                                    value={reviewFieldVal}
                                    onChange={(e) => setReviewFieldVal(e.target.value)}
                                 />
                              </Box>
                              <Button
                                 style={{ width: '200px' }}
                                 sx={{ display: 'flex', margin: '20px 0' }}
                                 variant={'contained'}
                                 onClick={async () => {
                                    if (validetionReview(reviewFieldVal, setReviewFieldValErr)) {
                                       dispatch(setLoading(true));
                                       await dispatch(
                                          createRating({
                                             task_id: order.id,
                                             rating: ratingVal,
                                             content: reviewFieldVal,
                                          }),
                                       );
                                       (async () => {
                                          await instance
                                             .post('v1/user/click-on-special-task', {
                                                id: order.id,
                                             })
                                             .then((response) => {
                                                setSte(response.data['click-on-special-task']);
                                                // setState(response.data['click-on-special-task']);
                                                dispatch(setLoading(false));
                                                // dispatch(postFinshInWork())
                                                dispatch(getCompletedOrders());
                                             })
                                             .catch((err) => {
                                                console.log('error');
                                                dispatch(setLoading(false));
                                             });
                                       })();
                                    }
                                 }}>
                                 Оставить отзыв заказчику
                              </Button>
                           </>
                        ) : (
                           <>
                              <Box>
                                 <Typography variant={'h5'}>Оценка</Typography>
                                 <Rating
                                    value={+order?.reitings?.executor_star_count_to_employer}
                                    precision={0.5}
                                    name={'half-rating-read'}
                                    style={{ color: '#FFF066' }}
                                    readOnly
                                 />
                              </Box>
                              <Typography
                                 variant={'h5'}
                                 sx={{
                                    fontWeight: 400,
                                    fontSize: '24px',
                                    lineHeight: '28px',
                                 }}>
                                 Мой отзыв
                              </Typography>
                              <Typography
                                 variant={'h5'}
                                 sx={{ fontSize: '18px', fontWeight: 400, mb: '12px' }}>
                                 {order?.reitings?.executor_review_to_employer}
                              </Typography>
                           </>
                        )}
                     </Box>
                  </>
                  // <Typography color={'orange'} variant={'h4'}>
                  //   Hayko
                  // </Typography>
               )}
               {order?.employer_watched_click ? (
                  <Typography color={'#4C9B2D'} mt={1}>
                     Заказчик увидел отклик
                  </Typography>
               ) : null}
               {order.status === 'interested' && (
                  <Typography color={'#4C9B2D'} variant={'h4'}>
                     Заказчику интересно ваше предложение
                  </Typography>
               )}
               {order.status === 'showOrder' && (
                  <Typography color={'#4C9B2D'} variant={'h4'}>
                     Заказчик увидел отклик
                  </Typography>
               )}
            </Box>
         </Box>
      </Box>
   );
};
export default OrderExecutorBlock;
