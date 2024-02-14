import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import HeaderModal from './blocks/HeaderModal';
import { Formik } from 'formik';
import { DownloadSvg } from '../../../assets/svg/DownloadSvg';
import ModalForAuth from './ModalForAuth';
import CustomDatePicker from '../datePicker/CustomDatePicker';
import CustomInput from '../customInput/CustomInput';
import CustomSelect from '../selects/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewTask } from '../../../store/actions/TaskActions';
import Grid from '@mui/material/Grid';
import BlueButton from '..//CustomButtons/BlueButton';
import {
   CircularProgress,
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
   Typography,
   useMediaQuery,
} from '@mui/material';
import CustomInputIcon from '../customInput/CustomInputIcon';
import { makeStyles } from '@material-ui/core';
import { AddNewOrderValidation } from '../../../utils/validation/AddNewOrderValidation';
import { getLocality, getRegionData } from '../../../store/actions/HeaderActions';
import FileImg from '../../../assets/file.svg';
import { useRef } from 'react';
import dayjs from 'dayjs';
import { setLoading } from '../../../store/reducers/AuthReducer';

export const useStyles = makeStyles({
   flexContainer: {
      width: '56%',
      '@media (max-width: 450px)': {
         width: '243px',
      },
   },
   root: {
      position: 'sticky',
      top: 0,
      backgroundColor: '#fff',
      //height: "100%",
      //paddingTop: '70px',
      // backgroundColor: '#e1e3e5',
      //marginBottom: '70px',
      //paddingTop: '40px',
      '& .MuiTypography-h4': {
         fontWeight: 500,
         fontSize: 20,
         whiteSpace: 'noWrap',
      },
      '& .MuiTypography-h5': {
         fontWeight: 500,
         fontSize: 17,
         whiteSpace: 'noWrap',
      },
      '& .MuiTypography-h6': {
         color: '#808080',
         fontSize: 14,
         whiteSpace: 'noWrap',
         fontWeight: 400,
      },
      '& .MuiTypography-body1': {
         color: '#808080',
         fontSize: '14px',
      },

      //button
      '& .MuiButton-contained': {
         backgroundColor: '#4B9A2D',
         borderRadius: '10px',
      },
      '& .MuiButton-outlined': {
         background: '#445E77',
         textTransform: 'none',
         color: '#fff',
         fontWeight: 500,
         borderRadius: '10px',
         '&:hover': {
            background: '#6585a5 !important',
         },
      },
      //cardItem
      '& .MuiCard-root': {
         borderRadius: '10px',
         margin: '10px',
         boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
         padding: '30px',
         '@media (max-width: 450px)': {
            margin: '20px 0',
         },
      },
      '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
         width: '170px',
         borderRadius: '10px',
         border: '1px solid #808080',
         height: '45px',
         backgroundColor: '#fff',
      },
      //input
      '& .css-1u3bzj6-MuiFormControl-root-MuiTextField-root': {
         marginBottom: '10px',
         width: '100%',
      },
      '& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInputInput': {
         height: '10px',
      },

      //select
      '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInputInput': {
         padding: '10px',
      },
      //from
      '& .MuiOutlinedInputInput': {
         color: '#000',
      },
   },
   radio: {
      '&$checked': {
         color: '#4B9A2D',
      },
   },
   checked: {},

   header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '20px 20px 0 20px',
      flexWrap: 'wrap',
   },
   datePickerBox: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   datepicker: {
      background: '#fff',
   },
   boxInput: {
      width: '100%',
      marginBottom: '18px',
   },
   boxInput2: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '18px',
   },
   inputText: {
      fontSize: '15px',
      textAlign: 'left',
      width: '100%',
      marginTop: '15px',
      marginBottom: '4px',
      color: '#000000',
   },
   input: {
      width: '100%',
      height: '16px',
      fontSize: '25px',
   },
   checkbox: {
      marginTop: '20px',
      alignSelf: 'flex-start',
      paddingLeft: '120px',
   },
   time: {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      padding: '12px 42px',
      borderRadius: '10px',
      width: '150px',
      cursor: 'pointer',
   },
   orderSubBlockSpaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginBottom: '10px',
   },
   orderSubBlockSpaceAround: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: '10px',
   },
   wrapBox: {
      '@media (max-width: 450px)': {
         width: '100%',
         marginBottom: '20px',
      },
   },
   wrapRight: {
      textAlign: 'right',
      '@media (max-width: 450px)': {
         textAlign: 'left',
      },
   },
   btnDanger: {
      background: '#E54C51',
      color: '#fff',
      borderRadius: '10px',
      cursor: 'pointer',
      padding: '4px 12px',
      fontSize: '0.875rem',
      lineHeight: '1.75',
      letterSpacing: '0.02857em',
      fontWeight: '600',
      '&:hover': {
         background: '#965A3E !important',
      },
   },
   containerSupport: {
      padding: '0 200px',
      margin: '70px 0 500px 0',
      '@media (max-width: 950px)': {
         padding: '0',
      },
   },
   subContainerSupport: {
      padding: '0 100px',
      '@media (max-width: 1100px)': {
         padding: '0',
      },
   },
});

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // width: {
   //     xs: '200px',
   // },
   // width: 100,
   // width: 400,
   // width: 'auto',
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: '10px',
   p: 3,
};

const countries = [
   {
      id: 1,
      country: 'Հայաստանի Հանրապետություն',
   },
];

const newArrayCountries = [...countries].map((item) => ({
   key: item.id,
   value: item.country,
   label: item.country,
}));
const ModalNewTask = ({
   showModal,
   setShowModal,
   setOpenToaster,
   modalCategory,
   modalSubCategory,
   activcategory,
   setMessage,
   setSuccess,
   id = null,
}) => {
   const [firstMount, setFirstMount] = useState(true);
   const [open, setOpen] = React.useState(false);
   const handleClose = () => setShowModal(false);
   const classes = useStyles();
   const [value, setValue] = React.useState('Дистанционно');
   const dispatch = useDispatch();
   const matches900 = useMediaQuery('(min-width:900px)');
   const [err, setErr] = useState('');
   const prise_from = useRef();
   const prise_to = useRef();
   const [prise_fromValue, setPrise_fromValue] = useState('');
   const [prise_toValue, setPrise_toValue] = useState('');
   const { header, regions = [], cities = [], loading } = useSelector((state) => state.header);
   const { category } = header;
   const [index, setIndex] = useState(0);
   const [syze, setSyze] = useState(0);
   const [syzeErr, setSyzeErr] = useState(false);

   useEffect(() => {
      if (syze > 2) {
         setSyzeErr(true);
      } else {
         setSyzeErr(false);
      }
   }, [syze]);

   useEffect(() => {
      if (modalCategory && firstMount) {
         setIndex(category?.findIndex((el) => el.category_name === modalCategory));
         setFirstMount(false);
      }
   }, [index, modalCategory, category, firstMount]);
   useEffect(() => {
      dispatch(getRegionData());
   }, [dispatch]);
   const newCategory = category?.map((option) => ({
      key: option.id,
      value: option.category_name ? option.category_name : '',
      label: option.category_name,
   }));
   useEffect(() => {
      if (+prise_fromValue > +prise_toValue) {
         setErr('Գումարը չպետք է գերազանցի առավելագույնը');
      } else {
         setErr('');
      }
   }, [prise_fromValue, prise_toValue]);

   const newSubCategories =
      Array.isArray(category) &&
      category[index]?.subcategories?.map((option) => ({
         key: option.id,
         value: option.subcategory_name ? option.subcategory_name : '',
         label: option.subcategory_name,
      }));

   const newArrayRegion = regions.map((item) => ({
      key: item.id,
      value: item.region,
      label: item.region,
   }));
   const newArrayCities = [...cities].map((item, index) => ({
      key: item.id,
      value: item.country_name,
      label: item.country_name,
   }));
   return (
      <div>
         <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ border: 'none' }}
            sx={{ minWidth: '400px' }}>
            <Box
               style={{ maxHeight: '100%', overflow: 'auto' }}
               sx={(theme) => {
                  return { ...style };
               }}>
               {open && <ModalForAuth open={open} setOpen={setOpen} />}
               <Box className={classes.root}>
                  <HeaderModal title={'Թողնել նոր առաջադրանք'} close={handleClose} />
                  <Formik
                     initialValues={{
                        category_name: modalCategory,
                        subcategory_name: modalSubCategory,
                        task_description: '',
                        region: '',
                        nation: newArrayCountries[0].value,
                        country_name: '',
                        address: '',
                        task_img: [],
                        upload_img: [],
                        task_starttime: dayjs(new Date()).format('YYYY-MM-DD'),
                        task_finishtime: dayjs(new Date()).format('YYYY-MM-DD'),
                        task_location: value,
                        title: '',
                        price_from: '',
                        price_to: '',
                     }}
                     validationSchema={AddNewOrderValidation(value)}
                     onSubmit={async (values, action) => {
                        dispatch(setLoading(true));
                        if (!err && !syzeErr) {
                           // window.ym(91484981, 'reachGoal', 'դիմում');
                           const formData = new FormData();
                           for (let key in values) {
                              if (key === 'upload_img') {
                                 for (let i = 0; i < values[key].length; i++) {
                                    formData.append(`task_img[${i}]`, values[key][i]);
                                 }
                              } else if (key === 'task_img') {
                                 continue;
                              } else {
                                 formData.append(key, values[key]);
                              }
                           }
                           if (id !== null) {
                              formData.append('executor_id', id);
                           }
                           await dispatch(AddNewTask(formData))
                              .then((res) => {
                                 if (id !== null && res.meta.requestStatus === 'fulfilled') {
                                    // setMessage("Ваш заказ успешно оформлен");
                                    setSuccess(true);
                                 }
                              })
                              .finally(() => {
                                 dispatch(setLoading(false));
                              });
                           setOpenToaster(true);
                           action.resetForm();
                           setShowModal(false);
                        }
                     }}>
                     {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                           <Grid container spacing={4} sx={{ minWidth: '350px' }}>
                              <Grid item sm={12} md={7} sx={{ width: '100%' }}>
                                 <Box>
                                    <CustomInput
                                       name={'title'}
                                       label={'Անվանում'}
                                       handleChange={(val) => setFieldValue('title', val)}
                                       placeholder={'Անվանում'}
                                       value={values.title}
                                       touched={touched.title}
                                       error={errors.title}
                                    />
                                 </Box>
                                 <Box style={{ marginBottom: '40px' }}>
                                    <CustomSelect
                                       disabled={activcategory}
                                       placeholder={'Ծառայությունների կատեգորիա'}
                                       name={'category_name'}
                                       label={'Ծառայությունների կատեգորիա*'}
                                       handleChange={(val) => {
                                          setFieldValue('category_name', val[0]);
                                          setFieldValue('subcategory_name', '');
                                       }}
                                       setIndex={setIndex}
                                       value={values.category_name}
                                       touched={touched.category_name}
                                       error={errors.category_name}
                                       arr={newCategory}
                                    />
                                 </Box>
                                 <Box style={{ marginBottom: '40px' }}>
                                    <CustomSelect
                                       label={'Ենթակատեգորիա*'}
                                       name={'subcategory_name'}
                                       handleChange={(val) => {
                                          setFieldValue('subcategory_name', val[0]);
                                       }}
                                       placeholder={'Ենթակատեգորիա'}
                                       value={values.subcategory_name}
                                       touched={touched.subcategory_name}
                                       error={errors.subcategory_name}
                                       arr={newSubCategories}
                                    />
                                 </Box>
                                 <CustomInput
                                    label={'Նկարագրություն'}
                                    name={'task_description'}
                                    value={values.task_description}
                                    placeholder={'Նկարագրություն'}
                                    handleChange={(val) => setFieldValue('task_description', val)}
                                    touched={touched.task_description}
                                    error={errors.task_description}
                                    textArea={true}
                                 />
                                 <Box>
                                    <input
                                       color="primary"
                                       type="file"
                                       multiple
                                       onChange={(e) => {
                                          new Promise((resolve, reject) => {
                                             const arr = [];
                                             const upload_arr = [];
                                             for (let i = 0; i < e.target.files.length; ++i) {
                                                const reader = new FileReader();
                                                const file = e.target.files[i];
                                                upload_arr.push(e.target.files[i]);
                                                reader.onloadend = (event) => {
                                                   const pic = event.target;
                                                   arr.push(pic);
                                                   if (i === e.target.files.length - 1) {
                                                      setTimeout(() => {
                                                         resolve(arr);
                                                      }, 100);
                                                   }
                                                };
                                                reader.readAsDataURL(file);
                                             }
                                             const upload_img = [
                                                ...upload_arr,
                                                ...values.upload_img,
                                             ].slice(0, 2);
                                             // const fileSyze = (

                                             const arrSum = upload_img.reduce((sum, faile) => {
                                                let _size = +faile.size;
                                                const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
                                                let i = 0;
                                                while (_size > 900) {
                                                   _size = _size / 1024;
                                                   i++;
                                                }
                                                let exactSize = Math.round(_size * 100) / 100;
                                                if (i === 1) {
                                                   exactSize = (exactSize / 1024).toFixed(3);
                                                }
                                                return (sum = +exactSize + sum);
                                             }, 0);
                                             setSyze(arrSum.toFixed(3));
                                             setFieldValue('upload_img', upload_img);
                                          }).then((result) => {
                                             const task_img = [...values.task_img, ...result].slice(
                                                0,
                                                2,
                                             );
                                             setFieldValue('task_img', task_img);
                                          });
                                       }}
                                       id="icon-button-file"
                                       accept=".peg,.jpg,.png,.gif,.csv,.txt,.pdf,.docx,.DOCX,.JPEG,.JPG,.PNG,.GIF,.CSV,.TXT,.PDF"
                                       style={{ display: 'none' }}
                                    />
                                    <label
                                       style={{
                                          display: 'flex',
                                          marginTop: '10px',
                                          justifyContent: 'flex-start',
                                          alignItems: 'center',
                                       }}
                                       htmlFor="icon-button-file">
                                       <DownloadSvg />
                                       <p
                                          style={{
                                             fontSize: '15px',
                                             margin: 0,
                                             paddingLeft: '20px',
                                             color: '#000',
                                          }}>
                                          Կցել ֆայլը
                                       </p>
                                    </label>
                                    <Box>
                                       <Typography
                                          variant="body2"
                                          sx={{
                                             mt: '5px',
                                             color: syzeErr ? 'red' : '#000',
                                          }}>
                                          Վերբեռնման առավելագույն քանակը 2 ՄԲ է <br />
                                          {syzeErr && `Դուք գերազանցել եք առավելագույն քանակը`}
                                       </Typography>
                                    </Box>
                                    <div
                                       style={{
                                          display: 'flex',
                                          flexWrap: 'wrap',
                                       }}>
                                       {Array.from(values.task_img).map((val, ind) => {
                                          const failName = val.result.toLowerCase();

                                          // .peg,.jpg,.png,.gif,.csv,.txt,.pdf,.docx,.DOCX,.JPEG,.JPG,.PNG,.GIF,.CSV,.TXT,.PDF
                                          const isTxtFile =
                                             failName.includes('/peg;') ||
                                             failName.includes('/jpg;') ||
                                             failName.includes('/png;') ||
                                             failName.includes('/gif;') ||
                                             failName.includes('/jpeg;');
                                          return (
                                             <div
                                                style={{
                                                   position: 'relative',
                                                   margin: 5,
                                                }}
                                                key={ind}>
                                                <img
                                                   src={isTxtFile ? val.result : FileImg}
                                                   style={{
                                                      height: 75,
                                                      width: 'auto',
                                                   }}
                                                   alt="Result"
                                                />
                                                <div
                                                   style={{
                                                      position: 'absolute',
                                                      cursor: 'pointer',
                                                      top: 0,
                                                      right: 5,
                                                   }}
                                                   onClick={() => {
                                                      setFieldValue(
                                                         'task_img',
                                                         Array.from(values?.task_img).filter(
                                                            (val, index) => +index !== +ind,
                                                         ),
                                                      );
                                                      setFieldValue(
                                                         'upload_img',
                                                         Array.from(values?.upload_img).filter(
                                                            (val, index) => +index !== +ind,
                                                         ),
                                                      );
                                                      const arrSum = Array.from(values?.upload_img)
                                                         .filter((val, index) => +index !== +ind)
                                                         .reduce((sum, faile) => {
                                                            let _size = +faile.size;
                                                            const fSExt = [
                                                               'Bytes',
                                                               'KB',
                                                               'MB',
                                                               'GB',
                                                            ];
                                                            let i = 0;
                                                            while (_size > 900) {
                                                               _size = _size / 1024;
                                                               i++;
                                                            }
                                                            let exactSize =
                                                               Math.round(_size * 100) / 100;
                                                            if (i === 1) {
                                                               exactSize = (
                                                                  exactSize / 1024
                                                               ).toFixed(3);
                                                            }
                                                            return (sum = +exactSize + sum);
                                                         }, 0);
                                                      setSyze(arrSum.toFixed(3));
                                                   }}>
                                                   X
                                                </div>
                                             </div>
                                          );
                                       })}
                                    </div>
                                    {touched.task_img && errors.task_img && (
                                       <p
                                          style={{
                                             fontSize: '15px',
                                             color: '#F44336',
                                             margin: '5px 0 0 0',
                                          }}>
                                          {errors.task_img}
                                       </p>
                                    )}
                                 </Box>
                                 {loading && value === 'У клиента' && matches900 ? (
                                    <>
                                       <Box
                                          sx={{
                                             mt: 1,
                                             width: '100%',
                                             height: '100%',
                                             display: 'flex',
                                             justifyContent: 'center',
                                             alignItems: 'center',
                                          }}>
                                          <CircularProgress size={20} />
                                       </Box>
                                    </>
                                 ) : (
                                    <>
                                       {value === 'У клиента' && matches900 && (
                                          <Box
                                             sx={{
                                                width: !matches900 ? '100%' : '100%',
                                             }}>
                                             <Box sx={{ mb: '40px' }}>
                                                <CustomSelect
                                                   label={'երկիր'}
                                                   placeholder={'երկիր'}
                                                   name={'nation'}
                                                   value={values.nation}
                                                   handleChange={(val) =>
                                                      setFieldValue('nation', val[0])
                                                   }
                                                   arr={newArrayCountries}
                                                />
                                             </Box>
                                             <CustomSelect
                                                label={'Տարածաշրջան'}
                                                name={'region'}
                                                placeholder={'Տարածաշրջան'}
                                                value={values.region}
                                                // handleChange={(val) => setFieldValue("region", val)}
                                                handleChange={async (val) => {
                                                   if (val) {
                                                      await dispatch(
                                                         getLocality({
                                                            region_id: val[1],
                                                         }),
                                                      );
                                                      setFieldValue(
                                                         'region',
                                                         Array.isArray(val) ? val[0] : val,
                                                      );
                                                      setFieldValue('country_name', '');
                                                   }
                                                }}
                                                touched={touched.region}
                                                error={errors.region}
                                                arr={newArrayRegion}
                                             />
                                          </Box>
                                       )}
                                       {value === 'У клиента' && matches900 && (
                                          <Box
                                             sx={{
                                                width: !matches900 ? '100%' : '100%',
                                                mt: '40px',
                                             }}>
                                             <Box sx={{ mb: '40px' }}>
                                                <CustomSelect
                                                   label={'Տեղանք/Քաղաք'}
                                                   placeholder={'Տեղանք/Քաղաք'}
                                                   name={'country_name'}
                                                   disabled={newArrayCities.length === 0}
                                                   value={values.country_name}
                                                   handleChange={(val) =>
                                                      setFieldValue('country_name', val[0])
                                                   }
                                                   touched={touched.region}
                                                   error={errors.region}
                                                   arr={newArrayCities}
                                                />
                                             </Box>
                                             <CustomInput
                                                label={'Հասցե'}
                                                name={'address'}
                                                placeholder={'Հասցե'}
                                                value={values.address}
                                                handleChange={(val) =>
                                                   setFieldValue('address', val)
                                                }
                                                touched={touched.address}
                                                error={errors.address}
                                             />
                                          </Box>
                                       )}
                                    </>
                                 )}
                              </Grid>
                              <Grid item sm={12} md={5} sx={{ width: '100%' }}>
                                 <Box className={classes.boxInput}>
                                    <FormControl component="fieldset">
                                       <FormLabel
                                          style={{
                                             margin: '-15px 0 10px 0',
                                             wordBreak: 'break-word',
                                          }}
                                          className={classes.inputText}
                                          component="legend">
                                          Աշխատանքի կատարման վայրը
                                       </FormLabel>
                                       <RadioGroup
                                          aria-label="gender"
                                          defaultValue="Дистанционно"
                                          name="task_location">
                                          <FormControlLabel
                                             control={
                                                <Radio
                                                   classes={{
                                                      root: classes.radio,
                                                      checked: classes.checked,
                                                   }}
                                                   style={{ color: '#4B9A2D' }}
                                                   size={'small'}
                                                   onChange={(e) => {
                                                      setValue('Дистанционно');
                                                      setFieldValue(
                                                         'task_location',
                                                         e.target.value,
                                                      );
                                                   }}
                                                   value="Дистанционно"
                                                />
                                             }
                                             label="Հեռակա կարգով"
                                          />
                                          <FormControlLabel
                                             control={
                                                <Radio
                                                   onChange={(e) => {
                                                      setValue('У исполнителя');
                                                      setFieldValue(
                                                         'task_location',
                                                         e.target.value,
                                                      );
                                                   }}
                                                   classes={{
                                                      root: classes.radio,
                                                      checked: classes.checked,
                                                   }}
                                                   style={{ color: '#4B9A2D' }}
                                                   size={'small'}
                                                   value="У исполнителя"
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
                                                   style={{ color: '#4B9A2D' }}
                                                   size={'small'}
                                                   onChange={(e) => {
                                                      setValue('У клиента');
                                                      setFieldValue(
                                                         'task_location',
                                                         e.target.value,
                                                      );
                                                   }}
                                                   value="У клиента"
                                                />
                                             }
                                             label="Հաճախորդի մոտ"
                                          />
                                       </RadioGroup>
                                    </FormControl>
                                    {loading && value === 'У клиента' && !matches900 ? (
                                       <>
                                          <Box
                                             sx={{
                                                mt: 1,
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                             }}>
                                             <CircularProgress size={20} />
                                          </Box>
                                       </>
                                    ) : (
                                       <>
                                          {value === 'У клиента' && !matches900 && (
                                             <Box
                                                // style={{ width: "56%","@media (max-width: 450px)": {
                                                //   width:"243px"
                                                // }, }}
                                                sx={{
                                                   width: !matches900 ? '100%' : '100%',
                                                }}>
                                                <Box sx={{ mb: '40px' }}>
                                                   <CustomSelect
                                                      label={'երկիր'}
                                                      name={'nation'}
                                                      placeholder={'երկիր'}
                                                      value={values.nation}
                                                      handleChange={(val) =>
                                                         setFieldValue('nation', val[0])
                                                      }
                                                      arr={newArrayCountries}
                                                   />
                                                </Box>
                                                <CustomSelect
                                                   label={'Տարածաշրջան'}
                                                   name={'region'}
                                                   placeholder={'Տարածաշրջան'}
                                                   value={values.region}
                                                   handleChange={async (
                                                      val = values.personal_address.region,
                                                   ) => {
                                                      if (val) {
                                                         await dispatch(
                                                            getLocality({
                                                               region_id: val[1],
                                                            }),
                                                         );
                                                         setFieldValue(
                                                            'region',
                                                            Array.isArray(val) ? val[0] : val,
                                                         );
                                                         setFieldValue('country_name', '');
                                                      }
                                                   }}
                                                   touched={touched.region}
                                                   error={errors.region}
                                                   arr={newArrayRegion}
                                                />
                                             </Box>
                                          )}
                                          {value === 'У клиента' && !matches900 && (
                                             <Box
                                                sx={{
                                                   width: !matches900 ? '100%' : '100%',
                                                   mt: '40px',
                                                }}>
                                                <Box sx={{ mb: '40px' }}>
                                                   <CustomSelect
                                                      label={'Տեղանք/Քաղաք'}
                                                      placeholder={'Տեղանք/Քաղաք'}
                                                      name={'country_name'}
                                                      disabled={newArrayCities.length === 0}
                                                      value={values.country_name}
                                                      handleChange={(val) =>
                                                         setFieldValue('country_name', val[0])
                                                      }
                                                      touched={touched.region}
                                                      error={errors.region}
                                                      arr={newArrayCities}
                                                   />
                                                </Box>
                                                <CustomInput
                                                   label={'Հասցե'}
                                                   name={'address'}
                                                   placeholder={'Հասցե'}
                                                   value={values.address}
                                                   handleChange={(val) =>
                                                      setFieldValue('address', val)
                                                   }
                                                   touched={touched.address}
                                                   error={errors.address}
                                                />
                                             </Box>
                                          )}
                                       </>
                                    )}
                                 </Box>
                                 <p style={{ marginBottom: '15px' }} className={classes.inputText}>
                                    Մեկնարկի ցանկալի ամսաթիվը
                                 </p>
                                 <Box style={{ marginBottom: '20px' }}>
                                    <Box style={{ marginBottom: '20px' }}>
                                       <CustomDatePicker
                                          width={{ width: '100%' }}
                                          value={values.task_starttime}
                                          name={'task_starttime'}
                                          placement={'top'}
                                          fun={(val) => setFieldValue('task_starttime', val)}
                                          touched={touched.task_starttime}
                                          errors={errors.task_starttime}
                                          disablePast={true}
                                       />
                                    </Box>
                                    <CustomDatePicker
                                       width={{ width: '100%' }}
                                       value={values.task_finishtime}
                                       name={'task_finishtime'}
                                       fun={(val) => setFieldValue('task_finishtime', val)}
                                       touched={touched.task_finishtime}
                                       errors={errors.task_finishtime}
                                       disablePast={true}
                                    />
                                 </Box>
                                 <Box sx={{ mb: '5px' }}>
                                    <CustomInputIcon
                                       onInpitChange={setPrise_fromValue}
                                       ref={prise_from}
                                       name={'price_from'}
                                       label={'Վճարում'}
                                       value={values.price_from}
                                       handleChange={handleChange}
                                       touched={touched.price_from}
                                       error={errors.price_from || (touched.price_from && err)}
                                       icon={'Դրամ.'}
                                       placeholder={'Սկսած'}
                                       onIn
                                    />
                                 </Box>
                                 <CustomInputIcon
                                    onInpitChange={setPrise_toValue}
                                    ref={prise_to}
                                    name={'price_to'}
                                    label={'Վճարում'}
                                    value={values.price_to}
                                    handleChange={handleChange}
                                    touched={touched.price_to}
                                    error={errors.price_to || (touched.price_to && err)}
                                    icon={'Դրամ.'}
                                    placeholder={'Մինչեւ'}
                                 />
                              </Grid>
                           </Grid>
                           <Box
                              sx={{
                                 width: '100%',
                                 display: 'flex',
                                 gap: '15px',
                                 justifyContent: 'space-between',
                                 '@media (max-width: 900px)': {
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                 },
                              }}></Box>
                           <Box
                              style={{
                                 marginTop: value === 'У клиента' ? '10px' : '10px',
                                 paddingBottom: '20px',
                              }}>
                              <BlueButton
                                 disabledColor={'#445E77'}
                                 backgroundColor={'#445E77'}
                                 action={() => {
                                    window.scrollTo({
                                       top: 0,
                                       behavior: 'smooth',
                                    });
                                    handleSubmit();
                                 }}
                                 label={'Հաստատել պատվերը'}
                              />
                              {/*<Button onClick={handleSubmit} variant={'outlined'}>Профиль исполнителя</Button>*/}
                           </Box>
                        </form>
                     )}
                  </Formik>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

export default ModalNewTask;
