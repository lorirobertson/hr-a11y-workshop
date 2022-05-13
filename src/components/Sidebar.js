import styles from '../styles/components/Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside id="sidebar" className={styles.sidebar}>
      <a href="/" id="main-logo">
        <span className="fa-stack fa-2x">
          <i className="fas fa-circle fa-stack-2x"></i>
          <i className="fas fa-bolt fa-stack-1x fa-inverse"></i>
        </span>
      </a>
      <a href="/" id="link-home">
        <i className="fas fa-home"></i>
      </a>
      <a href="/timesheets" id="link-timesheets">
        <i className="fas fa-clock"></i>
      </a>
      <a href="/stuff-shop" id="link-stuffshop">
        <i className="fas fa-shopping-cart"></i>
      </a>
      <a href="/news" id="link-news">
        <i className="fas fa-book"></i>
      </a>
    </aside>
  );
};

export default Sidebar;
