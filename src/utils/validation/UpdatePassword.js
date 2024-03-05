import { object, ref, string } from 'yup';

export const UpdatePassword = object().shape({
   password: string()
      .required('Պարտադիր դաշտ')
      .min(4, 'Շատ կարճ է')
      .max(20, 'Չափազանց երկար է'),
   password_confirm: string()
      .required('Պարտադիր դաշտ')
      .oneOf([ref('password')], 'Գաղտնաբառը չի համընկնում'),
});
