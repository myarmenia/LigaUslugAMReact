import {object, string, ref, date} from "yup"
import * as yup from "yup"
export function checkIfFilesAreTooBig(files) {
	let valid = true
	if (files) {
		files.forEach(file => {
			const size = file.size / 1024 / 1024
			if (size > 10) {
				valid = false
			}
		})
	}
	return valid
}

export function checkIfFilesAreCorrectType(files) {
	let valid = true
	if (files) {
		files.forEach(file => {
			if (
				![
					"image/jpeg",
					"image/png",
					"peg",
					"jpg",
					"png",
					"gif",
					"csv",
					"txt",
					"pdf",
					"docx",
					"DOCX",
					"JPEG",
					"JPG",
					"PNG",
					"GIF",
					"CSV",
					"TXT",
					"PDF",
				].includes(file.type)
			) {
				valid = false
			}
		})
	}
	return valid
}

export const AddNewOrderValidation = value =>
	object().shape({
		category_name: string().required("Обязательное поле"),
		title: string()
			.required("Обязательное поле")
			.min(3, "Слишком короткий")
			.max(250, "Слишком длинный"),
		subcategory_name: string().required("Обязательное поле"),
		task_description: string()
			.required("Обязательное поле")
			.min(4, "Слишком короткий")
			.max(250, "Слишком длинный"),
		task_starttime: date().required("Обязательное поле"),
		task_finishtime: date()
			.required("Обязательное поле")
			.min(yup.ref("task_starttime"), "Укажите корректные даты"),
		price_from: string()
			.max(ref("price_to"), "Сумма не должна быть больше максимальной")
			.required("Обязательное поле")
			.matches(/^[0-9]+$/, "Только число")
			.min(3, "Минимум 3 цифры"),
		price_to: string()
			.required("Обязательное поле")
			.matches(/^[0-9]+$/, "Толко число"),
		region: value === "У клиента" && string().required("Обязательное поле"),
		nation: value === "У клиента" && string().required("Обязательное поле"),
		country_name:
			value === "У клиента" && string().required("Обязательное поле"),
		address: value === "У клиента" && string().required("Обязательное поле"),
	})
