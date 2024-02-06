import React, { useEffect, useState } from 'react';
import FilterOrders from './blocks/FilterOrders';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import OrderExecutorBlock from './blocks/OrderExecutorBlock';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useOrderStyles } from '../../../globalStyles/OrderStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, taskCountExecutor } from '../../../store/actions/TaskExecutorActions';
import { TOP_FILTER } from './helper';
import {
  addChangeListToExecutorCategory,
  setSubmitCategories,
} from '../../../store/reducers/FilterOrdersReducer';
import Echo from 'laravel-echo';
import { options } from '../../../store/api/api';
import { setCount } from '../../../store/reducers/TaskExecutorReducer';

const OrdersPage = () => {
  const classes = useOrderStyles();
  const dispatch = useDispatch();
  const { tasks, count } = useSelector((state) => state.taskExecutor);
  const [showFilterBlock, setShowFilterBlock] = useState(false);
  const [ordersNotSelectedSubmitted, setOrdersNotSelectedSubmitted] = useState(false);
  const [rsesponseOrdersSubmitted, setResponseOrdersSubmitted] = useState(false);
  const [workOrdersSubmitted, setWorkOrdersSubmitted] = useState(false);
  const [completedOrdersSubmitted, setCompletedOrdersSubmitted] = useState(false);
  const [filterOrdersSubmitted, setFilterOrdersSubmitted] = useState(false);
  const [notConfirmedEmployer, setNotConfirmedEmployer] = useState(false);
  const [personalOrders, setPersonalOrders] = useState(false);
  const { submitCategories, categories } = useSelector((state) => state.filterOrders);
  const userId = useSelector((state) => state.auth.users?.user_id);
  const regionUsers = useSelector((state) => state.profile.profile.user?.region);
 
  const [topFilter, setTopFilter] = useState(
    TOP_FILTER(
      dispatch,
      setShowFilterBlock,
      setOrdersNotSelectedSubmitted,
      setResponseOrdersSubmitted,
      setWorkOrdersSubmitted,
      setCompletedOrdersSubmitted,
      setNotConfirmedEmployer,
      setPersonalOrders,
    ),
  );
  const [message, setMessage] = useState('');
  useEffect(() => {
    const echo = new Echo(options);
    if (userId) {
      echo
        .channel(`ExecutorSectionTaskCount_chanal.${userId}`)
        .listen('.ExecutorSectionTaskCount', (e) => {
          dispatch(setCount(e.exec_arr));
        });
    }
    // echo.leave(`ExecutorSectionTaskCount_chanal.${userId}`)
  }, [userId]);
  useEffect(() => {
    setTopFilter(
      topFilter.map((el, i) => {
        // if (i === 1) {
        //   return {
        //     ...el,
        //     count: count?.showalltasktoexecutor,
        //   };
        // } else if (i === 2) {
        //   return {
        //     ...el,
        //     count: count?.respondedtaskforexecutor,
        //   };
        // } else if (i === 3) {
        //   return {
        //     ...el,
        //     count: count?.tasksinprogressforexecutor,
        //   };
        // } else if (i === 4) {
        //   return {
        //     ...el,
        //     count: count?.specialtaskexecutor,
        //   };
        // } else if (i === 5) {
        //   return {
        //     ...el,
        //     count: count?.completedtaskexecutor,
        //   };
        // }

        // return el;


        switch (i) {
          case 1:
            return {
              ...el,
              count: count?.showalltasktoexecutor,
            };
          case 2:
            return {
              ...el,
              count: count?.respondedtaskforexecutor,
            };
          case 3:
            return {
              ...el,
              count: count?.tasksinprogressforexecutor,
            };
                
          case 4:
            return {
              ...el,
              count: count?.specialtaskexecutor,
            };
          case 5:
            return {
              ...el,
              count: count?.completedtaskexecutor,
            };
                
        
          default:
            return el;
        }
        
      }),
    );
  }, [
    count?.showalltasktoexecutor,
    count?.completedtaskexecutor,
    count?.respondedtaskforexecutor,
    count?.specialtaskexecutor,
    count?.tasksinprogressforexecutor,
  ]);

  const deleteOrder = () => {};

  //taki useEffecty hanvuma araga ashxatum
  useEffect(() => {
    if (submitCategories) {
      setTopFilter(
        topFilter.map((el, i) => {
          if (i === 0) {
            return {
              ...el,
              activ: true,
            };
          }
          return {
            ...el,
            activ: false,
          };
        }),
      );
      setShowFilterBlock(true);
      dispatch(addChangeListToExecutorCategory(submitCategories));
      dispatch(setSubmitCategories(''));
    } else {
      // dispatch(addChangeListToExecutorCategory(submitCategories));
      // dispatch(setSubmitCategories(""));
      // dispatch(getCategories());
    }
  }, [submitCategories]);

  useEffect(() => {
    dispatch(getAllTasks());
    dispatch(taskCountExecutor());
  }, [dispatch]);
  useEffect(() => {
    if (notConfirmedEmployer && tasks && tasks.length === 0) {
      setMessage('Отсутствуют не выбранные заказы');
      setNotConfirmedEmployer(false);
    }
    if (ordersNotSelectedSubmitted && tasks && tasks.length === 0) {
      setMessage('Отсутствуют не выбранные заказы');
      setOrdersNotSelectedSubmitted(false);
    }
    if (rsesponseOrdersSubmitted && tasks && tasks.length === 0) {
      setMessage('Откликнувшихся заказов нету');
      setResponseOrdersSubmitted(false);
    }
    if (workOrdersSubmitted && tasks && tasks.length === 0) {
      setMessage('Нет заказов в работе');
      setWorkOrdersSubmitted(false);
    }
    if (completedOrdersSubmitted && tasks && tasks.length === 0) {
      setMessage('Нет заказов на проверке');
      setCompletedOrdersSubmitted(false);
    }
    if (filterOrdersSubmitted && tasks && tasks.length === 0) {
      setMessage('По вашим запросам ничего не найдено');
      setFilterOrdersSubmitted(false);
    }
    if (personalOrders && tasks && tasks.length === 0) {
      setMessage('Нет персональных заказов');
      setPersonalOrders(false);
    }

    if (tasks && tasks.length !== 0) {
      setMessage('');
    }
    if (tasks && tasks.length === 0) {
      setMessage('Выбирайте категорию');
    }
   
    
  }, [
    tasks,
    ordersNotSelectedSubmitted,
    rsesponseOrdersSubmitted,
    workOrdersSubmitted,
    completedOrdersSubmitted,
    filterOrdersSubmitted,
  ]);
  

  // useEffect(() => {
  //   action();
  // }, []);
  
  return (
    <Box className={classes.root}>
      <Container maxWidth={'lg'}>
        <Grid container spacing={1}>
          <Grid item sm={12} lg={4} sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '30px',
                alignItems: 'space-between',
                '@media(max-width: 580px)': {
                  alignItems: 'space-between',
                },
              }}>
              {/*below is top filter */}
              <Card
                sx={{
                  padding: '25px',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
                  background: '#fff',
                }}>
                <Box
                  sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 500,
                    fontSize: '24px',
                    lineHeight: '28px',
                    color: '#000000',
                    width: '100%',
                    pb: '15px',
                    borderBottom: '1px solid #808080',
                  }}>
                  Պատվերներ
                </Box>
                <Box
                  sx={{
                    mt: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}>
                  {topFilter.map(({ id, name, action, activ, count }) => (
                    <Box
                      key={id}
                      sx={{
                        fontSize: '18px',
                        fontWeight: 400,
                        fontFamily: 'Roboto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        '@media(max-width: 580px)': {
                          justifyContent: 'space-between',
                        },
                        gap: 0.76,
                        lineHeight: '21px',
                        cursor: 'pointer',
                        textDecoration: activ ? 'underline' : 'none',
                        color: activ && tasks?.length ? '#de0309' : '#212121',
                        '& span': {
                          ml: '5px',
                        },
                      }}
                      onClick={() => {
                        action();
                        setTopFilter(
                          topFilter.map((el) => {
                            if (el.id === id) {
                              return {
                                ...el,
                                activ: true,
                              };
                            }
                            return {
                              ...el,
                              activ: false,
                            };
                          }),
                        );
                      }}>
                      {name}
                      {typeof count === 'number' && (
                        <Box
                          sx={{
                            width: '20px',
                            height: '20px',
                            textAlign: 'center',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(222, 3, 9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '& span': {
                              // height: "100%",
                              marginLeft: '0 !important',
                              paddingTop: 0,
                              fontSize: '12px',
                              color: '#fff',
                            },
                          }}>
                          <span>{count < 99 ? count : 99}</span>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Card>
              {/*bellow is secondary filter which opens if condition is true*/}
              {showFilterBlock && (
                <FilterOrders
                  setShowFilterBlock={setShowFilterBlock}
                  setFilterOrdersSubmitted={setFilterOrdersSubmitted}
                  setTopFilter={setTopFilter}
                  topFilter={topFilter}
                  setOrdersNotSelectedSubmitted={setOrdersNotSelectedSubmitted}
                  regionUsers={regionUsers}
                />
              )}
            </Box>
          </Grid>
          <Grid item sm={12} lg={8} xs={12}>
            {Array.isArray(tasks) && tasks && tasks.length !== 0 ? (
              tasks?.map((order, index) => (
                <Card key={index}>
                  <OrderExecutorBlock index={index} deleteOrder={deleteOrder} order={order} />
                </Card>
              ))
            ) : (
              <Box
                sx={{
                  fontFamily: 'Roboto',
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '28px',
                  color: '#837f7f;',
                  display: 'flex',
                  justifyContent: 'center',
                }}>
                {message}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default OrdersPage;
