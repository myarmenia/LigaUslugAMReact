import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExecutorsData } from '../../store/actions/ExecutorsDataAction';
import { getHeaderData } from '../../store/actions/HeaderActions';
// import { getHeaderData } from "./store/actions/HeaderActions";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import { useNavigate } from 'react-router';
import { useFindSpecialists } from './css/useSpecialist';
import { useParams, useNavigate } from 'react-router-dom';

const FindSpecialists = () => {
   const classes = useFindSpecialists();
   const [category, setCategory] = useState(null);
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState('');
   const dispatch = useDispatch();
   const { auth } = useSelector((state) => state.auth);
   const { header } = useSelector((state) => state.header);
   const navigate = useNavigate();
   const [itemId, setitemId] = useState('');
   const { id } = useParams();

   //   const { category } = header;
   useEffect(() => {
      dispatch(getHeaderData());
   }, [dispatch]);
   useEffect(() => {
      if (Array.isArray(header.category) && category === null) {
         setCategory(
            header.category.map((el, i) => {
               if (id ? el.id === +id : i === 0) {
                  setitemId(el.id);
                  return {
                     ...el,
                     activ: true,
                     open: false,
                  };
               }
               return {
                  ...el,
                  activ: false,
                  open: false,
               };
            }),
         );
      }
   }, [category, header.category]);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   useEffect(() => {
      if (open) {
         setTimeout(() => {
            setOpen(false);
         }, 3000);
      }
   }, [open]);

   return (
      <Box className={auth ? classes.container : classes.logOutContainer}>
         <>
            <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-description">
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button
                     onClick={handleClose}
                     autoFocus
                     variant="contained"
                     color="success"
                     sx={{
                        textTransform: 'capitalize',
                     }}>
                     փակել
                  </Button>
               </DialogActions>
            </Dialog>
         </>
         <Box className={classes.containerIn900Low}>
            <Container sx={auth ? { paddingLeft: '6px' } : {}} maxWidth="xl">
               <Box className={classes.categorsConatiner}>
                  {Array.isArray(category) &&
                     category.map((el) => (
                        <Box key={el.category_name}>
                           <Box
                              onClick={() => {
                                 setitemId(el.id);
                                 setCategory(
                                    category.map((elem) => {
                                       if (elem.id === el.id) {
                                          return {
                                             ...elem,
                                             open: true,
                                             activ: true,
                                          };
                                       } else {
                                          return {
                                             ...elem,
                                             open: false,
                                             activ: false,
                                          };
                                       }
                                    }),
                                 );
                                 window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                 });
                              }}
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'space-between',
                                 cursor: 'pointer',
                                 gap: '10px',
                                 marginBottom: el.activ ? '13px' : 0,
                              }}>
                              <Typography
                                 variant="h3"
                                 sx={{ fontWeight: el.activ ? 500 : 400 }}
                                 className={classes.categors}>
                                 {el.category_name}
                              </Typography>
                              <Box sx={el.open ? { transform: 'rotate(180deg)' } : {}}>
                                 <KeyboardArrowUpTwoToneIcon />
                              </Box>
                           </Box>
                           {el.open && (
                              <Box
                                 sx={{
                                    width: '100%',
                                    height: '1px',
                                    backgroundColor: '#808080',
                                    mb: '10px',
                                 }}
                              />
                           )}
                           <Box
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 cursor: 'pointer',
                                 gap: '8px',
                              }}>
                              {el?.open &&
                                 el?.subcategories.map((elem) => (
                                    <Typography
                                       key={elem.id}
                                       className={classes.subcategors}
                                       onClick={async () => {
                                          await dispatch(
                                             getExecutorsData({
                                                category: itemId,
                                                subcategory: elem.subcategory_name,
                                             }),
                                          ).then(({ payload }) => {
                                             if (typeof payload.message === 'string') {
                                                setMessage(payload.message);
                                                setOpen(true);
                                             } else {
                                                const urlId = payload.message.first_page_url?.slice(
                                                   payload.message.first_page_url.indexOf('pages'),
                                                );

                                                navigate(
                                                   `/find_specialists/specialists/${itemId}?${urlId}`,
                                                );
                                             }
                                          });
                                       }}
                                       sx={{ mt: '5px' }}
                                       variant="h4">
                                       {elem.subcategory_name}
                                    </Typography>
                                 ))}
                           </Box>
                        </Box>
                     ))}
               </Box>
            </Container>
         </Box>
         <Box className={classes.containerIn900High}>
            <Container sx={auth ? { paddingLeft: '6px' } : {}}>
               <Box
                  sx={{
                     display: 'flex',
                     gap: '10px',
                  }}>
                  <Box className={classes.categorsConatiner}>
                     {Array.isArray(category) &&
                        category.map((el) => (
                           <Typography
                              key={el.category_name}
                              variant="h3"
                              className={classes.categors}
                              sx={{ fontWeight: el.activ ? 500 : 400 }}
                              style={{
                                 color: el.activ ? '#8A74EF' : '#000',
                              }}
                              onClick={() => {
                                 setitemId(el.id);
                                 setCategory(
                                    category.map((elem) => {
                                       if (elem.id === el.id) {
                                          return {
                                             ...elem,
                                             activ: true,
                                             open: true,
                                          };
                                       } else {
                                          return {
                                             ...elem,
                                             activ: false,
                                             open: false,
                                          };
                                       }
                                    }),
                                 );
                                 window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                 });
                              }}>
                              {el.category_name}
                           </Typography>
                        ))}
                  </Box>
                  <Box sx={{ marginLeft: '20px' }}>
                     {Array.isArray(category) &&
                        category
                           ?.filter((el) => el.activ)[0]
                           .subcategories.map((el) => {
                              return (
                                 <Typography
                                    key={el.id}
                                    className={classes.subcategors}
                                    onClick={async () => {
                                       await dispatch(
                                          getExecutorsData({
                                             category: itemId,
                                             subcategory: el.subcategory_name,
                                          }),
                                       ).then(({ payload }) => {
                                          if (typeof payload.message === 'string') {
                                             setMessage(payload.message);
                                             setOpen(true);
                                          } else {
                                             const urlId = payload.message.first_page_url?.slice(
                                                payload.message.first_page_url.indexOf('pages'),
                                             );

                                             navigate(
                                                `/find_specialists/specialists/${itemId}?${urlId}`,
                                             );
                                          }
                                       });
                                    }}
                                    variant="h4">
                                    {el.subcategory_name}
                                 </Typography>
                              );
                           })}
                  </Box>
               </Box>
            </Container>
         </Box>
      </Box>
   );
};

export default FindSpecialists;
