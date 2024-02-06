import React from 'react';
import {useInfoCardStyles} from "../../../../../../globalStyles/InfoCardStyles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ExperienceShowList = ({arr}) => {
    const classes = useInfoCardStyles();
    return (
        <Box style={{display: 'flex', flexWrap: 'wrap'}}>
            {arr.map((item, index) =>
                item.item !== '' ? <Box key={index} className={classes.categoriesBackGround}>
                    <Typography variant={'h4'}>{item.item}</Typography>
                </Box> : ''
            )}
        </Box>
    )
}

export default ExperienceShowList;
