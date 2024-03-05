import React, { useEffect, useRef, useState } from 'react';
import { Formik } from 'formik';
import Divider from '@mui/material/Divider';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomInput from '../../../UI/customInput/CustomInput';
import CustomInputIcon from '../../../UI/customInput/CustomInputIcon';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { clickOnTask } from '../../../../store/actions/TaskExecutorActions';
import { resetPartReducer } from '../../../../store/reducers/TaskReducer';
import { ClickOnTaskValidation } from '../../../../utils/validation/ClickOnTaskValidation';
import CustomDatePicker from '../../../UI/datePicker/CustomDatePicker';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const OrderContentForm = ({
  setShowModal,
  state,
  setOpenToaster,
  category,
  subCategory,
  setShowForm,
}) => {
  const dispatch = useDispatch();
  const { header } = useSelector((state) => state.header);
  const balanceInfo = useSelector((state) => state.executor?.balanceInfo);
  const { message, loadBtn } = useSelector((state) => state.taskExecutor);
  const servicePriceFrom = useRef(null);
  const [servicePriceFromValue, setServicePriceFromValue] = useState('');
  const servicePriceTo = useRef(null);
  const [servicePriceToValue, setServicePriceToValue] = useState('');
  const [err, setErr] = useState('');
  useEffect(() => {
    if (+servicePriceFromValue > servicePriceToValue) {
      setErr('Сумма не должна превышать максимальную');
    } else {
      setErr('');
    }
  }, [servicePriceFromValue, servicePriceToValue]);

  useEffect(() => {
    if (message) {
      setOpenToaster(true);
    }
  }, [message]);
  return (
    <Formik
      initialValues={{
        service_price_from: '',
        offer_to_employer: '',
        service_price_to: '',
        startdate_from: moment().format('YYYY-MM-DD'),
        start_date_to: moment().format('YYYY-MM-DD'),
        task_id: state?.id,
      }}
      validationSchema={ClickOnTaskValidation}
      onSubmit={(values, action) => {
        if (
          header?.category &&
          header?.category
            .filter((el) => el.category_name === category)[0]
            .subcategories.filter((el) => el.subcategory_name.trim() === subCategory.trim())[0]
            ?.price < balanceInfo.balance &&
          !err
        ) {
          dispatch(clickOnTask(values));
          setOpenToaster(true);
        } else {
          setTimeout(() => {
            dispatch(resetPartReducer());
            setShowModal(false);
          }, 15000);
          setShowModal(true);
        }
        // action.resetForm()
      }}>
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CustomDivider />
          <Box style={{ padding: '30px' }}>
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'column',
                lg: 'row',
              }}
              divider={<Divider orientation="vertical" flexItem />}
              spacing={4}>
              <Box style={{ padding: '0 10px' }}>
                <Typography variant={'h4'}>Ծառայության արժեքը</Typography>
                <Box
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                  <Box style={{ paddingRight: '10px' }}>
                    <CustomInputIcon
                      ref={servicePriceFrom}
                      onInpitChange={setServicePriceFromValue}
                      name={'service_price_from'}
                      value={values.service_price_from}
                      handleChange={handleChange}
                      placeholder={'Սկսած'}
                      maxWidth={{ maxWidth: '243px' }}
                      width={'100%'}
                      icon={'֏.'}
                      touched={touched.service_price_from}
                      error={errors.service_price_from || (touched.service_price_from && err)}
                    />
                  </Box>
                  <Box>
                    <CustomInputIcon
                      ref={servicePriceTo}
                      onInpitChange={setServicePriceToValue}
                      name={'service_price_to'}
                      value={values.service_price_to}
                      handleChange={handleChange}
                      placeholder={'Մինչեվ'}
                      width={'100%'}
                      maxWidth={{ maxWidth: '243px' }}
                      icon={'֏.'}
                      touched={touched.service_price_to}
                      error={errors.service_price_to}
                    />
                  </Box>
                </Box>
              </Box>
              <Box style={{ padding: '0 10px' }}>
                <Typography variant={'h4'}>Առաջարկեք ձեր ամսաթվերը</Typography>
                <Box style={{ display: 'flex', margin: '10px 0' }}>
                  <Box style={{ paddingRight: '10px' }}>
                    <Box sx={{ marginBottom: '15px' }}>
                      <CustomDatePicker
                        value={values.startdate_from}
                        name={'startdate_from'}
                        label={'Սկսած'}
                        fun={(val) => setFieldValue('startdate_from', val)}
                        disablePast={true}
                      />
                    </Box>
                    {touched.startdate_from && errors.startdate_from && (
                      <p
                        style={{
                          fontSize: '15px',
                          color: '#F44336',
                          margin: '5px 0 0 0',
                        }}>
                        {errors.startdate_from}
                      </p>
                    )}
                    <Box>
                      <CustomDatePicker
                        value={values.start_date_to}
                        name={'start_date_to'}
                        label={'Մինչեվ'}
                        fun={(val) => setFieldValue('start_date_to', val)}
                        disablePast={true}
                      />
                    </Box>
                    {touched.start_date_to && errors.start_date_to && (
                      <p
                        style={{
                          fontSize: '15px',
                          color: '#F44336',
                          margin: '5px 0 0 0',
                        }}>
                        {errors.start_date_to}
                      </p>
                    )}
                  </Box>
                </Box>
              </Box>
            </Stack>
            <Box style={{ margin: '20px 0' }}>
              <Typography style={{ marginBottom: '20px' }} variant={'h4'}>
                Առաջարկ հաճախորդին
              </Typography>
              <CustomInput
                name={'offer_to_employer'}
                placeholder={'Առաջարկ հաճախորդին'}
                textArea={true}
                value={values.offer_to_employer}
                handleChange={(val) => setFieldValue('offer_to_employer', val)}
                touched={touched.offer_to_employer}
                error={errors.offer_to_employer}
              />
            </Box>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
              }}>
              <Box sx={{ display: 'flex', gap: '18px' }}>
                <Button
                  style={{ width: '200px' }}
                  onClick={() => {
                    if (!loadBtn) {
                      handleSubmit();
                    }
                  }}
                  variant={'contained'}>
                  Ուղարկել
                </Button>
                <Button
                  style={{ width: '200px', backgroundColor: '#E20613' }}
                  onClick={() => setShowForm(false)}
                  variant={'contained'}>
                  Չեղարկել
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default OrderContentForm;
