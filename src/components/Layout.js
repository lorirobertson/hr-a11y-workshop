import Head from 'next/head';
import ConditionalRender from './ConditionalRender';
import styled, { css } from 'styled-components';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

import {ScenarioTagWrapper} from '../Scenario';

// import 'bootstrap/dist/css/bootstrap.css';

const ContentWrapper = styled.div`
	height: 100%;

	${props => props.hasSidebar && css`
		margin-left: 190px;
	`}

	${props => props.hasHeader && css`
		:before {
			content: "";
			position: absolute;
			height: 9.5rem;
			background: #3359EC;
			background-repeat: repeat-x;
			z-index: -1;
			top: 2rem;
			left: 0;
			right: 0;
		}
	`}
`;

const Main = styled.main`
	${props => !props.isAuthPage && css`
		background: #fff;
		box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
		max-width: 1200px;
		margin: 5em auto 2em;
		padding: 2em;
		min-height: 15rem;
	`}
`;

const MainAuth = styled.main`
		height: 100%;
		width: 100%;
`;

const Layout = ({
	children,
	title = '',
    header=true,
    sidebar=true,
	footer=true,
	isAuthPage=false,
}) => {

	if ( isAuthPage ) {
		return (
			<>
				<Head>
					<title>{title} - HR A11y</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
					<link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
					<link href="/global.css" rel="stylesheet" />
				</Head>

				<ScenarioTagWrapper as={MainAuth} minScenario="stage1">
					{children}
				</ScenarioTagWrapper>
			</>
		);
	}

	return (
		<div id="app-container">
			<Head>
				<title>{title} - HR A11y</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' /><link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
				<link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
				<link href="/global.css" rel="stylesheet" />
			</Head>

            <ConditionalRender condition={sidebar}>
				<Sidebar />
			</ConditionalRender>

			<ContentWrapper hasSidebar={sidebar} hasHeader={header}>
				<ConditionalRender condition={header}>
					<Topbar />
				</ConditionalRender>

				<Main
					aria-label="Main Content"
					id="main-content"
					isAuthPage={isAuthPage}
					>{children}
				</Main>

				<ConditionalRender condition={footer}>
					<footer>
					</footer>
				</ConditionalRender>
			</ContentWrapper>
		</div>
	);
};

export default Layout;
