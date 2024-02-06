import React from 'react';
import PortfolioEdit from './PortfolioEdit';
import PortfolioData from './PortfolioData';

const Portfolio = ({ editPortfolio, setEditPortfolio, setOpenToaster }) => {
  return (
    <>
      {editPortfolio ? (
        <PortfolioEdit setEditPortfolio={setEditPortfolio} setOpenToaster={setOpenToaster} />
      ) : (
        <PortfolioData setEditPortfolio={setEditPortfolio} editPortfolio={editPortfolio} />
      )}
    </>
  );
};

export default Portfolio;
