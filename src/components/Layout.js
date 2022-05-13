import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MainContent from "./MainContent";

const Layout = () => {
  return (
    <div className="app-container" id="app-container">
      <Sidebar />
      <Topbar/>
      
      <MainContent/>
    </div>
  );
};

export default Layout;
