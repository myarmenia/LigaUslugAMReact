import { Avatar, Box, Paper, Typography } from '@mui/material';
import moment from 'moment';
import { TaskLocation } from '../clientPages/MyOrders/blocks/CustomOrders';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Work({ data }) {
   const time = moment(data.created_at).fromNow();
   const { auth } = useSelector((state) => state.auth);
   const navigate = useNavigate();

   return (
      <Paper
         elevation={2}
         sx={{
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            // gap: "30px",
            padding: '27px 21px 30px',
         }}>
         <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
               if (auth) {
                  navigate(`/order_about_page/${data?.id}`);
               } else {
                  navigate('/login');
               }
            }}>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                  cursor: 'pointer',
                  flexWrap: 'wrap',
               }}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     gap: '5px',
                  }}>
                  <Avatar
                     src={`${process.env.REACT_APP_IMG_API}${data?.users?.img_path}`}
                     sx={{ width: 30, height: 30 }}
                     // alt='profile Photo'
                  />
                  <Typography
                     sx={{
                        fontWeight: 400,
                        fontSize: 18,
                        color: '#808080',
                     }}
                     variant="body1">
                     {`${data?.users?.name} ${data?.users?.last_name}`}
                  </Typography>
               </Box>
               <Typography
                  sx={{
                     fontWeight: 400,
                     fontSize: 18,
                     color: '#808080',
                  }}
                  variant="body1">
                  {time}
               </Typography>
            </Box>
            <Box
               sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#808080',
                  marginTop: '17px',
                  marginBottom: '20px',
               }}
            />
            <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column',
               }}>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     gap: '10px',
                     flexWrap: 'wrap',
                  }}>
                  <Box>
                     <Typography
                        variant="h3"
                        sx={{
                           mb: '5px',
                           fontWeight: 500,
                           fontSize: 21,
                        }}>
                        {data.title}
                     </Typography>
                     <Typography sx={{ mb: '5px', color: '#808080' }}>Категория</Typography>
                     <Typography
                        sx={{
                           mb: '5px',
                        }}>
                        {data?.category_name}
                     </Typography>
                     <Typography sx={{ mb: '5px', color: '#808080' }}>Подкатегория</Typography>
                     <Typography>{data?.subcategory_name}</Typography>
                     <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                        {data.task_description}
                     </Typography>
                  </Box>
                  <Box>
                     <Typography
                        variant="h3"
                        sx={{
                           mb: '5px',
                           fontWeight: 500,
                           fontSize: 21,
                        }}>
                        от {data?.price_from} руб
                     </Typography>
                     <Typography
                        sx={{
                           mb: '5px',
                           wordBreak: 'break-word',
                        }}>
                        Место выполнения
                     </Typography>
                     <Box sx={{ width: '200px' }}>
                        <Typography variant="body1">
                           <TaskLocation order={data} />
                        </Typography>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Paper>
   );
}
