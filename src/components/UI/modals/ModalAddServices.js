import {useDispatch, useSelector} from "react-redux"
import React, {useState} from "react"
import {Checkbox, Dialog, IconButton} from "@mui/material"
import Box from "@mui/material/Box"
import {CloseSvg} from "../../../assets/svg/CloseSvg"
import Button from "@mui/material/Button"
import {addListToExecutorCategory} from "../../../store/reducers/FilterOrdersReducer"

const ModalAddServices = ({open, setOpen}) => {
	const handleClose = () => setOpen(false)
	const dispatch = useDispatch()
	const {category} = useSelector(state => state.header.header)
	const [selectedCategories, setSelectedCategories] = useState([])
	const {
		categories: {executor_categories},
	} = useSelector(state => state.filterOrders)
	if (!open) {
		return null
	}
	return (
		<Dialog
			maxWidth={false}
			open={true}
			onClose={handleClose}
			sx={{
				".MuiDialog-paper": {
					borderRadius: "24px",
					boxShadow: "4px 4px 10px 0px #00000026",
				},
			}}
		>
			<Box sx={{pl: "32px", pr: "32px", pb: "30px"}}>
				<Box
					sx={{
						borderBottom: "1px solid #808080",
						display: "flex",
						alignItems: "center",
						pb: "17px",
						pt: "17px",
					}}
				>
					<Box sx={{display: "flex", flex: 1, justifyContent: "center"}}>
						<Box
							sx={{
								fontSize: "24px",
								lineHeight: "28px",
								fontWeight: 500,
								fontFamily: "Roboto",
							}}
						>
							Ավելացրեք ծառայություն
						</Box>
					</Box>
					<IconButton onClick={handleClose}>
						<CloseSvg />
					</IconButton>
				</Box>
				{/*search body*/}
				<Box
					sx={{
						pt: "27px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						position: "relative",
					}}
				>
          <Box></Box>
					<Box sx={{maxWidth: "350px"}}>
						{category
							?.filter(
								temp =>
									!executor_categories?.some(
										temp1 =>
											temp1.category_name === temp.category_name,
									),
							)
							.map(el => {
								return (
									<Box
										key={el.id}
										sx={{
											display: "flex",
											justifyContent: "flex-start",
											alignItems: "center",
											width: "100%",
										}}
									>
										<Checkbox
											checked={selectedCategories.some(
												temp =>
													temp.category_name === el.category_name,
											)}
											onChange={event => {
												if (event.target.checked) {
													setSelectedCategories(prev => [
														...prev,
														{category_name: el.category_name},
													])
												} else {
													setSelectedCategories(prev =>
														prev.filter(
															elem =>
																elem.category_name !==
																el.category_name,
														),
													)
												}
											}}
										/>
										<Box>{el.category_name}</Box>
									</Box>
								)
							})}
					</Box>
					<Box sx={{display: "flex", gap: "10px", pt: "24px"}}>
						<Button
							style={{textTransform: "none"}}
							sx={{
								background: "#EBEBEB",
								color: "#445E77",
								width: "175px",
								"&:hover": {background: "#EBEBEB"},
							}}
							onClick={() => {
								handleClose()
							}}
						>
							Չեղարկել
						</Button>
						<Button
							style={{textTransform: "none"}}
							disabled={!selectedCategories.length}
							sx={{
								background: "#445E77",
								color: "#FFFFFF",
								width: "175px",
								"&:hover": {background: "#445E77"},
							}}
							onClick={() => {
								dispatch(addListToExecutorCategory(selectedCategories))
								handleClose()
								setSelectedCategories([])
							}}
						>
							Ավելացնել
						</Button>
					</Box>
				</Box>
			</Box>
		</Dialog>
	)
}
export default ModalAddServices
