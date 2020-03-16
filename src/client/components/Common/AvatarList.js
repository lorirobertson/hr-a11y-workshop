import styled from 'styled-components';
import Avatar from './Avatar';

const List = styled.ul`
	list-style: none;
	list-style-type: none;
	margin: 0;
	padding: 0;
`;

const Member = styled.li`
	margin: 0 -.75rem 0 0;
	position: relative;
	display: inline-block;
    transition: all .25s;
`;

const AvatarList = ({ list = [] }) => {
	return (
		<List>
			{list.map( ({_id, img, fullName}, i) => 
				<Member key={i} id={`member_${_id}`}>
					<Avatar src={img} alt={fullName} />
				</Member>
			)}
		</List>
	);
};

export default AvatarList;