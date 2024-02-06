import React, { useEffect, useRef, useState } from 'react';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import Card from '@mui/material/Card';
import CustomImageList from '../../../../../UI/customimagelist/CustomImageList';
import AddButton from '../../../../../UI/CustomButtons/AddButton';
import { FieldArray, Formik } from 'formik';
import CustomInput from '../../../../../UI/customInput/CustomInput';
import { TrashSvg } from '../../../../../../assets/svg/TrashSvg';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { updatePortfolioData } from '../../../../../../store/actions/ProfileDataActions';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { resetPartReducer } from '../../../../../../store/reducers/ProfileDataReducer';
import { CircularProgress, InputAdornment } from '@mui/material';
import { object, array, string } from 'yup';
import save from '../../../../../../assets/image/save.svg';

const PortfolioEdit = ({ setEditPortfolio, setOpenToaster }) => {
  const classes = useInfoCardStyles();
  const dispatch = useDispatch();
  const { profile = {}, successWork, error } = useSelector((state) => state.profile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refForm = useRef();
  useEffect(() => {
    if (successWork) {
      setEditPortfolio(false);
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
  }, [successWork, error, dispatch, setEditPortfolio, setOpenToaster]);
  const initialValues = {
    executor_portfolios: get(profile, 'executor_portfolios', [
      {
        id: '',
        portfoliopic_base: '',
        executor_profile_id: '',
      },
    ]).map((portfolio) => pick(portfolio, ['portfoliopic_base'])),
    executor_portfolio_links:
      profile?.executor_portfolio_links?.length > 0
        ? get(profile, 'executor_portfolio_links', [
            {
              id: '',
              executor_profile_id: '',
              executor_portfolio_links: '',
            },
          ]).map((link) => pick(link, ['portfolio_link']))
        : [{ portfolio_link: '' }],
  };
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            executor_portfolio_links: array().of(
              object().shape({
                portfolio_link: string().required('Պարտադիր դաշտ'),
              }),
            ),
          })}
          onSubmit={async (values, action) => {
            window.ym(91484981, 'reachGoal', 'դիմում');
            let formData = new FormData();
            Object.entries(values).forEach((item) => {
              const key = get(item, '[0]', '');
              const value = get(item, '[1]', '');
              formData.append(`${key}[]`, value);
            });
            setIsSubmitting(true);
            dispatch(updatePortfolioData(values));
            // action.resetForm()
          }}>
          {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
            <form onSubmit={handleSubmit} ref={refForm}>
              <Box style={{ display: 'flex', alignItems: 'center', gap:"15px" }}>
                <Typography className={classes.title}>Պորտֆոլիո</Typography>{' '}
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
                <Box sx={{ marginLeft: 5 }}>{isSubmitting && <CircularProgress size={20} />}</Box>
              </Box>
              <CustomDivider />
              <Typography variant={'h5'}>Фотографии</Typography>
              <FieldArray name={'executor_portfolios'}>
                {({ push, remove }) => (
                  <CustomImageList
                    imageData={values.executor_portfolios}
                    push={(val) => push({ portfoliopic_base: val })}
                    remove={remove}
                  />
                )}
              </FieldArray>
              <FieldArray name={'executor_portfolio_links'}>
                {({ push, remove }) => (
                  <Box>
                    {values.executor_portfolio_links?.map((l, index) => (
                      <Box
                        key={index}
                        sx={{
                          marginBottom:
                            !!Object.keys(errors).length &&
                            errors.hasOwnProperty('executor_portfolio_links') &&
                            Array.isArray(errors.executor_portfolio_links) &&
                            errors.executor_portfolio_links[index] &&
                            errors.executor_portfolio_links[index].portfolio_link &&
                            !(values.executor_portfolio_links.length - 1 === index)
                              ? '20px'
                              : 0,
                        }}>
                        <CustomInput
                          placeholder={'Պորտֆոլիո'}
                          touched={
                            !!Object.keys(touched).length &&
                            touched.hasOwnProperty('executor_portfolio_links') &&
                            Array.isArray(touched.executor_portfolio_links) &&
                            touched.executor_portfolio_links[index] &&
                            touched.executor_portfolio_links[index].portfolio_link
                          }
                          error={
                            !!Object.keys(errors).length &&
                            errors.hasOwnProperty('executor_portfolio_links') &&
                            Array.isArray(errors.executor_portfolio_links) &&
                            errors.executor_portfolio_links[index] &&
                            errors.executor_portfolio_links[index].portfolio_link
                          }
                          deletComponent={
                            <InputAdornment>
                              {values.executor_portfolio_links.length !== 1 && (
                                <div style={{ marginTop: '2px' }} onClick={() => remove(index)}>
                                  <TrashSvg />
                                </div>
                              )}
                            </InputAdornment>
                          }
                          name={`executor_portfolio_links[${index}].portfolio_link`}
                          value={l.portfolio_link}
                          handleChange={(val) =>
                            setFieldValue(`executor_portfolio_links[${index}].portfolio_link`, val)
                          }
                        />

                        {values.executor_portfolio_links.length - 1 === index && (
                          <AddButton type="button" fun={() => push({ portfolio_link: '' })} />
                        )}
                      </Box>
                    ))}

                    {/*<AddButton fun={() => push({link: ''})} />*/}
                  </Box>
                )}
              </FieldArray>
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
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default PortfolioEdit;
