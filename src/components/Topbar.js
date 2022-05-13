import styles from "../styles/components/Topbar.module.scss";

const Topbar = () => {
  return (
    <nav id="topbar" className={styles.topbar}>
      <div>
        <button id="btn-shopping-cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
        <button id="btn-sign-out">
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
  );
};

export default Topbar;
