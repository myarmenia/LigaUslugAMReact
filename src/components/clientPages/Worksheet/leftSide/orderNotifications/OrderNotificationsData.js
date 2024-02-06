import React from "react";
import Card from "@mui/material/Card";
import { useInfoCardStyles } from "../../../../../globalStyles/InfoCardStyles";
import CustomDivider from "../../../../UI/customDivider/CustomDivider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import edit from '../../../../../assets/image/edit.svg'

const OrderNotificationsData = ({ setNotificationOrders }) => {
  const classes = useInfoCardStyles();
  const profile = useSelector((state) => state.profile);
  const status = useSelector((state) => state.profile.status);
  const notification =
    profile.user[0]?.geting_notification || profile?.user?.geting_notification;

  const valueOfNotification =
    notification === "1"
      ? "Ստացեք ծանուցումներ էլ փոստով"
      : "չստանալ ծանուցումներ";

  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box className={classes.orderSubBlockSpaceBetween} sx={{ pb: 1 }}>
        <Typography style={{ margin: "0" }} sx={{fontSize:"22px",color:"#000", fontWeight:"500"}}>
          Պատվերի ծանուցումներ
        </Typography>
        <Box
          style={{ cursor: "pointer", padding: "0" }}
          onClick={() => setNotificationOrders(true)}
        >
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
          <img src={edit} alt="edit" />
        </Box>
      </Box>
      <CustomDivider />
      <Box>
        <Typography variant={"h5"}>Ինչպես ստանալ ծանուցումներ</Typography>
        <Typography>{valueOfNotification}</Typography>
      </Box>
    </Card>
  );
};
export default OrderNotificationsData;
