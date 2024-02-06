import { Avatar, Box, Card, Link, Typography } from "@mui/material";
import { useProfileCardStyles } from "../../../globalStyles/ProfileCardStyles";
import telegram from "../../../assets/pngwing.com.png";

export default function SupportInTelegram() {
  const classes = useProfileCardStyles();
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box className={classes.orderSubBlockSpaceBetween} sx={{ mb: 2 }}>
        <Typography variant={"h6"}>Служба поддержки</Typography>
      </Box>
      <Box style={{ background: "#808080", height: 2, marginBottom: "10px" }} />
      <Box style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
        <Avatar src={telegram} style={{ marginRight: 25 }} variant="rounded" />
        <Box>
          <Typography variant={"h6"}>
            <Link
              href={"https://t.me/+nPQJX6VZfJxlYTgy"}
              target="_blank"
              style={{ margin: 0, cursor: "pointer" }}
            >
              Телеграм
            </Link>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
