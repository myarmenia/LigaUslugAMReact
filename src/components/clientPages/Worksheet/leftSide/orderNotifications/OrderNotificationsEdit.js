import React from "react";
import Card from "@mui/material/Card";
import { FileSVG } from "../../../../../../src/assets/svg/Profile/FileSVG";
import { useInfoCardStyles } from "../../../../../globalStyles/InfoCardStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateNotifications } from "../../../../../store/actions/ProfileDataActions";
import {
  changeGettingNotifications,
  resetGettingNotificationsExecutor,
  resetPartReducer,
} from "../../../../../store/reducers/ProfileDataReducer";
import Button from "@mui/material/Button";
import save from '../../../../../assets/image/save.svg';

const radio = {
  color: "#4B9A2D",
  "&.Mui-checked": {
    color: "#4B9A2D",
  },
};

const OrderNotificationsEdit = ({ setOpenToaster, setNotificationOrders }) => {
  const profile = useSelector((state) => state.profile);
  const status = useSelector((state) => state.profile.status);
  const notification =
    profile.user[0]?.geting_notification || profile?.user?.geting_notification;

  const valueOfNotification =
    notification === "1"
      ? "Ստացեք ծանուցումներ էլ փոստով"
      : "չստանալ ծանուցումներ";
  const classes = useInfoCardStyles();
  const [value, setValue] = React.useState(valueOfNotification);
  const dispatch = useDispatch();

  const changeNotification = async () => {
    // window.ym(91484981, "reachGoal", "zayavka");
    await dispatch(
      updateNotifications({
        geting_notification:
          value === "Ստացեք ծանուցումներ էլ փոստով" ? "1" : "0",
      })
    );
    await setOpenToaster(true);
    if (status === "executor") {
      dispatch(
        resetGettingNotificationsExecutor(
          value === "Ստացեք ծանուցումներ էլ փոստով" ? "1" : "0"
        )
      );
    } else {
      await dispatch(
        changeGettingNotifications(
          value === "Ստացեք ծանուցումներ էլ փոստով" ? "1" : "0"
        )
      );
    }
    await dispatch(resetPartReducer());
    setNotificationOrders(false);
  };

  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box className={classes.orderSubBlockSpaceBetween} sx={{ pb: 1 }}>
        <Typography sx={{color:"#000", fontWeight:"500",fontSize:"22px"}}>Պատվերի ծանուցումներ</Typography>
        <Box
          style={{ cursor: "pointer", padding: "0" }}
          onClick={changeNotification}
        >
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
          <img src={save} alt="save" />
        </Box>
      </Box>
      <Box style={{ background: "#808080", height: 2 }} />
      {/* <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <FormControlLabel
          value="На почту и по СМС"
          control={<Radio sx={radio} size={"small"} />}
          label="На почту и по СМС"
        />
        <FormControlLabel
          value="На почту"
          control={<Radio sx={radio} size={"small"} />}
          label="На почту"
        />
        <FormControlLabel
          value="по СМС"
          control={<Radio sx={radio} size={"small"} />}
          label="по СМС"
        />
      </RadioGroup> */}
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <FormControlLabel
          value="Ստացեք ծանուցումներ էլ փոստով"
          control={<Radio sx={radio} size={"small"} />}
          label="Ստացեք ծանուցումներ էլ փոստով"
        />
        <FormControlLabel
          value="չստանալ ծանուցումներ"
          control={<Radio sx={radio} size={"small"} />}
          label="չստանալ ծանուցումներ"
        />
      </RadioGroup>
    </Card>
  );
};
export default OrderNotificationsEdit;
