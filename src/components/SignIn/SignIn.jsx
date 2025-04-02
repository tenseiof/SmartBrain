import { useState } from 'react';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		console.log('Email:', email, 'Password:', password);
	};

	return (
		<div className='flex items-center justify-center mt-10 h-fit'>
			<div className='p-8 rounded-xl shadow-2xl w-full max-w-sm text-center'>
				<h2 className='text-4xl font-bold mb-6 text-black'>Sign In</h2>
				<form onSubmit={handleSubmit} className='space-y-4'>
					<div className='text-left'>
						<label className='block text-sm font-semibold text-black'>
							Email
						</label>
						<input
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none'
							placeholder='name@example.com'
						/>
					</div>
					<div className='text-left'>
						<label className='block text-sm font-semibold text-black'>
							Password
						</label>
						<input
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							className='w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none'
							placeholder='••••••••'
						/>
					</div>
					<button
						type='submit'
						className='w-2xs mt-4 text-black py-2 border rounded-lg font-semibold transition-all duration-300 hover:scale-105 '
					>
						Sign In
					</button>
				</form>
				<p className='mt-4 text-sm text-gray-600'>
					Don’t have an account?{' '}
					<a href='#' className='text-black font-semibold hover:underline'>
						Register
					</a>
				</p>
			</div>
		</div>
	);
};

export default SignIn;
