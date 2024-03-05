import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { useOrderAboutStyles } from "../../../../globalStyles/OrderAboutStyles";
import CustomDivider from "../../../UI/customDivider/CustomDivider";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { ru } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";
import { useMediaQuery } from "@mui/material";

const dateToString = formatWithOptions({ locale: ru }, "dd MMMM yyyy");

const Transactions = () => {
  const classes = useOrderAboutStyles();
  const balanceInfo = useSelector((state) => state.executor.balanceInfo);
  const [isShowAll, setIsShowAll] = useState(false);
  const transactions = useMemo(() => {
    const result = balanceInfo?.transaction || [];
    return isShowAll ? result : result.slice(0, 5);
  }, [balanceInfo, isShowAll]);
  const media437 = useMediaQuery("(min-width:441px)");
  return (
    <Card>
      <Typography variant={"h1"}>Վերջին գործարքները</Typography>
      <CustomDivider />
      <Box>
        {transactions &&
          transactions.map(
            ({
              created_at,
              transaction_name,
              transaction_description,
              account,
            }) => (
              <div key={created_at}>
                <Box className={classes.orderSubBlockSpaceBetween}>
                  <Box>
                    <Typography variant={"h4"}>{transaction_name}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "3px",
                        "@media (max-width: 440px)": {
                          flexDirection: "column",
                          alignItems: "baseline",
                        },
                      }}
                    >
                      <Typography variant={"h5"}>
                        {dateToString(new Date(created_at))}
                      </Typography>
                      <Typography
                        style={{ alignItems: "center" }}
                        variant={"h5"}
                      >
                        {media437 && <Box className={classes.greyBall} />}
                        {transaction_description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        textAlign: "right",
                        "@media (max-width: 610px)": {
                          textAlign: "left",
                        },
                      }}
                      variant={"h4"}
                    >
                      {`${
                        ["Отклик", "отклик"].includes(transaction_name)
                          ? "-"
                          : ""
                      }${account} руб.`}
                    </Typography>
                    <Typography variant={"h5"}>Բանկային քարտ</Typography>
                  </Box>
                </Box>
                <CustomDivider />
              </div>
            )
          )}
        {balanceInfo?.transaction.length > 5 && (
          <Typography
            variant={"h5"}
            style={{ cursor: "pointer" }}
            onClick={() => setIsShowAll((prev) => !prev)}
          >
            {isShowAll ? "Թաքցնել <<" : "ցույց տալ ամբողջը >>"}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default Transactions;
