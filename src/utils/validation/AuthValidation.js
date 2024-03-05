import { object, ref, string } from 'yup';

export const AuthValidation = object().shape({
   name: string().required('Обязательное поле').min(2, 'Շատ կարճ է').max(20, 'Չափազանց երկար է'),
   last_name: string()
      .required('Обязательное поле')
      .min(2, 'Շատ կարճ է')
      .max(20, 'Չափազանց երկար է'),
   email: string()
      .required('Обязательное поле')
      .min(3, 'Слишком коротий адрес')
      .max(250, 'Չափազանց երկար է')
      .email('Это не электронная почта'),
   password: string()
      .required('Обязательное поле')
      .min(4, 'Слашком короткий пароль')
      .max(20, 'Չափազանց երկար է'),
   password_confirmation: string()
      .required('Обязательное поле')
      .oneOf([ref('password')], 'Пароль не совпадает'),
});
