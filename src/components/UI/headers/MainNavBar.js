import React, { useEffect, useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Logo from '../../../assets/image/logoSmall.png';
import UserSvg from '../../../assets/svg/header/UserSvg';
import NotificationSvg from '../../../assets/svg/header/NotificationSvj';
import MessageSvg from '../../../assets/svg/header/MessageSvg';
import { useLocation, useNavigate } from 'react-router-dom';
import {
   Divider,
   Drawer,
   List,
   ListItem,
   ListItemText,
   MenuItem,
   useMediaQuery,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, setIsOpenLogoutModal } from '../../../store/reducers/AuthReducer';
import Avatar from '@mui/material/Avatar';

import { makeStyles } from '@material-ui/core';
import { CLIENT_STATUS } from '../../../constants/auth';
import UnreadRound from '../../../assets/svg/navbar';
import { ReactComponent as Logout } from '../../../assets/svg/logout.svg';
import ModalLogOut from '../modals/ModalLogOut';
import { instance } from '../../../store/api/api';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { fetchPagesAllTasks } from '../../searchWorksPage/SearchWorks';
import { useMemo } from 'react';
import ModalPersonalData from '../modals/ModalPersonalData';
import { color } from '@mui/system';
const id = () => Math.random().toString();

const useNavStyles = makeStyles({
   root: {
      '& .MuiAppBar-root': {
         backgroundColor: '#fff',
      },
      '& .MuiButton-contained': {
         backgroundColor: '#FF6B00',
         borderRadius: '12px',
         textTransform: 'none',
         fontSize: '22px',
         color: '#fff',
         fontWeight: 500,
         whiteSpace: 'nowrap',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
      },
      '& .MuiButton-outlined': {
         background: '#449D36',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         fontSize: '22px',
         borderRadius: '38px',
         whiteSpace: 'nowrap',
         overflow: 'hidden',
         textOverflow: 'ellipsis',
         '&:hover': {
            background: '#449D36 !important',
         },
         '@media(max-width: 1440px)': {
            fontSize: '16px',
         },
      },
   },
   menuItemClient: {
      backgroundColor: 'white !important',
      '&:hover': {
         color: 'green',
      },
   },
   menuItemExecutor: {
      backgroundColor: 'white !important',
      '&:hover': {
         color: '#FF6B00',
      },
   },

   button_contained: {
      backgroundColor: '#4B9A2D',
      borderRadius: '10px',
      textTransform: 'none',
      color: '#fff',
      fontWeight: 500,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: '12px',
   },
   button_outlined: {
      background: '#445E77',
      textTransform: 'none',
      color: '#fff',
      fontWeight: 500,
      borderRadius: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: '12px',
      '&:hover': {
         background: '#6585a5 !important',
      },
   },
   '& .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
      backgroundColor: '#f08000 !important',
   },
   img: {
      width: 83,
      height: 81,
   },
   text: {
      color: '#000000',
   },
   btn: {
      '&:hover': {
         background: '#6585a5 !important',
      },
   },
   nav: {
      height: '80vh !important',
      width: '300px !important',
      position: 'absolute !important',
      top: '172 !important',
      left: '0 !important',
   },
   menu: {
      '& .MuiPaper-root': {
         height: '100vh',
         width: '300px',
         position: 'absolute',
         top: '64px !important',
         left: '0 !important',
         borderRadius: ' 0 4px 4px 0',
      },
   },

   // "@keyframes border-pulsate": {
   //     "0%": {borderBottomColor: "rgba(0, 0, 0, 1)"},
   //     "50%": {borderBottomColor: "rgba(0, 0, 0, 0)"},
   //     "100%": {borderBottomColor: "rgba(0, 0, 0, 1)"},
   // },
   //
   // buttonPulse: {
   //     borderBottom: "1px solid black",
   //     animation: "$border-pulsate 2s infinite",
   // },
   pulse: {
      background: 'transparent',
      borderRadius: '50%',
      // height: 2,
      // width: 175,
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      transform: 'scale(1)',
      animation: '$pulse 2s infinite',
   },
   '@keyframes pulse': {
      '0%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
      },
      '75%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 15px rgba(0, 0, 0, 0)',
      },
      '100%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      },
   },

   pulse1: {
      background: 'transparent',
      borderRadius: '50%',
      // height: 40,
      // width: 175,
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      transform: 'scale(1)',
      animation: '$pulse 3s infinite',
   },

   '@keyframes pulse1': {
      '0%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
      },
      '75%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 15px rgba(0, 0, 0, 0)',
      },
      '100%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      },
   },

   pulse2: {
      background: 'transparent',
      borderRadius: '50%',
      // height: 40,
      // width: 175,
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      transform: 'scale(1)',
      animation: '$pulse 4s infinite',
   },

   '@keyframes pulse2': {
      '0%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
      },
      '75%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 15px rgba(0, 0, 0, 0)',
      },
      '100%': {
         transform: 'scale(1)',
         boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      },
   },
});
const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
   justifyContent: 'flex-end',
}));
export const MainNavBar = () => {
   const { status } = useSelector((state) => state.auth);
   const { user } = useSelector((state) => state.profile);
   const profile = useSelector((state) => state.profile.user);
   const dispatch = useDispatch();
   const location = useLocation();
   // const buttonClasses = useStyles();
   const { unReadCount } = useSelector((state) => state.notifications);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const openLogOutModal = useSelector((state) => state.auth.isOpenLogoutModal);
   const [openModal, setOpenModal] = useState(false);
   const [ordersNotSelectedCount, setOrdersNotSelectedCount] = useState(0);
   const { messageCount } = useSelector((state) => state.messages);
   const navigate = useNavigate();
   const classes = useNavStyles();
   const headerRef = useRef(null);
   const [headerHeight, setHeaderHeight] = useState('');

   const otherPages =
      status === 'client'
         ? [
              { title: 'Անձնական էջ', path: 'work_sheet' },
              { title: 'Աջակցություն', path: 'support' },
              { title: 'Վճարման համակարգ', path: '/payment_methods' },
              { title: 'Հարցեր եւ պատասխաններ', path: 'question' }, //
              { title: 'Փաստաթղթեր', path: 'documents_all' }, //
              { title: 'Կայքի մասին', path: '/about_LigaUslug' }, //
              // { title: "Աջակցություն", path: "support" },
           ]
         : [
              { title: 'Անձնական էջ', path: 'work_sheet' },
              { title: 'Աջակցություն', path: 'support' },
              { title: 'Վճարման համակարգ', path: '/payment_methods' },
              { title: 'Հաշվեկշիռ', path: 'balance' },
              { title: 'Հարցեր եւ պատասխաններ', path: 'question' }, //
              { title: 'Փաստաթղթեր', path: 'documents_all' }, //
              { title: 'Կայքի մասին', path: '/about_LigaUslug' }, //
              // { title: "Փաստաթղթեր", path: "support" },
              // { title: "Աջակցություն", path: "support" },
           ];
   const pageDowenIn900 =
      status === 'client'
         ? [
              { title: 'Գտեք մասնագետ', path: 'find_specialists' },
              { title: 'Իմ պատվերները', path: 'my_orders' },
              { title: 'Անձնական էջ', path: 'work_sheet' },
              { title: 'Աջակցություն', path: 'support' },

              { title: 'Վճարման համակարգ', path: '/payment_methods' },
              { title: 'Հարցեր եւ պատասխաններ', path: 'question' }, //
              { title: 'Փաստաթղթեր', path: 'documents_all' }, //
              { title: 'Կայքի մասին', path: '/about_LigaUslug' }, //
              // { title: "Փաստաթղթեր", path: "support" },
              // { title: "Աջակցություն", path: "support" },
           ]
         : [
              // { title: "Հաշվեկշիռ", path: "balance" },//
              { title: 'Բոլոր պատվերները', path: null },
              { title: 'Ընթացիկ պատվերներ', path: 'orders' },
              { title: 'Անձնական էջ', path: 'work_sheet' },
              { title: 'Աջակցություն', path: 'support' },
              { title: 'Վճարման համակարգ', path: '/payment_methods' },
              { title: 'Հաշվեկշիռ', path: 'balance' }, //
              { title: 'Հարցեր եւ պատասխաններ', path: 'question' }, //
              { title: 'Փաստաթղթեր', path: 'documents_all' }, //
              { title: 'Կայքի մասին', path: '/about_LigaUslug' }, //
              // { title: "Փաստաթղթեր", path: "support" },
              // { title: "Աջակցություն", path: "support" },
           ];

   const pages =
      status === 'client'
         ? [
              { title: 'Գտեք մասնագետ', path: 'find_specialists' },
              { title: 'Իմ պատվերները', path: 'my_orders' },
              // { title: "Անձնական էջ", path: "work_sheet" },
              // { title: "Աջակցություն", path: "support" },
           ]
         : [
              // { title: "Հաշվեկշիռ", path: "balance" },//
              { title: 'Բոլոր պատվերները', path: null }, //
              { title: 'Ընթացիկ պատվերներ', path: 'orders' },
              // { title: "Անձնական էջ", path: "work_sheet" },
              // { title: "Աջակցություն", path: "support" },
           ];
   const [anchorElNav, setAnchorElNav] = React.useState(false);
   const [anchorElMenuNav, setAnchorElUserMenuNav] = React.useState(null);

   const [active, setActive] = React.useState('/');
   const photoUrl = user?.img_path || user[0]?.img_path;
   useEffect(() => {
      instance
         .get('v1/user/show-all-tasks-to-executor')
         .then((response) => {
            setOrdersNotSelectedCount(response.data.Tasks.length);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);

   const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
   };

   const handleCloseNavMenu = (path) => {
      navigate(path);
      setAnchorElNav(false);
      setActive(path);
   };
   const media900 = useMediaQuery('(min-width:899px)');
   useEffect(() => {
      if (media900) {
         setAnchorElNav(false);
      }
   }, [media900]);
   const phoneStatus = useMemo(() => {
      if (Array.isArray(profile) && profile[0].phone_status === 'not verified') {
         return profile[0].phone_status;
      } else if (profile?.phone_status === 'not verified') {
         return profile?.phone_status;
      } else {
         return '';
      }
   }, [profile]);
   useEffect(() => {
      if (phoneStatus === 'not verified') {
         setOpenModal(true);
      }
   }, [phoneStatus]);
   const lg = useMediaQuery('(max-width:1440px)');
   const [heightt, setHeightt] = useState(0);

   // const ref = useRef(null);
   //   setHeightt(ref.current.clientHeight);
   // }, [ref.current]);

   return (
      <>
         <div style={{ height: heightt }} aria-busy></div>
         <div className={classes.root}>
            {/* <ModalPersonalData showModal={openModal} setShowModal={setOpenModal} /> */}
            <AppBar
               sx={{
                  boxShadow:
                     '0px 4px 10px rgb(75 154 45 / 25%), 0px 6px 12px rgb(75 154 45 / 30%), 0px 7px 10px rgb(75 154 45 / 40%), 0px 8px 14px rgb(75 154 45 / 45%)',
               }}>
               <ModalLogOut
                  open={!!openLogOutModal}
                  setOpen={(val) => dispatch(setIsOpenLogoutModal(val))}
               />
               <Container maxWidth={lg ? 'lg' : 'xl'} ref={(el) => setHeightt(el?.clientHeight)}>
                  <Toolbar disableGutters>
                     <Box
                        sx={{
                           width: '100%',
                           display: 'flex',
                           justifyContent: 'space-between',
                           padding: '8px 0 4px 0',
                        }}>
                        <Box sx={{ display: 'flex' }}>
                           <Box
                              sx={{ cursor: 'pointer' }}
                              onClick={() => {
                                 navigate('/');
                                 setAnchorElNav(false);
                              }}>
                              <Typography
                                 variant={'h4'}
                                 noWrap
                                 component="div"
                                 sx={{
                                    mr: 2,
                                    fontSize: 18,
                                    display: { xs: 'none', md: 'flex' },
                                    color: '#e20613',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                 }}>
                                 <img src={Logo} className={classes.img} alt="alternative" />
                              </Typography>
                           </Box>

                           {/* 900-ic poqr chapsna */}
                           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                              <IconButton
                                 size="large"
                                 aria-label="account of current user"
                                 aria-controls="menu-appbar"
                                 aria-haspopup="true"
                                 onClick={handleOpenNavMenu}
                                 color="default">
                                 <MenuIcon />
                              </IconButton>
                              <Drawer
                                 sx={{
                                    width: 250,
                                    flexShrink: 0,
                                    '& .MuiDrawer-paper': {
                                       width: 250,
                                       boxSizing: 'border-box',
                                    },
                                 }}
                                 anchor={'left'}
                                 open={Boolean(anchorElNav)}
                                 onClose={() => {
                                    setAnchorElNav(false);
                                 }}>
                                 <DrawerHeader>
                                    <Typography
                                       variant="h6"
                                       noWrap
                                       component="div"
                                       onClick={() => {
                                          if (location.pathname !== '/') {
                                             navigate('/');
                                          }
                                          handleClose();
                                       }}
                                       sx={{
                                          flexGrow: 1,
                                          color: '#e20613',
                                          flexDirection: 'column',
                                          display: { xs: 'flex', md: 'none' },
                                       }}>
                                       <img src={Logo} className={classes.img} alt="alternative" />
                                       Лига услуг
                                    </Typography>
                                    <IconButton
                                       onClick={() => {
                                          setAnchorElNav(false);
                                       }}>
                                       <ChevronLeftIcon />
                                    </IconButton>
                                 </DrawerHeader>
                                 <Divider />
                                 <List>
                                    {pageDowenIn900.map((page, i) => (
                                       <ListItem
                                          key={i}
                                          sx={{
                                             cursor: 'pointer',
                                          }}
                                          onClick={() => {
                                             if (page.path) {
                                                handleCloseNavMenu(page.path);
                                             } else {
                                                fetchPagesAllTasks(dispatch, navigate);
                                                setAnchorElNav(false);
                                             }
                                          }}>
                                          <ListItemText primary={page.title} />
                                       </ListItem>
                                    ))}
                                 </List>
                                 <Divider />
                                 <Box sx={{ ml: 1, mb: 1.5, mt: 1.5 }}>
                                    <Box
                                       onClick={() => {
                                          setAnchorElNav(false);
                                          navigate('chat');
                                       }}
                                       sx={{
                                          width: '100%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          cursor: 'pointer',
                                       }}>
                                       <MessageSvg />
                                       Հաղորդագրություններ
                                       {!!messageCount && (
                                          <Box>
                                             <UnreadRound />
                                          </Box>
                                       )}
                                    </Box>
                                 </Box>
                                 <Box sx={{ ml: 1, mb: 1.5 }}>
                                    <Box
                                       onClick={() => {
                                          setAnchorElNav(false);
                                          navigate('notification');
                                       }}
                                       sx={{
                                          position: 'relative',
                                          width: '100%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          cursor: 'pointer',
                                       }}>
                                       <NotificationSvg />
                                       Ծանուցումներ
                                       {unReadCount ? (
                                          <Box>
                                             <UnreadRound />
                                          </Box>
                                       ) : null}
                                    </Box>
                                 </Box>
                                 <Box sx={{ ml: 1 }}>
                                    <Box
                                       onClick={() => {
                                          setAnchorElNav(false);
                                          dispatch(setIsOpenLogoutModal(true));
                                       }}
                                       sx={{
                                          width: '100%',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          cursor: 'pointer',
                                       }}>
                                       <Logout />
                                       Ելք
                                    </Box>
                                 </Box>
                              </Drawer>
                           </Box>
                        </Box>
                        {/*logoi aj koxmi erku anunnery  u mejtexi masy ,profily */}
                        <Box
                           sx={{
                              display: 'flex',
                              gap: '74px',
                              '@media (max-width: 1440px)': { gap: '26px' },
                           }}>
                           <Box
                              sx={{
                                 flexGrow: 1,
                                 display: { xs: 'none', md: 'flex' },
                                 gap: '41px',
                                 '@media (max-width: 1440px)': { gap: '21px' },
                              }}>
                              {pages.map((page, i) => (
                                 <Button
                                 key={i}
                                 onClick={() => {
                                    if (page.path) {
                                       handleCloseNavMenu(page.path);
                                    } else {
                                       fetchPagesAllTasks(dispatch, navigate);
                                    }
                                    console.log(page.title )
                                 }}
                                 sx={{
                                    my: 2,
                                    color: active === page.path ? '#445e77' : '#000',
                                    display: 'block',
                                    textTransform: 'none',
                                    display: 'flex',
                                    gap: '3px',
                                    alignItems: 'center',
                                    fontSize: '24px',
                                    fontWeight: '400',
                                    '@media (max-width: 1440px)': {
                                       fontSize: '18px',
                                    },
                                 }}>
                                    <span>{page.title}</span>
                                    {page.title === 'Պատվերներ' && (
                                       <Box
                                       sx={{
                                             width: '24px',
                                             height: '24px',
                                             borderRadius: '50%',
                                             fontSize: '12px',
                                             backgroundColor: '#4B9A2D',
                                             color: '#fff',
                                             alignItems: 'center',
                                             display: 'flex',
                                             justifyContent: 'center',
                                             margin: '0 auto',
                                          }}>
                                          {ordersNotSelectedCount > 99
                                             ? '99+'
                                             : ordersNotSelectedCount}
                                       </Box>
                                    )}
                                 </Button>
                              ))}
                           </Box>
                           <Box
                              sx={{
                                 display: { xs: 'none', md: 'flex' },

                                 alignItems: 'center',
                              }}>
                              <Box
                                 className={classes.pulse}
                                 style={{ cursor: 'pointer' }}
                                 onClick={() => {
                                    navigate('work_sheet');
                                 }}>
                                 <Box className={classes.pulse1}>
                                    <Box className={classes.pulse2}>
                                       <IconButton>
                                          {photoUrl ? (
                                             <Avatar
                                                src={`${process.env.REACT_APP_IMG_API}${photoUrl}`}
                                             />
                                          ) : (
                                             <UserSvg />
                                          )}
                                       </IconButton>
                                    </Box>
                                 </Box>
                              </Box>
                              <Box sx={{ display: 'flex', gap: '13px', marginRight: 2 }}>
                                 <Box>
                                    <Typography
                                       sx={{
                                          color: '#000',
                                          ml: 2,
                                          fontSize: '24px',
                                          fontFamily: 'roboto',
                                       }}>
                                       {user?.name ? user?.name : user[0]?.name}
                                    </Typography>
                                    <Box>
                                       <Box
                                          id="positioned-button"
                                          aria-controls={
                                             anchorElMenuNav ? 'positioned-menu' : undefined
                                          }
                                          aria-haspopup="true"
                                          aria-expanded={
                                             Boolean(anchorElMenuNav) ? 'true' : undefined
                                          }
                                          onClick={(e) => {
                                             setAnchorElUserMenuNav(e.currentTarget);
                                          }}
                                          sx={{
                                             cursor: 'pointer',
                                             display: 'flex',
                                             mr: '3px',
                                          }}>
                                          <Typography
                                             variant="h5"
                                             sx={{
                                                color: '#000000',
                                                ml: 2,
                                                fontSize: '20px',
                                                '@media (max-width: 1440px)': { fontSize: '16px' },
                                             }}>
                                             {status === CLIENT_STATUS
                                                ? 'Պատվիրատուի էջ'
                                                : 'Կատարողի էջ'}
                                          </Typography>
                                          <Box
                                             sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                transform: anchorElMenuNav
                                                   ? 'rotate(180deg)'
                                                   : 'rotate(0deg)',
                                                marginLeft: '3px',
                                             }}>
                                             <KeyboardArrowUpIcon
                                                sx={{ color: '#000' }}
                                                fontSize="small"
                                             />
                                          </Box>
                                       </Box>
                                       <Menu
                                          id="positioned-menu"
                                          aria-labelledby="positioned-button"
                                          anchorEl={anchorElMenuNav}
                                          open={Boolean(anchorElMenuNav)}
                                          onClose={() => {
                                             setAnchorElUserMenuNav(null);
                                          }}
                                          // anchorOrigin={{
                                          //   vertical: "top",
                                          //   horizontal: "left",
                                          // }}
                                          // transformOrigin={{
                                          //   vertical: "top",
                                          //   horizontal: "left",
                                          // }}
                                       >
                                          {/*        */}
                                          {otherPages.map((el) => (
                                             <MenuItem
                                                className={
                                                   status === CLIENT_STATUS
                                                      ? classes.menuItemClient
                                                      : classes.menuItemExecutor
                                                }
                                                key={el.title}
                                                onClick={() => {
                                                   navigate(el.path);
                                                   setAnchorElUserMenuNav(null);
                                                }}>
                                                {el.title}
                                             </MenuItem>
                                          ))}
                                       </Menu>
                                    </Box>
                                 </Box>
                              </Box>
                           </Box>
                        </Box>

                        {/* aj masy  */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                           <Box>
                              {/* <Button onClick={changePage} variant={status === "client" ? "outlined" :"contained"}>
                     {status === "client" ? "Кабинет Исполнителя":"Պատվիրատուի  էջ"}
                    </Button> */}
                              <Button
                                 id="basic-button"
                                 aria-controls={open ? 'basic-menu' : undefined}
                                 aria-haspopup="true"
                                 aria-expanded={open ? 'true' : undefined}
                                 onClick={handleClick}
                                 variant={status === 'client' ? 'outlined' : 'contained'}>
                                 {status === 'client' ? 'Պատվիրատու' : 'Կատարող'}
                                 <Box
                                    sx={{
                                       display: 'flex',
                                       transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                                       marginLeft: '3px',
                                    }}>
                                    <KeyboardArrowUpIcon fontSize="small" />
                                 </Box>
                              </Button>
                              <Menu
                                 id="basic-menu"
                                 anchorEl={anchorEl}
                                 open={open}
                                 onClose={handleClose}
                                 MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                 }}>
                                 <MenuItem
                                    onClick={async () => {
                                       handleClose();
                                       if (status === 'client') {
                                          await dispatch(changeStatus('executor'));
                                          navigate('/');
                                       }
                                    }}>
                                    Կատարողի էջ
                                 </MenuItem>
                                 <MenuItem
                                    onClick={async () => {
                                       handleClose();
                                       if (status !== 'client') {
                                          dispatch(changeStatus('client'));
                                          navigate('/');
                                       }
                                    }}>
                                    Պատվիրատուի էջ
                                 </MenuItem>
                              </Menu>
                           </Box>
                           <Box
                              sx={{
                                 flexGrow: 0,
                                 paddingRight: '30px',
                                 display: { xs: 'flex', md: 'none' },
                              }}>
                              <IconButton>
                                 {photoUrl ? (
                                    <Avatar src={`${process.env.REACT_APP_IMG_API}${photoUrl}`} />
                                 ) : (
                                    <UserSvg />
                                 )}
                              </IconButton>
                           </Box>

                           <Box
                              sx={{
                                 flexGrow: 0,
                                 display: { xs: 'none', md: 'flex' },
                                 alignItems: 'center',
                                 position: 'relative',
                              }}>
                              <IconButton
                                 onClick={() => navigate('chat')}
                                 sx={{ position: 'relative' }}>
                                 <MessageSvg />
                                 {!!messageCount && (
                                    <Box
                                       sx={{
                                          position: 'absolute',
                                          top: 0,
                                          right: 10,
                                       }}>
                                       <UnreadRound />
                                    </Box>
                                 )}
                              </IconButton>

                              <IconButton
                                 onClick={() => navigate('notification')}
                                 sx={{ position: 'relative' }}>
                                 <NotificationSvg />
                                 {unReadCount ? (
                                    <Box
                                       sx={{
                                          position: 'absolute',
                                          top: 0,
                                          right: 10,
                                       }}>
                                       <UnreadRound />
                                    </Box>
                                 ) : null}
                              </IconButton>

                              <IconButton
                                 onClick={() => {
                                    dispatch(setIsOpenLogoutModal(true));
                                 }}>
                                 <Logout />
                              </IconButton>
                           </Box>
                        </Box>
                     </Box>
                  </Toolbar>
               </Container>
            </AppBar>
         </div>
      </>
   );
};
