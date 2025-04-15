const Rank = ({ name, entries }) => {
	return (
		<div className='p-4'>
			<div className='text-center text-white text-lg drop-shadow-md'>
				{`${name}, your current entry count is...`}
			</div>
			<div className='text-center text-white text-3xl drop-shadow-md'>
				{entries}
			</div>
		</div>
	);
};

export default Rank;
