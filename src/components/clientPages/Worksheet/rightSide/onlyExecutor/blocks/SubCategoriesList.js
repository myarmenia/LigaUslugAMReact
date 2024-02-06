import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
   root: {
      background: '#FFFFFF',
      borderRadius: '20px',
      padding: '26px 30px',
      margin: '20px 0',
      '& .MuiTypography-h6': {
         fontWeight: 500,
         fontSize: 18,
         marginBottom: 10,
      },
      '& .MuiTypography-h5': {
         fontSize: 18,
         margin: '10px 0',
      },
      '& .MuiTypography-h4': {
         fontSize: 16,
         margin: '0',
         color: '#FFF',
         whiteSpace: 'wrap',
         fontWeight: 'normal',
         padding: '2px',
      },
      '& .MuiTypography-h3': {
         fontSize: 14,
         margin: '5px 0 10px 0',
      },
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },
   },
   checked: {
      backgroundColor: '#49942B',
   },
   unchecked: {
      backgroundColor: '#EBEBEB',
   },
   titleWrap: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   title: {
      fontWeight: '500',
      fontSize: '18px',
      marginBottom: '10px',
   },
   categoriesBackGround: {
      margin: '0 10px 10px 0',
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
   },
});

const isCheked = (array, value) => {
   for (let i = 0; i < array.length; i++) {
      if (array[i].subcategory_name?.trim() === value?.trim()) {
         return true;
      }
   }
   return false;
};

const SubCategoriesValue = ({ value, addSub, enteredSub }) => {
   const classes = useStyles();
   const [checked, setChecked] = useState(false);
   useEffect(() => {
      setChecked(isCheked(enteredSub, value));
   }, [enteredSub, value]);
   return (
      <Box
         onClick={() => {
            addSub(value);
            setChecked((prev) => !prev);
         }}
         className={[classes.categoriesBackGround, checked ? classes.checked : classes.unchecked]}>
         <Typography
            sx={{
               fontSize: 16,
               margin: '0',
               color: '#000000',
               whiteSpace: 'wrap',
               fontWeight: 'normal',
               padding: '2px',
            }}>
            {value}
         </Typography>
      </Box>
   );
};

const SubCategoriesList = ({ arr = [], arraySelect = [], handleChange, placeholder }) => {
   return (
      <Box>
         <Typography variant={'h6'}>{placeholder}</Typography>
         <Box style={{ display: 'flex', flexWrap: 'wrap' }}>
            {arr.map((item, index) =>
               item.subcategories
                  .filter(
                     (el, index) =>
                        el.subcategory_name !== item.subcategories[index + 1]?.subcategory_name,
                  )
                  .map((elem, ind) =>
                     elem.subcategory_name !== '' ? (
                        <SubCategoriesValue
                           key={ind}
                           value={elem.subcategory_name}
                           addSub={handleChange}
                           enteredSub={arraySelect}
                        />
                     ) : null,
                     // <Box key={ind} onClick={() => addSub(elem['subcategory_name'])}
                     //      className={[classes.categoriesBackGround, enteredSub.includes(elem['subcategory_name']) || checkedArr.includes(elem.subcategory_name) ? classes.checked : classes.unchecked]}>
                     //     <Typography sx={{
                     //         fontSize: 16,
                     //         margin: '0',
                     //         color: '#000000',
                     //         whiteSpace: 'wrap',
                     //         fontWeight: 'normal',
                     //         padding: '2px'
                     //     }}>{elem.subcategory_name}</Typography>
                     // </Box> : <></>
                  ),
            )}
         </Box>
      </Box>
   );
};

export default SubCategoriesList;
