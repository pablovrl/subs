import { useEffect } from "react";
import { useFormikContext } from "formik";
import MyFormValues from "../../interfaces/MyFormValues";

interface FormObserverProps {
	setBasicError: any;
}

const FormObserver = ({ setBasicError }: FormObserverProps) => {
	const { errors } = useFormikContext<MyFormValues>();

	useEffect(() => {
		setBasicError(errors);
	}, [errors]);

	return null;
};

export default FormObserver;
