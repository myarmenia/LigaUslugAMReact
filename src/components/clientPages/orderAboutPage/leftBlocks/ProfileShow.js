import React, {useMemo} from "react"
import SuccessSVG from "../../../../assets/svg/Profile/SuccessSVG"
import InfoSVG from "../../../../assets/svg/Profile/InfoSVG"
import Card from "@mui/material/Card"
import {useOrderAboutStyles} from "../../../../globalStyles/OrderAboutStyles"
import CustomDivider from "../../../UI/customDivider/CustomDivider"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import UserSvg from "../../../../assets/svg/header/UserSvg"
import moment from "moment"
import {Rating} from "@mui/material"

const ProfileShow = ({state}) => {
	const classes = useOrderAboutStyles()
	const reyting = useMemo(() => {
		if (state?.users?.employer_avg_rating) {
			return +state?.users?.employer_avg_rating
		}
		return 0
	}, [state?.users?.employer_avg_rating])
	const deta = useMemo(() => {
		if (state?.users?.created_at) {
			return moment(state?.users?.created_at).format("LL")
		}
		return moment().format("LL")
	}, [state?.users?.created_at])
	return (
		<Card sx={{boxShadow: 2}}>
			<Box className={classes.orderSubBlockSpaceBetween}>
				<Typography variant={"h2"}>Статус профиля</Typography>
			</Box>
			<CustomDivider />
			<Box style={{display: "flex", marginBottom: "10px"}}>
				{state?.users?.img_path ? (
					<Avatar
						src={`${process.env.REACT_APP_IMG_API}${state?.users?.img_path}`}
					/>
				) : (
					<UserSvg />
				)}
				<Box>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							paddingLeft: "15px",
						}}
					>
						<Typography variant={"h6"}>{state?.users?.name}</Typography>
						<InfoSVG size={8} color={"#4B9A2D"} margin={"-5px 0 0 5px"} />
					</div>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: "3px",
							paddingLeft: "15px",
						}}
					>
						<Rating
							value={reyting}
							size={"small"}
							name={"read-only"}
							style={{color: "#FFF066"}}
							readOnly
						/>
						{state?.users?.employer_review_count ? (
							<Typography
								variant={"h4"}
								sx={{
									fontSize: "13px !important",
								}}
							>
								{`(${state?.users?.employer_review_count})`}
							</Typography>
						) : null}
					</Box>
				</Box>
			</Box>
			<Typography
				variant={"h4"}
				style={{marginBottom: "10px", display: "flex"}}
				component='div'
			>
				<SuccessSVG />
				Эл. почта подтверждена
			</Typography>
			<Typography
				style={{marginBottom: "10px", display: "flex"}}
				variant={"h4"}
				component='div'
			>
				{state?.users.phone_status !== "verified" ? (
					<InfoSVG />
				) : (
					<SuccessSVG />
				)}
				Номер подтвержден
			</Typography>
			<Typography
				style={{marginBottom: "10px", display: "flex"}}
				variant={"h4"}
				component='div'
			>
				{state?.users.status !== "Актив" ? <InfoSVG /> : <SuccessSVG />}
				Профиль подтвержден
			</Typography>
			<Typography
				variant='caption'
				style={{fontStyle: "italic", color: "#808080"}}
			>
				В лиге с {deta}
			</Typography>
		</Card>
	)
}
export default ProfileShow
