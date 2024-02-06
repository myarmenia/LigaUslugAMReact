import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { Checkbox, Dialog, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
// import { CloseSvg } from "../../assets/svg/CloseSvg";
// import Button from "@mui/material/Button";
// import { addListToExecutorCategory } from '../../../src/store/reducers/FilterOrdersReducer';
import { getRegionData, getHeaderData } from '../../store/actions/HeaderActions';
import debounce from 'lodash.debounce';

const FilterSubcategorisSearch = ({
  open,
  setOpen,
  category = [], //sra mej subkategorianerna
  executor_categories = [], //yntrvac subkatgorian
  onChange, //verjum sra mej pti qcvi data-n
  checkClose,
  value,
  setValue,
  filterFile
}) => {

  
  // const handleClose = () => setOpen(false);
  // const [category,setCategory] = useState([])
  // const [executor_categories,setexecutor_categories]=useState(executor_categories)
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegionData());
    dispatch(getHeaderData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRegionData());
  }, [dispatch]);


  // const FiltrDebounce = useCallback(
  //   debounce((txt) => {
  //     console.log(txt);
  //   }, 1000),
  //   [],
  // );
  // const onChangeInp = (arg) => {
  //   FiltrDebounce(arg), setValue(arg);
  // };
  return (
    // <Dialog
    //   maxWidth={false}
    //   open={open}
    //   onClose={handleClose}
    //   sx={{
    //     '.MuiDialog-paper': {
    //       borderRadius: '24px',
    //       boxShadow: '4px 4px 10px 0px #00000026',
    //     },
    //   }}>
    <Box
      sx={{
        pl: '32px',
        pr: '32px',
        pb: '30px',
        height: '212px',
        overflowX: 'auto',
      }}>
      {/* <Box
          sx={{
            borderBottom: '1px solid #808080',
            display: 'flex',
            alignItems: 'center',
            pb: '17px',
            pt: '17px',
          }}>
          <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
            <Box
              sx={{
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 500,
                fontFamily: 'Roboto',
              }}>
              Добавить услугу
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseSvg />
          </IconButton>
        </Box> */}
      {/*search body*/}
      <Box
        sx={{
          pt: '27px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box sx={{ maxWidth: '350px' }}>
          {filterFile(category, value)?.map((el) => {
            return (
              <Box
                key={el.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Checkbox
                  checked={executor_categories?.some((temp) => temp === el.subcategory_name)}
                  onChange={(event) => {
                    let data = [];
                    if (event.target.checked) {
                      // setSelectedCategories((prev) => [
                      //   ...prev,
                      //   { subcategory_name: el.subcategory_name },
                      // ]);
                      data = [...executor_categories, el.subcategory_name];
                    } else {
                      // setSelectedCategories((prev) =>
                      //   prev.filter(
                      //     (elem) =>
                      //       elem.subcategory_name !== el.subcategory_name
                      //   )
                      // );
                      data = executor_categories.filter((elem) => elem !== el.subcategory_name);
                    }
                    if (data.length > 0) {
                      onChange(data);
                    }
                  }}
                />
                <Box
                  sx={{
                    color: '#000',
                    fontFamily: 'Roboto',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}>
                  {el.subcategory_name}
                </Box>
              </Box>
            );
          })}
        </Box>
        {/* <Box sx={{ display: "flex", gap: "10px", pt: "24px" }}>
            <Button
              style={{ textTransform: "none" }}
              sx={{
                background: "#EBEBEB",
                color: "#445E77",
                width: "175px",
                "&:hover": { background: "#EBEBEB" },
              }}
              onClick={() => {
                handleClose();
              }}
            >
              Отменить
            </Button>
            <Button
              style={{ textTransform: "none" }}
              disabled={!selectedCategories?.length}
              sx={{
                background: "#445E77",
                color: "#FFFFFF",
                width: "175px",
                "&:hover": { background: "#445E77" },
              }}
              onClick={() => {
                const data = [
                  ...executor_categories,
                  ...selectedCategories.map((el) => el.subcategory_name),
                ];
                onChange(data);
                handleClose();
                setSelectedCategories([]);
              }}
            >
              Добавить
            </Button>
          </Box> */}
      </Box>
    </Box>
    // </Dialog>
  );
};
export default FilterSubcategorisSearch;
