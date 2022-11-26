import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import buttonStyles from "../../../scss/base/forms/button.module.scss";
import PopupSuccess from "../../popup/PopupSuccess";
import { Values } from "./types";
import styles from '../../portfolio/portfolio.module.scss';
import { MyCheckbox, SelectField } from "./CustomFields";
import { validateForm } from "./validation";
type Props = {};


export const options = [
	{ value: "Gas", label: "Газовая" },
	{ value: "Solid fuel", label: "Твердотопливная" },
	{ value: "Diesel", label: "Дизельная" },
];



const PortfolioForm = (props: Props) => {
	const [opened, setOpened] = useState(false);

	async function onSubmit (values: Values,props: FormikHelpers<Values>) {
		const { setSubmitting, resetForm } = props;

		await new Promise((r) => setTimeout(r, 1000));
		alert(JSON.stringify(values, null, 2));

		setSubmitting(false);
		setOpened(true);
		resetForm();
		setTimeout(() => {
			setOpened(false);
		}, 4000);
	}

	return (
		<>
			<Formik
				initialValues={{
					select: null,
					checked: [],
				}}
				validate={validateForm}
				onSubmit={(
					values: Values,
					helpers: FormikHelpers<Values>
				) => onSubmit(values,helpers)}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form
						className={clsx(styles.form, isSubmitting && "submitting")}
					>
						<div className={styles.form_left}>
							<div className="portfolio-form__text text">
								<p>
									<span>Понравился проект?</span>
								</p>
								<h3>
									Рассчитайте стоимость собственного в
									<span>2 шага</span>
								</h3>
								<p>
									Выполните 2 простых действия и мы подберем для Вас
									лучшее решение
								</p>
							</div>
						</div>
						<div className={styles.form_right}>
							<div className={styles.form_row}>
								<div className={styles.form_line}>
									<div className={styles.form_subtitle}>
										Выберите тип котельной:
									</div>
									<div className={styles.form_checkboxes}>
										<MyCheckbox value="Газовая" name="checked">Газовая</MyCheckbox>
										<MyCheckbox value="Твердотопливная" name="checked">
											Твердотопливная
										</MyCheckbox>
										<MyCheckbox value="Дизельная" name="checked">
											Дизельная
										</MyCheckbox>
									</div>
									<ErrorMessage name="checked" />
									<div className={styles.form_select}>
										<SelectField name="select" />
										<ErrorMessage name="select" />
									</div>
								</div>
								<div className={styles.form_line}>
									<button
										id="portfolio-button"
										type="submit"
										className={`${buttonStyles.button} ${buttonStyles.small}`}
									>
										Узнать стоимость
									</button>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<PopupSuccess opened={opened} setOpened={setOpened} />
		</>
	);
};

export default PortfolioForm;