import React, { useEffect, useState } from "react";
import CustomSelect from "../../../../../UI/selects/CustomSelect";
import { DelBtnSvg } from "../../../../../../assets/svg/Profile/DelBtnSvg";
import { useInfoCardStyles } from "../../../../../../globalStyles/InfoCardStyles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const deletSubcategories = (
  categories,
  categoriesName,
  subcategories,
  arraySelect
) => {
  if (arraySelect?.length === 0) {
    return [];
  }
  let item = [];
  categories.forEach((element) => {
    if (element.category_name === categoriesName) {
      item = element.subcategories;
    }
  });
  let arr = item.map((el) => {
    return el.subcategory_name;
  });
  arr.forEach((element) => {
    subcategories = subcategories.filter(
      (el) => el.subcategory_name.trim() != element.trim()
    );
  });
  return subcategories;
};

const CategoriesList = ({
  arr = [],
  arraySelect = [],
  setIndex,
  handleChange,
  placeholder,
  remove,
  value,
  categories,
  subcategories,
}) => {
  const classes = useInfoCardStyles();
  const [categoriesName, setCategoriesName] = useState("");
  useEffect(() => {
    if (categoriesName) {
      handleChange(
        null,
        deletSubcategories(
          categories,
          categoriesName,
          subcategories,
          arraySelect
        )
      );
      setCategoriesName("");
    }
  }, [categoriesName, categories, subcategories, arraySelect]);
  return (
    <Box>
      <Box style={{ marginBottom: "40px" }} className={classes.singleInput}>
        <CustomSelect
          handleChange={(val) => {
            handleChange(val[0]);
          }}
          arr={arr}
          value={value}
          setIndex={setIndex}
          placeholder={placeholder}
          mt={20}
        />
      </Box>

      <Box style={{ display: "flex", flexWrap: "wrap" }}>
        {arraySelect.map((item, index) =>
          item.item !== "" ? (
            <Box key={index} className={classes.categoriesBackGround}>
              <Typography variant={"h4"}>{item.item}</Typography>
              <Box
                onClick={() => {
                  setCategoriesName(item.item ? item.item : "");
                  remove(index);
                }}
                className={classes.delBtn}
              >
                <DelBtnSvg />
              </Box>
            </Box>
          ) : (
            ""
          )
        )}
      </Box>
    </Box>
  );
};

export default CategoriesList;
