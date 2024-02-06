import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  item: {
    cursor: "pointer",
    fontSize: "18px",
    // margin: 0,
    "&:hover": {
      textDecorationLine: "underLine",
    },
    '@media (max-width: 997px)': {
      fontSize: "16px"
    },
    '@media(min-width: 1440px)': {
      fontSize: "24px"
    },
  },
  img: {
    width: 80,
    height: 78,
  },
});
