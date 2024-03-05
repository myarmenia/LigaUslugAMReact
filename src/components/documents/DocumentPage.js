import { Avatar, Box, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import pdfImg from '../documents/pdf.png';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/reducers/AuthReducer';
import { instance } from '../../store/api/api';
import { useNavigate } from 'react-router-dom';

const filterFile = (arr = [], val = '') => {
   if (val.length > 2) {
      return arr.filter(({ description }) =>
         description?.toLowerCase().includes(val?.toLowerCase()),
      );
   }
   return arr;
};

const DocumentPage = () => {
   const [value, setValue] = useState('');
   const [data, setData] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (!data) {
         dispatch(setLoading(true));
         (async function () {
            await instance
               .get('v1/pages/get-contract-document')
               .then((res) => {
                  setData(res.data.message);
               })
               .catch((err) => {
                  console.log(err);
                  navigate(-1);
               })
               .finally(() => {
                  dispatch(setLoading(false));
               });
         })();
      }
   }, [data, dispatch, navigate]);
   return (
      <>
         <Container
            sx={{
               maxWidth: '1450px',
               paddingTop: '120px',
               height: '100%',
               pb: 4,
               overflowX: 'hidden',
               '@media (max-width: 900px)': {
                  paddingTop: '90px',
               },
            }}>
            <Box sx={{ textAlign: 'center' }}>
               <Typography
                  sx={{
                     fontSize: '40px',
                     fontWeight: '500',
                     lineHeight: '46px',
                     color: '#EA004F',
                     '@media (max-width: 710px)': {
                        fontSize: '35px',
                     },
                  }}>
                  Փաստաթղթեր
               </Typography>

               <TextField
                  variant="outlined"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  sx={{
                     width: '654px',
                     height: '50px',
                     paddingTop: '47px',
                     '@media (max-width: 710px)': {
                        width: '100%',
                     },
                     '&.Mui-focused fieldset': {
                        borderColor: 'gray',
                        borderRadius: '20px',
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
                        borderRadius: '10px',
                     },
                  }}
                  placeholder="Որոնում"
                  inputProps={{
                     sx: {
                        padding: '10px 10px',
                     },
                  }}
                  InputProps={{
                     endAdornment: (
                        <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.25)' }} fontSize="medium" />
                     ),
                  }}
               />
            </Box>
            <Box sx={{ paddingTop: '100px' }}>
               {Array.isArray(data) &&
                  filterFile(data, value).map((el) => (
                     <a
                        key={el.id}
                        download={'test.js'}
                        rel="noopener noreferrer"
                        href={`${process.env.REACT_APP_DOWNLOAD_FILE}get-file?path=${el.contract_path}`}
                        target="_blank"
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Box sx={{ display: 'flex', paddingBottom: '34px', cursor: 'pointer' }}>
                           <Avatar
                              src={pdfImg}
                              sx={{ width: '28px', height: '100%', paddingRight: '20px' }}
                              variant="rounded"
                           />
                           <Typography
                              sx={{
                                 wordBreak: 'break-all',
                                 color: '#4e5151',
                                 '&:hover': {
                                    color: '#000',
                                 },
                              }}>
                              {el.description}
                           </Typography>
                        </Box>
                     </a>
                  ))}
            </Box>
         </Container>
      </>
   );
};

export default DocumentPage;
