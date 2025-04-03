const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav className='flex justify-end'>
				<p
					onClick={() => onRouteChange('signOut')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Sign Out
				</p>
			</nav>
		);
	} else {
		return (
			<nav className='flex justify-end'>
				<p
					onClick={() => onRouteChange('signIn')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Sign In
				</p>
				<p
					onClick={() => onRouteChange('register')}
					className='text-xl cursor-pointer transition-opacity duration-200 hover:opacity-70 text-black underline p-3'
				>
					Register
				</p>
			</nav>
		);
	}
};

export default Navigation;
