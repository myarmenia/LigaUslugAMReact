import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetMessage } from '../../../store/reducers/TaskExecutorReducer';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = ({ open, setOpen, message, error, success }) => {
  const status = success ? 'success' : 'error';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (
      (!open && message === 'Вы уже откликнулись на этот заказ.') ||
      (!open && message === 'Заявка принята')
    ) {
      console.log('test');
      navigate(-1);
      dispatch(resetMessage());
    }
  }, [open, message]);

  if (!message) {
    return null;
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={open}
        style={{ top: 95 }}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            success || success === 'Спасибо за доверие, мы свяжемся с вами' ? 'success' : 'error'
          }
          sx={{ width: '100%' }}>
          {error ? (
            'Что то пошло не так'
          ) : message && message?.facebook?.message && message?.instagram?.message ? (
            <>
              <Box sx={{ display: 'block' }}>{message?.facebook?.message}</Box>
              <Box>{message?.instagram?.message}</Box>
            </>
          ) : message && message?.facebook?.message ? (
            message?.facebook?.message
          ) : message && message?.instagram?.message ? (
            message?.instagram?.message
          ) : (
            message
          )}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Toaster;
