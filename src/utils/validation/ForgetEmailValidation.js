import { object, string } from 'yup';

export const ForgetEmailValidation = object().shape({
   email: string()
      .required('Обязательное поле')
      .min(3, 'Շատ կարճ է')
      .max(250, 'Չափազանց երկար է')
      .email('Это не электронная почта'),
});
