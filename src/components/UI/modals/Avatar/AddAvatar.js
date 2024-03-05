import React, { useEffect, useRef } from 'react';
import { Avatar, Button } from '@mui/material';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import upload from '../../../../assets/image/upload.png';
// import { HtmlTooltip } from '../../../../globalStyles/ HtmlTooltip';
import Typography from '@mui/material/Typography';
import Upload from '../../../../assets/image/upload1.png';
import Upload2 from '../../../../assets/image/upload2.png';
import { choosesAvatarData } from '../../../../store/actions/ProfileDataActions';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const useAvatarStyles = makeStyles({
   fileInput: {
      backgroundColor: '#C4C4C4 !important',
      width: '64px !important',
      height: '64px !important',

      borderRadius: '50% !important',
      '&:hover': {
         backgroundColor: '#D6D9DC !important',
         boxShadow: 'none',
      },
      '&:active': {
         backgroundColor: '#ADB3B8',
      },
   },
   fileInputAvatar: {
      width: '64px !important',
      height: '64px !important',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50% !important',
      '&:hover': {
         backgroundColor: '#4b9a2d1c',
         boxShadow: 'none',
      },
      '&:active': {
         backgroundColor: '#ADB3B8',
      },
   },
   select: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4px 10px',
      '&:hover': {
         color: '#466582',
         background: '#e6edf5',
      },
      '& .MuiTypography-h6': {
         fontSize: 12,
         '&:hover': {
            fontWeight: 700,
         },
      },
   },
});

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   maxWidth: 400,
   width: '100%',
   bgcolor: 'background.paper',
   borderRadius: '20px',
   boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.15)',
   boxShadow: 24,
   p: 4,
   '@media(max-width: 560px)': {
      maxWidth: 'auto',
      width: '50%',
   },
};

export const AddAvatar = ({ avatarPreview, setAvatarPreview }) => {
   const classes = useAvatarStyles();
   const { user } = useSelector((state) => state.profile);
   const [open, setOpen] = React.useState(false);
   const inputEl = useRef(null);
   const [avatar, setAvatar] = React.useState('');
   const [val, setVal] = React.useState('');
   const dispatch = useDispatch();
   // const handleTooltipClose = () => {
   //   setOpen(false);
   // };
   // useEffect(() => {
   //   if (!val && open) {
   //     setTimeout(() => {
   //       setOpen(false);
   //     }, 15000);
   //   }
   // }, [val, open]);
   const choosesAvatar = async () => {
      let formData = new FormData();
      formData.append('img_path', avatar);
      await dispatch(choosesAvatarData(formData));
      setOpen(false);
      setVal('');
   };

   const mobileSize = useMediaQuery('(min-width:560px)');
   return (
      <>
         <div style={{ paddingRight: '10px' }}>
            {/* <HtmlTooltip
          arrow
          // onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <React.Fragment>
              <label htmlFor="asdfkasfdk">
                <div
                  className={classes.select}
                  onClick={() => {
                    inputEl.current.click();
                  }}>
                  <input
                    name={'photo'}
                    accept="image/*"
                    ref={inputEl}
                    style={{ display: 'none' }}
                    type="file"
                    onChange={(e) => {
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          // setFieldValue("photo", e.target.files[0]);
                          setAvatarPreview(fileReader.result);
                          setAvatar(e.target.files[0]);
                          setVal(fileReader.result);
                        }
                      };
                      if (e.target.files[0]) {
                        fileReader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                  />
                  <img
                    style={{
                      marginRight: 10,
                      height: '40px',
                    }}
                    alt="upload"
                    src={Upload}
                  />
                  <Typography variant={'h6'} color="inherit">
                    Թարմացրեք պրոֆիլի լուսանկարը
                  </Typography>
                </div>
                <Button
                  sx={{ textTransform: 'none' }}
                  onClick={() => {
                    setOpen(!open);
                    setVal('');
                  }}
                  color={'error'}>
                  {' '}
                  փակել
                </Button>
                {val && (
                  <Button onClick={choosesAvatar} sx={{ textTransform: 'none' }} color={'success'}>
                    Պահպանել
                  </Button>
                )}
              </label>
            </React.Fragment>
          }>
          <Button
            onClick={() => setOpen(!open)}
            component="span"
            className={avatarPreview ? classes.fileInputAvatar : classes.fileInput}>
            {avatarPreview ? (
              <Avatar
                alt="Avatar"
                src={
                  val
                    ? val
                    : `${process.env.REACT_APP_IMG_API}${
                        user?.img_path ? user?.img_path : user[0]?.img_path
                      }`
                }
                className={classes.fileInputAvatar}
                style={{ marginRight: 10, width: '60px', height: '60px' }}
              />
            ) : (
              <img alt="Upload" src={upload} style={{ width: 20, height: 20 }} />
            )}
          </Button>
        </HtmlTooltip> */}
            <Button
               onClick={() => setOpen(!open)}
               component="span"
               className={avatarPreview ? classes.fileInputAvatar : classes.fileInput}>
               {avatarPreview ? (
                  <Avatar
                     alt="Avatar"
                     src={
                        val
                           ? val
                           : `${process.env.REACT_APP_IMG_API}${
                                user?.img_path ? user?.img_path : user[0]?.img_path
                             }`
                     }
                     className={classes.fileInputAvatar}
                     style={{ marginRight: 10, width: '60px', height: '60px' }}
                  />
               ) : (
                  <img alt="Upload" src={upload} style={{ width: 20, height: 20 }} />
               )}
            </Button>
            <Modal
               open={open}
               onClose={() => setOpen(false)}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description">
               <Box sx={style}>
                  <Box
                     sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}>
                     <Typography
                        sx={{
                           color: '#000',
                           fontSize: '22px',
                           fontWeight: '500',
                           width: '100%',
                           textAlign: 'center',
                           margin: '0px 0px 34px 0',
                           paddingBottom: '14px',
                           borderBottom: '1px solid black',
                           '@media (max-width: 560px)': {
                              fontSize: '18px',
                           },
                        }}>
                        Թարմացրեք պրոֆիլի լուսանկարը
                     </Typography>

                     <div className={classes.select}>
                        <input
                           name={'photo'}
                           accept="image/*"
                           ref={inputEl}
                           style={{ display: 'none' }}
                           type="file"
                           onChange={(e) => {
                              const fileReader = new FileReader();
                              fileReader.onload = () => {
                                 if (fileReader.readyState === 2) {
                                    // setFieldValue("photo", e.target.files[0]);
                                    setAvatarPreview(fileReader.result);
                                    setAvatar(e.target.files[0]);
                                    setVal(fileReader.result);
                                 }
                              };
                              if (e.target.files[0]) {
                                 fileReader.readAsDataURL(e.target.files[0]);
                              }
                           }}
                        />
                        <img
                           style={{
                              marginRight: 10,
                              height: '97px',
                              width: '97px',
                              marginBottom: '30px',
                              borderRadius: '100%',
                              objectFit: 'cover',
                           }}
                           alt="upload"
                           // src={Upload2}
                           onClick={() => {
                              inputEl.current.click();
                           }}
                           src={val ? val : Upload2}
                        />
                     </div>
                     {!val && (
                        <Button
                           sx={{
                              margin: '0 auto',
                              fontSize: '18px',
                              fontWeight: '500',
                              backgroundColor: '#EA004F',
                              color: '#FFF',
                              padding: '11px 10px',
                              borderRadius: '10px',
                              '&:hover': {
                                 background: '#EA004F',
                              },
                              '@media(max-width: 560px)': {
                                 fontSize: '15px',
                              },
                           }}
                           variant={'h5'}
                           color="inherit"
                           onClick={() => {
                              inputEl.current.click();
                           }}>
                           {mobileSize ? 'Ներբեռնեք համակարգչից' : 'Բեռնել'}
                        </Button>
                     )}
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {val && (
                           <Button
                              sx={{ color: '#5A7287', fontSize: '16px', paddingBottom: '13px' }}
                              onClick={() => {
                                 inputEl.current.click();
                              }}>
                              Ընտրեք մեկ այլ լուսանկար
                           </Button>
                        )}
                        {val && (
                           <Button
                              onClick={choosesAvatar}
                              sx={{
                                 textTransform: 'none',
                                 color: '#FFF',
                                 fontSize: '20px',
                                 backgroundColor: '#EA004F',
                                 borderRadius: '10px',
                                 paddingBottom: '15px',
                                 '&:hover': {
                                    backgroundColor: '#EA004F',
                                 },
                              }}>
                              Պահպանել
                           </Button>
                        )}
                        {val && (
                           <Button
                              sx={{ textTransform: 'none', color: '#5A7287', fontSize: '20px' }}
                              onClick={() => {
                                 setOpen(!open);
                                 setVal('');
                              }}>
                              {' '}
                              փակել
                           </Button>
                        )}
                     </Box>
                  </Box>
               </Box>
            </Modal>
         </div>
      </>
   );
};
