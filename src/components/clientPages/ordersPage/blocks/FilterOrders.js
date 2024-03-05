import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import CustomDivider from '../../../UI/customDivider/CustomDivider';
import { useDispatch, useSelector } from 'react-redux';
import { useOrderStyles } from '../../../../globalStyles/OrderStyles';
import { getCategories } from '../../../../store/actions/FilterOrdersActions';
import { removeFilterCategory } from '../../../../store/reducers/FilterOrdersReducer';
import CustomSelect from '../../../UI/selects/CustomSelect';
import ModalAddServices from '../../../UI/modals/ModalAddServices';
import { SelectSvg } from '../../../../assets/svg/SelectSvg';
import { DeleteSvg } from '../../../../assets/svg/DeleteSvg';
import { getHeaderData, getRegionData } from '../../../../store/actions/HeaderActions';
import {
   filterExecutorTask,
   getOrdersNotSelected,
} from '../../../../store/actions/TaskExecutorActions';

function validateFilter({
   setIsValidTaskLocation,
   taskLocation,
   // priceFrom,
   // priceTo,
   // setIsValidPrice,
   setIsValidRegion,
   regionValue,
}) {
   let isValid = true;
   if (!taskLocation) {
      setIsValidTaskLocation(false);
      isValid = false;
   }
   // if ( (!priceFrom && priceTo) || (priceFrom && !priceTo) || (priceFrom && priceTo && +priceFrom > +priceTo)) {
   //     setIsValidPrice(false)
   //     isValid = false
   // }
   if (taskLocation === 'У клиента' && !regionValue) {
      setIsValidRegion(false);
      isValid = false;
   }
   return isValid;
}

const FilterOrders = ({
   setShowFilterBlock,
   setFilterOrdersSubmitted,
   setTopFilter,
   topFilter,
   setOrdersNotSelectedSubmitted,
   regionUsers,
}) => {
   const [regionValue, setRegionValue] = useState(null);
   const [taskLocation, setTaskLocation] = useState('У клиента');
   const [isValidTaskLocation, setIsValidTaskLocation] = useState(true);
   const [isValidPrice, setIsValidPrice] = useState(true);
   const [isValidRegion, setIsValidRegion] = useState(true);
   const classes = useOrderStyles();
   const [isOpenAddServicesModal, setIsOpenAddServicesModal] = useState(false);
   const [showservicesBlock, setShowServicesBlock] = useState(true);
   const { regions = [] } = useSelector((state) => state.header);
   const dispatch = useDispatch();
   const [priceFrom, setPriceFrom] = useState('');
   const [priceTo, setPriceTo] = useState('');

   const { submitCategories, categories } = useSelector((state) => state.filterOrders);
   const regionValues = useMemo(() => {
      return regions.map((el) => ({
         id: el.id,
         value: el.region,
         label: el.region,
      }));
   }, [regions]);

   useEffect(() => {
      if (taskLocation) {
         setIsValidTaskLocation(true);
      }
   }, [taskLocation]);
   useEffect(() => {
      if (priceTo === '' || priceFrom === '') {
         return;
      }
      if (+priceFrom && +priceTo && +priceFrom < +priceTo) {
         setIsValidPrice(true);
      }
   }, [priceFrom, priceTo]);
   useEffect(() => {
      if (regionValue) {
         setIsValidRegion(true);
      }
   }, [regionValue]);
   const getAllCategories = () => {
      dispatch(getCategories());
   };
   useEffect(() => {
      dispatch(getRegionData());
      dispatch(getHeaderData());
   }, [dispatch]);
   useEffect(() => {
      setRegionValue([regionUsers]);
      setFilterOrdersSubmitted(true);
   }, [regionUsers]);

   return (
      <Card sx={{ boxShadow: 2, backgroundColor: '#E1E3E3' }}>
         <Box className={classes.orderSubBlockSpaceBetween}>
            <ModalAddServices open={isOpenAddServicesModal} setOpen={setIsOpenAddServicesModal} />
            <Typography variant={'h1'}>Որոնել</Typography>
            <Typography
               onClick={() => {
                  setShowFilterBlock(false);
                  setTopFilter(
                     topFilter.map((el, i) => {
                        if (i === 1) {
                           return {
                              ...el,
                              activ: true,
                           };
                        }
                        return {
                           ...el,
                           activ: false,
                        };
                     }),
                  );
                  dispatch(getOrdersNotSelected());
                  setOrdersNotSelectedSubmitted(true);
               }}
               style={{ cursor: 'pointer' }}
               variant={'h3'}>
               Փակել
            </Typography>
         </Box>
         <CustomDivider />
         <Box>
            <Box style={{ marginBottom: '20px' }} className={classes.orderSubBlockSpaceBetween}>
               <Typography variant={'h2'}>Ծառայություններ</Typography>
               <Box
                  onClick={() => setShowServicesBlock(!showservicesBlock)}
                  style={{
                     transform: showservicesBlock ? 'rotate(180deg)' : 'rotate(0deg)',
                     cursor: 'pointer',
                  }}>
                  <SelectSvg />
               </Box>
            </Box>
            <Box>
               {showservicesBlock &&
                  categories?.executor_categories?.map((item, index) => (
                     <Box
                        sx={{ marginBottom: '10px' }}
                        key={index}
                        className={classes.orderSubBlockSpaceBetween}>
                        <Typography style={{ paddingRight: '5px' }} variant={'h4'}>
                           {item.category_name}
                        </Typography>
                        <Box
                           sx={{ cursor: 'pointer' }}
                           onClick={() => dispatch(removeFilterCategory(item.category_name))}>
                           <DeleteSvg />
                        </Box>
                     </Box>
                  ))}
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'end',
                     alignItems: 'center',
                     gap: '5px',
                  }}>
                  {/* <Button onClick={getAllCategories} variant={"contained"}>
              Как в анкете
            </Button> */}
                  <Button variant={'contained'} onClick={() => setIsOpenAddServicesModal(true)}>
                     Ավելացնել
                  </Button>
               </Box>
               {taskLocation !== 'Дистанционно' && (
                  <Box style={{ margin: '10px 0 40px 0' }}>
                     <Typography style={{ marginBottom: '10px' }} variant={'h2'}>
                        Ընտրեք տարածաշրջան
                     </Typography>
                     {!isValidRegion && (
                        <Box sx={{ color: 'red', mt: '10px' }}>Ընտրեք տարածաշրջան</Box>
                     )}
                     <CustomSelect
                        placeholder={'Выберите регион'}
                        handleChange={(val) => setRegionValue(val)}
                        value={regionValue && regionValue}
                        mt={0}
                        arr={regionValues}
                     />
                  </Box>
               )}
               {/* <Box sx={{pt: '32px'}}>
                        <Typography variant={'h2'}>Место выполнения</Typography>
                        <Box sx={{mt: '23px'}}>
                            {TASK_LOCATIONS.map(el => (
                                <Box sx={{display: 'flex', gap: '13px', alignItems: 'center'}} key={el.value}>
                                    <Radio
                                        checkedIcon={<CheckedIcon/>}
                                        icon={<UncheckedIcon/>}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                setTaskLocation(el.value)
                                            }
                                        }}
                                        checked={taskLocation === el.value}
                                    />
                                    <Box>{el.value}</Box>
                                </Box>
                            ))}
                            {!isValidTaskLocation && <Box sx={{color: 'red'}}>выберите Место выполнения</Box>}
                        </Box>
                    </Box>
                    <Box sx={{pt: '32px'}}>
                        <Typography variant={'h2'}>Ставка, руб. за усл.</Typography>
                        <Box sx={{mt: '23px', display: 'flex', gap: '5px'}}>
                            <TextField
                                InputProps={{
                                    sx: {
                                        borderRadius: '10px',
                                        background: '#EBEBEB',
                                    },
                                }}
                                value={priceFrom?priceFrom:""}
                                placeholder="От"
                                onChange={(event) => {
                                    if (checkNumberFieldChange(event.target.value)) {
                                        setPriceFrom(event.target.value)
                                    }
                                }}
                            />
                            <TextField
                                InputProps={{
                                    sx: {
                                        borderRadius: '10px',
                                        background: '#EBEBEB',
                                    }
                                }}
                                placeholder="До"
                                value={priceTo?priceTo:""}
                                onChange={(event) => {
                                    if (checkNumberFieldChange(event.target.value)) {
                                        setPriceTo(event.target.value)
                                    }
                                }}
                            />
                        </Box>
                    </Box>
                    {!isValidPrice && <Box sx={{color: 'red'}}>от должен быть меньше чем до</Box>} */}
               <Button
                  sx={{
                     background: '#EA004F',
                     width: '100%',
                     borderRadius: '10px',
                     color: '#FFFFFF',
                     height: '46px',
                     mt: '25px',
                     '&:hover': {
                        background: '#E1E3E3',
                        border: '1px solid #EA004F',
                        color: '#EA004F',
                     },
                  }}
                  onClick={() => {
                     if (
                        validateFilter({
                           setIsValidTaskLocation,
                           taskLocation,
                           priceTo,
                           priceFrom,
                           setIsValidPrice,
                           regionValue,
                           setIsValidRegion,
                        })
                     ) {
                        dispatch(
                           filterExecutorTask({
                              ...(categories?.executor_categories.length
                                 ? {
                                      executor_categories: categories?.executor_categories.map(
                                         (el) => el.category_name,
                                      ),
                                   }
                                 : {}),
                              region: regionValue,
                              task_location: taskLocation,
                              ...(!priceFrom && !priceTo
                                 ? {}
                                 : {
                                      task_price: {
                                         price_from: +priceFrom,
                                         price_to: +priceTo,
                                      },
                                   }),
                           }),
                        );
                     }
                     setFilterOrdersSubmitted(true);
                  }}>
                  Որոնել
               </Button>
            </Box>
         </Box>
      </Card>
   );
};

export default FilterOrders;
