import React from 'react';
import Card from '@mui/material/Card';
import { useInfoCardStyles } from '../../../../../../globalStyles/InfoCardStyles';
import Button from '@mui/material/Button';
import CustomDivider from '../../../../../UI/customDivider/CustomDivider';
import CustomImageList from '../../../../../UI/customimagelist/CustomImageList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import edit from '../../../../../../assets/image/edit.svg';

const PortfolioData = ({ editPortfolio, setEditPortfolio }) => {
  const classes = useInfoCardStyles();
  const { profile = {} } = useSelector((state) => state.profile);
  const { executor_portfolio_links = [], executor_portfolios = [] } = profile;
  return (
    <Card sx={{ boxShadow: 2 }} className={classes.root}>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Typography className={classes.title}>Պորտֆոլիո</Typography>
        <Box
          style={{ cursor: 'pointer', padding: '0 0 7px 20px' }}
          onClick={() => setEditPortfolio(true)}>
          {/* <Button color="success" variant="contained">
            Изменить
          </Button> */}
          <img src={edit} alt="edit" />
        </Box>
      </Box>
      <CustomDivider />
      <Typography variant={'h5'}>Նկարներ</Typography>
      <CustomImageList imageData={executor_portfolios} show={editPortfolio} />
      <Typography variant={'h5'}>Հղումներ</Typography>
      <Box>
        {executor_portfolio_links?.map((link, i) => (
          <Typography style={{ marginBottom: '5px' }} variant={'h6'} key={i}>
            {link?.portfolio_link.slice(0, 40)}
          </Typography>
        ))}
      </Box>
      <Box></Box>
    </Card>
  );
};

export default PortfolioData;
