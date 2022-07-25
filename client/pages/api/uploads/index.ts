import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import saveToUploads from "../../../config/multer";

const apiRoute = nextConnect({
	onNoMatch(req: NextApiRequest, res: NextApiResponse) {
		res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
	},
});

const uploadMiddleware = saveToUploads.array("file");
apiRoute.use(uploadMiddleware);

apiRoute.post(
	(
		req: NextApiRequest & { files: Express.Multer.File[] },
		res: NextApiResponse
	) => {
		const files = req.files;
		console.log(files);
		if (!files) return res.status(400).send("No file uploaded");
		return res.json({ paths: files.map((file) => "uploads/" + file.filename) });
	}
);

export default apiRoute;

export const config = {
	api: {
		bodyParser: false,
	},
};
