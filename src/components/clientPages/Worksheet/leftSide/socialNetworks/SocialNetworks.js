import React from 'react';
import SocialNetworksEdit from './SocialNetworksEdit';
import SocialNetworksData from './SocialNetworksData';

const SocialNetworks = ({
  setEditSocialNetwork,
  editSocialNetwork,
  openToaster,
  setOpenToaster,
}) => {
  return (
    <>
      {editSocialNetwork ? (
        <SocialNetworksEdit
          setOpenToaster={setOpenToaster}
          setEditSocialNetwork={setEditSocialNetwork}
        />
      ) : (
        <SocialNetworksData setEditSocialNetwork={setEditSocialNetwork} />
      )}
    </>
  );
};
export default SocialNetworks;
