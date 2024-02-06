import {object, ref, string} from "yup"

export const AuthValidation = object().shape({
	name: string()
		.required("Обязательное поле")
		.min(2, "Слишком короткий")
		.max(20, "Слишком длинный"),
	last_name: string()
		.required("Обязательное поле")
		.min(2, "Слишком короткий")
		.max(20, "Слишком длинный"),
	email: string()
		.required("Обязательное поле")
		.min(3, "Слишком коротий адрес")
		.max(250, "Слишком длинный")
		.email("Это не электронная почта"),
	password: string()
		.required("Обязательное поле")
		.min(4, "Слашком короткий пароль")
		.max(20, "Слишком длинный"),
	password_confirmation: string()
		.required("Обязательное поле")
		.oneOf([ref("password")], "Пароль не совпадает"),
})
