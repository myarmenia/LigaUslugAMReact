import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import { useOrderAboutStyles } from "../../../../globalStyles/OrderAboutStyles";
import Typography from "@mui/material/Typography";
import CustomDivider from "../../../UI/customDivider/CustomDivider";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { getHeaderData } from "../../../../store/actions/HeaderActions";

const ResponseAmount = ({ state }) => {
  const classes = useOrderAboutStyles();
  const { header } = useSelector((state) => state.header);
  const { user } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getHeaderData());
  // }, [dispatch]);
  const price = () => {
    const headerarr = header?.category?.filter(
      (el) => el?.category_name === state?.category_name
    )[0];
    const priceValue = headerarr?.subcategories.filter(
      (el) => el?.subcategory_name?.trim() === state?.subcategory_name?.trim()
    )[0]?.price;
    return priceValue;
  };
  return (
    <Card>
      {!state?.click_on_tasks.filter(
        (el) => el.executor_profiles.users.name === user.name
      ).length ? (
        <>
          <Box className={classes.orderSubBlockSpaceBetween}>
            <Typography variant={"h2"}>Պատասխանի գումարը</Typography>
            <Typography variant={"h2"}>
              {header?.category ? price() : null} 	֏
            </Typography>
          </Box>
          <CustomDivider />
          <Typography variant={"h4"}>
            Պատասխանի գումարը գանձվում է ձեր հաշվից միայն այն դեպքում, եթե հաճախորդը հաստատի, որ դուք կատարողն եք:
          </Typography>
        </>
      ) : (
        <Typography variant={"h2"} sx={{ color: "#4B9A2D" }}>
          Դուք արդեն արձագանքել եք այս աշխատանքին
        </Typography>
      )}
    </Card>
  );
};

export default ResponseAmount;
