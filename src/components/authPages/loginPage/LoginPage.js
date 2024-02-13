import React, {useEffect, useRef, useState} from "react"
import Checkbox from "@mui/material/Checkbox"
import img from "../../../assets/image/authImg.jpg"
import Box from "@mui/material/Box"
import {Formik} from "formik"
import CustomInput from "../../UI/customInput/CustomInput"
import {useDispatch, useSelector} from "react-redux"
import {Login} from "../../../store/actions/AuthActions"
import BlueButton from "../../UI/CustomButtons/BlueButton"
import {useNavigate} from "react-router-dom"
import {FormControlLabel, Radio, RadioGroup} from "@mui/material"
import Typography from "@mui/material/Typography"
import {useStyles} from "../../../globalStyles/AuthStyles"
import {GreenArrowSvg} from "../../../assets/svg/intro/GreenArrowSvg"
import {LoginValidation} from "../../../utils/validation/LoginValidation"
import Toaster from "../../UI/toaster/Toaster"
import {changeStatus, resetAuth} from "../../../store/reducers/AuthReducer"
import ModalForget from "../../UI/modals/ModalForget"

const radio = {
	color: "#4B9A2D",
	"&.Mui-checked": {
		color: "#4B9A2D",
	},
}
const LoginPage = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const formikRef = useRef({})
	const [remember, setRemember] = useState(false)
	const {
		load,
		error,
		success,
		message,
		forgetErrorError,
		successWork,
		loadForget,
	} = useSelector(state => state.auth)
	const [open, setOpen] = useState(false)
	const [openModalForget, setOpenModalForget] = useState(false)
	const [userStatus, setUserStatus] = useState("client")
	const HandleSvg = () => {
		navigate("/")
	}
	useEffect(() => {
		if (error) {
			setOpen(true)
			dispatch(resetAuth())
		}
		if (success) {
			navigate("/")
			formikRef.current.resetForm()
			dispatch(resetAuth())
		}
	}, [
		success,
		error,
		message,
		successWork,
		forgetErrorError,
		dispatch,
		navigate,
	])

	useEffect(() => {
		setTimeout(() => {
			setOpen(false)
			dispatch(resetAuth())
		}, 6000)
	}, [dispatch])
	return (
		<Box className={classes.root}>
			<ModalForget
				load={loadForget}
				setOpenToaster={setOpen}
				open={openModalForget}
				setOpen={setOpenModalForget}
			/>
			<Box>
				<img alt='BackImage' src={img} className={classes.img} />
			</Box>
			<Box className={classes.container}>
				<Toaster
					error={forgetErrorError}
					success={successWork}
					message={message}
					open={open}
					setOpen={setOpen}
				/>
				<Box
					onClick={HandleSvg}
					sx={{
						position: "absolute",
						left: "50px",
						top: "20px",
						transform: "rotate(180deg)",
						cursor: "pointer",
						"@media (max-width: 650px)": {
							display: "none",
						},
					}}
				>
					<GreenArrowSvg color={"#25588d"} />
				</Box>
				<p className={classes.title}>Մուտք գործել</p>
				<Formik
					innerRef={formikRef}
					initialValues={{email: "", password: ""}}
					validationSchema={LoginValidation}
					onSubmit={async values => {
						// window.ym(91484981, "reachGoal", "zayavka")
						await dispatch(Login(values))
						await dispatch(changeStatus(userStatus))
					}}
				>
					{({values, errors, touched, setFieldValue, handleSubmit}) => (
						<form onSubmit={handleSubmit}>
							<Box className={classes.subContainer}>
								<CustomInput
									label={"էլ փոստ*"}
									width={"70%"}
									placeholder={"էլ փոստ"}
									name={"email"}
									value={values.email}
									handleChange={val => setFieldValue("email", val)}
									touched={touched.email}
									error={errors.email}
									height='43px'
								/>
								<CustomInput
									label={"Գաղտնաբառ*"}
									placeholder={"Գաղտնաբառ"}
									width={"70%"}
									name='password'
									type='password'
									value={values.password}
									handleChange={val => setFieldValue("password", val)}
									touched={touched.password}
									error={errors.password}
									onKeyPress={event => {
										if (event.key === "Enter") {
											handleSubmit()
										}
									}}
								/>
								<Box
									sx={{
										mb: "3px",
										padding: "0 20px",
										justifyContent: "center",
										alignItems: "center",
										display: "flex",
									}}
								>
									Ընտրեք այն գրասենյակը, որը ցանկանում եք գնալ
								</Box>
								<RadioGroup
									aria-label='status'
									name='controlled-radio-buttons-group'
									value={userStatus}
									sx={{
										flexDirection: "initial",
										padding: "0 20px",
										justifyContent: "center",
										alignItems: "center",
									}}
									onChange={e => setUserStatus(e.target.value)}
								>
									<FormControlLabel
										value='executor'
										control={<Radio sx={radio} size={"small"} />}
										label='Կատարողի գրասենյակ'
									/>
									<FormControlLabel
										value='client'
										control={<Radio sx={radio} size={"small"} />}
										label='Հաճախորդի գրասենյակ'
									/>
								</RadioGroup>

								<Typography
									style={{cursor: "pointer"}}
									onClick={() => setOpenModalForget(true)}
									variant={"h6"}
									className={classes.textBtn}
								>
									Մոռացել եք Ձեր գաղտնաբառը
								</Typography>
								{/* <Typography
									style={{cursor: "pointer"}}
									onClick={() => navigate("/registration")}
									variant={"h6"}
									className={classes.textBtn}
								>
									Зарегистрироваться на сайте
								</Typography> */}
								<FormControlLabel
									// className={classes.checkbox}
									control={
										<Checkbox
											onChange={e => {
												setRemember(!remember)
											}}
											checked={remember}
											value={remember}
											name={"remember"}
										/>
									}
									label='Հիշել'
									labelPlacement='end'
								/>
								<Box className={classes.footer}>
									<BlueButton
										action={handleSubmit}
										load={load}
										label={"Մուտք"}
                    backgroundColor={'#FF6B00'}
									/>
                    <Box style={{ paddingTop: '25px', display: 'flex', gap: '5px' }}>
                    <Typography className={classes.registrTitleBlack}>
                    Դեռ չունե՞ք հաշիվ:
                    </Typography>
                    <Typography
                      onClick={() => navigate('/registration')}
                      className={classes.registrTitleGreen}>
                      Ստեղծել
                    </Typography>
                  </Box>
								</Box>
							</Box>
						</form>
					)}
				</Formik>
			</Box>
		</Box>
	)
}

export default LoginPage
