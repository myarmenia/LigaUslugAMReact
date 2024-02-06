import React from 'react';

import { Box } from '@mui/system';
// import { useSelector } from 'react-redux';
// const userInfo = useSelector((state) => state.profile.usersInformation);

const UserPhotos = ({ data, calc }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${data.imgSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        objectFit: 'contain !important',
        width: '100%',
        paddingTop: calc,
        '@media (max-width: 600px)': {},
      }}
    />
  );
};

export default UserPhotos;
