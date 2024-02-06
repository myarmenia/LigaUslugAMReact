import { Controller, useForm } from "react-hook-form";
import { useStyles } from "../../../globalStyles/ModalStyles";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { CloseSvg } from "../../../assets/svg/CloseSvg";
import Divider from "@mui/material/Divider";
import { style } from "./ModalPersonalData";
import BasicDatePicker from "../../shared/DatePicker";
import BasicTimePicker from "../../shared/TimpePicker";
import { isValidNumber } from "../../../helper";
import { useDispatch, useSelector } from "react-redux";
import {
  askQuestion,
  leaveNumber,
} from "../../../store/actions/MessageActions";
import {
  selectMessage,
  setMessage,
} from "../../../store/reducers/MessagingReducer";
import PhoneInput from "react-phone-input-2";

const ITEM_STYLE = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
const ER_MESSAGE = {
  color: "red",
};
const BUTTON_STYLE = {
  background: "#445E77",
  color: "white",
  width: "175px",
  "&:hover": { background: "#EBEBEB" },
};
const CONTAINER_STYLE = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
};

function Question({ handleClose }) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.messages.message);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        handleClose();
        dispatch(setMessage(""));
      }, 4000);
    }
  }, [message, dispatch]);
  if (message) {
    return <Typography>{message}</Typography>;
  }
  return (
    <Box sx={CONTAINER_STYLE}>
      <Box>
        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder="Հարց"
          {...register("message", {
            required: "Պարտադիր դաշտ",
          })}
        />
        {errors?.message?.message && (
          <Box sx={ER_MESSAGE}>{errors?.message?.message}</Box>
        )}
      </Box>
      <Box>
        <TextField
          multiline
          fullWidth
          placeholder='էլ.փոստ'
          {...register('էլ.փոստ', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Սխալ էլ.փոստ",
            },
            required: "Պարտադիր դաշտ",
          })}
        />
        {errors?.email?.message && (
          <Box sx={ER_MESSAGE}>{errors?.email?.message}</Box>
        )}
      </Box>
      <Box
        sx={{
          margin: "0 auto",
        }}
      >
        <Button
          onClick={handleSubmit(async (data) => {
            window.ym(91484981, "reachGoal", "zayavka");
            await dispatch(askQuestion(data));
          })}
          sx={BUTTON_STYLE}
          style={{ textTransform: "none" }}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
}

function SendNumber({ handleClose }) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.messages.message);
  const [timeValue, setTimeValue] = useState(null);
  const [dateValue, setDateValue] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
 
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        handleClose();
        dispatch(setMessage(""));
      }, 4000);
    }
  }, [message]);
  if (message) {
    return <Typography>{message}</Typography>;
  }
  return (
    <Box sx={CONTAINER_STYLE}>
      <Box sx={ITEM_STYLE}>
        <Controller
          name="phone_number"
          control={control}
          rules={{
            required: "Պարտադիր դաշտ",
            minLength: {
              value: 11,
              message: "Համարը պետք է պարունակի 11 նիշ",
            },
            maxLength: {
              value: 11,
              message: "Համարը պետք է պարունակի 11 նիշ",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              value={value}
              onChange={onChange}
              dropdownClass="modal_phone_input_in_suport"
              defaultCountry="RU"
              id="phone-input"
              placeholder="7 888 8888888"
              containerStyle={
                {
                  // maxWidth:"400px",
                  // width:"393px",
                  // "@media only screen and (max-width: 600px)":{
                  //   width:"200px",
                  // }
                }
              }
              inputStyle={{
                // width: matches600 ? "394px" : "250px",
                height: "42px",
                background: "none",
              }}
              buttonStyle={{
                background: "none",
                "& hover": {
                  background: "none",
                },
              }}
            />
          )}
        />
        {/* <TextField
          {...register("phone_number", {
            required: "Обезательное поле",
            validate: (value) => {
              let result = value[0] === "+" ? value.substring(1) : value;
              if (!isValidNumber(result)) {
                return "только цыфры";
              }
              if (result.length !== 11) {
                return "номер должен содержать 11 цыфр";
              }
            },
          })}
          placeholder="номер телефона"
        /> */}
        {errors.phone_number?.message && (
          <Box sx={ER_MESSAGE}>{errors.phone_number.message}</Box>
        )}
      </Box>
      <Box sx={ITEM_STYLE}>
        <TextField
          {...register("name", {
            required: "Պարտադիր դաշտ",
          })}
          placeholder="Անուն"
        />
        {errors.name?.message && (
          <Box sx={ER_MESSAGE}>{errors.name.message}</Box>
        )}
      </Box>
      <Box sx={ITEM_STYLE}>
        <BasicDatePicker
          placeholder="Ընտրեք ամսաթիվը"
          pickerProps={{ minDate: new Date() }}
          onChange={(val) => setDateValue(val)}
          value={dateValue}
        />
        {errors.date?.message && (
          <Box sx={ER_MESSAGE}>{errors.date.message}</Box>
        )}
      </Box>
      <Box sx={ITEM_STYLE}>
        <BasicTimePicker
          placeholder="Ընտրեք ժամանակ"
          value={timeValue}
          onChange={(val) => setTimeValue(val)}
        />
        {errors.time?.message && (
          <Box sx={ER_MESSAGE}>{errors.time.message}</Box>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleSubmit(async (data) => {
            window.ym(91484981, "reachGoal", "zayavka");
            await dispatch(
              leaveNumber({
                ...data,
                phone_number: data.phone_number.startsWith("+")
                  ? data.phone_number.substring(1)
                  : data.phone_number,
              })
            );
            // handleClose();
          })}
          sx={BUTTON_STYLE}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
}

export default function ModalSupport({ showModal, setShowModal, isQuestion }) {
  const classes = useStyles();
  const handleClose = () => setShowModal(false);
  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: { xs: 240, sm: 400, md: 500 } }}>
          <Box className={classes.root}>
            <Box className={classes.titleWrap}>
              <Box
                sx={{
                  flex: 1,
                  alignItems: "center",
                  width: { xs: "89%", sm: "70%", md: "70%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant={"h5"}>
                  {isQuestion ? "Հարց տալ" : "Պատվիրել հետզանգ"}
                </Typography>
              </Box>
              <Box onClick={handleClose} style={{ cursor: "pointer" }}>
                <CloseSvg size={15} />
              </Box>
            </Box>
            <Divider
              color={"#808080"}
              style={{ height: 1, margin: "10px 0px" }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "34px",
                padding: "30px",
              }}
            >
              {isQuestion ? (
                <Question {...{ handleClose }} />
              ) : (
                <SendNumber {...{ handleClose }} />
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
