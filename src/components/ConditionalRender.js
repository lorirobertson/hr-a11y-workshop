import React from 'react';

const ConditionalRender = ({ condition=false, children }) => {
	if ( condition === false ) return '';
	return (
		<>
			{children}
		</>
	);
};

export default ConditionalRender;