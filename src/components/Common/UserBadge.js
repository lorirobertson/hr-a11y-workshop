import Chip from './Chip';
import Avatar from './Avatar';

const UserBadge = ({ src, alt, name }) => {
	return (
		<Chip size="lg">
			<Avatar
				src={src}
				alt={alt}
				isAnimated={false}
			/>
			{name}
		</Chip>
	);
}

export default UserBadge;