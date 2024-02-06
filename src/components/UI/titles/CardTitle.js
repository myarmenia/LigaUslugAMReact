import React from 'react';
import EditButton from "../CustomButtons/EditButton";
import {makeStyles} from "@material-ui/core";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
    title:{
        fontWeight: "500 !important",
        fontSize: '18px !important',
        marginBottom:'10px !important'
    },
})

const CardTitle = ({title, condition, editFun, handleSubmit}) => {
    const classes = useStyles();
    return (
        <>
        <Box style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Typography className={classes.title}>
                {title}
            </Typography>
            <EditButton condition={condition} editFun={editFun} handleSubmit={handleSubmit} />
        </Box>
        <Divider style={{ border: "1px solid #808080", width: "100%" }} />
        </>
    )
}

export default CardTitle;