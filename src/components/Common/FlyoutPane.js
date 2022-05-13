import Button from 'reactstrap';
import styled, { css } from 'styled-components';

const Sidebar = styled.div`
	position: fixed;
	z-index: 2;
    top: 0;
    bottom: 0;
    right: -1rem;
    transition: 0.25s ease-in-out 0s;
    will-change: transform;
    overflow-y: auto;
    transform: translateX(100%);
	background: #fff;
	box-shadow: rgba(0,0,0,0.15) 2px 2px 8px;
	width: 20rem;

	${props => props.isOpen && css`
		right: 20rem;
  	`}
`;

const Header = styled.div`
	background: #2c3e50;
	padding: .79rem 1rem;
	position: relative;
	text-align: right;
`;

const Title = styled.p`
	float: left;
	font-weight: bold;
	color: #fff;
	margin: 0;
	line-height: 1.9rem;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background: rgba(0,0,0,.1);
	display: none;
	width: 100%;
	z-index: 1;
	transition: 0.25s ease-out 0s;

	${props => props.isOpen && css`
		display: block;
  	`}
`;

const FlyoutPane = ({
	HeaderTitle='',
	children,
	isOpen=false,
	onToggle 
}) => {	
	return (
		<>
			<Sidebar isOpen={isOpen}>
				<Header>
					{ HeaderTitle ? <Title>{HeaderTitle}</Title> : '' }
					<Button variant="outline-secondary" size="sm" onClick={onToggle}>
						<i className="fas fa-times"></i>
					</Button>
				</Header>

				{children}
			</Sidebar>
			<Overlay isOpen={isOpen} onClick={onToggle}/>
		</>
	);
}

export default FlyoutPane;