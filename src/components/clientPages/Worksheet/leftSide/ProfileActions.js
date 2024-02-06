import * as React from "react";
import {useProfileCardStyles} from "../../../../globalStyles/ProfileCardStyles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useDispatch} from "react-redux";

const ProfileActions = ({setIsOpenDeleteProfile}) => {
    const classes = useProfileCardStyles()
    return (
        <Card sx={{boxShadow: 2}} className={classes.root}>

            <Typography variant={"h6"}>Действия с профилем</Typography>
            <Box style={{background: "#808080", height: 2, marginBottom: "10px"}}/>
            {/*<Typography onClick={() => setOpenLogOutModal(true)}*/}
            {/*            variant={"h6"} className={classes.textBtn}>Выйти</Typography>*/}
            <Typography variant={"h6"} className={classes.textBtn} onClick={() => setIsOpenDeleteProfile(true)}>Удалить</Typography>
            <Typography variant={"h5"} style={{margin: 0}}>Вы потеряете акаунт исполнителя
                <br/> и заказчика</Typography>
        </Card>
    );
};
export default ProfileActions;
