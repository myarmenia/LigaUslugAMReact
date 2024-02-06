import React from 'react';
import ExperienceBlockEdit from './ExperienceBlockEdit';
import ExperienceBlockData from './ExperienceBlockData';

const ExperienceBlock = ({ editExperienceBlock, setEditExperienceBlock, setOpenToaster }) => {
  return (
    <>
      {editExperienceBlock ? (
        <ExperienceBlockEdit
          setOpenToaster={setOpenToaster}
          setEditExperienceBlock={setEditExperienceBlock}
        />
      ) : (
        <ExperienceBlockData setEditExperienceBlock={setEditExperienceBlock} />
      )}
    </>
  );
};

export default ExperienceBlock;
