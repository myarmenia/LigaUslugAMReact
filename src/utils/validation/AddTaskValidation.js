import {object, string} from "yup";

export const AddTaskValidation = object().shape({
    service_type: string().required('Обязательное поле'),
    service_name: string()
        .required('Обязательное поле')
        .min(3, 'Номер телефона недействителен')
        .max(18, 'Номер телефона недействителен'),
    address: string()
        .required('Обязательное поле')
        .min(3, 'Слишком короткий')
        .max(250, 'Слишком длинный'),
    description: string()
        .min(4, 'Слишком короткий')
        .max(250, 'Слишком длинный'),
    time_from: string()
        .required('Обязательное поле'),
    time_to: string()
        .required('Обязательное поле')
});