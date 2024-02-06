import {object, ref, string} from "yup";

export const UpdatePassword = object().shape({
    password: string()
        .required('Обязательное поле')
        .min(4, 'Слишком короткий')
        .max(20, 'Слишком длинный'),
    password_confirm: string()
        .required('Обязательное поле')
        .oneOf([ref("password")], "Пароль не совпадает")
});