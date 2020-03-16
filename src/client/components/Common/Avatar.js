import styled, { css } from 'styled-components';

const Img = styled.img`
	width: 2.5rem;
    height: auto;
    display: inline-block;
    position: relative;
    border-radius: 100%;
	box-shadow: 1px 1px 10px rgba(0,0,0,.2);
	border: 2px solid #fff;
    transition: all .25s;

	:hover {
		${props => props.isAnimated && css`
			transform: scale(1.2);
			z-index: 999;
		`}
	}
`;

const Avatar = ({
	src,
	isAnimated=true,
	alt,
	onClick=()=>{},
	...props
}) => {
	return (
		<Img
			src={src}
			isAnimated={isAnimated}
			alt={alt}
			onClick={onClick}
			{...props}
		/>
	);
};

export default Avatar;