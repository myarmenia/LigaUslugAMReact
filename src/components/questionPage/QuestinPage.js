import { Avatar, Typography, Box, Container } from '@mui/material';
// import {makeStyles} from "@material-ui/core"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionPageData } from '../../store/actions/QuestionActions';

const all = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '365px',
  // paddingLeft: "215px",
  // paddingRight:" 245px",
  '@media (max-width: 850px)': {
    alignItems: 'center',
    // justifyContent: "center",
    maxWidth: '90%',
    paddingBottom: '165px',
  },
};

const boxesHeader = {
  display: 'flex',
  flexDirection: 'column',
};

const header1 = {
  color: '#000',
  fontSize: '24px',
  fontWeight: '400',
  lineHeight: '22px',
  fontStyle: 'normal',
  padding: '72px 0 13px 0',
  '@media (max-width: 850px)': {
    fontSize: '20px',
    lineHeight: '20px',
  },
  '@media (max-width: 625px)': {
    fontSize: '16px',
    lineHeight: '15px',
  },
};

const header2 = {
  color: '#FF6B00',
  fontSize: '56px',
  fontWeight: '600',
  lineHeight: '66px',
  fontStyle: 'normal',
  paddingBottom: '25px',
  '@media (max-width: 850px)': {
    fontSize: '42px',
    lineHeight: '36px',
  },
  '@media (max-width: 625px)': {
    fontSize: '35px',
    lineHeight: '26px',
  },
  '@media (max-width: 445px)': {
    fontSize: '28px',
    lineHeight: '23px',
  },
};

const style2 = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '24px',
  // justifyContent: 'center',
  // '@media (max-width: 1217px)' : {
  //   flexWrap: 'wrap',
  '@media (max-width: 850px)': {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const boxes = {
  display: 'flex',
  width: '47%',
  // height: '150px',
  // height: "100%",
  background: '#FFFFFF',
  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
  borderRadius: '20px',
  '@media (max-width: 850px)': {
    minWidth: '100%',
    justifyContent: 'flex-start',
  },
  '@media (max-width: 445px)': {
    // height: '140px',
    paddingTop: '10px',
    flexDirection: 'column',
    height: '100%',
  },
};

const boxesImg = {
  background: '#D9D9D9',
  width: '94px',
  height: '94px',
  borderRadius: '50%',
  margin: '28px 0 28px 35px',
  '@media (max-width: 850px)': {
    width: '84px',
    height: '84px',
  },
  '@media (max-width: 445px)': {
    margin: '0 auto',
    width: '64px',
    height: '64px',
  },
};

const textsDiv = {
  width: 'auto',
  height: '100%',
  overflow: 'hidden',
  padding: '22px 24px 22px 35px',
  '@media (max-width: 850px)': {
    padding: '14px 12px 14px 20px',
    width: '100%',
  },
  '@media (max-width: 445px)': {
    padding: '17px 20px 17px 20px',
  },
};

const question = {
  // width: '201px',
  // height: '24px',
  // fontSize: "1.6vw",
  fontSize: '1.5rem',
  fontWeight: '600',
  paddingBottom: '8px',
  color: '#000',
  lineHeight: '25px',
  overflowWrap: 'break-word',
  '@media (max-width: 945px)': {
    fontSize: '1.4rem',
  },
  '@media (max-width: 930px)': {
    fontSize: '1.26rem',
  },
  '@media (max-width: 870px)': {
    fontSize: '1.2rem',
  },
  '@media (max-width: 850px)': {
    fontSize: '2.8vw',
    width: '100%',
  },
};

const answer = {
  // width: '502px',
  // fontSize: "1.4vw",
  fontSize: '1.4rem',
  fontWeight: '400',
  color: '#808080',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  // height: !isopen ? '300px' : '100%',

  // whiteSpace: 'nowrap',
  // overflow: 'hidden',
  // textOverflow: 'clip',
  // whiteSpace: "normal",
  // whiteSpace: "nowrap",
  // overflow: "hidden",
  // textOverflow: "ellipsis",
  // width: "45%",
  // lineHeight: '6.7vh',
  '@media (max-width: 930px)': {
    fontSize: '1.24rem',
  },
  '@media (max-width: 850px)': {
    fontSize: '3vw',
    width: '100%',
  },
  '@media (max-width: 445px)': {
    fontSize: '3.5vw',
  },
};

function QuestionPage() {
  const dispatch = useDispatch();
  const { questionData } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(getQuestionPageData());
  }, [dispatch]);

  return (
    <>
      <Container sx={all}>
        <Box sx={boxesHeader}>
          <Typography sx={header1}>Справка для специалистов</Typography>
          <Typography sx={header2}>Вопросы и ответы</Typography>
        </Box>

        <Box sx={style2}>
          {Array.isArray(questionData) &&
            questionData.map((item) => <Question data={item} key={item.id} />)}
        </Box>
      </Container>
    </>
  );
}

// const Question = ({ data }) => {

//   const [open, setOpen] = useState(false);
//   return (
//     <Box sx={{ height: !open ? 150 : '100%', ...boxes }}>
//       <Avatar sx={boxesImg} src={`https://backend.ligauslug.ru/get-file?path=${data.img_path}`} />
//       <Box sx={textsDiv}>
//         <Typography sx={question}>{data.question}</Typography>

//         <Typography sx={answer}>
//           <>
//             {!open ? data.answer.slice(0, 25) : data.answer}
//             {data.answer.length > 25 && (
//               <span
//                 onClick={() => setOpen(!open)}
//                 style={{ color: '#445E77', cursor: 'pointer', marginLeft: open ? '5px' : 0 }}>
//                 {!open ? '...' : 'свернуть'}
//               </span>
//             )}
//           </>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };
  //// chat gpt -- optimizacrac kod
const Question = React.memo(({ data }) => {
  
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ height: !open ? 150 : '100%', ...boxes }}>
      <Avatar sx={boxesImg} src={`https://backend.ligauslug.ru/get-file?path=${data.img_path}`} />
      <Box sx={textsDiv}>
        <Typography sx={question}>{data.question}</Typography>
        <Typography sx={answer}>
          {!open ? data.answer.slice(0, 25) : data.answer}
          {data.answer.length > 25 && (
            <span
              onClick={toggleOpen}
              style={{ color: '#000', cursor: 'pointer',fontWeight:"500", marginLeft: open ? '5px' : 0 }}>
              {!open ? '...' : 'свернуть'}
            </span>
          )}
        </Typography>
      </Box>
    </Box>
  );
});

export default QuestionPage;
