import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain2 from './brain2.svg';

const Logo = () => {
	return (
		<Tilt className='Tilt rounded-2xl shadow-lg hover:shadow-2xl m-4 mt-0 p-1 transition-all duration-300 hover:scale-105 size-fit'>
			<div
				className='flex items-center justify-center w-full h-full'
				style={{
					height: '150px',
					width: '150px'
				}}
			>
				<img className='p-3 object-contain' src={brain2} alt='logo' />
			</div>
		</Tilt>
	);
};

export default Logo;
