import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useStyles } from '../../../globalStyles/ModalStyles';
import HeaderModal from './blocks/HeaderModal';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveUser } from '../../../store/actions/AuthActions';
import BlueButton from '../CustomButtons/BlueButton';
import { resetProfile } from '../../../store/reducers/ProfileDataReducer';
import { resetTask } from '../../../store/reducers/TaskReducer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 3,
};

const ModalDeleteProfile = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const {
    load,
    users: { user_id },
  } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteProfile = () => {
    dispatch(RemoveUser(user_id));
    dispatch(resetTask());
    dispatch(resetProfile());
  };
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
              <HeaderModal title={'Իսկապե՞ս ուզում եք ջնջել ձեր պրոֆիլը:'} close={handleClose} />
              <Box className={classes.footer}>
                <Box
                  style={{
                    width: '50%',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                  <BlueButton load={load} label="Այո՛" variant={'contained'} action={deleteProfile} />
                  <Button onClick={handleClose} className={classes.exitModal}>
                    Ոչ
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalDeleteProfile;
