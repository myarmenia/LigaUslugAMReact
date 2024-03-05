import Container from '@mui/material/Container';
import React from 'react';
import { Avatar, Box, TextField, Typography, useMediaQuery } from '@mui/material';

function AboutLiga() {
   const lg = useMediaQuery('(max-width:1440px)');
   return (
      <Container maxWidth={lg ? 'lg' : 'xl'}>
         <Box>
            <Typography
               sx={{
                  color: '#EA004F',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: '600',
                  paddingBottom: '52px',
               }}>
               Մեր կայքի մասին
            </Typography>
            <Box
               sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '50px 20px',
                  paddingBottom: '300px',
               }}>
               <Box
                  sx={{
                     display: 'flex',
                     width: '600px',
                     gap: '50px',
                     padding: '50px 20px 50px 50px',
                     border: '1px solid black',
                  }}>
                  <Avatar sx={{ width: '100px', height: '100px' }} />
                  <Box>
                     <Typography sx={{ color: '#000', fontSize: '24px' }}>
                        Վճարման մեթոդներ{' '}
                     </Typography>
                     <Typography>
                        Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող միասնական
                        ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող
                        միասնական ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ
                        զարգացող միասնական ծառայություն է, որը.
                     </Typography>
                  </Box>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     width: '600px',
                     gap: '50px',
                     padding: '50px 20px 50px 50px',
                     border: '1px solid black',
                  }}>
                  <Avatar sx={{ width: '100px', height: '100px' }} />
                  <Box>
                     <Typography sx={{ color: '#000', fontSize: '24px' }}>
                        Վճարման մեթոդներ{' '}
                     </Typography>
                     <Typography>
                        Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող միասնական
                        ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող
                        միասնական ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ
                        զարգացող միասնական ծառայություն է, որը.
                     </Typography>
                  </Box>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     width: '600px',
                     gap: '50px',
                     padding: '50px 20px 50px 50px',
                     border: '1px solid black',
                  }}>
                  <Avatar sx={{ width: '100px', height: '100px' }} />
                  <Box>
                     <Typography sx={{ color: '#000', fontSize: '24px' }}>
                        Վճարման մեթոդներ{' '}
                     </Typography>
                     <Typography>
                        Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող միասնական
                        ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող
                        միասնական ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ
                        զարգացող միասնական ծառայություն է, որը.
                     </Typography>
                  </Box>
               </Box>
               <Box
                  sx={{
                     display: 'flex',
                     width: '600px',
                     gap: '50px',
                     padding: '50px 20px 50px 50px',
                     border: '1px solid black',
                  }}>
                  <Avatar sx={{ width: '100px', height: '100px' }} />
                  <Box>
                     <Typography sx={{ color: '#000', fontSize: '24px' }}>
                        Վճարման մեթոդներ{' '}
                     </Typography>
                     <Typography>
                        Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող միասնական
                        ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ զարգացող
                        միասնական ծառայություն է, որը. Միասնական սպասարկման կենտրոնը հարմար, դինամիկ
                        զարգացող միասնական ծառայություն է, որը.
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Container>
   );
}

export default AboutLiga;
