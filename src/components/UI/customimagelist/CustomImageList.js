import React, {useCallback, useEffect, useState} from "react"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import {Box, makeStyles} from "@material-ui/core"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import ImageListItemBar from "@mui/material/ImageListItemBar"
import {CloseSvg} from "../../../assets/svg/CloseSvg"
import failImg from "../../../assets/file.svg"
export const useStyles = makeStyles({
	img: {
		"& .MuiImageListItem-img": {
			width: 168,
		},
	},
	addBtn: {
		width: 168,
		height: 113,
		backgroundColor: "lightgray",
		fontSize: 40,
		fontWeight: 300,
		"&:hover": {
			background: "#C4C4C4",
		},
	},
})

const breakpoints = {
	xs: 0,
	sm: 600,
	md: 960,
	lg: 1280,
	xl: 1920,
}
const getColumns = width => {
	if (width < breakpoints.sm) {
		return 1
	} else if (width < breakpoints.md) {
		return 1
	} else if (width < breakpoints.lg) {
		return 4
	} else if (width < breakpoints.xl) {
		return 4
	} else {
		return 1
	}
}
const idImg = () => Math.random().toString()

const CustomImageList = ({
	imageData = [],
	remove,
	push,
	show = true,
	education = false,
	isTaskImages,
}) => {
	const [columns, setColumns] = useState(getColumns(window.innerWidth))
	const updateDimensions = useCallback(() => {
		setColumns(getColumns(window.innerWidth))
	}, [setColumns])
	// .peg,.jpg,.png,.gif,.csv,.txt,.pdf,.docx,.DOCX,.JPEG,.JPG,.PNG,.GIF,.CSV,.TXT,.PDF file
	useEffect(() => {
		window.addEventListener("resize", updateDimensions)
		return () => window.removeEventListener("resize", updateDimensions)
	}, [updateDimensions])
	const classes = useStyles()
	return (
		<ImageList cols={columns} className={classes.img}>
			{imageData?.map((item, i) => {
				const fileName = item?.image_name?.toLowerCase()
				const isTxtFile =
					fileName?.includes(".csv") ||
					fileName?.includes(".txt") ||
					fileName?.includes(".pdf") ||
					fileName?.includes(".docx")
				const image_name =
					item.image_name || item?.certificate || item.portfolio_pic
				return (
					<Box key={idImg()} sx={{position: "relative"}}>
						<ImageListItem sx={{maxWidth: "fit-content"}} key={idImg()}>
							<img
								{...(isTaskImages
									? {
											src: !isTxtFile
												? `${process.env.REACT_APP_IMG_TASK}${item.image_name}`
												: failImg,
									  }
									: {})}
								srcSet={
									education
										? item?.certificate_base
										: item?.portfoliopic_base
								}
								style={{
									// width: "-webkit-fill-available",
									cursor: image_name ? "pointer" : "default",
								}}
								onClick={() => {
									if (image_name) {
										const a = document.createElement("a")
										a.style = "display: none"
										a.classList.add("test")
										a.setAttribute(
											"href",
											item.image_name
												? `${process.env.REACT_APP_IMG_TASK}${image_name}`
												: item?.certificate
												? `${process.env.REACT_APP_IMG_EXECUTOR_CERTEFICATE}${image_name}`
												: item?.portfolio_pic
												? `${process.env.REACT_APP_IMG_EXECUTOR_POTRFOLIOS}${image_name}`
												: "",
										)
										a.setAttribute("target", "_blank")
										a.click()
										a.remove()
									}
								}}
								alt={"title"}
								loading='lazy'
							/>
							{show && (
								<ImageListItemBar
									sx={{
										background:
											"linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
											"rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
										zIndex: "100000000",
									}}
									position='top'
									actionPosition='right'
								/>
							)}
							<IconButton
								onClick={() => remove(i)}
								sx={{
									color: "white",
									position: "absolute",
									top: 0,
									right: 0,
									zIndex: 1000000000,
								}}
							>
								<CloseSvg color={"#fff"} size={12} />
							</IconButton>
						</ImageListItem>
					</Box>
				)
			})}
			{show && (
				<ImageListItem>
					<input
						name={"photo"}
						accept='image/*'
						style={{display: "none"}}
						id='raised-button-file'
						multiple
						type='file'
						onChange={e => {
							const fileReader = new FileReader()
							fileReader.onload = () => {
								if (fileReader.readyState === 2) {
									push(fileReader.result)
								}
							}
							if (e.target.files[0]) {
								fileReader.readAsDataURL(e.target.files[0])
							}
						}}
					/>
					<label htmlFor='raised-button-file'>
						<Button className={classes.addBtn} component='span'>
							+
						</Button>
					</label>
				</ImageListItem>
			)}
		</ImageList>
	)
}
export default CustomImageList
