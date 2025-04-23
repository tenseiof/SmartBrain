import { useState } from 'react';
import { appConfig } from '../../appconfig';

const Register = ({ onRouteChange, loadUser }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		fetch(`${appConfig.apiBaseUrl}/register`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					loadUser(user);
					onRouteChange('home');
				}
			});
	};

	return (
		<div className='flex items-center justify-center mt-10 h-fit'>
			<div className='p-8 rounded-xl shadow-2xl w-full max-w-sm text-center bg-gradient-to-r from-blue-200 to-purple-300'>
				<h2 className='text-4xl font-bold mb-6 text-black drop-shadow-md'>
					Register
				</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='text-left'>
						<label className='block text-sm font-semibold text-black drop-shadow-md'>
							Name
						</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none drop-shadow-md'
							placeholder='nickname'
						/>
					</div>
					<div className='text-left'>
						<label className='block text-sm font-semibold text-black drop-shadow-md'>
							Email
						</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none drop-shadow-md'
							placeholder='name@example.com'
						/>
					</div>
					<div className='text-left'>
						<label className='block text-sm font-semibold text-black drop-shadow-md'>
							Password
						</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none drop-shadow-md'
							placeholder='••••••••'
						/>
					</div>
					<button
						type='submit'
						className='w-2xs mt-4 text-black py-2 border rounded-lg font-semibold transition-all duration-300 hover:scale-105 drop-shadow-md'
					>
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
