import React, { useState } from "react";

import {
	Formik,
	Field,
	Form,
	FormikHelpers,
	ErrorMessage,
	useField,
} from "formik";
import * as yup from "yup";
import clsx from "clsx";
import Tippy from "@tippyjs/react";
import Popup from "../popup/Popup";

interface Values {
	firstName: string;
	phone: string;
}
type Props = {};

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
//const SignupSchema = Yup.object().shape({

//	phone: Yup.string()
//		.matches(phoneRegExp, "Не правильный номер телефона")
//		.required("Обязательное поле"),
//});

const validate = (values: any) => {
	const errors: any = {};
	const { firstName, phone } = values;

	if (firstName.length < 2 && firstName.length > 0) {
		errors.firstName = "Слишком короткое имя";
	} else if (firstName.length < 1) {
		errors.firstName = "Обязательное поле";
	}

	return errors;
};


const Order = (props: Props) => {
	const [active, setActive] = useState(false);

	return (
		<section id="order" className="order">
			<div className="order__image-ibg">
				<picture>
					<source srcSet="img/order/order.webp" type="image/webp" />
					<img src="img/order/order.jpg" alt="" />
				</picture>
			</div>
			<div className="order__container">
				<div className="order__grid">
					<Formik
						initialValues={{
							firstName: "",
							phone: "",
						}}
						validate={validate}
						onSubmit={(
							values: Values,
							{ setSubmitting }: FormikHelpers<Values>
						) => {
							setTimeout(() => {
								setSubmitting(false);
								setActive(true);
								setTimeout(() => {
									setActive(false);
								}, 4000);
							}, 1000);
						}}
					>
						{({ errors, touched, isSubmitting }) => (
							<Form
								className={clsx(
									"order__form form",
									isSubmitting && "submitting"
								)}
							>
								<div className="form__headline headline headline--light">
									<h2 className="headline__title">
										Заказать котельную
									</h2>
									<p className="headline__subtitle">
										Оставьте свои контакты и наш менеджер свяжется с
										Вами в ближайшее время
									</p>
								</div>
								<div className="form__row">
									<div className="form__line">
										<Field
											className={clsx(
												"input",
												errors.firstName &&
													touched.firstName &&
													"wpcf7-not-valid"
											)}
											name="firstName"
											placeholder="Ваше имя*"
										/>
										<ErrorMessage name="firstName">
											{(msg) => (
												<Tippy className="tippy-my" content={msg}>
													<button
														type="button"
														className="wpcf7-not-valid-tip"
													></button>
												</Tippy>
											)}
										</ErrorMessage>
									</div>
									<div className="form__line">
										{/*<Field
											className={clsx(
												"input",
												errors.phone &&
													touched.phone &&
													"wpcf7-not-valid"
											)}
											type="tel"
											name="phone"
											placeholder="Номер телефона*"
										/>*/}
										<PhoneInput name="phone" />
										<ErrorMessage name="phone">
											{(msg) => (
												<Tippy className="tippy-my" content={msg}>
													<button
														type="button"
														className="wpcf7-not-valid-tip"
													></button>
												</Tippy>
											)}
										</ErrorMessage>
									</div>
								</div>
								<div className="form__button">
									<button
										type="submit"
										className="button button--large"
									>
										Отправить
									</button>
								</div>
								<div className="form__agreement">
									Отправляя форму, Вы принимаете
									<a href="/" target="_blank">
										условия пользовательского соглашения
									</a>
									и согласны с
									<a href="/" target="_blank">
										политикой конфиденциальности
									</a>
									сайта
								</div>
							</Form>
						)}
					</Formik>
					<Popup active={active} setActive={setActive}>
						<div className="form__headline headline">
							<h2 className="headline__title">Успешно!</h2>
							<p className="headline__subtitle">
								Спасибо за Ваше обращение. Менеджер свяжется с вами в
								ближайшее время!
							</p>
						</div>
						<div className="popup__button">
							<button
								type="button"
								data-close
								className="button button--large"
								onClick={() => setActive(false)}
							>
								Закрыть
							</button>
						</div>
					</Popup>
				</div>
			</div>
		</section>
	);
};
const PhoneInput = (props: any) => {
	const [phone, setPhone] = useState("");
	const [field, meta,helpers] = useField(props.name);
	console.log(field, meta,helpers);
	
	function handlePhoneKeyDown(event: any) {
		let inputValue = event.target.value.replace(/\D/g, "");
		if (event.keyCode == 8 && inputValue.length == 1) {
			setPhone("");
			helpers.setValue('');
		}
	}
	function handlePhoneChange(event: any) {
		const input = event.target;
		let value: any = event.target.value,
			inputNumbersValue = value.replace(/\D/g, ""),
			selectionStart = input.selectionStart,
			formattedInputValue = "";
		if (!inputNumbersValue) {
			helpers.setValue('');
			return setPhone("");
		}

		if (input.value.length != selectionStart) {
			// Editing in the middle of input, not last symbol
			if (event.data && /\D/g.test(event.data)) {
				// Attempt to input non-numeric symbol
				setPhone(inputNumbersValue);
				helpers.setValue(inputNumbersValue);
			}
			return;
		}

		if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
			if (inputNumbersValue[0] == "9")
				inputNumbersValue = "7" + inputNumbersValue;
			let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
			formattedInputValue = input.value = firstSymbols + " ";
			if (inputNumbersValue.length > 1) {
				formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
			}
			if (inputNumbersValue.length >= 5) {
				formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
			}
			if (inputNumbersValue.length >= 8) {
				formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
			}
			if (inputNumbersValue.length >= 10) {
				formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
			}
		} else {
			formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
		}

		setPhone(formattedInputValue);
		helpers.setValue(formattedInputValue);
	}
	function handePhonePaste(event: any) {
		let value: any = event.target.value;
		let input = event.target,
			inputNumbersValue = value.replace(/\D/g, "");
		let pasted = event.clipboardData;
		if (pasted) {
			let pastedText = pasted.getData("Text");
			if (/\D/g.test(pastedText)) {
				setPhone(inputNumbersValue);
				helpers.setValue(inputNumbersValue);
				return;
			}
		}
	}
	return (
		<>
			<input
				name={field.name}
				type="tel"
				className="input"
				value={phone}
				placeholder="Номер телефона*"
				onChange={(event) => handlePhoneChange(event)}
				onKeyDown={(event) => handlePhoneKeyDown(event)}
				onPaste={(event) => handePhonePaste(event)}
			/>
			
		</>
	);
};

export default Order;


