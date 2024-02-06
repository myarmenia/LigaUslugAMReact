import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { instance } from '../../store/api/api';
import { useSpecialist } from './css/useSpecialist';
import SpecialistUser from './SpecialistUser';
// import { AddCategories } from "./addCategories";
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import FilterSpecialist from './FilterSpecialist';
import { getHeaderData } from '../../store/actions/HeaderActions';
const id = () => Math.random().toString();

export const Text = styled('p')({
   margin: 0,
   padding: 0,
   fontFamily: 'Roboto',
   letterSpacing: '0em',
   color: 'red',
});
export async function fetchData(url, action) {
   await instance
      .get(`v1/${url}`)
      .then((res) => {
         if (res.data.executor) {
            return {
               category: !Array.isArray(res.data.category)
                  ? res.data.category
                  : res.data.category[0],
               message: res.data.executor,
               selected_subcategories: res.data.selected_subcategories,
               selected_region: res.data.selected_region,
            };
         } else {
            return res.data;
         }
      })
      .then((data) => {
         action(data);
      })
      .catch((err) => {
         console.log(err);
      });
}

export const FilteredSpecialists = () => {
   const dispatch = useDispatch();
   const [filterBlock, setShowFilterBlock] = useState(true);
   const classes = useSpecialist();
   const location = useLocation();
   const [data, setData] = useState([]);
   const [page, setPage] = useState(1);
   const { auth } = useSelector((state) => state.auth);
   const { category } = useSelector((state) => state.header.header);
   const [subCategories, setSubCategories] = useState(null);
   const [selectSubCategory, setSelectSubCategory] = useState('');



   const navigate = useNavigate();
   useEffect(() => {
      dispatch(getHeaderData());
   }, [dispatch]);

   useEffect(() => {
      if (location.search) {
         setPage(+location.search.slice(location.search.lastIndexOf('=') + 1));
      }
      const locationPath = location.search?.slice(1, location.search?.indexOf('=') + 1) + `${page}`;

      fetchData(locationPath, setData);
   }, [page, location]);
   useEffect(() => {
      if (!subCategories && data?.category?.category_name) {
         setSubCategories(data?.category?.subcategories);
      }
   }, [data?.category?.category_name]);
   useEffect(() => {
      if (!selectSubCategory) {
         if (!Array.isArray(data?.selected_subcategory)) {
            setSelectSubCategory();
         }
      }
   }, [selectSubCategory]);
   const media360 = useMediaQuery('(min-width:360px)');
   // const lg = useMediaQuery('(max-width:1440px)');
   // const size = useMediaQuery('(max-width:1140px)');

   return (
      <Container>
         <Box
            className={classes.container}
            sx={{
               minHeight: 'calc(100vh - 376px) !important',
               paddingTop: auth ? '110px' : '15px',
            }}>
            <Box>
               {/* sx={{  }} */}

               <FilterSpecialist
                  subCategotis={subCategories} //sra mej subkategorianerna
                  selctSubCategotis={
                     !Array.isArray(data?.selected_subcategory) && data?.selected_subcategory
                        ? [data?.selected_subcategory?.subcategory_name]
                        : data?.selected_subcategories //yntrvac subkatgorian
                  }
                  setShowFilterBlock={setShowFilterBlock}
                  selectedCategories={data?.category?.category_name} //yntrvac kategorian verevi
                  region={data?.selected_region}
                  id={data?.category?.id}
                  setData={setData}
                  data={data}
               />
            </Box>
            <Box
               sx={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '15px',
               }}>
               {/* paginat */}
               <Box>
                  {data?.message?.data?.length ? (
                     data?.message?.data?.map((el) => (
                        <SpecialistUser
                           key={el.id}
                           data={el}
                           selectedCategory={
                              !Array.isArray(data?.selected_subcategory) &&
                              data?.selected_subcategory
                                 ? [data?.selected_subcategory?.subcategory_name]
                                 : data?.selected_subcategories //yntrvac subkatgorian
                           }
                           selectedCategories={
                              data.category.category_name
                                 ? data?.category?.category_name
                                 : data?.category?.category_name
                           }
                        />
                     ))
                  ) : (
                     <Typography variant="h4" sx={{ color: '#5A7287', margin: '0 auto' }}>
                        Ձեր հարցման համար արդյունքներ չեն գտնվել
                     </Typography>
                  )}
               </Box>

               {data.message?.links.length - 2 > 1 && (
                  <Stack
                     spacing={2}
                     sx={{
                        margin: '0 auto',
                        width: 'fit-content',
                        height: '120px',
                     }}>
                     <Pagination
                        count={data.message?.links.length - 2}
                        boundaryCount={media360 ? 1 : 0}
                        siblingCount={0}
                        color="primary"
                        onChange={(event, value) => {
                           setPage(value);
                           // Art es urlId u navigatey hanac porci chishta? chanac refresha linum ejy datan galsia
                           const urlId =
                              location?.search.slice(1, location.search?.indexOf('=') + 1) +
                              `${value}`;
                           navigate(`?${urlId}`);
                           
                        }}
                        page={page}
                        shape="rounded"
                     />
                  </Stack>
               )}
            </Box>
         </Box>
      </Container>
   );
};
