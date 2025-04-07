const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav className='flex justify-end'>
				<button
					onClick={() => onRouteChange('signOut')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Sign Out
				</button>
			</nav>
		);
	} else {
		return (
			<nav className='flex justify-end'>
				<button
					onClick={() => onRouteChange('signIn')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Sign In
				</button>
				<button
					onClick={() => onRouteChange('register')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Register
				</button>
			</nav>
		);
	}
};

export default Navigation;
