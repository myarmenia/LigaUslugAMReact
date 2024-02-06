import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LargeLogo from '../../../../assets/image/LogoLarge.png';
import { GreenArrowSvg } from '../../../../assets/svg/intro/GreenArrowSvg';
import { GoToChatSvg } from '../../../../assets/svg/intro/GoToChatSvg';
import ModalNewTask from '../../../UI/modals/ModalNewTask';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import Toaster from '../../../UI/toaster/Toaster';
import GoToTelegramFourm from '../../../../assets/svg/intro/GoToTelegramFourm';

export const useStyles = makeStyles({
  title: {
    color: '#000',
    textShadow: '0px 0px 7.523620128631592px rgba(255, 255, 255, 0.25)',
    fontFamily: 'Roboto',
    fontSize: '42px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '62.822px',
    width: '72vw',
    '@media (max-width: 821px)': {
      fontSize: '19px',
      lineHeight: '32.822px',
    },
  },
  btn: {
    padding: '8px 34px',
    borderRadius: '12px',
    fontSize: '24px',
    display: 'block',
    fontWeight: 700,
    backgroundColor: '#449D36',
    color: '#FFFFFF',
    '@media (max-width: 821px)': {
      fontSize: '14px',
      padding: '7px 30px',
    },
  },
  btn2: {
    fontSize: '24px',
    color: '#FF6B00',
    fontWeight: 500,
    backgroundColor: 'transparent',
    borderRadius: '12px',
    padding: '8px 34px',
    border: '1.8px solid #FF6B00',
    '@media (max-width: 821px)': {
      fontSize: '14px',
      padding: '7px 30px',
    },
    '&:hover': {
      backgroundColor: '#FF6B00',
      color: '#ffffff',
    }
  },
  chat: {
    position: 'absolute',
    bottom: -60,
    right: '0',
    cursor: 'pointer',
  },
  img: {
    width: '100%',
    height: '100%',
  },

  pulse: {
    background: 'transparent',
    borderRadius: '50%',
    height: 30,
    width: 30,
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
    height: 30,
    width: 30,
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
    height: 30,
    width: 30,
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
  gridDiv: {
    paddingLeft: '65px !important',
    marginTop: '-20px',
    '@media (max-width: 1050px)': {
      paddingLeft: '20px !important',
    },
    '@media (max-width: 821px)': {
      paddingLeft: '15px !important',
    },
    '@media(min-width: 1440px)': {
      paddingLeft: '65px !important',
    },
  },
  authText: {
    '@media (max-width: 821px)': {
      fontSize: '13px',
    },
  },
});

const Intro = ({
  categoriesRef,
  showModal,
  setShowModal,
  setModalSubCategory,
  setModalCategory,
  modalCategory,
  modalSubCategory,
  handleScroll,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useSelector((state) => state.auth);
  const { error, successWork, message } = useSelector((state) => state.task);
  const [openToaster, setOpenToaster] = useState(false);
  // const [isOpenText, setIsOpenText] = useState(false);
  useEffect(() => {
    if (!showModal) {
      setModalSubCategory('');
      setModalCategory('');
    }
  }, [showModal]);
  // const goToChat = () => {
  //   if (auth) {
  //     navigate('/chat');
  //   } else {
  //     navigate('/login');
  //   }
  // };

  useEffect(() => {
    if (!auth && showModal) {
      navigate('/login');
    }
  }, [auth, showModal, navigate]);

  return (
    <Grid
      sx={{
        // padding: '20px 0 80px 0',
        // backgroundColor: 'orange',
        marginTop: '0',
      }}
      container
      spacing={2}>
      <Toaster
        error={error}
        success={successWork}
        message={message}
        open={openToaster}
        setOpen={setOpenToaster}
      />
      {showModal && (
        <ModalNewTask
          {...{
            showModal,
            setShowModal,
            setOpenToaster,
            modalCategory,
            modalSubCategory,
          }}
        />
      )}
      <Grid item xs={12} md={6} className={classes.gridDiv}>
        {/* <Typography mb={'10px'} color={'#ff0000'}>
          Вы находитесь на тестовой версии.
        </Typography> */}
        <Box mb={'20px'} className={classes.title} color={'#445E77'}>
          <span>ՁԵՐ ՔԱՂԱՔԻ ԲՈԼՈՐ</span>{' '}
          <p style={{ margin: 0 }}>
          ՄԱՍՆԱԳԵՏՆԵՐԸ <span style={{ color: '#FF6B00' }}>ՄԵԿ ՎԱՅՐՈՒՄ</span>
          </p>
        </Box>
        <Typography
          mb={'10px'}
          color={'#000'}
          style={{ paddingBottom: '15px', width: '356px' }}
          sx={{
            '@media(max-width: 821px)': {
              fontSize: '13px',
            },
          }}>
          Մանրամասն նկարագրեք խնդիրը կամ առաջադրանքը, և մենք ձեզ համար կընտրենք կատարող, կամ
        </Typography>
        <Box
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            gap: '14px',
            width: 'max-content',
            marginBottom: '20px',
          }}>
          <Button
            onClick={() => setShowModal(true)}
            className={classes.btn}
            size={'large'}
            variant="contained"
            color="success"
            sx={{
              textTransform: 'inherit',
            }}>
            Թողնել առաջադրանքը
          </Button>
          <Button
            onClick={() => navigate("/find_specialists")}
            className={classes.btn2}
            size={'small'}
            variant="contained"
            sx={{
              textTransform: 'inherit',
            }}>
            Գտնել առաջադրանքը
          </Button>
        </Box>
        {/* <Typography
          mb={'20px'}
          sx={{ color: 'grey', cursor: 'pointer' }}
          onClick={() => {
            handleScroll(categoriesRef.current);
          }}>
          Выберите услугу из списка
        </Typography> */}
        {!auth && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              paddingTop: '15px',
            }}
            onClick={() => navigate('login')}>
            <Box className={classes.pulse} style={{ cursor: 'pointer' }}>
              <Box className={classes.pulse1}>
                <Box className={classes.pulse2}>
                  <GreenArrowSvg />
                </Box>
              </Box>
            </Box>
            <Typography
              className={classes.authText}
              onClick={() => navigate('login')}
              style={{ color: 'grey', paddingLeft: 20, cursor: 'pointer' }}>
              Դարձեք կատարող և սկսեք վաստակել գումար
            </Typography>
          </Box>
        )}
      </Grid>
      {/* <Grid style={{position: "relative"}} item xs={12} md={6}>
				<Box
					sx={{
						backgroundImage: `url(${LargeLogo})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "contain",
						backgroundPosition: "center",
						width: "100%",
						paddingTop: "calc((4/2)*73%/2)",
					}}
				/> */}
      {/* <img
					title='Быстрый Поиск Специалистов'
					src={LargeLogo}
					alt='Биржа Поиска Работ'
					className={classes.img}
				/> */}
      {/* </Grid> */}
    </Grid>
  );
};

export default Intro;
