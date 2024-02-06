import React from 'react'
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ( {
    spinner: props => ({
        display: 'flex',
        position: 'absolute',
        left: props.percentLeft,
        top: props.top,
        '@media (max-width: 1200px)' : {
            left: props.mediaPercentLeft,
            top: "auto",
        },
    })
}));

const Spinner = ({percentLeft, top, mediaPercentLeft}) => {
    const styleProps = { percentLeft, top, mediaPercentLeft };
    const classes = useStyles(styleProps);
    return (
        <Box className={classes.spinner} >
            <CircularProgress color={'success'} />
        </Box>
    )
}

export default Spinner