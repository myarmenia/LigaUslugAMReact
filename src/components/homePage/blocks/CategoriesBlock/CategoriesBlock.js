import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ModalCategories from '../../../UI/modals/ModalCategories';
import MainTitle from '../../../UI/titles/MainTitles';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const useStyles = makeStyles({
  aboutTitle: {
    color: '#445E77',
    fontSize: '40px',
    textAlign: 'center',
  },
  btn: {
    background: '#E1E3E3',
    padding: '15px',
    fontSize: '20px',
    fontWeight: 500,
    boxShadow: '0px 4px 7px #3e576c4d',
    borderRadius: '20px',
    color: '#000',
    height: '70px',
    margin: '20px',
  },
  container: {
    position: 'relative',
    // columnCount: "4",
    columnGap: '40px',
    rowGap: '50px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    // columnRule: "2px dashed #445E77",
    '@media (max-width: 1450px)': {
      // columnCount: "3",
    },
    // "@media (max-width: 1130px)": {
    // 	columnCount: "2",
    // },
    '@media (max-width: 780px)': {
      // columnCount: "1",
    },
  },
});

const CategoriesBlock = ({
  categoriesRef,
  category = [],
  setModalCategory,
  setModalSubCategory,
  setShowModal,
}) => {
  const classes = useStyles();
  const { status } = useSelector((state) => state.auth);
  const lg = useMediaQuery('(max-width:1440px)');

  return (
    <Box
      ref={categoriesRef}
      style={{
        background: '#FFF',
        paddingBottom: 50,
        paddingTop: 50,
      }}>
      <Container maxWidth={lg ? 'lg' : 'xl'}>
        <MainTitle mb={'75px'}>
          {status === 'executor' ? 'Ծառայությունների կատեգորիաներ' : 'Ծառայությունների կատեգորիաներ'}
        </MainTitle>
        <Box className={classes.container}>
          {category.map((category, i) => (
            <ModalCategories
              key={i}
              {...{
                setModalCategory,
                setModalSubCategory,
                category,
                setShowModal,
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategoriesBlock;
