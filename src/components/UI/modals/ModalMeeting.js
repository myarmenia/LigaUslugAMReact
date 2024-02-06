import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import {Dialog, IconButton} from "@mui/material";
import {useDispatch} from "react-redux";
import {CloseSvg} from "../../../assets/svg/CloseSvg";
import BasicDatePicker from "../../shared/DatePicker";
import BasicTimePicker from "../../shared/TimpePicker";
import CustomButton from "../../shared/Button";
import {addTaskMeeting} from "../../../store/actions/TaskActions";

const ModalMeeting = ({open, setOpen, task_id, executor_profile_id}) => {
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
   

    if (!open) {
        return null
    }
    return (
        <Dialog
            maxWidth={false}
            open={true}
            onClose={handleClose}
            sx={{
                '.MuiDialog-paper': {
                    borderRadius: '24px',
                    boxShadow: '4px 4px 10px 0px #00000026',
                }
            }}
        >
            <Box sx={{
                width: '792px',
                height: '359px',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pt: '27px',
                    pb: '17px',
                    ml: '29px',
                    mr: '29px',
                    borderBottom: '1px solid #808080',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        color: '#000000',
                        fontSIze: '24px',
                        lineHeight: '28px',
                        fontWeight: 500,
                        fontFamily: 'Roboto'
                    }}>Հանդիպում տեղում</Box>
                    <IconButton onClick={handleClose}>
                        <CloseSvg/>
                    </IconButton>
                </Box>
                <Box sx={{mt: '47px', display: 'flex', justifyContent: 'center', gap: '50px'}}>
                    <BasicDatePicker
                        value={date}
                        onChange={(event) => {
                            setDate(event)
                        }}
                    />
                    <BasicTimePicker value={time} onChange={(val) => setTime(val)}/>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', pt: '56px'}}>
                    <CustomButton onClick={() => {
                        if (date && time) {
                            dispatch(addTaskMeeting({
                                employer_offer_to_executor_task_meeting_date: date.toLocaleDateString(),
                                employer_offer_to_executor_task_meeting_time: time.toLocaleTimeString(),
                                task_id,
                                executor_profile_id
                            }))
                            setOpen(false)
                        }
                    }}>
                        Ուղարկել
                    </CustomButton>
                </Box>
            </Box>
        </Dialog>
    );
}

export default ModalMeeting;
