import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Echo from 'laravel-echo';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getAllNotifications } from '../../store/actions/NotificationAction';
import { useMediaQuery } from '@mui/material';
import { options } from '../../store/api/api';
import { setNewNatification } from '../../store/reducers/NotificationReducer';
import Toaster from '../UI/toaster/Toaster';
import Notifications from './Notifications';

const NotificationPage = (props) => {
   const dispatch = useDispatch();
   const { notifications } = useSelector((state) => state.notifications);
   const { auth } = useSelector((state) => state.auth);
   const userId = useSelector((state) => state.auth.users.user_id);
   const matches960 = useMediaQuery('(min-width:960px)');
   const [newData, setNewData] = useState(null);
   const [message, setMessage] = useState('');
   const [success, setSuccess] = useState(true);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      dispatch(getAllNotifications());
   }, [dispatch]);

   useEffect(() => {
      const echo = new Echo(options);
      if (auth && userId) {
         echo.channel(`notification_chanal.${userId}`).listen('.notification', (e) => {
            setNewData(e);
         });
      }
      // return echo.leave(`notification_chanal.${userId}`)
   }, [userId, auth]);

   useEffect(() => {
      if (Array.isArray(newData?.message) && newData?.message?.length) {
         dispatch(setNewNatification(newData));
         setNewData(null);
      }
   }, [newData, dispatch]);
  

   return (
      <>
         <Toaster error={false} success={success} message={message} open={open} setOpen={setOpen} />
         <Box
            sx={{
               mt: '78px',
               minHeight: 'calc(100vh - 78px)',
               display: 'flex',
               pb: 2,
               flexWrap: 'wrap',
               justifyContent: 'center',
               background: '#FFF',
               alignItems: 'flex-start',
            }}>
            <Box
               sx={{
                  width: '72%',
                  background: matches960 ? 'white' : 'transparent',
                  boxShadow: matches960 ? '4px 4px 10px 0px #00000026' : 'none',
                  minHeight: '518px',
                  mt: '41px',
                  borderRadius: '20px',
               }}>
               {notifications?.length ? (
                  notifications?.map(
                     (
                        {
                           created_at,
                           id,
                           type,
                           read_at,
                           data: { employer, task_title, employer_name, from_support, task_id },
                        },
                        index,
                     ) => {
                        return (
                           <Notifications
                              setSuccess={setSuccess}
                              setMessage={setMessage}
                              setOpen={setOpen}
                              key={id}
                              created_at={created_at}
                              id={id}
                              type={type}
                              read_at={read_at}
                              employer={employer ? employer : employer_name}
                              task_title={task_title}
                              index={index}
                              notifications={notifications}
                              from_support={from_support}
                              task_id={task_id}
                           />
                        );
                     },
                  )
               ) : (
                  <Typography
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 'inherit',
                        fontSize: 24,
                     }}>
                     Այս պահին ծանուցումներ չկան
                  </Typography>
               )}
            </Box>
         </Box>
      </>
   );
};

export default NotificationPage;
