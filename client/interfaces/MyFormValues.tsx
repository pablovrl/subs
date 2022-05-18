interface fileInput {
	id: number;
	name: string;
	type: string;
	preview: string;
	state: boolean;
}

interface MyFormValues {
	name: string;
	description: string;
	images: fileInput[];
	category: string;
	labels: string[];
	stock: string;
	oneMonth: string;
	threeMonth: string;
	sixMonth: string;
	twelveMonth: string;
}

export default MyFormValues;
