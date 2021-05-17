import styled, { css } from 'styled-components';

const ChipContainer = styled.div`
	display: inline-block;
	font-weight: 500;
	color: ${props => props.textColor || "#000"};
	background:  ${props => props.backgroundColor || "#bdc3c7"};
	border: 1px solid ${props => props.borderColor || props.backgroundColor || "#bdc3c7"};
	margin-bottom: 5px;
	margin-right: 5px;

	${props => props.block && css`
		display: block;
		margin-right: 0;
	`}
	
	${props => !props.size || props.size==='md' && css`
		height: 24px;
		font-size: 12px;
		line-height: 24px;
		border-radius: 12px;
		padding: 0 .6rem;
	`}

	${props => props.size==='lg' && css`
		height: 32px;
		font-size: 13px;
		line-height: 32px;
		border-radius: 16px;
		padding: 0 .8rem;

		> img:first-child {
			margin: -.35rem .5rem 0 -.85rem;
		}
	`}

	${props => props.size==='sm' && css`
		height: 16px;
		font-size: 10px;
		line-height: 16px;
		border-radius: 8px;
		padding: 0 .3rem;
	`}

	${props => props.variant==='primary' && css`
		background: #3498db;
		border: 1px solid #3498db;
	`}

	${props => props.variant==='success' && css`
		background: #2ecc71;
		border: 1px solid #2ecc71;
	`}

	${props => props.variant==='warning' && css`
		background: #f1c40f;
		border: 1px solid #f1c40f;
	`}

	${props => props.variant==='danger' && css`
		background: #e74c3c;
		border: 1px solid #e74c3c;
	`}

	${props => props.outline && css`
		background: transparent;
	`}
`;

const Chip = ({
	children,
	variant,
	size='md',
	textColor,
	backgroundColor,
	borderColor,
	as='div',
	...props
}) => {
	return (
		<ChipContainer
			variant={variant}
			size={size}
			textColor={textColor}
			backgroundColor={backgroundColor}
			borderColor={borderColor}
			{...props}
			>{children}
		</ChipContainer>
	);
};

export default Chip;