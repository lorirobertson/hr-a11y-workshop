import React from 'react';

const Truncate = ({
	children,
	length=30,
	by='character', // character, words
	showEllipsis=false,
	readMore='',
}) => {
	function handleTruncation(content) {
		let truncated;
		switch (by) {
			case 'character':
				truncated = content.substring(0, length);
				break;
			
			case 'word':
				truncated = content.split(' ').splice(0, length).join(' ');
				break;

			case 'line':
				break;
		}

		return appendEllipsis(truncated);
	}

	function appendEllipsis(content) {
		const ReadMoreComponent = ()=> readMore;
		if ( showEllipsis ) {
			return (
				<>
					{`${content.trim()}... `}
					<ReadMoreComponent/>
				</>
			);
		}

		return content;
	}

	return handleTruncation(children);
};

export default Truncate;