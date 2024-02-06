import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { Checkbox, ListItemIcon, ListItemText, Select } from '@mui/material';

const useStyles = makeStyles({
   root: {
      //margin: theme.spacing(1),
      width: 200,
      '& .MuiOutlinedInput-root': {
         '& fieldset': {
            border: '1px solid #808080',
            borderRadius: '10px',
            //width: '100%',
         },
         '&:hover fieldset': {
            borderColor: 'blue',
         },
         '&.Mui-focused fieldset': {
            borderColor: 'gray',
         },
         '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #808080',
            borderRadius: '10px',
         },
         '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #808080',
            borderRadius: '10px',
         },
         //focus
         '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid blue',
         },
         '& .MuiOutlinedInput-root': {
            '& fieldset': {
               border: '1px solid #808080',
               borderRadius: '10px',
               //width: '100%',
            },
            '&:hover fieldset': {
               borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
               borderColor: 'gray',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
               border: '1px solid #808080',
               borderRadius: '10px',
            },
            '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
               border: '1px solid #808080',
               borderRadius: '10px',
            },
            //focus
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
               border: '1px solid blue',
            },
         },
      },
   },
   indeterminateColor: {
      color: '#f50057',
   },
   selectAllText: {
      fontWeight: 500,
   },
   selectedAll: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
         backgroundColor: 'rgba(0, 0, 0, 0.08)',
      },
   },
});

const SelectWithCheckbox = ({ options, setSelectedData, value, onFocus, onBlur, isAll }) => {
   const classes = useStyles();
   const newSelected = [...value]?.map(function (elem) {
      return elem.executorwork_region;
   });
   const [selected, setSelected] = useState(newSelected);
   const isAllSelected = options.length > 0 && selected.length === options.length;

   const handleChange = (event) => {
      const value = event.target.value;

      if (value.includes('all')) {
         setSelectedData(selected.length === options.length ? [] : options);
         setSelected(selected.length === options.length ? [] : options);
         return;
      }
      setSelectedData(value);
      setSelected(value);
   };

   //   {
   //     "region_and_address":[
   //         {
   //             "personal_address":[
   //                     {"region":"Moscow6","address":"ylica2","country_name":""}
   //                 ],

   //              "working_region":[
   //                 {"executorwork_region":"Красноярский край",
   //                 "working_rayons":[
   //                                     {
   //                                         "id":1,
   //                                         "working_rayon":"Абанский район"
   //                                     },
   //                                     {
   //                                      "id":3,
   //                                      "working_rayon":"Балахтинский район"
   //                                      }
   //                                   ]
   //                 },
   //                 {"executorwork_region":"Новосибирская область",
   //                 "working_rayons":[
   //                                     {
   //                                         "id":1,
   //                                         "working_rayon":"Абанский район"
   //                                     },
   //                                     {
   //                                      "id":3,
   //                                      "working_rayon":"Балахтинский район"
   //                                      }
   //                                   ]
   //                 }

   //                 ]

   //         }

   //     ]
   // }
   return (
      <FormControl className={classes.root}>
         <Select
            multiple
            onFocus={onFocus}
            onBlur={onBlur}
            value={selected}
            onChange={handleChange}
            renderValue={(selected) => {
               let str = '';
               if (!selected[0].value) {
                  str = selected.join(', ');
               } else {
                  str = selected.map((el) => el.value).join(', ');
               }
               return str;
            }}>
            {isAll ? (
               <MenuItem
                  value="all"
                  classes={{
                     root: isAllSelected ? classes.selectedAll : '',
                  }}>
                  <ListItemIcon>
                     <Checkbox
                        classes={{ indeterminate: classes.indeterminateColor }}
                        checked={isAllSelected}
                        indeterminate={selected.length > 0 && selected.length < options.length}
                     />
                  </ListItemIcon>
                  <ListItemText
                     classes={{ primary: classes.selectAllText }}
                     primary="Ընտրեք բոլորը"
                  />
               </MenuItem>
            ) : null}

            {options?.map((option, i) => (
               <MenuItem key={i} value={option}>
                  <ListItemIcon>
                     <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option?.value ? option?.value : option} />
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};

export default SelectWithCheckbox;
