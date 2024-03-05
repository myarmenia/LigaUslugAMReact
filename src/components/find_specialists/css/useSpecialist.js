import { makeStyles } from '@material-ui/core';

export const useSpecialist = makeStyles({
   container: {
      width: '100%',
      height: 'auto',
      // paddingTop: "110px",
      gap: '35px',
      display: 'flex',
      flexWrap: 'wrap',
      '@media (max-width: 900px)': {
         flexDirection: 'column',
      },
   },
   filterContainer: {
      width: '370px',
      height: '971px',
      margin: '0 33px 33px 0',
      background: '#E1E3E3',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '@media (max-width: 900px)': {
         margin: '0 0 33px 0',
         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      },
   },
   filterBox1: {
      width: '334px',
      height: '75px',
      borderBottom: '1px solid #808080',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   filterP1: {
      fontSize: '24px',
      fontWeight: '500',
      lineHeight: '28px',
   },
   filterBtn1: {
      color: '#5A7287',
      fontSize: '24px',
      fontWeight: '400',
      lineHeight: '28px',
      '&:hover': {
         backgroundColor: 'unset',
      },
   },
   filterP3: {
      fontFamily: 'Roboto',
      color: '#445E77',
      fontSize: '20px',
      fontWeight: '700',
      letterSpacing: '0em',
      textAlign: 'left',
   },
   filterBox2: {
      width: '318px',
      height: '65px',
      marginTop: '40px',
   },
   filterBox3: {
      width: '318px',
      height: '56px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
   },
   filterP4: {
      height: '56px',
      marginRight: '14px',
      fontFamily: 'Roboto',
      color: '#808080',
      fontSize: '18px',
      fontWeight: '500',
      lineHeight: '56px',
   },
   filterBox4: {
      width: '328px',
      height: '46px',
      margin: '25px auto',
      border: 'unset',
      '& fieldset': {
         border: 'none',
      },
      '& input': {
         padding: '13px 24px',
         fontWeight: 400,
         fontSize: '18px',
      },
   },
   filterSearch: {
      width: '328px',
      height: '46px',
      background: '#EBEBEB',
      border: '1px solid #c4c4c4',
      borderRadius: '10px',
   },
   filterSearchIcon: {
      position: 'absolute',
      // float: "left",
      size: '27px',
   },
   filterBox5: {
      width: '320px',
      height: '246px',
      border: 'solid',
      overflowY: 'scroll',
   },
   filterBox5Map: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      alignItems: 'center',
   },
   filterBox5checkbox: {
      marginRight: '21px',
      '& path': {
         border: '1px solid #808080',
      },
   },
   filterP5: {
      fontWeight: 400,
      fontSize: '18px',
   },
   filterBox6: {
      width: '318px',
      height: '26px',
      margin: '30px auto 25px',
   },
   filterP6: {
      fontWeight: 500,
      fontSize: '22px',
      lineHeight: '26px',
   },
   filterBox7: {
      marginTop: '35px',
   },
   filterSelect: {
      width: '321px',
      height: '46px',
      background: '#EBEBEB',
      // border: "1px solid #C4C4C4",
      borderRadius: '10px',
      fontWeight: 400,
      fontSize: '18px',
      lineHeight: '21px',
   },
   filterBox8: {
      marginTop: '35px',
   },
   filterBtn2: {
      width: '321px',
      height: '46px',
      color: '#fff',
      background: '#445E77',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      '&:hover': {
         background: '#445E77',
         boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
   },
   results: {
      width: '1144px',
      height: '351px',
      background: '#FFFFFF',
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
      borderRadius: '20px',
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      '@media (max-width: 900px)': {
         height: 'auto',
         margin: '0 20px',
         padding: '40px 0',
         justifyContent: 'center',
         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
      },
   },
   resultsBoxLeft: {
      paddingBottom: '42px',
      paddingLeft: '50px',
      '@media (max-width: 900px)': {
         paddingLeft: 0,
      },
   },
   resultsBoxLeft1: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '30px',
      '@media (max-width: 900px)': {
         justifyContent: 'center',
      },
   },
   resultsBoxLeft1About: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: '26px',
   },
   resultsBoxLeft1pName: {
      fontWeight: 500,
      fontSize: '32px',
      lineHeight: '38px',
      '@media (max-width: 900px)': {
         fontSize: '28px',
      },
   },
   resultsBoxLeft1Icon: {
      width: '22.05px',
      height: '22.05px',
      color: '#FFF066',
   },
   resultsBoxLeft1Location: {
      width: '185px',
      height: '60px',
      color: '#8D8D8D',
   },
   resultsBoxLeft1LocationP: {
      fontFamily: 'Roboto',
      fontWeight: '500',
      fontSize: '20px',
   },
   resultsBoxLeft2: {
      height: '108px',
      '@media (max-width: 900px)': {
         height: 'auto',
         paddingLeft: '20px',
      },
   },
   resultsBoxLeft2P: {
      color: '#445E77',
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '36.29px',
   },
   resultsBoxRight: {
      paddingRight: '41px',
      paddingBottom: '46px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'end',
      '@media (max-width: 900px)': {
         padding: 0,
         alignItems: '',
      },
   },
   resultsBtn1: {
      height: '40px',
      color: '#FFFFFF',
      background: ' #49942B',
      boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.13)',
      borderRadius: '10px',
      '&:hover': {
         background: '#49942B',
         boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      },
   },

   resultsBtnP: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '26px',
      '@media (max-width: 900px)': {
         fontSize: '18px',
      },
   },
});

export const useFindSpecialists = makeStyles({
   containerIn900High: {
      display: 'block',
      '@media (max-width: 900px)': {
         display: 'none',
      },
   },
   containerIn900Low: {
      display: 'none',
      '@media (max-width: 900px)': {
         display: 'block',
      },
   },
   container: {
      paddingTop: '100px',
      paddingBottom: '20px',
      // background:
      //   "linear-gradient(89.86deg, rgba(73, 148, 43, 0.2) 18.5%, rgba(68, 94, 119, 0.2) 74.84%)",
      width: '100%',
      '@media (max-width: 900px)': {
         paddingTop: '80px',
      },
   },
   logOutContainer: {
      paddingTop: '10px',
      paddingBottom: '20px',
      // background:
      //   "linear-gradient(89.86deg, rgba(73, 148, 43, 0.2) 18.5%, rgba(68, 94, 119, 0.2) 74.84%)",
      width: '100%',
   },
   categorsConatiner: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      borderRight: '1px dashed #445E77',
      '@media (max-width: 900px)': {
         borderRight: 'none',
      },
   },
   categors: {
      fontStyle: 'normal',
      color: '#000',
      fontSize: '24px',
      marginRight: '20px',
      // lineHeight: "50px",
      cursor: 'pointer',
      '&:hover': {
         color: '#8A74EF',
      },
   },
   subcategors: {
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '24px',
      color: '#808080',
      cursor: 'pointer',
      '&:hover': {
         color: '#000000',
      },
   },
});
