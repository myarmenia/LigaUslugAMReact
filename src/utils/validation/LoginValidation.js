import { object, string } from 'yup';

export const LoginValidation = object().shape({
   email: string()
      .required('Պարտադիր դաշտ')
      .min(3, 'Շատ կարճ է')
      .max(250, 'Չափազանց երկար է')
      .email('Սա էլփոստ չէ'),
   password: string()
      .required('Պարտադիր դաշտ')
      .min(4, 'Շատ կարճ է')
      .max(20, 'Չափազանց երկար է'),
});
