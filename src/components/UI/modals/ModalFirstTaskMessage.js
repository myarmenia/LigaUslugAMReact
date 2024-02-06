import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Dialog, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { BUTTON_STYLE } from './ModalPersonalData';
import { CloseSvg } from '../../../assets/svg/CloseSvg';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../../store/actions/MessageActions';
import { useNavigate } from 'react-router-dom';
import { setTasksList } from '../../../store/reducers/MessagingReducer';

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     borderRadius: '10px',
//     p: 3,
// };

const ModalFirstTaskMessage = ({ open, setOpen, info }) => {
  const { user_id } = useSelector((state) => state.auth.users);
  const navigate = useNavigate();

  const { register, watch } = useForm();
  const dispatch = useDispatch();
  if (!open) {
    return null;
  }
  return (
    <Dialog
      maxWidth={false}
      open={true}
      onClose={() => setOpen(false)}
      sx={{
        '.MuiDialog-paper': {
          borderRadius: '24px',
          boxShadow: '4px 4px 10px 0px #00000026',
        },
      }}>
      <Box
        sx={{
          width: {
            sx: '400px',
            lg: '800px',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          padding: '24px',
          justifyContent: 'center',
        }}>
        <Box
          sx={{
            pt: '10px',
            display: 'flex',
            pb: '10px',
            justifyContent: 'center',
          }}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>Գրեք կատարողին</Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false);
            }}>
            <CloseSvg size={15} />
          </IconButton>
        </Box>
        <TextField multiline minRows={4} sx={{ flex: 1 }} {...register('message')} />
        <Button
          sx={BUTTON_STYLE}
          style={{ textTransform: 'none' }}
          disabled={!watch('message')}
          onClick={async () => {
            
            await dispatch(
              sendMessageThunk({
                user_id,
                employer_message: watch('message'),
                executor_message: '',
                task_id: info.task_id ? info.task_id : info.id,
                executor_profile_id: info.executor_profile_id,
              }),
            ).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                dispatch(setTasksList(null));
              }
            });
            setOpen(false);
            navigate('../chat');
          }}>
          Ուղարկել
        </Button>
      </Box>
    </Dialog>
  );
};

export default ModalFirstTaskMessage;
