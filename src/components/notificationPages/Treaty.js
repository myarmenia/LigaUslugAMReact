import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { readNotification } from '../../store/actions/NotificationAction';
import BlueButton from '../UI/CustomButtons/BlueButton';

const Treaty = ({ id, setReadTreaty, readAt }) => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'centert',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Box>
        <Typography sx={{ fontSize: '15px' }}>
          1. Только убедившись на 100% в качестве выполненных работ, производите полный расчёт с
          исполнителем
        </Typography>
        <Typography
          sx={{
            fontSize: '15px',
            '& a': {
              color: '#4B9A2D',
              marginLeft: '10px',
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}>
          2. Всегда требуйте заключения договора если сумма превышает 10 000р.
          <a href="https://backend.ligauslug.ru/admin/contract/contract.docx" download>
            Скачать договор
          </a>
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          3.Всегда требуется отчётность от исполнителя – чеки, ведомости на материал, и так далее
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          4. Требуйте подтверждения любой оплаты через сайт
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          5. Предоплату вносите через расписку, либо подтверждения через заказы на сайте, либо через
          договор
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          6. Тщательно принимайте выполненные работы исполнителя!
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          7. Данный сайт работает как поле для заказа нужных, частных специалистов, фрилансеров,
          организаций, компаний.
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          8. Администрация сайта не несёт ответственности за ваши денежные средства, выплаченные
          специалистам.
        </Typography>
        <Typography sx={{ fontSize: '15px' }}>
          9. Только вы ответственны за денежные средства, просто соблюдайте не большие правила.
          Всегда можете позвонить к нам в сервис и подтвердить данные определённого специалиста!
        </Typography>
      </Box>

      <Box sx={{ margin: '0 auto' }}>
        <BlueButton
          action={() => {
            setReadTreaty(false);
            if (!readAt) dispatch(readNotification(id));
          }}
          label={'ПРОЧИТАЛ(А)'}
        />
      </Box>

      
    </Box>
  );
};
export default Treaty;
