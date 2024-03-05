import { object, string, ref, date } from 'yup';
// array, boolean, mixed,

export const ClickOnTaskValidation = () =>
   object().shape({
      offer_to_employer: string()
         .required('Պարտադիր դաշտ')
         .min(4, 'Շատ կարճ է')
         .max(250, 'Չափազանց երկար է'),
      startdate_from: date().required('Պարտադիր դաշտ'),
      start_date_to: date()
         .required('Պարտադիր դաշտ')
         .min(ref('startdate_from'), 'Խնդրում ենք մուտքագրել ճիշտ ամսաթվերը'),
      service_price_from: string()
         .required('Պարտադիր դաշտ')
         .matches(/^[0-9]+$/, 'Միայն թիվ')
         .min(3, 'Ծառայության արժեքը պետք է պարունակի առնվազն 3 նիշ:')
         .max(18, 'Ծառայության արժեքը պետք է պարունակի ոչ ավելի, քան 18 նիշ:'),
      service_price_to: string()
         .required('Պարտադիր դաշտ')
         .matches(/^[0-9]+$/, 'Միայն թիվ')
         .min(3, 'Ծառայության արժեքը պետք է պարունակի առնվազն 3 նիշ:')
         .max(18, 'Ծառայության արժեքը պետք է պարունակի ոչ ավելի, քան 18 նիշ:'),
   });
