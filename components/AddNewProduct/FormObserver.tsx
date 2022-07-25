import React, { useEffect, SetStateAction } from "react";
import { useFormikContext } from "formik";
import MyFormValues from "../../interfaces/MyFormValues";
import { useSelector } from "react-redux";

interface FormObserverProps {
	setProductDatas: React.Dispatch<SetStateAction<MyFormValues>>;
	setBasicError: any;
	basicError: any;
}

const FormObserver = ({
	setProductDatas,
	basicError,
	setBasicError


}: FormObserverProps) => {
	const categories = useSelector(
		(state: any) => state.arrayCategories.categories
	);

	const { values, errors} = useFormikContext<MyFormValues>();

	useEffect(() => {
		setBasicError(errors);
	}, [errors]);
	

	useEffect(() => {
		if (categories.length > 0) {
			const product = values;

			for (let i = 0; i < categories.length; i++) {
				if (parseInt(product.category) === categories[i].id) {
					product.category = categories[i].nombre;
				}
			}

			if (values.oneMonth === "") {
				product.oneMonth = "0";
			}
			if (values.threeMonth === "") {
				product.threeMonth = "0";
			}
			if (values.sixMonth === "") {
				product.sixMonth = "0";
			}
			if (values.twelveMonth === "") {
				product.twelveMonth = "0";
			}
			setProductDatas(product);

		}
	}, [values, categories]);
	
	return null;
};

export default FormObserver;
