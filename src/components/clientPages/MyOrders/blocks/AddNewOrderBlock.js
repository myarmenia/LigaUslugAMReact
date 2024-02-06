import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const AddNewOrderBlock = ({ setShowForm, setActiv }) => {
  return (
    <Box>
      <Box>
        <Typography variant={"h4"}>Թողնել նոր պատվեր</Typography>
      </Box>
      <Divider color={"#808080"} style={{ margin: "20px 0" }} />
      <Button
        onClick={() => {
          setShowForm(true);
          setActiv(false);
        }}
        style={{ width: "100%", height: "100%" }}
        variant="contained"
        color="success"
      >
        + Ստեղծեք նոր պատվեր
      </Button>
    </Box>
  );
};

export default AddNewOrderBlock;
