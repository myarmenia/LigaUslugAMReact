import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useOrderAboutStyles } from "../../../../globalStyles/OrderAboutStyles";
import CustomDivider from "../../../UI/customDivider/CustomDivider";
import WalletSvg from "../../../../assets/svg/WalletSvg";
import { getExecutorBalance } from "../../../../store/actions/ExecutorDataActions";

const MyBalance = ({ setShowModal }) => {
  const classes = useOrderAboutStyles();
  const dispatch = useDispatch();
  const balanceInfo = useSelector((state) => state.executor?.balanceInfo);
  // bellow extract
  const balance = useMemo(() => {
    return balanceInfo?.balance;
  }, [balanceInfo]);
  useEffect(() => {
    if (!balanceInfo) {
      dispatch(getExecutorBalance());
    }
  }, [balanceInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getExecutorBalance());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <Card sx={{ boxShadow: 2 }}>
      <Box className={classes.orderSubBlockSpaceBetween}>
        <Typography variant={"h1"}>Մնացորդային հաշիվ</Typography>
      </Box>
      <CustomDivider />
      <Typography style={{ margin: "20px" }} variant={"h1"} component="div">
        <WalletSvg />
        {balance || 0} ֏.
      </Typography>
      <Button
        onClick={() => setShowModal(true)}
        fullWidth
        variant={"contained"}
      >
        Լիցքավորել
      </Button>
    </Card>
  );
};
export default MyBalance;
