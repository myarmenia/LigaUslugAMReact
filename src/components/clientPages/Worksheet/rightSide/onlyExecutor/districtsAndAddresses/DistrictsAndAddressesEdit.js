import React, { useEffect, useRef, useState } from 'react';
import Card from '@mui/material/Card';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import CustomSelect from '../../../../../UI/selects/CustomSelect';
import CustomInput from '../../../../../UI/customInput/CustomInput';
import SelectWithCheckbox from '../../../../../UI/selects/SelectWithCheckbox';
import { FieldArray, Formik } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateAddressesData,
  updateAddressesDataEmployer,
} from '../../../../../../store/actions/ProfileDataActions';
import get from 'lodash/get';
import { resetPartReducer } from '../../../../../../store/reducers/ProfileDataReducer';
import { CircularProgress } from '@mui/material';
import { getLocality } from '../../../../../../store/actions/HeaderActions';
import { instance } from '../../../../../../store/api/api';
import save from '../../../../../../assets/image/save.svg';

const changeRayonsData = (arr, defaultarr) => {
  if (!arr.length) {
    return [];
  }
  let valuearr = [];
  for (const el of arr) {
    let arrvalue = [];
    arrvalue = defaultarr.filter((elem) => elem.region === el.executorwork_region.value);
    if (arrvalue[0]?.countries?.length) {
      valuearr = [...valuearr, ...arrvalue[0].countries];
    }
  }

  return valuearr.map((el) => ({
    id: el.id,
    region_id: el.region_id,
    value: el.country_name,
  }));
};

const countries = [
  {
    id: 1,
    country: 'Российская Федерация',
  },
];

const newArrayCountries = [...countries].map((item) => ({
  key: item.id,
  value: item.country,
  label: item.country,
}));

const DistrictsAndAddressesEdit = ({ editAddress, setEditAddress, setOpenToaster }) => {
  const classes = useInfoCardStyles();
  const auth = useSelector((state) => state);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.header.loading);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executorWorkRegion, setExcutorWorkRegion] = useState([]);
  const [initialValues, setinitialValues] = useState();
  const [executorRayonsWorking, setExecutorRayonsWorking] = useState([]);
  const [data, setData] = useState();
  const regionRef = useRef(null);

  const { regions = [], rayons = [], cities = [] } = useSelector((state) => state.header);
  const { profile, successWork, error, user } = useSelector((state) => state.profile);
  const { executor_working_regions = {} } = profile;
  const newArrayRegion = [...regions].map((item) => ({
    key: item.id,
    value: item.region,
    label: item.region,
  }));
  const newArrayRayons = [...rayons].map(function (elem) {
    return elem.rayon_name;
  });

  const newArrayCities = [...cities].map((item, index) => ({
    key: item.id,
    value: item.country_name,
    label: item.country_name,
  }));
  useEffect(() => {
    if (successWork) {
      setEditAddress(false);
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
        setEditAddress(false);
      }, 3000);
    }
  }, [successWork, error, dispatch, setEditAddress, setOpenToaster]);
  useEffect(() => {
    async function fetchData() {
      instance
        .get('v1/pages/regions_and_rayons')
        .then((response) => {
          setinitialValues(response.data.message);
          setExcutorWorkRegion(
            response.data.message.map((el) => ({
              id: el.id,
              value: el.region,
            })),
          );
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (Array.isArray(data) && data.length && initialValues) {
      setExecutorRayonsWorking(changeRayonsData(data, initialValues));
    }
  }, [initialValues]);
  useEffect(() => {
    if (regionRef?.current?.value && 'Տարածաշրջան' !== regionRef?.current?.value) {
      dispatch(
        getLocality({
          region_id: newArrayRegion.filter((el) => el.value === regionRef.current.value)[0].key,
        }),
      );
    }
  }, [regionRef]);
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Formik
        initialValues={{
          region: user?.region ? user?.region : user[0]?.region ? user[0]?.region : '',
          address: user?.address ? user?.address : user[0]?.address ? user[0]?.address : '',
          country_name: user?.country_name
            ? user?.country_name
            : user[0]?.country_name
            ? user[0]?.country_name
            : '',

          working_region: [],
        }}
        // get(profile, "executor_working_regions", []).map(
        //   (working_regions) => pick(working_regions, ["executorwork_region"])
        // ),
        onSubmit={async (values, action) => {
          window.ym(91484981, 'reachGoal', 'zayavka');
          if (status === 'executor') {
            values = {
              ...values,
              working_region: values.working_region.map((el) => {
                if (!el.working_rayons) {
                  return {
                    executorwork_region: el.executorwork_region.value,
                    working_rayons: initialValues
                      .filter((elem) => el.executorwork_region.value === elem.region)[0]
                      .countries.map((el) => ({
                        working_rayon: el.country_name,
                        id: el.id,
                      })),
                  };
                }
                return {
                  ...el,
                  executorwork_region: el.executorwork_region.value,
                };
              }),
            };
            const data = {
              personal_address: [
                {
                  region: values.region,
                  address: values.address,
                  country_name: values.country_name,
                  country: values.country,
                },
              ],
              working_region: values.working_region,
            };
            setIsSubmitting(true);
            dispatch(updateAddressesData({ region_and_address: [data] }));
          } else {
            const data = {
              region: values.region,
              country_name: values.country_name,
              address: values.address,
            };
            setIsSubmitting(true);
            dispatch(updateAddressesDataEmployer(data));
          }
        }}>
        {({ values, handleChange, handleSubmit, setFieldValue }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Typography className={classes.title}>Շրջաններ և հասցեներ</Typography>

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
                    
                      variant="contained"
                      // type={'submit'}
                      style={{
                        cursor: 'pointer',
                        minWidth: 0,
                        color:"black",
                        backgroundColor:"white"
                      }}>
                      <img src={save} alt="save" />
                    </Button> */}
                  </Box>
                )}
                <Box sx={{ ml: 5 }}>{isSubmitting && <CircularProgress size={20} />}</Box>
              </Box>
              <CustomDivider />
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
                  <Typography variant={'h5'}>Երկիր</Typography>
                  <Box style={{ width: '200px', marginBottom: '40px' }}>
                    <CustomSelect
                      placeholder={'Երկիր'}
                      name={'country'}
                      handleChange={(val) => setFieldValue('country', val[0])}
                      arr={newArrayCountries}
                      value={newArrayCountries[0].value ? newArrayCountries[0].value : ''}
                    />
                  </Box>
                  <Typography variant={'h5'}>Տարածաշրջան</Typography>

                  <Box style={{ width: '200px', marginBottom: '40px' }}>
                    <CustomSelect
                      placeholder={'Տարածաշրջան'}
                      name={'region'}
                      ref={regionRef}
                      handleChange={async (val) => {
                        if (val) {
                          if (val && newArrayRegion.filter((el) => el.value === val[0])[0].key) {
                            await dispatch(
                              getLocality({
                                region_id: newArrayRegion.filter((el) => el.value === val[0])[0]
                                  .key,
                              }),
                            );
                          }
                          setFieldValue('region', Array.isArray(val) ? val[0] : val);
                          setFieldValue('country_name', '');
                        }
                      }}
                      didMount={true}
                      arr={newArrayRegion}
                      value={values.region ? values.region : ''}
                    />
                  </Box>

                  <Typography variant={'h5'}>Մարզ / Քաղ</Typography>
                  <Box style={{ width: '200px', marginBottom: '40px' }}>
                    <CustomSelect
                      placeholder={'Մարզ / Քաղ'}
                      name={'country_name'}
                      handleChange={(val) => {
                        setFieldValue('country_name', val[0]);
                      }}
                      arr={newArrayCities}
                      value={values.country_name ? values.country_name : ''}
                    />
                  </Box>
                  <Typography variant={'h5'}>Հասցե</Typography>

                  <Box style={{ width: '70%' }}>
                    <CustomInput
                      name={'address'}
                      placeholder="հասցե/փողոց/բնակարան կամ տուն"
                      handleChange={(val) => setFieldValue('address', val)}
                      value={values.address ? values.address : ''}
                    />
                  </Box>
                  {status === 'executor' && (
                    <>
                      <Typography
                        variant={'h5'}
                        sx={{
                          fontSize: '18px !important',
                          fontWeight: '500 !important',
                          color: '#000 !important',
                          mt: '30px !important',
                        }}>
                        Հաճախորդներ այցելելու տարածքներ
                      </Typography>
                      <CustomDivider />
                      <Box sx={{ marginBottom: '40px' }}>
                        <FieldArray name={'working_region'}>
                          {({ push }) => (
                            <>
                              <Typography variant={'h5'}>Տարածաշրջան</Typography>
                              <SelectWithCheckbox
                                isAll={true}
                                options={executorWorkRegion}
                                setSelectedData={(val = []) => {
                                  // for (const element of val) {
                                  //   values.working_region =
                                  //     values.working_region.filter(
                                  //       (val) =>
                                  //         val.executorwork_region.value ===
                                  //         val.value
                                  //     );
                                  // }
                                  values.working_region = [];
                                  Object.entries(val).forEach((item) => {
                                    const value = get(item, '[1]', '');
                                    let data = {
                                      executorwork_region: value,
                                    };
                                    push(data);
                                  });
                                }}
                                value={values.working_region}
                              />
                              {setData(values.working_region)}
                              {!!values.working_region.length && (
                                <Box
                                  sx={{
                                    display: 'flex',
                                    gap: '5px',
                                    flexWrap: 'wrap',
                                    mt: 1,
                                  }}>
                                  {values.working_region.map((el) => (
                                    <Box
                                      key={el.executorwork_region.value}
                                      sx={{
                                        backgroundColor: '#EBEBEB',
                                        margin: '0 10px 10px 0',
                                        padding: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}>
                                      <Typography
                                        variant={'h4'}
                                        sx={{
                                          whiteSpace: 'nowrap',
                                        }}>
                                        {el.executorwork_region.value}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              )}
                              <Box sx={{ mt: 1 }}>
                                <Typography variant={'h5'}>Մարզ / Քաղ</Typography>
                                <SelectWithCheckbox
                                  options={executorRayonsWorking}
                                  setSelectedData={(val = []) => {
                                    let value;
                                    for (const elem of val) {
                                      value = values.working_region.map((el) => {
                                        if (el.executorwork_region.id === elem.region_id) {
                                          if (!el.working_rayons) {
                                            return {
                                              ...el,
                                              working_rayons: [
                                                {
                                                  id: elem.id,
                                                  working_rayon: elem.value,
                                                },
                                              ],
                                            };
                                          } else {
                                            return {
                                              ...el,
                                              working_rayons: [
                                                {
                                                  id: elem.id,
                                                  working_rayon: elem.value,
                                                },
                                                ...el.working_rayons,
                                              ],
                                            };
                                          }
                                        }
                                        return el;
                                      });
                                    }
                                    values.working_region = value;
                                  }}
                                  value={[]}
                                />
                              </Box>
                            </>
                          )}
                        </FieldArray>
                      </Box>
                    </>
                  )}
                </>
              )}
              <>
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
											variant='contained'
											type={"submit"}
											style={{
												cursor: "pointer",
												minWidth: 0,
											}}
										>
											Сохранить
										</Button>
									</Box>
								)} */}
              </>
            </form>
          );
        }}
      </Formik>
    </Card>
  );
};

export default DistrictsAndAddressesEdit;
