import React from 'react';
import {useInfoCardStyles} from "../../../../../../globalStyles/InfoCardStyles";
import Card from "@mui/material/Card";
import CustomImageList from "../../../../../UI/customimagelist/CustomImageList";
import {imageData} from "../../../../../../utils/data/imagedata/ImageData";
import Button from "@mui/material/Button";
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const PortfolioData = ({editPortfolio, setEditPortfolio}) => {
    const classes = useInfoCardStyles();
    return (
        <Card sx={{ boxShadow: 2 }} className={classes.root}>
            <Box
                x style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}>
                <Typography className={classes.title}>
                        Портфолио
                </Typography>
                    <Box style={{cursor: "pointer", padding: '0 0 7px 20px'}}
                         onClick={() => setEditPortfolio(true)}>
                        <Button color='success'
                                                variant="contained">Изменить</Button>
                    </Box>
            </Box>
            <CustomDivider />
            <Typography variant={"h5"}>
                Фотографии
            </Typography>
            <CustomImageList imageData={imageData} />
               <Typography variant={"h5"}>
                Ссылки
            </Typography>
                <Box>
                    <Typography style={{marginBottom: '10px'}} variant={'h6'}>
                        https://www.figma.com/file/L3cXWC6jCbT4VUn2GXKOPJ/
                    </Typography>
                    <Typography variant={'h6'}>
                        https://www.figma.com/file/L3cXWC6jCbT4VUn2GXKOPJ/
                    </Typography>
                </Box>
                <Box>

                </Box>
        </Card>
    )
}

export default PortfolioData;
