import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { memo, useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteSvg } from '../../assets/svg/DeleteSvg';
import { SelectSvg } from '../../assets/svg/SelectSvg';
import { useOrderStyles } from '../../globalStyles/OrderStyles';
import { getHeaderData, getRegionData } from '../../store/actions/HeaderActions';
import SearchIcon from '@mui/icons-material/Search';
import CustomDivider from '../UI/customDivider/CustomDivider';
import CustomSelect from '../UI/selects/CustomSelect';
import ModalInSubcategoris from '../UI/modals/ModalInSubcategoris';
import { setLoading } from '../../store/reducers/AuthReducer';
import { instance } from '../../store/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FiltrSubkategorisSearchWork from './FiltrSubkategorisSearchWork';
import CustomInputIcon from '../UI/customInput/CustomInputIcon';

import {
   CircularProgress,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   // Typography,
   useMediaQuery,
} from '@mui/material';
import { AddNewOrderValidation } from '../../utils/validation/AddNewOrderValidation';

// const TASK_LOCATIONS = [{ value: 'Հաճախորդի մոտ' }, { value: 'Հեռակա կարգով' }];

import { LoginRounded } from '@mui/icons-material';
import { useCallback } from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const TASK_LOCATIONS = [{ value: 'Հաճախորդի մոտ' }, { value: 'Հեռակա կարգով' }];

function validateFilter({ taskLocation, setIsValidRegion, regionValue }) {
   let isValid = true;

   if (taskLocation === 'Հաճախորդի մոտ' && !regionValue) {
      setIsValidRegion(false);
      isValid = false;
   }
   return isValid;
}

async function fetchPages(data, dispatch, navigate) {
   dispatch(setLoading(true));
   await instance
      .get(
         'v1/pages/find_task/?category_id=1&subcategory_name=Сайты под ключ&task_location=Հեռակա կարգով&price_from=100&price_to=200',
         // `v1/pages/find_task/?category_id=${data.linkID}&subcategory_name=${data.linkCategoris[0]}&region_name=${data.region}`,
      )
      .then((res) => {
         const indexpage = res.data.message.links[1].url.indexOf('pages');
         let url = res.data.message.links[1].url.slice(indexpage);

         navigate(`/search_works/1?${url}`);
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         dispatch(setLoading(false));
      });
}

const FilterWorks = ({ selctSubCategotis = [], data, region }) => {
   const [regionValue, setRegionValue] = useState(null);
   const [isValidRegion, setIsValidRegion] = useState(true);
   const [performLocation, setPerformLocation] = useState('Հեռակա կարգով');
   const [submitSubCategotis, setSubmitSubCategotis] = useState([]);
   const [value, setValue] = useState('');
   const [categoryValue, setCategoryValue] = useState('');

   const [categoryId, setCategoryId] = useState(null);
   const [showservicesBlock, setShowServicesBlock] = useState(true);
   const [priceFormvalStart, setPriceFormvalStart] = useState('');
   const [priceFormvalEnd, setPriceFormvalEnd] = useState('');
   const [valitText, setVlidText] = useState('');
   const [priceBool1, setPriceBool1] = useState(false);
   const [priceBool2, setPriceBool2] = useState(false);
   const [somBool, setSomeBool] = useState(false);
   const [somBool2, setSomeBool2] = useState(false);
   const [checkBoolStatus, setCheckBoolStatus] = useState(false);
   const [err, setErr] = useState('');

   const { regions = [], header, cities = [], loading } = useSelector((state) => state.header);
   const refStartPrice = useRef(null);
   const refEndPrice = useRef(null);
   const { category } = header;

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const classes = useOrderStyles();
   const { id } = useParams();

   useEffect(() => {
      isNaN(id) && setCategoryValue(id);
   }, [id]);

   const categoryArr = useMemo(() => {
      if (category) {
         return category.map((el) => ({
            id: el.id,
            value: el.category_name,
            label: el.category_name,
         }));
      }
      return [];
   }, [category]);

   const validationSchema = Yup.object().shape({
      price_from: Yup.string()
         .min(2, 'Սկսած: Առնվազն 2 նիշ')
         .matches(/^[0-9]+$/, 'Միայն թիվ'),
      price_to: Yup.string()
         .min(2, 'Մինչև: Առնվազն 2 նիշ')
         .matches(/^[0-9]+$/, 'Միայն թիվ')
         .test(
            'price_to',
            "Մինչև: Արժեքը պետք է լինի ավելի մեծ կամ հավասար 'Սկսած'",
            function (value) {
               const { price_from } = this.parent;
               if (value && price_from) {
                  return parseInt(value, 10) >= parseInt(price_from, 10);
               }
               return true;
            },
         ),
   });

   // useEffect(() => {

   //    //   if (priceFormvalStart && priceFormvalEnd) {
   //    //     if (+priceFormvalStart >= +priceFormvalEnd) {

   //    //       // setPriceBool1(true)
   //    //       // setPriceBool2(true)
   //    //       // setSomeBool2(false)
   //    //       setVlidText("2 arjeq@ chi karox poqr lini 1 ic");
   //    //       setSomeBool2(true);
   //    //     } else {
   //    //       setSomeBool2(false);
   //    //     }
   //    //   }else {
   //    //     if (priceFormvalStart && priceFormvalStart?.length < 2) {
   //    //        setSomeBool(true);
   //    //        setVlidText("petq e lini 2 tiv");
   //    //
   //    //      } else {
   //    //        setSomeBool(false);
   //    //        // setVlidText('')
   //    //      }
   //    //      if (priceFormvalEnd && priceFormvalEnd?.length < 2) {
   //    //        setSomeBool2(true);
   //    //        setVlidText("petq e lini 2 tiv");
   //    //
   //    //      } else {
   //    //        setSomeBool2(false);
   //    //        // setVlidText('')
   //    //      }
   //    //  }
   //    //  if (somBool && somBool2) {
   //    //     setCheckBoolStatus(true)
   //    //  }
   //    // if (priceFormvalStart && +priceFormvalStart > +priceFormvalEnd ) {
   //    //    setSomeBool2(true)
   //    //    setVlidText('2 arjeq@ chi karox poqr lini 1 ic')
   //    // }else{
   //    //    setSomeBool2(false)
   //    // }

   // }, [priceFormvalStart, priceFormvalEnd]);

   // useEffect(() => {
   //   if (priceFormvalStart && priceFormvalEnd) {
   //     if (+priceFormvalStart > +priceFormvalEnd) {
   //       setErr("Сумма не должна превышать максимальную");
   //
   //     } else {
   //       setErr(" ");
   //     }
   //   }

   // }, [priceFormvalStart, priceFormvalEnd,err]);

   // useEffect(() => {
   //    // if(priceFormvalStart && priceFormvalStart?.length < 2){
   //    //    setSomeBool(true)

   //    // }else{
   //    //    setSomeBool(false)
   //    // }
   // }, [somBool, priceFormvalStart]);

   useEffect(() => {
      setSubmitSubCategotis([]);
   }, [categoryValue]);

   const subCategories = useMemo(() => {
      if (category && categoryValue) {
         return category?.filter((el) => el.category_name == categoryValue)[0].subcategories;
      } else if (category && data?.category?.category_name) {
         return category?.filter((el) => data?.category?.category_name)[0].subcategories;
      }
      return [];
   }, [category, categoryValue, data?.category?.category_name]);

   const regionValues = useMemo(() => {
      return regions.map((el) => ({
         id: el.id,
         value: el.region,
         label: el.region,
      }));
   }, [regions]);

   // useEffect(() => { // --
   //   if (region) {
   //     setRegionValue(region);
   //   }
   // }, [region]);

   useEffect(() => {
      if (regionValue) {
         setIsValidRegion(true);
      }
   }, [regionValue]);

   useEffect(() => {
      dispatch(getRegionData());
      dispatch(getHeaderData());
   }, [dispatch]);

   useEffect(() => {
      if (categoryValue) {
         setCategoryId(category.filter((el) => el.category_name === categoryValue)[0].id);
      }
   }, [categoryValue]);

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
         <Grid container spacing={2} maxWidth={true} sx={{ marginTop: '0px' }}>
            <Card
               sx={{
                  boxShadow: 2,
                  backgroundColor: '#FFF',
                  marginTop: '0 !important',
                  width: '100%',
               }}>
               <Box className={classes.orderSubBlockSpaceBetween}>
                  {/* <ModalInSubcategoris
              category={subCategories}
              selectedCategories={[]}
              open={isOpenAddServicesModal}
              setOpen={setIsOpenAddServicesModal}
              executor_categories={submitSubCategotis}
              onChange={(arr) => {
                setSubmitSubCategotis(arr);
              }}
            /> */}
                  <Typography variant={'h1'}>Որոնել</Typography>
                  <Box
                     sx={{ cursor: 'pointer' }}
                     onClick={() => {
                        navigate(`/search_works/1?pages/all_tasks`);
                     }}>
                     <DeleteOutlineOutlinedIcon color="#445e77" />
                  </Box>
                  {/* <Typography
							variant={"h1"}
							onClick={() => {
								navigate(`/search_works/1?pages/all_tasks`)
							}}
							color='red'
							sx={{cursor: "pointer"}}
						>
							Стереть{" "}
						</Typography> */}
               </Box>
               <CustomDivider />
               <Box>
                  <Box sx={{ pb: 3 }}>
                     <Typography variant={'h2'} sx={{ color: '#000', paddingBottom: '16px' }}>
                        Կատեգորիաներ
                     </Typography>
                     <CustomSelect
                        sx={{
                           backgroundColor: '#EBEBEB',
                           borderRadius: '12px',
                           border: '1px solid #C4C4C4',
                           height: '46px',
                        }}
                        placeholder={'Կատեգորիաներ'}
                        handleChange={(val) => {
                           setCategoryValue(val[0]);
                        }}
                        value={categoryValue || data?.category?.category_name}
                        mt={0}
                        arr={categoryArr}
                     />
                  </Box>
                  {/* <Box style={{ marginBottom: '20px' }} className={classes.orderSubBlockSpaceBetween}> */}
                  {/* <Typography variant={'h2'}>Подкатегория</Typography> */}
                  {/* <Box
                onClick={() => setShowServicesBlock(!showservicesBlock)}
                style={{
                  transform: showservicesBlock ? 'rotate(180deg)' : 'rotate(0deg)',
                  cursor: 'pointer',
                }}>
                <SelectSvg />
              </Box> */}
                  {/* </Box> */}
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
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                           border: '1px solid blue',
                           borderRadius: '10px',
                        },
                     }}
                     placeholder="Որոնում"
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
                     {showservicesBlock &&
                        submitSubCategotis?.map((item, index) => (
                           <Box
                              sx={{ marginBottom: '10px' }}
                              key={index}
                              className={classes.orderSubBlockSpaceBetween}>
                              <Typography style={{ paddingRight: '5px' }} variant={'h4'}>
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

                     {/* <Box //sra texy subkategorianery petqa lini
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'end',
                                 alignItems: 'center',
                                 gap: '5px',
                              }}>
                              <Button
                                 variant={'contained'}
                                 onClick={() => setIsOpenAddServicesModal(true)}
                                 disabled={
                                    categoryValue ? false : data?.category?.category_name ? false : true
                                 }>
                                 Добавить
                              </Button>
                           </Box> */}
                     <Box>
                        {categoryValue && (
                           <FiltrSubkategorisSearchWork
                              category={subCategories} //subkategorianerna vor yntrvacy joguma
                              value={value} // searchi value-n
                              filterFile={filterFile} //searchi logikan
                              // selectedCategories={[]}
                              // open={isOpenAddServicesModal}
                              // setOpen={setIsOpenAddServicesModal}
                              executor_categories={submitSubCategotis} //checkic yntrvac subkategorianery
                              onChange={(arr) => {
                                 setSubmitSubCategotis(arr); //es funkcian yntrvac subkategorianery lcnuma  executor_categories={submitSubCategotis} sra mej
                              }}
                           />
                        )}
                     </Box>
                     {/* ........................... Հանդիպման մայր start ....................................................... */}

                     <Box style={{ marginBottom: '15px' }}>
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
                           Հանդիպման մայր
                        </Typography>
                        <RadioGroup
                           aria-label="gender"
                           defaultValue="Հեռակա կարգով"
                           name="task_location">
                           <FormControlLabel
                              control={
                                 <Radio
                                    classes={{
                                       root: classes.radio,
                                       checked: classes.checked,
                                    }}
                                    style={{ color: '#EA004F' }}
                                    size={'small'}
                                    onChange={(e) => {
                                       setPerformLocation(e.target.value);
                                       // setValue('Հեռակա կարգով');
                                       // setFieldValue('task_location', e.target.value);
                                    }}
                                    value="Հեռակա կարգով"
                                 />
                              }
                              label="Հեռակա կարգով"
                           />
                           <FormControlLabel
                              control={
                                 <Radio
                                    onChange={(e) => {
                                       setPerformLocation(e.target.value);
                                       // setValue('Կատարողի մոտ');
                                       // setFieldValue('task_location', e.target.value);
                                    }}
                                    classes={{
                                       root: classes.radio,
                                       checked: classes.checked,
                                    }}
                                    style={{ color: '#EA004F' }}
                                    size={'small'}
                                    value="Կատարողի մոտ"
                                 />
                              }
                              label="Կատարողի մոտ"
                           />
                           <FormControlLabel
                              control={
                                 <Radio
                                    classes={{
                                       root: classes.radio,
                                       checked: classes.checked,
                                    }}
                                    style={{ color: '#EA004F' }}
                                    size={'small'}
                                    onChange={(e) => {
                                       setPerformLocation(e.target.value);
                                       // setValue('Հաճախորդի մոտ');
                                       // setFieldValue('task_location', e.target.value);
                                    }}
                                    value="Հաճախորդի մոտ"
                                 />
                              }
                              label="Հաճախորդի մոտ"
                           />
                        </RadioGroup>
                     </Box>

                     {/* ........................... Հանդիպման մայր end ......................................................... */}

                     {/* ........................... Ընտրեք տարածաշրջան start  ......................................................... */}

                     {performLocation !== 'Հեռակա կարգով' && (
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
                              Регион
                           </Typography>
                           {!isValidRegion && (
                              <Box sx={{ color: 'red', mt: '10px' }}>Ընտրեք տարածաշրջան</Box>
                           )}
                           <CustomSelect
                              sx={{
                                 backgroundColor: '#EBEBEB',
                                 borderRadius: '12px',
                                 border: '1px solid #C4C4C4',
                                 height: '46px',
                              }} //mejy styly poxell????
                              placeholder={'Ընտրեք տարածաշրջան'}
                              handleChange={(val) => setRegionValue(val[0])}
                              value={regionValue && regionValue !== 'null' ? regionValue : ''}
                              mt={0}
                              arr={regionValues}
                           />
                        </Box>
                     )}

                     {/* ........................... Ընտրեք տարածաշրջան end  ......................................................... */}

                     {/* ........................... Ծարայության արժեք (֏) start ....................................................... */}

                     <Box>
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
                           Ծարայության արժեք (֏)
                        </Typography>
                        {/* 
                <Box
                  sx={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <CustomInputIcon
                    sx={{
                      backgroundColor: "#EBEBEB",
                      padding: "3px",
                    }}
                    type={"number"}
                    onInpitChange={setPriceFormvalStart}
                    // ref={priceFromRef}
                    name={"price_from"}
                    label={"Վճարում"}
                    value={priceFormvalStart}
                    ref={refStartPrice}
                    handleChange={(e) => {
                      setPriceFormvalStart(e.target.value);
                    }}
                    // handleChange={(e)=>validPrice()}

                    // touched={priceBool1?true:false}
                    touched={somBool}
                    error={valitText}
                    // icon={'֏․'}
                    placeholder={"Սկսած"}
                    // onIn
                    // ref={priceFromRef}
                  />
                  <CustomInputIcon
                    sx={{
                      backgroundColor: "#EBEBEB",
                      padding: "3px",
                    }}
                    type={"number"}
                    // onInpitChange={setPrise_fromValue}
                    // ref={prise_from}
                    name={"price_from"}
                    label={"Վճարում"}
                    value={priceFormvalEnd}
                    handleChange={(e) => setPriceFormvalEnd(e.target.value)}
                    // handleChange={(e)=>validPrice()}
                    ref={refEndPrice}
                    touched={somBool2}
                    error={valitText}
                    // value={values.price_from}
                    // handleChange={handleChange}
                    // touched={touched.price_from}
                    // error={errors.price_from || (touched.price_from && err)}
                    // icon={'֏․'}
                    placeholder={"Մինչև"}
                    // onIn
                  />
                </Box> */}

                        {/* <Formik
                  initialValues={{
                    priceFrom: '',
                    priceTo: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(e) => {
                
                  }
                  
                  }
                >
                  {({
                    values,
                    handleChange,
                    handleBlur,
                    touched,
                    errors,
                    handleSubmit
                  }) => (
                    <Form
                      onSubmit={handleSubmit}
                    >
                      <Box sx={{ mb: "5px" }}>
                        <CustomInputIcon
                          onInpitChange={setPriceFormvalStart}
                          ref={refStartPrice}
                          name={"priceFrom"}
                          label={"Վճարում"}
                          value={values.priceFrom}
                          onChange={handleChange}
                          // touched={touched.priceFrom}
                          onBlur={handleBlur}
                          // error={errors.priceFrom || (touched.priceFrom && err)}
                          error={touched.priceFrom && errors.priceFrom}
                          icon={"֏․"}
                          placeholder={"Սկսած"}
                          // onIn
                        />
                        
                        <CustomInputIcon
                          onInpitChange={setPriceFormvalEnd}
                          ref={refEndPrice}
                          name={"priceTo"}
                          label={"Վճարում"}
                          value={values.priceTo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          touched={touched.priceTo }
                          error={touched.priceTo && errors.priceTo}
                          // error={errors.priceTo || (touched.priceTo && err)}
                          // error={'fhghfh'}
                          icon={"֏․"}
                          placeholder={"Մինչև"}
                        />
                      </Box>
                    </Form>
                  )}
                </Formik> */}
                        <Formik
                           initialValues={{
                              price_from: '',
                              price_to: '',
                           }}
                           validationSchema={validationSchema}
                           onSubmit={(values) => {
                              // setPriceFormvalStart(values.priceFrom)
                              // setPriceFormvalEnd(values.priceTo)
                           }}>
                           {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                           }) => (
                              <Form
                                 onSubmit={handleSubmit}
                                 style={{
                                    display: 'flex',
                                 }}>
                                 <CustomInputIcon
                                    id="price_from"
                                    name="price_from"
                                    label="Վճարում"
                                    onInpitChange={setPriceFormvalStart}
                                    ref={refStartPrice}
                                    value={values.price_from}
                                    // handleChange={(e) =>
                                    //   setPriceFormvalStart(e.target.value)
                                    // }
                                    // onChange={handleChange}
                                    handleChange={handleChange}
                                    onBlur={handleBlur}
                                    // touched={touched.priceFrom}
                                    // error={touched.price_from && errors.price_from}
                                    // error={touched && Boolean(errors.priceFrom)}
                                    // error={true}price_from
                                    touched={touched}
                                    error={errors.price_from}
                                    icon="֏․"
                                    placeholder="Սկսած"
                                 />
                                 <CustomInputIcon
                                    id="price_to"
                                    name="price_to"
                                    label="Վճարում"
                                    onInpitChange={setPriceFormvalEnd}
                                    ref={refEndPrice}
                                    value={values.price_to}
                                    // onChange={handleChange}
                                    handleChange={handleChange}
                                    // handleChange={(e) => setPriceFormvalEnd(e.target.value)}
                                    onBlur={handleBlur}
                                    // touched={touched.price_to}
                                    // error={touched && Boolean(errors.priceTo)}
                                    touched={touched}
                                    // error={errors.price_to}
                                    error={errors.price_to}
                                    icon="֏․"
                                    placeholder="Մինչև"
                                 />
                              </Form>
                           )}
                        </Formik>
                     </Box>

                     {/* ........................... Ծարայության արժեք (֏) end ....................................................... */}
                     <Button
                        sx={{
                           background: '#EA004F',
                           width: '100%',
                           borderRadius: '20px',
                           color: '#FFFFFF',
                           height: '46px',
                           mt: '25px',
                           '&:hover': {
                              background: '#FFFFFF',
                              color: '#EA004F',
                              border: '1px solid #EA004F',
                           },
                        }}
                        // disabled={!(submitSubCategotis.length && categoryValue)}
                        onClick={() => {
                           //  if (typeof categoryId === 'number' && submitSubCategotis.length) {
                           //     const data = {
                           //        linkID: categoryId,
                           //        linkCategoris: [submitSubCategotis],
                           //        region:
                           //           regionValue && regionValue.includes(',')
                           //              ? regionValue.slice(0, regionValue.length - 1)
                           //              : regionValue,

                           //        // priceFrom: priceFormvalStart,
                           //        // priceTo: priceFormvalEnd,
                           //     };

                           //
                           //     fetchPages(data, dispatch, navigate);
                           //  }
                           fetchPages(data, dispatch, navigate);
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

export default memo(FilterWorks);
// linkCategoris: [submitSubCategotis],
// linkCategoris: submitSubCategotis.join('_'),
