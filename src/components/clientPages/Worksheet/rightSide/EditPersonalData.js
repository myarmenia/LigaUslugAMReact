import * as React from 'react';
import { useEffect, useState } from 'react';
import { useEditCardStyles } from '../styles/EditCardStyles';
import CustomDatePicker from '../../../UI/datePicker/CustomDatePicker';
import Card from '@mui/material/Card';
import { FileSVG } from '../../../../assets/svg/Profile/FileSVG';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../../UI/customInput/CustomInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CircularProgress, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Stack from '@mui/material/Stack';
import { updatePersonalData } from '../../../../store/actions/ProfileDataActions';
import moment from 'moment';
import { resetPartReducer } from '../../../../store/reducers/ProfileDataReducer';
import Button from '@mui/material/Button';
import save from '../../../../assets/image/save.svg';

const validateInInput = (value, isLastName) => {
  if (value.length === 0) {
    return 'Պարտադիր դաշտ';
  } else if (value.length < 3) {
    return `${isLastName ? 'Ազգանունը' : 'Անուն'} օգտվողը պետք է պարունակի առնվազն 3 նիշ`;
  } else if (value.length > 20) {
    return `${isLastName ? 'Ազգանունը' : 'Անուն'} օգտվողի անունը պետք է պարունակի ոչ ավելի, քան 20 նիշ`;
  } else {
    return '';
  }
};

const EditPersonalData = ({ setEditPersonallyData, setOpenToaster }) => {
  const classes = useEditCardStyles();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status } = useSelector((state) => state.auth);
  const { user, successWork, error } = useSelector((state) => state.profile);
  const [gender, setGender] = React.useState(user?.gender ? user?.gender : user[0]?.gender);
  const [data, setData] = React.useState(
    user?.birth_date
      ? user?.birth_date
      : user[0]?.birth_date
      ? user[0]?.birth_date
      : moment().format('YYYY-MM-DD'),
  );
  const [about, setAbout] = useState(user?.about_me ? user?.about_me : '');
  const [name, setName] = useState(user?.name ? user?.name : user[0]?.name);
  const [errName, setErrName] = useState('');
  const [lastName, setLastName] = useState(user?.last_name ? user?.last_name : user[0]?.last_name);
  const [errLastName, setErrLastName] = useState('');
  const [isSubmitedinInput, setIsSubmitedinInput] = useState(false);

  const executorData = {
    name: name,
    last_name: lastName,
    gender: gender,
    birth_date: moment(data).format('YYYY-MM-DD'),
    about_me: about,
  };
  const clientData = {
    name: name,
    last_name: lastName,
    gender: gender,
    birth_date: moment(data).format('YYYY-MM-DD'),
  };
  const sendData = status === 'executor' ? executorData : clientData;
  const sendPersonalData = async () => {
    window.ym(91484981, 'reachGoal', 'zayavka');
    setIsSubmitting(true);
    await dispatch(updatePersonalData(sendData));
    setEditPersonallyData(false);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 5000);
  };
  useEffect(() => {
    if (isSubmitedinInput && name) {
      setErrName(validateInInput(name));
    } else if (isSubmitedinInput && !name) {
      setErrName(validateInInput(''));
    }
  }, [isSubmitedinInput, name]);
  useEffect(() => {
    if (isSubmitedinInput && lastName) {
      setErrName(validateInInput(lastName, true));
    } else if (isSubmitedinInput && !lastName) {
      setErrName(validateInInput(''));
    }
  }, [isSubmitedinInput, lastName]);
  useEffect(() => {
    if (successWork) {
      setEditPersonallyData(false);
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
  }, [successWork, error, dispatch, setEditPersonallyData, setOpenToaster]);
  return (
    <>
      <Card sx={{ boxShadow: 2 }} className={classes.root}>
        <Box style={{ display: 'flex', alignItems: 'center', marginBottom: 8, gap: '15px' }}>
          <Typography className={classes.title}>Անձնական տվյալներ</Typography>
          {isSubmitting && (
            <Box sx={{ ml: 4 }}>
              <CircularProgress size={20} />
            </Box>
          )}
          {!isSubmitting && (
            <Box
              sx={{  cursor: 'pointer' }}
              onClick={() => {
                if (!validateInInput(name) && !validateInInput(lastName, true)) {
                  sendPersonalData();
                } else {
                  setIsSubmitedinInput(true);
                  setErrName(validateInInput(name));
                  setErrLastName(validateInInput(lastName, true));
                }
              }}
              >
              {/* <Button
                color="success"
                onClick={() => {
                  if (!validateInInput(name) && !validateInInput(lastName, true)) {
                    sendPersonalData();
                  } else {
                    setIsSubmitedinInput(true);
                    setErrName(validateInInput(name));
                    setErrLastName(validateInInput(lastName, true));
                  }
                }}
                disabled={isSubmitting}
                variant="contained">
                Сохранить
              </Button> */}
              <img src={save} alt="save" />
            </Box>
          )}
        </Box>
        <Box style={{ background: '#808080', height: 2 }} />
        <Box className={classes.inputContainer}>
          {status === 'executor' && (
            <Box>
              <Typography variant={'h5'}>Անուն</Typography>
              <CustomInput
                placeholder={'Անուն'}
                value={name}
                handleChange={setName}
                touched={true}
                error={errName}
                position={true}
              />
            </Box>
          )}
          {/* <Typography variant={"h5"}>Ազգանունը</Typography>
          <CustomInput
            placeholder={"Ազգանունը"}
            value={lastName}
            handleChange={setLastName}
            touched={true}
            error={errLastName}
            position={true}
          /> */}
          <Typography variant={'h5'}>Սեռ</Typography>
        </Box>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}>
          <Stack direction={{ xs: 'column', sm: 'row' }}>
            <FormControlLabel
              value="իգական"
              control={
                <Radio
                  size={'small'}
                  sx={{
                    color: '#4B9A2D',
                    '&.Mui-checked': {
                      color: '#4B9A2D',
                    },
                  }}
                />
              }
              label="իգական"
            />
            <FormControlLabel
              value="Արական"
              control={
                <Radio
                  size={'small'}
                  sx={{
                    color: '#4B9A2D',
                    '&.Mui-checked': {
                      color: '#4B9A2D',
                    },
                  }}
                />
              }
              label="Արական"
            />
          </Stack>
        </RadioGroup>
        <Typography variant={'h5'} mb={1}>
          Дата рождения
        </Typography>
        <Box style={{ width: '200px' }}>
          <CustomDatePicker maxDate={true} value={data} fun={(val) => setData(val)} />
        </Box>
        {status === 'executor' && (
          <Box>
            <Typography mb={1} variant={'h5'}>
              Իմ մասին
            </Typography>
            <CustomInput placeholder={'Իմ մասին'} value={about} handleChange={(e) => setAbout(e)} />
          </Box>
        )}
      </Card>
    </>
  );
};
export default EditPersonalData;
