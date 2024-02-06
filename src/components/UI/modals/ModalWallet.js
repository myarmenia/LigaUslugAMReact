import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CloseSvg } from '../../../assets/svg/CloseSvg';
import IconButton from '@mui/material/IconButton';
import { useStyles } from '../../../globalStyles/ModalStyles';
import CustomInputIcon from '../customInput/CustomInputIcon';
import InputIcons from './blocks/InputIcons';
import { useDispatch } from 'react-redux';
import { increaseExecutorBalance } from '../../../store/actions/ExecutorDataActions';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   //width: 400,
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: 4,
};

const ModalWallet = ({ showModal, setShowModal }) => {
   const [value, setValue] = useState('');
   const [err, setErr] = useState('');
   const dispatch = useDispatch();
   const classes = useStyles();

   const handleClose = () => {
      setShowModal(false);
   };
   useEffect(() => {
      if (value) {
         setErr('');
      }
   }, [value]);
   return (
      <div className={classes.root}>
         <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box
               style={{ borderRadius: '10px' }}
               sx={{ ...style, width: { xs: 270, sm: 400, md: 500 } }}>
               <Box style={{ textAlign: 'end' }}>
                  <IconButton onClick={handleClose}>
                     <CloseSvg />
                  </IconButton>
               </Box>
               <Box style={{ padding: '0 20px' }}>
                  <Box style={{ display: 'flex', justifyContent: 'center' }}>
                     <Typography style={{ alignItems: 'center' }} className={classes.title}>
                        Անբավարար միջոցներ
                     </Typography>
                  </Box>
                  <CustomInputIcon
                     value={value}
                     handleChange={(e) => {
                        if (+e.target.value) {
                           setValue(+e.target.value);
                        }
                        if (!e.target.value) {
                           setValue('');
                        }
                     }}
                     placeholder={'Մուտքագրեք լիցքավորման գումարը'}
                     touched={true}
                     error={err}
                     icon={<InputIcons />}
                  />
                  {/* <Box style={{margin: '20px 0'}}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="pay"
                                        defaultValue="remotely"
                                        name="pay"
                                        style={{flexDirection: 'row'}}
                                    >
                                        <FormControlLabel control={<Radio classes={{root: classes.radio, checked: classes.checked}}
                                                                          style={{color: '#4B9A2D'}} size={'small'} onChange={(e) => {
                                            setValue('card')
                                            setFieldValue('pay', e.target.value)
                                        }} value="remotely" />} label="Карта" />
                                        <FormControlLabel  control={<Radio  onChange={(e) => {
                                            setValue('executor')
                                            setFieldValue('pay', e.target.value)
                                        }} classes={{root: classes.radio, checked: classes.checked}} style={{color: '#4B9A2D'}} size={'small'}   value="wallet" />} label="Кошелек" />
                                    </RadioGroup>
                                </FormControl>
                            </Box> */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
                     <Button
                        style={{ width: '100%' }}
                        onClick={() => {
                           if (value) {
                              dispatch(increaseExecutorBalance(value));
                              setShowModal(false);
                           } else {
                              setErr('Անբավարար միջոցներ');
                           }
                        }}
                        variant={'contained'}>
                        Լիցքավորել
                     </Button>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalWallet;
