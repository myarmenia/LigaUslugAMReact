import {
   Avatar,
   Box,
   Container,
   InputAdornment,
   TextField,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
   selectActiveTaskInfo,
   selectConversationTaskList,
   setActiveTaskInfo,
   setMessageCount,
   setSocteMessage,
} from '../../store/reducers/MessagingReducer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
   exactConversation,
   getConversationTaskList,
   sendConversationFile,
   sendMessageThunk,
} from '../../store/actions/MessageActions';

import moment from 'moment';
import { TaskLocation } from '../clientPages/MyOrders/blocks/CustomOrders';
import { SkrepSvg } from '../../assets/svg/chat/SkrepSvg';
import { SendMessageSvg } from '../../assets/svg/chat/SendMessageSvg';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import Echo from 'laravel-echo';
import DoneIcon from '@mui/icons-material/Done';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { instance, options } from '../../store/api/api';
import e from 'cors';
const id = () => Math.random().toString();
const echo = new Echo(options);

export default function NewChatPage() {
   const media600 = useMediaQuery('(min-width:600px)');
   const activeTaskInfo = useSelector(selectActiveTaskInfo);
   const { auth } = useSelector((state) => state.auth);
   const { users } = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.auth.users?.user_id);
   const tasksList = useSelector(selectConversationTaskList);
   const [menuOpen, setMenuOpen] = useState('20px');
   const [mobaileOpen, setMobaileOpen] = useState(true);
   const [open, setOpen] = useState(true);
   const userInfo = useRef();
   const [socetData, setSocetData] = useState(null);
   const [tasksListChat, setTasksListChat] = useState([]);

   useEffect(() => {
      if (!tasksList) {
         dispatch(getConversationTaskList());
      }
   }, [tasksList, dispatch]);
   useEffect(() => {
      if (media600) {
         setMobaileOpen(false);
      }
   }, [media600]);

   useEffect(() => {
      const echo = new Echo(options);
      echo
         .channel(`updateUnreadChatsCount_chanal.${userId}`)
         .listen('.updateUnreadChatsCount', (e) => {
            'message';
            setSocetData(e.message);
         });
   }, [userId]);
   useEffect(() => {
      if (socetData) {
         const data = tasksListChat.map((el, index) => {
            return {
               ...el,
               unread_chat_count: socetData[index].unread_chat_count,
            };
         });
         setTasksListChat(data);
         setSocetData(null);
      }
   }, [socetData, tasksListChat]);

   useEffect(() => {
      if (Array.isArray(tasksList) && tasksList.length !== 0 && !tasksListChat?.length) {
         setTasksListChat(
            tasksList.map((el, i) => {
               if (el.chatroom_name === activeTaskInfo.chatroom_name) {
                  return {
                     ...el,
                     activ: true,
                     id: id(),
                  };
               } else if (i === 0 && !activeTaskInfo.chatroom_name) {
                  const data = {
                     ...el,
                     activ: true,
                     id: id(),
                  };
                  dispatch(setActiveTaskInfo(data));
                  return data;
               }
               return {
                  ...el,
                  activ: false,
                  id: id(),
               };
            }),
         );
      }
   }, [tasksList, tasksListChat, activeTaskInfo, dispatch]);

   useEffect(() => {
      if (!!tasksListChat.length) {
         setMenuOpen('220px');
      }
   }, [tasksListChat]);

   return (
      <Container sx={{ overflowX: 'hidden' }}>
         <Box
            sx={
               auth
                  ? {
                       pt: '100px',
                       height: '78vh',
                       position: 'relative',
                       '@media (min-width: 600px)': {
                          display: 'none',
                       },
                    }
                  : {
                       height: '78vh',
                       position: 'relative',
                       '@media (min-width: 600px)': {
                          display: 'none',
                       },
                    }
            }>
            <Box
               sx={{
                  position: 'absolute',
                  left: '-16px',
                  width: mobaileOpen ? '109%' : '0px',
                  height: '78vh',
                  zIndex: 1,
                  backgroundColor: '#fff',
                  transition: 'all 0.5s',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  '::-webkit-scrollbar': {
                     width: '3px',
                  },

                  /* Track */
                  '::-webkit-scrollbar-track': {
                     background: 'rgb(75 154 45 / 30%)',
                  },

                  /* Handle */
                  '::-webkit-scrollbar-thumb': {
                     background: 'rgb(75 154 45)',
                  },

                  /* Handle on hover */
                  '::-webkit-scrollbar-thumb:hover': {
                     background: 'rgb(75 154 45 / 30%)',
                  },
               }}>
               {mobaileOpen && (
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '15px',
                        mb: 3,
                     }}>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'flex-end',
                           marginRight: '16px',
                           cursor: 'pointer',
                        }}
                        onClick={() => {
                           setMobaileOpen(false);
                        }}>
                        <ArrowForwardIosOutlinedIcon fontSize="small" />
                     </Box>
                     {!!tasksListChat.length &&
                        menuOpen !== '20px' &&
                        tasksListChat.map((el) => (
                           <ChatUsersInformation
                              ref={el?.activ ? userInfo : null}
                              key={id()}
                              data={el}
                              users={users}
                              setChat={setTasksListChat}
                              chat={tasksListChat}
                              setMobaileOpen={setMobaileOpen}
                              mobaileOpen={mobaileOpen}
                           />
                        ))}
                  </Box>
               )}
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 8,
                  alignItems: 'center',
                  pb: '9px',
                  borderBottom: !open && '1px solid #b8aeae',
               }}>
               <Box
                  sx={{
                     cursor: 'pointer',
                     display: 'flex',
                  }}
                  onClick={() => {
                     setMobaileOpen(true);
                  }}>
                  <ArrowForwardIosOutlinedIcon
                     fontSize="small"
                     sx={{
                        transform: 'rotate(180deg)',
                     }}
                  />
               </Box>
               <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                     setOpen(!open);
                  }}>
                  <LiveHelpOutlinedIcon fontSize="small" sx={{ width: '25px', height: '25px' }} />
               </Box>
            </Box>
            <ChatSection open={open} />
         </Box>
         {tasksList && tasksList.length > 0 ? (
            <Box
               sx={
                  auth
                     ? {
                          pt: '100px',
                          height: '76vh',
                          display: 'flex',
                          '@media (max-width: 600px)': {
                             display: 'none',
                          },
                       }
                     : {
                          height: '76vh',
                          '@media (max-width: 600px)': {
                             display: 'none',
                          },
                       }
               }>
               <Box
                  sx={{
                     width: menuOpen,
                     transition: 'all .5s',
                     overflowY: menuOpen !== '20px' ? 'auto' : 'hidden',
                     overflowX: 'hidden',
                     height: '76vh',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '15px',
                     mb: 3,
                     '::-webkit-scrollbar': {
                        width: '3px',
                     },

                     /* Track */
                     '::-webkit-scrollbar-track': {
                        background: 'rgb(75 154 45 / 30%)',
                     },

                     /* Handle */
                     '::-webkit-scrollbar-thumb': {
                        background: 'rgb(75 154 45)',
                     },

                     /* Handle on hover */
                     '::-webkit-scrollbar-thumb:hover': {
                        background: 'rgb(75 154 45 / 30%)',
                     },
                  }}>
                  {tasksListChat?.length == 0 ? setMenuOpen === '20px' : setMenuOpen === '220px'}
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        cursor: 'pointer',
                     }}
                     onClick={() => {
                        if (menuOpen === '20px') {
                           setMenuOpen('220px');
                        } else {
                           setMenuOpen('20px');
                        }
                     }}>
                     <ArrowForwardIosOutlinedIcon
                        fontSize="small"
                        sx={{
                           transform: menuOpen === '20px' ? 'rotate(0deg)' : 'rotate(180deg)',
                        }}
                     />
                  </Box>

                  {!!tasksListChat.length &&
                     menuOpen !== '20px' &&
                     tasksListChat?.map((el, index) => (
                        <ChatUsersInformation
                           ref={el.activ ? userInfo : null}
                           key={el.id}
                           data={el}
                           users={users}
                           setChat={setTasksListChat}
                           chat={tasksListChat}
                           setMobaileOpen={setMobaileOpen}
                           mobaileOpen={mobaileOpen}
                           index={index}
                        />
                     ))}
               </Box>

               <ChatSection
                  open={true}
                  setTasksListChat={setTasksListChat}
                  tasksListChat={tasksListChat}
               />
            </Box>
         ) : (
            <Box
               sx={{
                  height: '350px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}>
               <Typography variant="h5" component="h2">
                  Այս պահին Հաղորդագրություն չկան
               </Typography>
            </Box>
         )}
      </Container>
   );
}

const ChatUsersInformation = React.forwardRef(
   ({ data, users, chat, setChat, setMobaileOpen, mobaileOpen, index }, ref) => {
      const dispatch = useDispatch();
      const activeTaskInfo = useSelector(selectActiveTaskInfo);
      useEffect(() => {
         if (ref?.current) {
            ref.current.scrollIntoView();
            window.scrollTo(0, 0);
         }
      }, [ref]);
      return (
         <Box
            ref={ref}
            sx={{
               mb: chat.length - 1 === index ? 1 : 0,
               display: 'flex',
               gap: '5px',
               ml: '5px',
               position: 'relative',
               borderBottom: '1px solid #b8aeae',
               cursor: 'pointer',
               boxShadow:
                  data?.activ &&
                  '2px 2px 2px rgba(1, 158, 56, 0.77), 3px 3px 3px rgba(1, 185, 66, 0.66), 5px 5px 5px rgba(1, 205, 73, 0.42)',
               '&:hover': {
                  boxShadow:
                     '2px 2px 2px rgba(1, 158, 56, 0.77), 3px 3px 3px rgba(1, 185, 66, 0.66), 5px 5px 5px rgba(1, 205, 73, 0.42)',
               },
            }}
            onClick={() => {
               (async () => {
                  const fetchData = {
                     task_id: data.task_id,
                     user_id: data.user_id,
                     executor_profile_id: data.executor_profile_id,
                  };
                  await dispatch(exactConversation(fetchData)).then((res) => {
                     if (res.meta.requestStatus === 'fulfilled') {
                        if (
                           !Object.keys(echo.connector.channels)[0]?.includes(data?.chatroom_name)
                        ) {
                           echo.leave(`newchattext_chanal.${activeTaskInfo?.chatroom_name}`);
                        }
                        dispatch(setActiveTaskInfo(data));
                        setChat(
                           chat.map((el) => {
                              if (el.id === data.id) {
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
                        if (mobaileOpen) {
                           setMobaileOpen(false);
                        }
                     }
                  });
               })();
            }}>
            <Avatar
               sx={{ width: '40px', height: '40px' }}
               src={`${process.env.REACT_APP_IMG_API}${
                  users?.user_name === data?.executor_name
                     ? data?.user_avatar
                     : data?.executor_profile_avatar
               }`}
            />
            <Box>
               <Typography component="div" variant="body1" sx={{ fontSize: '0.92rem' }}>
                  {data?.tasks?.title}
               </Typography>
               <Typography component="div" variant="body1" sx={{ fontSize: '0.92rem' }}>
                  {users?.user_name === data?.executor_name ? data?.user_name : data?.executor_name}
               </Typography>
            </Box>
            {!!data?.unread_chat_count && (
               <Box
                  sx={{
                     position: 'absolute',
                     right: '15px',
                     top: '50%',
                     transform: 'translate(-50%, -50%)',
                     color: '#064d95',
                  }}>
                  {data?.unread_chat_count}
               </Box>
            )}
         </Box>
      );
   },
);

const ChatSection = ({ open, setTasksListChat, tasksListChat }) => {
   const activeTaskInfo = useSelector(selectActiveTaskInfo);
   const dispatch = useDispatch();
   const [value, setValue] = useState('');
   const [socetData, setSocetData] = useState(null);
   const userId = useSelector((state) => state.auth.users?.user_id);
   const sendMessage = useCallback(async () => {
      if (activeTaskInfo && value) {
         await dispatch(
            sendMessageThunk({
               user_id: activeTaskInfo.user_id,
               employer_message: activeTaskInfo.user_id === userId ? value : '',
               executor_message: activeTaskInfo.user_id === userId ? '' : value,
               executor_profile_id: activeTaskInfo.executor_profile_id,
               task_id: activeTaskInfo.task_id,
               chatroom_name: activeTaskInfo.chatroom_name,
            }),
         );
         setValue('');
      }
   }, [activeTaskInfo, dispatch, value, userId]);

   useEffect(() => {
      if (activeTaskInfo?.chatroom_name) {
         echo
            .channel(`newchattext_chanal.${activeTaskInfo?.chatroom_name}`)
            .listen('.newchattext', (e) => {
               setSocetData(e.message.chat);
            });
      }
   }, [activeTaskInfo?.chatroom_name]);
   useEffect(() => {
      if (socetData) {
         dispatch(setSocteMessage(socetData));
         setSocetData(null);
      }
   }, [socetData, dispatch]);

   return (
      <Box
         sx={{
            width: '100%',
            height: '76vh',
            display: 'flex',
            flexDirection: 'column',
            flex: 3,
            padding: '0 10px',
            '@media (max-width: 600px)': {
               height: '73vh',
            },
            '::-webkit-scrollbar': {
               width: '3px',
            },

            /* Track */
            '::-webkit-scrollbar-track': {
               background: 'rgb(75 154 45 / 30%)',
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
               background: 'rgb(75 154 45)',
            },

            /* Handle on hover */
            '::-webkit-scrollbar-thumb:hover': {
               background: 'rgb(75 154 45 / 30%)',
            },
         }}>
         {open && (
            <Box sx={{ pt: '10px', borderBottom: '1px solid #b8aeae' }}>
               <Box
                  sx={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap',
                  }}>
                  <Typography
                     variant="h4"
                     sx={{
                        fontWeight: '500',
                        fontSize: '21px',
                     }}>
                     {activeTaskInfo?.tasks?.title}
                  </Typography>
                  {activeTaskInfo?.tasks?.price_from && (
                     <Typography
                        variant="h3"
                        sx={{
                           mb: '5px',
                           fontWeight: 500,
                           fontSize: 21,
                        }}>
                        սկսած {activeTaskInfo?.tasks?.price_from} ֏ -
                        {activeTaskInfo?.tasks.price_to} ֏
                     </Typography>
                  )}
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     gap: '5px',
                     flexWrap: 'wrap',
                  }}>
                  <Box>
                     <Typography variant="body2">Կարգավիճակ</Typography>
                     <Typography variant="body2">{activeTaskInfo?.tasks?.category_name}</Typography>
                     <Typography variant="body2">Ենթակատեգորիա</Typography>
                     <Typography variant="body2">
                        {activeTaskInfo?.tasks?.subcategory_name}
                     </Typography>
                  </Box>
                  <Box>
                     <Typography
                        sx={{
                           textAlign: 'end',
                        }}
                        color={'#808080'}>
                        {moment(activeTaskInfo?.tasks?.task_starttime).format('MMMM Do YYYY')}
                     </Typography>
                     <Box>
                        <TaskLocation order={activeTaskInfo?.tasks} />
                     </Box>
                  </Box>
               </Box>
            </Box>
         )}

         <MessageContent setTasksListChat={setTasksListChat} tasksListChat={tasksListChat} />
         <Box>
            <Box>
               <Box
                  sx={{
                     paddingRight: '20px',
                  }}>
                  <TextField
                     fullWidth
                     disabled={!activeTaskInfo}
                     onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                           sendMessage();
                        }
                     }}
                     sx={{
                        mb: '10px',
                     }}
                     inputProps={{
                        sx: {
                           pl: 1,
                        },
                     }}
                     InputProps={{
                        sx: { borderRadius: '12px' },
                        startAdornment: (
                           <Box sx={{}}>
                              <input
                                 disabled={!activeTaskInfo}
                                 color="primary"
                                 type="file"
                                 id="icon-button-file"
                                 accept=".png, .jpg, .jpeg, .gif, .csv, .txt, .pdf"
                                 onChange={(event) => {
                                    const file = event.target.files[0];
                                    const formData = new FormData();
                                    formData.append('message_file', file);
                                    formData.append('message_file', file);
                                    formData.append('task_id', activeTaskInfo.task_id);
                                    formData.append('chatroom_name', activeTaskInfo.chatroom_name);
                                    formData.append('user_id', activeTaskInfo.user_id);
                                    formData.append(
                                       'executor_profile_id',
                                       activeTaskInfo.executor_profile_id,
                                    );
                                    dispatch(sendConversationFile(formData));
                                 }}
                                 style={{ display: 'none' }}
                              />
                              <label style={{ cursor: 'pointer' }} htmlFor="icon-button-file">
                                 <SkrepSvg />
                              </label>
                           </Box>
                        ),
                        endAdornment: (
                           <InputAdornment
                              position="end"
                              sx={{ cursor: 'pointer' }}
                              onClick={sendMessage}>
                              <SendMessageSvg />
                           </InputAdornment>
                        ),
                     }}
                     onChange={(e) => setValue(e.target.value)}
                     placeholder={'Հաղորդագրություն...'}
                     // InputProps={{className: classes.input}}
                     value={value}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

const MessageContent = ({ setTasksListChat, tasksListChat }) => {
   const { conversation, messageCount } = useSelector((state) => state.messages);
   const activeTaskInfo = useSelector(selectActiveTaskInfo);
   const dispatch = useDispatch();
   const userId = useSelector((state) => state.auth.users?.user_id);

   const chatRef = useRef(null);
   useEffect(() => {
      if (activeTaskInfo) {
         const data = {
            task_id: activeTaskInfo.task_id,
            user_id: activeTaskInfo?.user_id,
            executor_profile_id: activeTaskInfo.executor_profile_id,
         };
         dispatch(exactConversation(data));
      }
   }, [activeTaskInfo, dispatch]);
   const isUser = useMemo(() => {
      return activeTaskInfo ? activeTaskInfo?.user_id === userId : true;
   }, [activeTaskInfo, userId]);
   useEffect(() => {
      (async () => {
         if (
            isUser &&
            Array.isArray(conversation) &&
            conversation.length &&
            conversation[0].chatroom_name === activeTaskInfo?.chatroom_name
         ) {
            const fetchData = await conversation
               .filter((el) => !el.employer_read_at)
               .map((el) => el.id);

            if (fetchData.length) {
               await instance
                  .post('v1/user/readed-chat-id', {
                     chatroom_name: activeTaskInfo?.chatroom_name,
                     ids: fetchData,
                     type: 'employer',
                  })
                  .then((res) => {
                     if (
                        res.data.message === 'success' &&
                        Array.isArray(tasksListChat) &&
                        tasksListChat.length
                     ) {
                        setTasksListChat(
                           tasksListChat.map((el) => {
                              if (el.chatroom_name === activeTaskInfo?.chatroom_name) {
                                 return {
                                    ...el,
                                    unread_chat_count:
                                       el.unread_chat_count - fetchData.length > 0
                                          ? el.unread_chat_count - fetchData.length
                                          : 0,
                                 };
                              }
                              return el;
                           }),
                        );
                        dispatch(
                           setMessageCount(
                              messageCount - fetchData.length > 0
                                 ? messageCount - fetchData.length
                                 : 0,
                           ),
                        );
                     }
                  });
            }
         } else if (
            !isUser &&
            Array.isArray(conversation) &&
            conversation.length &&
            conversation[0].chatroom_name === activeTaskInfo?.chatroom_name
         ) {
            const fetchData = await conversation
               ?.filter((el) => !el.executor_read_at)
               .map((el) => el.id);
            if (fetchData?.length) {
               await instance
                  .post('v1/user/readed-chat-id', {
                     chatroom_name: activeTaskInfo?.chatroom_name,
                     ids: fetchData,
                     type: 'executor',
                  })
                  .then((res) => {
                     if (
                        res.data.message === 'success' &&
                        Array.isArray(tasksListChat) &&
                        tasksListChat.length
                     ) {
                        setTasksListChat(
                           tasksListChat.map((el) => {
                              if (el.chatroom_name === activeTaskInfo?.chatroom_name) {
                                 return {
                                    ...el,
                                    unread_chat_count:
                                       el.unread_chat_count - fetchData.length > 0
                                          ? el.unread_chat_count - fetchData.length
                                          : 0,
                                 };
                              }
                              return el;
                           }),
                        );
                        dispatch(
                           setMessageCount(
                              messageCount - fetchData.length > 0
                                 ? messageCount - fetchData.length
                                 : 0,
                           ),
                        );
                     }
                  });
            }
         }
      })();
   }, [conversation, isUser, activeTaskInfo]);
   return (
      <Box
         sx={{
            // height: "calc(100vh - 300px)",
            pt: 1,
            pb: 1,
            height: '100%',
            position: 'relative',
            overflowY: 'auto',
            '::-webkit-scrollbar': {
               width: '3px',
            },

            /* Track */
            '::-webkit-scrollbar-track': {
               background: 'rgb(75 154 45 / 30%)',
            },

            /* Handle */
            '::-webkit-scrollbar-thumb': {
               background: 'rgb(75 154 45)',
            },

            /* Handle on hover */
            '::-webkit-scrollbar-thumb:hover': {
               background: 'rgb(75 154 45 / 30%)',
            },
         }}>
         {conversation?.length &&
         `${conversation[0]?.user_id}${conversation[0]?.executor_profile_id}${conversation[0]?.task_id}` ===
            `${activeTaskInfo?.user_id}${activeTaskInfo?.executor_profile_id}${activeTaskInfo?.task_id}` ? (
            conversation.map((el, index) => {
               return (
                  <ChatMessage
                     ref={index === conversation.length - 1 ? chatRef : null}
                     key={`${el?.user_id} ${el?.executor_profile_id} ${el?.task_id} ${index}`}
                     isUser={isUser}
                     index={index}
                     el={el}
                  />
               );
            })
         ) : (
            <></>
         )}
      </Box>
   );
};

const ChatMessage = React.forwardRef(({ isUser, index, el }, ref) => {
   useEffect(() => {
      if (ref) {
         ref.current.scrollIntoView();
         window.scrollTo(0, 0);
      }
   }, [ref]);

   return (
      <Box
         ref={ref}
         sx={{
            pl: '32px',
            pr: '32px',
            display: 'flex',
            justifyContent:
               (isUser && (el.employer_message || el.employer_message_file)) ||
               (!isUser && (el.executor_message || el.executor_message_file))
                  ? 'flex-end'
                  : 'flex-start',
         }}>
         <Box sx={{ maxWidth: '80%' }}>
            <Box
               sx={{
                  p: '10px 20px',
                  background:
                     (isUser && (el.employer_message || el.employer_message_file)) ||
                     (!isUser && (el.executor_message || el.executor_message_file))
                        ? '#A2CE9B'
                        : '#FF974D',
                  borderRadius: '10px',
                  color: 'black',
                  overflowWrap: 'break-word',
                  position: 'relative',
               }}>
               {(!!el?.employer_message && el?.employer_message !== ' ' && el?.employer_message) ||
                  (!!el?.executor_message &&
                     el?.executor_message !== ' ' &&
                     el?.executor_message) ||
                  (!!el?.employer_message &&
                     el?.employer_message === ' ' &&
                     el.employer_message_file && <FileChat message={el.employer_message_file} />) ||
                  (!!el?.executor_message &&
                     el?.executor_message === ' ' &&
                     el.executor_message_file && <FileChat message={el.executor_message_file} />)}
               <Box
                  sx={{
                     position: 'absolute',
                     bottom: '-5px',
                     right: 3,
                  }}>
                  {!!el?.employer_read_at && !!el.executor_read_at ? (
                     <DoneAllIcon
                        fontSize="small"
                        sx={{
                           width: '14px',
                        }}
                     />
                  ) : (
                     <DoneIcon
                        fontSize="small"
                        sx={{
                           width: '14px',
                        }}
                     />
                  )}
               </Box>
            </Box>

            <Box sx={{ fontSize: '12px' }}>{moment(el.created_at).fromNow()}</Box>
         </Box>
      </Box>
   );
});

function FileChat({ message }) {
   return (
      <Box
         onClick={() => {
            window.open(`https://backend.ligauslug.ru/admin/img/chatfiles/${message}`, '_blank');
         }}
         sx={{ cursor: 'pointer' }}>
         {/* <img  src={`${process.env.REACT_APP_IMG_API}${message}`} /> */}

         {message}
      </Box>
   );
}
