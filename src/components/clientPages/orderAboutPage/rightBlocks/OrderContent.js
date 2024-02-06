import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { useOrderAboutStyles } from '../../../../globalStyles/OrderAboutStyles';
import Card from '@mui/material/Card';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import CustomImageList from '../../../UI/customimagelist/CustomImageList';
import Button from '@mui/material/Button';
import OrderContentForm from '../../ordersPage/blocks/OrderContentForm';
import Typography from '@mui/material/Typography';
import MapYandex from '../../../UI/map/Map';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_TYPES } from '../../../../constants/images';
import { TaskLocation } from '../../MyOrders/blocks/CustomOrders';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getCompletedOrders, postFinshInWork } from '../../../../store/actions/TaskExecutorActions';
import { setLoading } from '../../../../store/reducers/AuthReducer';
import CustomInputIcon from '../../../UI/customInput/CustomInputIcon';
import { Divider, Rating, TextField } from '@mui/material';
import { createRating } from '../../../../store/actions/TaskActions';
import { instance } from '../../../../store/api/api';
import { rejectTask } from '../../../../store/reducers/TaskExecutorReducer';
import { finishTask } from '../../../../store/actions/TaskActions'; //9/4/23
import { resetPartReducer } from '../../../../store/reducers/TaskExecutorReducer'; //9/4/23
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
async function rejectIntask(data, dispatch, setOpenToaster) {
  dispatch(setLoading(true));
  await instance
    .post('v1/user/reject-employer-for-special-task', data)
    .then((res) => {
      return res.data.message;
    })
    .then((data) => {
      return dispatch(rejectTask(data));
    })
    .then(() => {
      setOpenToaster(true);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
}
const validationRejectForm = (value) => {
  if (!value) {
    return 'Заполните поле';
  } else if (value.length < 4) {
    return 'Поле должно содержать более 4 символов';
  } else if (value.length > 50) {
    return 'Поле должно содержать не более 50 символов';
  }
  return '';
};
const validetionReview = (value, action) => {
  if (!value.length) {
    action('Обязательное поле');
    return false;
  }
  return true;
};

const OrderContent = ({ setShowModal, state, setOpenToaster, setState }) => {
  const classes = useOrderAboutStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.profile);
  const [yourTask, setYourTask] = useState(false);
  const task_starttime = moment(state?.task_starttime).toDate();
  const task_finishtime = moment(state?.task_finishtime).toDate();
  const start_time = moment(task_starttime).format(`DD MMM (ddd)`);
  const finsih_time = moment(task_finishtime).format(`DD MMM (ddd)`);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const isSubmited = useSelector((state) => state.taskExecutor.isSubmited);
  const [isFinshWorking, setIsFinshWorking] = useState(false);
  const [costOfMaterials, setCostOfMaterials] = useState('');
  const [costOfWork, setCostOfWork] = useState('');
  const [ratingVal, setRatingVal] = useState(0);
  const [reviewFieldVal, setReviewFieldVal] = useState('');
  const [reviewFieldValErr, setReviewFieldValErr] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectMessage, setRejectMessage] = useState('');
  const [rejectMessageSubmited, setRejectMessageSubmited] = useState(false);
  const [rejectMessageErr, setRejectMessageErr] = useState('');

  // let history = useHistory();
  // const goToPreviousPath = () => {
  //   history.goBack();
  // };
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (reviewFieldValErr) {
      setReviewFieldValErr('');
    }
  }, [reviewFieldValErr]);

  useEffect(() => {
    if (state?.user_id !== profile?.user_id) {
      setYourTask(true);
    } else {
      setYourTask(false);
    }
  }, [state?.user_id, profile?.user_id]);
  useEffect(() => {
    setRejectMessageErr(validationRejectForm(rejectMessage));
  }, [rejectMessage]);

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
    <Card>
      <Box style={{ marginBottom: '20px' }} className={classes.orderSubBlockSpaceBetween2}>
        <Box className={classes.inLineBlock2}>
          <Typography variant={'h1'}>{state?.title ? state?.title : 'Нет'}</Typography>
        </Box>
        <Box className={classes.inLineBlock}>
          <Typography color={'#808080'} className={classes.inLineStyle} variant={'h4'}>
            Категория
          </Typography>

          <Typography className={classes.inLineStyle} variant={'h2'}>
            {state?.category_name}
          </Typography>
          <Typography color={'#808080'} className={classes.inLineStyle} variant={'h4'}>
            Подкатегории услуг
          </Typography>
          <Typography className={classes.inLineStyle} variant={'h2'}>
            {state?.subcategory_name}
          </Typography>
          <Typography color={'#5A7287'} className={classes.inLineStyle} variant={'h3'}>
            от {state?.price_from} руб.
          </Typography>
        </Box>
      </Box>
      <CustomDivider />
      <Box style={{ marginBottom: '20px' }} className={classes.orderSubBlockSpaceBetween2}>
        <Box>
          <Typography
            style={{ marginBottom: '10px', wordBreak: 'break-word' }}
            color={'#808080'}
            variant={'h4'}>
            Место выполнения
          </Typography>
          <Typography variant={'h2'}>
            <TaskLocation order={state} />
          </Typography>
        </Box>
        {state?.task_location === 'client' && (
          <Box style={{ alignSelf: 'flex-end' }}>
            <Typography color={'#808080'} className={classes.inLineStyle} variant={'h4'}>
              {state?.address}
            </Typography>
          </Box>
        )}
      </Box>
      {/* {state?.task_location !== "remotely" && (
        <Box>
          <MapYandex />
        </Box>
      )} */}
      <CustomDivider />
      <Typography style={{ marginBottom: '10px' }} variant={'h2'}>
        Удобное время выполнения заказа
      </Typography>
      <Typography color={'#808080'} variant={'h4'}>
        {start_time} - {finsih_time}
        {/* можно предложить свои даты */}
      </Typography>
      <CustomDivider />
      <Typography style={{ marginBottom: '10px' }} variant={'h2'}>
        Описание
      </Typography>
      <Typography color={'#808080'} variant={'h4'}>
        {state?.task_description}
      </Typography>
      {state?.status === 'not confirmed' && (
        <Typography
          sx={{
            color: '#4B9A2D',
          }}
          variant="body1">
          Вам отправили персональный заказ <br />
          {`${state?.users?.name} ${state?.users?.last_name}`}
        </Typography>
      )}
      <CustomImageList imageData={state?.image_tasks} show={false} isTaskImages />
      {yourTask &&
        !showForm &&
        !showRejectForm &&
        state?.status &&
        (state?.status === 'false' || state?.status === 'not confirmed') &&
        !state?.click_on_tasks.filter((el) => el.executor_profiles.users.name === user.name)
          .length && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '20px 0',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
            <Button
              sx={{
                width: '200px',
                '@media (max-width: 400px)': {
                  width: '150px',
                },
              }}
              onClick={() => setShowForm(true)}
              variant={'contained'}>
              Откликнуться
            </Button>
            <Button
              style={{ backgroundColor: 'red' }}
              sx={{
                width: '150px',
                backgroundColor: '#E20613',
                '@media (max-width: 400px)': {
                  width: '150px',
                },
              }}
              onClick={goBack}
              variant={'contained'}>
              Назад
            </Button>
            {!!(state?.status === 'not confirmed') && (
              <Button
                variant={'contained'}
                sx={{
                  width: '200px',
                  backgroundColor: 'red !important',
                  '@media (max-width: 400px)': {
                    width: '150px',
                  },
                }}
                onClick={() => {
                  setShowRejectForm(true);
                  // rejectIntask(
                  //   { task_id: state.id, user_id: state.user_id },
                  //   dispatch,
                  //   setOpenToaster
                  // );
                }}>
                Отказаться
              </Button>
            )}
          </Box>
        )}
      {state?.status === 'not confirmed' && showRejectForm && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}>
          <TextField
            fullWidth
            rows={3}
            error={rejectMessageSubmited && rejectMessageErr}
            helperText={rejectMessageSubmited && rejectMessageErr}
            maxRows={4}
            multiline
            value={rejectMessage}
            onChange={(e) => {
              setRejectMessage(e.target.value);
            }}
          />
          <Button
            variant={'contained'}
            sx={{
              // mt: 1,
              width: '200px',
              backgroundColor: 'red !important',
              '@media (max-width: 400px)': {
                width: '150px',
              },
            }}
            onClick={() => {
              if (!!validationRejectForm(rejectMessage)) {
                setRejectMessageErr(validationRejectForm(rejectMessage));
                setRejectMessageSubmited(true);
              } else {
                setRejectMessageErr(validationRejectForm(rejectMessage));
                setRejectMessageSubmited(false);
                rejectIntask(
                  {
                    task_id: state.id,
                    user_id: state.user_id,
                    message: rejectMessage,
                  },
                  dispatch,
                  setOpenToaster,
                );
              }
            }}>
            Отказаться
          </Button>
        </Box>
      )}
      {state?.status == 'inprocess' ? (
        <>
          <CustomDivider />
          {isFinshWorking && !state?.executor_work_price && !state?.executor_material_price && (
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
            {state?.executor_completed_task === '0' && (
              <Button
                style={{ width: '200px' }}
                onClick={async () => {
                  if (isFinshWorking) {
                    dispatch(
                      postFinshInWork({
                        task_id: state.id,
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
                    completedTask(state?.id); //9/4/23
                  } else {
                    setIsFinshWorking(true);
                  }
                }}
                variant={'contained'}>
                Завершить заказ
              </Button>
            )}
            {!showPhoneNumber &&
              state?.users?.phone_status !== 'not verified' &&
              state?.users?.phonenumber !== null && (
                <Button
                  sx={{
                    width: '200px',
                    '& a': {
                      color: 'inherit',
                      textDecoration: 'none',
                    },
                  }}
                  onClick={() => {
                    setShowPhoneNumber(true);
                  }}
                  variant={'contained'}>
                  Связаться с клиентом
                </Button>
              )}
            {showPhoneNumber &&
              state?.users?.phone_status !== 'not verified' &&
              state?.users?.phonenumber !== null && (
                <Button
                  variant={'contained'}
                  sx={{
                    width: '200px',
                    '& a': {
                      textDecoration: 'none',
                      color: 'inherit',
                    },
                  }}>
                  <a href={`tel:+${state?.users?.phonenumber}`}>{state?.users?.phonenumber}</a>
                </Button>
              )}
          </Box>
        </>
      ) : null}
      {state?.status === 'completed' ? (
        <>
          <CustomDivider />
          <Box sx={{ mt: '25px' }}>
            {!state?.reitings?.executor_review_to_employer &&
            !state?.reitings?.executor_star_count_to_employer ? (
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
                          task_id: state.id,
                          rating: ratingVal,
                          content: reviewFieldVal,
                        }),
                      );
                      (async () => {
                        await instance
                          .post('v1/user/click-on-special-task', {
                            id: state.id,
                          })
                          .then((response) => {
                            setState(response.data['click-on-special-task']);
                            dispatch(setLoading(false));
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
                    value={+state.reitings?.executor_star_count_to_employer}
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
                <Typography variant={'h5'} sx={{ fontSize: '18px', fontWeight: 400, mb: '12px' }}>
                  {state.reitings?.executor_review_to_employer}
                </Typography>
              </>
            )}
          </Box>
        </>
      ) : null}
      {state?.status === 'inprocess' ||
        (state?.status === 'completed' && (
          <>
            {state?.executor_work_price && state?.executor_material_price ? (
              <>
                <CustomDivider />
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 250 }} aria-label="table in working">
                    <TableHead>
                      <TableRow>
                        <TableCell>Стоимость материалов</TableCell>
                        <TableCell align="right">Стоимость работы </TableCell>
                        <TableCell align="right">Итоговая сумма</TableCell>
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
                          {state?.executor_work_price} рублей
                        </TableCell>
                        <TableCell align="right">{state?.executor_material_price} рублей</TableCell>
                        <TableCell align="right">
                          {+state?.executor_work_price + +state?.executor_material_price} рублей
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : null}
          </>
        ))}
      {yourTask && showForm && (
        <OrderContentForm
          category={state?.category_name}
          subCategory={state?.subcategory_name}
          setOpenToaster={setOpenToaster}
          state={state}
          setShowModal={setShowModal}
          setShowForm={setShowForm}
        />
      )}
    </Card>
  );
};
export default OrderContent;
