import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());
app.use(cors());

const CLARIFAI_URL =
	'https://api.clarifai.com/v2/models/face-detection/outputs';
const CLARIFAI_KEY = '77fe85854ba0455f967290762a626793';

app.post('/clarifai', async (req, res) => {
	try {
		const response = await fetch(CLARIFAI_URL, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				Authorization: `Key ${CLARIFAI_KEY}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(req.body)
		});

		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error('Proxy error:', error);
		res.status(500).json({ error: 'Server error' });
	}
});

app.listen(5000, () =>
	console.log('✅ Proxy-server is working on http://localhost:5000')
);
