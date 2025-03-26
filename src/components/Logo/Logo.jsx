import Tilt from 'react-parallax-tilt';
import brain from './brain.svg';

const Logo = () => {
	return (
		<Tilt className='bg-gradient-to-r from-[#50e6f1] via-[#a6a6de] to-[#ed91d0] ... inline-flex rounded-2xl shadow-lg hover:shadow-2xl m-4 mt-0 p-1 transition-all duration-300 hover:scale-105 '>
			<div
				className='flex items-center justify-center w-full h-full'
				style={{
					height: '150px',
					width: '150px'
				}}
			>
				<img className='p-3 object-contain' src={brain} alt='logo' />
			</div>
		</Tilt>
	);
};

export default Logo;
