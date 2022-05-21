interface fileInput {
	id: number;
	img: File;
	preview: string;
}

interface MyFormValues {
	name: string;
	description: string;
	images: fileInput[];
	category: string;
	stock: string;
	oneMonth: string;
	threeMonth: string;
	sixMonth: string;
	twelveMonth: string;
}

export default MyFormValues;
