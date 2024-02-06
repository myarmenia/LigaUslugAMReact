import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import moment from 'moment';
import 'moment/locale/ru';

import { useDispatch } from 'react-redux';
import { resetPartReducer } from '../../../../store/reducers/TaskReducer';
import { useMyOrdersStyles } from '../MyOrders';
import { TaskLocation } from './CustomOrders';
import { useNavigate } from 'react-router-dom';

const NotAppliedOrder = ({ order, starTime, setOpenToaster, finishTime, setShowDetails }) => {
  const navigate = useNavigate();
  const classes = useMyOrdersStyles();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        navigate(`/employer_task/${order.task_id ? order.task_id : order.id}`, {
          state: order,
        });
      }}>
      <Box className={classes.orderSubBlockSpaceBetween}>
        <Box>
          <Typography variant={'h5'}>
            Заказ № {order.id}, Категория: {order.category_name}
          </Typography>
        </Box>

        <Box>
          <Typography variant={'h6'}>
            Дата: {moment(order.created_at).format(`DD MMM (ddd)`)}
          </Typography>
        </Box>
      </Box>
      <CustomDivider />

      <Box
        style={{ marginBottom: '20px' }}
        className={
          order.status !== 'none' ? classes.orderSubBlockSpaceBetween : classes.singleBlock
        }>
        {order.status !== 'none' && (
          <Box className={classes.wrapBox}>
            <Typography variant={'h4'} sx={{ maxWidth: '400px', overflowWrap: 'anywhere', paddingY:"8px" }}>
              {order.title}
            </Typography>
            <Typography style={{ fontSize: '20px' }} color={'#5A7287'}>
              от {order.price_from} руб.
            </Typography>
            {/* <span>{order.task_description}</span> */}
          </Box>
        )}
        <Box className={classes.wrapBox}>
          <Typography className={classes.wrapRight} variant={'h5'}>
          Подкатегория
          </Typography>
          <Typography className={classes.wrapRight} variant={'h6'}>
            {order.subcategory_name}
          </Typography>
          <Typography className={classes.wrapRight} variant={'h5'} style={{ paddingTop: '21px' }}>
            Место встречи
          </Typography>
          <Typography className={classes.wrapRight} variant={'h6'}>
            {order.task_location === 'У клиента' ? (
              <div>
                {order.region}, {order.country_name}
                <span style={{ display: 'block' }}>{order.address}</span>
              </div>
            ) : (
              <span>{order.task_location}</span>
            )}
          </Typography>
          <Typography className={classes.wrapRight} variant={'h5'} style={{ paddingTop: '21px' }}>
            Когда
          </Typography>
          <Typography className={classes.wrapRight} variant={'h6'}>
            <span>
              {starTime} - {finishTime}
            </span>
          </Typography>
        </Box>
      </Box>
      <Box style={{ marginBottom: '20px' }} className={classes.orderSubBlockSpaceBetween2}>
        <Box className={classes.inLineBlock2}>
          <Typography color="#808080" sx={{ overflowWrap: 'anywhere' }} variant={'h6'}>
            {order.task_description}
          </Typography>
        </Box>
      </Box>
      {/* <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Box>
          <Typography
            onClick={() => setShowDetails(order.id)}
            style={{ cursor: "pointer", paddingLeft: "5px" }}
            variant={"h6"}
          >
            Подробнее
          </Typography>
        </Box>
      </Box>
      <Box className={classes.orderSubBlockSpaceBetween}>
        <Box>
          <Typography style={{ color: "#4C9B2D" }}>Нет откликов</Typography>
        </Box>

        <Box>
          <Typography
            onClick={() => remove(order.id)}
            style={{ color: "#E54C51", cursor: "pointer" }}
          >
            Удалить
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};
export default NotAppliedOrder;
