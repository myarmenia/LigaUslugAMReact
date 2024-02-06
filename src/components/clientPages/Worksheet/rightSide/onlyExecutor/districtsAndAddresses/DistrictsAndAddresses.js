import React from 'react';
import DistrictsAndAddressesEdit from './DistrictsAndAddressesEdit';
import DistrictsAndAddressesData from './DistrictsAndAddressesData';

const DistrictsAndAddresses = ({ editAddress, setEditAddress, setOpenToaster }) => {
  return (
    <>
      {editAddress ? (
        <DistrictsAndAddressesEdit
          setEditAddress={setEditAddress}
          setOpenToaster={setOpenToaster}
        />
      ) : (
        <DistrictsAndAddressesData setEditAddress={setEditAddress} />
      )}
    </>
  );
};

export default DistrictsAndAddresses;
