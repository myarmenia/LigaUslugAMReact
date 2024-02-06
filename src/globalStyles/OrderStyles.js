import { makeStyles } from "@material-ui/core";

export const useOrderStyles = makeStyles({
  root: {
    height: "100%",
    minHeight: "calc(100vh - 90px)",
    paddingTop: "90px",
    // marginBottom: '70px',
    backgroundColor: "#CFCFCF",
    "& .MuiCard-root": {
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.15)",
      padding: "30px",
      margin: "10px",
    },
    "& .MuiTypography-h1": {
      fontWeight: 500,
      fontSize: 24,
    },
    "& .MuiTypography-h2": {
      fontSize: 22,
      fontWeight: 500,
      //color: "#808080",
      //margin: '10px 0',
    },
    "& .MuiTypography-h3": {
      fontSize: 24,
      color: "#5A7287",
    },
    "& .MuiTypography-h4": {
      fontSize: 20,
    },
    "& .MuiTypography-h5": {
      fontSize: 18,
      color: "#808080",
    },
    "& .MuiButton-contained": {
      backgroundColor: "#4B9A2D",
      borderRadius: "5px",
      textTransform: "none",
      color: "#fff",
      fontWeight: 500,
      "&:hover fieldset": {
        backgroundColor: "#478F2A",
      },
    },
    // "& .MuiButton-contained": {
    //     backgroundColor: '#EBEBEB',
    //     borderRadius: '10px',
    //     textTransform: "none",
    //     color: '#000',
    //     height: '50px',
    //     margin: '10px 0',
    //     "&:hover": {
    //         background: '#D9DADC !important',
    //     }
    // },
  },
  radio: {
    "&$checked": {
      color: "#4B9A2D",
    },
  },
  checked: {},
  orderSubBlockSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    // justifyContent: "end",
    alignItems: "center",
    gap: "5px",
  },
  orderSubBlockSpaceBetween2: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  inLineBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30%",
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
  inLineBlock2: {
    width: "50%",
    "@media (max-width: 800px)": {
      width: "100%",
    },
  },
  inLineStyle: {
    textAlign: "right",
    "@media (max-width: 800px)": {
      textAlign: "left",
    },
  },
  singleBlock: {
    display: "flex",
    justifyContent: "flex-end",
  },
  wrapBox: {
    "@media (max-width: 450px)": {
      width: "100%",
      marginBottom: "20px",
    },
  },
  wrapRight: {
    textAlign: "right",
    "@media (max-width: 483px)": {
      textAlign: "left",
    },
  },
});
