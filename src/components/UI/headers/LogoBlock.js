import React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { LocationSvg } from '../../../assets/svg/header/LocationSvg';
import Container from '@mui/material/Container';
import { useStyles } from '../../../globalStyles/HomePageStyles';
import ModalSupport from '../modals/ModalSupport';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from '../../../assets/image/logoSmall.png';
import telegramBlack from '../../../assets/image/telegramBlack.svg';
import { useDispatch } from 'react-redux';
import { fetchPagesAllTasks } from '../../searchWorksPage/SearchWorks';
import { useMediaQuery } from '@mui/material';

const pages = (setIsQuestion, setIsOpen, dispatch, navigate) => [
  { name: 'Գլխավոր էջ', path: '/' },
  {
    name: 'Գտնել մասնագետ',
    path: 'find_specialists',
  },
  {
    name: 'Պատվերներ',
    onClick: () => {
      fetchPagesAllTasks(dispatch, navigate);
    },
  },
  // {
  //   name: "Փաստաթղթեր",
  //   path: "/",
  // },
  {
    name: 'Վճարման համակարգ',
    path: '/payment_methods',
  },
  // {
  //   name: "Тех. поддержка",
  //   path: "/",
  // },
  {
    name: 'Ֆորում Telegram-ում',
    link: 'https://t.me/ligaforum',
    type: 'link',
  },
  {
    name: 'Պատվիրել հետզանգ',
    onClick: () => {
      setIsOpen(true);
      setIsQuestion(false);
    },
  },
  {
    name: 'ՈՒղղել հարցեր',
    onClick: () => {
      setIsOpen(true);
      setIsQuestion(true);
    },
  },
  {
    name: 'Հարցեր եւ պատասխաններ',
    path: '/question',
  },
  {
    name: 'Փաստաթղթեր',
    path: '/documents_all',
  },
  {
    name: 'Կայքի մասին',
    path: '/about_LigaUslug',
  },

  // {
  //   name: "Методы платежей",
  //   path: "find_specialists",
  // },
  // {
  //   name: "Փաստաթղթեր",
  //   path: "find_specialists",
  // },
  // {
  //   name: "Պատվիրել հետզանգ",
  //   onClick: () => {
  //     setIsOpen(true);
  //     setIsQuestion(false);
  //   },
  // },
  // {
  //   name: "ՈՒղղել հարցեր",
  //   onClick: () => {
  //     setIsOpen(true);
  //     setIsQuestion(true);
  //   },
  // },
  {
    name: 'Մուտք',
    path: 'login',
  },
  {
    name: 'Գրանցվել',
    path: 'registration',
  },
];
const menu = (setIsQuestion, setIsOpenSupportModal, navigate) => [
  {
    title: 'Վճարման համակարգ',
    action: () => {
      navigate('/payment_methods');
    },
  },
  {
    title: 'Պատվիրել հետզանգ',
    action: () => {
      setIsQuestion(false);
      setIsOpenSupportModal(true);
    },
  },
  {
    title: 'ՈՒղղել հարցեր',
    action: () => {
      setIsQuestion(true);
      setIsOpenSupportModal(true);
    },
  },
  {
    title: 'Հարցեր եւ պատասխաններ',
    action: () => {
      navigate('/question');
    },
  },
  {
    title: 'Փաստաթղթեր',
    action: () => {
      navigate('/documents_all');
    },
  },
  {
    title: 'Կայքի մասին',
    action: () => {
      navigate('/about_LigaUslug');
    },
  },
];

const HelpCenter = {
  fontSize: '18px',
  '@media (max-width: 997px)': {
    fontSize: '16px',
  },
  '@media(min-width: 1440px)': {
    fontSize: '24px',
  },
};

const LogoBlock = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isQuestion, setIsQuestion] = useState(false);
  const [isOpenSupportModal, setIsOpenSupportModal] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const lg = useMediaQuery('(max-width:1440px)');
  // sx={{boxShadow: "0 3px 2px -2px"}}
  return (
    // xl er grac stex
    <Container maxWidth={lg ? 'lg' : 'xl'}>
      <ModalSupport
        showModal={isOpenSupportModal}
        setShowModal={setIsOpenSupportModal}
        {...{ isQuestion }}
      />
      <AppBar style={{ margin: 0 }} elevation={0} color={'transparent'} position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }} disableGutters>
          {/* page 900  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages(setIsQuestion, setIsOpenSupportModal, dispatch, navigate).map((page, i) => {
                if (page.type === 'link') {
                  return (
                    <MenuItem key={i}>
                      <Typography
                        textAlign="center"
                        onClick={() => {
                          handleCloseNavMenu();
                        }}
                        sx={{
                          '& a': {
                            textDecoration: 'none',
                            color: '#151616',
                          },
                        }}>
                        <a href="https://t.me/ligaforum" target="_blank">
                          {page.name}
                        </a>
                      </Typography>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem
                      key={i}
                      onClick={() => {
                        if (page.path) {
                          handleCloseNavMenu();
                          navigate(page.path);
                        } else {
                          handleCloseNavMenu();
                          page.onClick();
                        }
                      }}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Box>
          {/* end page 900  */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, margin: '0 auto' }}>
            {/* leftd header side */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                gap: '33px',
                '@media(min-width: 1440px)': {
                  gap: '48px',
                },
                // justifyContent: "space-around",
                // gap: "5px",
              }}>
              <Box sx={{ display: 'flex', width: '80px' }}>
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                  }}>
                  {/* <Typography
                    variant={"h4"}
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      fontSize: 18,
                      display: { xs: "none", md: "flex" },
                      color: "#e20613",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  > */}
                  <img
                    src={Logo}
                    className={classes.img}
                    style={{ paddingTop: '10px' }}
                    alt="alternative"
                  />
                  {/* </Typography> */}
                </Box>
              </Box>

              <Typography className={classes.item} noWrap={true}>
                <IconButton>
                  <LocationSvg />
                </IconButton>
                Երևան
              </Typography>
              <Typography
                className={classes.item}
                style={{ cursor: 'pointer' }}
                noWrap={true}
                onClick={() => {
                  navigate('/find_specialists');
                }}>
                Գտնել մասնագետ
              </Typography>
              <Typography
                className={classes.item}
                style={{ cursor: 'pointer' }}
                noWrap={true}
                onClick={() => {
                  fetchPagesAllTasks(dispatch, navigate);
                }}>
                Պատվերներ
              </Typography>
              <Box>
                <Box>
                  <Box
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    variant={'outlined'}
                    sx={{ display: 'flex', gap: '3px', ...HelpCenter }}>
                    Օգնության կենտրոն
                    <Box
                      sx={{
                        display: 'flex',
                        transform: anchorEl ? 'rotate(180deg)' : 'rotate(0deg)',
                        marginLeft: '3px',
                        alignItems: 'center',
                      }}>
                      <KeyboardArrowUpIcon sx={{ color: '#000' }} fontSize="small" />
                    </Box>
                  </Box>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}>
                    {menu(setIsQuestion, setIsOpenSupportModal, navigate).map((el) => (
                      <MenuItem
                        key={el.title}
                        onClick={() => {
                          handleClose();
                          el.action();
                        }}>
                        {el.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Box>
              {/* <Typography
                  className={classes.item}
                  style={{ cursor: "pointer" }}
                  noWrap={true}
                  margin={2}
                  onClick={() => {}}
                >
                  Պատվերներ
                </Typography>
              </Box> */}
              {/* <Box>
                <Typography
                  className={classes.item}
                  style={{ cursor: "pointer" }}
                  noWrap={true}
                  margin={2}
                  onClick={() => {}}
                >
                  Методы платежей
                </Typography>
                <Typography
                  className={classes.item}
                  style={{ cursor: "pointer" }}
                  noWrap={true}
                  margin={2}
                  onClick={() => {}}
                >
                  Փաստաթղթեր
                </Typography>
              </Box> */}
              {/* <Box> */}
              {/* <Typography
                className={classes.item}
                sx={{ cursor: "pointer" }}
                noWrap={true}
                margin={2}
                onClick={() => {
                  setIsQuestion(false);
                  setIsOpenSupportModal(true);
                }}
              >
                Պատվիրել հետզանգ
              </Typography>
              <Typography
                className={classes.item}
                noWrap={true}
                margin={2}
                onClick={() => {
                  setIsQuestion(true);
                  setIsOpenSupportModal(true);
                }}
              >
                ՈՒղղել հարցեր
              </Typography> */}
              {/* </Box> */}
            </Box>

            {/* right header side */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: '10px',
                paddingLeft: '27px',
                '@media(min-width: 1440px)': {
                  gap: '20px',
                  paddingLeft: '45px',
                },
              }}>
              {/* <IconButton>
                <LocationSvg />
              </IconButton>
              <Typography className={classes.item} noWrap={true}>
                Երևան
              </Typography> */}
              <a href="https://t.me/ligaforum" target="_blank">
                <img src={telegramBlack} alt="alternative" />
              </a>
              <Typography
                className={classes.item}
                style={{
                  padding: '10px',
                  backgroundColor: '#449D36',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                }}
                onClick={() => navigate('/registration')}
                noWrap={true}>
                Գրանցվել
              </Typography>
              <Typography className={classes.item} onClick={() => navigate('/login')} noWrap={true}>
                Մուտք
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
export default LogoBlock;

{
  /* <Box
sx={{
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "5px",
}}
>
<Box>
  <Typography
    className={classes.item}
    style={{ cursor: "pointer" }}
    noWrap={true}
    margin={2}
    onClick={() => {}}
  >
    Գտնել մասնագետ
  </Typography>
  <Typography
    className={classes.item}
    style={{ cursor: "pointer" }}
    noWrap={true}
    margin={2}
    onClick={() => {}}
  >
    Պատվերներ
  </Typography>
</Box>
<Box>
  <Typography
    className={classes.item}
    style={{ cursor: "pointer" }}
    noWrap={true}
    margin={2}
    onClick={() => {}}
  >
    Методы платежей
  </Typography>
  <Typography
    className={classes.item}
    style={{ cursor: "pointer" }}
    noWrap={true}
    margin={2}
    onClick={() => {}}
  >
    Փաստաթղթեր
  </Typography>
</Box>
<Box>
  <Typography
    className={classes.item}
    style={{ cursor: "pointer" }}
    noWrap={true}
    margin={2}
    onClick={() => {
      setIsQuestion(false);
      setIsOpenSupportModal(true);
    }}
  >
    Պատվիրել հետզանգ
  </Typography>
  <Typography
    className={classes.item}
    noWrap={true}
    margin={2}
    onClick={() => {
      setIsQuestion(true);
      setIsOpenSupportModal(true);
    }}
  >
    ՈՒղղել հարցեր
  </Typography>
</Box>
</Box>
<Box
sx={{
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "5px",
}}
>
<IconButton>
  <LocationSvg />
</IconButton>
<Typography className={classes.item} noWrap={true} margin={2}>
  Երևան
</Typography>
<Typography
  className={classes.item}
  onClick={() => navigate("/login")}
  noWrap={true}
  margin={2}
>
  Մուտք
</Typography>
<Typography
  className={classes.item}
  onClick={() => navigate("/registration")}
  noWrap={true}
  margin={2}
>
  Գրանցվել
</Typography>
</Box>
</Box> */
}
