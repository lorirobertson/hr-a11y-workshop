import React from 'react';

export default ({ condition=false, children }) => {
	if ( condition === false ) return '';
	return (
		<>
			{children}
		</>
	);
};