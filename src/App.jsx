import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

function App() {
	const [inputState, setInputState] = useState('');
	const [faceData, setFaceData] = useState(null);
	const [submitedImageUrl, setSubmitedImageUrl] = useState('');
	const [errorImageUrl, setErrorImageUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const USER_ID = 'edotensei';
	const APP_ID = 'SmartBrain';

	const onInputChange = event => setInputState(event.target.value);
	const onButtonSubmit = () => {
		setLoading(true);
		setErrorImageUrl('');
		const raw = JSON.stringify({
			user_app_id: {
				user_id: USER_ID,
				app_id: APP_ID
			},
			inputs: [
				{
					data: {
						image: {
							url: inputState
						}
					}
				}
			]
		});

		fetch('http://localhost:5000/clarifai', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: raw
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then(result => {
				console.log('Ответ от API:', result);
				if (result.outputs?.[0]?.data?.regions) {
					setFaceData(result.outputs[0].data.regions);
					setSubmitedImageUrl(result.outputs[0].input.data.image.url);
				} else {
					setErrorImageUrl('No face detection.');
					setFaceData(null);
					setSubmitedImageUrl('');
				}
			})
			.catch(error => console.error('Ошибка при запросе:', error))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<div className='App'>
				<ParticlesBg type='cobweb' color='#ffffff' bg={true} />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm
					input={inputState}
					inputChange={onInputChange}
					buttonSubmit={onButtonSubmit}
					loading={loading}
				/>
				<FaceRecognition
					imageUrl={submitedImageUrl}
					box={faceData}
					errorImage={errorImageUrl}
				/>
			</div>
		</>
	);
}

export default App;
