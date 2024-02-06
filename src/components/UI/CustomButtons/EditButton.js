import React, { useEffect } from 'react';
import { FileSVG } from '../../../assets/svg/Profile/FileSVG';
import PenSvg from '../../../assets/svg/Profile/PenSvg';
import Box from '@mui/material/Box';

const EditButton = ({ condition, editFun, handleSubmit }) => {
   useEffect(() => {}, [condition]);

   const submit = () => {
      if (condition) {
         handleSubmit();
      }
      editFun(!condition);
   };

   return condition ? (
      <Box style={{ cursor: 'pointer', padding: '0 0 7px 20px' }} onClick={submit}>
         <FileSVG color={'#808080'} />
      </Box>
   ) : (
      <Box style={{ cursor: 'pointer', padding: '0 0 7px 20px' }} onClick={submit}>
         <PenSvg />
      </Box>
   );
};

export default EditButton;
