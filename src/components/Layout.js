import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

const Layout = () => {
  return (
    <div className="app-container" id="app-container">
      <Sidebar />      
      <MainContent/>
    </div>
  );
};

export default Layout;
