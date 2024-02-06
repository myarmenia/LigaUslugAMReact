import React from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import VK from "../../../../../assets/image/VK.png";
import instagram from "../../../../../assets/image/Instagram.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import ok from "../../../../../assets/ok.svg";
import { useProfileCardStyles } from "../../../../../globalStyles/ProfileCardStyles";
import edit from '../../../../../assets/image/edit.svg'

const SocialNetworksData = ({ setEditSocialNetwork }) => {
  const classes = useProfileCardStyles();
  const { user } = useSelector((state) => state.profile);
  // const handleClickLink = (link) => {
  //     window.open(link);
  // };
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box
        className={classes.orderSubBlockSpaceBetween}
        sx={{ paddingBottom: 1 }}
      >
        <Typography  sx={{fontSize:"20px",color:"#000", fontWeight:"500"}}>Կցել սոցիալական ցանցեր</Typography>
        <Box
          sx={{ 
            cursor: "pointer", 
            padding: "0 0 0 20px",
            "@media (max-width: 414px)": {
              padding:0
            },
           }}
          onClick={() => setEditSocialNetwork(true)}
        >
          <img src={edit} alt="edit" />
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
        </Box>
      </Box>
      <Box style={{ background: "#808080", height: 2, marginBottom: "10px" }} />
      {user?.fasebook_link || user[0]?.fasebook_link ? (
        <Box
          style={{ display: "flex", alignItems: "center", marginBottom: 15 }}
        >
          <Avatar src={VK} style={{ marginRight: 25 }} variant="rounded" />
          <Box>
            {user?.fasebook_link || user[0]?.fasebook_link ? (
              <Link
                variant={"h5"}
                href={
                  user?.fasebook_link
                    ? user?.fasebook_link
                    : user[0]?.fasebook_link
                }
                target="_blank"
                style={{ margin: 0, cursor: "pointer" }}
              >
                {user?.fasebook_link
                  ? user?.fasebook_link
                  : user[0]?.fasebook_link}
              </Link>
            ) : (
              <Typography variant={"h5"} style={{ margin: 0 }}>
                կապված չէ
              </Typography>
            )}
          </Box>
        </Box>
      ) : null}
      {user?.instagram_link || user[0]?.instagram_link ? (
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={ok} style={{ marginRight: 25 }} variant="rounded" />
          <Box>
            {/* <Typography variant={"h6"}>Одноклассники</Typography> */}
            {user?.instagram_link || user[0]?.instagram_link ? (
              <Link
                variant={"h5"}
                style={{ margin: 0, cursor: "pointer" }}
                href={
                  user?.instagram_link
                    ? user?.instagram_link
                    : user[0].instagram_link
                }
                target="_blank"
              >
                {user?.instagram_link
                  ? user?.instagram_link
                  : user[0].instagram_link}
              </Link>
            ) : (
              <Typography variant={"h5"} style={{ margin: 0 }}>
                կապված չէ
              </Typography>
            )}
          </Box>
        </Box>
      ) : null}
    </Card>
  );
};
export default SocialNetworksData;
