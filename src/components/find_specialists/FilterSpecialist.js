import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSvg } from '../../assets/svg/DeleteSvg';
import { SelectSvg } from '../../assets/svg/SelectSvg';
import { useOrderStyles } from '../../globalStyles/OrderStyles';
import { getCategories } from '../../store/actions/FilterOrdersActions';
import { getRegionData } from '../../store/actions/HeaderActions';
import SearchIcon from '@mui/icons-material/Search';
import CustomDivider from '../UI/customDivider/CustomDivider';
import CustomSelect from '../UI/selects/CustomSelect';
import ModalInSubcategoris from '../UI/modals/ModalInSubcategoris';
import { setLoading } from '../../store/reducers/AuthReducer';
import { instance } from '../../store/api/api';
import { useNavigate } from 'react-router-dom';
import FilterSubcategorisSearch from './FilterSubcategorisSearch';
const TASK_LOCATIONS = [{ value: 'У клиента' }, { value: 'Дистанционно' }];

function validateFilter({ taskLocation, setIsValidRegion, regionValue }) {
   let isValid = true;

   if (taskLocation === 'У клиента' && !regionValue) {
      setIsValidRegion(false);
      isValid = false;
   }
   return isValid;
}

async function fetchData(resData, action, setData, navigate) {
   action(setLoading(true));
   const url = `${resData.category_id}/${resData.region}/${resData.executor_subcategory.join('_')}`;
   url.slice(url.length - 2);
   await instance
      .get(
         `v1/pages/filter-executor/${resData.category_id}/${
            resData.region
         }/${resData.executor_subcategory.join('_')}`,
      )
      .then((res) => {
         return {
            category: Array.isArray(res.data.category) ? res.data.category[0] : res.data.category,
            message: res.data.executor,
            selected_subcategories: res.data.selected_subcategories,
            selected_region: res.data.selected_region,
         };
      })
      .then((data) => {
         setData(data);
         return data;
      })
      .then((data) => {
         const urlId = data.message.first_page_url?.slice(
            data.message.first_page_url.indexOf('pages'),
         );
         navigate(`/find_specialists/specialists/${resData.category_id}?${urlId}`);
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         action(setLoading(false));
      });
}

const FilterSpecialist = ({
   selctSubCategotis = [], //yntrvac subkatgorian
   subCategotis, //sra mej subkategorianerna
   selectedCategories = '', //yntrvac kategorian verevi
   setData, //fetchic ekac obyekty sra meja
   data,
   region, //yntrvac regionyy
}) => {
   const [regionValue, setRegionValue] = useState(null);
   const [isValidRegion, setIsValidRegion] = useState(true);
   const classes = useOrderStyles();
   const [isOpenAddServicesModal, setIsOpenAddServicesModal] = useState(false);
   const [submitSubCategotis, setSubmitSubCategotis] = useState(null);
   const [showservicesBlock, setShowServicesBlock] = useState(true);
   const { regions = [] } = useSelector((state) => state.header);
   const [idCategory, setIdCategory] = useState(null);
   const navigate = useNavigate();

   const dispatch = useDispatch();
   useEffect(() => {
      if (!submitSubCategotis && selctSubCategotis.length) {
         setSubmitSubCategotis(selctSubCategotis);
      }
   }, [submitSubCategotis, selctSubCategotis]);
   const regionValues = useMemo(() => {
      return regions.map((el) => ({
         id: el.id,
         value: el.region,
         label: el.region,
      }));
   }, [regions]);

   useEffect(() => {
      if (region) {
         setRegionValue(region);
      }
   }, [region]);

   useEffect(() => {
      if (regionValue) {
         setIsValidRegion(true);
      }
   }, [regionValue]);

   useEffect(() => {
      dispatch(getRegionData());
   }, [dispatch]);

   useEffect(() => {
      if (data?.category?.id) {
         setIdCategory(data?.category?.id);
      }
   }, [data]);
   const [value, setValue] = useState('');
   const filterFile = (arr = [], val = '') => {
      if (val.length > 2) {
         return arr.filter(({ subcategory_name }) =>
            subcategory_name?.toLowerCase().includes(val?.toLowerCase()),
         );
      }
      return arr;
   };

   return (
      <Box
         className={classes.root}
         sx={{
            backgroundColor: '#fff !important',
            padding: '0 !important',
            width: '340px',
            minHeight: '100% !important',
            '@media (max-width: 900px)': {
               width: '100%',
            },
         }}>
         <Grid container spacing={2} sx={{ marginTop: '0px' }}>
            <Card
               sx={{
                  boxShadow: 2,
                  backgroundColor: '#FFF',
                  marginTop: '0 !important',
                  width: '100%',
               }}>
               <Box className={classes.orderSubBlockSpaceBetween}>
                  {/* <ModalInSubcategoris
              category={subCategotis}
              selectedCategories={[]}
              open={isOpenAddServicesModal}
              setOpen={setIsOpenAddServicesModal}
              executor_categories={submitSubCategotis}
              onChange={(arr) => {
                setSubmitSubCategotis(arr);
              }}
            /> */}
                  <Typography
                     variant={'h1'}
                     sx={{
                        color: '#000',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        lineHeight: 'normal',
                     }}>
                     Որոնել
                  </Typography>
                  <Typography
                     onClick={() => {}}
                     style={{
                        cursor: 'pointer',
                        color: '#5A7287',
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: 'normal',
                     }}
                     variant={'h3'}>
                     Փակել
                  </Typography>
               </Box>
               <CustomDivider />
               <Typography
                  onClick={() => {}}
                  // style={{ cursor: "pointer" }}
                  variant={'h3'}
                  sx={{
                     mb: 1,
                     color: '#445E77',
                     fontFamily: 'Roboto',
                     fontSize: '24px',
                     fontStyle: 'normal',
                     fontWeight: '700',
                     lineHeight: 'normal',
                  }}>
                  {selectedCategories}
               </Typography>
               <Box>
                  {/* Услуги button -ov bacvox pagvox masy */}
                  {/* <Box
							style={{marginBottom: "20px"}}
							className={classes.orderSubBlockSpaceBetween}
						>
							<Typography variant={"h2"}>Услуги</Typography>
							<Box
								onClick={() => setShowServicesBlock(!showservicesBlock)}
								style={{
									transform: showservicesBlock
										? "rotate(180deg)"
										: "rotate(0deg)",
									cursor: "pointer",
								}}
							>
								<SelectSvg />
							</Box>
						</Box> */}
                  <Box>
                     {showservicesBlock &&
                        submitSubCategotis?.map((item, index) => (
                           <Box
                              sx={{ marginBottom: '10px' }}
                              key={index}
                              className={classes.orderSubBlockSpaceBetween}>
                              <Typography
                                 style={{
                                    paddingRight: '5px',
                                    color: '#808080',
                                    fontFamily: 'Roboto',
                                    fontSize: '18px',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    lineHeight: 'normal',
                                 }}
                                 variant={'h4'}>
                                 {item}
                              </Typography>
                              {submitSubCategotis.length !== 1 && (
                                 <Box
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => {
                                       setSubmitSubCategotis(
                                          submitSubCategotis.filter((el) => el !== item),
                                       );
                                    }}>
                                    <DeleteSvg />
                                 </Box>
                              )}
                           </Box>
                        ))}
                     {/* <Box
								sx={{
									display: "flex",
									justifyContent: "end",
									alignItems: "center",
									gap: "5px",
								}}
							>
								<Button
									variant={"contained"}
									onClick={() => setIsOpenAddServicesModal(true)}
								>
									Добавить
								</Button>
							</Box> */}
                     <TextField
                        variant="outlined"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        sx={{
                           width: '100%',
                           height: 'auto',
                           marginBottom: '16px',
                           borderRadius: '12px',
                           backgroundColor: '#EBEBEB',
                           border: '1px solid #C4C4C4',
                           '@media (max-width: 710px)': {
                              width: '100%',
                           },
                           '&.Mui-focused fieldset': {
                              borderColor: 'gray',
                              borderRadius: '20px',
                           },
                           '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid #808080',
                              borderRadius: '10px',
                           },
                           '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                              border: '1px solid #808080',
                              borderRadius: '10px',
                           },
                           //focus
                           '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                              {
                                 border: '1px solid blue',
                                 borderRadius: '10px',
                              },
                        }}
                        placeholder="Поиск"
                        inputProps={{
                           sx: {
                              padding: '10px 10px',
                           },
                        }}
                        InputProps={{
                           endAdornment: (
                              <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.25)' }} fontSize="medium" />
                           ),
                        }}
                     />
                     <Box>
                        <FilterSubcategorisSearch
                           value={value} // searchi value-n
                           filterFile={filterFile} //searchi logikan
                           category={subCategotis} //sra mej subkategorianerna
                           // selectedCategories={[]}  //yntrvac kategorian verevi
                           // open={isOpenAddServicesModal}
                           // setOpen={setIsOpenAddServicesModal}
                           executor_categories={submitSubCategotis} //yntrvac subkatgorian
                           onChange={(arr) => {
                              //verjum sra mej pti qcvi data-n
                              setSubmitSubCategotis(arr);
                           }}
                        />
                     </Box>

                     <Box style={{ margin: '10px 0 40px 0' }}>
                        <Typography
                           style={{
                              marginBottom: '10px',
                              color: '#000',
                              fontFamily: 'Roboto',
                              fontSize: '22px',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              lineHeight: 'normal',
                           }}>
                           Տարածաշրջան
                        </Typography>
                        {!isValidRegion && (
                           <Box sx={{ color: 'red', mt: '10px' }}>выберите регион</Box>
                        )}
                        <CustomSelect
                           sx={{
                              backgroundColor: '#EBEBEB',
                              borderRadius: '12px',
                              border: '1px solid #C4C4C4',
                              height: '46px',
                           }} //mejy styly poxell????
                           placeholder={'выберите регион'}
                           handleChange={(val) => setRegionValue(val[0])}
                           value={regionValue && regionValue !== 'null' ? regionValue : ''}
                           mt={0}
                           arr={regionValues}
                        />
                     </Box>
                     <Button
                        sx={{
                           background: '#FF6B00',
                           boxShadow: '4px 4px 10px 0px rgba(0, 0, 0, 0.20)',
                           width: '100%',
                           borderRadius: '20px',
                           color: '#FFF',
                           height: '46px',
                           mt: '25px',
                           '&:hover': {
                              background: '#FF6B00',
                           },
                        }}
                        // disabled={
                        // 	(Array.isArray(submitSubCategotis) && regionValues)
                        // }
                        onClick={() => {
                           const resData = {
                              executor_subcategory: submitSubCategotis,
                              region:
                                 regionValue && regionValue.includes(',')
                                    ? regionValue.slice(0, regionValue.length - 1)
                                    : regionValue,
                              category_id: idCategory,
                           };

                           fetchData(resData, dispatch, setData, navigate);
                        }}>
                        Որոնել
                     </Button>
                  </Box>
               </Box>
            </Card>
         </Grid>
      </Box>
   );
};

export default FilterSpecialist;
