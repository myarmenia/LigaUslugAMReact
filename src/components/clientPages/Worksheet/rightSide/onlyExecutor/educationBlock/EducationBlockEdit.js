import React, { useEffect, useRef, useState } from 'react';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import Card from '@mui/material/Card';
import CustomInput from '../../../../../UI/customInput/CustomInput';
import CustomImageList from '../../../../../UI/customimagelist/CustomImageList';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FileSVG } from '../../../../../../assets/svg/Profile/FileSVG';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import { FieldArray, Formik } from 'formik';
import {
   FormControlLabel,
   FormLabel,
   FormControl,
   Radio,
   RadioGroup,
   CircularProgress,
} from '@mui/material';
import { updateExecutorData } from '../../../../../../store/actions/ProfileDataActions';
import { useDispatch, useSelector } from 'react-redux';
import { resetPartReducer } from '../../../../../../store/reducers/ProfileDataReducer';
import get from 'lodash/get';
import pick from 'lodash/pick';
import save from '../../../../../../assets/image/save.svg';

const EducationBlockEdit = ({ setEditEducationBlock, setOpenToaster }) => {
   const classes = useInfoCardStyles();
   const dispatch = useDispatch();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [err, setErr] = useState('');
   const { profile = {}, successWork, error } = useSelector((state) => state.profile);
   const [value, setValue] = useState(profile?.executor_educations[0]?.education_place || '');
   useEffect(() => {
      if (successWork) {
         setEditEducationBlock(false);
         setOpenToaster(true);
         setTimeout(() => {
            dispatch(resetPartReducer());
         }, 3000);
      }
      if (error) {
         setOpenToaster(true);
         setTimeout(() => {
            dispatch(resetPartReducer());
         }, 2500);
         setTimeout(() => {
            setIsSubmitting(false);
         }, 3000);
      }
   }, [successWork, error, dispatch, setEditEducationBlock, setOpenToaster]);
   useEffect(() => {
      if (!value) {
         setErr('Պարտադիր դաշտ');
      } else {
         setErr('');
      }
   }, [value]);
   const initialValues = {
      executor_educations:
         profile?.executor_educations?.length > 0
            ? get(profile, 'executor_educations', [
                 {
                    id: profile?.executor_educations[0]?.id,
                    education_type: profile?.executor_educations[0]?.education_type,
                    education_place: profile?.executor_educations[0]?.education_place,
                 },
              ]).map((education) => pick(education, ['education_type', 'education_place']))
            : [{ education_type: '', education_place: '' }],
      executor_education_certificates: get(profile, 'executor_education_certificates', [
         {
            id: '',
            certificate_base: '',
         },
      ]).map((certificates) => pick(certificates, ['certificate_base'])),
   };
   return (
      <Card sx={{ boxShadow: 2 }} className={classes.root}>
         <Formik
            initialValues={initialValues}
            onSubmit={async (values, action) => {
               if (!err) {
                  // window.ym(91484981, 'reachGoal', 'zayavka');
                  dispatch(updateExecutorData(values));
                  setIsSubmitting(true);
               }
               // action.resetForm()
            }}>
            {({ values, handleSubmit, setFieldValue, errors, touched }) => (
               <form onSubmit={handleSubmit}>
                  <Box>
                     <Box style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Typography className={classes.title}>Կրթություն և վկայականներ</Typography>
                        {!isSubmitting && (
                           <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <button
                                 type={'submit'}
                                 style={{
                                    backgroundColor: 'inherit',
                                    border: '1px',
                                    cursor: 'pointer',
                                 }}>
                                 <img src={save} alt="save" />
                              </button>
                              {/* <Button color="success" type="submit" variant="contained">
                      Сохранить
                    </Button> */}
                           </Box>
                        )}
                        <Box sx={{ ml: 5 }}>{isSubmitting && <CircularProgress size={20} />}</Box>
                     </Box>
                     <CustomDivider />
                     <Typography variant={'h5'}>Կրթություն</Typography>
                     <Box>
                        <FormControl component="fieldset">
                           <FormLabel
                              style={{ margin: '-15px 0 10px 0' }}
                              className={classes.inputText}
                              component="legend">
                              Ուսման վայրը
                           </FormLabel>
                           <RadioGroup
                              aria-label="gender"
                              defaultValue={`${values.executor_educations[0].education_type}`}
                              name="executor_educations[0].education_type"
                              style={{ display: 'flex', flexDirection: 'row' }}>
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
                                          setFieldValue(
                                             'executor_educations[0].education_type',
                                             e.target.value,
                                          );
                                       }}
                                       value="Նախնական"
                                    />
                                 }
                                 label="Նախնական"
                              />
                              <FormControlLabel
                                 control={
                                    <Radio
                                       onChange={(e) => {
                                          setFieldValue(
                                             'executor_educations[0].education_type',
                                             e.target.value,
                                          );
                                       }}
                                       classes={{
                                          root: classes.radio,
                                          checked: classes.checked,
                                       }}
                                       style={{ color: '#4B9A2D' }}
                                       size={'small'}
                                       value="Միջին"
                                    />
                                 }
                                 label="Միջին"
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
                                          setFieldValue(
                                             'executor_educations[0].education_type',
                                             e.target.value,
                                          );
                                       }}
                                       value=" Միջն մասնագիտական"
                                    />
                                 }
                                 label=" Միջն մասնագիտական"
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
                                          setFieldValue(
                                             'executor_educations[0].education_type',
                                             e.target.value,
                                          );
                                       }}
                                       value="Բարձրագույն"
                                    />
                                 }
                                 label="Բարձրագույն"
                              />
                           </RadioGroup>
                        </FormControl>
                     </Box>
                     <Typography variant={'h5'}>Ուսումնական հաստատություն</Typography>

                     <Box className={classes.singleInput}>
                        <CustomInput
                           touched={
                              touched?.executor_educations
                                 ? touched?.executor_educations[0]?.education_place
                                 : false
                           }
                           name={'executor_educations[0].education_place'}
                           placeholder={'Ուսումնական հաստատություն'}
                           error={err}
                           value={values.executor_educations[0].education_place}
                           handleChange={(val) => {
                              setFieldValue('executor_educations[0].education_place', val);
                              setValue(val);
                           }}
                        />
                     </Box>
                     <Typography variant={'h5'}>Վկայականներ</Typography>
                     <FieldArray name={'executor_education_certificates'}>
                        {({ push, remove }) => (
                           <CustomImageList
                              education={true}
                              imageData={values.executor_education_certificates}
                              push={(val) => push({ certificate_base: val })}
                              remove={remove}
                           />
                        )}
                     </FieldArray>
                  </Box>
                  {/* {!isSubmitting && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button color="success" type="submit" variant="contained">
                  Сохранить
                </Button>
              </Box>
            )} */}
               </form>
            )}
         </Formik>
      </Card>
   );
};

export default EducationBlockEdit;
