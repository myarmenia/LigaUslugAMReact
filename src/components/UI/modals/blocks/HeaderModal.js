import React from 'react';
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import {useStyles} from "../../../../globalStyles/ModalStyles";
import {CloseSvg} from "../../../../assets/svg/CloseSvg";

const HeaderModal = ({title, close}) => {
    const classes = useStyles();
    return (
        <Box className={classes.headerBlock}>
            <Box sx={{display: 'flex', justifyContent: 'center', flex: 1}}>
                <p className={classes.title}>{title}</p>
            </Box>
            <IconButton onClick={close}>
                <CloseSvg/>
            </IconButton>
        </Box>
    )
}

export default HeaderModal;
