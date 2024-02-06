import { object, string, ref, date } from 'yup';
// array, boolean, mixed,

export const ClickOnTaskValidation = () =>
  object().shape({
    offer_to_employer: string()
      .required('Обязательное поле')
      .min(4, 'Слишком короткий')
      .max(250, 'Слишком длинный'),
    startdate_from: date().required('Обязательное поле'),
    start_date_to: date()
      .required('Обязательное поле')
      .min(ref('startdate_from'), 'Укажите корректные даты'),
    service_price_from: string()
      .required('Обязательное поле')
      .matches(/^[0-9]+$/, 'Только число')
      .min(3, 'Стоимость услуги должна содержать не меньше 3х символов.')
      .max(18, 'Стоимость услуги должна содержать не больше 18и символов.'),
    service_price_to: string()
      .required('Обязательное поле')
      .matches(/^[0-9]+$/, 'Только число')
      .min(3, 'Стоимость услуги должна содержать не меньше 3х символов.')
      .max(18, 'Стоимость услуги должна содержать не больше 18и символов.'),
  });
