import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { theme } from "../../../utils/Theme";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    "& .MuiButton-contained": {
      textTransform: "none",
      backgroundColor: `${props.backgroundColor} !important`,
      fontWeight: 500,
      borderRadius: "10px",
      //width: '160px',
    },
    "& .MuiButton-root": {
      "& .Mui-disabled": {
        backgroundColor: `${props.backgroundColor} !important`,
      },
    },
    "& .Mui-disabled": {
      //backgroundColor: '#445e77c4 !important',
      backgroundColor: `${props.disabledColor} !important`,
      color: "#fff !important",
    },
  }),
}));

const BlueButton = ({
  load,
  action,
  label,
  width,
  backgroundColor,
  disabledColor,
  sx = {},
}) => {
  const styleProps = { backgroundColor, disabledColor };
  const classes = useStyles(styleProps);
  return (
    <Box className={classes.root} sx={{ m: 1 }}>
      <Button
        startIcon={
          load && <CircularProgress sx={{ color: "#fff" }} size={12} />
        }
        sx={{ height: "100%", ...sx, height: "100%", ...width }}
        variant="contained"
        disabled={load}
      
        onClick={action}
      >
        {load ? "Загрузка..." : label}
      </Button>
    </Box>
  );
};

export default BlueButton;
