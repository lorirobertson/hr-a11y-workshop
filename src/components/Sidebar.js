import styles from "../styles/components/Sidebar.module.scss";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside id="sidebar" className={styles.sidebar}>
      <Link href="/" id="main-logo">
        <a>
          <span className="fa-stack fa-2x">
            <i className="fas fa-circle fa-stack-2x"></i>
            <i className="fas fa-bolt fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </Link>
      <Link href="/" id="link-home">
        <a>
          <i className="fas fa-home"></i>
        </a>
      </Link>
      <a href="/timesheets" id="link-timesheets">
        <i className="fas fa-clock"></i>
      </a>
      <a href="/news" id="link-news">
        <i className="fas fa-book"></i>
      </a>
    </aside>
  );
};

export default Sidebar;
