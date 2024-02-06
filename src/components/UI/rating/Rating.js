import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Rating = () => {
    const [value, setValue] = useState(2);
    return (
        <Box style={{display: 'flex', alignItems: 'center'}}>
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Rating
                    name="simple-controlled" 
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    sx={{backgroundColor: 'red'}}
                />
            </Box>
            <Typography style={{fontSize: '20px'}} color={'#808080'}>
                350 մեկ․․.
            </Typography>
        </Box>
    )
}

export default Rating;