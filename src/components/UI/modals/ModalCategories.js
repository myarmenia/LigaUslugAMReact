import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import PopupState from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSubmitCategories } from '../../../store/reducers/FilterOrdersReducer';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import ArrowOrange from '../../../assets/image/ArrowOrange.svg';
import Frame from '../../../assets/svg/Frame.svg';

export const useStyles = makeStyles({
   parentModalContainer: {
      maxHeight: '600px',
   },
   modalContainer: {
      borderRadius: '20px !important',
      // width: '70vw',
      padding: '40px',
      marginTop: -15,
      columnCount: 4,
      columnGap: '70px',

      // width:"100%",
      '@media (max-width: 1440px)': {
         columnGap: '55px',
      },
      '@media (max-width: 890px)': {
         columnCount: '2',
         columnGap: '70px',
      },
      '@media (max-width: 470px)': {
         columnCount: '1',
      },
   },
   btn: {
      background: '#FFF',
      padding: '15px 30px',
      boxShadow: '0px 4px 7px #3e576c4d',
      borderRadius: '20px',
      color: '#000',
      minHeight: '70px',
      width: '100%',

      // width: 'fill-available',
      // margin: '20px',
      '@media (max-width: 470px)': {
         // width: '250px !important',
         // margin: 0,
         // marginBottom: '20px',
         // height: '100%',
      },
   },
   boxBtn: {
      // textAlign: 'center',
   },
   subTitle: {
      color: '#ffff',
      fontFamily: 'Roboto',
      marginLeft: '1px',
      borderRadius: '0 0 20px 20px',
      fontSize: '28px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
      textAlign: 'center',
      padding: '20px 0',
      position: 'sticky',
      top: '0',
      opacity: '0.7',
      backgroundColor: '#8A74EF',
      '@media (max-width: 1440px)': {
         fontSize: '20px',
      },
   },
   buttonText: {
      fontSize: '21.754px',
      fontWeight: 400,
      color: '#000',
      textAlign: 'left',
      lineHeight: '26.739px',
      minHeight: '54px',
      '@media (max-width: 1440px)': {
         fontSize: '18px',
      },
      '@media (max-width: 1040px)': {
         fontSize: '16px',
      },
   },
   subcategory_text_box: {
      // padding: '20px 20px',
      fontWeight: '500',
      backgroundColor: '#8A74EF',
      borderRadius: '9px',
      fontSize: '20px',
      color: '#FFFFFF',
      marginBottom: '21px',
      // width: '120px',  ///poxel 100%
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '@media (max-width: 1440px)': {
         fontSize: '14px',
      },
   },
   imageLogo: {
      width: '63px',
      '@media (max-width: 1440px)': {
         width: '50px',
      },
      '@media (max-width: 890px)': {
         width: '42px',
      },
   },
});

const ModalCategories = ({ category, setModalCategory, setModalSubCategory, setShowModal }) => {
   const classes = useStyles();
   const { status } = useSelector((state) => state.auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [open, setOpen] = React.useState(false);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const canBeOpen = open && Boolean(anchorEl);
   const id = canBeOpen ? 'transition-popper' : undefined;
   const [openModal, setOpenModal] = React.useState(false);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      setOpen((previousOpen) => !previousOpen);
   };

   const handleRemove = (event) => {
      setAnchorEl(null);
      setOpen(false);
   };
   return (
      <PopupState variant="popper" popupId="demo-popup-popper">
         {(popupState) => (
            <div
               className={classes.boxBtn}
               // onMouseLeave={() => {
               //   if (status !== 'executor') {
               //     handleRemove();
               //   }
               // }}
            >
               <Button
                  sx={{
                     boxShadow: '3',
                     display: 'flex',
                     gap: '47px',
                  }}
                  // style={{backgroundColor:"orange"}}
                  m={5}
                  className={classes.btn}
                  onClick={() => {
                     if (status === 'executor') {
                        dispatch(setSubmitCategories(category.category_name));
                        navigate('orders');
                     } else setOpenModal(true);
                  }}
                  // onMouseEnter={(e) => {  //onclick-ov darnuma
                  //   if (status !== 'executor') {
                  //     handleClick(e);
                  //   }
                  // }}
               >
                  <img src={Frame} alt="Frame" className={classes.imageLogo} />
                  <div style={{ position: 'relative', flex: '1' }}>
                     <p className={classes.buttonText}>
                        {category.category_name.length > 34
                           ? `${category.category_name.slice(0, 35)}...`
                           : category.category_name}
                     </p>
                     <img
                        src={ArrowOrange}
                        alt="ArrowOrange"
                        style={{ position: 'absolute', bottom: '0', right: '0' }}
                     />
                  </div>
               </Button>
               {status !== 'executor' && (
                  <Dialog
                     // style={{maxWidth:"800px"}}
                     open={openModal}
                     // fullWidth={true}
                     maxWidth={false}
                     onClose={() => setOpenModal(false)}
                     aria-labelledby="alert-dialog-title"
                     aria-describedby="alert-dialog-description">
                     <Box className={classes.parentModalContainer}>
                        <Typography className={classes.subTitle}>
                           {category.category_name}
                        </Typography>

                        <Paper className={classes.modalContainer}>
                           {category.subcategories.map((item, i) => (
                              <Box
                                 className={classes.subcategory_text_box}
                                 key={i}
                                 sx={{
                                    p: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                       textDecoration: 'underline',
                                    },
                                 }}
                                 onClick={() => {
                                    setModalCategory(category.category_name);
                                    setModalSubCategory(item.subcategory_name);
                                    setShowModal(true);
                                 }}>
                                 {item.subcategory_name.length > 20
                                    ? `${item.subcategory_name.slice(0, 21)}...`
                                    : item.subcategory_name}
                              </Box>
                           ))}
                        </Paper>
                     </Box>
                     {/* <DialogTitle id="alert-dialog-title" style={{ width: '100%', margin: '0 auto' }}>
                {'ՏՏ ծառայություններ'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Let Google help apps determine location. This means sending anonymous location
                  data to Google, even when no apps are running.
                </DialogContentText>
                <Typography>jhchjdcjdfjh</Typography>
              </DialogContent> */}
                     {/* <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                  Agree
                </Button>
              </DialogActions> */}
                  </Dialog>

                  // <Popper
                  //   id={id}
                  //   open={open}
                  //   anchorEl={anchorEl}
                  //   transition
                  //   placement="bottom"
                  //   disablePortal={false}
                  //   modifiers={[
                  //     {
                  //       name: 'flip',
                  //       enabled: false,
                  //       options: {
                  //         altBoundary: false,
                  //         rootBoundary: 'document',
                  //         padding: 8,
                  //       },
                  //     },
                  //     {
                  //       name: 'preventOverflow',
                  //       enabled: true,
                  //       options: {
                  //         altAxis: false,
                  //         altBoundary: false,
                  //         tether: false,
                  //         rootBoundary: 'viewport',
                  //         padding: 8,
                  //       },
                  //     },
                  //     {
                  //       name: 'arrow',
                  //       enabled: false,
                  //       // options: {
                  //       //   element: arrowRef,
                  //       // },
                  //     },
                  //   ]}>
                  //   {({ TransitionProps }) => (
                  //     <Fade {...TransitionProps} timeout={350}>
                  //       <Paper className={classes.modalContainer}>
                  //         {category.subcategories.map((item, i) => (
                  //           <Typography
                  //             style={{ padding: '4px', fontWeight: '500' }}
                  //             key={i}
                  //             sx={{
                  //               p: 2,
                  //               cursor: 'pointer',
                  //               '&:hover': {
                  //                 textDecoration: 'underline',
                  //               },
                  //             }}
                  //             onClick={() => {
                  //               setModalCategory(category.category_name);
                  //               setModalSubCategory(item.subcategory_name);
                  //               setShowModal(true);
                  //             }}>
                  //             {item.subcategory_name}
                  //           </Typography>
                  //         ))}
                  //       </Paper>
                  //     </Fade>
                  //   )}
                  // </Popper>
               )}
            </div>
         )}
      </PopupState>
   );
};

export default ModalCategories;
