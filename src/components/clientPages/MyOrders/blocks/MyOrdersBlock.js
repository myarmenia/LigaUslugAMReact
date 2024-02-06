import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCompletedTasks,
  getInProcessTasks,
  getNotAppliedTasks,
  getNotConfirmedExecutor,
  getRespondedTasks,
} from '../../../../store/actions/TaskActions';
import { useEffect } from 'react';

const THUNKS_LIST = [
  getNotAppliedTasks,
  getRespondedTasks,
  getInProcessTasks,
  getCompletedTasks,
  getNotConfirmedExecutor,
];
const arr = [
  { text: 'Անպատասխան պատվերներ' },
  { text: 'Կատարողներ, ովքեր արձագանքեցին' },
  { text: 'Պատվերներն ընթացքի մեջ են' },
  { text: 'Ավարտված պատվերներ' },
  { text: 'Պոտենցիալ պատվերներ' },
];
const MyOrdersBlock = ({ setShowForm, setTitle, activ, setActiv }) => {
  const [btnSelected, setBtnSelected] = useState(1);
  const { tasksList, tasksCount } = useSelector((state) => state.task);
  const dispatch = useDispatch();
  // const [tasklitName, setTasklistName] = useState([
  // 	{text: "Идет поиск исполнителей"},
  // 	{text: "Կատարողներ, ովքեր արձագանքեցին"},
  // 	{text: "Պատվերներն ընթացքի մեջ են"},
  // 	{text: "Ավարտված պատվերներ"},
  // 	{text: "Պոտենցիալ պատվերներ"},
  // ])
  const tasksLists = useMemo(() => {
    return arr.map((el, i) => {
      switch (i) {
        case 0:
          return {
            ...el,
            count: tasksCount.notappliedtask,
          };
        case 1:
          return { ...el, count: tasksCount.respondedtask };
        case 2:
          return { ...el, count: tasksCount.inprocesstask };
        case 3:
          return { ...el, count: tasksCount.completedtask };
        default:
          return {
            ...el,
            count: tasksCount.specialtask,
          };
      }
      // if (i === 0) {
      //   return {
      //     ...el,
      //     count: tasksCount.notappliedtask,
      //   };
      // } else if (i === 1) {
      //   return { ...el, count: tasksCount.respondedtask };
      // } else if (i === 2) {
      //   return { ...el, count: tasksCount.inprocesstask };
      // } else if (i === 3) {
      //   return { ...el, count: tasksCount.completedtask };
      // }
      // return {
      //   ...el,
      //   count: tasksCount.specialtask,
      // };
    });
  }, [
    tasksCount.respondedtask,
    tasksCount.notappliedtask,
    tasksCount.inprocesstask,
    tasksCount.completedtask,
    tasksCount.specialtask,
    arr,
  ]);

  const showOrders = (item, index) => {
    setTitle({
      subTitle: item.text,
      index: index,
    });
    setBtnSelected(index + 1);
    dispatch(THUNKS_LIST[index]());
    setShowForm(false);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Typography variant={'h4'}>Պատվերներ</Typography>
      </Box>
      <CustomDivider />

      {tasksLists.map((item, index) => (
        <Box
          key={index}
          onClick={() => {
            setActiv(true);
            showOrders(item, index);
          }}
          sx={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& span': {
              ml: '5px',
              pt: '3px',
            },
            '@media(max-width: 580px)': {
              justifyContent: 'space-between',
            },
          }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: btnSelected === index + 1 ? '500' : '400',
              // textDecoration: btnSelected === index + 1 && activ ? 'underline' : 'none',
              color: btnSelected === index + 1 && tasksList.length && activ ? '#de0309' : '#212121',
              margin: 0,
              fontSize: '18px !important',
              cursor: 'pointer',
              '@media (max-width: 400px)': {
                whiteSpace: 'normal',
              },
            }}>
            {item?.text}
          </Typography>
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
                paddingTop: '0 !important',
                fontSize: '12px',
                color: '#fff',
              },
            }}>
            <span>{Math.min(99, item?.count || 0)}</span>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MyOrdersBlock;
