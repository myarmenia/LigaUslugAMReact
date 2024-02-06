import React from "react";
import Box from "@mui/material/Box";
import { useChatStyles } from "../../../globalStyles/ChatStyles";
import IconButton from "@mui/material/IconButton";
import { GoBackSvg } from "../../../assets/svg/chat/GoBackSvg";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const ChatHeader = ({ infoUser, setHideChatUsers }) => {
  const classes = useChatStyles();

  const goBack = () => {
    setHideChatUsers(false);
  };

  return (
    <Box className={classes.headerContainer}>
      <IconButton onClick={goBack} style={{ paddingRight: "30px" }}>
        <GoBackSvg />
      </IconButton>
      <Typography
        style={{ display: "flex", alignItems: "center" }}
        variant={"h1"}
      >
        <Box style={{ paddingRight: "20px" }}>
          <Avatar
            src={`${process.env.REACT_APP_IMG_API}${infoUser?.user_avatar}`}
          />
        </Box>
        <Typography variant={"h1"}>{infoUser?.user_name}</Typography>
      </Typography>
    </Box>
  );
};

export default ChatHeader;
