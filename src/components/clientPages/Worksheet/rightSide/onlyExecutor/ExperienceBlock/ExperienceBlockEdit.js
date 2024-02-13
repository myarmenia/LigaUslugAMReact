import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import get from 'lodash/get';
import pick from 'lodash/pick';
import _ from 'lodash';
import { FieldArray, Formik } from 'formik';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import CategoriesListEdit from '../blocks/CategoriesList';
import SubCategoriesList from '../blocks/SubCategoriesList';
import CustomInput from '../../../../../UI/customInput/CustomInput';
import AddButton from '../../../../../UI/CustomButtons/AddButton';
import { TrashSvg } from '../../../../../../assets/svg/TrashSvg';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import { choosesProfessionData } from '../../../../../../store/actions/ProfileDataActions';
import { resetPartReducer } from '../../../../../../store/reducers/ProfileDataReducer';
import CustomDatePicker from '../../../../../UI/datePicker/CustomDatePicker';
import { object, string, array, date } from 'yup';
import * as yup from 'yup';
import save from '../../../../../../assets/image/save.svg';

const ExperienceBlockEdit = ({ setEditExperienceBlock, setOpenToaster }) => {
  const classes = useInfoCardStyles();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { header } = useSelector((state) => state.header);
  const { profile, successWork, error } = useSelector((state) => state.profile);
  const { category } = header;
  const [index, setIndex] = useState(0);
  const [workingDate, setWorkingDate] = useState([null, null]);
  const newCategory = [...category]?.map((option) => ({
    key: option?.id,
    value: option?.category_name ? option.category_name : '',
    label: option?.category_name,
  }));
  const recruitmentDataRef = useRef(null);
  const dismissalDataRef = useRef(null);
  useEffect(() => {
    if (successWork) {
      setEditExperienceBlock(false);
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
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  }, [successWork, error, dispatch, setEditExperienceBlock, setOpenToaster]);

  const newSubCategories = [...category[index]?.subcategories].map((option) => ({
    key: option.id,
    value: option.subcategory_name ? option.subcategory_name : '',
    label: option.subcategory_name,
  }));

  const addIndex = (ind) => {
    setIndex((prev) => {
      if (!index.include(ind)) {
        return [...prev, ind];
      }
      return prev;
    });
  };

  const initialValues = {
    executor_categories: get(profile, 'executor_categories', [
      {
        id: '',
        category_name: '',
        executor_profile_id: '',
      },
    ]).map((categories) => pick(categories, ['category_name'])),
    executor_subcategories: get(profile, 'executor_subcategories', [
      {
        id: '',
        executor_profile_id: '',
        subcategory_name: '',
      },
    ]).map((subcategories) => pick(subcategories, ['subcategory_name'])),
    executor_profile_work_experiences:
      profile?.executor_profile_work_experiences?.length > 0
        ? get(profile, 'executor_profile_work_experiences', [
            {
              working_place: '',
              recruitment_data: '',
              dismissal_data: '',
            },
          ]).map((work) => pick(work, ['working_place', 'recruitment_data', 'dismissal_data']))
        : [{ working_place: '', recruitment_data: '', dismissal_data: '' }],
  };
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          executor_profile_work_experiences: array().of(
            object().shape({
              recruitment_data: date(),
              dismissal_data: date().min(yup.ref('recruitment_data'), 'Խնդրում ենք մուտքագրել ճիշտ ամսաթվերը'),
            }),
          ),
        })}
        onSubmit={async (values, action) => {
          // window.ym(91484981, 'reachGoal', 'դիմում');
          setIsSubmitting(true);
          const data = {
            ...values,
            executor_categories: values.executor_categories.filter((el) => el.category_name !== ''),
            executor_subcategories: values.executor_subcategories.filter(
              (el) => el.subcategory_name !== '',
            ),
          };
          await dispatch(choosesProfessionData({ profession_and_experience: [data] }));
        }}>
        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap:"15px"
                }}>
                <Typography className={classes.title}>Մասնագիտություն և փորձ</Typography>
                {!isSubmitting && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                    }}>
                    <button
                      type={'submit'}
                      style={{ backgroundColor: 'inherit', border: '1px', cursor: 'pointer' }}>
                      <img src={save} alt="save" />
                    </button>
                    {/* <Button
										color='success'
										type={"submit"}
										variant='contained'
									>
										Сохранить
									</Button> */}
                  </Box>
                )}
                <Box sx={{ ml: 5 }}>{isSubmitting && <CircularProgress size={20} />}</Box>
              </Box>
              <CustomDivider />
              <Box>
                <FieldArray name={'executor_categories'}>
                  {({ push, remove }) => (
                    <CategoriesListEdit
                      placeholder={'Կարգավիճակ'}
                      handleChange={(val, val2) => {
                        if (val) {
                          const canAddItem = values.executor_categories.reduce((last, next) => {
                            if (
                              _.isEqual(next, {
                                category_name: val,
                              })
                            ) {
                              return false;
                            } else return last;
                          }, true);
                          if (canAddItem) {
                            push({ category_name: val });
                          }
                        }
                        if (!val && val2) {
                          values.executor_subcategories = val2;
                        }
                      }}
                      arr={newCategory}
                      remove={(val) => {
                        remove(val);
                      }}
                      setIndex={setIndex}
                      arraySelect={[...values.executor_categories].map((option) => ({
                        item: option?.category_name,
                      }))}
                      categories={category}
                      subcategories={values.executor_subcategories}
                    />
                  )}
                </FieldArray>
              </Box>
              {values.executor_categories.length ? (
                <>
                  <Box>
                    <FieldArray name={'executor_subcategories'}>
                      {({ push }) => (
                        <SubCategoriesList
                          handleChange={(val) => {
                            let subcategories = values.executor_subcategories.map(
                              (el) => el.subcategory_name,
                            );
                            if (!subcategories.includes(val)) {
                              push({ subcategory_name: val });
                            } else {
                              values.executor_subcategories = values.executor_subcategories.filter(
                                (el) => el.subcategory_name !== val,
                              );
                            }

                            // const canAddItem = values.executor_subcategories.reduce((last, next) => {
                            //     if (_.isEqual(next, {subcategory_name: val})) {
                            //         return false;
                            //     } else return last;
                            // }, true)

                            // if (canAddItem) {
                            //     push({"subcategory_name": val})
                            // }
                            //  else {
                            //     let index = values.executor_categories.findIndex(el => el.subcategory_name?.trim() === val?.trim());
                            //     remove(index);
                            // }
                          }}
                          placeholder={'Ընտրեք ենթակատեգորիաներ'}
                          arr={(() => {
                            const fullCatArr = category.filter((val) => {
                              return values.executor_categories.reduce((last, next) => {
                                if (val.category_name === next.category_name) {
                                  return true;
                                } else return last;
                              }, false);
                            });
                            return fullCatArr;
                          })()}
                          arraySelect={values.executor_subcategories}
                        />
                      )}
                    </FieldArray>
                  </Box>
                  <Box>
                    <FieldArray name={'executor_profile_work_experiences'}>
                      {({ push, remove }) => (
                        <Box>
                          {values.executor_profile_work_experiences.map((work, index) => {
                            const recruitment_data = `executor_profile_work_experiences[${index}].recruitment_data`;
                            const dismissal_data = `executor_profile_work_experiences[${index}].dismissal_data`;
                            // let date_r = work.recruitment_data
                            // let date_d = work.dismissal_data
                            return (
                              <Box key={index}>
                                <Box
                                  style={{
                                    marginBottom: '20px',
                                  }}>
                                  <Box
                                    style={{
                                      display: 'flex',
                                      flexWrap: 'wrap',
                                    }}>
                                    <Box className={classes.singleInput}>
                                      <Typography variant="h3" sx={{ ml: '5px' }}>
                                        Աշխատանքային փորձը
                                      </Typography>
                                      <CustomInput
                                        placeholder={'Աշխատանքի վայրը'}
                                        name={`executor_profile_work_experiences[${index}].working_place`}
                                        value={work.working_place}
                                        handleChange={(val) =>
                                          setFieldValue(
                                            `executor_profile_work_experiences[${index}].working_place`,
                                            val,
                                          )
                                        }
                                      />
                                    </Box>
                                    <Box
                                      style={{
                                        width: '350px',
                                      }}>
                                      <Box
                                        style={{
                                          marginBottom: '20px',
                                        }}>
                                        <Typography variant="h3">Սկսած</Typography>
                                        <CustomDatePicker
                                          value={
                                            values.executor_profile_work_experiences[index]
                                              .recruitment_data
                                          }
                                          name={recruitment_data}
                                          fun={(val) => setFieldValue(recruitment_data, val)}
                                          label="от"
                                          categories={values.executor_categories}
                                        />
                                      </Box>
                                      <Typography variant="h3">Մինչև</Typography>
                                      <CustomDatePicker
                                        value={
                                          values.executor_profile_work_experiences[index]
                                            .dismissal_data
                                        }
                                        touched={true}
                                        errors={
                                          !!Object.keys(errors).length &&
                                          errors.hasOwnProperty(
                                            'executor_profile_work_experiences',
                                          ) &&
                                          Array.isArray(errors.executor_profile_work_experiences) &&
                                          errors.executor_profile_work_experiences[index] &&
                                          errors.executor_profile_work_experiences[index]
                                            .dismissal_data
                                        }
                                        name={dismissal_data}
                                        fun={(val) => setFieldValue(dismissal_data, val)}
                                        label="до"
                                        categories={values.executor_categories}
                                      />
                                    </Box>
                                  </Box>
                                  {values.executor_profile_work_experiences.length > 1 ? (
                                    <Box>
                                      <div onClick={() => remove(index)}>
                                        <TrashSvg />
                                      </div>

                                      <Box
                                        style={{
                                          width: '100%',
                                          height: index === 0 ? '1px' : '2px',
                                          background: '#ebebeb',
                                        }}></Box>
                                    </Box>
                                  ) : null}
                                </Box>
                              </Box>
                            );
                          })}
                          <Box>
                            <AddButton
                              fun={() =>
                                push({
                                  working_place: '',
                                  recruitment_data: '',
                                  dismissal_data: '',
                                })
                              }
                            />
                          </Box>
                        </Box>
                      )}
                    </FieldArray>
                  </Box>
                </>
              ) : (
                <></>
              )}
              {/* {!isSubmitting && (
								<Box
									sx={{
										display: "flex",
										justifyContent: "center",
										mt: 4,
									}}
								>
									<Button
										color='success'
										type={"submit"}
										variant='contained'
									>
										Сохранить
									</Button>
								</Box>
							)} */}
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default ExperienceBlockEdit;
