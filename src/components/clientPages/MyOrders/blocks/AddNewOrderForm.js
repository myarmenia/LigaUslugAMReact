import React, { memo, useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CustomDatePicker from '../../../UI/datePicker/CustomDatePicker';
import { DownloadSvg } from '../../../../assets/svg/DownloadSvg';
import { Formik } from 'formik';
import CustomSelect from '../../../UI/selects/CustomSelect';
import CustomInput from '../../../UI/customInput/CustomInput';
import FormControl from '@mui/material/FormControl';
import CustomInputIcon from '../../../UI/customInput/CustomInputIcon';
import BlueButton from '../../../UI/CustomButtons/BlueButton';
import { useMyOrdersStyles } from '../MyOrders';

import {
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewTask, getNotAppliedTasks } from '../../../../store/actions/TaskActions';
import { AddNewOrderValidation } from '../../../../utils/validation/AddNewOrderValidation';
import { getHeaderData, getLocality, getRegionData } from '../../../../store/actions/HeaderActions';
import BasicDatePicker from '../../../shared/DatePicker';
import moment from 'moment';
import FileImg from '../../../../assets/file.svg';

// let validFileEndings = ['.pdf', '.png', '.jpg', '.jpeg', '.gif', '.csv', '.txt']
const countries = [
  {
    id: 1,
    country: 'Российская Федерация',
  },
];
const id = () => {
  return Math.random().toString();
};

const newArrayCountries = [...countries].map((item) => ({
  key: item.id,
  value: item.country,
  label: item.country,
}));
// .png,.jpg,.jpeg,.gif,.csv,.svg,.png,.pdf,.txt,.docx,.csv
const AddNewOrderForm = ({ setOpenToaster, setShowForm }) => {
  const classes = useMyOrdersStyles();
  const [value, setValue] = useState('Дистанционно');
  const [isDisabled, setIsDisabled] = useState(true);
  const media900 = useMediaQuery('(min-width:1200px)');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const prise_from = useRef();
  const prise_to = useRef();
  const [prise_fromValue, setPrise_fromValue] = useState('');
  const [prise_toValue, setPrise_toValue] = useState('');
  const [syze, setSyze] = useState(0);
  const [syzeErr, setSyzeErr] = useState(false);

  const { header, regions = [], cities = [], load, loading } = useSelector((state) => state.header);
  const { category } = header;
  const [index, setIndex] = useState(0);
  const newCategory = [...category].map((option) => ({
    key: option.id,
    value: option.category_name ? option.category_name : '',
    label: option.category_name,
  }));
  useEffect(() => {
    dispatch(getRegionData());
    dispatch(getHeaderData());
  }, [dispatch]);
  useEffect(() => {
    if (+prise_fromValue > +prise_toValue) {
      setErr('Գումարը չպետք է գերազանցի առավելագույնը');
    } else {
      setErr('');
    }
  }, [prise_fromValue, prise_toValue]);

  const newSubCategories = [...category[index]?.subcategories].map((option) => ({
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
  useEffect(() => {
    if (syze > 2) {
      setSyzeErr(true);
    } else {
      setSyzeErr(false);
    }
  }, [syze]);
  return (
    <Formik
      initialValues={{
        category_name: '',
        subcategory_name: '',
        task_description: '',
        region: '',
        nation: newArrayCountries[0].value,
        country_name: '',
        address: '',
        task_img: [],
        upload_img: [],
        task_starttime: moment().format('YYYY-MM-DD'),
        task_finishtime: moment().format('YYYY-MM-DD'),
        task_location: value,
        title: '',
        price_from: '',
        price_to: '',
      }}
      validationSchema={AddNewOrderValidation(value)}
      onSubmit={async (values, action) => {
        if (!err && !syzeErr) {
          // window.ym(91484981, 'reachGoal', 'zayavka');
          const formData = new FormData();
          for (let key in values) {
            if (key === 'upload_img') {
              for (let i = 0; i < values[key].length; i++) {
                var r = new FileReader();
                formData.append(`task_img[${i}]`, values[key][i]);
              }
            } else if (key === 'task_img') {
              continue;
            } else {
              formData.append(key, values[key]);
            }
          }
          await dispatch(AddNewTask(formData));
          await dispatch(getNotAppliedTasks());
          setOpenToaster(true);
          action.resetForm();
          setShowForm(false);
        }
      }}>
      {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
        <form>
          <Grid container spacing={4}>
            <Grid style={{ width: '100%' }} item sm={12} lg={6}>
              <Box>
                <CustomInput
                  name={'title'}
                  placeholder={'Անվանում'}
                  label={'Անվանում'}
                  handleChange={(val) => {
                    setFieldValue('title', val);
                  }}
                  value={values.title}
                  touched={touched.title}
                  error={errors.title}
                />
              </Box>
              <Box style={{ marginBottom: '40px' }}>
                <CustomSelect
                  name={'category_name'}
                  placeholder={'Ծառայությունների կատեգորիա'}
                  label={'Ծառայությունների կատեգորիա*'}
                  handleChange={(val) => {
                    setFieldValue('category_name', val[0]);
                    setFieldValue('subcategory_name', '');
                    setIsDisabled(false);
                  }}
                  setIndex={setIndex}
                  value={values.category_name ? values.category_name : ''}
                  touched={touched.category_name}
                  error={errors.category_name}
                  arr={newCategory}
                />
              </Box>
              <Box style={{ marginBottom: '40px' }}>
                <CustomSelect
                  label={'Ենթակատեգորիա*'}
                  placeholder={'Ենթակատեգորիա'}
                  name={'subcategory_name'}
                  handleChange={(val) => {
                    setFieldValue('subcategory_name', val[0]);
                  }}
                  disabled={isDisabled}
                  value={values.subcategory_name}
                  touched={touched.subcategory_name}
                  error={errors.subcategory_name}
                  arr={newSubCategories}
                />
              </Box>
              <CustomInput
                label={'Նկարագրություն'}
                placeholder={'Նկարագրություն'}
                name={'task_description'}
                value={values.task_description}
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
                      const upload_img = [...upload_arr, ...values.upload_img].slice(0, 2);
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
                      const task_img = [...values.task_img, ...result].slice(0, 2);
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
                      fontSize: '17px',
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
                    {syzeErr && `Вы превысили максимальное количество`}
                  </Typography>
                </Box>

                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {Array.from(values.task_img).map((val, ind) => {
                    const failName = val.result.toLowerCase();
                    const isTxtFile =
                      failName.includes('/csv;') ||
                      failName.includes('/txt;') ||
                      failName.includes('/pdf;') ||
                      failName.includes('/vnd.');
                    return (
                      <Img
                        isTxtFile={isTxtFile}
                        ind={ind}
                        setFieldValue={setFieldValue}
                        values={values}
                        val={val}
                        id={id}
                        setSyze={setSyze}
                      />
                    );
                  })}
                </div>
                {touched.task_img && errors.task_img && (
                  <p
                    style={{
                      fontSize: '16px',
                      color: '#F44336',
                      margin: '5px 0 0 0',
                    }}>
                    {errors.task_img}
                  </p>
                )}
              </Box>
              {value === 'У клиента' && media900 && (
                <Box style={{ marginTop: '20px' }}>
                  {loading ? (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CircularProgress size={20} />
                    </Box>
                  ) : (
                    <>
                      <Box sx={{ marginBottom: '40px' }}>
                        <CustomSelect
                          label={'երկիր'}
                          placeholder={'երկիր'}
                          name={'nation'}
                          value={values.nation}
                          handleChange={(val) => setFieldValue('nation', val[0])}
                          arr={newArrayCountries}
                        />
                      </Box>
                      <Box style={{ marginBottom: '40px' }}>
                        <CustomSelect
                          label={'Տարածաշրջան'}
                          placeholder={'Տարածաշրջան'}
                          name={'region'}
                          value={values.region}
                          //   handleChange={(val) => setFieldValue("region", val)}
                          handleChange={async (val = values.personal_address[0].region) => {
                            await dispatch(
                              getLocality({
                                region_id: newArrayRegion.filter((el) => el.value === val[0])[0]
                                  .key,
                              }),
                            );
                            setFieldValue('region', Array.isArray(val) ? val[0] : val);
                          }}
                          touched={touched.region}
                          error={errors.region}
                          arr={newArrayRegion}
                        />
                      </Box>
                      <Box style={{ marginBottom: '40px' }}>
                        <CustomSelect
                          label={'Տեղանք/Քաղաք'}
                          placeholder={'Տեղանք/Քաղաք'}
                          name={'country_name'}
                          disabled={newArrayCities.length === 0}
                          value={values.country_name}
                          handleChange={(val) => setFieldValue('country_name', val[0])}
                          touched={touched.country_name}
                          error={errors.country_name}
                          arr={newArrayCities}
                        />
                      </Box>

                      <CustomInput
                        label={'Հասցե'}
                        name={'address'}
                        placeholder={'Հասցե'}
                        value={values.address}
                        handleChange={(val) => setFieldValue('address', val)}
                        touched={touched.address}
                        error={errors.address}
                      />
                    </>
                  )}
                </Box>
              )}
            </Grid>
            <Grid item sm={12} lg={6}>
              <Box className={classes.boxInput}>
                <FormControl component="fieldset">
                  <FormLabel
                    style={{ margin: '-15px 0 10px 0', wordBreak: 'break-word' }}
                    className={classes.inputText}
                    component="legend">
                    Աշխատանքի կատարման վայրը
                  </FormLabel>
                  <RadioGroup aria-label="gender" defaultValue="Дистанционно" name="task_location">
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
                            setFieldValue('task_location', e.target.value);
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
                            setFieldValue('task_location', e.target.value);
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
                            setFieldValue('task_location', e.target.value);
                          }}
                          value="У клиента"
                        />
                      }
                      label="Հաճախորդի մոտ"
                    />
                  </RadioGroup>
                </FormControl>
                {value === 'У клиента' && !media900 && (
                  <Box style={{ marginTop: '20px' }}>
                    {loading ? (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CircularProgress size={20} />
                      </Box>
                    ) : (
                      <>
                        <Box sx={{ marginBottom: '40px' }}>
                          <CustomSelect
                            placeholder={'երկիր'}
                            label={'երկիր'}
                            name={'nation'}
                            value={values.nation}
                            handleChange={(val) => setFieldValue('nation', val[0])}
                            arr={newArrayCountries}
                          />
                        </Box>
                        <Box style={{ marginBottom: '40px' }}>
                          <CustomSelect
                            label={'Տարածաշրջան'}
                            placeholder={'Տարածաշրջան'}
                            name={'region'}
                            value={values.region}
                            //   handleChange={(val) => setFieldValue("region", val)}
                            handleChange={async (val = values.personal_address[0].region) => {
                              await dispatch(
                                getLocality({
                                  region_id: newArrayRegion.filter((el) => el.value === val[0])[0]
                                    .key,
                                }),
                              );
                              setFieldValue('region', Array.isArray(val) ? val[0] : val);
                            }}
                            touched={touched.region}
                            error={errors.region}
                            arr={newArrayRegion}
                          />
                        </Box>
                        <Box style={{ marginBottom: '40px' }}>
                          <CustomSelect
                            label={'Տեղանք/Քաղաք'}
                            placeholder={'Տեղանք/Քաղաք'}
                            name={'country_name'}
                            disabled={newArrayCities.length === 0}
                            value={values.country_name}
                            handleChange={(val) => setFieldValue('country_name', val[0])}
                            touched={touched.country_name}
                            error={errors.country_name}
                            arr={newArrayCities}
                          />
                        </Box>

                        <CustomInput
                          label={'Հասցե'}
                          name={'address'}
                          placeholder={'Հասցե'}
                          value={values.address}
                          handleChange={(val) => setFieldValue('address', val)}
                          touched={touched.address}
                          error={errors.address}
                        />
                      </>
                    )}
                  </Box>
                )}
              </Box>
              <p style={{ marginBottom: '15px' }} className={classes.inputText}>
                 Մեկնարկի ցանկալի ամսաթիվը
              </p>
              <Box style={{ marginBottom: '20px', width: '60%' }}>
                <Box style={{ marginBottom: '20px' }}>
                  <CustomDatePicker
                    value={values.task_starttime || null}
                    name={'task_starttime'}
                    fun={(val) => setFieldValue('task_starttime', val)}
                    touched={touched.task_starttime}
                    errors={errors.task_starttime}
                    disablePast={true}
                  />
                </Box>
                <CustomDatePicker
                  value={values.task_finishtime || null}
                  name={'task_finishtime'}
                  fun={(val) => setFieldValue('task_finishtime', val)}
                  touched={touched.task_finishtime}
                  errors={errors.task_finishtime}
                  disablePast={true}
                />
              </Box>
              <p style={{ marginBottom: '15px' }} className={classes.inputText}>
               Վճարում
              </p>
              <Box sx={{ mb: '5px' }}>
                <CustomInputIcon
                  ref={prise_from}
                  onInpitChange={setPrise_fromValue}
                  name={'price_from'}
                  label={'Վճարում'}
                  value={values.price_from}
                  handleChange={handleChange}
                  touched={touched.price_from}
                  error={errors.price_from || (touched.price_from && err)}
                  icon={'Դրամ.'}
                  placeholder={'Սկսած'}
                  width={'60%'}
                />
              </Box>
              <CustomInputIcon
                ref={prise_to}
                onInpitChange={setPrise_toValue}
                name={'price_to'}
                label={'Վճարում'}
                value={values.price_to}
                handleChange={handleChange}
                touched={touched.price_to}
                error={errors.price_to || (touched.price_to && err)}
                icon={'Դրամ.'}
                placeholder={'Մինչեւ'}
                width={'60%'}
              />
            </Grid>
          </Grid>
          <Box
            style={{ marginTop: value === 'У клиента' ? '10px' : '10px' }}
            sx={{ display: 'flex', justifyContent: 'start' }}>
            <BlueButton
              disabledColor={'#445E77'}
              backgroundColor={'#FF6B00'}
              action={handleSubmit}
              sx={{ height: '100%' }}
              label={'Հաստատել պատվերը'}
            />
          </Box>
        </form>
      )}
    </Formik>
  );
};
const Img = memo(({ id, isTxtFile, setFieldValue, ind, values, val, setSyze }) => {
  return (
    <div style={{ position: 'relative', margin: 5 }} key={id()}>
      <img
        src={!isTxtFile ? val.result : FileImg}
        style={{ height: 75, width: 'auto' }}
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
            Array.from(values?.task_img).filter((val, index) => +index !== +ind),
          );
          setFieldValue(
            'upload_img',
            Array.from(values?.upload_img).filter((val, index) => +index !== +ind),
          );

          const arrSum = Array.from(values?.upload_img)
            .filter((val, index) => +index !== +ind)
            .reduce((sum, faile) => {
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
        }}>
        X
      </div>
    </div>
  );
});

export default AddNewOrderForm;
