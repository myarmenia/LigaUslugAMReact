import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { useStyles } from '../../../globalStyles/ModalStyles';
import { CloseSvg } from '../../../assets/svg/CloseSvg';
import { useNavigate } from 'react-router-dom';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   //width: 400,
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: '10px',
   p: 3,
};

const ModalNewTask = ({ open, setOpen }) => {
   const handleClose = () => setOpen(false);
   const classes = useStyles();
   const navigate = useNavigate();

   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ border: 'none' }}>
            <Box sx={{ ...style, width: { xs: 270, md: 400 } }}>
               <Box className={classes.root}>
                  <Box>
                     <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={handleClose}>
                           <CloseSvg />
                        </IconButton>
                     </Box>
                     <Box className={classes.footer}>
                        <p style={{ textAlign: 'center', fontSize: '24px' }}>
                           Որպեսզի ձեր առաջադրանքները ուղարկվեն կատարողներին, դուք պետք է գրանցվեք:
                        </p>
                        <Button onClick={() => navigate('registration')}>Գրանցվել</Button>
                        <p
                           onClick={() => navigate('login')}
                           style={{ color: '#49942B', cursor: 'pointer' }}>
                           Դուք ունեք հաշիվ:
                        </p>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalNewTask;
