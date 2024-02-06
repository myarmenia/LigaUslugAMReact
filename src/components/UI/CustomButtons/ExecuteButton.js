import React from 'react';
import { GreenArrowSvg } from '../../../assets/svg/intro/GreenArrowSvg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
   root: {
      '.pinkBg': {
         backgroundColor: '#5D52D9!important',
         backgroundImage: 'linear-gradient(90deg,#5D52D9, #ffffff77)',
         zIndex: -10,
         position: 'relative',
         top: 16,
      },

      '.intro-banner-vdo-play-btn i': {
         lineHeight: 56,
         fontSize: 30,
      },
      '.intro-banner-vdo-play-btn .ripple': {
         position: 'absolute',
         width: 100,
         height: 100,
         left: '50%',
         top: '50%',
         opacity: 0,
         margin: '-66px 0 0 -70px',
         borderRadius: '50%',
         animation: `1.8s infinite`,
      },

      '.intro-banner-vdo-play-btn .ripple:nth-child(2)': {
         animationDelay: '.3s',
      },
      '.intro-banner-vdo-play-btn .ripple:nth-child(3)': {
         animationDelay: '.6s',
      },
      ' &:hover': {
         '.intro-banner-vdo-play-btn .ripple': {
            animationPlayState: 'paused',
         },
         '.DropButton': {
            display: 'block',
            cursor: 'grabbing',
         },
         '.arrowBackAnimation': {
            display: ' none',
         },
      },
   },
});

const ExecuteButton = () => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <button>
            <samp style={{ zIndex: 2 }}>
               <GreenArrowSvg />
            </samp>
            <samp className="intro-banner-vdo-play-btn pinkBg" target="_blank">
               <i className="glyphicon glyphicon-play whiteText" aria-hidden="true"></i>
               <span className="ripple pinkBg"></span>
               <span className="ripple pinkBg"></span>
               <span className="ripple pinkBg"></span>
            </samp>
         </button>
      </div>
   );
};
export default ExecuteButton;
