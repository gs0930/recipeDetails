import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <h4 className="home-link" ><div className="text"><Link to="/" className="text">Home</Link></div></h4>
        
      </nav>
      <Outlet />
    </div>
    
  );
};

export default Layout;