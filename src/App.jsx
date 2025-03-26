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

	const PAT = '77fe85854ba0455f967290762a626793';
	const USER_ID = 'edotensei';
	const APP_ID = 'SmartBrain';
	const MODEL_ID = 'face-detection';
	const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

	const onInputChange = event => setInputState(event.target.value);
	const onButtonSubmit = () => {
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
				if (result.outputs) {
					setFaceData(result.outputs[0].data.regions);
				} else {
					console.log('Лица не обнаружены.');
				}
			})
			.catch(error => console.error('Ошибка при запросе:', error));
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
				/>
				<FaceRecognition imageUrl={inputState} box={faceData} />
			</div>
		</>
	);
}

export default App;
