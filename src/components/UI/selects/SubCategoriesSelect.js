import React, {memo} from 'react';
import MenuItem from "@mui/material/MenuItem";
import {makeStyles} from "@material-ui/core";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {FormHelperText, ListSubheader, ListItemButton, Select} from "@mui/material";

export const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18px',
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: "1px solid #808080",
                borderRadius: '10px',
                //width: '100%',
            },
            '&:hover fieldset': {
                borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'gray',
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #808080",
                borderRadius: '10px',
            },
            "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #808080",
                borderRadius: '10px',
            },
            //focus
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "1px solid blue",
            }
        },
    },
    boxInput: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '18px',
    },
    inputText: {
        fontSize: '15px',
        textAlign: 'left',
        width: '100%',
        margin: 0,
    },
});


const SubCategoriesSelect = ({
                                 label, setIndex = () => {
    }, handleChange, placeholder, value, name, touched, error, mt, arr = []
                             }) => {
    const classes = useStyles();


    return (
        <Box className={classes.root}>
            <p style={{marginTop: mt}} className={classes.inputText}>{label}</p>
            <FormControl style={{height: '10px', marginBottom: '10px'}} fullWidth>
                <Select
                    onChange={(e, i) => {
                        handleChange(e.target.value)
                    }}
                    value={value}
                    name={name}
                    error={Boolean(touched && error)}
                    defaultValue={placeholder}
                    renderValue={(value) => {
                        if (value.length > 20) {
                            return value.substring(0, 25) + '...'
                        }
                        return value
                    }}
                >
                    <MenuItem disabled value={placeholder}>{placeholder}</MenuItem>
                    {arr.map((item, i) => {
                        return (
                            // <ListSubheader>{item.category_name}</ListSubheader> Մտածել, թե ոնց մափով անել էտ
                            item.subcategories.map((elem, ind) =>
                            <MenuItem key={i + ' + ' + ind} onClick={() => {
                                setIndex(ind)
                            }} value={elem?.subcategory_name}>
                                {elem.subcategory_name}
                            </MenuItem>))
                    })}
                </Select>
                {touched && error && <FormHelperText style={{
                    color: '#F44336',
                    paddingLeft: '15px',
                    position: 'absolute',
                    right: 0,
                    top: '-20px'
                }}>{error}</FormHelperText>}
            </FormControl>
        </Box>
    )
}

export default memo(SubCategoriesSelect);
