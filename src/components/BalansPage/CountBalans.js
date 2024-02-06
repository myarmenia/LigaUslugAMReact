import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import {makeStyles} from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CustomInput from "../UI/customInput/CustomInput";

const useStyles = makeStyles({
    root:{
        height: '100%',
        minHeight: 'calc(100vh - 90px)',
        paddingTop: '90px',
        // marginBottom: '70px',
        backgroundColor: '#CFCFCF',
        "& .MuiCard-root": {
            borderRadius: '10px',
            marginBottom: '20px',
            boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)",
            padding: '30px',
            margin: '10px',
        },
        "& .MuiTypography-h4":{
            fontWeight: 500,
            fontSize:20,
            whiteSpace: 'noWrap',
        },
    },
    containerSupport: {
        padding: '0 200px',
        margin: '70px 0 500px 0',
        '@media (max-width: 950px)' : {
            padding: '0',
        },
    },
    subContainerSupport: {
        padding: '0 100px',
        '@media (max-width: 1100px)' : {
            padding: '0'
        },
    },
})

const CountBalans = () =>{
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Container maxWidth={'lg'}>
                <Box className={classes.containerSupport}>
                    <Card>
                        <Typography style={{textAlign: 'center'}} variant={'h4'}>Աջակցություն</Typography>
                        <Divider color={'#808080'} style={{margin: '20px 0 40px 0'}} />
                        <Box className={classes.subContainerSupport}>
                            <CustomInput />
                            <CustomInput textArea={true} />
                        </Box>
                    </Card>
                </Box>
            </Container>
        </div>
    )
}

export default CountBalans;
