import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { appConfig } from './appconfig';

function App() {
	const [inputState, setInputState] = useState('');
	const [faceData, setFaceData] = useState(null);
	const [submitedImageUrl, setSubmitedImageUrl] = useState('');
	const [errorImageUrl, setErrorImageUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [route, setRoute] = useState('signIn');
	const [isSignedIn, setIsSignedIn] = useState(false);
	const [user, setUser] = useState({
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	});
	const initialState = {
		inputState: '',
		faceData: null,
		submitedImageUrl: '',
		errorImageUrl: '',
		loading: false,
		isSignedIn: false,
		user: {
			id: '',
			name: '',
			email: '',
			entries: 0,
			joined: ''
		}
	};

	const loadUser = data => {
		setUser({
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		});
	};

	const onRouteChange = newRoute => {
		if (newRoute === 'signOut') {
			setInputState(initialState.inputState);
			setFaceData(initialState.faceData);
			setSubmitedImageUrl(initialState.submitedImageUrl);
			setErrorImageUrl(initialState.errorImageUrl);
			setLoading(initialState.loading);
			setIsSignedIn(initialState.isSignedIn);
			setUser(initialState.user);
			setRoute('signIn');
		} else if (newRoute === 'home') {
			setIsSignedIn(true);
			setRoute('home');
		} else {
			setRoute(newRoute);
		}
	};

	const onInputChange = event => setInputState(event.target.value);
	const onButtonSubmit = () => {
		setLoading(true);
		setErrorImageUrl('');
		const raw = JSON.stringify({
			user_app_id: {
				user_id: appConfig.USER_ID,
				app_id: appConfig.APP_ID
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

		fetch(`${appConfig.apiBaseUrl}/clarifai`, {
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
				if (result.outputs?.[0]?.data?.regions) {
					setFaceData(result.outputs[0].data.regions);
					setSubmitedImageUrl(result.outputs[0].input.data.image.url);
					fetch(`${appConfig.apiBaseUrl}/image`, {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ id: user.id })
					})
						.then(res => res.json())
						.then(count => {
							setUser(prev => ({
								...prev,
								entries: count
							}));
						})
						.catch(err => console.log('Error updating count:', err));
				} else {
					setErrorImageUrl('No face detected.');
					setFaceData(null);
					setSubmitedImageUrl('');
				}
			})
			.catch(error => console.error('Error respond:', error))
			.finally(() => setLoading(false));
	};

	return (
		<>
			<div className='App'>
				<ParticlesBg type='cobweb' color='#ffffff' bg={true} />
				<Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank name={user.name} entries={user.entries} />
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
				) : route === 'signIn' ? (
					<SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
				) : (
					<Register loadUser={loadUser} onRouteChange={onRouteChange} />
				)}
			</div>
		</>
	);
}

export default App;
