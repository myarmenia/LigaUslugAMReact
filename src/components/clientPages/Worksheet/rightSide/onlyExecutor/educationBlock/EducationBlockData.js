import React from 'react';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import Card from '@mui/material/Card';
import CustomImageList from '../../../../../UI/customimagelist/CustomImageList';
import Button from '@mui/material/Button';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import edit from '../../../../../../assets/image/edit.svg';

const EducationBlockData = ({ editEducationBlock, setEditEducationBlock }) => {
  const classes = useInfoCardStyles();
  const { profile = {} } = useSelector((state) => state.profile);
  const { executor_educations = [], executor_education_certificates = [] } = profile;
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
        <Typography className={classes.title}>Կրթություն և վկայականներ</Typography>
        <Box style={{ cursor: 'pointer' }} onClick={() => setEditEducationBlock(true)}>
          {/* <Button color='success' variant='contained'>
						Изменить
					</Button> */}
          <img src={edit} alt="edit" />
        </Box>
      </Box>
      <CustomDivider />
      <Typography variant={'h5'}>{executor_educations[0]?.education_type}</Typography>
      <Typography variant={'h6'}>{executor_educations[0]?.education_place.slice(0, 40)}</Typography>
      <Typography variant={'h5'}>Վկայականներ</Typography>
      <CustomImageList
        show={false}
        editPortfolio={false}
        education={true}
        imageData={executor_education_certificates}
      />
    </Card>
  );
};

export default EducationBlockData;
