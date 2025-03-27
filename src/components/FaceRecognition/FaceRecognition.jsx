const FaceRecognition = ({ imageUrl, box }) => {
	if (box) {
		return (
			<div className='flex justify-center items-center mt-8'>
				<div className='relative'>
					<img
						id='inputimage'
						alt=''
						src={imageUrl}
						className='w-[500px] max-w-full h-auto'
					/>
					{box.map((region, index) => {
						const { left_col, top_row, right_col, bottom_row } =
							region.region_info.bounding_box;
						return (
							<div
								key={index}
								className='absolute top-[var(--top)] left-0 right-0 bottom-0 flex flex-wrap justify-center cursor-pointer'
								style={{
									left: `${left_col * 100}%`,
									// top: `${top_row * 100}%`,
									'--top': `${top_row * 100}%`,
									width: `${(right_col - left_col) * 100}%`,
									height: `${(bottom_row - top_row) * 100}%`,
									boxShadow: '0 0 0 3px #149df2 inset'
								}}
							/>
						);
					})}
				</div>
			</div>
		);
	}
};

export default FaceRecognition;

// const FaceRecognition = ({ faceData, imageUrl }) => {
// 	return (
// 		<div className='relative flex justify-center'>
// 			<img
// 				id='inputImage'
// 				src={imageUrl}
// 				alt=''
// 				className='max-w-full h-auto'
// 			/>
// 			{faceData &&
// 				faceData.map((region, index) => {
// 					const { left_col, top_row, right_col, bottom_row } =
// 						region.region_info.bounding_box;
// 					return (
// 						<div
// 							key={index}
// 							className='flex justify-center absolute border-2 border-red-500 size-fit'
// 							style={{
// 								left: `${left_col * 100}%`,
// 								top: `${top_row * 100}%`,
// 								width: `${(right_col - left_col) * 100}%`,
// 								height: `${(bottom_row - top_row) * 100}%`
// 							}}
// 						/>
// 					);
// 				})}
// 		</div>
// 	);
// };
