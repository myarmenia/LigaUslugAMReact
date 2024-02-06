import React from 'react';
import EducationBlockEdit from './EducationBlockEdit';
import EducationBlockData from './EducationBlockData';

const EducationBlock = ({ editEducationBlock, setEditEducationBlock, setOpenToaster }) => {
  return (
    <>
      {editEducationBlock ? (
        <EducationBlockEdit
          setOpenToaster={setOpenToaster}
          setEditEducationBlock={setEditEducationBlock}
        />
      ) : (
        <EducationBlockData setEditEducationBlock={setEditEducationBlock} />
      )}
    </>
  );
};

export default EducationBlock;
