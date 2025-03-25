import './ImageLinkForm.css';

const ImageLinkForm = () => {
	return (
		<div className='text-center'>
			<p className='text-lg font-extralight text-black mb-6 text-center drop-shadow-md'>
				{'This Magic Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='flex justify-center'>
				<div className='form-container flex justify-center gap-4'>
					<input
						className='text-lg p-3 w-3/4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
						type='text'
						placeholder='Enter image URL...'
					/>
					<button className='w-1/4 text-white text-lg font-medium py-2 rounded-md active:scale-95 shadow-md'>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
};

export default ImageLinkForm;
