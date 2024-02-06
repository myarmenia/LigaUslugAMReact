import React from 'react';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import Card from '@mui/material/Card';
import ExperienceShowList from '../blocks/ExperienceShowList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import edit from '../../../../../../assets/image/edit.svg';

let ObjectId = () => Math.random().toString();

const ExperienceBlockData = ({ editExperienceBlock, setEditExperienceBlock }) => {
   const classes = useInfoCardStyles();
   const { profile } = useSelector((state) => state.profile);
   const {
      executor_categories = [],
      executor_subcategories = [],
      executor_profile_work_experiences = [],
   } = profile;
   const categoriesShowList = [...executor_categories].map((option) => ({
      key: option?.id,
      item: option?.category_name,
   }));

   const subcategoriesShowList = [...executor_subcategories].map((option) => ({
      key: option?.id,
      item: option?.subcategory_name,
   }));

   return (
      <Card sx={{ boxShadow: 2 }} className={classes.root}>
         <Box
            style={{
               display: 'flex',
               justifyContent: 'flex-start',
               alignItems: 'center',
               flexWrap: 'wrap',
               gap: '15px',
            }}>
            <Typography className={classes.title}>Մասնագիտություն և փորձ</Typography>
            <Box style={{ cursor: 'pointer' }} onClick={() => setEditExperienceBlock(true)}>
               {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
               <img src={edit} alt="edit" />
            </Box>
         </Box>
         <CustomDivider />
         <Box>
            <Typography variant={'h5'}>Ծառայությունների տեսակներ</Typography>
            <ExperienceShowList arr={categoriesShowList} />
         </Box>

         <Box>
            <Typography variant={'h5'}>Ծառայությունների ենթակատեգորիաներ</Typography>
            <ExperienceShowList arr={subcategoriesShowList} />
         </Box>
         <Box>
            <Typography variant={'h5'}>Աշխատանքային փորձ</Typography>
            <Box sx={{}}>
               {[...executor_profile_work_experiences].map((option, i) => (
                  <Box
                     key={ObjectId()}
                     style={{ display: 'flex', flexWrap: 'wrap' }}
                     sx={{
                        '@media (max-width: 520px)': {
                           flexDirection: 'column',
                        },
                     }}>
                     <Typography style={{ width: '30%' }} variant={'h6'}>
                        {option?.working_place}
                     </Typography>
                     <Typography style={{ marginRight: '10px' }} variant={'h3'}>
                        Սկսած
                     </Typography>
                     <Typography style={{ marginRight: '10px' }} variant={'h6'}>
                        {option?.recruitment_data
                           ? moment(option?.recruitment_data).format('DD/MM/YYYY')
                           : ''}
                     </Typography>
                     <Typography style={{ marginRight: '10px' }} variant={'h3'}>
                        Մինչև
                     </Typography>
                     <Typography style={{ marginRight: '10px' }} variant={'h6'}>
                        {option?.dismissal_data
                           ? moment(option?.dismissal_data).format('DD/MM/YYYY')
                           : ''}
                     </Typography>
                  </Box>
               ))}
            </Box>
         </Box>
      </Card>
   );
};

export default ExperienceBlockData;
