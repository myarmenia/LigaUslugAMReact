import {Box, IconButton} from "@mui/material";
import {CloseSvg} from "../../../../assets/svg/CloseSvg";

export default function ModalHeader12({close, title}) {
    return (
        <Box sx={{pt: '27px', pb: '17px', display: 'flex', width: '100%', alignItems: 'center'}}>
            <Box sx={{flex: 1, justifyContent: 'center'}}>
                {title}
            </Box>
            <IconButton onClick={close}>
                <CloseSvg />
            </IconButton>
        </Box>
    )
}