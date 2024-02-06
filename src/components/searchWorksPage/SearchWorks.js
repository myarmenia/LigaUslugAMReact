import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container } from '@mui/system';
import FilterWorks from './FilterWorks';
import { getHeaderData, getRegionData } from '../../store/actions/HeaderActions';
import { instance } from '../../store/api/api';
import { setLoading } from '../../store/reducers/AuthReducer';
import { setDataSearch } from '../../store/reducers/FilterhWorksReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import Work from './Work';
import { Pagination, Stack, Typography, useMediaQuery } from '@mui/material';

export async function fetchPagesAllTasks(dispatch, navigate) {
   dispatch(setLoading(true));
   await instance
      .get('v1/pages/all_tasks')
      .then((res) => {
         dispatch(setLoading(false));
         const indexpage = res.data.message.path.indexOf('pages');
         let url = res.data.message.path.slice(indexpage);
         url = '1?' + url;
         navigate(`/search_works/${url}`);
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         dispatch(setLoading(false));
      });
}
async function fetchData({ url, dispatch, setCategory }) {
   dispatch(setLoading(true));
   await instance
      .get(`v1/${url}`)
      .then((res) => {
         if (res.data.category) {
            const category = {
               category: res.data.category,
               selectedSubcategory: res.data.selected_subcategory,
               // selected_region: res.data.selected_region,
            };
            setCategory(category);
         }
         // action(res.data.message);

         dispatch(setDataSearch(res.data.message));
      })
      .catch((err) => {
         console.log(err);
      })
      .finally(() => {
         dispatch(setLoading(false));
      });
}

export default function SearchWorks() {
   const { auth } = useSelector((state) => state.auth);
   const { data } = useSelector((store) => store.filterWork);
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();
   const [dathha, setData] = useState({});

   const [selectCategory, setSelectCategory] = useState({});
   const [page, setPage] = useState(1);

   useEffect(() => {
      dispatch(getHeaderData());
      dispatch(getRegionData());
   }, [dispatch]);

   useEffect(() => {
      location.search.split('/');
      if (location.search && location.search.split('/').length === 2) {
         fetchData({
            url: location.search.slice(1),
            // action: setData,
            // action:data,
            dispatch: dispatch,
            setCategory: setSelectCategory,
         });
      } else if (location.search) {
         fetchData({
            url: location.search.slice(1),
            // action: setData,
            // action:data,
            dispatch: dispatch,
            setCategory: setSelectCategory,
         });
      }
   }, [location]);
   const media360 = useMediaQuery('(min-width:360px)');
 
   return (
      <Container>
         <Box
            sx={{
               minHeight: 'calc(100vh - 376px) !important',
               paddingTop: auth ? '110px' : '15px',
               display: 'flex',
               gap: '14px',
               flexWrap: 'wrap',
            }}>
            <FilterWorks data={selectCategory} region={data?.selected_region} />
            <Box
               sx={{
                  width: '100%',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '30px',
               }}>
               <Box
                  sx={{
                     width: '100%',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: '20px',
                  }}>
                  {data?.data?.length ? (
                     data.data.map((el) => <Work key={el.id} data={el} />)
                  ) : (
                     <Typography variant="h4" sx={{ color: '#5A7287', margin: '0 auto' }}>
                       Ձեր հարցման համար արդյունքներ չեն գտնվել
                     </Typography>
                  )}
               </Box>
               {!!(data.links?.length - 2 > 1) && (
                  <Stack
                     spacing={2}
                     sx={{
                        margin: '0 auto',
                        width: 'fit-content',
                        height: '120px',
                     }}>
                     <Pagination
                        count={data.links?.length - 2 ? data.links?.length - 2 : 0}
                        boundaryCount={media360 ? 1 : 0}
                        siblingCount={0}
                        color="primary"
                        onChange={(event, value) => {
                           setPage(value);
                           const indexpage = data.links[value].url.indexOf('pages');
                           let url = data.links[value].url.slice(indexpage);
                           url = `${value}?` + url;
                           navigate(`/search_works/${url}`);
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
}
