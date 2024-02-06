import React from "react";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CustomDatePicker from "../UI/datePicker/CustomDatePicker";
import CustomInput from "../UI/customInput/CustomInput";
import Box from "@mui/material/Box";
import {FormControlLabel, RadioGroup} from "@mui/material";
import Stack from "@mui/material/Stack";
import {Radio} from "@material-ui/icons";

const PersonalData = () => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const handleChange = (event) => {
  setSelectedValue(event.target.value);
  };
  const [value, setValue] = React.useState('իգական');
  return (
    <Box
      style={{
        boxShadow: " 4px 4px 10px rgba(0, 0, 0, 0.15)",
        borderRadius: "20px",
        padding: "20px 50px",
        width: "40%",
      }}
    >
      <p style={{ fontSize: "24px", fontWeight: 500, whiteSpace: "nowrap" }}>
        Անձնական տվյալներ
      </p>
      <Divider style={{ border: "1px solid #808080", width: "100%" }} />
      <p style={{ color: "#808080", fontSize: "18px" }}>Пол</p>

      <Box className="a1" style={{ display: "flex",flexWrap:'wrap', marginBottom: "25px" }}>
      <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={(e)=>setValue(e.target.value)}
            >
                <Stack
                    direction={{xs: 'column', sm: 'row'}}
                >
                <FormControlLabel value="իգական" control={<Radio size={"small"} sx={{
                    color: "#4B9A2D",
                    '&.Mui-checked': {
                        color: "#4B9A2D",
                    },
                }}/>} label="իգական" />
                <FormControlLabel value="Արական" control={<Radio size={"small"} sx={{
                    color:"#4B9A2D",
                    '&.Mui-checked': {
                        color: "#4B9A2D",
                    },
                }}/>} label="Արական" />
                </Stack>
            </RadioGroup>
      </Box>
      <p style={{ color: "#808080", fontSize: "18px" }}>Ծննդյան ամսաթիվ</p>
      <CustomDatePicker />
      <p style={{ color: "#808080", fontSize: "18px" }}>Իմ մասին</p>
      <TextField
        style={{ width: "100%", borderRadius:'10px' }}
        id="outlined-multiline-static"
        rows={4}
      />
      <CustomInput textArea={true} />
    </Box>
  );
};

export default PersonalData;
