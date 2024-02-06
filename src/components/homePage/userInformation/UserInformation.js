import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import ProgressLine from '../../UI/progressLine/ProgressLine';
import { useDispatch, useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { TaskLocation } from '../../clientPages/MyOrders/blocks/CustomOrders';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import { getUsersInformation } from '../../../store/actions/ProfileDataActions';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

// import {A11y, Autoplay, EffectFade, Lazy, Navigation} from "swiper"
import UserPhotos from './UserPhotos';
import styled from '@emotion/styled';
//material ui theme styled new
import InfoSVG from '../../../assets/svg/Profile/InfoSVG';

const Text = styled(Box)((props) => {
  return {
    margin: 0,
    padding: 0,
    fontFamily: 'Roboto',
    letterSpacing: '0em',
    boxShadow: props.theme.shadows[24],
    backgroundColor: props.backgroundColor ? props.backgroundColor : 'red',
    [props.theme.breakpoints.down(940)]: {
      backgroundColor: props.theme.palette.warning.main,
    },
  };
});
const useStyles = makeStyles((theme, props) => {
  return {
    content: {},
    userSection: {
      justifyContent: 'space-between',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 0 28px 0',
      gap: '10px',
      '@media (max-width: 900px)': {
        justifyContent: 'flex-start',
        gap: 15,
      },
    },
    flexContainer: {
      justifyContent: 'space-between',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 0 28px 0',
      gap: '10px',
    },
    imgContainer: {
      width: '175.97px',
      height: '175.97px',
      borderRadius: '50%',
      marginTop: '2px',
    },
    usersInformation: {
      margin: '17px 0 0 0',
    },
    title: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '23px',
      color: '#808080',
      margin: '0 25px 0 0',
      wordBreak: 'break-all',
      overflowWrap: 'break-word',
      '@media (max-width: 470px)': {
        paddingBottom: '10px',
      },
      '@media (max-width: 940px)': {
        paddingBottom: '10px',
        textAlign: 'start',
      },
    },
    titleText: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '24px',
      color: '#808080',
      mb: '4px',
    },
    text: {
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '23px',
      color: '#000',
      wordBreak: 'break-all',
      overflowWrap: 'break-word',
    },
    flexEnd: {
      width: '100%',
      justifyContent: 'end',
      display: 'flex',
      marginBottom: '15px',
      '@media (max-width: 900px)': {
        justifyContent: 'flex-start',
      },
    },
    portfolioImg: {
      width: '120px !important',
      height: '93px !important',
      objectFit: 'contain !important',
      // transition: "all 0.2s",
      // "&:hover": {
      //   transition: "all 0.2s",
      //   transform: "scale(2)",
      // },
    },
    imgContainers: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '0 0 28px 0',
      gap: '15px',
    },
    grids: {
      '@media (max-width: 940px)': {
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  };
});

export default function UserInformation() {
  const classes = useStyles();
  const location = useLocation();
  const userId = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const userInfo = useSelector((state) => state.profile.usersInformation);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  // 	if (!auth) {
  // 		navigate("/")
  // 	}
  // }, [auth])

  useEffect(() => {
    if (userId) {
      async function feth() {
        await dispatch(getUsersInformation(userId)).then((res) => {
          if (res.meta.requestStatus !== 'fulfilled' || !res.payload) {
            navigate(-1);
          }
        });
      }
      feth();
    }
  }, [userId]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const matches600 = useMediaQuery('(min-width:600px)');
  const media940 = useMediaQuery('(max-width:940px)');

  const countAppreciate = useMemo(() => {
    if (userInfo?.executor_review_count) {
      return +userInfo?.executor_review_count;
    }
    return 0;
  }, [userInfo?.executor_review_count]);

  const countReytingCount = useMemo(() => {
    if (userInfo?.total_reiting) {
      return +userInfo?.total_reiting;
    }
    return 0;
  }, [userInfo?.total_reiting]);

  return (
    <Box
      sx={{
        background: '#CFCFCF',
        pb: '90px',
        pt: '130px',
        '@media (max-width: 1205px)': {
          pt: auth ? '90px' : '2px',
          pb: '0px',
        },
        '@media (max-width: 901px)': {
          pt: auth ? '55px' : '2px',
          pb: '0px',
        },
      }}>
      <Container
        maxWidth="lg"
        sx={{
          background: '#FFFFFF',
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
          borderRadius: '20px',
          padding: '8px',
          paddingTop: '40px',
          '@media (max-width: 1205px)': {
            borderRadius: '0',
          },
        }}>
        {/* <Text backgroundColor={'green'}>aaaaa</Text> */}
        <Box
          sx={{
            margin: '0 25px',
            paddingBottom: '44px',
          }}>
          <Box className={classes.userSection}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '@media (max-width: 465px)': {
                  flexDirection: 'column',
                },
              }}>
              <Avatar
                alt="Remy Sharp"
                className={classes.imgContainer}
                sx={{
                  mr: '21px !important',
                  // paddingTop: "20px",
                  '@media (max-width: 465px)': {
                    paddingBottom: '22px',
                  },
                }}
                src={
                  userInfo?.users?.img_path
                    ? `${process.env.REACT_APP_IMG_API}${userInfo?.users?.img_path}`
                    : ''
                }
              />
              <Box>
                <Box sx={{display:"flex", alignItems:"center", gap:"9px"}}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '28px',
                      mb: '4px',
                      cursor: 'pointer',
                    }}>{`${userInfo?.users?.name} ${userInfo?.users?.last_name}`}</Typography>
                  <InfoSVG size={11} color={'#4B9A2D'} margin={'-5px 0 0 5px'} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Rating //star
                    value={countReytingCount}
                    name={'half-rating-read'}
                    style={{ color: '#FFF066' }}
                    sx={{ mb: '5px' }}
                    readOnly
                  />
                  {!!countAppreciate && (
                    <Typography
                      component={'span'}
                      variant="body2"
                      sx={{
                        transform: 'translatey(-14%)',
                        marginLeft: '3px',
                      }}>
                      ({countAppreciate})
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}>
                  <Typography>Էլ փոստ</Typography>
                  {userInfo?.users?.email_verified_at ? (
                    <CheckIcon fontSize="small" color="success" />
                  ) : (
                    <ClearIcon fontSize="small" color="warning" />
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                  }}>
                  <Typography>Հեռախոսահամար</Typography>
                  {userInfo?.users?.phone_status === 'verified' ? (
                    <CheckIcon fontSize="small" color="success" />
                  ) : (
                    <ClearIcon fontSize="small" color="warning" />
                  )}
                </Box>
              </Box>
            </Box>
            <Box className={classes.usersInformation}>
              <Box className={classes.flexEnd}>
                <ProgressLine
                  persent={userInfo?.profile_persent ? userInfo?.profile_persent : 0}
                  sx={{
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '21px',
                  }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    pb: '5px',
                    '@media (max-width: 470px)': {
                      flexDirection: 'column',
                      paddingBottom: '15px',
                    },
                  }}>
                  <Typography className={classes.title}>Հասցե:</Typography>
                  <Typography
                    className={classes.text}
                    sx={{
                      width: '300px',
                      '@media (max-width: 470px)': {
                        width: '100%',
                      },
                    }}>
                    <TaskLocation order={userInfo} />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    pb: '5px',
                    '@media (max-width: 470px)': {
                      flexDirection: 'column',
                      paddingBottom: '15px',
                    },
                  }}>
                  <Typography className={classes.title}>Մասնագետ.:</Typography>
                  <Typography
                    className={classes.text}
                    sx={{
                      width: '300px',
                      '@media (max-width: 470px)': {
                        width: '100%',
                      },
                    }}>
                    {userInfo?.executor_categories
                      ? userInfo?.executor_categories.map((el, i, arr) => {
                          if (arr.length - 1 === i) {
                            return <span key={el.category_name}>{el.category_name}</span>;
                          }
                          return <span key={el.category_name}>{el.category_name}, </span>;
                        })
                      : null}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    '@media (max-width: 470px)': {
                      flexDirection: 'column',
                      paddingBottom: '15px',
                    },
                  }}>
                  <Typography className={classes.title}>Փորձ:</Typography>
                  <Typography
                    className={classes.text}
                    sx={{
                      width: '300px',
                      '@media (max-width: 470px)': {
                        width: '100%',
                      },
                    }}>
                    {!!userInfo?.executor_profile_work_experiences.length
                      ? userInfo?.executor_profile_work_experiences[
                          userInfo?.executor_profile_work_experiences.length - 1
                        ]?.working_place
                      : 'нет опыта работы'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {!!userInfo?.users?.about_me ? (
            <>
              <Box>
                <Typography className={classes.titleText} sx={{ mb: '21px !important' }}>
                կատարողի մասին
                </Typography>
                <Typography
                  className={classes.text}
                  sx={{ pb: '25px', overflowWrap: 'break-word' }}>
                  {userInfo?.users?.about_me}
                </Typography>
              </Box>
              {/* <Box
                sx={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: '#000',
                  mb: '25px',
                }}
              /> */}
            </>
          ) : null}

          {/* <Box className={classes.flexContainer}> */}
          {!!userInfo?.executor_portfolios.length || !!userInfo?.executor_portfolio_links.length ? (
            <Box>
              {/* {window.innerWidth < 780 ? () : ()} */}
              <Grid
                direction={media940 ? 'column' : 'row'}
                // direction={"column-reverse"}
                container
                spacing={8}
                sx={{
                  '@media (max-width: 580px)': {},
                }}>
                <Grid
                  item
                  xs={8}
                  maxWidth={false}
                  sx={{
                    width: '100%',
                    '@media (max-width: 580px)': {},
                  }}>
                  <Typography className={classes.titleText} sx={{ mb: '31px !important' }}>
                  Պորտֆոլիո
                  </Typography>
                  {!!userInfo?.executor_portfolios.length && (
                    <Box
                      sx={{
                        // flex: 2,
                        width: '80%',
                        '@media (max-width: 600px)': {
                          width: '90%',
                        },
                      }}>
                      <Swiper
                        freeMode={true}
                        grabCursor={true}
                        modules={[FreeMode, Autoplay]}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                        }}
                        loop
                        className="mySwiper"
                        slidesPerView={matches600 ? 4 : 2}
                        spaceBetween={12}>
                        {userInfo?.executor_portfolios?.map((el) => (
                          <SwiperSlide key={el.id}>
                            <UserPhotos
                              data={{
                                imgSrc: el.portfoliopic_base,
                              }}
                              calc={'calc((16/10)*100%/2)'}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Box>
                  )}
                </Grid>

                <Grid
                  item
                  xs={!media940 ? 4 : 8}
                  maxWidth={false}
                  sx={{
                    width: '50%',
                    '@media (max-width: 600px)': {
                      width: '90%',
                    },
                  }}>
                  {!!userInfo?.executor_education_certificates.length ||
                  userInfo?.executor_educations.length ? (
                    <Box>
                      <Typography
                        className={classes.titleText}
                        sx={{
                          mb: '31px !important',
                          textAlign: 'start',

                          '@media (max-width: 940px)': {
                            textAlign: 'start',
                            // paddingRight:"30px",
                          },
                        }}>
                        Վկայականներ
                      </Typography>
                      {!!userInfo?.executor_education_certificates.length && (
                        <Box
                          sx={{
                            width: '100%',
                          }}>
                          <Swiper
                            freeMode={true}
                            grabCursor={true}
                            loop
                            autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                            }}
                            modules={[FreeMode, Autoplay]}
                            className="mySwiper"
                            slidesPerView={2}
                            spaceBetween={12}>
                            {userInfo?.executor_education_certificates.map((el) => (
                              <SwiperSlide key={el.id}>
                                <UserPhotos
                                  data={{
                                    imgSrc: el.certificate_base,
                                  }}
                                  calc={
                                    !media940 ? 'calc((16/11.7)*100%/2)' : 'calc((14/10.5)*100%/2)'
                                  }
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </Box>
                      )}
                    </Box>
                  ) : null}
                </Grid>
              </Grid>

              {!!userInfo?.executor_portfolio_links.length && (
                <Box>
                  {/* <Box
                    sx={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: '#000',
                    }}
                  /> */}

                  <Grid
                    container
                    spacing={8}
                    className={classes.grids}
                    direction={media940 ? 'column' : 'row'}
                    // direction={"column-reverse"}
                  >
                    <Grid
                      item
                      xs={8}
                      sm={6}
                      maxWidth={false}
                      sx={{
                        width: '100%',
                      }}>
                      <Typography className={classes.titleText} sx={{ mb: '12px !important' }}>
                      Հղումներ
                      </Typography>

                      {userInfo?.executor_portfolio_links.map((el) => (
                        <Box
                          key={el.portfolio_link}
                          sx={{
                            fontWeight: '500 !important',
                            mb: '12px',
                            '& a': {
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              // overflowWrap: 'break-word',
                              wordBreak: 'break-all',
                              // '&:hover': {
                              //   color: 'red'
                              // },
                            },
                          }}>
                          <a
                            className={classes.text}
                            href={el.portfolio_link}
                            target="_blank"
                            rel="nofollow">
                            <InsertLinkOutlinedIcon fontSize="small" />
                            {el.portfolio_link.slice(0, 30)}
                          </a>
                        </Box>
                      ))}
                    </Grid>

                    <Grid
                      item
                      xs={4}
                      sm={6}
                      maxWidth={false}
                      sx={{
                        width: '100%',
                      }}>
                      {!!userInfo?.executor_educations.length ? (
                        <Box
                          sx={{
                            mt: '10px',
                            textAlign: 'center',
                            '@media (max-width: 940px)': {
                              textAlign: 'start',
                            },
                          }}>
                          <Typography className={classes.titleText} sx={{ mb: '31px' }}>
                          Կրթություն
                          </Typography>
                          <Typography
                            className={classes.title}
                            sx={{
                              fontWeight: '400 !important',
                              overflowWrap: 'break-word',
                            }}>
                            {userInfo?.executor_educations[0]?.education_type}
                          </Typography>
                          <Typography
                            className={classes.title}
                            sx={{
                              fontWeight: '400 !important',
                              fontSize: '18px',
                              mt: '14px !important',
                              overflowWrap: 'break-word',
                              textAlign: 'center',
                            }}>
                            {userInfo?.executor_educations[0]?.education_place}
                          </Typography>
                        </Box>
                      ) : null}
                    </Grid>
                  </Grid>
                  {/* <Box
                    sx={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: '#000',
                      mb: '25px',
                    }}
                  /> */}
                </Box>
              )}
            </Box>
          ) : null}
          {!!userInfo?.executor_education_certificates.length ||
          userInfo?.executor_educations.length ? (
            <Box>
              {/* <Typography className={classes.titleText} sx={{ mb: '31px !important' }}>
                Сертификаты
              </Typography> */}
              {/* {!!userInfo?.executor_education_certificates.length && (
                <Box className={classes.imgContainers}>
                  {userInfo?.executor_education_certificates.map((el, i) => {
                    return (
                      <Box
                        component="img"
                        key={el.certificate}
                        sx={{
                          height: 233,
                          width: 350,
                        }}
                        srcSet={`${el.certificate_base}`}
                        alt="The house from the offer."
                        // src={`${process.env.REACT_APP_IMG_API}${el.certificate}`}
                        className={classes.portfolioImg}
                      />
                    );
                  })}
                  <Box
                    sx={{
                      width: '100%',
                      height: '1px',
                      backgroundColor: '#000',
                      // mb: "25px",
                    }}
                  />
                </Box>
              )} */}
            </Box>
          ) : null}
          {/* </Box> */}
          {!!userInfo?.reiting.length ? (
            <Box sx={{ mt: '61px' }}>
              <Typography
                className={classes.titleText}
                sx={{
                  pb: '33px',
                }}>
                Հաճախորդների կարծիքներ 
              </Typography>
              {userInfo.reiting
                .filter(
                  (el) => el.employer_review_to_executor && el.employer_star_count_to_executor,
                )
                .map((otherUser, index, arr) => {
                  return (
                    <Box key={otherUser.task_id} sx={{ mb: '18.37px' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          mb: '18px',
                        }}>
                        <Avatar
                          sx={{
                            width: '64px',
                            height: '64px',
                          }}
                          src={
                            otherUser?.users?.img_path
                              ? `${process.env.REACT_APP_IMG_API}${otherUser?.users?.img_path}`
                              : ''
                          }
                        />
                        <Box>
                          {otherUser?.users ? (
                            <Typography
                              sx={{
                                fontWeight: 500,
                                fontSize: '24px',
                                lineHeight: '28px',
                              }}>{`${otherUser?.users?.name} ${otherUser?.users.last_name}`}</Typography>
                          ) : null}
                        </Box>
                      </Box>
                      {otherUser?.employer_review_to_executor ? (
                        <Typography className={classes.text}>
                          {otherUser?.employer_review_to_executor}
                        </Typography>
                      ) : null}
                      {!!otherUser?.employer_star_count_to_executor && (
                        <Box sx={{ mt: '15px' }}>
                          <Typography className={classes.titleText} sx={{ mb: '11px!important' }}>
                          Գնահատական
                          </Typography>
                          <Rating
                            value={otherUser?.employer_star_count_to_executor}
                            precision={
                              otherUser.employer_star_count_to_executor
                                ? Number(otherUser.employer_star_count_to_executor)
                                : 0
                            }
                            name={'half-rating-read'}
                            style={{ color: '#FFF066' }}
                            readOnly
                          />
                        </Box>
                      )}
                      {index !== arr.length - 1 && (
                        <Box
                          sx={{
                            mt: '22px',
                            width: '100%',
                            height: '1px',
                            backgroundColor: '#808080',
                          }}
                        />
                      )}
                    </Box>
                  );
                })}
            </Box>
          ) : null}
        </Box>
      </Container>
    </Box>
  );
}
