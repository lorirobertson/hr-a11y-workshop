import Head from "next/head";
import ConditionalRender from "./ConditionalRender";
import styled, { css } from "styled-components";
import styles from "../styles/components/Container.module.scss";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ContentWrapper = styled.div`
  height: 100%;
  font-family: 'Open Sans', sans-serif;

  ${(props) =>
    props.hasSidebar &&
    css`
      margin-left: 180px;
    `}

  ${(props) =>
    props.hasHeader &&
    css`
      &::before {
        content: "";
        position: absolute;
        height: 9.5rem;
        background: #3359ec;
        background-repeat: repeat-x;
        z-index: -1;
        top: 2rem;
        left: 0;
        right: 0;
      }
    `}

  .float-right {
    float: right !important;
  }
`;

const Layout = ({
  children,
  title = "",
  header = true,
  sidebar = true,
  footer = true,
}) => {
  return (
    <div id="app-container" className={styles.container}>
      <Head>
        <title>{title} - HR A11y</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ConditionalRender condition={sidebar}>
        <Sidebar />
      </ConditionalRender>

      <ContentWrapper hasSidebar={sidebar} hasHeader={header}>
        <ConditionalRender condition={header}>
          <Topbar />
        </ConditionalRender>

        <main aria-label="Main Content" id="main-content">
          {children}
        </main>

        <ConditionalRender condition={footer}>
          <footer></footer>
        </ConditionalRender>
      </ContentWrapper>
    </div>
  );
};

export default Layout;
