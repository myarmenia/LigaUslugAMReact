import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HeaderModal from './blocks/HeaderModal';
import {useDispatch} from "react-redux";
import BlueButton from "../CustomButtons/BlueButton";
import {useStyles} from "../../../globalStyles/ModalStyles";
import {useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {ForgetPassword} from "../../../store/actions/AuthActions";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    border: 'none',
    p: 3,
};

const ModalForget = ({open, setOpen, setOpenToaster, load}) => {
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const {register, formState: {errors}, handleSubmit} = useForm()
  
    return (
        <div>
            <Modal
                open={Boolean(open)}
                aria-labelledby="modal-modal-title"
                onClose={handleClose}
                aria-describedby="modal-modal-description"
                style={{border: 'none'}}
            >
                <Box sx={{...style, width: {xs: 270, md: 400}}}>
                    <Box className={classes.root}>

                        <Box>
                            <HeaderModal title={'Ուղարկել հաղորդագրություն էլփոստով'} close={handleClose}/>
                            <Box style={{margin: '10px', display: 'flex', justifyContent: 'center'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                                    <TextField {...register('email', {
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "սխալ էլփոստ"
                                        },
                                        required: true,
                                    })} sx={{width: '300px'}}/>
                                    {errors?.email?.message && <Box sx={{color: 'red'}}>{errors.email.message}</Box>}
                                </Box>
                            </Box>
                            <Box className={classes.footer}>
                                <Box style={{
                                    width: '50%',
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    {/*<Button onClick={handleSubmit} variant={'contained'} style={{ cursor: 'pointer'}}>Да</Button>*/}
                                    <BlueButton
                                        action={handleSubmit(async data => {
                                            await dispatch(ForgetPassword(data))
                                            handleClose()
                                            setOpenToaster(true);
                                        })}
                                        load={load}
                                        label={"ուղարկել"}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalForget;
